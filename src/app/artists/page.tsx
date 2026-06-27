import type { Metadata } from "next";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllArtists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artists",
  description: "DJs and artists playing in NYC.",
};

export default async function ArtistsPage() {
  const sorted = await getAllArtists();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">Artists</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          DJs and live acts — rated by people who saw them play.
        </p>
      </div>

      {sorted.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState message="No artists listed yet." />
        </div>
      )}
    </div>
  );
}
