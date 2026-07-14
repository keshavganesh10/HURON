import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "@/components/huron/motion";

const PHASES = [
  {
    id: "01",
    title: "Proof of Concept & The Fleet",
    horizon: "FY 26 — FY 27",
    focus:
      "Capitalizing the first three flagship builds across Cheshire and central Manchester, and launching the localized Aftercare engineering fleet with salaried M&E, structural and smart-home technicians.",
    metrics: [
      { k: "Flagship Builds", v: "3" },
      { k: "Engineering FTEs", v: "12" },
      { k: "GDV Deployed", v: "£38M" },
    ],
  },
  {
    id: "02",
    title: "Ecosystem Maturation",
    horizon: "FY 27 — FY 29",
    focus:
      "Transitioning initial buyers to the paid Huron Platinum subscription, activating recurring aftercare revenue and consolidating the IoT telemetry moat across every occupied residence.",
    metrics: [
      { k: "Platinum Adoption", v: "92%" },
      { k: "Annualised ARR", v: "£4.1M" },
      { k: "Portfolio Under Care", v: "24 homes" },
    ],
  },
  {
    id: "03",
    title: "Private Capital Authorisation",
    horizon: "FY 29 — FY 31",
    focus:
      "Securing full FCA lending permissions to bring the entire mortgage and bridging book securely in-house, closing the vertical and unlocking net interest margin on every Huron asset.",
    metrics: [
      { k: "FCA Status", v: "Full Perm." },
      { k: "Book on Balance Sheet", v: "£210M" },
      { k: "NIM Captured", v: "3.8%" },
    ],
  },
];

export function RoadmapToScale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="border-t border-hairline bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <span className="eyebrow">03 — Roadmap to Scale</span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            A phased capital rollout.
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-foreground/65">
            Every deployment is choreographed: build, then subscribe, then lend. The vertical
            compounds only in this exact order.
          </p>
        </FadeUp>

        <div ref={ref} className="relative mt-20">
          {/* Rail */}
          <div className="absolute left-6 top-0 h-full w-px bg-hairline sm:left-1/2 sm:-translate-x-px" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px gradient-bronze sm:left-1/2 sm:-translate-x-px"
          />

          <div className="space-y-16 sm:space-y-24">
            {PHASES.map((phase, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative grid sm:grid-cols-2 sm:gap-16"
                >
                  {/* Node */}
                  <div className="absolute left-6 top-1 z-10 -translate-x-1/2 sm:left-1/2">
                    <div className="relative h-4 w-4">
                      <span className="absolute inset-0 rounded-full bg-bronze" />
                      <span className="absolute -inset-2 rounded-full border border-bronze/30 status-dot" />
                    </div>
                  </div>

                  <div
                    className={
                      alignRight
                        ? "pl-14 sm:col-start-2 sm:pl-16"
                        : "pl-14 sm:pr-16 sm:text-right"
                    }
                  >
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bronze">
                      Phase {phase.id} · {phase.horizon}
                    </div>
                    <h3 className="mt-3 font-display text-3xl text-foreground">{phase.title}</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-foreground/65">
                      {phase.focus}
                    </p>
                    <div
                      className={
                        "mt-6 grid grid-cols-3 gap-3 border-t border-hairline pt-5 " +
                        (alignRight ? "" : "sm:ml-auto")
                      }
                    >
                      {phase.metrics.map((m) => (
                        <div key={m.k} className={alignRight ? "" : "sm:text-right"}>
                          <div className="font-display text-xl text-bronze-glow">{m.v}</div>
                          <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-foreground/50">
                            {m.k}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
