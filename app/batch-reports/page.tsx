'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, 
  Download, 
  Eye,
  Calendar,
  Shield,
  ShieldAlert,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import Link from 'next/link';
import type { HistoryItem } from '@/app/types';

interface BatchSession {
  id: string;
  date: Date;
  files: HistoryItem[];
  name: string;
}

export default function BatchReportsPage() {
  const [batches, setBatches] = useState<BatchSession[]>([]);

  useEffect(() => {
    const loadBatches = () => {
      const saved = localStorage.getItem('malware_history');
      if (saved) {
        const parsed: HistoryItem[] = JSON.parse(saved);
        
        const grouped = new Map<string, HistoryItem[]>();
        parsed.forEach((item: HistoryItem) => {
          const date = new Date(item.timestamp).toDateString();
          if (!grouped.has(date)) grouped.set(date, []);
          grouped.get(date)!.push(item);
        });
        
        const batchSessions: BatchSession[] = Array.from(grouped.entries()).map(([date, files], index) => ({
          id: `batch-${index}`,
          date: new Date(date),
          files,
          name: `Batch Analysis - ${date}`
        }));
        
        setBatches(batchSessions);
      }
    };
    
    loadBatches();
  }, []);

  const exportBatch = (batch: BatchSession) => {
    const data = batch.files.map(f => ({
      filename: f.filename,
      verdict: f.verdict,
      confidence: f.confidence,
      probability_benign: f.probability_benign,
      probability_malicious: f.probability_malicious,
      timestamp: new Date(f.timestamp).toISOString()
    }));
    
    const csv = [
      ['Filename', 'Verdict', 'Confidence', 'Benign %', 'Malicious %', 'Timestamp'],
      ...data.map(r => [
        r.filename,
        r.verdict,
        r.confidence,
        (r.probability_benign * 100).toFixed(2),
        (r.probability_malicious * 100).toFixed(2),
        r.timestamp
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-report-${batch.date.toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Batch report exported');
  };

  const getBatchStats = (batch: BatchSession) => {
    const malicious = batch.files.filter(f => f.verdict === 'MALICIOUS').length;
    const benign = batch.files.filter(f => f.verdict === 'BENIGN').length;
    const avgConfidence = batch.files.reduce((acc, f) => acc + f.confidence, 0) / batch.files.length;
    return { malicious, benign, avgConfidence, total: batch.files.length };
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Batch Reports</h1>
          </div>
          <p className="text-muted-foreground">
            View and manage your batch analysis sessions
          </p>
        </div>

        {batches.length === 0 ? (
          <Card className="p-12 text-center">
            <Layers className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Batch Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Run batch analysis to see reports here
            </p>
            <Button asChild>
              <Link href="/threat-detector?tab=batch">
                Start Batch Analysis
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {batches.map((batch) => {
              const stats = getBatchStats(batch);
              return (
                <Card key={batch.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-muted/30">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          {batch.date.toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {batch.files.length} files analyzed
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => exportBatch(batch)}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Export</span>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/batch-reports/${batch.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-4 mb-6">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">{stats.total}</p>
                        <p className="text-xs text-muted-foreground">Total Files</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-red-500/10">
                        <p className="text-2xl font-bold text-red-500">{stats.malicious}</p>
                        <p className="text-xs text-muted-foreground">Malicious</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-emerald-500/10">
                        <p className="text-2xl font-bold text-emerald-500">{stats.benign}</p>
                        <p className="text-xs text-muted-foreground">Benign</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-blue-500/10">
                        <p className="text-2xl font-bold">{stats.avgConfidence.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Avg Confidence</p>
                      </div>
                    </div>

                    {/* Files List */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Files in this batch</p>
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {batch.files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                {file.verdict === 'MALICIOUS' ? (
                                  <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
                                ) : (
                                  <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                                )}
                                <span className="text-sm truncate">{file.filename}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <Badge variant={file.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                                  {file.verdict}
                                </Badge>
                                <span className="text-xs font-mono text-muted-foreground">
                                  {file.confidence}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}