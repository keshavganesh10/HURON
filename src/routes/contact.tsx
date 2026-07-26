import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowRight, Building2, Check, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { FadeUp } from "@/components/huron/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Huron Residences" },
      { name: "description", content: "Speak directly with a Huron Relationship Director. Private enquiries for residences, capital and aftercare — answered within one business day." },
      { property: "og:title", content: "Contact — Huron Residences" },
      { property: "og:description", content: "Private enquiries, answered within one business day by a Huron Relationship Director." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  enquiry: z.enum(["residence", "capital", "aftercare", "press", "other"]),
  message: z.string().trim().min(10, "Please add a few words of context").max(2000),
});

type FormState = z.infer<typeof schema>;
const initial: FormState = { name: "", email: "", phone: "", enquiry: "residence", message: "" };

function ContactPage() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const map: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!map[key]) map[key] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // In production this posts to a Relationship Director inbox via server fn.
  }

  return (
    <>
      <section className="border-b border-hairline pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <span className="eyebrow">Direct Line · Relationship Director</span>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
              Speak with <span className="text-gradient-bronze italic">one person.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
              Every enquiry — residence, capital or aftercare — is read and
              answered by a named Huron Relationship Director within one
              business day. No inbound call centres. No brokers.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[1.4fr_1fr] lg:px-10">
          <FadeUp className="border border-hairline bg-card/40 p-8 sm:p-10">
            {submitted ? (
              <div className="grid place-items-center py-16 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-bronze/40 bg-bronze/10">
                  <Check className="h-6 w-6 text-bronze-glow" />
                </div>
                <h2 className="mt-6 font-display text-3xl text-foreground">Enquiry received.</h2>
                <p className="mt-3 max-w-md text-sm font-light text-foreground/70">
                  A Huron Relationship Director will respond to <span className="text-bronze-glow">{values.email}</span> within one business day. If your matter is time-sensitive, please call <a className="text-bronze-glow" href="tel:+441625000000">+44 (0)1625 000 000</a>.
                </p>
                <button
                  onClick={() => { setValues(initial); setSubmitted(false); }}
                  className="mt-8 inline-flex items-center gap-2 border border-hairline px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-bronze hover:text-bronze-glow"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      maxLength={100}
                      onChange={(e) => update("name", e.target.value)}
                      className="input-luxe"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      maxLength={255}
                      onChange={(e) => update("email", e.target.value)}
                      className="input-luxe"
                    />
                  </Field>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Phone (optional)" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      maxLength={40}
                      onChange={(e) => update("phone", e.target.value)}
                      className="input-luxe"
                    />
                  </Field>
                  <Field label="Nature of enquiry">
                    <select
                      value={values.enquiry}
                      onChange={(e) => update("enquiry", e.target.value as FormState["enquiry"])}
                      className="input-luxe"
                    >
                      <option value="residence">A residence in the portfolio</option>
                      <option value="capital">Huron Private Capital</option>
                      <option value="aftercare">Aftercare & engineering</option>
                      <option value="press">Press & confidential media</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>
                <Field label="Message" error={errors.message}>
                  <textarea
                    rows={6}
                    value={values.message}
                    maxLength={2000}
                    onChange={(e) => update("message", e.target.value)}
                    className="input-luxe resize-none"
                    placeholder="A few words of context — timeline, region, or the residence you have in mind."
                  />
                </Field>
                <div className="flex items-center gap-2 text-xs text-foreground/55">
                  <ShieldCheck className="h-3.5 w-3.5 text-bronze" />
                  Encrypted in transit · Never shared beyond your Relationship Director
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 gradient-bronze px-6 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-luxe transition-all hover:brightness-110 sm:w-auto"
                >
                  Send Enquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </FadeUp>

          <div className="space-y-8">
            <FadeUp className="border border-hairline bg-card/40 p-8">
              <span className="eyebrow">Head Office</span>
              <div className="mt-4 space-y-4 text-sm font-light text-foreground/80">
                <p className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                  Huron Residences Ltd.<br />1 Water Lane, Wilmslow<br />Cheshire SK9 5AR, United Kingdom
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-bronze" />
                  <a href="tel:+441625000000" className="hover:text-bronze-glow">+44 (0)1625 000 000</a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-bronze" />
                  <a href="mailto:director@huron.residences" className="hover:text-bronze-glow">director@huron.residences</a>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                  By appointment only — private viewings at the residence, by arrangement.
                </p>
              </div>
            </FadeUp>

            <FadeUp className="border border-bronze/30 bg-bronze/5 p-8">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bronze">Response Times</span>
              <ul className="mt-4 space-y-3 text-sm font-light text-foreground/80">
                <li>Residence enquiries — within 1 business day</li>
                <li>Private Capital indicative terms — within 48 hours</li>
                <li>Aftercare priority incidents — same day</li>
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      <style>{`
        .input-luxe {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--color-hairline);
          color: var(--color-foreground);
          padding: 10px 0 12px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 300;
          outline: none;
          transition: border-color 200ms ease;
        }
        .input-luxe:focus { border-bottom-color: var(--color-bronze); }
        .input-luxe::placeholder { color: color-mix(in oklab, var(--color-foreground) 40%, transparent); }
        .input-luxe option { background: var(--color-card); color: var(--color-foreground); }
      `}</style>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-foreground/55">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400/90">{error}</span>}
    </label>
  );
}
