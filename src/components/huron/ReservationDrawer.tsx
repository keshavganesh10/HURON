import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Fingerprint, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Residence } from "@/lib/huron-data";

export function ReservationDrawer({
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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!residence) return null;

  const r = residence;
  const loanAmount = Math.round((parseInt(r.price.replace(/[^0-9]/g, "")) * ltv) / 100);

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
                      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-hairline)" strokeWidth="2" />
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

function StepWrap({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
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
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/45">{label}</div>
      <div className="mt-1 font-display text-xl text-foreground">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/55">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
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
