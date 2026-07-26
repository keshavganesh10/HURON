import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { FadeUp } from "@/components/huron/motion";
import { MarginExpansion } from "@/components/huron/MarginExpansion";
import { RoadmapToScale } from "@/components/huron/RoadmapToScale";
import { SystemsLeadership } from "@/components/huron/SystemsLeadership";
import { RiskMitigationDashboard } from "@/components/huron/RiskMitigationDashboard";
import { Term } from "@/components/huron/Term";
import { useViewerMode } from "@/stores/viewer-mode";
import { useInvestorAccess } from "@/stores/investor-access";

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
  const granted = useInvestorAccess((s) => s.granted);
  useEffect(() => {
    setMode("investor");
  }, [setMode]);

  if (!granted) return <AccessGate />;
  return <InvestorContent />;
}

function AccessGate() {
  const grant = useInvestorAccess((s) => s.grant);
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = z.object({
      email: z.string().trim().email("Please enter a valid work email").max(255),
      firm: z.string().trim().min(2, "Please enter your firm").max(120),
    }).safeParse({ email, firm });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    grant(parsed.data.email);
  }

  return (
    <section className="relative isolate min-h-[80svh] overflow-hidden bg-background pt-40 pb-24 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.28_0.02_70/_0.25),_transparent_60%)]" />
      <div className="mx-auto grid max-w-[1000px] gap-10 px-6 lg:px-10">
        <FadeUp>
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-4 w-4 text-bronze" strokeWidth={1.5} />
            <span className="eyebrow">Confidential · Access-Controlled</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl">
            The Huron investor dossier is <span className="text-gradient-bronze italic">by request only.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-foreground/70">
            The material beyond this page — unit economics, capital roadmap and
            the private lending book — is prepared for institutional venture and
            private equity partners. Please introduce yourself; a Huron IR
            Director will verify and follow up.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="max-w-xl border border-bronze/30 bg-card p-8 shadow-luxe">
          <form onSubmit={submit} className="space-y-6" noValidate>
            <label className="block">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">Work Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="mt-1 w-full border-b border-hairline bg-transparent py-2.5 text-foreground outline-none transition-colors focus:border-bronze"
              />
            </label>
            <label className="block">
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">Firm</span>
              <input
                type="text"
                value={firm}
                onChange={(e) => setFirm(e.target.value)}
                maxLength={120}
                className="mt-1 w-full border-b border-hairline bg-transparent py-2.5 text-foreground outline-none transition-colors focus:border-bronze"
              />
            </label>
            {error && <p className="text-xs text-red-400/90">{error}</p>}
            <div className="flex items-center gap-2 text-xs text-foreground/55">
              <ShieldCheck className="h-3.5 w-3.5 text-bronze" />
              This is a soft gate — a Huron IR Director confirms access out-of-band.
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 gradient-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-luxe transition-all hover:brightness-110"
            >
              Request Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

function InvestorContent() {
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
                { k: <>Projected Gross <Term tip="Gross Margin — revenue minus the direct cost of building & delivering the residence, before overhead and financing.">Margin</Term></>, v: "41%" },
                { k: <><Term tip="Aftercare ARR — Annual Recurring Revenue from subscription aftercare contracts across all delivered residences by fiscal year 2029.">Aftercare ARR</Term> (FY29)</>, v: "£4.1M" },
                { k: <><Term tip="The private lending book held on Huron's own balance sheet — i.e. loans we underwrite and fund ourselves rather than syndicate.">Book on Balance Sheet</Term></>, v: "£210M" },
                { k: <><Term tip="LGD — Loss Given Default. The percentage of a loan Huron expects to lose if the borrower defaults, after recovering the underlying asset.">Loss Given Default</Term></>, v: "6%" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-2xl text-bronze-glow">{s.v}</div>
                  <div className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/55">
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
