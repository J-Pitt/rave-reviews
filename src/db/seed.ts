import { config } from "dotenv";
config({ path: ".env.local" });
config();

import "dotenv/config";
import { closeDb, getDb } from "./index";
import {
  artists,
  eventArtists,
  events,
  reviewTags,
  reviews,
  undergroundParties,
  users,
  venues,
} from "./schema";

async function seed() {
  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env.local first.");
    process.exit(1);
  }

  console.log("Clearing all Rave Reviews content...");

  await db.delete(reviewTags);
  await db.delete(reviews);
  await db.delete(eventArtists);
  await db.delete(undergroundParties);
  await db.delete(events);
  await db.delete(artists);
  await db.delete(venues);
  await db.delete(users);

  await db.insert(users).values({
    id: "u-guest",
    username: "guest",
    displayName: "Guest",
    avatarUrl: "",
    bio: null,
    joinedAt: new Date().toISOString().slice(0, 10),
  });

  console.log("Done. All reviews, events, venues, artists, and parties removed.");

  await closeDb();
}

seed().catch(async (err) => {
  console.error(err);
  await closeDb();
  process.exit(1);
});
