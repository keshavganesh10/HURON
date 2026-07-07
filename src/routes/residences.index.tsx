import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Bath, Bed, ChevronLeft, ChevronRight, MapPin, Maximize2, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp, Stagger, StaggerItem } from "@/components/huron/motion";
import { RESIDENCES, FILTERS, filterResidences, type FilterKey, type Residence } from "@/lib/huron-data";
import { PropertyModal } from "@/components/huron/PropertyModal";

export const Route = createFileRoute("/residences/")({
  head: () => ({
    meta: [
      { title: "The Residence Portfolio — Huron" },
      { name: "description", content: "Five flagship residences across Cheshire and Manchester. Each architected, financed and stewarded under a single Huron signature." },
      { property: "og:title", content: "The Residence Portfolio — Huron" },
      { property: "og:description", content: "Cheshire estates and Manchester penthouses, available by invitation." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const filtered = useMemo(() => filterResidences(filter), [filter]);
  const openResidence = openId ? RESIDENCES.find((r) => r.id === openId) ?? null : null;

  return (
    <>
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">The Residence Portfolio</span>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.02em] text-foreground sm:text-6xl">
              Reserved <span className="text-gradient-bronze italic">for the few.</span>
            </h1>
            <p className="mt-6 text-base font-light leading-relaxed text-foreground/65">
              Every residence below is delivered against a fixed price and a single contract. Specifications, materials and engineering ledgers are transparent, indemnified, and inheritable.
            </p>
          </FadeUp>
        </div>

        <div className="sticky top-16 z-30 mt-12 border-y border-hairline bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-6 py-3 lg:px-10">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "shrink-0 border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-all",
                  filter === f.id
                    ? "border-bronze bg-bronze/15 text-bronze-glow"
                    : "border-hairline text-foreground/60 hover:border-bronze/40 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
            <div className="ml-auto shrink-0 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">
              {filtered.length} live
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pt-12 lg:px-10">
          <Stagger className="grid gap-8 md:grid-cols-2">
            {filtered.map((r) => (
              <StaggerItem key={r.id}>
                <ResidenceCard residence={r} onOpen={() => setOpenId(r.id)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <PropertyModal residence={openResidence} onClose={() => setOpenId(null)} />
    </>
  );
}

function ResidenceCard({ residence, onOpen }: { residence: Residence; onOpen: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = residence.images.length;
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); };

  const statusTone =
    residence.status === "Final Handover" || residence.status === "Move-In Ready" ? "text-emerald-300/90" :
    residence.status === "Reserved" ? "text-foreground/50" : "text-bronze-glow";

  return (
    <button
      onClick={onOpen}
      className="group relative block w-full overflow-hidden border border-hairline bg-card text-left transition-colors hover:border-bronze/40"
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
          Open Full Dossier
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}
