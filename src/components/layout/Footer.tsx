import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-accent/10 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-bold">Rave Reviews</p>
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  by Overcast Productions
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
              The community-driven guide to NYC nightlife. Real reviews from real
              ravers — clubs, parties, artists, and venues.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/events" className="hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/underground" className="hover:text-foreground transition-colors">
                  Underground
                </Link>
              </li>
              <li>
                <Link href="/venues" className="hover:text-foreground transition-colors">
                  Venues
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-foreground transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-foreground transition-colors">
                  All Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Developers</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/database" className="hover:text-foreground transition-colors">
                  Database Schema
                </Link>
              </li>
              <li>
                <Link href="/underground/submit" className="hover:text-foreground transition-colors">
                  Submit a Party
                </Link>
              </li>
              <li>
                <Link href="/write-review" className="hover:text-foreground transition-colors">
                  Write a Review
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Overcast Productions. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Made for the NYC dance floor community.
          </p>
        </div>
      </div>
    </footer>
  );
}
