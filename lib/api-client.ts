// src/lib/api-client.ts
import type { ApiResult, HealthResponse, PredictionResponse } from '@/app/types/api';

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  const result = await response.json() as ApiResult<T>;
  return result;
}

export async function checkHealth(): Promise<ApiResult<HealthResponse>> {
  return apiFetch<HealthResponse>('/api/health');
}

export async function predictMalware(
  file: File
): Promise<ApiResult<PredictionResponse>> {
  const formData = new FormData();
  formData.append('file', file);

  return apiFetch<PredictionResponse>('/api/predict', {
    method: 'POST',
    body: formData,
  });
}