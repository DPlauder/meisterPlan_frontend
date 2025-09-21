import { useState } from 'react';

import { updateBusinessCustomer } from '../../services/businessCustomers/businessCustomerService';
import type { businessCustomer } from '../../types/businessCustomer';

export function useBusinessCustomerUpdate(
  onUpdated: (customer: businessCustomer) => void,
  onError?: (error: Error) => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCustomer = async (
    id: string,
    data: Partial<Omit<businessCustomer, 'id' | 'createdAt'>>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCustomer = await updateBusinessCustomer(id, data);
      onUpdated(updatedCustomer);
    } catch (err: any) {
      setError(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateCustomer,
  };
}
