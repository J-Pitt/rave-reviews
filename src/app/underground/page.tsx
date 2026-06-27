import type { Metadata } from "next";
import { UndergroundPartyCard } from "@/components/underground/UndergroundPartyCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getUpcomingUndergroundParties } from "@/lib/data";
import { EyeOff, Plus, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Underground",
  description: "Community-submitted underground parties across NYC.",
};

export default async function UndergroundPage() {
  const parties = await getUpcomingUndergroundParties();
  const vagueCount = parties.filter((p) => p.locationVague).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="h-5 w-5 text-accent" />
            <Badge variant="accent">Community Submitted</Badge>
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Underground Parties
          </h1>
          <p className="mt-3 text-muted leading-relaxed">
            Word-of-mouth events submitted by the community — warehouse raves,
            loft sessions, rooftop sunrises. Organizers can keep locations vague
            to protect the space.
          </p>
        </div>
        <Button href="/underground/submit" size="lg" className="shrink-0">
          <Plus className="h-4 w-4" />
          Submit a Party
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Badge variant="outline" className="px-3 py-1.5">
          {parties.length} upcoming
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5 gap-1">
          <EyeOff className="h-3 w-3" />
          {vagueCount} with vague location
        </Badge>
      </div>

      {parties.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((party) => (
            <UndergroundPartyCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        <div className="mt-10 glass-elevated rounded-2xl p-12 text-center">
          <p className="text-muted">No upcoming underground parties yet.</p>
          <Button href="/underground/submit" className="mt-4">
            Be the first to submit
          </Button>
        </div>
      )}

      <div className="mt-14 glass-elevated rounded-2xl p-6 sm:p-8 border border-accent/10">
        <h2 className="font-display text-lg font-semibold flex items-center gap-2">
          <EyeOff className="h-4 w-4 text-accent" />
          About vague locations
        </h2>
        <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
          Underground events often need discretion. When submitting, toggle
          &ldquo;Keep location vague&rdquo; to show only a borough or general
          area — exact addresses stay hidden on the public listing. Organizers
          can share pins privately with approved guests.
        </p>
      </div>
    </div>
  );
}
