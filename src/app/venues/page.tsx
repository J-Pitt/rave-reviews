import type { Metadata } from "next";
import { VenueCard } from "@/components/venues/VenueCard";
import { getAllVenues } from "@/lib/data";

export const metadata: Metadata = {
  title: "Venues",
  description: "Discover and review NYC clubs and event spaces.",
};

export default async function VenuesPage() {
  const sorted = await getAllVenues();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Venues</h1>
        <p className="mt-3 text-muted leading-relaxed">
          From iconic Brooklyn clubs to hidden Ridgewood warehouses — rate the
          sound, the vibe, and the crowd at NYC&apos;s best spaces.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
