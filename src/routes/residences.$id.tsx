import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Bath, Bed, MapPin, Maximize2, ShieldCheck, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp, Stagger, StaggerItem } from "@/components/huron/motion";
import { getResidence, RESIDENCES } from "@/lib/huron-data";
import { useReservation } from "@/components/huron/ReservationContext";

export const Route = createFileRoute("/residences/$id")({
  head: ({ params }) => {
    const r = RESIDENCES.find((x) => x.id === params.id);
    return {
      meta: [
        { title: r ? `${r.name} — Huron Residences` : "Residence — Huron" },
        { name: "description", content: r?.tagline ?? "A Huron flagship residence." },
        { property: "og:title", content: r ? `${r.name} — Huron Residences` : "Huron Residences" },
        { property: "og:description", content: r?.tagline ?? "A Huron flagship residence." },
        ...(r ? [{ property: "og:image", content: r.gallery[0] }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const r = getResidence(params.id);
    if (!r) throw notFound();
    return r;
  },
  component: ResidenceDetail,
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-foreground">Residence not found</h1>
        <Link to="/residences" className="mt-6 inline-flex items-center gap-2 text-sm text-bronze-glow">
          <ArrowLeft className="h-4 w-4" /> Return to portfolio
        </Link>
      </div>
    </div>
  ),
});

function ResidenceDetail() {
  const r = Route.useLoaderData();
  const [hero, setHero] = useState(0);
  const { reserve } = useReservation();

  return (
    <>
      <section className="relative pt-24">
        <div className="relative h-[78svh] w-full overflow-hidden">
          {r.gallery.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={r.name}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
                i === hero ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1400px] px-6 pb-12 lg:px-10">
              <FadeUp>
                <Link to="/residences" className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-bronze-glow">
                  <ArrowLeft className="h-3.5 w-3.5" /> Portfolio
                </Link>
                <div className="mt-5 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
                  <div>
                    <span className="eyebrow">{r.status}</span>
                    <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
                      {r.name}
                    </h1>
                    <div className="mt-3 flex items-center gap-2 text-foreground/70">
                      <MapPin className="h-4 w-4 text-bronze" />
                      <span className="font-light">{r.locality}</span>
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/50">Transparent Fixed Price</div>
                    <div className="mt-1 font-display text-4xl text-gradient-bronze">{r.price}</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {r.gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setHero(i)}
                      className={cn(
                        "h-14 w-20 overflow-hidden border transition-all",
                        i === hero ? "border-bronze opacity-100" : "border-hairline opacity-60 hover:opacity-100",
                      )}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <FadeUp>
              <span className="eyebrow">The Residence</span>
              <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">{r.tagline}</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base font-light leading-relaxed text-foreground/75">{r.narrative}</p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
                <Stat icon={Bed} label="Beds" value={`${r.beds}`} />
                <Stat icon={Bath} label="Baths" value={`${r.baths}`} />
                <Stat icon={Maximize2} label="Sq Ft" value={r.sqft.toLocaleString()} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-card py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp>
            <span className="eyebrow">Technical Specifications</span>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Engineered to <span className="text-gradient-bronze italic">measurable certainty.</span>
            </h2>
          </FadeUp>
          <Stagger className="mt-10 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {r.specs.map((s) => (
              <StaggerItem key={s.label} className="bg-background p-6">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">{s.label}</div>
                <div className="mt-3 font-display text-lg leading-snug text-foreground">{s.value}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-hairline py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <span className="eyebrow">Materials Ledger</span>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Every brand. Every detail. <span className="text-gradient-bronze italic">Indemnified.</span>
            </h2>
            <p className="mt-4 text-sm font-light text-foreground/65">
              The Huron Materials Ledger is the same document inherited by every
              future owner of this residence.
            </p>
          </FadeUp>
          <div className="mt-10 overflow-hidden border border-hairline">
            <div className="grid grid-cols-[1.2fr_1.4fr_1.8fr] bg-card font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/55">
              <div className="border-b border-hairline px-5 py-4">Discipline</div>
              <div className="border-b border-l border-hairline px-5 py-4 text-bronze">Specified Brand</div>
              <div className="border-b border-l border-hairline px-5 py-4">Detail</div>
            </div>
            {r.ledger.map((row, i) => (
              <div key={row.discipline} className={cn("grid grid-cols-[1.2fr_1.4fr_1.8fr] text-sm font-light", i % 2 === 0 ? "bg-background" : "bg-background/60")}>
                <div className="border-b border-hairline px-5 py-5 text-foreground/90">{row.discipline}</div>
                <div className="border-b border-l border-hairline px-5 py-5 text-bronze-glow">{row.brand}</div>
                <div className="border-b border-l border-hairline px-5 py-5 text-foreground/65">{row.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {r.materials.map((m) => (
              <div key={m} className="flex items-start gap-3 border border-hairline bg-card/40 p-4 text-sm font-light text-foreground/80">
                <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-card py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="grid gap-8 border border-bronze/30 bg-background p-10 shadow-luxe lg:grid-cols-[1.4fr_auto] lg:items-end">
            <div>
              <span className="eyebrow">Initiate Priority Reservation</span>
              <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
                Secure {r.name} in four signed steps.
              </h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-foreground/70">
                Reservation includes underwriting by Huron Private Capital, full
                legal coordination, and the lifetime engineering covenant —
                authorised in under ninety seconds via biometric passkey.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs text-foreground/55">
                <ShieldCheck className="h-3.5 w-3.5 text-bronze" />
                End-to-end encrypted · Huron Vault
              </div>
            </div>
            <button
              onClick={() => reserve(r)}
              className="group inline-flex items-center justify-center gap-3 gradient-bronze px-8 py-5 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-luxe transition-all hover:brightness-110"
            >
              Initiate Priority Reservation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Bed; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-4 w-4 text-bronze" />
      <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/45">{label}</div>
      <div className="mt-1 font-display text-2xl text-foreground">{value}</div>
    </div>
  );
}
