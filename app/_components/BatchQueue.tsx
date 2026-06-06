'use client';

import { useState } from 'react';
import { 
  Upload, 
  X, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Trash2,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn, formatFileSize } from '@/lib/utils';
import type { PredictionResponse } from '@/app/types/api';

export interface BatchFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: PredictionResponse;
  error?: string;
}

interface BatchQueueProps {
  files: BatchFile[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
  onProcessBatch: () => void;
  isProcessing: boolean;
  onExportResults: () => void;
}

export function BatchQueue({ 
  files, 
  onRemoveFile, 
  onClearAll, 
  onProcessBatch,
  isProcessing,
  onExportResults
}: BatchQueueProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedCount = files.filter(f => f.status === 'completed').length;
  const failedCount = files.filter(f => f.status === 'failed').length;
  const processingCount = files.filter(f => f.status === 'processing').length;
  const totalCount = files.length;
  
  const getStatusIcon = (status: BatchFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer py-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Batch Queue</CardTitle>
            {totalCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalCount} files
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {totalCount > 0 && !isProcessing && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportResults();
                  }}
                  disabled={completedCount === 0}
                >
                  <Download className="mr-2 h-3 w-3" />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearAll();
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
            
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
        
        {totalCount > 0 && (
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span>✅ Completed: {completedCount}</span>
            <span>❌ Failed: {failedCount}</span>
            <span>⚙️ Processing: {processingCount}</span>
            <span>⏳ Pending: {totalCount - completedCount - failedCount - processingCount}</span>
          </div>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Upload className="mb-3 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Add .exe files to start batch analysis
              </p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-100 pr-4">
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={cn(
                        'rounded-lg border p-3 transition-all',
                        file.status === 'processing' && 'border-blue-500/50 bg-blue-500/5',
                        file.status === 'completed' && 'border-emerald-500/30 bg-emerald-500/5',
                        file.status === 'failed' && 'border-red-500/30 bg-red-500/5'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(file.status)}
                            <p className="truncate text-sm font-medium">
                              {file.file.name}
                            </p>
                          </div>
                          
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatFileSize(file.file.size)}
                          </p>
                          
                          {file.status === 'processing' && (
                            <div className="mt-2">
                              <Progress value={file.progress} className="h-1.5" />
                              <p className="mt-1 text-xs text-muted-foreground">
                                Analyzing... {file.progress}%
                              </p>
                            </div>
                          )}
                          
                          {file.status === 'completed' && file.result && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    file.result.verdict === 'MALICIOUS'
                                      ? 'border-red-500/40 bg-red-500/10 text-red-600'
                                      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                                  )}
                                >
                                  {file.result.verdict}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Confidence: {file.result.confidence}%
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {file.status === 'failed' && file.error && (
                            <Alert variant="destructive" className="mt-2 py-2">
                              <AlertCircle className="h-3 w-3" />
                              <AlertDescription className="text-xs">
                                {file.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                        
                        {file.status !== 'processing' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 shrink-0"
                            onClick={() => onRemoveFile(file.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={onProcessBatch}
                  disabled={isProcessing || files.length === 0}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Batch...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze All ({files.length} files)
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}