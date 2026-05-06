'use client';

import { toast } from 'sonner';

export const useToast = () => {
  return {
    toast: {
      success: (message: string) => toast.success(message),
      error: (message: string) => toast.error(message),
      loading: (message: string) => toast.loading(message),
      dismiss: (id: string) => toast.dismiss(id),
    },
  };
};