import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-jacked "Frictionless Timeline".
 * As the section is scrolled through, a tangled chain of 8 intermediaries
 * collapses into a single elegant Buyer → Huron gold line.
 */

const LEGACY_NODES = [
  "Buyer",
  "Agent",
  "Surveyor",
  "Broker",
  "Solicitor",
  "Builder",
  "Subcontractor",
  "Handyman",
];

export function FrictionlessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Progress 0..1 across the sticky section.
  const tangleOpacity = useTransform(scrollYProgress, [0.0, 0.35, 0.6], [1, 1, 0]);
  const goldOpacity = useTransform(scrollYProgress, [0.35, 0.65, 1], [0, 1, 1]);
  const goldDash = useTransform(scrollYProgress, [0.35, 0.85], [1000, 0]);
  const labelLegacy = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const labelHuron = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative border-t border-hairline bg-background"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_color-mix(in_oklab,var(--color-bronze)_10%,transparent),transparent_65%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
          <div>
            <span className="eyebrow">Scroll · The Cost of Friction</span>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Eight strangers.<br />
              <motion.span style={{ opacity: labelHuron }} className="text-gradient-bronze italic">
                Or one signature.
              </motion.span>
            </h2>

            <div className="mt-8 space-y-6 text-sm font-light leading-relaxed text-foreground/70">
              <motion.p style={{ opacity: labelLegacy }}>
                The traditional acquisition chain is a procession of counterparties, each
                billing in series, each indemnified only to themselves. Every handover is a
                pause. Every pause is a re-price.
              </motion.p>
              <motion.p style={{ opacity: labelHuron }} className="text-foreground/85">
                Huron collapses the procession into a single instrument. Builder, lender,
                legal coordinator and lifetime engineer — under one signature, one covenant,
                one relationship director for life.
              </motion.p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <StatBlock kpi="16–24" unit="weeks" caption="Legacy chain" progress={scrollYProgress} invert />
              <StatBlock kpi="21" unit="days" caption="The Huron model" progress={scrollYProgress} />
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[520px]">
            <svg viewBox="0 0 600 500" className="h-full w-full">
              <defs>
                <linearGradient id="goldLine" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-bronze-deep)" />
                  <stop offset="50%" stopColor="var(--color-bronze-glow)" />
                  <stop offset="100%" stopColor="var(--color-bronze-deep)" />
                </linearGradient>
                <filter id="goldGlow">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Tangled legacy chain */}
              <motion.g style={{ opacity: tangleOpacity }}>
                {LEGACY_NODES.map((n, i) => {
                  const angle = (i / LEGACY_NODES.length) * Math.PI * 2;
                  const cx = 300 + Math.cos(angle) * 180;
                  const cy = 250 + Math.sin(angle) * 170;
                  return (
                    <g key={n}>
                      {LEGACY_NODES.map((_, j) => {
                        if (j <= i) return null;
                        const a2 = (j / LEGACY_NODES.length) * Math.PI * 2;
                        const x2 = 300 + Math.cos(a2) * 180;
                        const y2 = 250 + Math.sin(a2) * 170;
                        return (
                          <line
                            key={j}
                            x1={cx}
                            y1={cy}
                            x2={x2}
                            y2={y2}
                            stroke="hsl(0,0%,55%)"
                            strokeOpacity={0.28}
                            strokeWidth={0.8}
                          />
                        );
                      })}
                      <circle cx={cx} cy={cy} r={5} fill="#3a3d42" stroke="#7a7d82" strokeWidth={1} />
                      <text
                        x={cx}
                        y={cy - 12}
                        textAnchor="middle"
                        fill="#b8b9bc"
                        fontFamily="var(--font-mono)"
                        fontSize={9}
                        letterSpacing={1.5}
                        style={{ textTransform: "uppercase" }}
                      >
                        {n}
                      </text>
                    </g>
                  );
                })}
              </motion.g>

              {/* Single gold Buyer → Huron line */}
              <motion.g style={{ opacity: goldOpacity }} filter="url(#goldGlow)">
                <motion.path
                  d="M 100 250 C 220 200, 380 300, 500 250"
                  stroke="url(#goldLine)"
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 1000, strokeDashoffset: goldDash }}
                />
                <circle cx={100} cy={250} r={7} fill="var(--color-bronze-glow)" />
                <circle cx={500} cy={250} r={9} fill="var(--color-bronze-glow)" />
                <text x={100} y={228} textAnchor="middle" fill="var(--color-bronze-glow)" fontFamily="var(--font-mono)" fontSize={10} letterSpacing={2} style={{ textTransform: "uppercase" }}>Buyer</text>
                <text x={500} y={228} textAnchor="middle" fill="var(--color-bronze-glow)" fontFamily="var(--font-mono)" fontSize={10} letterSpacing={2} style={{ textTransform: "uppercase" }}>Huron</text>
                <text x={300} y={295} textAnchor="middle" fill="hsl(0,0%,80%)" fontFamily="var(--font-display)" fontStyle="italic" fontSize={16}>one signature, one covenant</text>
              </motion.g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  kpi,
  unit,
  caption,
  progress,
  invert,
}: {
  kpi: string;
  unit: string;
  caption: string;
  progress: MotionValue<number>;
  invert?: boolean;
}) {
  const opacity = useTransform(progress, [0, 0.5, 1], invert ? [1, 0.9, 0.35] : [0.35, 0.9, 1]);
  const scale = useTransform(progress, [0, 1], invert ? [1, 0.98] : [0.98, 1]);
  return (
    <motion.div
      style={{ opacity, scale }}
      className={
        "border p-5 " +
        (invert ? "border-hairline bg-card/40" : "border-bronze/40 bg-bronze/10 shadow-luxe")
      }
    >
      <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">{caption}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className={"font-display text-4xl " + (invert ? "text-foreground/70" : "text-bronze-glow")}>{kpi}</div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/55">{unit}</div>
      </div>
    </motion.div>
  );
}
