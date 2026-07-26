import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Inline jargon tooltip. Wrap technical terms in <Term title="..." tip="...">
 * to give first-time visitors a plain-English hover / tap explanation.
 */
export function Term({
  children,
  tip,
  className,
}: {
  children: React.ReactNode;
  tip: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={cn("relative inline-flex items-baseline gap-0.5", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-help border-b border-dotted border-bronze/70 text-bronze-glow/90 hover:text-bronze-glow focus:outline-none"
        aria-describedby={`term-${tip.slice(0, 12)}`}
      >
        {children}
      </button>
      <Info className="ml-0.5 h-2.5 w-2.5 shrink-0 self-center text-bronze/60" aria-hidden />
      {open && (
        <span
          role="tooltip"
          id={`term-${tip.slice(0, 12)}`}
          className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-64 -translate-x-1/2 border border-bronze/30 bg-background/95 p-3 text-left text-xs font-light leading-relaxed text-foreground/85 shadow-luxe backdrop-blur-xl"
        >
          {tip}
        </span>
      )}
    </span>
  );
}

/** Small pill labelling an interactive/simulated section. */
export function DemoBadge({ label = "Interactive Demo — Illustrative Data" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 border border-bronze/40 bg-bronze/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bronze-glow">
      <span className="h-1.5 w-1.5 rounded-full bg-bronze status-dot" />
      {label}
    </span>
  );
}
