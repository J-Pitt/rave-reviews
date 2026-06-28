import type { Metadata } from "next";
import { AddListingForm } from "./AddListingForm";
import { databaseStatus, getReviewFormOptions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Add Listing",
  description: "Add a venue, artist, or event to the Rave Reviews catalog.",
};

type ListingType = "venue" | "artist" | "event";

function parseListingType(value: string | undefined): ListingType {
  if (value === "venue" || value === "artist" || value === "event") return value;
  return "venue";
}

export default async function AddListingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const [{ venues, artists }, { configured }] = await Promise.all([
    getReviewFormOptions(),
    Promise.resolve(databaseStatus()),
  ]);

  return (
    <AddListingForm
      initialType={parseListingType(params.type)}
      venues={venues}
      artists={artists}
      databaseConfigured={configured}
    />
  );
}
