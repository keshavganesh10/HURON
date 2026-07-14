import { motion } from "framer-motion";
import { AlertTriangle, Check, TrendingUp } from "lucide-react";
import { FadeUp } from "@/components/huron/motion";

const TRADITIONAL = [
  "Lost 2% Brokerage Fees",
  "High-Interest Third-Party Bridging Finance",
  "3-Week Solicitor Delays",
  "Zero Post-Sale Revenue",
];

const HURON = [
  "100% Brokerage Capture",
  "In-House Underwriting — 48hr Closing",
  "Coordinated Legal Panel — 5-Day Completion",
  "Recurring High-LTV Aftercare Subscriptions",
];

const MARGIN_CHART = [
  { label: "Volume Housebuilder", value: 12, tone: "muted" as const },
  { label: "Boutique Developer", value: 18, tone: "muted" as const },
  { label: "Prime London Developer", value: 24, tone: "muted" as const },
  { label: "Huron (Integrated)", value: 41, tone: "bronze" as const },
];

export function MarginExpansion() {
  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <span className="eyebrow">02 — Margin Expansion</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            The captured value chain.
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-foreground/65">
            Traditional developers surrender four discrete profit pools between hand-over and
            the twentieth year of ownership. Huron internalises every one.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden border border-hairline bg-card/40 p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-destructive/60 to-transparent" />
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive/80" strokeWidth={1.5} />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-destructive/80">
                The Traditional Model
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground/70">Fractured. Leaked. Un-hedged.</h3>
            <ul className="mt-8 space-y-4">
              {TRADITIONAL.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                  className="flex items-start gap-3 border-b border-hairline/50 pb-4 text-sm font-light text-foreground/55"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive/60" />
                  <span className="line-through decoration-destructive/40">{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Huron */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden border border-bronze/40 bg-gradient-to-br from-bronze/[0.06] to-transparent p-8 shadow-luxe"
          >
            <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-bronze-glow" strokeWidth={1.75} />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bronze-glow">
                The Huron Model
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">Unified. Captured. Compounding.</h3>
            <ul className="mt-8 space-y-4">
              {HURON.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                  className="flex items-start gap-3 border-b border-bronze/15 pb-4 text-sm font-light text-foreground/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze-glow" strokeWidth={2} />
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Chart */}
        <FadeUp delay={0.2} className="mt-16 border border-hairline bg-card/30 p-8 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-bronze">
                <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em]">
                  Blended Gross Margin — Projected
                </span>
              </div>
              <p className="mt-2 font-display text-2xl text-foreground">
                Huron projects <span className="text-gradient-bronze italic">2.4×</span> the sector median.
              </p>
            </div>
            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.28em] text-foreground/40 sm:block">
              Source: Huron Internal — FY 26 Model
            </span>
          </div>

          <div className="mt-10 space-y-5">
            {MARGIN_CHART.map((row, i) => (
              <div key={row.label} className="grid grid-cols-[1fr_2fr_auto] items-center gap-4 sm:gap-6">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/70">
                  {row.label}
                </div>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-hairline/40">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(row.value / 50) * 100}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                    className={
                      row.tone === "bronze"
                        ? "absolute inset-y-0 left-0 gradient-bronze shadow-[0_0_20px_rgba(200,150,80,0.35)]"
                        : "absolute inset-y-0 left-0 bg-foreground/20"
                    }
                  />
                </div>
                <div
                  className={
                    row.tone === "bronze"
                      ? "font-display text-xl text-bronze-glow"
                      : "font-display text-xl text-foreground/50"
                  }
                >
                  {row.value}%
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
