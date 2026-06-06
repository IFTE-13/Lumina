'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Trash2,
  FileText,
  Mail,
  Printer
} from 'lucide-react';
import { toast } from 'sonner';

export default function PrivacyPage() {
  const printPage = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 5, 2025</p>
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={printPage}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Lumina collects minimal data necessary for malware detection:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Uploaded .exe files (processed temporarily and deleted)</li>
                <li>Analysis results stored locally in your browser</li>
                <li>No personal information is collected or stored on our servers</li>
                <li>Anonymous usage statistics may be collected for improvement</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Your security is our priority. We implement industry-standard measures:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Files are processed in-memory and immediately deleted</li>
                <li>All analysis happens locally when possible</li>
                <li>No permanent storage of uploaded files</li>
                <li>API communications are encrypted via HTTPS</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We store only what&apos;s necessary for functionality:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Analysis history stored locally in your browser&apos;s localStorage</li>
                <li>No cloud storage of analysis results by default</li>
                <li>You can clear your history at any time via Settings</li>
                <li>Export reports are saved only at your request</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>View all your analysis history</li>
                <li>Clear your history completely</li>
                <li>Export or delete individual reports</li>
                <li>Opt out of anonymous statistics (coming soon)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Cookies & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lumina uses localStorage for storing your preferences (theme, settings) and analysis history.
                No third-party cookies or tracking scripts are used.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                If you have questions about this privacy policy or your data:
              </p>
              <ul className="space-y-1 text-sm">
                <li>Email: <a href="mailto:privacy@lumina.com" className="text-primary hover:underline">privacy@lumina.com</a></li>
                <li>GitHub: <a href="https://github.com" className="text-primary hover:underline">github.com/lumina</a></li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>We reserve the right to update this privacy policy. Changes will be posted here.</p>
        </div>
      </div>
    </div>
  );
}