import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bath, Bed, MapPin, Maximize2, ShieldCheck, Sparkle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Residence, Upgrade } from "@/lib/huron-data";
import { useReservation } from "./ReservationContext";
import { useActiveProperty } from "@/stores/active-property";

export function PropertyModal({
  residence,
  onClose,
}: {
  residence: Residence | null;
  onClose: () => void;
}) {
  const { reserve } = useReservation();
  const setActive = useActiveProperty((s) => s.setActive);
  const [hero, setHero] = useState(0);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const configurable =
    residence?.status === "Off-Plan" || residence?.status === "Structural Framing";

  useEffect(() => {
    if (residence) {
      setHero(0);
      setSelected({});
      setHoveredRoom(null);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [residence]);

  const total = useMemo(() => {
    if (!residence) return 0;
    const extras = residence.upgrades.reduce(
      (acc, u) => (selected[u.id] ? acc + u.delta : acc),
      0,
    );
    return residence.priceValue + extras;
  }, [residence, selected]);

  const displayTotal = useAnimatedNumber(total);

  return (
    <AnimatePresence>
      {residence && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="sticky top-0 z-10 border-b border-hairline bg-background/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
              <div className="min-w-0">
                <div className="eyebrow">{residence.status}</div>
                <div className="mt-1 truncate font-display text-xl text-foreground">{residence.name}</div>
              </div>
              <button
                aria-label="Close"
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center border border-hairline text-foreground/70 transition-colors hover:border-bronze hover:text-bronze-glow"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
            className="mx-auto max-w-[1400px] px-6 pb-32 pt-8 lg:px-10"
          >
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border border-hairline">
                  {residence.gallery.map((src, i) => (
                    <img
                      key={src + i}
                      src={src}
                      alt={residence.name}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                        i === hero ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {residence.gallery.map((src, i) => (
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
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-sm font-light text-foreground/70">
                  <MapPin className="h-3.5 w-3.5 text-bronze" />
                  {residence.locality}
                </div>
                <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
                  {residence.name}
                </h1>
                <p className="mt-5 text-base font-light leading-relaxed text-foreground/75">
                  {residence.narrative}
                </p>

                <div className="mt-7 grid grid-cols-3 gap-4 border-y border-hairline py-5 text-sm">
                  <Stat icon={Bed} label="Beds" value={`${residence.beds}`} />
                  <Stat icon={Bath} label="Baths" value={`${residence.baths}`} />
                  <Stat icon={Maximize2} label="Sq Ft" value={residence.sqft.toLocaleString()} />
                </div>

                <div className="mt-6">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/50">
                    Transparent Fixed Price
                  </div>
                  <div className="mt-1 font-display text-4xl text-gradient-bronze">{residence.price}</div>
                </div>
              </div>
            </div>

            {/* Floorplan + Highlights */}
            <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="eyebrow">Digital Floorplan</span>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                  Every room, <span className="text-gradient-bronze italic">already engineered.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm font-light text-foreground/65">
                  Hover any volume to inspect its independently commissioned envelope, ventilation and lighting scheme.
                </p>
                <div className="mt-6 border border-hairline bg-card p-4">
                  <Floorplan hovered={hoveredRoom} onHover={setHoveredRoom} />
                  <div className="mt-3 min-h-[2.5rem] font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bronze-glow">
                    {hoveredRoom ?? "Hover a room to inspect"}
                  </div>
                </div>
              </div>

              <div>
                <span className="eyebrow">Signature Highlights</span>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                  Engineered <span className="text-gradient-bronze italic">above the spec.</span>
                </h2>
                <ul className="mt-6 space-y-3">
                  {residence.materials.map((m) => (
                    <li key={m} className="flex items-start gap-3 border border-hairline bg-card/60 p-4 text-sm font-light text-foreground/80">
                      <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Configurator */}
            {configurable && residence.upgrades.length > 0 && (
              <div className="mt-16 border border-bronze/30 bg-card p-8 shadow-luxe sm:p-10">
                <span className="eyebrow">Build Your Huron · Customisation Engine</span>
                <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                  Specify to the <span className="text-gradient-bronze italic">last measurable detail.</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm font-light text-foreground/65">
                  Configure high-efficiency engineering upgrades before groundworks. Every option is locked to a fixed cost, indemnified and commissioned by the Huron Engineer Fleet.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {residence.upgrades.map((u) => (
                    <UpgradeToggle
                      key={u.id}
                      upgrade={u}
                      checked={!!selected[u.id]}
                      onToggle={() =>
                        setSelected((prev) => ({ ...prev, [u.id]: !prev[u.id] }))
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Specs Grid */}
            <div className="mt-16">
              <span className="eyebrow">Technical Specifications</span>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Measurable <span className="text-gradient-bronze italic">certainty.</span>
              </h2>
              <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {residence.specs.map((s) => (
                  <div key={s.label} className="bg-background p-6">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">{s.label}</div>
                    <div className="mt-3 font-display text-lg leading-snug text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sticky bottom bar */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="fixed inset-x-0 bottom-0 z-20 border-t border-bronze/25 bg-background/90 backdrop-blur-xl"
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:px-10">
              <div className="min-w-0">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/50">
                  {configurable && residence.upgrades.some((u) => selected[u.id]) ? "Configured Total" : "Fixed Price"}
                </div>
                <div className="mt-0.5 font-display text-2xl text-gradient-bronze sm:text-3xl tabular-nums">
                  £{displayTotal.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => {
                  setActive(residence);
                  reserve(residence);
                  onClose();
                }}
                className="group inline-flex items-center justify-center gap-3 gradient-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-all hover:brightness-110 sm:px-8"
              >
                <ShieldCheck className="h-4 w-4" />
                Initiate Reservation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Bed; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-4 w-4 text-bronze" />
      <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/45">{label}</div>
      <div className="mt-1 font-display text-2xl text-foreground">{value}</div>
    </div>
  );
}

function UpgradeToggle({
  upgrade,
  checked,
  onToggle,
}: {
  upgrade: Upgrade;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border p-5 text-left transition-all",
        checked
          ? "border-bronze bg-bronze/10 shadow-luxe"
          : "border-hairline bg-background/40 hover:border-bronze/40",
      )}
    >
      <div className="min-w-0">
        <div className={cn("font-display text-lg", checked ? "text-bronze-glow" : "text-foreground")}>
          {upgrade.label}
        </div>
        <div className="mt-1 text-xs font-light text-foreground/60">{upgrade.sublabel}</div>
        <div className="mt-3 font-mono text-[0.7rem] tracking-[0.16em] text-bronze">
          +£{upgrade.delta.toLocaleString()}
        </div>
      </div>
      <div
        className={cn(
          "grid h-7 w-12 items-center rounded-full border p-0.5 transition-colors",
          checked ? "border-bronze bg-bronze/30" : "border-hairline bg-background/60",
        )}
      >
        <span
          className={cn(
            "block h-6 w-6 rounded-full transition-all",
            checked ? "translate-x-5 bg-bronze-glow" : "translate-x-0 bg-foreground/40",
          )}
        />
      </div>
    </button>
  );
}

const ROOMS = [
  { id: "Principal Suite · R-9.2 envelope", x: 20, y: 20, w: 180, h: 120 },
  { id: "Library · STC 68 acoustic", x: 210, y: 20, w: 120, h: 120 },
  { id: "Kitchen · Miele & Gaggenau", x: 340, y: 20, w: 180, h: 120 },
  { id: "Living Volume · Lutron QSX", x: 20, y: 150, w: 310, h: 130 },
  { id: "Guest Suite · MERV-16 filtration", x: 340, y: 150, w: 180, h: 130 },
  { id: "Wine Vault · ±0.2°C", x: 20, y: 290, w: 120, h: 80 },
  { id: "Conditioning Studio · Sprung timber", x: 150, y: 290, w: 180, h: 80 },
  { id: "Boardroom · SCIF-grade acoustics", x: 340, y: 290, w: 180, h: 80 },
];

function Floorplan({
  hovered,
  onHover,
}: {
  hovered: string | null;
  onHover: (v: string | null) => void;
}) {
  return (
    <svg viewBox="0 0 540 400" className="h-auto w-full" onMouseLeave={() => onHover(null)}>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-hairline)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="540" height="400" fill="url(#grid)" opacity="0.4" />
      {ROOMS.map((room) => {
        const active = hovered === room.id;
        return (
          <g key={room.id} onMouseEnter={() => onHover(room.id)}>
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              fill={active ? "var(--color-bronze)" : "var(--color-ink-elevated)"}
              fillOpacity={active ? 0.28 : 0.9}
              stroke={active ? "var(--color-bronze)" : "var(--color-hairline)"}
              strokeWidth={active ? 1.5 : 1}
              className="transition-all duration-300 cursor-pointer"
            />
            <text
              x={room.x + room.w / 2}
              y={room.y + room.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={active ? "var(--color-bronze-glow)" : "var(--color-foreground)"}
              fillOpacity={active ? 1 : 0.5}
              fontSize="9"
              fontFamily="var(--font-mono)"
              className="pointer-events-none uppercase tracking-widest"
            >
              {room.id.split("·")[0].trim()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const start = value;
    const delta = target - start;
    if (delta === 0) return;
    const duration = 500;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}
