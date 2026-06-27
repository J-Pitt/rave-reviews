import type { UndergroundParty } from "./types";

export function formatPartyLocation(party: UndergroundParty): {
  primary: string;
  secondary?: string;
  isVague: boolean;
} {
  if (party.locationVague) {
    const parts = [party.vagueArea, party.borough].filter(Boolean);
    return {
      primary: parts.join(", ") || party.borough,
      secondary: party.locationHint,
      isVague: true,
    };
  }

  const parts = [party.venueName, party.neighborhood, party.borough].filter(Boolean);
  return {
    primary: party.address ?? parts.join(", "),
    secondary: party.address ? parts.join(", ") : undefined,
    isVague: false,
  };
}

export const NYC_BOROUGHS = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
] as const;

export const UNDERGROUND_GENRES = [
  "Techno",
  "House",
  "Hard Techno",
  "Breaks",
  "Ambient",
  "Experimental",
  "Disco",
  "Garage",
] as const;
