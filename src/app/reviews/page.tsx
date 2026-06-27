import type { Metadata } from "next";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { getAllReviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read community reviews of NYC clubs, parties, and artists.",
};

export default async function ReviewsPage() {
  const sorted = await getAllReviews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Community Reviews
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          Real experiences from NYC ravers — sound quality, crowd energy, value,
          and everything in between.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {sorted.map((review) => (
          <div key={review.id} id={review.id}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}
