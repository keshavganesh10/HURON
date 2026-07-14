import { motion } from "framer-motion";
import { GraduationCap, Cpu, Award } from "lucide-react";
import { FadeUp } from "@/components/huron/motion";

const CREDENTIALS = [
  { icon: GraduationCap, label: "Aerospace Engineering with Management", sub: "University of Manchester" },
  { icon: Cpu, label: "Systems Integration", sub: "BAE Systems · GE Aerospace · GKN Aerospace" },
  { icon: Award, label: "TEDxUniversityofManchester", sub: "‘Engineering Harmony’" },
];

export function SystemsLeadership() {
  return (
    <section className="border-t border-hairline bg-card/30 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <span className="eyebrow">04 — Systems Leadership</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Aerospace-grade execution.
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-foreground/65">
            Investors underwrite operators. Ours are trained in zero-fault environments where
            tolerances are measured in microns and lives.
          </p>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-14 grid gap-10 border border-hairline bg-background p-8 shadow-luxe sm:p-12 lg:grid-cols-[280px_1fr] lg:gap-16"
        >
          <div className="absolute inset-x-0 top-0 h-px shimmer-line" />

          {/* Portrait card */}
          <div className="flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-hairline bg-gradient-to-b from-bronze/[0.08] via-transparent to-background">
              {/* Abstract silhouette */}
              <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="silhouette" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.1 80)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="oklch(0.58 0.085 60)" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="42" r="16" fill="url(#silhouette)" />
                <path d="M20 130 C 20 90 30 78 50 78 C 70 78 80 90 80 130 Z" fill="url(#silhouette)" />
                {/* Grid overlay */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`v${i}`} x1={(i + 1) * 11} y1="0" x2={(i + 1) * 11} y2="130" stroke="oklch(0.32 0.008 250)" strokeWidth="0.15" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={(i + 1) * 12} x2="100" y2={(i + 1) * 12} stroke="oklch(0.32 0.008 250)" strokeWidth="0.15" />
                ))}
              </svg>
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.22em] text-bronze-glow">
                <span>Founder · CEO</span>
                <span>HRN-01</span>
              </div>
            </div>
            <div className="mt-5 border-t border-hairline pt-4">
              <div className="font-display text-xl text-foreground">Systems Office</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-foreground/50">
                Huron Residences · Manchester
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bronze">
              Operational Doctrine
            </div>
            <p className="mt-5 font-display text-2xl leading-[1.35] text-foreground/95 sm:text-[1.75rem]">
              With a background in Aerospace Engineering with Management from the University of
              Manchester, the leadership team applies aerospace-grade precision to the real
              estate market. Drawing on advanced systems integration experience from BAE
              Systems, GE Aerospace, and GKN Aerospace, as well as directing hardware
              optimisation as Vice President of the Eco Racing Society, Huron’s operational
              framework is built on rigorous, zero-fault engineering principles. This
              systems-thinking approach, recently highlighted at TEDxUniversityofManchester in
              the talk <span className="text-gradient-bronze italic">‘Engineering Harmony’</span>,
              ensures that the logistics of the Aftercare fleet and the IoT smart-home telemetry
              operate flawlessly at scale.
            </p>

            <div className="mt-10 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
              {CREDENTIALS.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs font-medium text-foreground">{c.label}</div>
                    <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/50">
                      {c.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
