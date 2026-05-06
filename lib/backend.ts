// src/lib/backend.ts
import type { HealthResponse, PredictionResponse } from '@/app/types/api';

const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error('BACKEND_URL is not defined in environment variables');
}

async function backendFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BACKEND_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown error');
    throw new Error(`Backend ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchHealth(): Promise<HealthResponse> {
  return backendFetch<HealthResponse>('/health');
}

export async function fetchPrediction(
  formData: FormData
): Promise<PredictionResponse> {
  const url = `${BACKEND_URL}/predict`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown error');
    throw new Error(`Backend ${response.status}: ${text}`);
  }

  return response.json() as Promise<PredictionResponse>;
}