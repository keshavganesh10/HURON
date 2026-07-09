import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, CircleDot, Coffee, Droplet, PhoneCall, Play, RotateCcw, Snowflake, Wifi, Wrench, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHuronAudio } from "@/components/huron/audio";

/**
 * Split-screen "Day in the Life" concierge simulator.
 * Left: the traditional homeowner scrambling. Right: the Huron sensor mesh,
 * dispatch, engineer arrival, resolution — before coffee.
 */

type Scenario = {
  id: string;
  title: string;
  icon: typeof Zap;
  legacy: TimelineEvent[];
  huron: TimelineEvent[];
};

type TimelineEvent = {
  time: string;
  title: string;
  body: string;
  tone: "alert" | "action" | "resolved" | "info";
};

const SCENARIOS: Scenario[] = [
  {
    id: "boiler",
    title: "Boiler loses pressure at 06:00",
    icon: Droplet,
    legacy: [
      { time: "06:00", title: "Cold shower", body: "You Google 'emergency plumber near me'. Nine results, none available before 14:00.", tone: "alert" },
      { time: "06:40", title: "Voicemail carousel", body: "You leave three voicemails and pay a £180 emergency call-out surcharge to hold a slot.", tone: "info" },
      { time: "10:15", title: "Wrong trade arrives", body: "A subcontracted plumber arrives without the boiler manufacturer's expansion valve.", tone: "info" },
      { time: "16:30", title: "Second visit scheduled", body: "Return trip booked for Thursday. Two-day cold spell for the house.", tone: "alert" },
      { time: "Fri", title: "Invoice arrives", body: "£1,240 across two visits. No warranty on the repair. No record of the fault.", tone: "info" },
    ],
    huron: [
      { time: "05:58", title: "Sensor mesh flag", body: "Boiler loop pressure drops 0.4 bar below nominal. Fault isolated to expansion valve.", tone: "alert" },
      { time: "05:59", title: "Autonomous diagnostic", body: "Cross-referenced against 12 months of telemetry. Part pulled from your residence ledger.", tone: "info" },
      { time: "06:02", title: "Named engineer dispatched", body: "Huron Engineer Marcus notified. Priority notice queued to your app on wake.", tone: "action" },
      { time: "07:45", title: "Silent access", body: "Marcus enters via biometric passkey — you receive one push confirming arrival.", tone: "action" },
      { time: "08:15", title: "First-time fix, logged", body: "Valve replaced. Loop rebalanced to 0.4% variance. Logged to your lifetime engineering record.", tone: "resolved" },
    ],
  },
  {
    id: "power",
    title: "Grid brownout at 22:14",
    icon: Zap,
    legacy: [
      { time: "22:14", title: "House goes dark", body: "You fumble for candles. Wine cellar temperature begins to rise silently.", tone: "alert" },
      { time: "22:30", title: "Council helpline", body: "Local network operator has no ETA. Neighbours are also affected.", tone: "info" },
      { time: "06:00", title: "Restoration", body: "Power returns. Fridge, wine vault and freezer contents have crossed the safe threshold.", tone: "alert" },
      { time: "Later", title: "Insurance claim", body: "Six-week loss adjustment process. Contents excess £2,500.", tone: "info" },
    ],
    huron: [
      { time: "22:14", title: "Micro-grid handover", body: "Solid-state battery reserve engages in 40 ms. House experiences zero flicker.", tone: "resolved" },
      { time: "22:14", title: "Owner notified", body: "Discreet notification: 'Grid outage detected. 96 hours of autonomy remaining.'", tone: "info" },
      { time: "22:16", title: "Load rebalancing", body: "Non-essential circuits softened. Wine vault, HVAC and comms held at spec.", tone: "action" },
      { time: "06:00", title: "Silent handback", body: "Grid restored. Battery reserve replenished by 09:00. No intervention required.", tone: "resolved" },
    ],
  },
  {
    id: "leak",
    title: "Concealed leak, third-floor bathroom",
    icon: Droplet,
    legacy: [
      { time: "Day 3", title: "Damp patch appears", body: "A stain forms on the ceiling below. Nobody was in the property.", tone: "alert" },
      { time: "Day 3", title: "Plumber, drywall, decorator", body: "Three separate contractors quoted, coordinated by you.", tone: "info" },
      { time: "Week 2", title: "Mould survey", body: "External environmental survey required. Insurer disputes cause.", tone: "alert" },
      { time: "Week 6", title: "Reinstatement", body: "£11,400 in repairs. Ceiling structural report on file forever.", tone: "info" },
    ],
    huron: [
      { time: "T+0s", title: "Fabric sensor", body: "Moisture ingress detected behind wet-room panel. Zone isolated automatically.", tone: "alert" },
      { time: "T+2min", title: "Water valve triggered", body: "Feed to the third-floor bathroom shut off. Owner notified via app.", tone: "action" },
      { time: "Same day", title: "Engineer on-site", body: "Named engineer arrives with the panel manufacturer's exact spare within four hours.", tone: "action" },
      { time: "Same day", title: "No visible damage", body: "Panel resealed, gasket replaced. Logged. No decorator, no drywall, no claim.", tone: "resolved" },
    ],
  },
];

export function DayInTheLife() {
  const [active, setActive] = useState(SCENARIOS[0].id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audio = useHuronAudio();

  const scenario = useMemo(() => SCENARIOS.find((s) => s.id === active) ?? SCENARIOS[0], [active]);
  const maxSteps = Math.max(scenario.legacy.length, scenario.huron.length);

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setStep((s) => {
        if (s + 1 >= maxSteps) {
          setPlaying(false);
          return s;
        }
        audio?.click("tick");
        return s + 1;
      });
    }, 1800);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, maxSteps]);

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };
  const pick = (id: string) => {
    audio?.click("soft");
    setActive(id);
    setStep(0);
    setPlaying(false);
  };

  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div>
            <span className="eyebrow">A Day in the Life · Concierge Simulator</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              The engineer arrives<br />
              <span className="text-gradient-bronze italic">before you finish your coffee.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-foreground/70 lg:justify-self-end">
            Choose a household scenario. Watch the traditional homeowner's day unravel on the
            left. Watch the Huron sensor mesh, dispatch and named engineer resolve it on the right —
            silently, in the background, without you lifting a finger.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => pick(s.id)}
              className={cn(
                "group inline-flex items-center gap-3 border px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-all",
                active === s.id
                  ? "border-bronze/60 bg-bronze/15 text-bronze-glow"
                  : "border-hairline text-foreground/60 hover:border-bronze/40 hover:text-foreground",
              )}
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.title}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              audio?.click("soft");
              if (step >= maxSteps - 1) setStep(0);
              setPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-2 gradient-bronze px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-luxe"
          >
            <Play className="h-3.5 w-3.5" /> {playing ? "Pause" : step > 0 ? "Resume" : "Play the Day"}
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 border border-hairline px-4 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-foreground/70 hover:border-bronze/40 hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <div className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/50">
            Step {Math.min(step + 1, maxSteps)} · of {maxSteps}
          </div>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-2">
          <TimelineColumn title="Traditional Homeowner" tone="legacy" events={scenario.legacy.slice(0, step + 1)} icon={PhoneCall} />
          <TimelineColumn title="The Huron Fleet" tone="huron" events={scenario.huron.slice(0, step + 1)} icon={Wifi} />
        </div>
      </div>
    </section>
  );
}

function TimelineColumn({
  title,
  tone,
  events,
  icon: Icon,
}: {
  title: string;
  tone: "legacy" | "huron";
  events: TimelineEvent[];
  icon: typeof PhoneCall;
}) {
  const isHuron = tone === "huron";
  return (
    <div className={cn("relative min-h-[420px] p-6 sm:p-8", isHuron ? "bg-bronze/5" : "bg-card/50")}>
      {isHuron && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,_color-mix(in_oklab,var(--color-bronze)_18%,transparent),transparent_65%)]" />
      )}
      <div className="relative flex items-center gap-2 border-b border-hairline pb-4">
        <Icon className={cn("h-4 w-4", isHuron ? "text-bronze" : "text-foreground/55")} />
        <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.22em]", isHuron ? "text-bronze" : "text-foreground/60")}>
          {title}
        </span>
      </div>

      <ol className="relative mt-6 space-y-6">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.li
              key={e.time + e.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-[70px_1fr] gap-4"
            >
              <div className="pt-1">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/50">{e.time}</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <ToneDot tone={e.tone} isHuron={isHuron} />
                  <div className={cn("font-display text-lg", isHuron ? "text-foreground" : "text-foreground/85")}>{e.title}</div>
                </div>
                <p className="mt-1 text-sm font-light leading-relaxed text-foreground/70">{e.body}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {events.length === 0 && (
          <li className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/40">Press play to begin</li>
        )}
      </ol>

      {isHuron && events.length > 0 && events.length >= 4 && (
        <div className="relative mt-8 border-t border-bronze/30 pt-4">
          <div className="flex items-center gap-2 text-bronze-glow">
            <Coffee className="h-4 w-4" />
            <span className="font-display text-lg italic">Your coffee is still warm.</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ToneDot({ tone, isHuron }: { tone: TimelineEvent["tone"]; isHuron: boolean }) {
  if (tone === "alert")
    return <AlertTriangle className={cn("h-3.5 w-3.5", isHuron ? "text-bronze" : "text-destructive/80")} />;
  if (tone === "resolved") return <Check className="h-3.5 w-3.5 text-emerald-300/90" />;
  if (tone === "action") return <Wrench className="h-3.5 w-3.5 text-bronze-glow" />;
  return <CircleDot className={cn("h-3 w-3", isHuron ? "text-bronze" : "text-foreground/50")} />;
}
