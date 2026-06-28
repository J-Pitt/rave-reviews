"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import {
  artists,
  eventArtists,
  events,
  reviewTags,
  reviews,
  undergroundParties,
  venues,
} from "@/db/schema";
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

export async function createVenue(input: {
  name: string;
  neighborhood: string;
  borough: string;
  address: string;
  tags?: string[];
  capacity?: number;
}): Promise<ActionResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: "Database is not configured. Set DATABASE_URL in .env.local." };
  }

  if (!input.name.trim() || !input.neighborhood.trim() || !input.borough.trim()) {
    return { success: false, error: "Name, neighborhood, and borough are required." };
  }

  const address = input.address.trim() || `${input.name.trim()}, ${input.borough.trim()}`;

  try {
    const existing = await db.select({ slug: venues.slug }).from(venues);
    const slug = uniqueSlug(input.name, new Set(existing.map((r) => r.slug)));
    const id = newId("v");

    await db.insert(venues).values({
      id,
      slug,
      name: input.name.trim(),
      neighborhood: input.neighborhood.trim(),
      borough: input.borough.trim(),
      address,
      imageUrl: PLACEHOLDER_IMAGE,
      capacity: input.capacity ?? null,
      tags: input.tags ?? [],
    });

    revalidatePath("/venues");
    revalidatePath("/write-review");
    revalidatePath("/add-listing");
    revalidatePath("/");
    revalidatePath(`/venues/${slug}`);

    return { success: true, id, slug };
  } catch (error) {
    console.error("createVenue failed:", error);
    return { success: false, error: "Could not save venue. Check your database connection." };
  }
}

export async function createArtist(input: {
  name: string;
  genre?: string[];
  bio?: string;
}): Promise<ActionResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: "Database is not configured. Set DATABASE_URL in .env.local." };
  }

  if (!input.name.trim()) {
    return { success: false, error: "Artist name is required." };
  }

  try {
    const existing = await db.select({ slug: artists.slug }).from(artists);
    const slug = uniqueSlug(input.name, new Set(existing.map((r) => r.slug)));
    const id = newId("a");

    await db.insert(artists).values({
      id,
      slug,
      name: input.name.trim(),
      genre: input.genre ?? [],
      imageUrl: PLACEHOLDER_IMAGE,
      bio: input.bio?.trim() || "",
    });

    revalidatePath("/artists");
    revalidatePath("/write-review");
    revalidatePath("/add-listing");
    revalidatePath("/");
    revalidatePath(`/artists/${slug}`);

    return { success: true, id, slug };
  } catch (error) {
    console.error("createArtist failed:", error);
    return { success: false, error: "Could not save artist. Check your database connection." };
  }
}

export async function createEvent(input: {
  title: string;
  date: string;
  venueId: string;
  artistIds?: string[];
  genre?: string[];
  ticketPrice?: string;
}): Promise<ActionResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: "Database is not configured. Set DATABASE_URL in .env.local." };
  }

  if (!input.title.trim() || !input.date || !input.venueId) {
    return { success: false, error: "Title, date, and venue are required." };
  }

  try {
    const [venue] = await db
      .select({ id: venues.id })
      .from(venues)
      .where(eq(venues.id, input.venueId))
      .limit(1);

    if (!venue) {
      return { success: false, error: "Pick a venue from the list or add one first." };
    }

    const existing = await db.select({ slug: events.slug }).from(events);
    const slug = uniqueSlug(input.title, new Set(existing.map((r) => r.slug)));
    const id = newId("e");

    await db.insert(events).values({
      id,
      slug,
      title: input.title.trim(),
      date: input.date,
      venueId: input.venueId,
      imageUrl: PLACEHOLDER_IMAGE,
      genre: input.genre ?? [],
      ticketPrice: input.ticketPrice?.trim() || null,
    });

    const artistIds = (input.artistIds ?? []).filter(Boolean);
    if (artistIds.length > 0) {
      await db.insert(eventArtists).values(
        artistIds.map((artistId) => ({ eventId: id, artistId }))
      );
    }

    revalidatePath("/events");
    revalidatePath("/write-review");
    revalidatePath("/add-listing");
    revalidatePath("/");
    revalidatePath(`/events/${slug}`);

    return { success: true, id, slug };
  } catch (error) {
    console.error("createEvent failed:", error);
    return { success: false, error: "Could not save event. Check your database connection." };
  }
}
