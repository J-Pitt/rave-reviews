import Link from "next/link";
import Image from "next/image";
import type { Venue } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Users } from "lucide-react";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group glass-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-secondary/25 hover:shadow-xl hover:shadow-accent/8 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-base group-hover:text-accent-secondary transition-colors">
              {venue.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              {venue.neighborhood}, {venue.borough}
            </p>
          </div>
          <StarRating rating={venue.averageRating} size="sm" showValue />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {venue.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          {venue.capacity && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {venue.capacity} cap
            </span>
          )}
          <span>{venue.reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  );
}
