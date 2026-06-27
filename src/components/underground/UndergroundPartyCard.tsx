import Link from "next/link";
import Image from "next/image";
import type { UndergroundParty } from "@/lib/types";
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
      className="group glass-elevated rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-secondary/25 hover:shadow-xl hover:shadow-accent/8 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={party.imageUrl}
          alt={party.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        {party.locationVague && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" className="gap-1">
              <EyeOff className="h-3 w-3" />
              Vague location
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {party.genre.slice(0, 2).map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-base leading-snug group-hover:text-accent-secondary transition-colors">
          {party.title}
        </h3>

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
      </div>
    </Link>
  );
}
