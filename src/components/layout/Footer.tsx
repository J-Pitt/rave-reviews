import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold">Rave Reviews</p>
            <p className="mt-1 text-xs text-muted">Overcast Productions</p>
            <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
              A small project for rating NYC nightlife — venues, parties, and
              sets. Nothing official, just notes from people who went.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Browse</h4>
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
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Contribute</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/write-review" className="hover:text-foreground transition-colors">
                  Write a review
                </Link>
              </li>
              <li>
                <Link href="/underground/submit" className="hover:text-foreground transition-colors">
                  Submit a party
                </Link>
              </li>
              <li>
                <Link href="/database" className="hover:text-foreground transition-colors">
                  Database schema
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Overcast Productions
          </p>
        </div>
      </div>
    </footer>
  );
}
