import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/lib/types";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Music } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group panel block overflow-hidden rounded-lg transition-colors hover:border-muted/30"
    >
      <div className="relative aspect-square overflow-hidden border-b border-border bg-surface-elevated">
        <Image
          src={artist.imageUrl || PLACEHOLDER_IMAGE}
          alt=""
          fill
          className="object-cover opacity-90"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm">{artist.name}</h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {artist.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        {artist.bio && (
          <p className="mt-2 text-xs text-muted line-clamp-2">{artist.bio}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          {artist.reviewCount > 0 ? (
            <StarRating rating={artist.averageRating} size="sm" showValue />
          ) : (
            <span className="text-xs text-muted">No reviews yet</span>
          )}
          <span className="flex items-center gap-1 text-xs text-muted">
            <Music className="h-3 w-3" />
            {artist.reviewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
