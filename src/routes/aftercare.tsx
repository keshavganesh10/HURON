import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, Bell, Check, CircleDot, GraduationCap, Radio, ShieldCheck, Thermometer, Truck, Wifi, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeUp, ParallaxHero, Stagger, StaggerItem } from "@/components/huron/motion";
import { DayInTheLife } from "@/components/huron/DayInTheLife";
import logoIcon from "@/assets/huron-icon.png.asset.json";
import heroPavilion from "@/assets/hero-aftercare.jpg";

export const Route = createFileRoute("/aftercare")({
  head: () => ({
    meta: [
      { title: "Huron Platinum Aftercare — Engineered for Life" },
      { name: "description", content: "A salaried Huron Engineer Fleet, predictive sensor mesh and an aftercare app that calls you before you call us. 94% first-time fix rate." },
      { property: "og:title", content: "Huron Platinum Aftercare" },
      { property: "og:description", content: "The aftercare interface and engineering fleet that protects your residence for life." },
    ],
  }),
  component: Aftercare,
});

function Aftercare() {
  return (
    <>
      <ParallaxHero src={heroPavilion} alt="Huron Aftercare" className="min-h-[68svh]">
        <div className="mx-auto flex min-h-[68svh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">Huron Platinum Aftercare</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
              The engineer <span className="text-gradient-bronze italic">who built it, stays for life.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-foreground/75 sm:text-lg">
              A salaried Huron Engineer Fleet, cross-trained on every bespoke
              system specified in your residence, dispatched by a predictive
              sensor mesh long before a defect is noticed.
            </p>
          </FadeUp>
        </div>
      </ParallaxHero>

      <EngineerFleet />
      <DayInTheLife />
      <DigitalTwin />
      <SandboxApp />
    </>
  );
}

function EngineerFleet() {
  return (
    <section className="border-t border-hairline py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <FadeUp>
            <span className="eyebrow">The Huron Engineer Fleet</span>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Salaried.<br />
              <span className="text-gradient-bronze italic">Never subcontracted.</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-foreground/65">
              Every engineer in our fleet is a salaried Huron employee, branded,
              vetted to a Tier-III security standard, and personally certified on
              the exact systems specified in your residence.
            </p>
          </FadeUp>

          <Stagger className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
            {[
              { icon: GraduationCap, t: "Cross-trained on every system", b: "Each engineer carries certification on Crestron, Lutron, Daikin VRF, Miele commercial, Boffi plumbing and geopolymer remediation — no more 'wrong-trade' visits." },
              { icon: Truck, t: "Branded fleet vehicles", b: "Discreet, unmarked-bronze service vehicles arrive within agreed two-hour windows. Parts are stocked to the residence's exact ledger." },
              { icon: Wrench, t: "94% first-time fix rate", b: "Diagnostics are completed remotely via the sensor mesh before the engineer leaves the depot. The right part, the right tool, the right visit." },
              { icon: ShieldCheck, t: "Lifetime indemnity", b: "Every intervention is logged into your residence's permanent engineering record and indemnified under the Huron lifetime covenant — inheritable to your heirs." },
            ].map((c) => (
              <StaggerItem key={c.t} className="group bg-background p-8 transition-colors hover:bg-card">
                <c.icon className="h-6 w-6 text-bronze transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-foreground/65">{c.b}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function SandboxApp() {
  const tabs = [
    { id: "predict", title: "Predictive Servicing", body: "Foundation, mechanical and façade sensors stream telemetry to Huron Engineering. We detect drift before it becomes a defect — and dispatch a named engineer to your door." },
    { id: "finance", title: "One-Tap Financing Updates", body: "Refinance, draw additional facilities, or rebalance LTV at the speed of a passkey. Underwritten by Huron Private Capital, not by a queue." },
    { id: "key", title: "The Single Key Promise", body: "One Relationship Director. One contract. One key. For the lifetime of your residency — and inheritable to the next generation." },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const [phoneTab, setPhoneTab] = useState<"dashboard" | "maintenance">("dashboard");
  const [authorized, setAuthorized] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!authorized) return;
    setCountdown(120 * 60);
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
    <section className="relative border-t border-hairline bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <FadeUp>
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
                <button key={t.id} onClick={() => setActive(t.id)} className="group block w-full py-6 text-left">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                    <div className="min-w-0">
                      <div className={cn("font-display text-2xl transition-colors", active === t.id ? "text-bronze-glow" : "text-foreground/80 group-hover:text-foreground")}>
                        {t.title}
                      </div>
                      <div className={cn("grid overflow-hidden text-sm font-light text-foreground/65 transition-all duration-500", active === t.id ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <div className="min-h-0"><p className="leading-relaxed">{t.body}</p></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_30%,_color-mix(in_oklab,_var(--color-bronze)_25%,_transparent),_transparent_70%)] blur-3xl" />
            <div className="relative aspect-[9/19] rounded-[2.5rem] border border-bronze/30 bg-background p-3 shadow-luxe">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-b from-card to-background">
                <div className="flex items-center justify-between px-6 pt-3 font-mono text-[0.65rem] text-foreground/70">
                  <span>9:41</span>
                  <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /><span className="h-2 w-3 border border-foreground/60" /></span>
                </div>
                <div className="px-5 pt-6">
                  <img src={logoIcon.url} alt="" className="h-6 w-6" />
                  <div className="mt-3 font-display text-lg text-foreground">
                    Good evening,<br /><span className="text-bronze-glow">Mr. Hartwell.</span>
                  </div>
                </div>
                <div className="mx-5 mt-5 flex rounded-full border border-hairline bg-background/60 p-1 text-[0.65rem] uppercase tracking-[0.15em]">
                  <button onClick={() => setPhoneTab("dashboard")} className={cn("flex-1 rounded-full py-2 transition-colors", phoneTab === "dashboard" ? "bg-bronze/20 text-bronze-glow" : "text-foreground/50")}>Home</button>
                  <button onClick={() => setPhoneTab("maintenance")} className={cn("flex-1 rounded-full py-2 transition-colors", phoneTab === "maintenance" ? "bg-bronze/20 text-bronze-glow" : "text-foreground/50")}>Engineering</button>
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
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bronze">Live · Building Fabric</span>
                        </div>
                        <div className="mt-2 text-sm font-light text-foreground/85">All Core Building Fabrics: Operating Optimally</div>
                        <div className="mt-3 flex items-center gap-1">
                          {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i} className="h-6 w-1 bg-bronze/70" style={{ opacity: 0.4 + (i % 5) * 0.12 }} />
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
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bronze">System Notice · Priority</span>
                        </div>
                        <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-foreground/85">
                          Secondary HVAC pressure drop detected by foundation sensors.
                          Huron Engineer <span className="text-bronze-glow">Marcus</span> is
                          nearby at 2:00 PM today. Authorize access?
                        </p>
                        {!authorized ? (
                          <button onClick={() => setAuthorized(true)} className="mt-3 w-full gradient-bronze py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary-foreground">
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
                        <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/50">This Week</div>
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
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function PhoneCard({ icon: Icon, label, value, sub }: { icon: typeof Thermometer; label: string; value: string; sub: string }) {
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

const TWIN_ROOMS = [
  { id: "principal", label: "Principal Suite", x: 20, y: 20, w: 200, h: 130, spec: "R-9.2 envelope · MERV-16 filtration · 21.5°C" },
  { id: "library", label: "Library", x: 230, y: 20, w: 130, h: 130, spec: "STC 68 acoustic · circadian lighting" },
  { id: "kitchen", label: "Kitchen", x: 370, y: 20, w: 160, h: 130, spec: "Miele Master-Suite · induction telemetry live" },
  { id: "living", label: "Living Volume", x: 20, y: 160, w: 340, h: 140, spec: "Lutron QSX · 24 scenes · sun-tracking shades" },
  { id: "guest", label: "Guest Suite", x: 370, y: 160, w: 160, h: 140, spec: "Independent HVAC zone · 20.8°C" },
  { id: "vault", label: "Wine Vault", x: 20, y: 310, w: 160, h: 70, spec: "13.1°C · humidity 68% · stable 48h" },
  { id: "hvac", label: "HVAC Plant", x: 190, y: 310, w: 170, h: 70, spec: "VRF · pressure variance 3.2% · flag raised" },
  { id: "security", label: "Perimeter", x: 370, y: 310, w: 160, h: 70, spec: "All zones armed · 42 sensors nominal" },
];

type LogEvent = {
  time: string;
  title: string;
  body: string;
  tone: "alert" | "action" | "resolved" | "info";
};

const AGENTIC_LOG: LogEvent[] = [
  { time: "13:41", title: "System Alert · HVAC Plant", body: "HVAC pressure variance detected at 3.2% above nominal on the secondary loop.", tone: "alert" },
  { time: "13:42", title: "Diagnostic · Sensor Mesh", body: "Autonomous cross-reference against 12 months of telemetry. Fault isolated to expansion valve.", tone: "info" },
  { time: "13:43", title: "Dispatch · Engineer Fleet", body: "Huron Engineer Marcus assigned. Parts pulled from residence ledger. ETA 14:00.", tone: "action" },
  { time: "13:44", title: "Owner Notification", body: "Priority notice issued to the Huron App. Access authorisation requested via biometric passkey.", tone: "info" },
  { time: "14:02", title: "Resolved · First-Time Fix", body: "Expansion valve replaced. Loop rebalanced to 0.4% variance. Logged to lifetime engineering record.", tone: "resolved" },
];

function DigitalTwin() {
  const [hovered, setHovered] = useState<string | null>("hvac");
  const active = TWIN_ROOMS.find((r) => r.id === hovered) ?? TWIN_ROOMS[6];

  return (
    <section className="relative border-t border-hairline py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-3xl">
          <span className="eyebrow">Agentic AI · Digital Twin</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            The residence <span className="text-gradient-bronze italic">that resolves itself.</span>
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-foreground/70">
            A live digital twin of every Huron residence — 300+ sensor points streaming into an
            agentic maintenance loop that detects, dispatches and resolves faults before you notice them.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="border border-hairline bg-card p-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-bronze status-dot" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">Live · Digital Twin</span>
              </div>
              <span className="font-mono text-[0.65rem] text-foreground/50">42 sensors · last sync 2s ago</span>
            </div>
            <svg viewBox="0 0 550 400" className="mt-5 h-auto w-full" onMouseLeave={() => setHovered("hvac")}>
              <defs>
                <pattern id="twin-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-hairline)" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="550" height="400" fill="url(#twin-grid)" opacity="0.4" />
              {TWIN_ROOMS.map((room) => {
                const isActive = hovered === room.id;
                const isAlert = room.id === "hvac";
                return (
                  <g key={room.id} onMouseEnter={() => setHovered(room.id)}>
                    <rect
                      x={room.x} y={room.y} width={room.w} height={room.h}
                      fill={isActive ? "var(--color-bronze)" : "var(--color-ink-elevated)"}
                      fillOpacity={isActive ? 0.35 : 0.9}
                      stroke={isAlert ? "var(--color-bronze-glow)" : isActive ? "var(--color-bronze)" : "var(--color-hairline)"}
                      strokeWidth={isActive || isAlert ? 1.5 : 1}
                      className="transition-all duration-300 cursor-pointer"
                    />
                    <text
                      x={room.x + room.w / 2} y={room.y + room.h / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={isActive ? "var(--color-bronze-glow)" : "var(--color-foreground)"}
                      fillOpacity={isActive ? 1 : 0.6}
                      fontSize="10" fontFamily="var(--font-mono)"
                      className="pointer-events-none uppercase tracking-[0.15em]"
                    >
                      {room.label}
                    </text>
                    {isAlert && (
                      <circle
                        cx={room.x + room.w - 12} cy={room.y + 12} r="4"
                        fill="var(--color-bronze-glow)"
                        className="status-dot"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="mt-4 border-t border-hairline pt-4">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">
                {active.label}
              </div>
              <div className="mt-1 text-sm font-light text-foreground/80">{active.spec}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 border border-bronze/30 bg-bronze/5 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-bronze-glow" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze-glow">
                Agentic Predictive Maintenance · Live Log
              </span>
            </div>

            <ol className="relative mt-6 space-y-6 border-l border-hairline pl-6">
              {AGENTIC_LOG.map((e, i) => (
                <motion.li
                  key={e.time + e.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  <span
                    className={cn(
                      "absolute -left-[29px] top-1 grid h-4 w-4 place-items-center rounded-full border",
                      e.tone === "alert" && "border-bronze-glow bg-bronze-glow/30 status-dot",
                      e.tone === "action" && "border-bronze bg-bronze/30",
                      e.tone === "resolved" && "border-emerald-300/70 bg-emerald-300/20",
                      e.tone === "info" && "border-hairline bg-background",
                    )}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/45">{e.time}</span>
                    <span
                      className={cn(
                        "font-display text-lg",
                        e.tone === "resolved" ? "text-emerald-300/90" : "text-foreground",
                      )}
                    >
                      {e.title}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-light leading-relaxed text-foreground/65">{e.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
