import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {venue.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{venue.name}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {venue.neighborhood}, {venue.borough}
          </span>
          {venue.capacity && (
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {venue.capacity} cap
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {venue.reviewCount > 0 ? (
            <>
              <StarRating rating={venue.averageRating} size="lg" showValue />
              <span className="text-sm text-muted">
                {venue.reviewCount} review{venue.reviewCount === 1 ? "" : "s"}
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

      {venueEvents.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Events here</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {venueEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">
          Reviews{venueReviews.length > 0 && ` (${venueReviews.length})`}
        </h2>
        {venueReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {venueReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No reviews for this venue yet."
            actionLabel="Write one"
            actionHref="/write-review"
          />
        )}
      </section>
    </div>
  );
}
