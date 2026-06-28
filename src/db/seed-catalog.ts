import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { closeDb, getDb } from "./index";
import {
  catalogArtists,
  catalogEvents,
  catalogVenues,
} from "./catalog";
import { artists, eventArtists, events, users, venues } from "./schema";

async function seedCatalog() {
  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  console.log("Seeding starter catalog...");

  await db
    .insert(users)
    .values({
      id: "u-guest",
      username: "guest",
      displayName: "Guest",
      avatarUrl: "",
      bio: null,
      joinedAt: new Date().toISOString().slice(0, 10),
    })
    .onConflictDoNothing();

  await db
    .insert(venues)
    .values(catalogVenues.map((v) => ({ ...v, tags: [...v.tags] })))
    .onConflictDoNothing();
  await db
    .insert(artists)
    .values(catalogArtists.map((a) => ({ ...a, genre: [...a.genre] })))
    .onConflictDoNothing();
  await db
    .insert(events)
    .values(
      catalogEvents.map(({ artistIds, ...event }) => ({
        ...event,
        genre: [...event.genre],
      }))
    )
    .onConflictDoNothing();

  const links = catalogEvents.flatMap((e) =>
    e.artistIds.map((artistId) => ({ eventId: e.id, artistId }))
  );
  if (links.length > 0) {
    await db.insert(eventArtists).values(links).onConflictDoNothing();
  }

  console.log(
    `Done. ${catalogVenues.length} venues, ${catalogArtists.length} artists, ${catalogEvents.length} events.`
  );

  await closeDb();
}

seedCatalog().catch(async (err) => {
  console.error(err);
  await closeDb();
  process.exit(1);
});
