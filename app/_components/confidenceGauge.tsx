// src/app/components/ConfidenceGauge.tsx
'use client';

import { cn } from '@/lib/utils';
import { Shield, ShieldAlert, TrendingUp, TrendingDown } from 'lucide-react';

interface ConfidenceGaugeProps {
  confidence: number;
  verdict: 'BENIGN' | 'MALICIOUS';
}

export function ConfidenceGauge({ confidence, verdict }: ConfidenceGaugeProps) {
  const isMalicious = verdict === 'MALICIOUS';
  
  // Determine confidence level
  const getConfidenceLevel = () => {
    if (confidence >= 90) return { label: 'Very High', color: isMalicious ? 'text-red-600' : 'text-emerald-600' };
    if (confidence >= 70) return { label: 'High', color: isMalicious ? 'text-red-500' : 'text-emerald-500' };
    if (confidence >= 50) return { label: 'Medium', color: isMalicious ? 'text-orange-500' : 'text-blue-500' };
    return { label: 'Low', color: isMalicious ? 'text-yellow-600' : 'text-gray-500' };
  };
  
  const level = getConfidenceLevel();
  
  // Calculate angle for dial (0 to 180 degrees)
  const angle = (confidence / 100) * 180;
  const rotation = `rotate(${angle - 90}deg)`;
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Detection Confidence
          </p>
          <div className="flex items-center gap-2">
            <span className={cn("text-3xl font-bold", level.color)}>
              {confidence}%
            </span>
            <span className="text-xs text-muted-foreground">{level.label}</span>
          </div>
        </div>
        
        {/* Icon indicator */}
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isMalicious ? "bg-red-500/10" : "bg-emerald-500/10"
        )}>
          {isMalicious ? (
            <ShieldAlert className={cn("h-5 w-5", level.color)} />
          ) : (
            <Shield className={cn("h-5 w-5", level.color)} />
          )}
        </div>
      </div>
      
      {/* Dial Gauge */}
      <div className="relative flex justify-center">
        <div className="relative h-32 w-64">
          {/* Background arc (gray) */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 100">
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Confidence arc (colored) */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke={isMalicious ? '#ef4444' : '#10b981'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 251.2} 251.2`}
              strokeDashoffset={0}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          
          {/* Needle */}
          <div 
            className="absolute bottom-2.5 left-1/2 h-20 w-0.5 origin-bottom transition-transform duration-700"
            style={{ 
              transform: `translateX(-50%) ${rotation}`,
              backgroundColor: isMalicious ? '#ef4444' : '#10b981'
            }}
          >
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-current" />
          </div>
          
          {/* Center dot */}
          <div className="absolute bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-foreground" />
        </div>
      </div>
      
      {/* Confidence description */}
      <div className="rounded-lg bg-muted/30 p-3 text-center">
        <p className="text-sm font-medium">
          {isMalicious ? (
            confidence >= 90 ? '⚠️ Strong indication of malicious behavior'
            : confidence >= 70 ? '⚠️ Likely malicious with high confidence'
            : confidence >= 50 ? '⚠️ Potential malicious activity detected'
            : '🔍 Low confidence - Further analysis recommended'
          ) : (
            confidence >= 90 ? '✅ Very high confidence - File appears safe'
            : confidence >= 70 ? '✅ High confidence - File appears legitimate'
            : confidence >= 50 ? 'ℹ️ Moderate confidence - File seems safe'
            : '🔍 Low confidence - Additional verification suggested'
          )}
        </p>
      </div>
    </div>
  );
}