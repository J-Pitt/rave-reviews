import Link from "next/link";
import Image from "next/image";
import type { EventWithVenue } from "@/lib/data";
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
      className="group glass-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-secondary/25 hover:shadow-xl hover:shadow-accent/8 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {event.genre.map((g) => (
              <Badge key={g} variant="accent">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-base leading-snug group-hover:text-accent-secondary transition-colors">
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
          <div className="flex items-center gap-2">
            <StarRating rating={event.averageRating} size="sm" showValue />
            <span className="text-xs text-muted">({event.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
