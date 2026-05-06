// src/app/components/AnalysisProgress.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  Loader2, 
  CheckCircle, 
  FileSearch, 
  Scale, 
  Target, 
  Activity,
  AlertCircle 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type StageStatus = 'pending' | 'active' | 'completed' | 'error';

export interface AnalysisStage {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: StageStatus;
  progress?: number;
}

interface AnalysisProgressProps {
  isActive: boolean;
  currentStage?: string;
  onComplete?: () => void;
  error?: string;
}

const stages: AnalysisStage[] = [
  {
    id: 'upload',
    name: 'File Upload',
    description: 'Transferring file to analysis server',
    icon: <Activity className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: 'extract',
    name: 'Feature Extraction',
    description: 'Parsing PE structure and extracting static features',
    icon: <FileSearch className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: 'scale',
    name: 'Data Normalization',
    description: 'Scaling features for model compatibility',
    icon: <Scale className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: 'predict',
    name: 'Model Inference',
    description: 'Running machine learning classification',
    icon: <Target className="h-4 w-4" />,
    status: 'pending',
  },
];

export function AnalysisProgress({ isActive, currentStage, onComplete, error }: AnalysisProgressProps) {
  const [animatedStages, setAnimatedStages] = useState<AnalysisStage[]>(stages);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      // Reset when not active
      setAnimatedStages(stages.map(s => ({ ...s, status: 'pending' as StageStatus })));
      setOverallProgress(0);
      return;
    }

    // Animate progress based on current stage
    const stageIndex = animatedStages.findIndex(s => s.id === currentStage);
    
    setAnimatedStages(prev => prev.map((stage, idx) => {
      if (error && idx <= stageIndex) {
        return { ...stage, status: 'error' as StageStatus };
      }
      if (idx < stageIndex) {
        return { ...stage, status: 'completed' as StageStatus };
      }
      if (idx === stageIndex) {
        return { ...stage, status: 'active' as StageStatus };
      }
      return { ...stage, status: 'pending' as StageStatus };
    }));

    // Calculate overall progress
    const progressPerStage = 100 / stages.length;
    let progress = 0;
    
    if (stageIndex !== undefined && stageIndex >= 0) {
      progress = (stageIndex) * progressPerStage;
      
      // Add some animation during active stage
      if (animatedStages[stageIndex]?.status === 'active') {
        progress += Math.random() * progressPerStage * 0.5;
      }
    }
    
    if (error) {
      setOverallProgress(0);
    } else if (stageIndex === stages.length - 1 && animatedStages[stageIndex]?.status === 'completed') {
      setOverallProgress(100);
      if (onComplete) setTimeout(onComplete, 500);
    } else {
      setOverallProgress(Math.min(progress, 95));
    }
  }, [currentStage, isActive, error, onComplete, animatedStages]);

  if (!isActive && !error) return null;

  // Helper function to determine if status matches
  const isStatus = (status: StageStatus, check: string): boolean => {
    return status === check;
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-5">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">
                {error ? 'Analysis Failed' : 'Analyzing File'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {error 
                  ? 'An error occurred during analysis' 
                  : 'Processing your file through the detection pipeline'}
              </p>
            </div>
            {!error && (
              <div className="text-right">
                <span className="text-2xl font-bold tabular-nums">
                  {Math.round(overallProgress)}
                </span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            )}
          </div>

          {/* Overall Progress Bar */}
          {!error && (
            <Progress value={overallProgress} className="h-2" />
          )}

          {/* Stage Timeline */}
          <div className="space-y-3">
            {animatedStages.map((stage, idx) => (
              <div key={stage.id} className="relative">
                {/* Connector line */}
                {idx < animatedStages.length - 1 && (
                  <div 
                    className={cn(
                      'absolute left-4 top-8 h-8 w-px',
                      stage.status === 'completed' ? 'bg-emerald-500' : 'bg-muted'
                    )}
                  />
                )}
                
                <div className="flex items-start gap-3">
                  {/* Icon circle */}
                  <div
                    className={cn(
                      'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
                      stage.status === 'completed' && 'border-emerald-500 bg-emerald-500/10',
                      stage.status === 'active' && 'border-blue-500 bg-blue-500/10 animate-pulse',
                      stage.status === 'error' && 'border-red-500 bg-red-500/10',
                      stage.status === 'pending' && 'border-muted-foreground/30 bg-muted'
                    )}
                  >
                    {stage.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    )}
                    {stage.status === 'active' && (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    )}
                    {stage.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    {stage.status === 'pending' && (
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    )}
                  </div>
                  
                  {/* Stage info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {stage.icon}
                      <p className={cn(
                        'text-sm font-medium',
                        stage.status === 'active' && 'text-blue-500',
                        stage.status === 'completed' && 'text-emerald-500',
                        stage.status === 'error' && 'text-red-500'
                      )}>
                        {stage.name}
                      </p>
                      {stage.status === 'active' && (
                        <span className="text-xs text-blue-500 animate-pulse">
                          Processing...
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stage.description}
                    </p>
                    {stage.status === 'active' && stage.progress !== undefined && (
                      <Progress value={stage.progress} className="h-1 mt-2" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-500">Error Details</p>
                  <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}