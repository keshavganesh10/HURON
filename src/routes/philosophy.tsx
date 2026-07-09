import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hammer, Wallet, Scale, HeartHandshake, ShieldCheck, Leaf, Thermometer, Building2 } from "lucide-react";
import { FadeUp, ParallaxHero, Stagger, StaggerItem } from "@/components/huron/motion";
import { FrictionlessTimeline } from "@/components/huron/FrictionlessTimeline";
import heroPavilion from "@/assets/hero-pavilion.jpg";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "The Huron Philosophy — Vertical Integration as Luxury" },
      { name: "description", content: "A masterclass in vertical system integration. The Huron model unifies builder, lender, legal coordinator and lifetime engineer under a single signature." },
      { property: "og:title", content: "The Huron Philosophy" },
      { property: "og:description", content: "Architected for absolute peace of mind. Sustainable luxury, geopolymer concrete, thermal certainty." },
      { property: "og:image", content: heroPavilion },
    ],
  }),
  component: Philosophy,
});

const TRADITIONAL = ["Buyer", "Estate Agent", "Bank Surveyor", "Mortgage Broker", "Solicitor", "Builder", "Subcontractors", "Handyman"];
const HURON = ["Buyer", "Huron"];

function Philosophy() {
  return (
    <>
      <ParallaxHero src={heroPavilion} alt="Huron architecture" className="min-h-[78svh]">
        <div className="mx-auto flex min-h-[78svh] max-w-[1400px] flex-col justify-end px-6 pb-24 pt-40 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">The Huron Philosophy</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
              A masterclass in <span className="text-gradient-bronze italic">vertical integration.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/75 sm:text-lg">
              Luxury is not a finish. It is the absence of friction. We rebuilt the
              residential chain from foundations upward so a single signature replaces
              twelve, and a single engineer remains for life.
            </p>
          </FadeUp>
        </div>
      </ParallaxHero>

      <section className="border-t border-hairline py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <span className="eyebrow">Timeline of Friction</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Eight counterparties.<br />
              <span className="text-gradient-bronze italic">Or one.</span>
            </h2>
            <p className="mt-6 text-base font-light text-foreground/65">
              The traditional acquisition chain is a procession of strangers, each
              billing in series, each indemnified to themselves. The Huron model
              collapses the procession into a single instrument.
            </p>
          </FadeUp>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <FadeUp className="border border-hairline bg-card/40 p-8">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/55">Legacy Chain</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/40">16–24 weeks</span>
              </div>
              <ol className="mt-6 space-y-3">
                {TRADITIONAL.map((n, i) => (
                  <li key={n} className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-hairline font-mono text-[0.7rem] text-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-light text-foreground/75">{n}</span>
                    {i < TRADITIONAL.length - 1 && (
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/35">→ delay</span>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-hairline pt-5 text-xs font-light text-foreground/55">
                Each handover introduces re-pricing, indemnity gaps and weeks of silence.
              </p>
            </FadeUp>

            <FadeUp className="border border-bronze/40 bg-bronze/5 p-8 shadow-luxe">
              <div className="flex items-center justify-between border-b border-bronze/30 pb-4">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">The Huron Model</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze-glow">21 days</span>
              </div>
              <ol className="mt-6 space-y-3">
                {HURON.map((n, i) => (
                  <li key={n} className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-bronze bg-bronze/15 font-mono text-[0.7rem] text-bronze-glow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-xl text-foreground">{n}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid gap-3 border-t border-bronze/30 pt-6 text-sm font-light text-foreground/80">
                {[
                  { icon: Hammer, t: "Builder & Architect, in-house" },
                  { icon: Wallet, t: "Lender, Huron Private Capital" },
                  { icon: Scale, t: "Legal panel, fully indemnified" },
                  { icon: HeartHandshake, t: "Steward, for the lifetime of ownership" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-3">
                    <r.icon className="h-4 w-4 text-bronze" />
                    {r.t}
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">Architected for Absolute Peace of Mind</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Sustainable luxury, <span className="text-gradient-bronze italic">structurally guaranteed.</span>
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/70">
              Every Huron residence is engineered to outlive its first three
              generations of owners. Materials are chosen not for aesthetics
              alone, but for measurable thermal, acoustic and atmospheric
              certainty across every season of British weather.
            </p>
          </FadeUp>

          <Stagger className="mt-14 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-3">
            {[
              { icon: Building2, t: "Geopolymer Concrete", b: "A low-carbon structural shell with a 142-year design life. Up to 80% reduction in embodied CO₂ versus Portland cement, with superior compressive strength." },
              { icon: Thermometer, t: "Thermal Certainty", b: "R-48 wall assemblies, triple-laminated glazing and continuous airtight membranes. Heating bills modelled to within ±4% of actual, pre-handover." },
              { icon: Leaf, t: "Closed-Loop Systems", b: "Geothermal arrays, MVHR ventilation and rainwater harvesting are wired and commissioned by the same engineer who will service them for life." },
              { icon: ShieldCheck, t: "Acoustic Sanctuary", b: "STC 64+ between principal suites. Double-decoupled floor plates. The quietest residences our acoustic consultancy has ever measured." },
              { icon: Hammer, t: "Single-Trade Liability", b: "No subcontracted gaps. Every defect, in every decade, returns to a single Huron contract — never to an absent builder or a dissolved trade." },
              { icon: HeartHandshake, t: "Inheritable Stewardship", b: "The Huron contract transfers to your heirs intact: same Relationship Director, same engineer, same lifetime guarantees." },
            ].map((c) => (
              <StaggerItem key={c.t} className="bg-background p-8">
                <c.icon className="h-6 w-6 text-bronze" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">{c.b}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp className="mt-16 flex flex-col items-start gap-4 border-t border-hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm font-light text-foreground/65">
              The Huron Philosophy is not a brochure. It is the operating system of every residence we deliver.
            </p>
            <Link to="/residences" className="group inline-flex items-center gap-3 gradient-bronze px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition-all hover:brightness-110">
              Tour the Residence Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
