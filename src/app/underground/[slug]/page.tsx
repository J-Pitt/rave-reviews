import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartyLocation } from "@/components/underground/PartyLocation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  getAllUndergroundSlugs,
  getUndergroundPartyBySlug,
  getUser,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, DollarSign, Music } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllUndergroundSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const party = await getUndergroundPartyBySlug(slug);
  if (!party) return { title: "Party Not Found" };
  return { title: party.title, description: party.description };
}

export default async function UndergroundDetailPage({ params }: Props) {
  const { slug } = await params;
  const party = await getUndergroundPartyBySlug(slug);
  if (!party) notFound();

  const submitter = await getUser(party.submittedByUserId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {party.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{party.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(party.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {party.startTime}
            {party.endTime && ` – ${party.endTime}`}
          </span>
          {party.ticketInfo && (
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              {party.ticketInfo}
            </span>
          )}
        </div>

        {submitter && (
          <p className="mt-3 text-xs text-muted">Posted by {submitter.displayName}</p>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3 max-w-5xl">
        <div className="lg:col-span-2 space-y-8">
          {party.description && (
            <section>
              <h2 className="text-sm font-medium mb-2">Details</h2>
              <p className="text-sm text-muted leading-relaxed">{party.description}</p>
            </section>
          )}

          {party.lineup.length > 0 && (
            <section>
              <h2 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <Music className="h-3.5 w-3.5" />
                Lineup
              </h2>
              <ul className="space-y-1.5">
                {party.lineup.map((artist) => (
                  <li key={artist} className="panel rounded-md px-3 py-2 text-sm">
                    {artist}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-3">
          <PartyLocation party={party} variant="card" />
          <Button href="/underground/submit" variant="secondary" className="w-full">
            Submit a party
          </Button>
        </div>
      </div>
    </div>
  );
}
