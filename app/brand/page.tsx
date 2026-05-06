'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileImage, 
  Palette, 
  Type, 
  Shield,
  Copy,
  Check
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const colors = [
  { name: "Primary", value: "#3b82f6", description: "Main brand color" },
  { name: "Primary Dark", value: "#2563eb", description: "Dark variant" },
  { name: "Success", value: "#10b981", description: "Benign results" },
  { name: "Error", value: "#ef4444", description: "Malicious results" },
  { name: "Background", value: "#0f172a", description: "Dark theme bg" },
  { name: "Surface", value: "#1e293b", description: "Card background" }
];

export default function BrandPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    toast.success('Color copied');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Brand Assets</h1>
          <p className="text-muted-foreground">
            Resources and guidelines for using Lumina branding
          </p>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Logo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center">
              <div className="text-center">
                <div className="rounded-lg bg-muted p-6 flex items-center justify-center mb-3">
                  <Image src="/logo.png" alt="Lumina Logo" width={80} height={80} />
                </div>
                <p className="text-sm font-medium">Primary Logo</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    PNG
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    SVG
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {colors.map((color) => (
                <div key={color.name} className="rounded-lg border overflow-hidden">
                  <div 
                    className="h-16" 
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="p-3">
                    <p className="font-medium">{color.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <code className="text-xs">{color.value}</code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyColor(color.value)}
                      >
                        {copied === color.value ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{color.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-1">Heading 1</h1>
              <code className="text-xs">text-4xl font-bold</code>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-1">Heading 2</h2>
              <code className="text-xs">text-2xl font-semibold</code>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-1">Heading 3</h3>
              <code className="text-xs">text-xl font-medium</code>
            </div>
            <div>
              <p className="text-base mb-1">Body text for paragraphs and general content.</p>
              <code className="text-xs">text-base</code>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Secondary text for captions and metadata.</p>
              <code className="text-xs">text-sm text-muted-foreground</code>
            </div>
            <div>
              <code className="font-mono text-sm">Monospace for code and hashes</code>
              <div><code className="text-xs">font-mono</code></div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Usage Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✅ Do use the logo as provided, maintaining clear space</p>
            <p>✅ Do use the primary color for calls-to-action and highlights</p>
            <p>❌ Don't modify, rotate, or distort the logo</p>
            <p>❌ Don't use colors outside the approved palette</p>
            <p>❌ Don't pair the logo with unrelated marks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}