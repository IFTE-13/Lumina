import axios, { AxiosError } from 'axios';
import { PredictionResult, HealthStatus } from '@/app/types';
import { ErrorResponse, PredictionResponse } from '@/app/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

interface BatchPredictionResponse {
  results: PredictionResponse[];
  total: number;
  successful: number;
  failed: number;
}


export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await api.get<HealthStatus>('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'unhealthy', model_ready: false };
  }
};

export const predictMalware = async (file: File): Promise<{ success: boolean; data?: PredictionResult; error?: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post<PredictionResult>('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error('Prediction failed:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.detail || axiosError.response?.data?.message || 'Failed to analyze file';
      return { success: false, error: errorMessage };
    }
    
    const genericError = error instanceof Error ? error.message : 'Failed to analyze file';
    return { success: false, error: genericError };
  }
};

export const predictBatch = async (files: File[]): Promise<{ success: boolean; data?: BatchPredictionResponse; error?: string }> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await api.post<BatchPredictionResponse>('/predict/batch', formData);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.detail || axiosError.response?.data?.message || 'Batch analysis failed';
      return { success: false, error: errorMessage };
    }
    
    const genericError = error instanceof Error ? error.message : 'Batch analysis failed';
    return { success: false, error: genericError };
  }
};