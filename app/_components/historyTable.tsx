// src/app/components/historyTable.tsx (updated)
'use client';

import { History, Shield, ShieldAlert, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { HistoryItem } from '@/app/types';
import { formatDate, formatFileSize } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface HistoryTableProps {
  history: HistoryItem[];
  onClearHistory?: () => void;
}

export function HistoryTable({ history, onClearHistory }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <History className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">No analysis history yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Upload a file to see results here
        </p>
      </div>
    );
  }

  const handleClear = () => {
    if (onClearHistory) {
      onClearHistory();
      toast.success('History cleared');
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Recent Analyses</span>
          <Badge variant="secondary" className="ml-2">
            {history.length}
          </Badge>
        </div>
        
        {onClearHistory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-7 gap-1 text-xs"
          >
            <Trash2 className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      <Separator />

      <ScrollArea className="max-h-80 overflow-y-auto">
        <div className="divide-y divide-border">
          {history.map((item) => {
            const isMalicious = item.verdict === 'MALICIOUS';

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 overflow-hidden px-5 py-3.5 transition-colors hover:bg-muted/40"
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border',
                    isMalicious
                      ? 'border-red-500/30 bg-red-500/10'
                      : 'border-emerald-500/30 bg-emerald-500/10'
                  )}
                >
                  {isMalicious ? (
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                  ) : (
                    <Shield className="h-4 w-4 text-emerald-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm">{item.filename}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatDate(new Date(item.timestamp))}
                    <span className="mx-1.5 opacity-40">·</span>
                    {formatFileSize(item.fileSize)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      'font-mono text-xs',
                      isMalicious
                        ? 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    )}
                  >
                    {item.verdict}
                  </Badge>

                  <span className="w-12 text-right font-mono text-xs font-medium">
                    {item.confidence}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}