import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __raveReviewsDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
  var __raveReviewsSql: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  const sql = postgres(url, {
    ssl: process.env.DATABASE_SSL === "false" ? false : "require",
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  return { sql, db: drizzle(sql, { schema }) };
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!global.__raveReviewsDb) {
    const client = createClient();
    if (!client) return null;
    global.__raveReviewsSql = client.sql;
    global.__raveReviewsDb = client.db;
  }

  return global.__raveReviewsDb;
}

export async function closeDb() {
  if (global.__raveReviewsSql) {
    await global.__raveReviewsSql.end();
    global.__raveReviewsSql = undefined;
    global.__raveReviewsDb = undefined;
  }
}

export { schema };
