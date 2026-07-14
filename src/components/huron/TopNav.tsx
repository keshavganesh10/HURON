import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/huron-icon.png.asset.json";
import { AmbientToggle } from "@/components/huron/audio";
import { ViewerModeToggle } from "@/components/huron/ViewerModeToggle";

const LINKS = [
  { to: "/residences", label: "Residences" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/capital", label: "Private Capital" },
  { to: "/aftercare", label: "Aftercare" },
  { to: "/investors", label: "Investors" },
] as const;

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoIcon.url} alt="Huron" className="h-8 w-8 object-contain" />
            <span className="hidden font-display text-xl tracking-[0.25em] text-foreground/90 sm:inline">
              HURON
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative text-sm font-light tracking-wide text-foreground/75 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="mx-1 h-4 w-px bg-hairline" />
            <ViewerModeToggle />
            <AmbientToggle />
            <Link
              to="/residences"
              className="group inline-flex items-center gap-2 rounded-sm border border-bronze/40 bg-bronze/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-bronze-glow transition-all hover:border-bronze hover:bg-bronze/20"
            >
              Private Access
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ViewerModeToggle compact />
            <AmbientToggle />
            <button aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>

        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-card shadow-luxe transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
            <img src={logoIcon.url} alt="Huron" className="h-7 w-7" />
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-6 py-8">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-hairline/60 py-5 font-display text-2xl text-foreground/90 transition-colors hover:text-bronze-glow"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-hairline px-6 py-6">
            <Link
              to="/residences"
              onClick={() => setOpen(false)}
              className="block w-full gradient-bronze rounded-sm px-5 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground"
            >
              Private Access
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
