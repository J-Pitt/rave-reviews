import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { StarRating } from "@/components/ui/StarRating";
import {
  getAllEventSlugs,
  getArtist,
  getEventBySlug,
  getEventsForVenue,
  getReviewsForEvent,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: `Reviews for ${event.title}` };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const venue = event.venue;
  const eventArtists = (
    await Promise.all(event.artistIds.map((id) => getArtist(id)))
  ).filter(Boolean);
  const eventReviews = await getReviewsForEvent(event.id);
  const relatedEvents = (await getEventsForVenue(event.venueId))
    .filter((e) => e.id !== event.id)
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {event.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{event.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(event.date)}
          </span>
          {venue && (
            <Link
              href={`/venues/${venue.slug}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              {venue.name}, {venue.neighborhood}
            </Link>
          )}
          {event.ticketPrice && (
            <span className="flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5" />
              {event.ticketPrice}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {event.reviewCount > 0 ? (
            <>
              <StarRating rating={event.averageRating} size="lg" showValue />
              <span className="text-sm text-muted">
                {event.reviewCount} review{event.reviewCount === 1 ? "" : "s"}
              </span>
            </>
          ) : (
            <span className="text-sm text-muted">No reviews yet</span>
          )}
          <Button href="/write-review" size="sm" variant="secondary">
            Write a review
          </Button>
        </div>
      </div>

      {eventArtists.length > 0 && (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-medium mb-3">Lineup</h2>
          <div className="flex flex-wrap gap-2">
            {eventArtists.map(
              (artist) =>
                artist && (
                  <Link
                    key={artist.id}
                    href={`/artists/${artist.slug}`}
                    className="panel rounded-md px-3 py-1.5 text-sm hover:border-muted/30 transition-colors"
                  >
                    {artist.name}
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      <section className="mt-12 max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">
          Reviews{eventReviews.length > 0 && ` (${eventReviews.length})`}
        </h2>
        {eventReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {eventReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="Nobody's written about this one yet."
            actionLabel="Write a review"
            actionHref="/write-review"
          />
        )}
      </section>

      {relatedEvents.length > 0 && (
        <section className="mt-12 pb-8">
          <h2 className="text-lg font-semibold mb-4">More at {venue?.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
            {relatedEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
