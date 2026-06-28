"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/underground", label: "Underground" },
  { href: "/venues", label: "Venues" },
  { href: "/artists", label: "Artists" },
  { href: "/reviews", label: "Reviews" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-sm font-semibold tracking-tight">Rave Reviews</span>
          <span className="hidden text-xs text-muted sm:inline">Overcast</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" href="/add-listing">
            Add listing
          </Button>
          <Button variant="ghost" size="sm" href="/write-review">
            Write review
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden rounded-md p-2 text-muted hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm",
                  pathname === link.href ? "text-foreground" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="secondary" href="/add-listing">
                Add listing
              </Button>
              <Button variant="secondary" href="/underground/submit">
                Submit a party
              </Button>
              <Button href="/write-review">Write a review</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
