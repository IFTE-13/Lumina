'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  BarChart3,
  ArrowLeftRight,
  Download,
  Trash2,
  FileText,
} from 'lucide-react';
import { predictMalware } from '@/lib/api-client';
import { toast } from 'sonner';
import { formatFileSize } from '@/lib/utils';
import { FileUploader } from '../_components/fileUploader';
import type { PredictionResult } from '@/app/types';

interface ComparisonFile {
  id: string;
  file: File;
  result?: PredictionResult;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  error?: string;
}

interface ExportData {
  filename: string;
  size: number;
  verdict: 'BENIGN' | 'MALICIOUS';
  confidence: number;
  probability_benign: number;
  probability_malicious: number;
}

export default function ComparePage() {
  const [files, setFiles] = useState<ComparisonFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addFile = (file: File) => {
    if (files.length >= 5) {
      toast.error('Maximum 5 files can be compared at once');
      return;
    }
    setFiles(prev => [...prev, {
      id: `${Date.now()}-${Math.random()}`,
      file,
      status: 'pending'
    }]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const analyzeAll = async () => {
    setIsAnalyzing(true);
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const compareFile of pendingFiles) {
      setFiles(prev => prev.map(f => 
        f.id === compareFile.id ? { ...f, status: 'analyzing' } : f
      ));
      
      try {
        const res = await predictMalware(compareFile.file);
        if (res.success && res.data) {
          setFiles(prev => prev.map(f => 
            f.id === compareFile.id ? { ...f, status: 'completed', result: res.data } : f
          ));
        } else {
          setFiles(prev => prev.map(f => 
            f.id === compareFile.id ? { ...f, status: 'failed', error: res.error } : f
          ));
        }
      } catch {
        setFiles(prev => prev.map(f => 
          f.id === compareFile.id ? { ...f, status: 'failed', error: 'Analysis failed' } : f
        ));
      }
    }
    
    setIsAnalyzing(false);
    toast.success('Comparison complete');
  };

  const clearAll = () => {
    setFiles([]);
    toast.info('Cleared all files');
  };

  const exportComparison = () => {
    const completed = files.filter(f => f.status === 'completed' && f.result);
    const data: ExportData[] = completed.map(f => ({
      filename: f.file.name,
      size: f.file.size,
      verdict: f.result!.verdict,
      confidence: f.result!.confidence,
      probability_benign: f.result!.probability_benign,
      probability_malicious: f.result!.probability_malicious
    }));
    
    const csv = [
      ['Filename', 'Size', 'Verdict', 'Confidence', 'Benign %', 'Malicious %'],
      ...data.map(r => [
        r.filename,
        r.size,
        r.verdict,
        r.confidence,
        (r.probability_benign * 100).toFixed(2),
        (r.probability_malicious * 100).toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Comparison exported');
  };

  const completedFiles = files.filter(f => f.status === 'completed' && f.result);
  const hasResults = completedFiles.length >= 2;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Compare Files</h1>
              <p className="text-muted-foreground">
                Compare malware analysis results side by side for up to 5 files
              </p>
            </div>
            <div className="flex gap-2">
              {files.length > 0 && (
                <>
                  <Button variant="outline" onClick={clearAll} size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                  <Button variant="outline" onClick={exportComparison} size="sm" disabled={!hasResults}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {files.length < 5 && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <FileUploader
                onFileSelect={addFile}
                selectedFile={null}
                onClear={() => {}}
                isAnalyzing={isAnalyzing}
              />
            </CardContent>
          </Card>
        )}

        {files.length > 0 && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6">
              {files.map((file) => (
                <Card key={file.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium truncate">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatFileSize(file.file.size)}
                      </p>
                      
                      {file.status === 'pending' && (
                        <Badge variant="secondary" className="mt-3">Pending</Badge>
                      )}
                      {file.status === 'analyzing' && (
                        <Badge variant="secondary" className="mt-3 animate-pulse">Analyzing...</Badge>
                      )}
                      {file.status === 'completed' && file.result && (
                        <div className="mt-3 space-y-2">
                          <Badge variant={file.result.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                            {file.result.verdict}
                          </Badge>
                          <p className="text-xs font-mono">{file.result.confidence}% confidence</p>
                          <Progress value={file.result.confidence} className="h-1" />
                        </div>
                      )}
                      {file.status === 'failed' && (
                        <Badge variant="destructive" className="mt-3">Failed</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {files.some(f => f.status === 'pending') && (
              <Button onClick={analyzeAll} disabled={isAnalyzing} className="w-full mb-8" size="lg">
                {isAnalyzing ? 'Analyzing...' : `Analyze ${files.filter(f => f.status === 'pending').length} File(s)`}
              </Button>
            )}

            {hasResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Comparison Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">File</th>
                          <th className="text-left p-3 font-medium">Size</th>
                          <th className="text-left p-3 font-medium">Verdict</th>
                          <th className="text-left p-3 font-medium">Confidence</th>
                          <th className="text-left p-3 font-medium">Benign %</th>
                          <th className="text-left p-3 font-medium">Malicious %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedFiles.map((file) => (
                          <tr key={file.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm truncate max-w-50">{file.file.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">{formatFileSize(file.file.size)}</td>
                            <td className="p-3">
                              <Badge variant={file.result!.verdict === 'MALICIOUS' ? "destructive" : "default"}>
                                {file.result!.verdict}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono">{file.result!.confidence}%</span>
                                <Progress value={file.result!.confidence} className="w-16 h-1" />
                              </div>
                             </td>
                            <td className="p-3">
                              <span className="text-sm text-emerald-500">
                                {(file.result!.probability_benign * 100).toFixed(1)}%
                              </span>
                             </td>
                            <td className="p-3">
                              <span className="text-sm text-red-500">
                                {(file.result!.probability_malicious * 100).toFixed(1)}%
                              </span>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {files.length === 0 && (
          <Card className="p-12 text-center">
            <ArrowLeftRight className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Files to Compare</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload up to 5 files to compare their analysis results side by side
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}