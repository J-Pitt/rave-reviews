import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/lib/types";
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
      className="group glass-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">
            {artist.name}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {artist.genre.map((g) => (
            <Badge key={g} variant="accent">
              {g}
            </Badge>
          ))}
        </div>

        <p className="mt-2 text-xs text-muted line-clamp-2">{artist.bio}</p>

        <div className="mt-3 flex items-center justify-between">
          <StarRating rating={artist.averageRating} size="sm" showValue />
          <span className="flex items-center gap-1 text-xs text-muted">
            <Music className="h-3 w-3" />
            {artist.reviewCount} reviews
          </span>
        </div>
      </div>
    </Link>
  );
}
