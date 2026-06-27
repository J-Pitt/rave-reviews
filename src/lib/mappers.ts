import type {
  Artist,
  Event,
  Review,
  UndergroundParty,
  User,
  Venue,
} from "./types";
import type {
  DbArtist,
  DbEvent,
  DbReview,
  DbUndergroundParty,
  DbUser,
  DbVenue,
} from "@/db/schema";

export function mapUser(
  row: DbUser,
  reviewCount = 0
): User {
  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName,
    avatarUrl: row.avatarUrl,
    bio: row.bio ?? undefined,
    reviewCount,
    joinedAt: row.joinedAt,
  };
}

export function mapVenue(
  row: DbVenue,
  stats?: { averageRating: number; reviewCount: number }
): Venue {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    neighborhood: row.neighborhood,
    borough: row.borough,
    address: row.address,
    imageUrl: row.imageUrl,
    capacity: row.capacity ?? undefined,
    tags: row.tags ?? [],
    averageRating: stats?.averageRating ?? 0,
    reviewCount: stats?.reviewCount ?? 0,
  };
}

export function mapArtist(
  row: DbArtist,
  stats?: { averageRating: number; reviewCount: number }
): Artist {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    genre: row.genre ?? [],
    imageUrl: row.imageUrl,
    bio: row.bio,
    averageRating: stats?.averageRating ?? 0,
    reviewCount: stats?.reviewCount ?? 0,
  };
}

export function mapEvent(
  row: DbEvent,
  artistIds: string[],
  stats?: { averageRating: number; reviewCount: number }
): Event {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    venueId: row.venueId,
    artistIds,
    imageUrl: row.imageUrl,
    genre: row.genre ?? [],
    ticketPrice: row.ticketPrice ?? undefined,
    averageRating: stats?.averageRating ?? 0,
    reviewCount: stats?.reviewCount ?? 0,
  };
}

export function mapReview(row: DbReview, tags: string[] = []): Review {
  return {
    id: row.id,
    userId: row.userId,
    eventId: row.eventId ?? undefined,
    venueId: row.venueId ?? undefined,
    artistId: row.artistId ?? undefined,
    title: row.title,
    body: row.body,
    overallRating: row.overallRating,
    soundRating: row.soundRating ?? undefined,
    vibeRating: row.vibeRating ?? undefined,
    crowdRating: row.crowdRating ?? undefined,
    valueRating: row.valueRating ?? undefined,
    tags,
    helpfulCount: row.helpfulCount,
    createdAt: row.createdAt.toISOString().slice(0, 10),
  };
}

export function mapUndergroundParty(row: DbUndergroundParty): UndergroundParty {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    submittedByUserId: row.submittedByUserId,
    date: row.date,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    genre: row.genre ?? [],
    lineup: row.lineup ?? [],
    locationVague: row.locationVague,
    vagueArea: row.vagueArea ?? undefined,
    locationHint: row.locationHint ?? undefined,
    address: row.address ?? undefined,
    venueName: row.venueName ?? undefined,
    neighborhood: row.neighborhood ?? undefined,
    borough: row.borough,
    ticketInfo: row.ticketInfo ?? undefined,
    status: row.status,
    imageUrl: row.imageUrl,
    createdAt: row.createdAt.toISOString().slice(0, 10),
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uniqueSlug(base: string, existing: Set<string>): string {
  const slug = slugify(base);
  if (!existing.has(slug)) return slug;
  let i = 2;
  while (existing.has(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
