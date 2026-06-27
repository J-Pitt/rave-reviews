import Link from "next/link";
import type { ReviewWithRelations } from "@/lib/data";
import { formatRelativeDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

interface ReviewCardProps {
  review: ReviewWithRelations;
  compact?: boolean;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewCard({ review, compact = false }: ReviewCardProps) {
  const user = review.user;
  const venue = review.venue;
  const artist = review.artist;
  const event = review.event;

  if (!user) return null;

  return (
    <article className="panel rounded-lg p-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-[11px] font-medium text-muted"
          aria-hidden
        >
          {initials(user.displayName)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-medium">{user.displayName}</span>
            <span className="text-xs text-muted">
              {formatRelativeDate(review.createdAt)}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {event && (
              <Link href={`/events/${event.slug}`}>
                <Badge>{event.title}</Badge>
              </Link>
            )}
            {venue && !event && (
              <Link href={`/venues/${venue.slug}`}>
                <Badge>{venue.name}</Badge>
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

      <Link href={`/reviews#${review.id}`} className="block mt-3">
        <h3 className="font-medium text-sm">{review.title}</h3>
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

      {!compact && (review.soundRating || review.vibeRating) && (
        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          {review.soundRating && <span>Sound {review.soundRating}/5</span>}
          {review.vibeRating && <span>Vibe {review.vibeRating}/5</span>}
          {review.helpfulCount > 0 && (
            <span>{review.helpfulCount} found helpful</span>
          )}
        </div>
      )}
    </article>
  );
}
