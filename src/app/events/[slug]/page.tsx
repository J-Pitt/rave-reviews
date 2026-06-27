import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import {
  events,
  getArtist,
  getEventBySlug,
  getReviewsForEvent,
  getVenue,
} from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: `Reviews for ${event.title}` };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const venue = getVenue(event.venueId);
  const eventArtists = event.artistIds
    .map((id) => getArtist(id))
    .filter(Boolean);
  const eventReviews = getReviewsForEvent(event.id);
  const relatedEvents = events
    .filter((e) => e.id !== event.id && e.venueId === event.venueId)
    .slice(0, 2);

  return (
    <div>
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-24 relative sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {event.genre.map((g) => (
            <Badge key={g} variant="accent">
              {g}
            </Badge>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl max-w-3xl">
          {event.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            {formatDate(event.date)}
          </span>
          {venue && (
            <Link
              href={`/venues/${venue.slug}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <MapPin className="h-4 w-4 text-accent" />
              {venue.name}, {venue.neighborhood}
            </Link>
          )}
          {event.ticketPrice && (
            <span className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-accent" />
              {event.ticketPrice}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StarRating rating={event.averageRating} size="lg" showValue />
          <span className="text-sm text-muted">
            {event.reviewCount} reviews
          </span>
          <Button href="/write-review" size="sm">
            Write a Review
          </Button>
        </div>

        {eventArtists.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-semibold mb-4">Artists</h2>
            <div className="flex flex-wrap gap-3">
              {eventArtists.map(
                (artist) =>
                  artist && (
                    <Link
                      key={artist.id}
                      href={`/artists/${artist.slug}`}
                      className="glass rounded-xl px-4 py-2 text-sm hover:border-accent/30 transition-colors"
                    >
                      {artist.name}
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold mb-6">
            Reviews ({eventReviews.length})
          </h2>
          {eventReviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {eventReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="glass-elevated rounded-2xl p-8 text-center text-muted">
              No reviews yet. Be the first to share your experience.
            </div>
          )}
        </section>

        {relatedEvents.length > 0 && (
          <section className="mt-14 pb-16">
            <h2 className="font-display text-2xl font-bold mb-6">
              More at {venue?.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
