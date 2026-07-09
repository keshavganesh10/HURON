import { useMemo, useState } from "react";
import { Clock, Coins, Fingerprint, Gavel, Home, Wrench, X } from "lucide-react";
import { motion } from "framer-motion";
import { useHuronAudio } from "@/components/huron/audio";

/**
 * "Cost of Friction" calculator.
 * Input: intended home value. Output: itemised legacy costs vs a Huron column of zeroes.
 */

export function CostOfFriction() {
  const [value, setValue] = useState(3_500_000);
  const audio = useHuronAudio();

  const items = useMemo(() => {
    const v = value;
    return [
      { icon: Home, label: "Estate Agent Commission", detail: "1.5% of asset · buyer-side", cost: Math.round(v * 0.015), delay: "2 wks" },
      { icon: Gavel, label: "Legal & Conveyancing", detail: "External solicitor, indemnified only to themselves", cost: Math.round(v * 0.004 + 6000), delay: "6 wks" },
      { icon: Coins, label: "Broker & Bank Fees", detail: "Arrangement, product, valuation", cost: Math.round(v * 0.003 + 4500), delay: "4 wks" },
      { icon: Fingerprint, label: "External Surveyor & Re-valuation", detail: "Contested valuation, delays and revisions", cost: 12500, delay: "3 wks" },
      { icon: Wrench, label: "Year 1 Maintenance Callouts", detail: "12 subcontracted trades, no ledger", cost: 6800, delay: "12 mo" },
      { icon: Clock, label: "Total Delay Cost", detail: "Opportunity + carry on your existing estate", cost: Math.round(v * 0.008), delay: "16–24 wks" },
    ];
  }, [value]);

  const totalCost = items.reduce((a, b) => a + b.cost, 0);

  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <span className="eyebrow">The Cost of Friction</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Model the <span className="text-gradient-bronze italic">liability</span> of the traditional market.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/65">
              The premium market is not the expensive option. It is the slower,
              more exposed one. Slide to your acquisition value and measure the
              cost of every counterparty Huron replaces.
            </p>

            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-light text-foreground/80">Intended Acquisition Value</label>
                <span className="font-mono text-sm text-bronze-glow">£{value.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1_500_000}
                max={12_000_000}
                step={100_000}
                value={value}
                onChange={(e) => {
                  audio?.click("tick");
                  setValue(parseInt(e.target.value));
                }}
                className="cof-range mt-3 w-full"
              />
              <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/45">
                <span>£1.5M</span>
                <span>£12M</span>
              </div>
            </div>

            <div className="mt-10 border border-bronze/40 bg-bronze/10 p-6 shadow-luxe">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bronze">Legacy chain, all-in</div>
              <motion.div
                key={totalCost}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-2 font-display text-4xl text-foreground sm:text-5xl"
              >
                £{totalCost.toLocaleString()}
              </motion.div>
              <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/55">
                Payable to 8 counterparties · avg. 22 weeks
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[1.15fr_0.85fr] gap-px overflow-hidden border border-hairline bg-hairline">
            <div className="bg-card/50 p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-hairline pb-3">
                <span className="h-2 w-2 rounded-full bg-foreground/30" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/60">Traditional Market</span>
              </div>
              <ul className="space-y-3">
                {items.map((it) => (
                  <motion.li
                    key={it.label}
                    layout
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-hairline/60 pb-3 last:border-b-0"
                  >
                    <it.icon className="h-4 w-4 text-foreground/55" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-light text-foreground/90">{it.label}</div>
                      <div className="truncate font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/45">{it.detail} · {it.delay}</div>
                    </div>
                    <div className="font-mono text-sm text-foreground/85 tabular-nums">£{it.cost.toLocaleString()}</div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative bg-bronze/5 p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_color-mix(in_oklab,var(--color-bronze)_18%,transparent),transparent_70%)]" />
              <div className="relative mb-4 flex items-center gap-2 border-b border-bronze/30 pb-3">
                <span className="h-2 w-2 rounded-full bg-bronze status-dot" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bronze">The Huron Model</span>
              </div>
              <ul className="relative space-y-3">
                {items.map((it) => (
                  <li
                    key={it.label}
                    className="grid grid-cols-[auto_auto] items-center justify-between gap-3 border-b border-bronze/15 pb-3 last:border-b-0"
                  >
                    <X className="h-3 w-3 text-bronze/60" />
                    <div className="font-mono text-sm text-bronze-glow tabular-nums">£0</div>
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 border-t border-bronze/30 pt-4">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bronze">Huron, all-in</div>
                <div className="mt-1 font-display text-3xl text-bronze-glow">£0 · 0 days</div>
                <p className="mt-2 text-xs font-light leading-relaxed text-foreground/70">
                  Included in the transparent, fixed residence price. Underwriting,
                  legal coordination and lifetime engineering, one covenant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cof-range { -webkit-appearance:none; appearance:none; height:2px;
          background: linear-gradient(to right, var(--color-bronze), var(--color-bronze-glow)); outline:none; }
        .cof-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none;
          width:22px; height:22px; border-radius:999px; background: var(--color-bronze-glow);
          border:3px solid var(--color-ink); box-shadow: 0 0 0 1px var(--color-bronze); cursor:grab; }
      `}</style>
    </section>
  );
}
