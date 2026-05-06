'use client';

import { useState, useCallback } from 'react';

interface UseMutationOptions<T, V> {
  mutationFn: (variables: V) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useMutation<T, V>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationOptions<T, V>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (variables: V) => {
      setIsPending(true);
      setError(null);
      
      try {
        const result = await mutationFn(variables);
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
      } finally {
        setIsPending(false);
      }
    },
    [mutationFn, onSuccess, onError]
  );

  return { mutate, isPending, error, data };
}