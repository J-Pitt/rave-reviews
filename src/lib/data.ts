import { and, avg, count, desc, eq, gte, inArray, sql } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import {
  artists,
  eventArtists,
  events,
  reviewTags,
  reviews,
  undergroundParties,
  users,
  venues,
} from "@/db/schema";
import * as mock from "@/lib/mock-data";
import {
  mapArtist,
  mapEvent,
  mapReview,
  mapUndergroundParty,
  mapUser,
  mapVenue,
} from "@/lib/mappers";
import type {
  Artist,
  Event,
  Neighborhood,
  Review,
  UndergroundParty,
  User,
  Venue,
} from "@/lib/types";

export interface ReviewWithRelations extends Review {
  user?: User;
  event?: Event;
  venue?: Venue;
  artist?: Artist;
}

export interface EventWithVenue extends Event {
  venue?: Pick<Venue, "name" | "neighborhood" | "slug">;
}

async function withDb<T>(
  query: (db: NonNullable<ReturnType<typeof getDb>>) => Promise<T>,
  fallback: () => T
): Promise<T> {
  const db = getDb();
  if (!db) return fallback();
  try {
    return await query(db);
  } catch (error) {
    console.error("Database query failed, using mock fallback:", error);
    return fallback();
  }
}

async function loadReviewTags(db: NonNullable<ReturnType<typeof getDb>>, reviewIds: string[]) {
  if (reviewIds.length === 0) return new Map<string, string[]>();
  const rows = await db
    .select()
    .from(reviewTags)
    .where(inArray(reviewTags.reviewId, reviewIds));
  const map = new Map<string, string[]>();
  for (const row of rows) {
    const existing = map.get(row.reviewId) ?? [];
    existing.push(row.tag);
    map.set(row.reviewId, existing);
  }
  return map;
}

async function loadEventArtistIds(
  db: NonNullable<ReturnType<typeof getDb>>,
  eventIds: string[]
) {
  if (eventIds.length === 0) return new Map<string, string[]>();
  const rows = await db
    .select()
    .from(eventArtists)
    .where(inArray(eventArtists.eventId, eventIds));
  const map = new Map<string, string[]>();
  for (const row of rows) {
    const existing = map.get(row.eventId) ?? [];
    existing.push(row.artistId);
    map.set(row.eventId, existing);
  }
  return map;
}

async function reviewStatsForEvents(db: NonNullable<ReturnType<typeof getDb>>) {
  const rows = await db
    .select({
      eventId: reviews.eventId,
      averageRating: avg(reviews.overallRating),
      reviewCount: count(reviews.id),
    })
    .from(reviews)
    .where(sql`${reviews.eventId} IS NOT NULL`)
    .groupBy(reviews.eventId);
  return new Map(
    rows
      .filter((r) => r.eventId)
      .map((r) => [
        r.eventId!,
        {
          averageRating: Number(r.averageRating ?? 0),
          reviewCount: Number(r.reviewCount ?? 0),
        },
      ])
  );
}

async function reviewStatsForVenues(db: NonNullable<ReturnType<typeof getDb>>) {
  const rows = await db
    .select({
      venueId: reviews.venueId,
      averageRating: avg(reviews.overallRating),
      reviewCount: count(reviews.id),
    })
    .from(reviews)
    .where(sql`${reviews.venueId} IS NOT NULL`)
    .groupBy(reviews.venueId);
  return new Map(
    rows
      .filter((r) => r.venueId)
      .map((r) => [
        r.venueId!,
        {
          averageRating: Number(Number(r.averageRating ?? 0).toFixed(1)),
          reviewCount: Number(r.reviewCount ?? 0),
        },
      ])
  );
}

async function reviewStatsForArtists(db: NonNullable<ReturnType<typeof getDb>>) {
  const rows = await db
    .select({
      artistId: reviews.artistId,
      averageRating: avg(reviews.overallRating),
      reviewCount: count(reviews.id),
    })
    .from(reviews)
    .where(sql`${reviews.artistId} IS NOT NULL`)
    .groupBy(reviews.artistId);
  return new Map(
    rows
      .filter((r) => r.artistId)
      .map((r) => [
        r.artistId!,
        {
          averageRating: Number(Number(r.averageRating ?? 0).toFixed(1)),
          reviewCount: Number(r.reviewCount ?? 0),
        },
      ])
  );
}

async function enrichReviews(
  db: NonNullable<ReturnType<typeof getDb>>,
  reviewRows: (typeof reviews.$inferSelect)[]
): Promise<ReviewWithRelations[]> {
  if (reviewRows.length === 0) return [];

  const tagMap = await loadReviewTags(
    db,
    reviewRows.map((r) => r.id)
  );

  const userIds = [...new Set(reviewRows.map((r) => r.userId))];
  const eventIds = [
    ...new Set(reviewRows.map((r) => r.eventId).filter(Boolean) as string[]),
  ];
  const venueIds = [
    ...new Set(reviewRows.map((r) => r.venueId).filter(Boolean) as string[]),
  ];
  const artistIds = [
    ...new Set(reviewRows.map((r) => r.artistId).filter(Boolean) as string[]),
  ];

  const [userRows, eventRows, venueRows, artistRows, eventStats, artistStats] =
    await Promise.all([
      db.select().from(users).where(inArray(users.id, userIds)),
      eventIds.length
        ? db.select().from(events).where(inArray(events.id, eventIds))
        : Promise.resolve([]),
      venueIds.length
        ? db.select().from(venues).where(inArray(venues.id, venueIds))
        : Promise.resolve([]),
      artistIds.length
        ? db.select().from(artists).where(inArray(artists.id, artistIds))
        : Promise.resolve([]),
      reviewStatsForEvents(db),
      reviewStatsForArtists(db),
    ]);

  const eventArtistMap = await loadEventArtistIds(
    db,
    eventRows.map((e) => e.id)
  );

  const userMap = new Map(userRows.map((u) => [u.id, mapUser(u)]));
  const eventMap = new Map(
    eventRows.map((e) => [
      e.id,
      mapEvent(e, eventArtistMap.get(e.id) ?? [], eventStats.get(e.id)),
    ])
  );
  const venueMap = new Map(venueRows.map((v) => [v.id, mapVenue(v)]));
  const artistMap = new Map(
    artistRows.map((a) => [a.id, mapArtist(a, artistStats.get(a.id))])
  );

  return reviewRows.map((row) => {
    const review = mapReview(row, tagMap.get(row.id) ?? []);
    return {
      ...review,
      user: userMap.get(row.userId),
      event: row.eventId ? eventMap.get(row.eventId) : undefined,
      venue: row.venueId ? venueMap.get(row.venueId) : undefined,
      artist: row.artistId ? artistMap.get(row.artistId) : undefined,
    };
  });
}

async function mapEventsWithVenues(
  db: NonNullable<ReturnType<typeof getDb>>,
  eventRows: (typeof events.$inferSelect)[]
): Promise<EventWithVenue[]> {
  if (eventRows.length === 0) return [];
  const stats = await reviewStatsForEvents(db);
  const artistMap = await loadEventArtistIds(
    db,
    eventRows.map((e) => e.id)
  );
  const venueRows = await db
    .select()
    .from(venues)
    .where(
      inArray(
        venues.id,
        eventRows.map((e) => e.venueId)
      )
    );
  const venueLookup = new Map(venueRows.map((v) => [v.id, v]));

  return eventRows.map((e) => {
    const venue = venueLookup.get(e.venueId);
    return {
      ...mapEvent(e, artistMap.get(e.id) ?? [], stats.get(e.id)),
      venue: venue
        ? { name: venue.name, neighborhood: venue.neighborhood, slug: venue.slug }
        : undefined,
    };
  });
}

export async function getAllEvents(): Promise<EventWithVenue[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(events).orderBy(desc(events.date));
    return mapEventsWithVenues(db, rows);
  }, () => mock.events.map((e) => ({ ...e, venue: mock.getVenue(e.venueId) })));
}

export async function getEventBySlug(slug: string): Promise<EventWithVenue | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
    if (!row) return undefined;
    const [event] = await mapEventsWithVenues(db, [row]);
    return event;
  }, () => {
    const event = mock.getEventBySlug(slug);
    if (!event) return undefined;
    const venue = mock.getVenue(event.venueId);
    return {
      ...event,
      venue: venue
        ? { name: venue.name, neighborhood: venue.neighborhood, slug: venue.slug }
        : undefined,
    };
  });
}

export async function getAllVenues(): Promise<Venue[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(venues);
    const stats = await reviewStatsForVenues(db);
    return rows
      .map((v) => mapVenue(v, stats.get(v.id)))
      .sort((a, b) => b.averageRating - a.averageRating);
  }, () => [...mock.venues].sort((a, b) => b.averageRating - a.averageRating));
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(venues).where(eq(venues.slug, slug)).limit(1);
    if (!row) return undefined;
    const stats = await reviewStatsForVenues(db);
    return mapVenue(row, stats.get(row.id));
  }, () => mock.getVenueBySlug(slug));
}

export async function getVenue(id: string): Promise<Venue | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(venues).where(eq(venues.id, id)).limit(1);
    if (!row) return undefined;
    const stats = await reviewStatsForVenues(db);
    return mapVenue(row, stats.get(row.id));
  }, () => mock.getVenue(id));
}

export async function getAllArtists(): Promise<Artist[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(artists);
    const stats = await reviewStatsForArtists(db);
    return rows
      .map((a) => mapArtist(a, stats.get(a.id)))
      .sort((a, b) => b.averageRating - a.averageRating);
  }, () => [...mock.artists].sort((a, b) => b.averageRating - a.averageRating));
}

export async function getArtistBySlug(slug: string): Promise<Artist | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(artists).where(eq(artists.slug, slug)).limit(1);
    if (!row) return undefined;
    const stats = await reviewStatsForArtists(db);
    return mapArtist(row, stats.get(row.id));
  }, () => mock.getArtistBySlug(slug));
}

export async function getArtist(id: string): Promise<Artist | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(artists).where(eq(artists.id, id)).limit(1);
    if (!row) return undefined;
    const stats = await reviewStatsForArtists(db);
    return mapArtist(row, stats.get(row.id));
  }, () => mock.getArtist(id));
}

export async function getAllReviews(): Promise<ReviewWithRelations[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    return enrichReviews(db, rows);
  }, () =>
    mock.reviews.map((r) => ({
      ...r,
      user: mock.getUser(r.userId),
      event: r.eventId ? mock.getEvent(r.eventId) : undefined,
      venue: r.venueId ? mock.getVenue(r.venueId) : undefined,
      artist: r.artistId ? mock.getArtist(r.artistId) : undefined,
    }))
  );
}

export async function getReviewsForEvent(eventId: string): Promise<ReviewWithRelations[]> {
  return withDb(async (db) => {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.eventId, eventId))
      .orderBy(desc(reviews.createdAt));
    return enrichReviews(db, rows);
  }, () =>
    mock.getReviewsForEvent(eventId).map((r) => ({
      ...r,
      user: mock.getUser(r.userId),
      event: mock.getEvent(eventId),
      venue: r.venueId ? mock.getVenue(r.venueId) : undefined,
      artist: r.artistId ? mock.getArtist(r.artistId) : undefined,
    }))
  );
}

export async function getReviewsForVenue(venueId: string): Promise<ReviewWithRelations[]> {
  return withDb(async (db) => {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.venueId, venueId))
      .orderBy(desc(reviews.createdAt));
    return enrichReviews(db, rows);
  }, () =>
    mock.getReviewsForVenue(venueId).map((r) => ({
      ...r,
      user: mock.getUser(r.userId),
      venue: mock.getVenue(venueId),
      event: r.eventId ? mock.getEvent(r.eventId) : undefined,
      artist: r.artistId ? mock.getArtist(r.artistId) : undefined,
    }))
  );
}

export async function getReviewsForArtist(artistId: string): Promise<ReviewWithRelations[]> {
  return withDb(async (db) => {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.artistId, artistId))
      .orderBy(desc(reviews.createdAt));
    return enrichReviews(db, rows);
  }, () =>
    mock.getReviewsForArtist(artistId).map((r) => ({
      ...r,
      user: mock.getUser(r.userId),
      artist: mock.getArtist(artistId),
      event: r.eventId ? mock.getEvent(r.eventId) : undefined,
      venue: r.venueId ? mock.getVenue(r.venueId) : undefined,
    }))
  );
}

export async function getEventsForVenue(venueId: string): Promise<EventWithVenue[]> {
  return withDb(async (db) => {
    const rows = await db.select().from(events).where(eq(events.venueId, venueId));
    return mapEventsWithVenues(db, rows);
  }, () =>
    mock.getEventsForVenue(venueId).map((e) => ({
      ...e,
      venue: mock.getVenue(venueId),
    }))
  );
}

export async function getEventsForArtist(artistId: string): Promise<EventWithVenue[]> {
  return withDb(async (db) => {
    const links = await db
      .select()
      .from(eventArtists)
      .where(eq(eventArtists.artistId, artistId));
    if (links.length === 0) return [];
    const rows = await db
      .select()
      .from(events)
      .where(
        inArray(
          events.id,
          links.map((l) => l.eventId)
        )
      );
    return mapEventsWithVenues(db, rows);
  }, () =>
    mock.getEventsForArtist(artistId).map((e) => ({
      ...e,
      venue: mock.getVenue(e.venueId),
    }))
  );
}

export async function getTrendingEvents(limit = 4): Promise<EventWithVenue[]> {
  const all = await getAllEvents();
  return [...all].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export async function getTopVenues(limit = 4): Promise<Venue[]> {
  const all = await getAllVenues();
  return all.slice(0, limit);
}

export async function getRecentReviews(limit = 6): Promise<ReviewWithRelations[]> {
  const all = await getAllReviews();
  return all.slice(0, limit);
}

export async function getStats() {
  return withDb(async (db) => {
    const [reviewRows, venueRows, eventRows, artistRows, undergroundRows, avgRow] =
      await Promise.all([
        db.select({ count: count() }).from(reviews),
        db.select({ count: count() }).from(venues),
        db.select({ count: count() }).from(events),
        db.select({ count: count() }).from(artists),
        db.select({ count: count() }).from(undergroundParties),
        db.select({ avg: avg(reviews.overallRating) }).from(reviews),
      ]);

    return {
      totalReviews: Number(reviewRows[0]?.count ?? 0),
      totalVenues: Number(venueRows[0]?.count ?? 0),
      totalEvents: Number(eventRows[0]?.count ?? 0),
      totalArtists: Number(artistRows[0]?.count ?? 0),
      totalUnderground: Number(undergroundRows[0]?.count ?? 0),
      avgRating: Number(avgRow[0]?.avg ?? 0).toFixed(1),
      usingDatabase: true,
    };
  }, () => ({ ...mock.getStats(), usingDatabase: false }));
}

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return mock.neighborhoods;
}

export async function getUpcomingUndergroundParties(): Promise<UndergroundParty[]> {
  const today = new Date().toISOString().slice(0, 10);
  return withDb(async (db) => {
    const rows = await db
      .select()
      .from(undergroundParties)
      .where(
        and(
          eq(undergroundParties.status, "approved"),
          gte(undergroundParties.date, today)
        )
      )
      .orderBy(undergroundParties.date);
    return rows.map(mapUndergroundParty);
  }, () => mock.getUpcomingUndergroundParties());
}

export async function getFeaturedUndergroundParties(
  limit = 3
): Promise<UndergroundParty[]> {
  const parties = await getUpcomingUndergroundParties();
  return parties.slice(0, limit);
}

export async function getUndergroundPartyBySlug(
  slug: string
): Promise<UndergroundParty | undefined> {
  return withDb(async (db) => {
    const [row] = await db
      .select()
      .from(undergroundParties)
      .where(eq(undergroundParties.slug, slug))
      .limit(1);
    return row ? mapUndergroundParty(row) : undefined;
  }, () => mock.getUndergroundPartyBySlug(slug));
}

export async function getUser(id: string): Promise<User | undefined> {
  return withDb(async (db) => {
    const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!row) return undefined;
    const [reviewCountRow] = await db
      .select({ count: count() })
      .from(reviews)
      .where(eq(reviews.userId, id));
    return mapUser(row, Number(reviewCountRow?.count ?? 0));
  }, () => mock.getUser(id));
}

export async function getReviewFormOptions() {
  const [eventList, venueList, artistList] = await Promise.all([
    getAllEvents(),
    getAllVenues(),
    getAllArtists(),
  ]);
  return { events: eventList, venues: venueList, artists: artistList };
}

export async function getAllEventSlugs(): Promise<string[]> {
  return withDb(
    async (db) => {
      const rows = await db.select({ slug: events.slug }).from(events);
      return rows.map((r) => r.slug);
    },
    () => mock.events.map((e) => e.slug)
  );
}

export async function getAllVenueSlugs(): Promise<string[]> {
  return withDb(
    async (db) => {
      const rows = await db.select({ slug: venues.slug }).from(venues);
      return rows.map((r) => r.slug);
    },
    () => mock.venues.map((v) => v.slug)
  );
}

export async function getAllArtistSlugs(): Promise<string[]> {
  return withDb(
    async (db) => {
      const rows = await db.select({ slug: artists.slug }).from(artists);
      return rows.map((r) => r.slug);
    },
    () => mock.artists.map((a) => a.slug)
  );
}

export async function getAllUndergroundSlugs(): Promise<string[]> {
  return withDb(
    async (db) => {
      const rows = await db.select({ slug: undergroundParties.slug }).from(undergroundParties);
      return rows.map((r) => r.slug);
    },
    () => mock.undergroundParties.map((p) => p.slug)
  );
}

export function databaseStatus() {
  return {
    configured: isDatabaseConfigured(),
  };
}
