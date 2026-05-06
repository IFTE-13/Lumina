// src/app/components/resultCard.tsx (Professional Version)
'use client';

import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, CheckCircle, XCircle, Copy, Check, FileText, Calendar, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ConfidenceGauge } from './confidenceGauge';
import { ExportReport, ReportData } from './ExportReport';
import { computeFileHash } from '@/lib/crypto';
import { formatFileSize } from '@/lib/utils';
import type { PredictionResponse } from '@/app/types/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ResultCardProps {
  result: PredictionResponse;
  fileSize: number;
  timestamp: Date;
  selectedFile?: File;
  isAnalyzing?: boolean;
  currentStage?: string;
  error?: string;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

export function ResultCard({ 
  result, 
  fileSize, 
  timestamp, 
  selectedFile,
}: ResultCardProps) {
  const isMalicious = result.verdict === 'MALICIOUS';
  const [fileHash, setFileHash] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      computeFileHash(selectedFile).then(setFileHash);
    }
  }, [selectedFile]);

  const copyHash = async () => {
    await navigator.clipboard.writeText(fileHash);
    setCopied(true);
    toast.success('Hash copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const reportData: ReportData = {
    filename: result.filename,
    verdict: result.verdict,
    confidence: result.confidence,
    probability_benign: result.probability_benign,
    probability_malicious: result.probability_malicious,
    fileSize,
    timestamp,
    fileHash,
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div
        className={cn(
          'rounded-xl border shadow-sm overflow-hidden transition-all',
          isMalicious
            ? 'border-red-500/30 bg-linear-to-br from-red-500/5 to-transparent'
            : 'border-emerald-500/30 bg-linear-to-br from-emerald-500/5 to-transparent'
        )}
      >
        {/* Header Banner */}
        <div
          className={cn(
            'px-6 py-4',
            isMalicious ? 'bg-red-500/10' : 'bg-emerald-500/10'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMalicious ? (
                <ShieldAlert className="h-6 w-6 text-red-500" />
              ) : (
                <Shield className="h-6 w-6 text-emerald-500" />
              )}
              <div>
                <h3 className="font-semibold">Analysis Result</h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(timestamp)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ExportReport data={reportData} variant="outline" size="sm" />
              <Badge
                className={cn(
                  'px-3 py-1 text-sm font-mono',
                  isMalicious
                    ? 'bg-red-500/20 text-red-600 border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30'
                )}
                variant="outline"
              >
                {result.verdict}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Information Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileText className="h-3 w-3" />
                <span>Filename</span>
              </div>
              <p className="font-mono text-sm font-medium truncate">{result.filename}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HardDrive className="h-3 w-3" />
                <span>File Size</span>
              </div>
              <p className="font-mono text-sm">{formatFileSize(fileSize)}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Analyzed</span>
              </div>
              <p className="font-mono text-sm">{formatDate(timestamp)}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {isMalicious ? (
                  <XCircle className="h-3 w-3" />
                ) : (
                  <CheckCircle className="h-3 w-3" />
                )}
                <span>Status</span>
              </div>
              <p className={cn(
                "font-semibold text-sm",
                isMalicious ? "text-red-500" : "text-emerald-500"
              )}>
                {result.verdict}
              </p>
            </div>
          </div>

          {/* File Hash Section */}
          {fileHash && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  SHA-256 Hash
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-muted px-3 py-2 text-xs font-mono break-all">
                    {fileHash}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyHash}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span className="ml-1 text-xs">{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Confidence Gauge */}
          <ConfidenceGauge confidence={result.confidence} verdict={result.verdict} />
        </div>
      </div>

      {/* Probability Breakdown Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Probability Breakdown
        </h4>
        <div className="space-y-4">
          {/* Benign */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Benign</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {(result.probability_benign * 100).toFixed(2)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${result.probability_benign * 100}%` }}
              />
            </div>
          </div>
          
          {/* Malicious */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Malicious</span>
              <span className="font-mono font-semibold text-red-600 dark:text-red-400">
                {(result.probability_malicious * 100).toFixed(2)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-red-500 transition-all duration-700"
                style={{ width: `${result.probability_malicious * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}