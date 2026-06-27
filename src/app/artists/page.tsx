import type { Metadata } from "next";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { artists } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Artists",
  description: "Review and discover DJs and artists playing in NYC.",
};

export default function ArtistsPage() {
  const sorted = [...artists].sort((a, b) => b.averageRating - a.averageRating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Artists</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Rate the selectors, producers, and live acts shaping NYC nightlife.
          From techno titans to local heroes.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
