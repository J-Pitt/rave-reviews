import type { Metadata } from "next";
import { WriteReviewForm } from "./WriteReviewForm";
import { databaseStatus, getReviewFormOptions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Write a Review",
  description: "Post your review of a NYC club night, party, or set.",
};

export default async function WriteReviewPage() {
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
    />
  );
}
