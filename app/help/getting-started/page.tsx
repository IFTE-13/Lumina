'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  BarChart3, 
  Shield,
  ArrowRight,
  CheckCircle,
  FileText,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: "Upload Your File",
    description: "Start by uploading a Windows executable (.exe) file for analysis.",
    icon: Upload,
    details: [
      "Click on the upload area or drag & drop your file",
      "Only .exe files are supported (32-bit and 64-bit)",
      "Maximum file size is 50MB (configurable in Settings)",
      "Files are processed in memory and never stored permanently"
    ]
  },
  {
    title: "Run Analysis",
    description: "Click the 'Run Analysis' button to start the detection process.",
    icon: Zap,
    details: [
      "Analysis typically completes in 1-2 seconds",
      "You'll see real-time progress tracking",
      "The model extracts 50+ PE features from your file",
      "Results are displayed immediately after processing"
    ]
  },
  {
    title: "Interpret Results",
    description: "Understand what the analysis results mean.",
    icon: BarChart3,
    details: [
      "Verdict: BENIGN (safe) or MALICIOUS (threat detected)",
      "Confidence score: How certain the model is (80%+ is high confidence)",
      "Probability breakdown: Shows the likelihood of each class",
      "File hash: Use this to reference or share results"
    ]
  },
  {
    title: "Save & Export",
    description: "Store or share your analysis results.",
    icon: FileText,
    details: [
      "Results are automatically saved to your history",
      "Export reports in JSON, CSV, or HTML format",
      "Share results via social media or copy to clipboard",
      "Clear history anytime from Settings"
    ]
  }
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-linaer-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link href="/help" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
            ← Back to Help Center
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Getting Started</h1>
          <p className="text-muted-foreground">
            Your step-by-step guide to using Lumina malware detection
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <Card key={idx} className="relative overflow-hidden">
              <div className="absolute left-6 top-0 bottom-0 w-px" />
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Step {idx + 1}</Badge>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 ml-16">
                  {step.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-linaer-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Ready to Start?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild>
              <Link href="/threat-detector">
                Go to Threat Detector
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help/results">
                Learn About Results
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}