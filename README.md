# Rave Reviews

**Rave Reviews by Overcast Productions** — a social web app for rating clubs, parties, and artists across NYC. Read and write community reviews about venues, events, and DJs before your next night out.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with custom dark neon theme
- **Framer Motion** for page animations
- **Lucide React** icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with trending events, top venues, latest reviews |
| `/events` | Browse NYC parties and club nights |
| `/events/[slug]` | Event detail with community reviews |
| `/venues` | Browse clubs and event spaces |
| `/venues/[slug]` | Venue detail with ratings and reviews |
| `/artists` | Browse DJs and live acts |
| `/artists/[slug]` | Artist profile with reviews |
| `/underground` | Community-submitted underground parties |
| `/underground/[slug]` | Party detail with vague or exact location |
| `/underground/submit` | Submit a party (optional vague location) |
| `/reviews` | Full community review feed |
| `/write-review` | Submit a review (demo UI, no persistence) |
| `/database` | **Database schema wireframe** (not implemented) |

## Database

The database is **wireframed only** — see `/database` for the full ERD, table definitions, and planned backend stack. The app uses mock data from `src/lib/mock-data.ts`.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components (layout, cards, ratings)
└── lib/              # Types, mock data, utilities
```

---

Built with love for the NYC dance floor. **Overcast Productions** © 2025
