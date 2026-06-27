import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import {
  artists,
  getArtistBySlug,
  getEventsForArtist,
  getReviewsForArtist,
} from "@/lib/mock-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found" };
  return { title: artist.name, description: artist.bio };
}

export default async function ArtistDetailPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const artistReviews = getReviewsForArtist(artist.id);
  const artistEvents = getEventsForArtist(artist.id);

  return (
    <div>
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-24 relative sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap gap-2 mb-4">
          {artist.genre.map((g) => (
            <Badge key={g} variant="accent">
              {g}
            </Badge>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          {artist.name}
        </h1>

        <p className="mt-4 max-w-2xl text-muted leading-relaxed">{artist.bio}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StarRating rating={artist.averageRating} size="lg" showValue />
          <span className="text-sm text-muted">{artist.reviewCount} reviews</span>
          <Button href="/write-review" size="sm">
            Write a Review
          </Button>
        </div>

        {artistEvents.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold mb-6">NYC Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artistEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold mb-6">
            Reviews ({artistReviews.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {artistReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
