import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, Bell, Check, CircleDot, GraduationCap, Radio, ShieldCheck, Thermometer, Truck, Wifi, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FadeUp, ParallaxHero, Stagger, StaggerItem } from "@/components/huron/motion";
import logoIcon from "@/assets/huron-icon.png.asset.json";
import heroPavilion from "@/assets/hero-pavilion.jpg";

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
