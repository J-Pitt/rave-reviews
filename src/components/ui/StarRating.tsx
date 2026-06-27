"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, i) => {
          const filled = rating >= i + 1;
          const partial = !filled && rating > i && rating < i + 1;

          return (
            <Star
              key={i}
              className={cn(
                sizeMap[size],
                filled
                  ? "fill-warning text-warning"
                  : partial
                    ? "fill-warning/50 text-warning/50"
                    : "fill-muted/20 text-muted/30"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

interface InteractiveStarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
}

export function InteractiveStarRating({
  value,
  onChange,
  size = "lg",
}: InteractiveStarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label={`Rate ${i + 1} stars`}
        >
          <Star
            className={cn(
              sizeMap[size],
              value >= i + 1
                ? "fill-warning text-warning"
                : "fill-muted/20 text-muted/30 hover:fill-warning/30 hover:text-warning/30"
            )}
          />
        </button>
      ))}
    </div>
  );
}
