import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { StarRating } from "@/components/ui/StarRating";
import {
  getAllArtistSlugs,
  getArtistBySlug,
  getEventsForArtist,
  getReviewsForArtist,
} from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArtistSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found" };
  return { title: artist.name, description: artist.bio || `Reviews for ${artist.name}` };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const artistReviews = await getReviewsForArtist(artist.id);
  const artistEvents = await getEventsForArtist(artist.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {artist.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{artist.name}</h1>

        {artist.bio && (
          <p className="mt-3 text-sm text-muted leading-relaxed">{artist.bio}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {artist.reviewCount > 0 ? (
            <>
              <StarRating rating={artist.averageRating} size="lg" showValue />
              <span className="text-sm text-muted">
                {artist.reviewCount} review{artist.reviewCount === 1 ? "" : "s"}
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

      {artistEvents.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">NYC dates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {artistEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">
          Reviews{artistReviews.length > 0 && ` (${artistReviews.length})`}
        </h2>
        {artistReviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {artistReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No reviews for this artist yet."
            actionLabel="Write one"
            actionHref="/write-review"
          />
        )}
      </section>
    </div>
  );
}
