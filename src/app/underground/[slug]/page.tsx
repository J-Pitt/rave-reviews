import type { Metadata } from "next";
import Image from "next/image";
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
import { Calendar, Clock, DollarSign, Music, User } from "lucide-react";

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
    <div>
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <Image
          src={party.imageUrl}
          alt={party.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 -mt-24 relative sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="accent">Underground</Badge>
          {party.genre.map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl max-w-3xl">
          {party.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            {formatDate(party.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            {party.startTime}
            {party.endTime && ` – ${party.endTime}`}
          </span>
          {party.ticketInfo && (
            <span className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-accent" />
              {party.ticketInfo}
            </span>
          )}
        </div>

        {submitter && (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <User className="h-4 w-4 text-accent" />
            Submitted by {submitter.displayName}
          </p>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-lg font-semibold mb-3">About</h2>
              <p className="text-muted leading-relaxed">{party.description}</p>
            </section>

            {party.lineup.length > 0 && (
              <section>
                <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Music className="h-4 w-4 text-accent" />
                  Lineup
                </h2>
                <ul className="space-y-2">
                  {party.lineup.map((artist) => (
                    <li
                      key={artist}
                      className="glass rounded-xl px-4 py-3 text-sm"
                    >
                      {artist}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="space-y-4">
            <PartyLocation party={party} variant="card" />

            <Button href="/write-review" className="w-full">
              Review This Party
            </Button>
            <Button variant="secondary" href="/underground/submit" className="w-full">
              Submit Your Own
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
