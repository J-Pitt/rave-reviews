import type { Metadata } from "next";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllReviews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews of NYC clubs, parties, and DJs.",
};

export default async function ReviewsPage() {
  const sorted = await getAllReviews();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          What people wrote after going out — sound, door, crowd, whether it was
          worth it.
        </p>
      </div>

      {sorted.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sorted.map((review) => (
            <div key={review.id} id={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            message="No reviews yet."
            actionLabel="Write a review"
            actionHref="/write-review"
          />
        </div>
      )}
    </div>
  );
}
