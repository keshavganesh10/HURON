import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Cinematic Audio Architecture — WebAudio.
 * - Ambient: three detuned sine oscillators through a lowpass + slow LFO gain swell.
 * - UI SFX: a soft weighted "click" (short filtered noise + sine thump).
 * Muted by default. Persisted in localStorage.
 */

type AudioApi = {
  enabled: boolean;
  toggle: () => void;
  click: (variant?: "soft" | "tick") => void;
};

const Ctx = createContext<AudioApi | null>(null);

export function useHuronAudio() {
  return useContext(Ctx);
}

const STORAGE_KEY = "huron.audio.enabled";

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ nodes: AudioNode[]; gain: GainNode } | null>(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  }, []);

  const startAmbient = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx || ambientRef.current) return;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 620;
    lp.Q.value = 0.6;
    lp.connect(master);

    // Three detuned voices — a slow, minor-tinged pad.
    const freqs = [110, 164.81, 220]; // A2, E3, A3
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 1 ? "triangle" : "sine";
      o.frequency.value = f;
      o.detune.value = (i - 1) * 6;
      const g = ctx.createGain();
      g.gain.value = 0.18 / (i + 1);
      o.connect(g).connect(lp);
      o.start();
      oscs.push(o);
      gains.push(g);
    });

    // Slow LFO on master gain for a breathing swell.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain).connect(master.gain);
    lfo.start();

    // Fade in.
    const now = ctx.currentTime;
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.14, now + 3.5);

    ambientRef.current = { nodes: [master, lp, lfo, lfoGain, ...oscs, ...gains], gain: master };
  }, [ensureCtx]);

  const stopAmbient = useCallback(() => {
    const ctx = ctxRef.current;
    const a = ambientRef.current;
    if (!ctx || !a) return;
    const now = ctx.currentTime;
    a.gain.gain.cancelScheduledValues(now);
    a.gain.gain.setValueAtTime(a.gain.gain.value, now);
    a.gain.gain.linearRampToValueAtTime(0, now + 1.2);
    window.setTimeout(() => {
      a.nodes.forEach((n) => {
        try {
          (n as OscillatorNode).stop?.();
        } catch {}
        try {
          n.disconnect();
        } catch {}
      });
      ambientRef.current = null;
    }, 1400);
  }, []);

  // Restore preference. Do NOT autostart audio — browsers require gesture.
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "1") setEnabled(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch {}
    if (enabled) {
      const ctx = ensureCtx();
      if (ctx?.state === "suspended") void ctx.resume();
      startAmbient();
    } else {
      stopAmbient();
    }
    return () => {
      if (!enabled) return;
      stopAmbient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const click = useCallback(
    (variant: "soft" | "tick" = "soft") => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Sine thump.
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(variant === "tick" ? 880 : 320, now);
      o.frequency.exponentialRampToValueAtTime(variant === "tick" ? 620 : 140, now + 0.08);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.001, now);
      og.gain.exponentialRampToValueAtTime(variant === "tick" ? 0.09 : 0.18, now + 0.01);
      og.gain.exponentialRampToValueAtTime(0.0005, now + 0.14);
      o.connect(og).connect(ctx.destination);
      o.start(now);
      o.stop(now + 0.18);

      // Micro-noise for the "weight".
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = variant === "tick" ? 3200 : 1600;
      bp.Q.value = 3;
      const sg = ctx.createGain();
      sg.gain.value = variant === "tick" ? 0.08 : 0.06;
      src.connect(bp).connect(sg).connect(ctx.destination);
      src.start(now);
    },
    [enabled, ensureCtx],
  );

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return <Ctx.Provider value={{ enabled, toggle, click }}>{children}</Ctx.Provider>;
}

export function AmbientToggle({ className }: { className?: string }) {
  const api = useHuronAudio();
  if (!api) return null;
  const { enabled, toggle } = api;
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute ambient" : "Play ambient"}
      title={enabled ? "Mute ambient composition" : "Play ambient composition"}
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full border transition-all",
        enabled
          ? "border-bronze/60 bg-bronze/15 text-bronze-glow"
          : "border-hairline text-foreground/60 hover:border-bronze/40 hover:text-bronze-glow",
        className,
      )}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {enabled && (
        <span className="pointer-events-none absolute inset-0 rounded-full border border-bronze/50 animate-ping opacity-30" />
      )}
    </button>
  );
}
