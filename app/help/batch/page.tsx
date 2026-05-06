'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Upload, 
  Download, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function BatchHelpPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link href="/help" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
            ← Back to Help Center
          </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Batch Analysis Guide</h1>
          <p className="text-muted-foreground">
            Process multiple files efficiently with batch analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <Upload className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Multi-File Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upload up to 10 files at once. Drag & drop or browse to select multiple .exe files.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Sequential Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Files are analyzed one after another with real-time progress tracking for each.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Export Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Download batch results as CSV for further analysis or reporting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View batch statistics including success rate, average confidence, and detection rates.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Use Batch Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Switch to Batch Mode</p>
                <p className="text-sm text-muted-foreground">
                  Click the "Batch Analysis" tab at the top of the Threat Detector page.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Upload Multiple Files</p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop or browse to select up to 10 .exe files. Files appear in the queue.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Start Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Click "Analyze All" to begin processing. Watch real-time progress for each file.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                4
              </div>
              <div>
                <p className="font-medium">Review & Export</p>
                <p className="text-sm text-muted-foreground">
                  Once complete, review individual results and export the full batch report.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>Files under 10MB analyze fastest</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>Remove failed files from queue and retry</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>Export batch results immediately after completion</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>Use batch mode for comparing similar files</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link href="/threat-detector?tab=batch">
              Try Batch Analysis
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help/getting-started">
              Getting Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}