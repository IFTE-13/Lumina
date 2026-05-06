import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatusPill({
  isHealthy,
  isLoading,
}: {
  isHealthy: boolean;
  isLoading: boolean;
}) {
  return (
    <div
      className={cn(
        'mr-2 flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        isLoading
          ? 'border-border text-muted-foreground'
          : isHealthy
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
      )}
    >
      {isLoading ? (
        <>
          <Activity className="h-3 w-3 animate-pulse" />
          <span>Checking</span>
        </>
      ) : isHealthy ? (
        <>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>Online</span>
        </>
      ) : (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}