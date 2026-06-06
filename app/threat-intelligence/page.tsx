'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Activity,
  Zap,
  Download,
  RefreshCw
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import type { HistoryItem } from '@/app/types';

interface ThreatStat {
  name: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export default function ThreatIntelligencePage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange] = useState<'week' | 'month'>('week')

  useEffect(() => {
  const loadHistory = () => {
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      setHistory(JSON.parse(saved));
      }
      setIsLoading(false);
    };
    
    loadHistory();
  }, [])

  const getFilteredHistory = () => {
    const now = new Date();
    const cutoff = new Date();
    if (timeRange === 'week') cutoff.setDate(now.getDate() - 7);
    if (timeRange === 'month') cutoff.setMonth(now.getMonth() - 1);
    return history.filter(h => new Date(h.timestamp) > cutoff);
  };

  const filtered = getFilteredHistory();
  const maliciousFiles = filtered.filter(h => h.verdict === 'MALICIOUS');
  
  const threatStats: ThreatStat[] = [
    { name: 'High Risk', count: maliciousFiles.filter(h => h.confidence >= 80).length, percentage: 0, trend: 'up' },
    { name: 'Medium Risk', count: maliciousFiles.filter(h => h.confidence >= 60 && h.confidence < 80).length, percentage: 0, trend: 'stable' },
    { name: 'Low Risk', count: maliciousFiles.filter(h => h.confidence < 60).length, percentage: 0, trend: 'down' },
  ];
  
  threatStats.forEach(stat => {
    stat.percentage = maliciousFiles.length > 0 ? (stat.count / maliciousFiles.length) * 100 : 0;
  });

  const getThreatTimeline = () => {
    const timeline: { [key: string]: number } = {};
    maliciousFiles.forEach(h => {
      const date = new Date(h.timestamp).toLocaleDateString();
      timeline[date] = (timeline[date] || 0) + 1;
    });
    return Object.entries(timeline).slice(-7);
  };

  const refreshData = () => {
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      setHistory(JSON.parse(saved));
      toast.success('Threat intelligence refreshed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Activity className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Threat Intelligence</h1>
              
              <p className="text-muted-foreground">
                Real-time threat analysis and security insights
              </p>
            </div>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{maliciousFiles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Detected in {timeRange}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {filtered.length > 0 ? ((maliciousFiles.length / filtered.length) * 100).toFixed(1) : 0}%
              </div>
              <Progress value={filtered.length > 0 ? (maliciousFiles.length / filtered.length) * 100 : 0} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Threat Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {maliciousFiles.length > 0 
                  ? (maliciousFiles.reduce((acc, h) => acc + h.confidence, 0) / maliciousFiles.length).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Average confidence</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={maliciousFiles.length > 10 ? "destructive" : maliciousFiles.length > 5 ? "default" : "secondary"} className="text-sm">
                {maliciousFiles.length > 10 ? "HIGH" : maliciousFiles.length > 5 ? "MEDIUM" : "LOW"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">Current threat level</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatStats.map((stat) => (
                  <div key={stat.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        {stat.name}
                        {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-red-500" />}
                        {stat.trend === 'down' && <TrendingUp className="h-3 w-3 text-emerald-500 rotate-180" />}
                      </span>
                      <span className="font-mono">{stat.count} threats ({stat.percentage.toFixed(1)}%)</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Threat Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {getThreatTimeline().length > 0 ? (
                <div className="space-y-3">
                  {getThreatTimeline().map(([date, count]) => (
                    <div key={date} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{date}</span>
                        <span className="font-mono text-red-500">{count} threats</span>
                      </div>
                      <Progress value={(count / Math.max(...getThreatTimeline().map(([, c]) => c), 1)) * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">No threat data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Threats
              </span>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-3 w-3" />
                Export Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {maliciousFiles.slice(0, 20).map((threat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{threat.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(threat.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="destructive">{threat.confidence}%</Badge>
                    </div>
                  </div>
                ))}
                {maliciousFiles.length === 0 && (
                  <div className="py-12 text-center">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">No threats detected</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}