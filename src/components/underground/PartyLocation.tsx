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
      <div
        className={cn(
          "glass-elevated rounded-2xl p-5",
          location.isVague && "border border-accent/20",
          className
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">Location</span>
          {location.isVague && (
            <Badge variant="accent" className="gap-1 ml-auto">
              <EyeOff className="h-3 w-3" />
              Vague
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
            {location.isVague ? "Hint: " : ""}
            {location.secondary}
          </p>
        )}

        {location.isVague && (
          <p className="mt-3 text-xs text-muted/80 border-t border-border pt-3">
            Exact address withheld to protect the space. Organizers may share
            details privately after RSVP.
          </p>
        )}
      </div>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
      <span className={location.isVague ? "italic text-muted" : ""}>
        {location.primary}
      </span>
      {location.isVague && (
        <EyeOff className="h-3 w-3 text-accent/60" aria-label="Vague location" />
      )}
    </span>
  );
}
