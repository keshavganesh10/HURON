import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Hammer, HeartHandshake, Scale, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp, ParallaxHero, Stagger, StaggerItem } from "@/components/huron/motion";
import { useViewerMode } from "@/stores/viewer-mode";
import heroPavilion from "@/assets/hero-pavilion.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huron Residences — The Art of Frictionless Living" },
      { name: "description", content: "Homes by Huron — a vertically integrated luxury residential ecosystem. Builder, private lender, legal coordinator and lifelong engineer, unified." },
      { property: "og:title", content: "Huron Residences — The Art of Frictionless Living" },
      { property: "og:description", content: "A vertically integrated luxury residential ecosystem. Builder, lender, and lifelong engineer — unified." },
      { property: "og:image", content: heroPavilion },
    ],
  }),
  component: HuronLanding,
});

function HuronLanding() {
  return (
    <>
      <ParallaxHero src={heroPavilion} alt="A modern luxury Huron pavilion at dusk" className="min-h-[100svh]">
        <div className="mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <FadeUp className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-12 bg-bronze" />
              <span className="eyebrow">A Private Residential Ecosystem</span>
            </div>
            <h1 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Homes by Huron.{" "}
              <span className="block text-gradient-bronze italic">The Art of Frictionless Living.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
              A vertically integrated ecosystem eliminating the middleman. We are
              the builder, lender, and lifelong engineer — unified to protect your
              wealth and restore your time.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/residences" className="group inline-flex items-center justify-center gap-3 gradient-bronze rounded-sm px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition-all hover:brightness-110">
                Explore the Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/aftercare" className="group inline-flex items-center justify-center gap-3 rounded-sm border border-foreground/25 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/90 transition-all hover:border-bronze hover:text-bronze-glow">
                Tour the Aftercare App
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>

          <Stagger className="mt-16 grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-4">
            {[
              { k: "01", v: "Builder & Architect" },
              { k: "02", v: "Private Capital" },
              { k: "03", v: "Legal Concierge" },
              { k: "04", v: "Lifetime Engineer" },
            ].map((s) => (
              <StaggerItem key={s.k}>
                <div className="font-mono text-xs text-bronze">{s.k}</div>
                <div className="mt-2 text-sm font-light text-foreground/80">{s.v}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </ParallaxHero>

      <section className="border-t border-hairline bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <FadeUp>
              <span className="eyebrow">The Vertical</span>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
                One signature.<br />
                <span className="text-gradient-bronze italic">Four disciplines.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm font-light text-foreground/60">
                Each pillar is staffed, salaried and indemnified by Huron — never
                outsourced, never re-billed.
              </p>
            </FadeUp>
            <Stagger className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
              {[
                { icon: Hammer, title: "We Build", body: "Architecturally led, in-house construction. No subcontracted ambiguity, no margin lost between trades." },
                { icon: Wallet, title: "We Underwrite", body: "Huron Private Capital structures bespoke, asset-backed lending against equity, options and trust portfolios." },
                { icon: Scale, title: "We Coordinate", body: "A curated panel of independent legal partners, instructed and indemnified entirely at Huron's cost." },
                { icon: HeartHandshake, title: "We Steward", body: "A single Relationship Director from first viewing through every decade of ownership and beyond." },
              ].map((it) => (
                <StaggerItem key={it.title} className="group bg-background p-8 transition-colors hover:bg-card">
                  <it.icon className="h-6 w-6 text-bronze transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
                  <h3 className="mt-6 font-display text-2xl text-foreground">{it.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">{it.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="relative border-t border-hairline bg-card py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-3 lg:px-10">
          {[
            { eyebrow: "The Portfolio", title: "Reserved for the few.", body: "Four flagship residences across Cheshire and central Manchester — each architected, financed and stewarded under a single Huron signature.", to: "/residences" as const, cta: "View Residences" },
            { eyebrow: "Private Capital", title: "Finance without friction.", body: "Asset-backed bridging finance underwritten in 48 hours against your existing estate, stock or trust portfolio.", to: "/capital" as const, cta: "Open the Calculator" },
            { eyebrow: "Platinum Aftercare", title: "Engineered for life.", body: "A salaried engineering fleet, predictive sensor mesh and an aftercare app that calls you before you call us.", to: "/aftercare" as const, cta: "Meet the Fleet" },
          ].map((c) => (
            <FadeUp key={c.to} className="group flex flex-col border border-hairline bg-background p-8 transition-colors hover:border-bronze/40">
              <span className="eyebrow">{c.eyebrow}</span>
              <h3 className="mt-4 font-display text-3xl text-foreground">{c.title}</h3>
              <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-foreground/65">{c.body}</p>
              <Link to={c.to} className="mt-8 inline-flex items-center gap-2 border-t border-hairline pt-5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-bronze-glow transition-colors hover:text-bronze">
                {c.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
