'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  Shield, 
  ShieldAlert, 
  Activity,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResultsHelpPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link href="/help" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
            ← Back to Help Center
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Understanding Results</h1>
          
          <p className="text-muted-foreground">
            Learn how to interpret your malware analysis results
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Analysis Verdict
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold">BENIGN</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The file appears to be safe and legitimate. No malicious patterns detected.
                </p>
              </div>
              <div className="rounded-lg border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">MALICIOUS</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  The file exhibits malicious characteristics. Exercise caution.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence Level</span>
                <span className="font-mono font-bold">95.5%</span>
              </div>
              <Progress value={95.5} className="h-2" />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <Badge variant="destructive" className="mb-2">80-100%</Badge>
                <p className="text-xs text-muted-foreground">Very High Confidence</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <Badge variant="secondary" className="mb-2 bg-yellow-500">60-79%</Badge>
                <p className="text-xs text-muted-foreground">Moderate Confidence</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <Badge variant="secondary" className="mb-2">Below 60%</Badge>
                <p className="text-xs text-muted-foreground">Low Confidence - Reanalyze</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Probability Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Benign Probability</span>
                <span className="font-mono text-emerald-500">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2 bg-muted [&>div]:bg-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Malicious Probability</span>
                <span className="font-mono text-red-500">1.8%</span>
              </div>
              <Progress value={1.8} className="h-2 bg-muted [&>div]:bg-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              The model outputs probabilities for both classes. The sum always equals 100%.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              File Hash (SHA-256)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Each analyzed file has a unique SHA-256 hash that can be used to:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Reference the file in future analyses</li>
              <li>Check if the file has been analyzed before</li>
              <li>Share results with other security researchers</li>
              <li>Verify file integrity</li>
            </ul>
            <div className="mt-3 rounded-lg bg-muted p-2">
              <code className="text-xs break-all">5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8</code>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/help/faq">FAQ</Link>
          </Button>
          <Button asChild>
            <Link href="/threat-detector">Try Analysis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}