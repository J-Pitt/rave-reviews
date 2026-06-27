"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { InteractiveStarRating } from "@/components/ui/StarRating";
import { createReview } from "@/lib/actions";
import type { Artist, Event, Venue } from "@/lib/types";
import { cn } from "@/lib/utils";

type ReviewType = "event" | "venue" | "artist";

interface WriteReviewFormProps {
  events: Event[];
  venues: Venue[];
  artists: Artist[];
  databaseConfigured: boolean;
}

export function WriteReviewForm({
  events,
  venues,
  artists,
  databaseConfigured,
}: WriteReviewFormProps) {
  const [reviewType, setReviewType] = useState<ReviewType>("event");
  const [targetId, setTargetId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [overall, setOverall] = useState(0);
  const [sound, setSound] = useState(0);
  const [vibe, setVibe] = useState(0);
  const [crowd, setCrowd] = useState(0);
  const [value, setValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const targets =
    reviewType === "event"
      ? events.map((e) => ({ id: e.id, label: e.title }))
      : reviewType === "venue"
        ? venues.map((v) => ({ id: v.id, label: v.name }))
        : artists.map((a) => ({ id: a.id, label: a.name }));

  function resetForm() {
    setSubmitted(false);
    setTitle("");
    setBody("");
    setOverall(0);
    setSound(0);
    setVibe(0);
    setCrowd(0);
    setValue(0);
    setTargetId("");
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
      const result = await createReview({
        reviewType,
        targetId,
        title,
        body,
        overallRating: overall,
        soundRating: sound || undefined,
        vibeRating: vibe || undefined,
        crowdRating: crowd || undefined,
        valueRating: value || undefined,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="panel rounded-lg p-10">
          <h1 className="text-xl font-semibold">Saved</h1>
          <p className="mt-2 text-sm text-muted">Your review is up.</p>
          <Button variant="secondary" className="mt-6" onClick={resetForm}>
            Write another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Write a review</h1>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Short and honest is fine. Mention sound, door, crowd — whatever mattered
        to you.
      </p>

      {!databaseConfigured && (
        <p className="mt-4 rounded-md border border-border px-4 py-3 text-sm text-muted">
          DATABASE_URL is not set — reviews cannot be saved yet.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="panel rounded-lg p-5 space-y-4">
          <label className="block text-sm font-medium">Reviewing</label>
          <div className="flex flex-wrap gap-2">
            {(["event", "venue", "artist"] as ReviewType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setReviewType(type);
                  setTargetId("");
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm capitalize transition-colors",
                  reviewType === type
                    ? "bg-foreground text-background"
                    : "panel text-muted hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
          >
            <option value="">Pick a {reviewType}…</option>
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="panel rounded-lg p-5 space-y-4">
          <label className="block text-sm font-medium">Ratings</label>
          <div className="space-y-3">
            {[
              { label: "Overall", value: overall, set: setOverall },
              { label: "Sound", value: sound, set: setSound },
              { label: "Vibe", value: vibe, set: setVibe },
              { label: "Crowd", value: crowd, set: setCrowd },
              { label: "Value", value: value, set: setValue },
            ].map(({ label, value, set }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-muted">{label}</span>
                <InteractiveStarRating value={value} onChange={set} />
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-lg p-5 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. worth the $40, sound was rough"
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              Review
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="What happened?"
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? "Saving…" : "Post review"}
        </Button>
      </form>
    </div>
  );
}
