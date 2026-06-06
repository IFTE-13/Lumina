'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import type { HistoryItem } from '@/app/types';
interface VerificationResult {
  filename: string;
  verdict: 'BENIGN' | 'MALICIOUS';
  confidence: number;
  timestamp: string | Date;
  fileSize?: number;
  probability_benign?: number;
  probability_malicious?: number;
}

export default function VerifyPage() {
  const [hash, setHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const verifyHash = async () => {
    if (!hash.trim()) {
      toast.error('Please enter a file hash');
      return;
    }
    
    setIsVerifying(true);
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      const history: HistoryItem[] = JSON.parse(saved);
      const found = history.find((h: HistoryItem) => 
        h.filename.toLowerCase().includes(hash.toLowerCase())
      );
      
      if (found) {
        setResult({
          filename: found.filename,
          verdict: found.verdict,
          confidence: found.confidence,
          timestamp: found.timestamp,
          fileSize: found.fileSize,
          probability_benign: found.probability_benign,
          probability_malicious: found.probability_malicious,
        });
        toast.success('Analysis found');
      } else {
        setResult(null);
        toast.info('No analysis found for this hash');
      }
    }
    setIsVerifying(false);
  };

  const submitFeedback = () => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  const handleCorrectFeedback = () => {
    toast.success('Thank you for confirming this analysis!');
  };

  const handleIncorrectFeedback = () => {
    toast.info('Please provide more details below to help us improve.');
  };

  const handleReportIssue = () => {
    toast.info('Please describe the issue in the comments section below.');
  };

  const handleReportFalsePositive = () => {
    toast.info('Please share the file details to help us investigate the false positive.');
  };

  const handleReportFalseNegative = () => {
    toast.info('Please share the file details to help us investigate the false negative.');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Verify Analysis</h1>
          </div>
          <p className="text-muted-foreground">
            Verify previous analysis results or report false positives/negatives
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lookup Previous Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter SHA-256 hash or filename"
                value={hash}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHash(e.target.value)}
                className="font-mono"
              />
              <Button onClick={verifyHash} disabled={isVerifying}>
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="mb-8 border-emerald-500/30 bg-linear-to-br from-emerald-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Result</span>
                <Badge variant={result.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                  {result.verdict}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Filename</p>
                  <p className="font-mono text-sm break-all">{result.filename}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Analysis Date</p>
                  <p className="text-sm">{new Date(result.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-2xl font-bold">{result.confidence}%</p>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <p className="text-sm font-medium mb-3">Was this analysis correct?</p>
                <div className="flex gap-3 mb-4">
                  <Button variant="outline" className="gap-2" onClick={handleCorrectFeedback}>
                    <ThumbsUp className="h-4 w-4" />
                    Correct
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleIncorrectFeedback}>
                    <ThumbsDown className="h-4 w-4" />
                    Incorrect
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleReportIssue}>
                    <Flag className="h-4 w-4" />
                    Report Issue
                  </Button>
                </div>
                
                <Textarea
                  placeholder="Additional comments (optional)..."
                  value={feedback}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                  className="mb-3"
                  rows={4}
                />
                <Button onClick={submitFeedback} disabled={submitted}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Report Misclassification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Help us improve by reporting files that were incorrectly classified.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="gap-2" onClick={handleReportFalsePositive}>
                <ShieldAlert className="h-4 w-4" />
                Report False Positive
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleReportFalseNegative}>
                <Shield className="h-4 w-4" />
                Report False Negative
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}