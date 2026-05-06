// src/app/components/ExportReport.tsx
'use client';

import { useState } from 'react';
import { Download, FileJson, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export interface ReportData {
  filename: string;
  verdict: 'BENIGN' | 'MALICIOUS';
  confidence: number;
  probability_benign: number;
  probability_malicious: number;
  fileSize: number;
  timestamp: Date;
  fileHash?: string;
  analysisDuration?: number;
}

interface ExportReportProps {
  data: ReportData;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ExportReport({ data, variant = 'outline', size = 'sm', className }: ExportReportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateJSON = () => {
    const report = {
      ...data,
      timestamp: data.timestamp.toISOString(),
      fileSize: data.fileSize,
      analysisDate: data.timestamp.toLocaleString(),
      version: '1.0',
      tool: 'Lumina Malware Detector',
    };
    
    return JSON.stringify(report, null, 2);
  };

  const generateCSV = () => {
    const headers = [
      'Filename',
      'Verdict',
      'Confidence (%)',
      'Probability Benign (%)',
      'Probability Malicious (%)',
      'File Size (bytes)',
      'Timestamp',
      'File Hash (SHA-256)',
      'Analysis Duration (ms)'
    ];
    
    const row = [
      `"${data.filename}"`,
      data.verdict,
      data.confidence,
      (data.probability_benign * 100).toFixed(2),
      (data.probability_malicious * 100).toFixed(2),
      data.fileSize,
      data.timestamp.toISOString(),
      data.fileHash || 'N/A',
      data.analysisDuration || 'N/A'
    ];
    
    return [headers.join(','), row.join(',')].join('\n');
  };

  const generateMarkdown = () => {
    return `# Malware Analysis Report

## File Information
- **Filename:** ${data.filename}
- **File Size:** ${formatBytes(data.fileSize)}
- **SHA-256 Hash:** ${data.fileHash || 'N/A'}
- **Analysis Date:** ${data.timestamp.toLocaleString()}

## Detection Results
- **Verdict:** ${data.verdict}
- **Confidence:** ${data.confidence}%

## Probability Scores
- **Benign:** ${(data.probability_benign * 100).toFixed(2)}%
- **Malicious:** ${(data.probability_malicious * 100).toFixed(2)}%

## Analysis Details
- **Tool:** Lumina Malware Detector
- **Analysis Duration:** ${data.analysisDuration || 'N/A'} ms
- **Report Version:** 1.0

---
*This report was generated automatically by Lumina Malware Detection System.*
`;
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Malware Analysis Report - ${data.filename}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .verdict {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
        }
        .malicious { background: #fee; color: #c00; }
        .benign { background: #efe; color: #0a0; }
        .section {
            margin-bottom: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        .info-row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .info-label {
            font-weight: bold;
            width: 150px;
            color: #666;
        }
        .info-value {
            flex: 1;
            font-family: monospace;
        }
        .probability-bar {
            background: #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 5px;
        }
        .probability-fill {
            height: 20px;
            transition: width 0.3s;
        }
        .benign-fill { background: #10b981; }
        .malicious-fill { background: #ef4444; }
        .footer {
            background: #f9f9f9;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Lumina Malware Analysis Report</h1>
            <div class="verdict ${data.verdict.toLowerCase()}">
                ${data.verdict}
            </div>
        </div>
        <div class="content">
            <div class="section">
                <div class="section-title">File Information</div>
                <div class="info-row">
                    <div class="info-label">Filename:</div>
                    <div class="info-value">${escapeHtml(data.filename)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">File Size:</div>
                    <div class="info-value">${formatBytes(data.fileSize)}</div>
                </div>
                ${data.fileHash ? `
                <div class="info-row">
                    <div class="info-label">SHA-256:</div>
                    <div class="info-value" style="word-break: break-all;">${data.fileHash}</div>
                </div>
                ` : ''}
                <div class="info-row">
                    <div class="info-label">Analysis Date:</div>
                    <div class="info-value">${data.timestamp.toLocaleString()}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Detection Results</div>
                <div class="info-row">
                    <div class="info-label">Confidence:</div>
                    <div class="info-value">${data.confidence}%</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Benign Probability:</div>
                    <div class="info-value">${(data.probability_benign * 100).toFixed(2)}%</div>
                </div>
                <div class="probability-bar">
                    <div class="probability-fill benign-fill" style="width: ${data.probability_benign * 100}%"></div>
                </div>
                <div class="info-row" style="margin-top: 10px;">
                    <div class="info-label">Malicious Probability:</div>
                    <div class="info-value">${(data.probability_malicious * 100).toFixed(2)}%</div>
                </div>
                <div class="probability-bar">
                    <div class="probability-fill malicious-fill" style="width: ${data.probability_malicious * 100}%"></div>
                </div>
            </div>
        </div>
        <div class="footer">
            Generated by Lumina Malware Detection System<br>
            Report ID: ${Date.now()}
        </div>
    </div>
</body>
</html>`;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: 'json' | 'csv' | 'md' | 'html') => {
    setIsExporting(true);
    
    try {
      let content: string;
      let filename: string;
      let mimeType: string;
      
      switch (format) {
        case 'json':
          content = generateJSON();
          filename = `${sanitizeFilename(data.filename)}_report.json`;
          mimeType = 'application/json';
          break;
        case 'csv':
          content = generateCSV();
          filename = `${sanitizeFilename(data.filename)}_report.csv`;
          mimeType = 'text/csv';
          break;
        case 'md':
          content = generateMarkdown();
          filename = `${sanitizeFilename(data.filename)}_report.md`;
          mimeType = 'text/markdown';
          break;
        case 'html':
          content = generateHTML();
          filename = `${sanitizeFilename(data.filename)}_report.html`;
          mimeType = 'text/html';
          break;
      }
      
      downloadFile(content, filename, mimeType);
      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Failed to export report');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export Report'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('json')}>
          <FileJson className="mr-2 h-4 w-4" />
          JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('md')}>
          <FileText className="mr-2 h-4 w-4" />
          Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')}>
          <FileText className="mr-2 h-4 w-4" />
          HTML Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Helper functions
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}