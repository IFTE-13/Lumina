export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  model_ready: boolean;
}

export interface PredictionResponse {
  filename: string;
  verdict: 'BENIGN' | 'MALICIOUS';
  confidence: number;
  probability_benign: number;
  probability_malicious: number;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}


export interface ErrorResponse {
  detail?: string;
  message?: string;
}