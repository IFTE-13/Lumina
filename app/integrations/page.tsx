'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Terminal,
  GitBranch,
  Cloud,
  Server,
  Shield,
  Zap,
  ExternalLink,
  Copy,
  Check,
  CodeXml
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const integrations = [
  {
    name: "Python SDK",
    description: "Integrate into your Python applications",
    icon: Code,
    language: "Python",
    install: "pip install lumina-sdk",
    docs: "/api-docs#python"
  },
  {
    name: "JavaScript/Node.js",
    description: "Use Lumina in web applications",
    icon: Terminal,
    language: "JavaScript",
    install: "npm install lumina-client",
    docs: "/api-docs#javascript"
  },
  {
    name: "GitHub Actions",
    description: "Automate malware scanning in CI/CD",
    icon: CodeXml,
    language: "YAML",
    install: "uses: lumina/action@v1",
    docs: "/integrations/github-actions"
  },
  {
    name: "REST API",
    description: "Direct API integration for any language",
    icon: Cloud,
    language: "cURL",
    install: "curl -X POST /predict",
    docs: "/api-docs"
  },
  {
    name: "SIEM Integration",
    description: "Send results to different SIEMs",
    icon: Server,
    language: "JSON",
    install: "Webhook ready",
    docs: "/integrations/siem"
  },
  {
    name: "VirusTotal",
    description: "Cross-reference with VirusTotal db",
    icon: Shield,
    language: "API",
    install: "Coming soon",
    docs: "/integrations/virustotal"
  }
];

export default function IntegrationsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyInstall = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Integrations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integrate Lumina into your tools and workflows
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {integrations.map((integration) => (
            <Card key={integration.name} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <integration.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary">{integration.language}</Badge>
                </div>
                <CardTitle>{integration.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-muted p-2">
                  <code className="text-xs">{integration.install}</code>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => copyInstall(integration.install, integration.name)}
                  >
                    {copied === integration.name ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Webhook Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Get real-time notifications when analyses complete
            </p>
            <div className="rounded-lg bg-muted p-3">
              <code className="text-sm">POST https://your-server.com/webhook</code>
            </div>
            <Button variant="outline" className="mt-4" disabled>
              Coming soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}