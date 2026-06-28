import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getAllEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description: "NYC club nights and parties.",
};

export default async function EventsPage() {
  const sorted = await getAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold">Events</h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Listed parties and club nights. Check reviews before you go.
          </p>
        </div>
        <Button href="/add-listing?type=event" variant="secondary" size="sm">
          Add event
        </Button>
      </div>

      {sorted.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            message="No events listed yet."
            actionLabel="Add an event"
            actionHref="/add-listing?type=event"
          />
        </div>
      )}
    </div>
  );
}
