'use client';

import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, HardDrive, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface MultiFileUploaderProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

export function MultiFileUploader({ 
  onFilesAdded, 
  disabled = false,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024
}: MultiFileUploaderProps) {
  
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const filesToAdd = acceptedFiles.slice(0, maxFiles);
        onFilesAdded(filesToAdd);
      }
      
      if (fileRejections.length > 0) {
        console.warn('File rejections:', fileRejections);
      }
    },
    [onFilesAdded, maxFiles]
  );
  
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/x-msdownload': ['.exe'],
      'application/x-msdos-program': ['.exe'],
    },
    maxFiles,
    maxSize,
    multiple: true,
    disabled,
  });
  
  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          'group relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200',
          isDragActive
            ? 'border-primary bg-primary/5 shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]'
            : 'border-border hover:border-primary/50 hover:bg-muted/40',
          disabled && 'pointer-events-none opacity-50'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center gap-3 px-8 py-14 text-center">
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
          
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragActive ? 'Release to upload' : 'Drop your executables here'}
            </p>
            <p className="text-xs text-muted-foreground">
              or{' '}
              <span className="text-primary underline-offset-2 hover:underline">
                click to browse
              </span>
            </p>
          </div>
          
          <div className="mt-1 flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
            <HardDrive className="h-3 w-3" />
            Windows executable (.exe) · Max {maxFiles} files · Up to {maxSize / (1024 * 1024)}MB each
          </div>
        </div>
      </div>
      
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