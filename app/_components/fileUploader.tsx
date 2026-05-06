// src/app/components/FileUploader.tsx
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, AlertCircle, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatFileSize } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isAnalyzing?: boolean;
}

export function FileUploader({
  onFileSelect,
  selectedFile,
  onClear,
  isAnalyzing,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/x-msdownload': ['.exe'],
      'application/x-msdos-program': ['.exe'],
    },
    maxFiles: 1,
    multiple: false,
    disabled: isAnalyzing,
  });

  return (
    <div className="w-full space-y-3">
      {!selectedFile ? (
        /* ── Drop zone ── */
        <div
          {...getRootProps()}
          className={cn(
            'group relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200',
            isDragActive
              ? 'border-primary bg-primary/5 shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]'
              : 'border-border hover:border-primary/50 hover:bg-muted/40',
            isAnalyzing && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-3 px-8 py-14 text-center">
            {/* Icon */}
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-200',
                isDragActive
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border bg-muted/60 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary'
              )}
            >
              <Upload className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive ? 'Release to upload' : 'Drop your executable here'}
              </p>
              <p className="text-xs text-muted-foreground">
                or{' '}
                <span className="text-primary underline-offset-2 hover:underline">
                  click to browse
                </span>
              </p>
            </div>

            {/* Constraint badge */}
            <div className="mt-1 flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
              <HardDrive className="h-3 w-3" />
              Windows executable (.exe) only
            </div>
          </div>
        </div>
      ) : (
        /* ── Selected file card ── */
        <div
          className={cn(
            'flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3 transition-opacity',
            isAnalyzing && 'opacity-60'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* File icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>

            {/* File info */}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>

          {/* Clear button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={onClear}
            disabled={isAnalyzing}
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Validation error */}
      {fileRejections.length > 0 && (
        <Alert variant="destructive" className="py-2.5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            {fileRejections[0].errors.map((e) => e.message).join(' · ')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}