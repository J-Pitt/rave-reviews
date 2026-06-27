"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { artists, events, reviewTags, reviews, undergroundParties, venues } from "@/db/schema";
import { newId, uniqueSlug } from "@/lib/mappers";

import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";

const GUEST_USER_ID = "u-guest";
const DEFAULT_PARTY_IMAGE = PLACEHOLDER_IMAGE;

export type ActionResult =
  | { success: true; id: string; slug?: string }
  | { success: false; error: string };

export async function createReview(input: {
  reviewType: "event" | "venue" | "artist";
  targetId: string;
  title: string;
  body: string;
  overallRating: number;
  soundRating?: number;
  vibeRating?: number;
  crowdRating?: number;
  valueRating?: number;
  tags?: string[];
}): Promise<ActionResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: "Database is not configured. Set DATABASE_URL in .env.local." };
  }

  if (!input.title.trim() || !input.body.trim() || input.overallRating < 1) {
    return { success: false, error: "Please complete all required fields." };
  }

  const id = newId("r");
  const reviewRow = {
    id,
    userId: GUEST_USER_ID,
    eventId: input.reviewType === "event" ? input.targetId : null,
    venueId: input.reviewType === "venue" ? input.targetId : null,
    artistId: input.reviewType === "artist" ? input.targetId : null,
    title: input.title.trim(),
    body: input.body.trim(),
    overallRating: input.overallRating,
    soundRating: input.soundRating || null,
    vibeRating: input.vibeRating || null,
    crowdRating: input.crowdRating || null,
    valueRating: input.valueRating || null,
    helpfulCount: 0,
  };

  try {
    await db.insert(reviews).values(reviewRow);

    const tags = (input.tags ?? []).filter(Boolean);
    if (tags.length > 0) {
      await db.insert(reviewTags).values(
        tags.map((tag) => ({ reviewId: id, tag }))
      );
    }

    revalidatePath("/reviews");
    revalidatePath("/");

    if (input.reviewType === "event") {
      const [event] = await db
        .select({ slug: events.slug })
        .from(events)
        .where(eq(events.id, input.targetId))
        .limit(1);
      if (event) revalidatePath(`/events/${event.slug}`);
    } else if (input.reviewType === "venue") {
      const [venue] = await db
        .select({ slug: venues.slug })
        .from(venues)
        .where(eq(venues.id, input.targetId))
        .limit(1);
      if (venue) revalidatePath(`/venues/${venue.slug}`);
    } else {
      const [artist] = await db
        .select({ slug: artists.slug })
        .from(artists)
        .where(eq(artists.id, input.targetId))
        .limit(1);
      if (artist) revalidatePath(`/artists/${artist.slug}`);
    }

    return { success: true, id };
  } catch (error) {
    console.error("createReview failed:", error);
    return { success: false, error: "Could not save review. Check your database connection." };
  }
}

export async function createUndergroundParty(input: {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  lineup: string;
  genre: string[];
  ticketInfo?: string;
  locationVague: boolean;
  borough: string;
  vagueArea?: string;
  locationHint?: string;
  address?: string;
  venueName?: string;
  neighborhood?: string;
}): Promise<ActionResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: "Database is not configured. Set DATABASE_URL in .env.local." };
  }

  if (!input.title.trim() || !input.description.trim() || !input.date || !input.borough) {
    return { success: false, error: "Please complete all required fields." };
  }

  if (input.locationVague && !input.vagueArea?.trim()) {
    return { success: false, error: "Add a general area when keeping the location vague." };
  }

  if (!input.locationVague && !input.address?.trim()) {
    return { success: false, error: "Add a street address or keep the location vague." };
  }

  const existing = await db.select({ slug: undergroundParties.slug }).from(undergroundParties);
  const slugSet = new Set(existing.map((r) => r.slug));
  const slug = uniqueSlug(input.title, slugSet);
  const id = newId("up");

  const lineup = input.lineup
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    await db.insert(undergroundParties).values({
      id,
      slug,
      submittedByUserId: GUEST_USER_ID,
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      startTime: input.startTime,
      endTime: input.endTime || null,
      genre: input.genre,
      lineup,
      locationVague: input.locationVague,
      vagueArea: input.locationVague ? input.vagueArea?.trim() || null : null,
      locationHint: input.locationHint?.trim() || null,
      address: input.locationVague ? null : input.address?.trim() || null,
      venueName: input.locationVague ? null : input.venueName?.trim() || null,
      neighborhood: input.locationVague ? null : input.neighborhood?.trim() || null,
      borough: input.borough,
      ticketInfo: input.ticketInfo?.trim() || null,
      status: "approved",
      imageUrl: DEFAULT_PARTY_IMAGE,
    });

    revalidatePath("/underground");
    revalidatePath("/");
    revalidatePath(`/underground/${slug}`);

    return { success: true, id, slug };
  } catch (error) {
    console.error("createUndergroundParty failed:", error);
    return { success: false, error: "Could not save party. Check your database connection." };
  }
}
