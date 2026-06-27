import type { Metadata } from "next";
import { VenueCard } from "@/components/venues/VenueCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllVenues } from "@/lib/data";

export const metadata: Metadata = {
  title: "Venues",
  description: "NYC clubs and event spaces.",
};

export default async function VenuesPage() {
  const sorted = await getAllVenues();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">Venues</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Clubs and spaces across the boroughs.
        </p>
      </div>

      {sorted.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState message="No venues listed yet." />
        </div>
      )}
    </div>
  );
}
