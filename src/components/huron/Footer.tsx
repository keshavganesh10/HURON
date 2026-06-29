import { Link } from "@tanstack/react-router";
import { KeyRound, ShieldCheck, ScrollText, FileText, Newspaper } from "lucide-react";
import logoMark from "@/assets/huron-logo.png.asset.json";

const COLUMNS = [
  {
    icon: ScrollText,
    title: "Huron Legal Partners",
    links: [
      { label: "Conveyancing Panel", to: "/philosophy" },
      { label: "Independent Counsel Roster", to: "/philosophy" },
      { label: "Notarial & Trust Services", to: "/philosophy" },
      { label: "International Estate Coordination", to: "/philosophy" },
    ],
  },
  {
    icon: FileText,
    title: "Regulatory Compliance",
    links: [
      { label: "FCA Authorisation No. 947-HRN", to: "/capital" },
      { label: "AML / KYC Framework", to: "/capital" },
      { label: "Consumer Duty Statement", to: "/capital" },
      { label: "Modern Slavery & ESG Charter", to: "/philosophy" },
    ],
  },
  {
    icon: Newspaper,
    title: "Private Press",
    links: [
      { label: "Financial Times · Profile", to: "/philosophy" },
      { label: "Country & Town House Annual", to: "/philosophy" },
      { label: "Press Enquiries — Confidential", to: "/philosophy" },
      { label: "Client Testimonial Library", to: "/philosophy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-background pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 border-b border-hairline pb-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img src={logoMark.url} alt="Huron Residences" className="h-14 w-auto" />
            <p className="mt-7 max-w-sm text-sm font-light leading-relaxed text-foreground/65">
              Huron Residences is a vertically integrated residential ecosystem
              for principals who require absolute coordination, discretion and
              engineering certainty across the entire ownership lifetime.
            </p>
            <Link
              to="/residences"
              className="mt-8 inline-flex items-center gap-3 border-b border-bronze/40 pb-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-bronze-glow transition-colors hover:border-bronze"
            >
              <KeyRound className="h-3.5 w-3.5" />
              Client Portal Login
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="flex items-center gap-2 text-bronze">
                  <col.icon className="h-3.5 w-3.5" />
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">
                    {col.title}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm font-light text-foreground/70 transition-colors hover:text-bronze-glow"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 text-xs font-light text-foreground/45 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <span>© {new Date().getFullYear()} Huron Residences Ltd. · Cheshire & Manchester</span>
          <div className="hidden h-px bg-hairline shimmer-line sm:block" />
          <span className="sm:text-right">
            <ShieldCheck className="mr-2 inline h-3 w-3 text-bronze" />
            Authorised & Regulated · Member of the Prime Resident Council
          </span>
        </div>
      </div>
    </footer>
  );
}
