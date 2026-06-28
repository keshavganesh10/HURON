import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Menu,
  X,
  Check,
  Fingerprint,
  ShieldCheck,
  Sparkle,
  Lock,
  CircleDot,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Scale,
  Hammer,
  HeartHandshake,
  Thermometer,
  Wifi,
  Bell,
  Activity,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/huron-icon.png.asset.json";
import logoMark from "@/assets/huron-logo.png.asset.json";
import heroPavilion from "@/assets/hero-pavilion.jpg";
import cheshire1 from "@/assets/residence-cheshire-1.jpg";
import cheshire2 from "@/assets/residence-cheshire-2.jpg";
import manchester1 from "@/assets/residence-manchester-1.jpg";
import manchester2 from "@/assets/residence-manchester-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huron Residences — The Art of Frictionless Living" },
      {
        name: "description",
        content:
          "Homes by Huron — a vertically integrated luxury residential ecosystem. Builder, private lender, legal coordinator, and lifelong engineer, unified.",
      },
      { property: "og:title", content: "Huron Residences — The Art of Frictionless Living" },
      {
        property: "og:description",
        content:
          "A vertically integrated luxury residential ecosystem eliminating the middleman. Builder, lender, and lifelong engineer — unified.",
      },
    ],
  }),
  component: HuronLanding,
});

// ---------- Mock data ----------
type Region = "cheshire" | "manchester";
type Residence = {
  id: string;
  region: Region;
  name: string;
  locality: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  status: "Fine Interior Tuning" | "Final Handover Checks" | "Foundation Cured" | "Reserved";
  materials: string[];
  images: string[];
};

const RESIDENCES: Residence[] = [
  {
    id: "huron-i",
    region: "cheshire",
    name: "The Aldford Pavilion",
    locality: "Aldford, Cheshire",
    beds: 5,
    baths: 5.5,
    sqft: 6800,
    price: "£4,950,000",
    status: "Fine Interior Tuning",
    materials: [
      "Miele Master-Suite Kitchen",
      "Lutron Smart-Grid System",
      "Calacatta Borghini Stonework",
      "European Oak Wide-Plank Flooring",
    ],
    images: [cheshire1, cheshire2],
  },
  {
    id: "huron-ii",
    region: "cheshire",
    name: "The Tarporley Estate",
    locality: "Tarporley, Cheshire",
    beds: 6,
    baths: 6,
    sqft: 8200,
    price: "£6,250,000",
    status: "Final Handover Checks",
    materials: [
      "Gaggenau Climatic Wine Vault",
      "Crestron Whole-Home Automation",
      "Bespoke Joinery in Smoked Walnut",
      "Geothermal Heating Array",
    ],
    images: [cheshire2, cheshire1],
  },
  {
    id: "huron-iii",
    region: "manchester",
    name: "Deansgate Sky Residence",
    locality: "Deansgate, Manchester",
    beds: 4,
    baths: 4.5,
    sqft: 4200,
    price: "£3,200,000",
    status: "Fine Interior Tuning",
    materials: [
      "Miele Master-Suite Kitchen",
      "Lutron Smart-Grid System",
      "Floor-to-Ceiling Curtain Wall",
      "Concierge Security Tier",
    ],
    images: [manchester1, manchester2],
  },
  {
    id: "huron-iv",
    region: "manchester",
    name: "St. John's Penthouse",
    locality: "St. John's Quarter, Manchester",
    beds: 3,
    baths: 3.5,
    sqft: 3450,
    price: "£2,750,000",
    status: "Foundation Cured",
    materials: [
      "Boffi Bathing Suite",
      "Bang & Olufsen Acoustic Architecture",
      "Private Lift Vestibule",
      "Bronze-Framed Glazing",
    ],
    images: [manchester2, manchester1],
  },
];

const REGIONS: { id: Region; label: string }[] = [
  { id: "cheshire", label: "Cheshire Portfolio" },
  { id: "manchester", label: "Central Manchester Penthouses" },
];

// ---------- Page ----------
function HuronLanding() {
  const [activeResidence, setActiveResidence] = useState<Residence | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-bronze selection:text-primary-foreground">
      <TopNav />
      <Hero />
      <Pillars />
      <Showcase onReserve={setActiveResidence} />
      <SandboxApp />
      <Comparison />
      <ContactPortal />
      <Footer />

      <ReservationDrawer
        residence={activeResidence}
        onClose={() => setActiveResidence(null)}
      />
    </main>
  );
}

// ---------- Top nav ----------
function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Residences", href: "#residences" },
    { label: "Huron Capital", href: "#capital" },
    { label: "The Aftercare App", href: "#app" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoIcon.url} alt="Huron" className="h-8 w-8 object-contain" />
            <span className="hidden font-display text-xl tracking-[0.25em] text-foreground/90 sm:inline">
              HURON
            </span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-light tracking-wide text-foreground/75 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-sm border border-bronze/40 bg-bronze/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-bronze-glow transition-all hover:border-bronze hover:bg-bronze/20"
            >
              Request Private Access
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </nav>

          <button
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile slide-out */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-card shadow-luxe transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
            <img src={logoIcon.url} alt="Huron" className="h-7 w-7" />
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-6 py-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline/60 py-5 font-display text-2xl text-foreground/90 transition-colors hover:text-bronze-glow"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-hairline px-6 py-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block w-full gradient-bronze rounded-sm px-5 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground"
            >
              Request Private Access
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroPavilion}
        alt="A modern luxury Huron pavilion at dusk"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      {/* Layered gradients for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-bronze" />
            <span className="eyebrow">A Private Residential Ecosystem</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Homes by Huron.{" "}
            <span className="block text-gradient-bronze italic">
              The Art of Frictionless Living.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
            A vertically integrated ecosystem eliminating the middleman. We are
            the builder, lender, and lifelong engineer — unified to protect your
            wealth and restore your time.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#residences"
              className="group inline-flex items-center justify-center gap-3 gradient-bronze rounded-sm px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition-all hover:brightness-110"
            >
              Explore Available Plots
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#app"
              className="group inline-flex items-center justify-center gap-3 rounded-sm border border-foreground/25 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/90 transition-all hover:border-bronze hover:text-bronze-glow"
            >
              Launch App Sandbox View
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-4">
          {[
            { k: "01", v: "Builder & Architect" },
            { k: "02", v: "Private Capital" },
            { k: "03", v: "Legal Concierge" },
            { k: "04", v: "Lifetime Engineer" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-mono text-xs text-bronze">{s.k}</div>
              <div className="mt-2 text-sm font-light text-foreground/80">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Pillars ----------
function Pillars() {
  const items = [
    {
      icon: Hammer,
      title: "We Build",
      body:
        "Architecturally led, in-house construction. No subcontracted ambiguity, no margin lost between trades.",
    },
    {
      icon: Wallet,
      title: "We Underwrite",
      body:
        "Huron Private Capital structures bespoke, asset-backed lending against equity, options and trust portfolios.",
    },
    {
      icon: Scale,
      title: "We Coordinate",
      body:
        "A curated panel of independent legal partners, instructed and indemnified entirely at Huron's cost.",
    },
    {
      icon: HeartHandshake,
      title: "We Steward",
      body:
        "A single Relationship Director from first viewing through every decade of ownership and beyond.",
    },
  ];
  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">The Vertical</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              One signature.<br />
              <span className="text-gradient-bronze italic">Four disciplines.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
            {items.map((it) => (
              <div key={it.title} className="group bg-background p-8 transition-colors hover:bg-card">
                <it.icon className="h-6 w-6 text-bronze transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-2xl text-foreground">{it.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Showcase ----------
function Showcase({ onReserve }: { onReserve: (r: Residence) => void }) {
  const [region, setRegion] = useState<Region>("cheshire");
  const filtered = useMemo(() => RESIDENCES.filter((r) => r.region === region), [region]);

  return (
    <section id="residences" className="border-t border-hairline py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="eyebrow">Available Flagship Residences</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Reserved for the few.
            </h2>
          </div>
          <div className="hidden font-mono text-xs text-foreground/50 sm:block">
            {filtered.length} residences · Updated live
          </div>
        </div>

        {/* Region tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-hairline">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className={cn(
                "relative px-1 py-4 text-sm font-light tracking-wide transition-colors sm:px-2",
                region === r.id ? "text-foreground" : "text-foreground/45 hover:text-foreground/80",
              )}
            >
              <span className="px-3">{r.label}</span>
              {region === r.id && (
                <span className="absolute inset-x-0 -bottom-px h-px bg-bronze" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {filtered.map((r) => (
            <ResidenceCard key={r.id} residence={r} onReserve={() => onReserve(r)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResidenceCard({
  residence,
  onReserve,
}: {
  residence: Residence;
  onReserve: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const total = residence.images.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  const statusTone =
    residence.status === "Final Handover Checks"
      ? "text-emerald-300/90"
      : residence.status === "Reserved"
        ? "text-foreground/50"
        : "text-bronze-glow";

  return (
    <article className="group relative overflow-hidden border border-hairline bg-card transition-colors hover:border-bronze/40">
      {/* Image slider */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {residence.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={residence.name}
            loading="lazy"
            width={1280}
            height={896}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out",
              i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        {/* Status tag */}
        <div className="absolute left-5 top-5 flex items-center gap-2 border border-bronze/30 bg-background/70 px-3 py-1.5 backdrop-blur-md">
          <span className={cn("h-1.5 w-1.5 rounded-full bg-bronze status-dot")} />
          <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.18em]", statusTone)}>
            {residence.status}
          </span>
        </div>

        {/* Slider controls */}
        {total > 1 && (
          <div className="absolute right-4 top-4 flex gap-1.5">
            <button
              aria-label="Previous image"
              onClick={prev}
              className="grid h-9 w-9 place-items-center border border-foreground/20 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze-glow"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next image"
              onClick={next}
              className="grid h-9 w-9 place-items-center border border-foreground/20 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze-glow"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-7">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl text-foreground sm:text-3xl">{residence.name}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm font-light text-foreground/60">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-bronze" />
              <span className="truncate">{residence.locality}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
              Fixed Price
            </div>
            <div className="font-display text-xl text-bronze-glow">{residence.price}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-hairline py-4 text-sm font-light text-foreground/80">
          <span className="inline-flex items-center gap-2">
            <Bed className="h-4 w-4 text-bronze" /> {residence.beds} Beds
          </span>
          <span className="inline-flex items-center gap-2">
            <Bath className="h-4 w-4 text-bronze" /> {residence.baths} Baths
          </span>
          <span className="inline-flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-bronze" /> {residence.sqft.toLocaleString()} sq ft
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {residence.materials.map((m) => (
            <li key={m} className="flex items-start gap-2.5 text-sm font-light text-foreground/70">
              <Sparkle className="mt-1 h-3 w-3 shrink-0 text-bronze" />
              <span>{m}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onReserve}
          className="group/btn mt-7 inline-flex w-full items-center justify-between gap-3 border border-bronze/40 bg-bronze/10 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-bronze-glow transition-all hover:border-bronze hover:bg-bronze/20"
        >
          Initiate Priority Reservation
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

// ---------- Reservation Drawer ----------
function ReservationDrawer({
  residence,
  onClose,
}: {
  residence: Residence | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [ltv, setLtv] = useState(60);
  const [wealthSource, setWealthSource] = useState("Executive Stock Options");
  const [portfolioValue, setPortfolioValue] = useState("8500000");
  const [legalOptIn, setLegalOptIn] = useState(true);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const holdTimer = useRef<number | null>(null);

  // Reset on open
  useEffect(() => {
    if (residence) {
      setStep(1);
      setLtv(60);
      setWealthSource("Executive Stock Options");
      setPortfolioValue("8500000");
      setLegalOptIn(true);
      setHolding(false);
      setProgress(0);
      setConfirmed(false);
    }
  }, [residence]);

  // Hold-to-authorize
  useEffect(() => {
    if (!holding) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / 1400) * 100);
      setProgress(p);
      if (p >= 100) {
        setConfirmed(true);
        setHolding(false);
        return;
      }
      holdTimer.current = window.requestAnimationFrame(tick);
    };
    holdTimer.current = window.requestAnimationFrame(tick);
    return () => {
      if (holdTimer.current) window.cancelAnimationFrame(holdTimer.current);
    };
  }, [holding]);

  const open = !!residence;

  // Lock scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!residence) {
    return (
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[70] transition-opacity duration-500",
        )}
      />
    );
  }

  const r = residence;
  const loanAmount = Math.round(
    (parseInt(r.price.replace(/[^0-9]/g, "")) * ltv) / 100,
  );

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-bronze/20 bg-card shadow-luxe transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-hairline px-6 py-5 sm:px-8">
          <div className="min-w-0">
            <div className="eyebrow">Priority Reservation</div>
            <div className="mt-1 truncate font-display text-xl text-foreground">{r.name}</div>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center border border-hairline text-foreground/70 transition-colors hover:border-bronze hover:text-bronze-glow"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 border-b border-hairline px-6 py-4 sm:px-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[0.7rem] transition-colors",
                  step >= n
                    ? "border-bronze bg-bronze/15 text-bronze-glow"
                    : "border-hairline text-foreground/40",
                )}
              >
                {confirmed && n === 4 ? <Check className="h-3.5 w-3.5" /> : n}
              </div>
              {n < 4 && (
                <div
                  className={cn(
                    "h-px flex-1 transition-colors",
                    step > n ? "bg-bronze" : "bg-hairline",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
          {step === 1 && (
            <StepWrap title="The Asset" subtitle="Confirm your selected residence.">
              <div className="overflow-hidden border border-hairline">
                <img src={r.images[0]} alt={r.name} className="aspect-[16/9] w-full object-cover" />
                <div className="bg-background/40 p-6">
                  <div className="font-display text-2xl text-foreground">{r.name}</div>
                  <div className="mt-1 text-sm text-foreground/60">{r.locality}</div>
                  <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-hairline pt-5 text-sm">
                    <Stat label="Beds" value={`${r.beds}`} />
                    <Stat label="Baths" value={`${r.baths}`} />
                    <Stat label="Sq Ft" value={r.sqft.toLocaleString()} />
                  </dl>
                  <div className="mt-6 flex items-end justify-between border-t border-hairline pt-5">
                    <div>
                      <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
                        Transparent Premium Fixed Price
                      </div>
                      <div className="mt-1 font-display text-3xl text-gradient-bronze">{r.price}</div>
                    </div>
                    <div className="text-right text-xs text-foreground/50">
                      Inclusive of legal,<br />commissioning & first-year care
                    </div>
                  </div>
                </div>
              </div>
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap
              title="Huron Private Capital"
              subtitle="Underwriting modelled against your asset-backed wealth profile."
            >
              <div className="space-y-7">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="text-sm font-light text-foreground/80">
                      Loan-to-Value Preference
                    </label>
                    <span className="font-mono text-sm text-bronze-glow">{ltv}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={80}
                    step={5}
                    value={ltv}
                    onChange={(e) => setLtv(parseInt(e.target.value))}
                    className="huron-range mt-3 w-full"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/40">
                    <span>Conservative · 20%</span>
                    <span>Maximum · 80%</span>
                  </div>
                  <div className="mt-5 border border-hairline bg-background/40 p-5">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
                      Indicative Underwritten Facility
                    </div>
                    <div className="mt-2 font-display text-3xl text-foreground">
                      £{loanAmount.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-foreground/55">
                      Drawn directly against the residence + supplemental collateral.
                    </div>
                  </div>
                </div>

                <Field label="Primary Wealth Source">
                  <select
                    value={wealthSource}
                    onChange={(e) => setWealthSource(e.target.value)}
                    className="huron-input"
                  >
                    {[
                      "Executive Stock Options",
                      "Trust Portfolio Distribution",
                      "Founder Equity / Carry",
                      "Family Office Allocation",
                    ].map((o) => (
                      <option key={o} className="bg-card text-foreground">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Verifiable Asset-Backed Portfolio (£)">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={portfolioValue}
                    onChange={(e) => setPortfolioValue(e.target.value.replace(/[^0-9]/g, ""))}
                    className="huron-input"
                  />
                </Field>
              </div>
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap
              title="Frictionless Legal Opt-in"
              subtitle="A single decision replaces months of solicitor negotiation."
            >
              <div className="border border-hairline bg-background/40 p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6">
                  <div className="min-w-0">
                    <div className="font-display text-xl text-foreground">
                      Opt-in to Huron's Curated Panel of Independent Legal Partners
                    </div>
                    <p className="mt-2 text-sm font-light leading-relaxed text-foreground/65">
                      Independent of Huron in counsel, instructed in your name. All
                      conveyancing, search, and disbursement fees{" "}
                      <span className="text-bronze-glow">covered fully by Huron.</span>
                    </p>
                  </div>
                  <Toggle checked={legalOptIn} onChange={setLegalOptIn} />
                </div>
                <ul className="mt-6 grid gap-2 border-t border-hairline pt-5 text-sm font-light text-foreground/70">
                  {[
                    "Fee waiver up to £42,000",
                    "Independent professional indemnity (PI)",
                    "End-to-end coordination by your Relationship Director",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-bronze" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </StepWrap>
          )}

          {step === 4 && (
            <StepWrap title="Secure Final Commitment" subtitle="Biometric authorisation, hold to confirm.">
              {!confirmed ? (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <svg viewBox="0 0 120 120" className="h-44 w-44 -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="var(--color-hairline)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="var(--color-bronze)"
                        strokeWidth="2"
                        strokeDasharray={2 * Math.PI * 54}
                        strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
                        className="transition-[stroke-dashoffset] duration-75"
                      />
                    </svg>
                    <button
                      onPointerDown={() => setHolding(true)}
                      onPointerUp={() => {
                        setHolding(false);
                        if (progress < 100) setProgress(0);
                      }}
                      onPointerLeave={() => {
                        if (holding) {
                          setHolding(false);
                          if (progress < 100) setProgress(0);
                        }
                      }}
                      className="absolute inset-2 grid place-items-center rounded-full border border-bronze/40 bg-background/60 transition-colors hover:border-bronze"
                    >
                      <Fingerprint
                        className={cn(
                          "h-14 w-14 transition-colors",
                          holding ? "text-bronze-glow" : "text-bronze/80",
                        )}
                        strokeWidth={1}
                      />
                    </button>
                  </div>
                  <p className="mt-7 text-center font-mono text-[0.7rem] uppercase tracking-[0.25em] text-foreground/60">
                    Hold Finger to Digitally Authorize<br />with FaceID / Passkey
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs text-foreground/50">
                    <Lock className="h-3.5 w-3.5 text-bronze" />
                    End-to-end encrypted · Huron Vault
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full border border-bronze bg-bronze/10">
                    <Check className="h-9 w-9 text-bronze-glow" />
                  </div>
                  <h4 className="mt-7 font-display text-3xl text-foreground">
                    Priority Reservation Confirmed.
                  </h4>
                  <p className="mt-3 max-w-sm text-sm font-light text-foreground/65">
                    Your Dedicated Relationship Director will arrive via secure call
                    within <span className="text-bronze-glow">15 minutes</span>.
                  </p>
                  <div className="mt-8 w-full border border-hairline bg-background/40 p-5 text-left">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
                      Reservation Reference
                    </div>
                    <div className="mt-1 font-mono text-lg text-bronze-glow">
                      HRN-{r.id.toUpperCase()}-{Math.floor(Math.random() * 9000 + 1000)}
                    </div>
                  </div>
                </div>
              )}
            </StepWrap>
          )}
        </div>

        {/* Footer controls */}
        <div className="grid grid-cols-2 gap-3 border-t border-hairline px-6 py-5 sm:px-8">
          <button
            onClick={() => (step === 1 ? onClose() : setStep((s) => s - 1))}
            disabled={confirmed}
            className="border border-hairline px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-foreground/60 disabled:opacity-30"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="gradient-bronze px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:brightness-110"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={onClose}
              disabled={!confirmed}
              className="gradient-bronze px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-all hover:brightness-110 disabled:opacity-30"
            >
              {confirmed ? "Close" : "Awaiting Authorization"}
            </button>
          )}
        </div>
      </aside>

      <style>{`
        .huron-input {
          width: 100%;
          background: color-mix(in oklab, var(--color-ink) 60%, transparent);
          border: 1px solid var(--color-hairline);
          padding: 0.875rem 1rem;
          color: var(--color-foreground);
          font-size: 0.875rem;
          font-weight: 300;
          letter-spacing: 0.02em;
          transition: border-color 200ms, box-shadow 200ms;
          outline: none;
        }
        .huron-input:focus {
          border-color: var(--color-bronze);
          box-shadow: 0 0 0 1px var(--color-bronze), 0 0 24px -6px color-mix(in oklab, var(--color-bronze) 60%, transparent);
        }
        .huron-range {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: linear-gradient(to right, var(--color-bronze) 0%, var(--color-bronze) ${ltv}%, var(--color-hairline) ${ltv}%);
          outline: none;
        }
        .huron-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: var(--color-bronze-glow);
          border: 3px solid var(--color-ink);
          box-shadow: 0 0 0 1px var(--color-bronze), 0 0 18px -2px color-mix(in oklab, var(--color-bronze) 70%, transparent);
          cursor: grab;
        }
        .huron-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: var(--color-bronze-glow);
          border: 3px solid var(--color-ink);
          cursor: grab;
        }
      `}</style>
    </div>
  );
}

function StepWrap({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="eyebrow">{title}</div>
      <p className="mt-2 max-w-md text-sm font-light text-foreground/60">{subtitle}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
        {label}
      </div>
      <div className="mt-1 font-display text-xl text-foreground">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/55">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
        checked ? "border-bronze bg-bronze/30" : "border-hairline bg-background/40",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 grid h-5 w-5 place-items-center rounded-full transition-all duration-300",
          checked ? "left-[22px] bg-bronze-glow" : "left-0.5 bg-foreground/60",
        )}
      />
    </button>
  );
}

// ---------- Sandbox app section ----------
function SandboxApp() {
  const tabs = [
    {
      id: "predict",
      title: "Predictive Servicing",
      body:
        "Foundation, mechanical and façade sensors stream telemetry to Huron Engineering. We detect drift before it becomes a defect — and dispatch a named engineer to your door.",
    },
    {
      id: "finance",
      title: "One-Tap Financing Updates",
      body:
        "Refinance, draw additional facilities, or rebalance LTV at the speed of a passkey. Underwritten by Huron Private Capital, not by a queue.",
    },
    {
      id: "key",
      title: "The Single Key Promise",
      body:
        "One Relationship Director. One contract. One key. For the lifetime of your residency — and inheritable to the next generation.",
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const [phoneTab, setPhoneTab] = useState<"dashboard" | "maintenance">("dashboard");
  const [authorized, setAuthorized] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!authorized) return;
    setCountdown(120 * 60); // 2 hours in seconds
    const id = window.setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, [authorized]);

  const eta = useMemo(() => {
    const h = Math.floor(countdown / 3600);
    const m = Math.floor((countdown % 3600) / 60);
    const s = countdown % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, [countdown]);

  return (
    <section id="app" className="relative border-t border-hairline bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">The Huron App · Sandbox Preview</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Your residence,<br />
              <span className="text-gradient-bronze italic">at your fingertip.</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/65">
              An aftercare interface engineered to honour the same standards as
              the residences themselves. Calm by default. Decisive on demand.
            </p>

            <div className="mt-10 divide-y divide-hairline border-y border-hairline">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="group block w-full py-6 text-left"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                    <div className="min-w-0">
                      <div className={cn(
                        "font-display text-2xl transition-colors",
                        active === t.id ? "text-bronze-glow" : "text-foreground/80 group-hover:text-foreground",
                      )}>
                        {t.title}
                      </div>
                      <div
                        className={cn(
                          "grid overflow-hidden text-sm font-light text-foreground/65 transition-all duration-500",
                          active === t.id ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="min-h-0">
                          <p className="leading-relaxed">{t.body}</p>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={cn(
                      "h-5 w-5 shrink-0 transition-all",
                      active === t.id ? "text-bronze rotate-45" : "text-foreground/40",
                    )} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_30%,_color-mix(in_oklab,_var(--color-bronze)_25%,_transparent),_transparent_70%)] blur-3xl" />
            <div className="relative aspect-[9/19] rounded-[2.5rem] border border-bronze/30 bg-background p-3 shadow-luxe">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-b from-card to-background">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 font-mono text-[0.65rem] text-foreground/70">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    <span className="h-2 w-3 border border-foreground/60" />
                  </span>
                </div>

                <div className="px-5 pt-6">
                  <img src={logoIcon.url} alt="" className="h-6 w-6" />
                  <div className="mt-3 font-display text-lg text-foreground">
                    Good evening,<br />
                    <span className="text-bronze-glow">Mr. Hartwell.</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mx-5 mt-5 flex rounded-full border border-hairline bg-background/60 p-1 text-[0.65rem] uppercase tracking-[0.15em]">
                  <button
                    onClick={() => setPhoneTab("dashboard")}
                    className={cn(
                      "flex-1 rounded-full py-2 transition-colors",
                      phoneTab === "dashboard" ? "bg-bronze/20 text-bronze-glow" : "text-foreground/50",
                    )}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setPhoneTab("maintenance")}
                    className={cn(
                      "flex-1 rounded-full py-2 transition-colors",
                      phoneTab === "maintenance" ? "bg-bronze/20 text-bronze-glow" : "text-foreground/50",
                    )}
                  >
                    Engineering
                  </button>
                </div>

                <div className="mt-5 space-y-3 px-5">
                  {phoneTab === "dashboard" ? (
                    <div className="animate-in fade-in duration-500 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <PhoneCard icon={Thermometer} label="Interior" value="21.5°" sub="Optimal" />
                        <PhoneCard icon={ShieldCheck} label="Security" value="Armed" sub="All zones" />
                      </div>
                      <div className="border border-hairline bg-background/60 p-4">
                        <div className="flex items-center gap-2">
                          <CircleDot className="h-3 w-3 text-bronze status-dot" />
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bronze">
                            Live · Building Fabric
                          </span>
                        </div>
                        <div className="mt-2 text-sm font-light text-foreground/85">
                          All Core Building Fabrics: Operating Optimally
                        </div>
                        <div className="mt-3 flex items-center gap-1">
                          {Array.from({ length: 14 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-6 w-1 bg-bronze/70"
                              style={{ opacity: 0.4 + (i % 5) * 0.12 }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="border border-hairline bg-background/60 p-4">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Activity className="h-4 w-4 text-bronze" />
                          <span className="text-sm font-light">42 sensors · last sync 2s ago</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500 space-y-3">
                      <div className="border border-bronze/40 bg-bronze/5 p-4">
                        <div className="flex items-center gap-2">
                          <Bell className="h-3.5 w-3.5 text-bronze status-dot" />
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bronze">
                            System Notice · Priority
                          </span>
                        </div>
                        <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-foreground/85">
                          Secondary HVAC pressure drop detected by foundation sensors.
                          Huron Engineer <span className="text-bronze-glow">Marcus</span> is
                          nearby at 2:00 PM today. Authorize access?
                        </p>
                        {!authorized ? (
                          <button
                            onClick={() => setAuthorized(true)}
                            className="mt-3 w-full gradient-bronze py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary-foreground"
                          >
                            Authorize Access
                          </button>
                        ) : (
                          <div className="mt-3 space-y-2 border-t border-bronze/30 pt-3">
                            <div className="flex items-center gap-2 text-emerald-300/90">
                              <Check className="h-3.5 w-3.5" />
                              <span className="text-[0.7rem]">Access Authorized — Engineer Scheduled</span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[0.7rem] text-foreground/70">
                              <span>ETA Window</span>
                              <span className="text-bronze-glow">{eta}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="border border-hairline bg-background/60 p-4">
                        <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/50">
                          This Week
                        </div>
                        <ul className="mt-2 space-y-2 text-[0.78rem] font-light text-foreground/75">
                          <li className="flex items-center gap-2"><Check className="h-3 w-3 text-bronze" />Lutron firmware update applied</li>
                          <li className="flex items-center gap-2"><Check className="h-3 w-3 text-bronze" />Façade thermal scan completed</li>
                          <li className="flex items-center gap-2"><Check className="h-3 w-3 text-bronze" />Wine vault calibrated to 13°C</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Thermometer;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="border border-hairline bg-background/60 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-bronze" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foreground/50">{label}</span>
      </div>
      <div className="mt-1.5 font-display text-xl text-foreground">{value}</div>
      <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-bronze">{sub}</div>
    </div>
  );
}

// ---------- Comparison ----------
function Comparison() {
  const rows = [
    { feature: "Builder & Architect", huron: "In-house, single contract", legacy: "Subcontracted, fragmented" },
    { feature: "Mortgage / Lending", huron: "Huron Private Capital, asset-backed", legacy: "External bank · 6–14 weeks" },
    { feature: "Conveyancing & Legal", huron: "Curated panel · fully covered", legacy: "Self-instructed · £8–42K" },
    { feature: "Snagging & Aftercare", huron: "Predictive · lifetime", legacy: "Reactive · 12 month defects" },
    { feature: "Point of Contact", huron: "1 Relationship Director", legacy: "12+ counterparties" },
    { feature: "Timeline to Keys", huron: "21 days from reservation", legacy: "16–24 weeks average" },
  ];
  return (
    <section id="capital" className="border-t border-hairline py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow">The Efficiency Dividend</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Huron, against the legacy chain.
          </h2>
          <p className="mt-5 text-base font-light text-foreground/65">
            Every line below represents weeks, fees, or anxiety that Huron's
            ecosystem absorbs on your behalf.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border border-hairline">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-card font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
            <div className="border-b border-hairline px-5 py-4 sm:px-6">Discipline</div>
            <div className="border-b border-l border-hairline px-5 py-4 text-bronze sm:px-6">Huron Ecosystem</div>
            <div className="border-b border-l border-hairline px-5 py-4 sm:px-6">Traditional Chain</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                "group grid grid-cols-[1.2fr_1fr_1fr] text-sm font-light transition-colors hover:bg-card",
                i % 2 === 0 ? "bg-background" : "bg-background/60",
              )}
            >
              <div className="border-b border-hairline px-5 py-5 text-foreground/90 sm:px-6">{row.feature}</div>
              <div className="flex items-center gap-2 border-b border-l border-hairline px-5 py-5 text-bronze-glow sm:px-6">
                <Check className="h-3.5 w-3.5 shrink-0" /> <span>{row.huron}</span>
              </div>
              <div className="border-b border-l border-hairline px-5 py-5 text-foreground/55 sm:px-6">
                {row.legacy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function ContactPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    region: "Cheshire Portfolio",
    bridging: false,
  });

  return (
    <section id="contact" className="border-t border-hairline bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow">Private Portfolio</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Request a Private<br />
              <span className="text-gradient-bronze italic">Portfolio Invitation.</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/65">
              Submissions are reviewed by a Huron Relationship Director within
              one business day. Discretion is the precondition, not the courtesy.
            </p>
            <div className="mt-10 space-y-4 border-t border-hairline pt-8 text-sm font-light text-foreground/70">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-bronze" />
                Vetted, NDA-bound correspondence
              </div>
              <div className="flex items-center gap-3">
                <KeyRound className="h-4 w-4 text-bronze" />
                Reservation slots released by invitation
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6 border border-hairline bg-background p-8 sm:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-bronze bg-bronze/10">
                  <Check className="h-7 w-7 text-bronze-glow" />
                </div>
                <h3 className="mt-6 font-display text-3xl">Invitation Pending Review</h3>
                <p className="mt-3 max-w-sm text-sm font-light text-foreground/65">
                  A Relationship Director will be in touch via your nominated
                  channel within one business day.
                </p>
              </div>
            ) : (
              <>
                <ContactField label="Full Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                    placeholder="Mr. Alexander Hartwell"
                  />
                </ContactField>
                <ContactField label="Corporate Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                    placeholder="a.hartwell@firm.co.uk"
                  />
                </ContactField>
                <ContactField label="Preferred Region">
                  <select
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                    className="contact-input"
                  >
                    <option className="bg-card">Cheshire Portfolio</option>
                    <option className="bg-card">Central Manchester Penthouses</option>
                    <option className="bg-card">Bespoke / Off-Market</option>
                  </select>
                </ContactField>
                <label className="flex cursor-pointer items-start gap-3 border border-hairline bg-card/60 p-4 transition-colors hover:border-bronze/50">
                  <input
                    type="checkbox"
                    checked={form.bridging}
                    onChange={(e) => setForm({ ...form, bridging: e.target.checked })}
                    className="huron-checkbox mt-0.5"
                  />
                  <span className="text-sm font-light text-foreground/85">
                    Do you require bespoke bridging finance solutions?
                  </span>
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 gradient-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-all hover:brightness-110"
                >
                  Submit Invitation Request
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </>
            )}
            <style>{`
              .contact-input {
                width: 100%;
                background: transparent;
                border: 1px solid var(--color-hairline);
                padding: 1rem 1.1rem;
                color: var(--color-foreground);
                font-size: 0.9rem;
                font-weight: 300;
                letter-spacing: 0.01em;
                outline: none;
                transition: border-color 250ms, box-shadow 250ms;
              }
              .contact-input::placeholder { color: color-mix(in oklab, var(--color-foreground) 35%, transparent); }
              .contact-input:focus {
                border-color: var(--color-bronze);
                box-shadow: 0 0 0 1px var(--color-bronze), 0 0 28px -8px color-mix(in oklab, var(--color-bronze) 70%, transparent);
              }
              .huron-checkbox {
                appearance: none;
                width: 18px;
                height: 18px;
                border: 1px solid var(--color-hairline);
                background: transparent;
                cursor: pointer;
                position: relative;
                transition: all 200ms;
              }
              .huron-checkbox:checked {
                background: var(--color-bronze);
                border-color: var(--color-bronze);
              }
              .huron-checkbox:checked::after {
                content: "";
                position: absolute;
                left: 5px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid var(--color-ink);
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
              }
            `}</style>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/55">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="border-t border-hairline bg-background py-14">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr_auto]">
          <img src={logoMark.url} alt="Huron Residences" className="h-14 w-auto" />
          <div className="shimmer-line h-px" />
          <div className="text-right font-mono text-[0.7rem] uppercase tracking-[0.2em] text-foreground/45">
            Huron Residences Ltd. · Cheshire & Manchester
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 text-xs font-light text-foreground/45 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Huron Residences. All rights reserved.</span>
          <span>Authorised & Regulated · Member of the Prime Resident Council</span>
        </div>
      </div>
    </footer>
  );
}
