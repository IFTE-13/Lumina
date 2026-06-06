'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Terminal, 
  Copy, 
  Check,
  Key,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

export default function APIDocsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('your-api-key-here');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  const codeExamples = {
    curl: `curl -X POST http://localhost:8000/predict \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "file=@/path/to/your/file.exe"`,
    
    python: `import requests

url = "http://localhost:8000/predict"
api_key = "${apiKey}"

with open("file.exe", "rb") as f:
    files = {"file": f}
    headers = {"Authorization": f"Bearer {api_key}"}
    response = requests.post(url, files=files, headers=headers)
    
print(response.json())`,
    
    javascript: `const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));`
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">API Documentation</h1>
          
          <p className="text-muted-foreground">
            Integrate Lumina malware detection into your applications
          </p>
        </div>

        {/* API Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              API Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium mb-2">Base URL</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">http://localhost:8000</code>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium mb-2">Rate Limit</p>
                <p className="text-sm">100 requests/minute</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium mb-2">Authentication</p>
                <p className="text-sm">Bearer Token (Optional)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Include your API key in the Authorization header:
            </p>
            <div className="rounded-lg bg-muted p-3">
              <code className="text-sm">Authorization: Bearer your-api-key-here</code>
            </div>
            <div className="flex items-center gap-2">
              <Input 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
              />
              <Button variant="outline" onClick={() => copyCode(apiKey, 'api-key')}>
                {copied === 'api-key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <Tabs defaultValue="predict" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predict">POST /predict</TabsTrigger>
            <TabsTrigger value="health">GET /health</TabsTrigger>
            <TabsTrigger value="batch">Batch Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm">/predict</code>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Analyze a Windows executable file for malware
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Request Parameters</p>
                  <div className="rounded-lg border">
                    <div className="flex justify-between p-3 border-b">
                      <span className="font-mono text-sm">file</span>
                      <span className="text-sm text-muted-foreground">File (required)</span>
                      <span className="text-sm">The executable file to analyze (.exe)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Response Example</p>
                  <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
{`{
  "filename": "sample.exe",
  "verdict": "MALICIOUS",
  "confidence": 95.5,
  "probability_benign": 0.045,
  "probability_malicious": 0.955
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm">/health</code>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="rounded-lg bg-muted p-4 text-xs">
{`{
  "status": "healthy",
  "model_ready": true
}`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batch" className="mt-4">
            <Card>
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  For batch analysis, make multiple POST requests to /predict endpoint
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-blue-500/10 p-4">
                  <p className="text-sm">
                    💡 Tip: Use parallel requests for better performance, but respect rate limits
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Code Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="curl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curl" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                    <code>{codeExamples.curl}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyCode(codeExamples.curl, 'curl')}
                  >
                    {copied === 'curl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="python" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                    <code>{codeExamples.python}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyCode(codeExamples.python, 'python')}
                  >
                    {copied === 'python' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="javascript" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
                    <code>{codeExamples.javascript}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyCode(codeExamples.javascript, 'js')}
                  >
                    {copied === 'js' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}