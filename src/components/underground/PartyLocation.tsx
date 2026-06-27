import type { UndergroundParty } from "@/lib/types";
import { formatPartyLocation } from "@/lib/underground";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { EyeOff, MapPin } from "lucide-react";

interface PartyLocationProps {
  party: UndergroundParty;
  variant?: "inline" | "card";
  className?: string;
}

export function PartyLocation({
  party,
  variant = "inline",
  className,
}: PartyLocationProps) {
  const location = formatPartyLocation(party);

  if (variant === "card") {
    return (
      <div className={cn("panel rounded-lg p-4", className)}>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-3.5 w-3.5 text-muted" />
          <span className="text-sm font-medium">Location</span>
          {location.isVague && (
            <Badge className="gap-1 ml-auto">
              <EyeOff className="h-3 w-3" />
              Hidden
            </Badge>
          )}
        </div>

        <p
          className={cn(
            "text-sm",
            location.isVague ? "italic text-muted" : "text-foreground"
          )}
        >
          {location.primary}
        </p>

        {location.secondary && (
          <p className="mt-2 text-xs text-muted leading-relaxed">
            {location.secondary}
          </p>
        )}
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
      <span className={location.isVague ? "italic text-muted" : ""}>
        {location.primary}
      </span>
    </span>
  );
}
