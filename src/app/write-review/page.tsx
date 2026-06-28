import type { Metadata } from "next";
import { WriteReviewForm } from "./WriteReviewForm";
import { databaseStatus, getReviewFormOptions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Write a Review",
  description: "Post your review of a NYC club night, party, or set.",
};

type ReviewType = "event" | "venue" | "artist";

function parseReviewType(value: string | undefined): ReviewType {
  if (value === "event" || value === "venue" || value === "artist") return value;
  return "event";
}

export default async function WriteReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; id?: string }>;
}) {
  const params = await searchParams;
  const [{ events, venues, artists }, { configured }] = await Promise.all([
    getReviewFormOptions(),
    Promise.resolve(databaseStatus()),
  ]);

  return (
    <WriteReviewForm
      events={events}
      venues={venues}
      artists={artists}
      databaseConfigured={configured}
      initialReviewType={parseReviewType(params.type)}
      initialTargetId={params.id ?? ""}
    />
  );
}
