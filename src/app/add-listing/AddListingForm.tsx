"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { createArtist, createEvent, createVenue } from "@/lib/actions";
import type { Artist, Venue } from "@/lib/types";
import { NYC_BOROUGHS, UNDERGROUND_GENRES } from "@/lib/underground";
import { cn } from "@/lib/utils";

type ListingType = "venue" | "artist" | "event";

interface AddListingFormProps {
  initialType: ListingType;
  venues: Venue[];
  artists: Artist[];
  databaseConfigured: boolean;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20";

export function AddListingForm({
  initialType,
  venues,
  artists,
  databaseConfigured,
}: AddListingFormProps) {
  const [listingType, setListingType] = useState<ListingType>(initialType);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<{
    type: ListingType;
    id: string;
    slug: string;
    label: string;
  } | null>(null);

  const [venueName, setVenueName] = useState("");
  const [venueNeighborhood, setVenueNeighborhood] = useState("");
  const [venueBorough, setVenueBorough] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueTags, setVenueTags] = useState<string[]>([]);

  const [artistName, setArtistName] = useState("");
  const [artistGenres, setArtistGenres] = useState<string[]>([]);
  const [artistBio, setArtistBio] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenueId, setEventVenueId] = useState("");
  const [eventArtistIds, setEventArtistIds] = useState<string[]>([]);
  const [eventGenres, setEventGenres] = useState<string[]>([]);
  const [eventTicketPrice, setEventTicketPrice] = useState("");

  function toggleTag(list: string[], value: string, set: (next: string[]) => void) {
    set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function toggleArtistId(artistId: string) {
    setEventArtistIds((prev) =>
      prev.includes(artistId) ? prev.filter((id) => id !== artistId) : [...prev, artistId]
    );
  }

  function resetFields(type: ListingType) {
    setError(null);
    setSuccess(null);
    if (type === "venue") {
      setVenueName("");
      setVenueNeighborhood("");
      setVenueBorough("");
      setVenueAddress("");
      setVenueTags([]);
    } else if (type === "artist") {
      setArtistName("");
      setArtistGenres([]);
      setArtistBio("");
    } else {
      setEventTitle("");
      setEventDate("");
      setEventVenueId("");
      setEventArtistIds([]);
      setEventGenres([]);
      setEventTicketPrice("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!databaseConfigured) {
      setError("Database is not configured. Add DATABASE_URL to .env.local.");
      return;
    }

    startTransition(async () => {
      if (listingType === "venue") {
        const result = await createVenue({
          name: venueName,
          neighborhood: venueNeighborhood,
          borough: venueBorough,
          address: venueAddress,
          tags: venueTags,
        });
        if (result.success) {
          setSuccess({
            type: "venue",
            id: result.id,
            slug: result.slug ?? "",
            label: venueName.trim(),
          });
        } else {
          setError(result.error);
        }
        return;
      }

      if (listingType === "artist") {
        const result = await createArtist({
          name: artistName,
          genre: artistGenres,
          bio: artistBio,
        });
        if (result.success) {
          setSuccess({
            type: "artist",
            id: result.id,
            slug: result.slug ?? "",
            label: artistName.trim(),
          });
        } else {
          setError(result.error);
        }
        return;
      }

      const result = await createEvent({
        title: eventTitle,
        date: eventDate,
        venueId: eventVenueId,
        artistIds: eventArtistIds,
        genre: eventGenres,
        ticketPrice: eventTicketPrice || undefined,
      });
      if (result.success) {
        setSuccess({
          type: "event",
          id: result.id,
          slug: result.slug ?? "",
          label: eventTitle.trim(),
        });
      } else {
        setError(result.error);
      }
    });
  }

  if (success) {
    const detailPath =
      success.type === "venue"
        ? `/venues/${success.slug}`
        : success.type === "artist"
          ? `/artists/${success.slug}`
          : `/events/${success.slug}`;

    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="panel rounded-lg p-10">
          <h1 className="text-xl font-semibold">Added</h1>
          <p className="mt-2 text-sm text-muted">
            <span className="text-foreground">{success.label}</span> is in the catalog.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button href={detailPath}>View listing</Button>
            <Button
              href={`/write-review?type=${success.type}&id=${success.id}`}
              variant="secondary"
            >
              Write a review
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                resetFields(listingType);
              }}
            >
              Add another {listingType}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Add a listing</h1>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Build the catalog — venues, artists, and events anyone can review.
      </p>

      {!databaseConfigured && (
        <p className="mt-4 rounded-md border border-border px-4 py-3 text-sm text-muted">
          DATABASE_URL is not set — listings cannot be saved yet.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="panel rounded-lg p-5 space-y-4">
          <label className="block text-sm font-medium">What are you adding?</label>
          <div className="flex flex-wrap gap-2">
            {(["venue", "artist", "event"] as ListingType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setListingType(type);
                  setError(null);
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm capitalize transition-colors",
                  listingType === type
                    ? "bg-foreground text-background"
                    : "panel text-muted hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {listingType === "venue" && (
          <div className="panel rounded-lg p-5 space-y-4">
            <label className="block text-sm font-medium">Venue</label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              required
              placeholder="Name — e.g. Nowadays"
              className={inputClass}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={venueNeighborhood}
                onChange={(e) => setVenueNeighborhood(e.target.value)}
                required
                placeholder="Neighborhood"
                className={inputClass}
              />
              <select
                value={venueBorough}
                onChange={(e) => setVenueBorough(e.target.value)}
                required
                className={inputClass}
              >
                <option value="">Borough…</option>
                {NYC_BOROUGHS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              placeholder="Address (optional)"
              className={inputClass}
            />
            <div>
              <span className="block text-xs text-muted mb-2">Tags (optional)</span>
              <div className="flex flex-wrap gap-2">
                {UNDERGROUND_GENRES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(venueTags, tag, setVenueTags)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      venueTags.includes(tag)
                        ? "bg-foreground text-background"
                        : "panel text-muted hover:text-foreground"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {listingType === "artist" && (
          <div className="panel rounded-lg p-5 space-y-4">
            <label className="block text-sm font-medium">Artist</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
              placeholder="Name — e.g. DJ Holographic"
              className={inputClass}
            />
            <div>
              <span className="block text-xs text-muted mb-2">Genre (optional)</span>
              <div className="flex flex-wrap gap-2">
                {UNDERGROUND_GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleTag(artistGenres, genre, setArtistGenres)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      artistGenres.includes(genre)
                        ? "bg-foreground text-background"
                        : "panel text-muted hover:text-foreground"
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={artistBio}
              onChange={(e) => setArtistBio(e.target.value)}
              rows={3}
              placeholder="Bio (optional)"
              className={cn(inputClass, "resize-none")}
            />
          </div>
        )}

        {listingType === "event" && (
          <div className="panel rounded-lg p-5 space-y-4">
            <label className="block text-sm font-medium">Event</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
              placeholder="Title — e.g. Nowadays day party"
              className={inputClass}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className={inputClass}
            />
            {venues.length === 0 ? (
              <p className="text-sm text-muted">
                Add a venue first, then come back to list the event.{" "}
                <button
                  type="button"
                  className="text-foreground underline"
                  onClick={() => setListingType("venue")}
                >
                  Add a venue
                </button>
              </p>
            ) : (
              <select
                value={eventVenueId}
                onChange={(e) => setEventVenueId(e.target.value)}
                required
                className={inputClass}
              >
                <option value="">Pick a venue…</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name} — {venue.neighborhood}
                  </option>
                ))}
              </select>
            )}
            {artists.length > 0 && (
              <div>
                <span className="block text-xs text-muted mb-2">Lineup (optional)</span>
                <div className="flex flex-wrap gap-2">
                  {artists.map((artist) => (
                    <button
                      key={artist.id}
                      type="button"
                      onClick={() => toggleArtistId(artist.id)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        eventArtistIds.includes(artist.id)
                          ? "bg-foreground text-background"
                          : "panel text-muted hover:text-foreground"
                      )}
                    >
                      {artist.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <span className="block text-xs text-muted mb-2">Genre (optional)</span>
              <div className="flex flex-wrap gap-2">
                {UNDERGROUND_GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleTag(eventGenres, genre, setEventGenres)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      eventGenres.includes(genre)
                        ? "bg-foreground text-background"
                        : "panel text-muted hover:text-foreground"
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={eventTicketPrice}
              onChange={(e) => setEventTicketPrice(e.target.value)}
              placeholder="Ticket price (optional) — e.g. $25"
              className={inputClass}
            />
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={
            isPending ||
            (listingType === "event" && venues.length === 0)
          }
        >
          {isPending ? "Saving…" : `Add ${listingType}`}
        </Button>

        <p className="text-center text-xs text-muted">
          <Link href="/write-review" className="hover:text-foreground">
            Back to write a review
          </Link>
        </p>
      </form>
    </div>
  );
}
