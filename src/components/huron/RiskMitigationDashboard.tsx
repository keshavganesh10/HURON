import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Activity, Radio, Thermometer, Droplets, Zap } from "lucide-react";
import { FadeUp } from "@/components/huron/motion";

const SENSORS = [
  { icon: Thermometer, label: "Envelope Temp Delta", value: "0.4°C", status: "Nominal" },
  { icon: Droplets, label: "Substructure Moisture", value: "3.1% RH", status: "Nominal" },
  { icon: Zap, label: "Load Balance", value: "2.8 kW", status: "Nominal" },
  { icon: Radio, label: "IoT Mesh Uptime", value: "99.998%", status: "Green" },
];

function useTicker(seed: number) {
  const [t, setT] = useState(seed);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1600);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function RiskMitigationDashboard() {
  const tick = useTicker(0);
  const pulse = 0.65 + Math.abs(Math.sin(tick / 2)) * 0.35;

  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <span className="eyebrow">05 — The Data Moat</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Lending against a perfectly known asset.
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-foreground/65">
            Because Huron builds the asset, embeds the IoT sensors, and maintains the structure
            directly, our lending division holds perfect, real-time data on the property’s
            condition. We eliminate the blind risk of traditional mortgages — the asset’s
            structural integrity is perpetually known, monitored, and protected in-house.
          </p>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]"
        >
          {/* Property twin */}
          <div className="relative overflow-hidden border border-hairline bg-card/40 p-6 sm:p-8 shadow-luxe">
            <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bronze">
                  Digital Twin · HRN-CHE-02
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/60">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 status-dot" />
                Live Telemetry
              </div>
            </div>

            {/* Isometric-ish house */}
            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-sm border border-hairline bg-[radial-gradient(ellipse_at_center,_oklch(0.24_0.006_250)_0%,_oklch(0.16_0.005_250)_70%)]">
              <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
                {/* Grid */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line key={`gv${i}`} x1={i * 20} y1="0" x2={i * 20} y2="250" stroke="oklch(0.28 0.006 250)" strokeWidth="0.3" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`gh${i}`} x1="0" y1={i * 22} x2="400" y2={i * 22} stroke="oklch(0.28 0.006 250)" strokeWidth="0.3" />
                ))}

                {/* House */}
                <g stroke="oklch(0.82 0.1 80)" strokeWidth="1.2" fill="none">
                  <polygon points="80,180 200,120 320,180 320,220 80,220" />
                  <polygon points="80,180 200,80 320,180" />
                  <line x1="200" y1="80" x2="200" y2="220" />
                  <rect x="180" y="170" width="40" height="50" />
                  <rect x="110" y="185" width="30" height="25" />
                  <rect x="260" y="185" width="30" height="25" />
                </g>

                {/* Sensor pings */}
                {[
                  { x: 140, y: 150 },
                  { x: 260, y: 150 },
                  { x: 200, y: 110 },
                  { x: 200, y: 200 },
                  { x: 100, y: 195 },
                  { x: 300, y: 195 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={3} fill="oklch(0.82 0.1 80)" opacity={pulse} />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={3 + ((tick + i) % 5) * 3}
                      fill="none"
                      stroke="oklch(0.82 0.1 80)"
                      strokeWidth="0.6"
                      opacity={0.6 - ((tick + i) % 5) * 0.12}
                    />
                  </g>
                ))}

                {/* Data crosshair */}
                <g stroke="oklch(0.74 0.09 70)" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.4">
                  <line x1="0" y1="150" x2="400" y2="150" />
                  <line x1="200" y1="0" x2="200" y2="250" />
                </g>
              </svg>

              <div className="absolute bottom-3 left-4 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/60">
                53.4084° N · 2.9916° W · Structural Integrity <span className="text-bronze-glow">100.0%</span>
              </div>
              <div className="absolute right-4 top-3 rounded-sm border border-bronze/40 bg-background/60 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-bronze-glow backdrop-blur">
                LTV Ceiling · 82%
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SENSORS.map((s) => (
                <div key={s.label} className="border border-hairline bg-background/60 p-3">
                  <div className="flex items-center gap-1.5 text-bronze">
                    <s.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em]">{s.status}</span>
                  </div>
                  <div className="mt-2 font-display text-lg text-foreground">{s.value}</div>
                  <div className="mt-0.5 text-[0.65rem] font-light text-foreground/55">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk panel */}
          <div className="flex flex-col gap-6">
            <div className="border border-bronze/40 bg-gradient-to-br from-bronze/[0.08] to-transparent p-6 shadow-luxe">
              <div className="flex items-center gap-2 text-bronze-glow">
                <Activity className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em]">
                  Comparative Loss Given Default
                </span>
              </div>
              <div className="mt-6 space-y-5">
                {[
                  { k: "High Street Bank", v: 42, tone: "muted" as const },
                  { k: "Prime Private Bank", v: 28, tone: "muted" as const },
                  { k: "Huron Private Capital", v: 6, tone: "bronze" as const },
                ].map((row, i) => (
                  <div key={row.k}>
                    <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                      <span className={row.tone === "bronze" ? "text-bronze-glow" : "text-foreground/60"}>
                        {row.k}
                      </span>
                      <span className={row.tone === "bronze" ? "text-bronze-glow" : "text-foreground/60"}>
                        {row.v}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-hairline/40">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(row.v / 50) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                        className={
                          row.tone === "bronze"
                            ? "h-full gradient-bronze"
                            : "h-full bg-foreground/20"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-bronze/20 pt-4 text-xs font-light leading-relaxed text-foreground/70">
                Blind-risk exposure is eliminated: every collateralised asset is under
                continuous, first-party structural surveillance.
              </p>
            </div>

            <div className="border border-hairline bg-card/40 p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-foreground/60">
                Underwriting Advantages
              </div>
              <ul className="mt-4 space-y-3 text-sm font-light text-foreground/80">
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-bronze" />First-party build & warranty telemetry</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-bronze" />Directly employed engineering fleet on-site</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-bronze" />Live moisture, thermal & load telemetry</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-bronze" />Zero third-party surveyor dependency</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
