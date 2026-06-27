import Link from "next/link";
import Image from "next/image";
import type { EventWithVenue } from "@/lib/data";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";
import { formatDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: EventWithVenue;
}

export function EventCard({ event }: EventCardProps) {
  const venue = event.venue;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group panel block overflow-hidden rounded-lg transition-colors hover:border-muted/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-elevated">
        <Image
          src={event.imageUrl || PLACEHOLDER_IMAGE}
          alt=""
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {event.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm leading-snug group-hover:text-foreground">
          {event.title}
        </h3>

        {venue && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3 w-3 shrink-0" />
            {venue.name}, {venue.neighborhood}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Calendar className="h-3 w-3" />
            {formatDate(event.date)}
          </span>
          {event.reviewCount > 0 ? (
            <div className="flex items-center gap-2">
              <StarRating rating={event.averageRating} size="sm" showValue />
              <span className="text-xs text-muted">({event.reviewCount})</span>
            </div>
          ) : (
            <span className="text-xs text-muted">No reviews</span>
          )}
        </div>
      </div>
    </Link>
  );
}
