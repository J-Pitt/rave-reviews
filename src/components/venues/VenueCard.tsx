import Link from "next/link";
import Image from "next/image";
import type { Venue } from "@/lib/types";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";
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
      className="group panel block overflow-hidden rounded-lg transition-colors hover:border-muted/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-elevated">
        <Image
          src={venue.imageUrl || PLACEHOLDER_IMAGE}
          alt=""
          fill
          className="object-cover opacity-90"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-sm">{venue.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              {venue.neighborhood}, {venue.borough}
            </p>
          </div>
          {venue.reviewCount > 0 && (
            <StarRating rating={venue.averageRating} size="sm" showValue />
          )}
        </div>

        {venue.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {venue.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          {venue.capacity && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {venue.capacity}
            </span>
          )}
          <span>
            {venue.reviewCount > 0
              ? `${venue.reviewCount} review${venue.reviewCount === 1 ? "" : "s"}`
              : "No reviews yet"}
          </span>
        </div>
      </div>
    </Link>
  );
}
