import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="panel rounded-lg px-6 py-12 text-center">
      <p className="text-sm text-muted">{message}</p>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="secondary" className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
