import Link from "next/link";
import Image from "next/image";
import type { ReviewWithRelations } from "@/lib/data";
import { formatRelativeDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { ThumbsUp } from "lucide-react";

interface ReviewCardProps {
  review: ReviewWithRelations;
  compact?: boolean;
}

export function ReviewCard({ review, compact = false }: ReviewCardProps) {
  const user = review.user;
  const venue = review.venue;
  const artist = review.artist;
  const event = review.event;

  if (!user) return null;

  return (
    <article className="glass-elevated rounded-2xl p-5 transition-all duration-300 hover:border-accent-secondary/20 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-start gap-3">
        <Image
          src={user.avatarUrl}
          alt={user.displayName}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-border"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-medium text-sm">{user.displayName}</span>
            <span className="text-xs text-muted">·</span>
            <span className="text-xs text-muted">{formatRelativeDate(review.createdAt)}</span>
          </div>

          <div className="mt-1 flex flex-wrap gap-1.5">
            {event && (
              <Link href={`/events/${event.slug}`}>
                <Badge variant="accent">{event.title}</Badge>
              </Link>
            )}
            {venue && !event && (
              <Link href={`/venues/${venue.slug}`}>
                <Badge variant="accent">{venue.name}</Badge>
              </Link>
            )}
            {artist && (
              <Link href={`/artists/${artist.slug}`}>
                <Badge>{artist.name}</Badge>
              </Link>
            )}
          </div>
        </div>

        <StarRating rating={review.overallRating} size="sm" />
      </div>

      <Link href={`/reviews#${review.id}`} className="block mt-3 group">
        <h3 className="font-display font-semibold text-base group-hover:text-accent-secondary transition-colors">
          {review.title}
        </h3>
        <p
          className={`mt-2 text-sm text-muted leading-relaxed ${compact ? "line-clamp-3" : "line-clamp-4"}`}
        >
          {review.body}
        </p>
      </Link>

      {!compact && review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <ThumbsUp className="h-3.5 w-3.5" />
          {review.helpfulCount} helpful
        </span>
        {!compact && review.soundRating && (
          <span>Sound {review.soundRating}/5</span>
        )}
        {!compact && review.vibeRating && (
          <span>Vibe {review.vibeRating}/5</span>
        )}
      </div>
    </article>
  );
}
