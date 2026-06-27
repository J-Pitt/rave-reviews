"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { createUndergroundParty } from "@/lib/actions";
import { NYC_BOROUGHS, UNDERGROUND_GENRES } from "@/lib/underground";
import { EyeOff, MapPin } from "lucide-react";
import Link from "next/link";

interface SubmitUndergroundFormProps {
  databaseConfigured: boolean;
}

export function SubmitUndergroundForm({ databaseConfigured }: SubmitUndergroundFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lineup, setLineup] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [ticketInfo, setTicketInfo] = useState("");
  const [locationVague, setLocationVague] = useState(true);
  const [borough, setBorough] = useState("");
  const [vagueArea, setVagueArea] = useState("");
  const [locationHint, setLocationHint] = useState("");
  const [address, setAddress] = useState("");
  const [venueName, setVenueName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  function resetForm() {
    setSubmittedSlug(null);
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLineup("");
    setSelectedGenres([]);
    setTicketInfo("");
    setLocationVague(true);
    setBorough("");
    setVagueArea("");
    setLocationHint("");
    setAddress("");
    setVenueName("");
    setNeighborhood("");
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!databaseConfigured) {
      setError("Database is not configured. Add DATABASE_URL to .env.local.");
      return;
    }

    startTransition(async () => {
      const result = await createUndergroundParty({
        title,
        description,
        date,
        startTime,
        endTime: endTime || undefined,
        lineup,
        genre: selectedGenres,
        ticketInfo,
        locationVague,
        borough,
        vagueArea,
        locationHint,
        address,
        venueName,
        neighborhood,
      });

      if (result.success) {
        setSubmittedSlug(result.slug ?? null);
      } else {
        setError(result.error);
      }
    });
  }

  if (submittedSlug) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="panel rounded-lg p-10">
          <h1 className="text-xl font-semibold">Posted</h1>
          <p className="mt-2 text-sm text-muted">
            Your underground event is live in the database.
            {locationVague && (
              <>
                {" "}
                Location shown as{" "}
                <span className="text-foreground italic">
                  {vagueArea ? `${vagueArea}, ` : ""}
                  {borough}
                </span>
                .
              </>
            )}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button href={`/underground/${submittedSlug}`}>View Listing</Button>
            <Button variant="secondary" onClick={resetForm}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Submit a party</h1>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Post a word-of-mouth event. Address can stay off the listing.
      </p>

      {!databaseConfigured && (
        <p className="mt-4 rounded-md border border-border px-4 py-3 text-sm text-muted">
          DATABASE_URL is not set — submissions cannot be saved yet.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="panel rounded-lg p-6 space-y-4">
          <label className="block text-sm font-medium">Party Details</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Event name"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="What's the plan? Door, music, anything people should know"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm resize-none focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="date" className="block text-xs text-muted mb-1.5">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="start" className="block text-xs text-muted mb-1.5">
                Start
              </label>
              <input
                id="start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="end" className="block text-xs text-muted mb-1.5">
                End (optional)
              </label>
              <input
                id="end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <input
            type="text"
            value={lineup}
            onChange={(e) => setLineup(e.target.value)}
            placeholder="Lineup — comma separated DJs"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />

          <div>
            <span className="block text-xs text-muted mb-2">Genre</span>
            <div className="flex flex-wrap gap-2">
              {UNDERGROUND_GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-foreground text-background"
                      : "panel text-muted hover:text-foreground"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={ticketInfo}
            onChange={(e) => setTicketInfo(e.target.value)}
            placeholder="Tickets — e.g. $20 cash at door, RSVP required"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="panel rounded-lg p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-accent" />
                Location
              </label>
              <p className="mt-1 text-xs text-muted">
                Protect your space by keeping the address off the public listing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLocationVague(!locationVague)}
            className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
              locationVague
                ? "border-accent/40 bg-accent/10"
                : "border-border bg-surface hover:border-border"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                locationVague ? "bg-foreground text-background" : "glass text-muted"
              }`}
            >
              <EyeOff className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Keep location vague</p>
              <p className="text-xs text-muted mt-0.5">
                Show only borough or general area — hide exact address
              </p>
            </div>
            <div
              className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
                locationVague ? "bg-accent" : "bg-white/10"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  locationVague ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </button>

          <select
            value={borough}
            onChange={(e) => setBorough(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Select borough...</option>
            {NYC_BOROUGHS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {locationVague ? (
            <>
              <input
                type="text"
                value={vagueArea}
                onChange={(e) => setVagueArea(e.target.value)}
                required
                placeholder="General area — e.g. East Bushwick, Near Morgan L"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="text"
                value={locationHint}
                onChange={(e) => setLocationHint(e.target.value)}
                placeholder="Optional hint — e.g. Pin shared day-of via IG"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="text-xs text-muted flex items-start gap-2 rounded-lg bg-accent/5 border border-accent/10 p-3">
                <EyeOff className="h-3.5 w-3.5 shrink-0 mt-0.5 text-accent" />
                Public listing will show:{" "}
                <span className="italic text-foreground">
                  {vagueArea || "General area"}, {borough || "Borough"}
                </span>
                . Exact address stays private.
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="Venue or space name (optional)"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Street address"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Neighborhood"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Submit Party"}
        </Button>

        <p className="text-xs text-center text-muted">
          Saved to your AWS PostgreSQL database when configured.{" "}
          <Link href="/database" className="text-accent hover:underline">
            View schema
          </Link>
        </p>
      </form>
    </div>
  );
}
