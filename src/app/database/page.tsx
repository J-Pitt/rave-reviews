import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Database, GitBranch, Key, Link2, Table2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Database Schema",
  description: "Wireframe database schema for Rave Reviews.",
};

const entities = [
  {
    name: "users",
    icon: Key,
    color: "text-accent",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "email", type: "VARCHAR(255)", unique: true },
      { name: "username", type: "VARCHAR(50)", unique: true },
      { name: "display_name", type: "VARCHAR(100)" },
      { name: "avatar_url", type: "TEXT" },
      { name: "bio", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "venues",
    icon: Table2,
    color: "text-accent-secondary",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "slug", type: "VARCHAR(100)", unique: true },
      { name: "name", type: "VARCHAR(200)" },
      { name: "neighborhood", type: "VARCHAR(100)" },
      { name: "borough", type: "VARCHAR(50)" },
      { name: "address", type: "TEXT" },
      { name: "capacity", type: "INTEGER" },
      { name: "image_url", type: "TEXT" },
      { name: "tags", type: "TEXT[]" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "artists",
    icon: Table2,
    color: "text-accent-tertiary",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "slug", type: "VARCHAR(100)", unique: true },
      { name: "name", type: "VARCHAR(200)" },
      { name: "genre", type: "TEXT[]" },
      { name: "bio", type: "TEXT" },
      { name: "image_url", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "events",
    icon: Table2,
    color: "text-warning",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "slug", type: "VARCHAR(150)", unique: true },
      { name: "title", type: "VARCHAR(300)" },
      { name: "date", type: "DATE" },
      { name: "venue_id", type: "UUID", fk: "venues.id" },
      { name: "image_url", type: "TEXT" },
      { name: "genre", type: "TEXT[]" },
      { name: "ticket_price", type: "VARCHAR(50)" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "event_artists",
    icon: Link2,
    color: "text-success",
    fields: [
      { name: "event_id", type: "UUID", fk: "events.id", pk: true },
      { name: "artist_id", type: "UUID", fk: "artists.id", pk: true },
    ],
  },
  {
    name: "reviews",
    icon: Table2,
    color: "text-accent",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "user_id", type: "UUID", fk: "users.id" },
      { name: "event_id", type: "UUID", fk: "events.id", nullable: true },
      { name: "venue_id", type: "UUID", fk: "venues.id", nullable: true },
      { name: "artist_id", type: "UUID", fk: "artists.id", nullable: true },
      { name: "title", type: "VARCHAR(200)" },
      { name: "body", type: "TEXT" },
      { name: "overall_rating", type: "SMALLINT", check: "1-5" },
      { name: "sound_rating", type: "SMALLINT", check: "1-5" },
      { name: "vibe_rating", type: "SMALLINT", check: "1-5" },
      { name: "crowd_rating", type: "SMALLINT", check: "1-5" },
      { name: "value_rating", type: "SMALLINT", check: "1-5" },
      { name: "helpful_count", type: "INTEGER", default: "0" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "review_tags",
    icon: Link2,
    color: "text-muted",
    fields: [
      { name: "review_id", type: "UUID", fk: "reviews.id", pk: true },
      { name: "tag", type: "VARCHAR(50)", pk: true },
    ],
  },
  {
    name: "review_votes",
    icon: Link2,
    color: "text-muted",
    fields: [
      { name: "user_id", type: "UUID", fk: "users.id", pk: true },
      { name: "review_id", type: "UUID", fk: "reviews.id", pk: true },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "review_photos",
    icon: Link2,
    color: "text-muted",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "review_id", type: "UUID", fk: "reviews.id" },
      { name: "url", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
  {
    name: "underground_parties",
    icon: Table2,
    color: "text-accent-secondary",
    fields: [
      { name: "id", type: "UUID", pk: true },
      { name: "slug", type: "VARCHAR(150)", unique: true },
      { name: "submitted_by", type: "UUID", fk: "users.id" },
      { name: "title", type: "VARCHAR(300)" },
      { name: "description", type: "TEXT" },
      { name: "date", type: "DATE" },
      { name: "start_time", type: "TIME" },
      { name: "end_time", type: "TIME", nullable: true },
      { name: "genre", type: "TEXT[]" },
      { name: "lineup", type: "TEXT[]" },
      { name: "location_vague", type: "BOOLEAN", default: "true" },
      { name: "vague_area", type: "VARCHAR(150)", nullable: true },
      { name: "location_hint", type: "TEXT", nullable: true },
      { name: "address", type: "TEXT", nullable: true },
      { name: "venue_name", type: "VARCHAR(200)", nullable: true },
      { name: "neighborhood", type: "VARCHAR(100)", nullable: true },
      { name: "borough", type: "VARCHAR(50)" },
      { name: "ticket_info", type: "VARCHAR(200)", nullable: true },
      { name: "status", type: "VARCHAR(20)", check: "pending|approved|expired" },
      { name: "image_url", type: "TEXT", nullable: true },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
  },
];

const relationships = [
  { from: "users", to: "reviews", label: "1 → many", desc: "A user writes many reviews" },
  { from: "venues", to: "events", label: "1 → many", desc: "A venue hosts many events" },
  { from: "events", to: "event_artists", label: "many ↔ many", desc: "Events feature multiple artists" },
  { from: "artists", to: "event_artists", label: "many ↔ many", desc: "Artists play at many events" },
  { from: "reviews", to: "events", label: "many → 1", desc: "Review optionally targets an event" },
  { from: "reviews", to: "venues", label: "many → 1", desc: "Review optionally targets a venue" },
  { from: "reviews", to: "artists", label: "many → 1", desc: "Review optionally targets an artist" },
  { from: "reviews", to: "review_tags", label: "1 → many", desc: "Reviews have searchable tags" },
  { from: "users", to: "review_votes", label: "many ↔ many", desc: "Users mark reviews as helpful" },
  { from: "users", to: "underground_parties", label: "1 → many", desc: "Users submit underground party listings" },
];

export default function DatabasePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-6 w-6 text-accent" />
          <Badge variant="accent">Drizzle + AWS RDS</Badge>
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Database Schema
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          PostgreSQL schema for Rave Reviews, connected via Drizzle ORM to AWS RDS
          when <code className="text-accent text-sm">DATABASE_URL</code> is set.
          Without it, the app uses mock data from{" "}
          <code className="text-accent text-sm">src/lib/mock-data.ts</code>.
        </p>
      </div>

      {/* ERD Diagram */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-accent" />
          Entity Relationship Diagram
        </h2>
        <div className="glass-elevated rounded-3xl p-6 sm:p-10 overflow-x-auto">
          <pre className="text-xs sm:text-sm text-muted font-mono leading-relaxed whitespace-pre">
{`┌─────────────┐       ┌─────────────┐       ┌──────────────┐
│    users    │       │   venues    │       │   artists    │
├─────────────┤       ├─────────────┤       ├──────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)      │
│ email       │       │ slug        │       │ slug         │
│ username    │       │ name        │       │ name         │
│ display_name│       │ neighborhood│       │ genre[]      │
│ avatar_url  │       │ borough     │       │ bio          │
└──────┬──────┘       └──────┬──────┘       └──────┬───────┘
       │                     │                      │
       │ 1                   │ 1                    │ M
       │                     │                      │
       ▼ M                   ▼ M              ┌──────┴───────┐
┌─────────────┐       ┌─────────────┐       │ event_artists│
│   reviews   │◄──────│   events    │──────►│ (junction)   │
├─────────────┤  M:1  ├─────────────┤  M:M  ├──────────────┤
│ id (PK)     │       │ id (PK)     │       │ event_id(FK) │
│ user_id(FK) │       │ venue_id(FK)│       │ artist_id(FK)│
│ event_id(FK)│       │ title       │       └──────────────┘
│ venue_id(FK)│       │ date        │
│ artist_id   │       │ genre[]     │
│ title       │       └─────────────┘
│ body        │
│ ratings...  │       ┌─────────────┐  ┌──────────────┐
└──────┬──────┘       │ review_tags │  │ review_votes │
       │              ├─────────────┤  ├──────────────┤
       ├─────────────►│ review_id   │  │ user_id (FK) │
       │              │ tag         │  │ review_id(FK)│
       │              └─────────────┘  └──────────────┘
       │
       └─────────────► review_photos (id, review_id, url)

┌─────────────────────┐
│ underground_parties │
├─────────────────────┤
│ id (PK)             │
│ submitted_by (FK)───┼──► users
│ location_vague      │     (when true: vague_area + borough only)
│ vague_area          │     (when false: address + venue_name)
│ address             │
│ status              │     pending → approved → expired
└─────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Entity Cards */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
          <Table2 className="h-5 w-5 text-accent" />
          Tables & Fields
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity) => (
            <div
              key={entity.name}
              className="glass-elevated rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <entity.icon className={`h-4 w-4 ${entity.color}`} />
                <span className="font-mono text-sm font-semibold">{entity.name}</span>
              </div>
              <div className="p-4 space-y-1.5">
                {entity.fields.map((field) => (
                  <div
                    key={field.name}
                    className="flex items-center justify-between text-xs font-mono"
                  >
                    <span className="flex items-center gap-1.5">
                      {"pk" in field && field.pk && (
                        <Badge variant="accent" className="text-[9px] px-1 py-0">
                          PK
                        </Badge>
                      )}
                      {"fk" in field && field.fk && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0">
                          FK
                        </Badge>
                      )}
                      <span className="text-foreground">{field.name}</span>
                    </span>
                    <span className="text-muted">{field.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relationships */}
      <section className="mt-12 pb-8">
        <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-accent" />
          Relationships
        </h2>
        <div className="space-y-3">
          {relationships.map((rel) => (
            <div
              key={`${rel.from}-${rel.to}`}
              className="glass rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
            >
              <div className="flex items-center gap-2 font-mono text-sm shrink-0">
                <span className="text-accent">{rel.from}</span>
                <span className="text-muted">→</span>
                <span className="text-accent-secondary">{rel.to}</span>
                <Badge variant="outline">{rel.label}</Badge>
              </div>
              <span className="text-sm text-muted">{rel.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Planned stack */}
      <section className="mt-8">
        <div className="glass-elevated rounded-2xl p-6 border border-accent/20">
          <h3 className="font-display font-semibold mb-3">Connected Stack</h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted">
            <div>
              <p className="font-medium text-foreground mb-1">Database</p>
              <p>AWS RDS / Aurora PostgreSQL</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">ORM</p>
              <p>Drizzle ORM — run npm run db:push to sync</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Auth</p>
              <p>Guest user for now (u-guest) — add NextAuth/Clerk later</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">API</p>
              <p>Next.js Server Actions in src/lib/actions.ts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
