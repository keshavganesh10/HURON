import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { FadeUp } from "@/components/huron/motion";
import { MarginExpansion } from "@/components/huron/MarginExpansion";
import { RoadmapToScale } from "@/components/huron/RoadmapToScale";
import { SystemsLeadership } from "@/components/huron/SystemsLeadership";
import { RiskMitigationDashboard } from "@/components/huron/RiskMitigationDashboard";
import { useViewerMode } from "@/stores/viewer-mode";
import { useEffect } from "react";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Huron — Investor Relations" },
      {
        name: "description",
        content:
          "Huron: a vertically integrated real estate ecosystem. Unit economics, capital rollout, systems leadership and the data moat behind our private lending book.",
      },
      { property: "og:title", content: "Huron — Investor Relations" },
      {
        property: "og:description",
        content:
          "The B2B thesis: captured margin, phased rollout, aerospace-grade execution and a first-party data moat.",
      },
    ],
  }),
  component: InvestorsPage,
});

function InvestorsPage() {
  const setMode = useViewerMode((s) => s.setMode);
  useEffect(() => {
    setMode("investor");
  }, [setMode]);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-hairline bg-background pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.28_0.02_70/_0.25),_transparent_60%)]" />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp>
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-4 w-4 text-bronze" strokeWidth={1.5} />
              <span className="eyebrow">Investor Relations · Confidential</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
              The vertically integrated{" "}
              <span className="text-gradient-bronze italic">real estate ecosystem.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
              Huron captures the full value chain across premium development, private lending
              and high-margin subscription aftercare — engineered as a single, compounding
              balance sheet. This dossier is prepared for institutional venture and private
              equity partners.
            </p>
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-4">
              {[
                { k: "Projected Gross Margin", v: "41%" },
                { k: "Aftercare ARR (FY29)", v: "£4.1M" },
                { k: "Book on Balance Sheet", v: "£210M" },
                { k: "Loss Given Default", v: "6%" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-2xl text-bronze-glow">{s.v}</div>
                  <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/55">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a
                href="#margin"
                className="group inline-flex items-center gap-3 gradient-bronze rounded-sm px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-luxe"
              >
                Review the Thesis
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/capital"
                className="inline-flex items-center gap-3 rounded-sm border border-foreground/25 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/85 transition-all hover:border-bronze hover:text-bronze-glow"
              >
                Private Capital Desk
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <div id="margin">
        <MarginExpansion />
      </div>
      <RoadmapToScale />
      <SystemsLeadership />
      <RiskMitigationDashboard />
    </>
  );
}
