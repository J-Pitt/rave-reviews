import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const undergroundStatusEnum = pgEnum("underground_status", [
  "pending",
  "approved",
  "expired",
]);

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  avatarUrl: text("avatar_url").notNull(),
  bio: text("bio"),
  joinedAt: date("joined_at").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const venues = pgTable("venues", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  neighborhood: varchar("neighborhood", { length: 100 }).notNull(),
  borough: varchar("borough", { length: 50 }).notNull(),
  address: text("address").notNull(),
  imageUrl: text("image_url").notNull(),
  capacity: integer("capacity"),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const artists = pgTable("artists", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  genre: text("genre").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  bio: text("bio").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  date: date("date").notNull(),
  venueId: varchar("venue_id", { length: 36 })
    .notNull()
    .references(() => venues.id),
  imageUrl: text("image_url").notNull(),
  genre: text("genre").array().notNull().default([]),
  ticketPrice: varchar("ticket_price", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const eventArtists = pgTable(
  "event_artists",
  {
    eventId: varchar("event_id", { length: 36 })
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    artistId: varchar("artist_id", { length: 36 })
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.eventId, table.artistId] })]
);

export const reviews = pgTable("reviews", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id),
  eventId: varchar("event_id", { length: 36 }).references(() => events.id),
  venueId: varchar("venue_id", { length: 36 }).references(() => venues.id),
  artistId: varchar("artist_id", { length: 36 }).references(() => artists.id),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body").notNull(),
  overallRating: smallint("overall_rating").notNull(),
  soundRating: smallint("sound_rating"),
  vibeRating: smallint("vibe_rating"),
  crowdRating: smallint("crowd_rating"),
  valueRating: smallint("value_rating"),
  helpfulCount: integer("helpful_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const reviewTags = pgTable(
  "review_tags",
  {
    reviewId: varchar("review_id", { length: 36 })
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
    tag: varchar("tag", { length: 50 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.reviewId, table.tag] })]
);

export const undergroundParties = pgTable("underground_parties", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  submittedByUserId: varchar("submitted_by", { length: 36 })
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description").notNull(),
  date: date("date").notNull(),
  startTime: varchar("start_time", { length: 10 }).notNull(),
  endTime: varchar("end_time", { length: 10 }),
  genre: text("genre").array().notNull().default([]),
  lineup: text("lineup").array().notNull().default([]),
  locationVague: boolean("location_vague").notNull().default(true),
  vagueArea: varchar("vague_area", { length: 150 }),
  locationHint: text("location_hint"),
  address: text("address"),
  venueName: varchar("venue_name", { length: 200 }),
  neighborhood: varchar("neighborhood", { length: 100 }),
  borough: varchar("borough", { length: 50 }).notNull(),
  ticketInfo: varchar("ticket_info", { length: 200 }),
  status: undergroundStatusEnum("status").notNull().default("pending"),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DbUser = typeof users.$inferSelect;
export type DbVenue = typeof venues.$inferSelect;
export type DbArtist = typeof artists.$inferSelect;
export type DbEvent = typeof events.$inferSelect;
export type DbReview = typeof reviews.$inferSelect;
export type DbUndergroundParty = typeof undergroundParties.$inferSelect;
