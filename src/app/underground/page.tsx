import type { Metadata } from "next";
import { UndergroundPartyCard } from "@/components/underground/UndergroundPartyCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUpcomingUndergroundParties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Underground",
  description: "Community-submitted underground parties in NYC.",
};

export default async function UndergroundPage() {
  const parties = await getUpcomingUndergroundParties();
  const vagueCount = parties.filter((p) => p.locationVague).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-semibold">Underground</h1>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Word-of-mouth parties submitted here. You can keep the address off
            the public listing if you want.
          </p>
        </div>
        <Button href="/underground/submit" className="shrink-0">
          Submit a party
        </Button>
      </div>

      {parties.length > 0 && (
        <p className="mt-6 text-xs text-muted">
          {parties.length} upcoming
          {vagueCount > 0 && ` · ${vagueCount} with location hidden`}
        </p>
      )}

      {parties.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((party) => (
            <UndergroundPartyCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            message="No parties posted."
            actionLabel="Submit one"
            actionHref="/underground/submit"
          />
        </div>
      )}

      <div className="mt-14 panel max-w-2xl rounded-lg p-6">
        <h2 className="text-sm font-medium">About hidden locations</h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          When you submit, you can show only a neighborhood or borough. Full
          address stays off the listing — share it with guests separately.
        </p>
      </div>
    </div>
  );
}
