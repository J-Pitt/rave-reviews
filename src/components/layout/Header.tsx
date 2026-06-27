"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/underground", label: "Underground" },
  { href: "/venues", label: "Venues" },
  { href: "/artists", label: "Artists" },
  { href: "/reviews", label: "Reviews" },
  { href: "/database", label: "Schema" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-accent/10 glass header-glow relative">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight tracking-tight">
              Rave Reviews
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted">
              Overcast Productions
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-accent/10 text-foreground border border-accent/15"
                  : "text-muted hover:text-foreground hover:bg-accent/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" href="/write-review">
            Write a Review
          </Button>
          <Button size="sm" href="/events">
            Explore NYC
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-muted hover:text-foreground hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-white/8 text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="secondary" href="/underground/submit">
                Submit a Party
              </Button>
              <Button variant="secondary" href="/write-review">
                Write a Review
              </Button>
              <Button href="/events">Explore NYC</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
