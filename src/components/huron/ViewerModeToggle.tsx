import { motion } from "framer-motion";
import { useState } from "react";
import { useViewerMode } from "@/stores/viewer-mode";
import { cn } from "@/lib/utils";

export function ViewerModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useViewerMode();
  const [helpOpen, setHelpOpen] = useState(false);
  const isInvestor = mode === "investor";

  return (
    <div className="relative flex items-center gap-2">
      <div
        role="group"
        aria-label="Viewer mode — Client or Investor"
        className={cn(
          "relative inline-flex items-center rounded-full border border-hairline bg-background/60 p-0.5 backdrop-blur-md",
          compact ? "text-[0.55rem]" : "text-[0.6rem]",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className={cn(
            "absolute inset-y-0.5 w-1/2 rounded-full",
            isInvestor ? "gradient-bronze" : "bg-foreground/10",
          )}
          style={{ left: isInvestor ? "50%" : "2px", right: isInvestor ? "2px" : "50%" }}
        />
        {(["client", "investor"] as const).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={active}
              title={m === "client" ? "Client view — buyers, owners, private clients" : "Investor view — capital partners, IR content"}
              className={cn(
                "relative z-10 px-3 py-1.5 font-mono uppercase tracking-[0.22em] transition-colors",
                compact ? "px-2.5 py-1" : "",
                active
                  ? m === "investor"
                    ? "text-primary-foreground"
                    : "text-foreground"
                  : "text-foreground/55 hover:text-foreground/80",
              )}
            >
              {m === "client" ? "Client" : "Investor"}
            </button>
          );
        })}
      </div>
      {!compact && (
        <button
          type="button"
          aria-label="What does this toggle do?"
          onClick={() => setHelpOpen((o) => !o)}
          onBlur={() => setTimeout(() => setHelpOpen(false), 120)}
          className="grid h-5 w-5 place-items-center rounded-full border border-hairline text-[0.55rem] font-mono text-foreground/60 transition-colors hover:border-bronze hover:text-bronze-glow"
        >
          ?
        </button>
      )}
      {helpOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 border border-bronze/30 bg-background/95 p-4 text-xs font-light leading-relaxed text-foreground/85 shadow-luxe backdrop-blur-xl">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bronze">Viewer Mode</div>
          <p className="mt-2">
            <span className="text-foreground">Client</span> — the buying &
            ownership experience: residences, private capital, aftercare.
          </p>
          <p className="mt-2">
            <span className="text-foreground">Investor</span> — the B2B
            thesis: unit economics, rollout, systems leadership. Some
            copy on the homepage swaps to reflect the audience.
          </p>
        </div>
      )}
    </div>
  );
}
