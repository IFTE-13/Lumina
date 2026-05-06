// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Shield, 
  ShieldAlert, 
  TrendingUp,
  CalendarDays,
  Download,
  TrendingDown,
  Clock,
  FileSearch,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import type { HistoryItem } from '@/app/types';

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
    }
    setIsLoading(false);
  }, []);

  const getFilteredHistory = () => {
    const now = new Date();
    const cutoff = new Date();
    if (timeRange === 'week') cutoff.setDate(now.getDate() - 7);
    if (timeRange === 'month') cutoff.setMonth(now.getMonth() - 1);
    
    return history.filter(h => new Date(h.timestamp) > cutoff);
  };

  const filtered = getFilteredHistory();
  const malicious = filtered.filter(h => h.verdict === 'MALICIOUS').length;
  const benign = filtered.filter(h => h.verdict === 'BENIGN').length;
  const avgConfidence = filtered.reduce((acc, h) => acc + h.confidence, 0) / (filtered.length || 1);
  const detectionRate = filtered.length > 0 ? (malicious / filtered.length) * 100 : 0;

  // Get daily activity for chart
  const getDailyActivity = () => {
    const days: { [key: string]: { malicious: number; benign: number } } = {};
    filtered.forEach(h => {
      const date = new Date(h.timestamp).toLocaleDateString();
      if (!days[date]) days[date] = { malicious: 0, benign: 0 };
      if (h.verdict === 'MALICIOUS') days[date].malicious++;
      else days[date].benign++;
    });
    return Object.entries(days).slice(-7);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-8 w-8 animate-pulse text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your malware analysis overview and statistics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/threat-detector">
                  <Zap className="mr-2 h-4 w-4" />
                  New Analysis
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { value: 'week', label: 'Last 7 Days' },
            { value: 'month', label: 'Last 30 Days' },
            { value: 'all', label: 'All Time' }
          ].map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? 'default' : 'outline'}
              onClick={() => setTimeRange(range.value as any)}
              size="sm"
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
              <div className="rounded-lg bg-primary/10 p-2">
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{filtered.length}</div>
              <p className="mt-1 text-xs text-muted-foreground">Files analyzed</p>
              {filtered.length > 0 && (
                <div className="mt-3 flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{filtered.length} this period</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Malicious Detected</CardTitle>
              <div className="rounded-lg bg-red-500/10 p-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{malicious}</div>
              <p className="mt-1 text-xs text-muted-foreground">{detectionRate.toFixed(1)}% detection rate</p>
              <Progress value={detectionRate} className="mt-3 h-1" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Benign Files</CardTitle>
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <Shield className="h-4 w-4 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">{benign}</div>
              <p className="mt-1 text-xs text-muted-foreground">{((benign / (filtered.length || 1)) * 100).toFixed(1)}% of total</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgConfidence.toFixed(1)}%</div>
              <p className="mt-1 text-xs text-muted-foreground">Detection confidence</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Based on {filtered.length} analyses</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity Section */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Activity Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getDailyActivity().length > 0 ? (
                <div className="space-y-4">
                  {getDailyActivity().map(([date, counts]) => (
                    <div key={date} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{date}</span>
                        <div className="flex gap-3">
                          <span className="text-red-500">Malicious: {counts.malicious}</span>
                          <span className="text-emerald-500">Benign: {counts.benign}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div 
                          className="h-2 rounded-full bg-red-500 transition-all"
                          style={{ width: `${(counts.malicious / (counts.malicious + counts.benign || 1)) * 100}%` }}
                        />
                        <div 
                          className="h-2 rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${(counts.benign / (counts.malicious + counts.benign || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FileSearch className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No activity data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="font-bold text-emerald-500">{((benign / (filtered.length || 1)) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(benign / (filtered.length || 1)) * 100} className="h-1" />
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-muted-foreground">Threat Level</span>
                <Badge variant={detectionRate > 50 ? "destructive" : "secondary"}>
                  {detectionRate > 50 ? "High" : detectionRate > 25 ? "Medium" : "Low"}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Threats Blocked</span>
                <span className="font-bold text-red-500">{malicious}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </span>
                {filtered.length > 5 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/history">View All →</Link>
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filtered.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.verdict === 'MALICIOUS' ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
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
                {filtered.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No recent activity</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link href="/threat-detector">Start your first analysis →</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" asChild>
                <Link href="/threat-detector">
                  New Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/compare">
                  Compare Files
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/lookup">
                  Hash Lookup
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/batch-reports">
                  Batch Reports
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}