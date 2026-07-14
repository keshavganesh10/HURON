import { motion } from "framer-motion";
import { useViewerMode } from "@/stores/viewer-mode";
import { cn } from "@/lib/utils";

export function ViewerModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useViewerMode();
  const isInvestor = mode === "investor";

  return (
    <div
      role="group"
      aria-label="Viewer mode"
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
  );
}
