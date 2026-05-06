'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  Shield, 
  Brain, 
  BarChart3,
  Zap,
  Database,
  Lock,
  Cloud,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-full mb-4 bg-primary/10">
            <Shield className="h-8 w-8 text-primary " />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">About Lumina</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered malware detection for Windows executables
          </p>
        </div>
        <Card className="mb-8">
          <CardContent>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                To provide accessible, accurate, and real-time malware detection using cutting-edge 
                machine learning technology, helping individuals and organizations protect their systems.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Machine Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                LightGBM classifier trained on 50+ PE features with 99.9% accuracy
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="secondary">LightGBM</Badge>
                <Badge variant="secondary">Scikit-learn</Badge>
                <Badge variant="secondary">Pandas</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Feature Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Extracts 50+ static PE features including headers and entropy
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="secondary">PEFile</Badge>
                <Badge variant="secondary">Static Analysis</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cloud className="h-8 w-8 text-primary mb-2" />
              <CardTitle>API & Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                FastAPI backend with Next.js frontend for real-time analysis
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <Zap className="h-6 w-6 text-primary" />
              <CardTitle>Real-time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Instant detection with results in seconds. Batch processing for multiple files.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-6 w-6 text-primary" />
              <CardTitle>Detailed Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive results with confidence scores and probability breakdowns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Files are processed locally or deleted immediately after analysis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cpu className="h-6 w-6 text-primary" />
              <CardTitle>Static Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No execution required. Safe analysis of suspicious files.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground mt-1">PE Features Analyzed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <p className="text-sm text-muted-foreground mt-1">Detection Accuracy</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">&lt;2s</div>
              <p className="text-sm text-muted-foreground mt-1">Average Analysis Time</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Lumina is open source and community-driven. Contributions welcome!
            </p>
              <Button variant="outline" asChild>
                <Link href="https://github.com" target="_blank">
                  GitHub
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}