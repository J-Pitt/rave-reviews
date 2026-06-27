import { Button } from "@/components/ui/Button";

interface HeroStats {
  totalReviews: number;
  totalVenues: number;
  totalEvents: number;
  avgRating: string;
  usingDatabase?: boolean;
}

interface HeroProps {
  stats: HeroStats;
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm text-muted">
            NYC · Overcast Productions
            {stats.usingDatabase && (
              <span className="text-muted/70"> · connected</span>
            )}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Reviews for clubs, parties, and DJs.
          </h1>

          <p className="mt-5 text-base text-muted leading-relaxed max-w-lg">
            Before you buy the ticket or trek to Bushwick, see what people
            actually thought — sound, door, crowd, worth it or not.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" href="/events">
              Browse events
            </Button>
            <Button variant="secondary" size="lg" href="/write-review">
              Write a review
            </Button>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {[
            { label: "Reviews", value: String(stats.totalReviews) },
            { label: "Venues", value: String(stats.totalVenues) },
            { label: "Events", value: String(stats.totalEvents) },
            { label: "Avg rating", value: stats.avgRating },
          ].map((stat) => (
            <div key={stat.label} className="bg-background px-4 py-4 sm:px-6">
              <dt className="text-xs text-muted">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
