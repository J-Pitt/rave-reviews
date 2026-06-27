import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-white/8 text-muted",
        variant === "accent" &&
          "bg-accent/15 text-accent border border-accent/20",
        variant === "outline" && "border border-border text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
