import { Hero } from "@/components/home/Hero";
import { EventCard } from "@/components/events/EventCard";
import { UndergroundPartyCard } from "@/components/underground/UndergroundPartyCard";
import { VenueCard } from "@/components/venues/VenueCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { LinkArrow } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getFeaturedUndergroundParties,
  getNeighborhoods,
  getRecentReviews,
  getStats,
  getTopVenues,
  getTrendingEvents,
} from "@/lib/data";

export default async function HomePage() {
  const [stats, trendingEvents, topVenues, recentReviews, undergroundParties, neighborhoods] =
    await Promise.all([
      getStats(),
      getTrendingEvents(),
      getTopVenues(),
      getRecentReviews(4),
      getFeaturedUndergroundParties(3),
      getNeighborhoods(),
    ]);

  return (
    <>
      <Hero stats={stats} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-lg font-semibold">Events</h2>
          <LinkArrow href="/events">All events</LinkArrow>
        </div>
        {trendingEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No events listed yet."
            actionLabel="Add via database"
            actionHref="/database"
          />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-border">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Underground</h2>
            <p className="mt-1 text-sm text-muted">
              Submitted parties — exact address optional.
            </p>
          </div>
          <LinkArrow href="/underground">All parties</LinkArrow>
        </div>
        {undergroundParties.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {undergroundParties.map((party) => (
              <UndergroundPartyCard key={party.id} party={party} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="Nothing posted yet."
            actionLabel="Submit a party"
            actionHref="/underground/submit"
          />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-border">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-lg font-semibold">Venues</h2>
          <LinkArrow href="/venues">All venues</LinkArrow>
        </div>
        {topVenues.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <EmptyState message="No venues listed yet." />
        )}
      </section>

      {neighborhoods.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-border">
          <h2 className="text-lg font-semibold">Neighborhoods</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <span
                key={n.name}
                className="panel rounded-md px-3 py-1.5 text-sm text-muted"
              >
                {n.name}, {n.borough}
                <span className="ml-2 text-foreground">{n.eventCount}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-border">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent reviews</h2>
          <LinkArrow href="/reviews">All reviews</LinkArrow>
        </div>
        {recentReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} compact />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No reviews yet."
            actionLabel="Write one"
            actionHref="/write-review"
          />
        )}
      </section>
    </>
  );
}
