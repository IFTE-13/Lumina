import type { PredictionResponse } from './api';

export type PredictionResult = PredictionResponse;

export interface HistoryItem extends PredictionResponse {
  id: string;
  timestamp: Date;
  fileSize: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HealthStatus {
  status: string;
  model_ready: boolean;
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

