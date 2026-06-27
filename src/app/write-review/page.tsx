"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InteractiveStarRating } from "@/components/ui/StarRating";
import { artists, events, venues } from "@/lib/mock-data";
import { CheckCircle2, PenLine } from "lucide-react";

type ReviewType = "event" | "venue" | "artist";

export default function WriteReviewPage() {
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

  const targets =
    reviewType === "event"
      ? events.map((e) => ({ id: e.id, label: e.title }))
      : reviewType === "venue"
        ? venues.map((v) => ({ id: v.id, label: v.name }))
        : artists.map((a) => ({ id: a.id, label: a.name }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="glass-elevated rounded-3xl p-10 glow-accent">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success mb-4" />
          <h1 className="font-display text-2xl font-bold">Review Submitted!</h1>
          <p className="mt-3 text-muted text-sm leading-relaxed">
            Thanks for sharing your experience. In production, this would be saved
            to the database and visible to the community.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setTitle("");
              setBody("");
              setOverall(0);
              setSound(0);
              setVibe(0);
              setCrowd(0);
              setValue(0);
              setTargetId("");
            }}
          >
            Write Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-2">
        <PenLine className="h-5 w-5 text-accent" />
        <h1 className="font-display text-3xl font-bold">Write a Review</h1>
      </div>
      <p className="text-muted text-sm leading-relaxed">
        Share your experience at a club, party, or with an artist. Help the
        community know what to expect.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="glass-elevated rounded-2xl p-6 space-y-4">
          <label className="block text-sm font-medium">What are you reviewing?</label>
          <div className="flex flex-wrap gap-2">
            {(["event", "venue", "artist"] as ReviewType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setReviewType(type);
                  setTargetId("");
                }}
                className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition-all ${
                  reviewType === type
                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                    : "glass text-muted hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Select a {reviewType}...</option>
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-elevated rounded-2xl p-6 space-y-4">
          <label className="block text-sm font-medium">Ratings</label>

          <div className="space-y-4">
            {[
              { label: "Overall", value: overall, set: setOverall },
              { label: "Sound Quality", value: sound, set: setSound },
              { label: "Vibe / Atmosphere", value: vibe, set: setVibe },
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

        <div className="glass-elevated rounded-2xl p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Review Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Summarize your experience in one line"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="Tell the community about the sound, crowd, logistics, peak moments..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm resize-none focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (optional)</label>
            <div className="flex flex-wrap gap-2">
              {["Peak Time", "Sound Quality", "Crowd", "Value", "Logistics", "Sunrise Set"].map(
                (tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:border-accent/50">
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Publish Review
        </Button>

        <p className="text-xs text-center text-muted">
          Demo mode — reviews are not persisted. See the{" "}
          <a href="/database" className="text-accent hover:underline">
            database schema
          </a>{" "}
          for the planned data model.
        </p>
      </form>
    </div>
  );
}
