import { Hero } from "@/components/home/Hero";
import { EventCard } from "@/components/events/EventCard";
import { UndergroundPartyCard } from "@/components/underground/UndergroundPartyCard";
import { VenueCard } from "@/components/venues/VenueCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { LinkArrow } from "@/components/ui/Button";
import {
  getFeaturedUndergroundParties,
  getRecentReviews,
  getTopVenues,
  getTrendingEvents,
  neighborhoods,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { EyeOff } from "lucide-react";

export default function HomePage() {
  const trendingEvents = getTrendingEvents();
  const topVenues = getTopVenues();
  const recentReviews = getRecentReviews(4);
  const undergroundParties = getFeaturedUndergroundParties(3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Trending Events
            </h2>
            <p className="mt-1 text-sm text-muted">
              The most-reviewed parties happening in NYC
            </p>
          </div>
          <LinkArrow href="/events">View all</LinkArrow>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" className="gap-1">
                <EyeOff className="h-3 w-3" />
                Community
              </Badge>
            </div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Underground Parties
            </h2>
            <p className="mt-1 text-sm text-muted">
              Submitted by the community — locations can stay vague
            </p>
          </div>
          <LinkArrow href="/underground">View all</LinkArrow>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {undergroundParties.map((party) => (
            <UndergroundPartyCard key={party.id} party={party} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Top Venues
            </h2>
            <p className="mt-1 text-sm text-muted">
              Highest-rated clubs and spaces across the boroughs
            </p>
          </div>
          <LinkArrow href="/venues">View all</LinkArrow>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-elevated rounded-3xl p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Explore by Neighborhood
          </h2>
          <p className="mt-2 text-sm text-muted max-w-lg">
            From Ridgewood warehouses to Williamsburg rooftops — find the scene
            in your corner of the city.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <Badge key={n.name} variant="outline" className="px-4 py-2 text-sm">
                {n.name}, {n.borough}
                <span className="ml-2 text-accent">{n.eventCount}</span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Latest Reviews
            </h2>
            <p className="mt-1 text-sm text-muted">
              Fresh takes from the community
            </p>
          </div>
          <LinkArrow href="/reviews">View all</LinkArrow>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} compact />
          ))}
        </div>
      </section>
    </>
  );
}
