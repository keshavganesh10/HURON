import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Banknote, Clock, Fingerprint, Lock, ShieldCheck } from "lucide-react";
import { FadeUp, ParallaxHero, Stagger, StaggerItem } from "@/components/huron/motion";
import { useActiveProperty } from "@/stores/active-property";
import heroPavilion from "@/assets/hero-pavilion.jpg";

export const Route = createFileRoute("/capital")({
  head: () => ({
    meta: [
      { title: "Huron Private Capital — Bridging Finance in 48 Hours" },
      { name: "description", content: "Asset-backed bridging finance underwritten in 48 hours against your existing estate, stock or trust portfolio. Because we built the asset, we know its exact worth." },
      { property: "og:title", content: "Huron Private Capital" },
      { property: "og:description", content: "Because we built the asset, we know its exact worth. Valuation is instant. Finance is frictionless." },
    ],
  }),
  component: Capital,
});

function Capital() {
  const active = useActiveProperty((s) => s.active);
  const [estate, setEstate] = useState(6500000);
  const [ltv, setLtv] = useState(55);
  const [term, setTerm] = useState(18);

  useEffect(() => {
    if (active) {
      setEstate(Math.max(active.priceValue * 1.4, 1_000_000));
    }
  }, [active]);

  const facility = useMemo(() => Math.round((estate * ltv) / 100), [estate, ltv]);
  const monthly = useMemo(() => Math.round((facility * 0.0079)), [facility]);

  return (
    <>
      <ParallaxHero src={heroPavilion} alt="Huron Private Capital" className="min-h-[70svh]">
        <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">Huron Private Capital</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
              Finance, <span className="text-gradient-bronze italic">underwritten in 48 hours.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/75 sm:text-lg">
              Because we built the asset, we know its exact worth. Valuation is
              instant. Underwriting is internal. Finance is frictionless.
            </p>
          </FadeUp>
        </div>
      </ParallaxHero>

      <section className="border-t border-hairline py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <FadeUp>
              <span className="eyebrow">Bridging Finance Calculator</span>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
                Leverage what you already own.
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/65">
                Estate, equity, options or trust portfolio — model an indicative
                facility against your existing assets. A Huron Private Capital
                Director will refine the terms within one business day.
              </p>
              {active && (
                <div className="mt-6 inline-flex items-center gap-3 border border-bronze/40 bg-bronze/10 px-4 py-2.5">
                  <Fingerprint className="h-4 w-4 text-bronze" />
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze-glow">
                    Modelled against {active.name} · {active.price}
                  </span>
                </div>
              )}

              <div className="mt-10 space-y-8">
                <Slider
                  label="Existing Estate / Portfolio Value"
                  value={estate}
                  min={1_000_000}
                  max={50_000_000}
                  step={250_000}
                  format={(v) => `£${v.toLocaleString()}`}
                  onChange={setEstate}
                />
                <Slider
                  label="Loan-to-Value Preference"
                  value={ltv}
                  min={20}
                  max={75}
                  step={5}
                  format={(v) => `${v}%`}
                  onChange={setLtv}
                />
                <Slider
                  label="Bridging Term"
                  value={term}
                  min={3}
                  max={36}
                  step={3}
                  format={(v) => `${v} months`}
                  onChange={setTerm}
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="relative border border-bronze/30 bg-card p-10 shadow-luxe">
              <div className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-bronze/40 bg-background/60" title="Huron Vault · Biometric session">
                <Fingerprint className="h-5 w-5 text-bronze-glow" strokeWidth={1.25} />
              </div>
              <div className="flex items-center gap-2 text-bronze">
                <Banknote className="h-4 w-4" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">Indicative Facility</span>
              </div>
              <div className="mt-3 font-display text-5xl text-foreground">£{facility.toLocaleString()}</div>
              <div className="mt-2 font-mono text-xs text-foreground/55">
                Drawn within 48 hours · No chain · No external bank
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline pt-6">
                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/50">Indicative Monthly Service</div>
                  <div className="mt-2 font-display text-2xl text-bronze-glow">£{monthly.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/50">Term</div>
                  <div className="mt-2 font-display text-2xl text-foreground">{term} mo.</div>
                </div>
              </div>

              <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm font-light text-foreground/75">
                {[
                  { icon: Clock, t: "Decision in principle within 48 hours" },
                  { icon: ShieldCheck, t: "Asset valued by Huron Engineering — never re-surveyed" },
                  { icon: Lock, t: "No chain · no broker · no external bank" },
                ].map((b) => (
                  <li key={b.t} className="flex items-center gap-3">
                    <b.icon className="h-4 w-4 text-bronze" />
                    {b.t}
                  </li>
                ))}
              </ul>

              <Link to="/residences" className="group mt-10 flex w-full items-center justify-center gap-3 gradient-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-all hover:brightness-110">
                Speak with a Private Capital Director
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-card py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">Internal Underwriting</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              We are not your broker. <span className="text-gradient-bronze italic">We are your bank.</span>
            </h2>
          </FadeUp>
          <Stagger className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-3">
            {[
              { t: "Built, therefore valued.", b: "Because we engineered the residence, we know its true replacement cost and yield to the pound — no external surveyor, no contested valuation." },
              { t: "Asset-backed, not income-tested.", b: "Lending is structured against verifiable estate, equity, options, carry, or trust portfolios — never against PAYE income or contested bonus history." },
              { t: "Coupled to your residence.", b: "Refinance, redraw, or rebalance LTV at the speed of a passkey, via the Huron App. Your facility evolves with the asset." },
            ].map((c) => (
              <StaggerItem key={c.t} className="bg-background p-8">
                <h3 className="font-display text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">{c.b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

function Slider({
  label, value, min, max, step, format, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-light text-foreground/80">{label}</label>
        <span className="font-mono text-sm text-bronze-glow">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="capital-range mt-3 w-full"
      />
      <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/40">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      <style>{`
        .capital-range { -webkit-appearance: none; appearance: none; height: 2px;
          background: linear-gradient(to right, var(--color-bronze) 0%, var(--color-bronze) ${pct}%, var(--color-hairline) ${pct}%);
          outline: none; }
        .capital-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none;
          width: 22px; height: 22px; border-radius: 999px; background: var(--color-bronze-glow);
          border: 3px solid var(--color-ink); box-shadow: 0 0 0 1px var(--color-bronze), 0 0 18px -2px color-mix(in oklab, var(--color-bronze) 70%, transparent); cursor: grab; }
        .capital-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px;
          background: var(--color-bronze-glow); border: 3px solid var(--color-ink); cursor: grab; }
      `}</style>
    </div>
  );
}
