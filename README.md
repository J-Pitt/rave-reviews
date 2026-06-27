# Rave Reviews

**Rave Reviews by Overcast Productions** — a social web app for rating clubs, parties, and artists across NYC.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Drizzle ORM** + **PostgreSQL** (AWS RDS)
- **Framer Motion**

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your AWS RDS connection string
npm run db:push    # create tables on your Postgres instance
npm run db:seed    # load sample venues, events, reviews
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without `DATABASE_URL`, the app falls back to in-memory mock data (read-only submissions).

## WordSlide shared RDS

Found your existing database in `~/wordslide`:

| Setting | Value |
|---------|-------|
| Endpoint | `dev-wordslide-db.cszqcws8wjsi.us-east-1.rds.amazonaws.com` |
| User | `postgres` |
| WordSlide DB | `wordslide_game` |
| Rave Reviews DB | `rave_reviews` (separate database, same instance) |

**RDS is private** — you can't connect directly from your Mac. Use the SSH tunnel through the WordSlide bastion (`44.201.231.206`, key at `~/wordslide-db-setup.pem`).

Password is in `~/wordslide/aws-infrastructure/setup-database-via-bastion-final.sh` (not the placeholder in `~/wordslide/.env`).

### Setup

**Terminal 1 — tunnel (keep open):**
```bash
./scripts/rds-tunnel.sh
```

**Terminal 2 — create DB, push schema, run app:**
```bash
export WORDSLIDE_DB_PASSWORD='...'   # from bastion script above
./scripts/setup-wordslide-rds.sh
npm run db:push
npm run db:seed
npm run dev
```

`.env.local` is configured for `localhost:5433` through the tunnel.

### Bastion SSH times out?

The bastion EC2 may be stopped or your IP isn't allowed. In AWS Console → **EC2 → Instances**, start the bastion and allow your IP on port 22 in its security group.

## AWS RDS Setup (new instance)

1. **Create a database** on your existing RDS/Aurora PostgreSQL instance:

   ```sql
   CREATE DATABASE rave_reviews;
   CREATE USER rave_app WITH PASSWORD 'your-secure-password';
   GRANT ALL PRIVILEGES ON DATABASE rave_reviews TO rave_app;
   ```

2. **Security group** — allow inbound PostgreSQL (5432) from:
   - Your IP (local dev)
   - Your deployment host (e.g. Vercel IP range or VPC peering)

3. **Connection string** in `.env.local`:

   ```
   DATABASE_URL=postgresql://rave_app:PASSWORD@endpoint.rds.amazonaws.com:5432/rave_reviews?sslmode=require
   ```

4. **Push schema & seed**:

   ```bash
   npm run db:push
   npm run db:seed
   ```

## Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:push` | Push Drizzle schema to Postgres (no migration files) |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:seed` | Seed sample data from mock dataset |
| `npm run db:studio` | Open Drizzle Studio GUI |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/events`, `/venues`, `/artists` | Browse listings (live from DB) |
| `/reviews` | Community review feed |
| `/write-review` | Submit a review (saved to Postgres) |
| `/underground` | Community underground parties |
| `/underground/submit` | Submit a party with optional vague location |
| `/database` | Schema wireframe reference |

## Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # UI components
├── db/            # Drizzle schema, client, seed
└── lib/           # Data layer, server actions, types
```

---

Built for the NYC dance floor. **Overcast Productions**
