import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Bath, Bed, ChevronLeft, ChevronRight, MapPin, Maximize2, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp, Stagger, StaggerItem } from "@/components/huron/motion";
import { RESIDENCES, REGIONS, type Region, type Residence } from "@/lib/huron-data";

export const Route = createFileRoute("/residences/")({
  head: () => ({
    meta: [
      { title: "The Residence Portfolio — Huron" },
      { name: "description", content: "Four flagship residences across Cheshire and central Manchester. Each architected, financed and stewarded under a single Huron signature." },
      { property: "og:title", content: "The Residence Portfolio — Huron" },
      { property: "og:description", content: "Cheshire estates and Manchester penthouses, available by invitation." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [region, setRegion] = useState<Region>("cheshire");
  const filtered = useMemo(() => RESIDENCES.filter((r) => r.region === region), [region]);

  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-3xl">
          <span className="eyebrow">The Residence Portfolio</span>
          <h1 className="mt-4 font-display text-5xl tracking-[-0.02em] text-foreground sm:text-6xl">
            Reserved <span className="text-gradient-bronze italic">for the few.</span>
          </h1>
          <p className="mt-6 text-base font-light leading-relaxed text-foreground/65">
            Every residence below is delivered against a fixed price and a single
            contract. Specifications, materials and engineering ledgers are
            transparent, indemnified, and inheritable.
          </p>
        </FadeUp>

        <div className="mt-12 flex flex-wrap gap-2 border-b border-hairline">
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
              {region === r.id && <span className="absolute inset-x-0 -bottom-px h-px bg-bronze" />}
            </button>
          ))}
          <div className="ml-auto py-4 font-mono text-xs text-foreground/45">
            {filtered.length} residences · updated live
          </div>
        </div>

        <Stagger className="mt-12 grid gap-8 md:grid-cols-2">
          {filtered.map((r) => (
            <StaggerItem key={r.id}>
              <ResidenceCard residence={r} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ResidenceCard({ residence }: { residence: Residence }) {
  const [idx, setIdx] = useState(0);
  const total = residence.images.length;
  const next = (e: React.MouseEvent) => { e.preventDefault(); setIdx((i) => (i + 1) % total); };
  const prev = (e: React.MouseEvent) => { e.preventDefault(); setIdx((i) => (i - 1 + total) % total); };

  const statusTone =
    residence.status === "Final Handover Checks" ? "text-emerald-300/90" :
    residence.status === "Reserved" ? "text-foreground/50" : "text-bronze-glow";

  return (
    <Link
      to="/residences/$id"
      params={{ id: residence.id }}
      className="group relative block overflow-hidden border border-hairline bg-card transition-colors hover:border-bronze/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {residence.images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={residence.name}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out",
              i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        <div className="absolute left-5 top-5 flex items-center gap-2 border border-bronze/30 bg-background/70 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-bronze status-dot" />
          <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.18em]", statusTone)}>
            {residence.status}
          </span>
        </div>

        {total > 1 && (
          <div className="absolute right-4 top-4 flex gap-1.5">
            <button aria-label="Previous image" onClick={prev} className="grid h-9 w-9 place-items-center border border-foreground/20 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze-glow">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button aria-label="Next image" onClick={next} className="grid h-9 w-9 place-items-center border border-foreground/20 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:border-bronze hover:text-bronze-glow">
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
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">Fixed Price</div>
            <div className="font-display text-xl text-bronze-glow">{residence.price}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-hairline py-4 text-sm font-light text-foreground/80">
          <span className="inline-flex items-center gap-2"><Bed className="h-4 w-4 text-bronze" /> {residence.beds} Beds</span>
          <span className="inline-flex items-center gap-2"><Bath className="h-4 w-4 text-bronze" /> {residence.baths} Baths</span>
          <span className="inline-flex items-center gap-2"><Maximize2 className="h-4 w-4 text-bronze" /> {residence.sqft.toLocaleString()} sq ft</span>
        </div>

        <ul className="mt-5 space-y-2">
          {residence.materials.slice(0, 3).map((m) => (
            <li key={m} className="flex items-start gap-2.5 text-sm font-light text-foreground/70">
              <Sparkle className="mt-1 h-3 w-3 shrink-0 text-bronze" />
              <span>{m}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 inline-flex w-full items-center justify-between gap-3 border border-bronze/40 bg-bronze/10 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-bronze-glow transition-all group-hover:border-bronze group-hover:bg-bronze/20">
          View Residence Dossier
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
