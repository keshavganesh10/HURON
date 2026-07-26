import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import logoMark from "@/assets/huron-logo.png.asset.json";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "The Residence Portfolio", to: "/residences" as const },
      { label: "The Huron Philosophy", to: "/philosophy" as const },
      { label: "Huron Private Capital", to: "/capital" as const },
      { label: "Platinum Aftercare", to: "/aftercare" as const },
    ],
  },
  {
    title: "Speak with Huron",
    links: [
      { label: "Contact a Relationship Director", to: "/contact" as const },
      { label: "Investor Relations", to: "/investors" as const },
      { label: "Private Viewings by Appointment", to: "/contact" as const },
      { label: "Press & Media Enquiries", to: "/contact" as const },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { label: "Privacy Notice", to: "/contact" as const },
      { label: "Terms of Engagement", to: "/contact" as const },
      { label: "Cookie Policy", to: "/contact" as const },
      { label: "Regulatory Disclosures", to: "/contact" as const },
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
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 border-b border-bronze/40 pb-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-bronze-glow transition-colors hover:border-bronze"
            >
              Speak with a Relationship Director
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">
                  {col.title}
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
            Illustrative concept site · Not a regulated financial promotion
          </span>
        </div>
      </div>
    </footer>
  );
}
