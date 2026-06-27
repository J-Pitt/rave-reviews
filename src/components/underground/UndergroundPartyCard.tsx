import Link from "next/link";
import Image from "next/image";
import type { UndergroundParty } from "@/lib/types";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";
import { formatPartyLocation } from "@/lib/underground";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, EyeOff, MapPin, Music } from "lucide-react";

interface UndergroundPartyCardProps {
  party: UndergroundParty;
}

export function UndergroundPartyCard({ party }: UndergroundPartyCardProps) {
  const location = formatPartyLocation(party);

  return (
    <Link
      href={`/underground/${party.slug}`}
      className="group panel block overflow-hidden rounded-lg transition-colors hover:border-muted/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-elevated">
        <Image
          src={party.imageUrl || PLACEHOLDER_IMAGE}
          alt=""
          fill
          className="object-cover opacity-90"
        />
        {party.locationVague && (
          <div className="absolute top-3 left-3">
            <Badge className="gap-1">
              <EyeOff className="h-3 w-3" />
              Location TBD
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm leading-snug">{party.title}</h3>

        <div className="mt-2 flex items-start gap-1.5 text-xs text-muted">
          <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
          <span className={location.isVague ? "italic" : ""}>{location.primary}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatDate(party.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {party.startTime}
          </span>
        </div>

        {party.lineup.length > 0 && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted line-clamp-1">
            <Music className="h-3 w-3 shrink-0" />
            {party.lineup.join(" · ")}
          </p>
        )}

        {party.genre.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {party.genre.slice(0, 2).map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
