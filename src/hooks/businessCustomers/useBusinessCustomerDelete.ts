// hooks/useCustomerDelete.ts
import { useState } from 'react';

import { deleteBusinessCustomer } from '../../services/businessCustomers/businessCustomerService';

export function useBusinessCustomerDelete(
  onDeleted: (id: string) => void,
  onError?: (error: Error) => void
) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const requestDelete = (id: string) => setConfirmId(id);
  const cancelDelete = () => setConfirmId(null);

  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteBusinessCustomer(confirmId);
      onDeleted(confirmId);
    } catch (err: any) {
      onError?.(err);
    } finally {
      setConfirmId(null);
    }
  };

  return {
    confirmId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
