// src/app/lookup/page.tsx (FIXED)
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Search,
  Shield, 
  ShieldAlert, 
  Copy,
  Check,
  History,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { HistoryItem } from '@/app/types';

export default function HashLookupPage() {
  const [hash, setHash] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const computeHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsSearching(true);
    const fileHash = await computeHash(file);
    setHash(fileHash);
    performLookup(fileHash);
  };

  const performLookup = (searchHash: string) => {
    const found = history.find(item => {
      return item.filename.toLowerCase().includes(searchHash.toLowerCase());
    });
    
    if (found) {
      setResult(found);
      toast.success('File found in history');
    } else {
      setResult(null);
      toast.info('No previous analysis found for this hash');
    }
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (!hash.trim()) {
      toast.error('Please enter a hash value');
      return;
    }
    setIsSearching(true);
    performLookup(hash);
  };

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success('Hash copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Hash Lookup</h1>
          <p className="text-muted-foreground">
            Search for files by SHA-256 hash to view previous analysis results
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lookup File Hash</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="hash" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hash">Enter Hash</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hash" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>SHA-256 Hash</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
                      value={hash}
                      onChange={(e) => setHash(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      <Search className="mr-2 h-4 w-4" />
                      Lookup
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="file" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Upload Executable</Label>
                  <Input
                    type="file"
                    accept=".exe"
                    onChange={handleFileUpload}
                    disabled={isSearching}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a file to automatically compute its SHA-256 hash and lookup results
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {result && (
          <Card className="mb-8 border-emerald-500/30 bg-linear-to-br from-emerald-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  Analysis Result
                </span>
                <Badge variant={result.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                  {result.verdict}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Filename</p>
                  <p className="font-mono text-sm break-all">{result.filename}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Analysis Date</p>
                  <p className="text-sm">{new Date(result.timestamp).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold">{result.confidence}%</span>
                    <Progress value={result.confidence} className="flex-1 h-2" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">File Size</p>
                  <p className="text-sm">{formatFileSize(result.fileSize)}</p>
                </div>
              </div>

              {hash && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">SHA-256 Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-muted px-3 py-2 text-xs font-mono break-all">
                      {hash}
                    </code>
                    <Button variant="outline" size="sm" onClick={copyHash}>
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">Detection Probabilities</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Benign</span>
                      <span className="text-emerald-500">{(result.probability_benign * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={result.probability_benign * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Malicious</span>
                      <span className="text-red-500">{(result.probability_malicious * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={result.probability_malicious * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!result && hash && !isSearching && (
          <Card className="mb-8">
            <CardContent className="py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
              <p className="text-sm text-muted-foreground">
                No previous analysis found for this hash. Try analyzing the file first.
              </p>
            </CardContent>
          </Card>
        )}

        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Analyses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setResult(item);
                      toast.success('Loaded analysis result');
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.verdict === 'MALICIOUS' ? (
                        <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
                      ) : (
                        <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={item.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                      {item.verdict}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}