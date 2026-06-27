import { config } from "dotenv";
config({ path: ".env.local" });
config();

import "dotenv/config";
import { closeDb, getDb } from "./index";
import {
  artists,
  events,
  eventArtists,
  reviewTags,
  reviews,
  undergroundParties,
  users,
  venues,
} from "./schema";
import {
  artists as seedArtists,
  events as seedEvents,
  reviews as seedReviews,
  undergroundParties as seedUnderground,
  users as seedUsers,
  venues as seedVenues,
} from "@/lib/mock-data";

async function seed() {
  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env.local first.");
    process.exit(1);
  }

  console.log("Seeding Rave Reviews database...");

  await db.delete(reviewTags);
  await db.delete(reviews);
  await db.delete(eventArtists);
  await db.delete(undergroundParties);
  await db.delete(events);
  await db.delete(artists);
  await db.delete(venues);
  await db.delete(users);

  await db.insert(users).values([
    ...seedUsers.map((u) => ({
      id: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      bio: u.bio ?? null,
      joinedAt: u.joinedAt,
    })),
    {
      id: "u-guest",
      username: "guest",
      displayName: "Community Member",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      bio: "Anonymous community submissions",
      joinedAt: "2025-01-01",
    },
  ]);

  await db.insert(venues).values(
    seedVenues.map((v) => ({
      id: v.id,
      slug: v.slug,
      name: v.name,
      neighborhood: v.neighborhood,
      borough: v.borough,
      address: v.address,
      imageUrl: v.imageUrl,
      capacity: v.capacity ?? null,
      tags: v.tags,
    }))
  );

  await db.insert(artists).values(
    seedArtists.map((a) => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      genre: a.genre,
      imageUrl: a.imageUrl,
      bio: a.bio,
    }))
  );

  await db.insert(events).values(
    seedEvents.map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      date: e.date,
      venueId: e.venueId,
      imageUrl: e.imageUrl,
      genre: e.genre,
      ticketPrice: e.ticketPrice ?? null,
    }))
  );

  const eventArtistRows = seedEvents.flatMap((e) =>
    e.artistIds.map((artistId) => ({
      eventId: e.id,
      artistId,
    }))
  );
  if (eventArtistRows.length > 0) {
    await db.insert(eventArtists).values(eventArtistRows);
  }

  await db.insert(reviews).values(
    seedReviews.map((r) => ({
      id: r.id,
      userId: r.userId,
      eventId: r.eventId ?? null,
      venueId: r.venueId ?? null,
      artistId: r.artistId ?? null,
      title: r.title,
      body: r.body,
      overallRating: r.overallRating,
      soundRating: r.soundRating ?? null,
      vibeRating: r.vibeRating ?? null,
      crowdRating: r.crowdRating ?? null,
      valueRating: r.valueRating ?? null,
      helpfulCount: r.helpfulCount,
      createdAt: new Date(r.createdAt),
    }))
  );

  const tagRows = seedReviews.flatMap((r) =>
    r.tags.map((tag) => ({ reviewId: r.id, tag }))
  );
  if (tagRows.length > 0) {
    await db.insert(reviewTags).values(tagRows);
  }

  await db.insert(undergroundParties).values(
    seedUnderground.map((p) => ({
      id: p.id,
      slug: p.slug,
      submittedByUserId: p.submittedByUserId,
      title: p.title,
      description: p.description,
      date: p.date,
      startTime: p.startTime,
      endTime: p.endTime ?? null,
      genre: p.genre,
      lineup: p.lineup,
      locationVague: p.locationVague,
      vagueArea: p.vagueArea ?? null,
      locationHint: p.locationHint ?? null,
      address: p.address ?? null,
      venueName: p.venueName ?? null,
      neighborhood: p.neighborhood ?? null,
      borough: p.borough,
      ticketInfo: p.ticketInfo ?? null,
      status: p.status,
      imageUrl: p.imageUrl,
      createdAt: new Date(p.createdAt),
    }))
  );

  const counts = await Promise.all([
    db.select().from(users),
    db.select().from(venues),
    db.select().from(reviews),
  ]);

  console.log(
    `Done. Seeded ${counts[0].length} users, ${counts[1].length} venues, ${counts[2].length} reviews.`
  );

  await closeDb();
}

seed().catch(async (err) => {
  console.error(err);
  await closeDb();
  process.exit(1);
});
