// src/lib/api.ts
import axios from 'axios';
import { PredictionResult, HealthStatus } from '@/app/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await api.get('/health');
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
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Prediction failed:', error);
    return {
      success: false,
      error: error.response?.data?.detail || 'Failed to analyze file',
    };
  }
};

export const predictBatch = async (files: File[]): Promise<{ success: boolean; data?: any; error?: string }> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await api.post('/predict/batch', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Batch analysis failed',
    };
  }
};