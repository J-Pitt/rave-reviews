import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { getAllEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse and review NYC club nights and parties.",
};

export default async function EventsPage() {
  const sorted = await getAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Events</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Every party, club night, and warehouse rave worth talking about in NYC.
          Read reviews, compare ratings, and find your next night out.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
