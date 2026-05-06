'use client';

import { useEffect, useState } from 'react';
import { checkHealth } from '@/lib/api-client';

export function useHealthCheck() {
  const [isHealthy, setIsHealthy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const checkBackend = async () => {
    try {
      const result = await checkHealth();
      setIsHealthy(result.success === true && result.data?.model_ready === true);
    } catch {
      setIsHealthy(false);
    } finally {
      setIsLoading(false);
    }
  };

  checkBackend();
  const interval = setInterval(checkBackend, 30000);
  return () => clearInterval(interval);
}, []);
  return { isHealthy, isLoading };
}