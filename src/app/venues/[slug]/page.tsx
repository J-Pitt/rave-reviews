import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import {
  getAllVenueSlugs,
  getEventsForVenue,
  getReviewsForVenue,
  getVenueBySlug,
} from "@/lib/data";
import { MapPin, Users } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllVenueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Venue Not Found" };
  return { title: venue.name, description: `Reviews for ${venue.name}` };
}

export default async function VenueDetailPage({ params }: Props) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  const venueReviews = await getReviewsForVenue(venue.id);
  const venueEvents = await getEventsForVenue(venue.id);

  return (
    <div>
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-24 relative sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          {venue.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            {venue.neighborhood}, {venue.borough}
          </span>
          {venue.capacity && (
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              Capacity {venue.capacity}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StarRating rating={venue.averageRating} size="lg" showValue />
          <span className="text-sm text-muted">{venue.reviewCount} reviews</span>
          <Button href="/write-review" size="sm">
            Write a Review
          </Button>
        </div>

        {venueEvents.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {venueEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold mb-6">
            Reviews ({venueReviews.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {venueReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
