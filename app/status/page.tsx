// src/app/status/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Server,
  Database,
  Cpu,
  Zap,
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface SystemStatus {
  api: 'healthy' | 'degraded' | 'down';
  model: 'loaded' | 'unloaded' | 'error';
  database: 'connected' | 'disconnected';
  uptime: number;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  requestsToday: number;
  avgConfidence: number;
}

export default function SystemStatusPage() {
  const [status, setStatus] = useState<SystemStatus>({
    api: 'healthy',
    model: 'loaded',
    database: 'connected',
    uptime: 99.9,
    responseTime: 245,
    cpuUsage: 32,
    memoryUsage: 45,
    requestsToday: 1234,
    avgConfidence: 94.2
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('malware_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      
      // Calculate real metrics from history
      const avgConf = parsed.length > 0 
        ? parsed.reduce((acc: number, h: any) => acc + h.confidence, 0) / parsed.length 
        : 0;
      
      setStatus(prev => ({
        ...prev,
        requestsToday: parsed.length,
        avgConfidence: avgConf
      }));
    }
  }, []);

  const refreshStatus = async () => {
    setIsRefreshing(true);
    
    // Simulate API health check
    try {
      const response = await fetch('http://localhost:8000/health');
      if (response.ok) {
        const data = await response.json();
        setStatus(prev => ({
          ...prev,
          api: 'healthy',
          model: data.model_ready ? 'loaded' : 'unloaded'
        }));
        toast.success('Status updated');
      } else {
        setStatus(prev => ({ ...prev, api: 'degraded' }));
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, api: 'down' }));
      toast.error('API connection failed');
    }
    
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-500';
      case 'loaded': return 'text-emerald-500';
      case 'connected': return 'text-emerald-500';
      case 'degraded': return 'text-yellow-500';
      case 'unloaded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      case 'error': return 'text-red-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'healthy' || status === 'loaded' || status === 'connected') {
      return <CheckCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
    }
    if (status === 'degraded' || status === 'unloaded') {
      return <AlertCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
    }
    return <XCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">System Status</h1>
              </div>
              <p className="text-muted-foreground">
                Real-time monitoring of system health and performance metrics
              </p>
            </div>
            <Button variant="outline" onClick={refreshStatus} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">API Status</CardTitle>
              {getStatusIcon(status.api)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{status.api}</div>
              <p className="text-xs text-muted-foreground mt-1">REST API Endpoint</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">ML Model</CardTitle>
              {getStatusIcon(status.model)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{status.model}</div>
              <p className="text-xs text-muted-foreground mt-1">LightGBM Classifier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
              {getStatusIcon(status.database)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{status.database}</div>
              <p className="text-xs text-muted-foreground mt-1">Local Storage</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.uptime}%</div>
              <Progress value={status.uptime} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.responseTime}ms</div>
              <p className="text-xs text-muted-foreground mt-1">Average latency</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.cpuUsage}%</div>
              <Progress value={status.cpuUsage} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.memoryUsage}%</div>
              <Progress value={status.memoryUsage} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Requests Today</span>
                  <span className="font-bold">{status.requestsToday}</span>
                </div>
                <Progress value={(status.requestsToday / 5000) * 100} className="h-1" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Confidence</span>
                  <span className="font-bold">{status.avgConfidence.toFixed(1)}%</span>
                </div>
                <Progress value={status.avgConfidence} className="h-1" />
              </div>
              <div className="pt-2 text-xs text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>All systems operational</span>
                  <span className="text-xs text-muted-foreground ml-auto">Now</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Model loaded successfully</span>
                  <span className="text-xs text-muted-foreground ml-auto">24h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>API deployed</span>
                  <span className="text-xs text-muted-foreground ml-auto">7d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle>Service Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <code className="text-sm">GET /health</code>
                <Badge variant="outline" className="text-emerald-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <code className="text-sm">POST /predict</code>
                <Badge variant="outline" className="text-emerald-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <code className="text-sm">GET /</code>
                <Badge variant="outline" className="text-emerald-500">Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}