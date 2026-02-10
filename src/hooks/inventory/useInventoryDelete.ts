// hooks/useInventoryDelete.ts
import { useState } from 'react';

import { deleteInventoryItem } from '../../services/inventory/inventoryService';

export function useInventoryDelete(
  onDeleted: (articleNumber: string) => void,
  onError?: (error: Error) => void
) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const requestDelete = (articleNumber: string) => setConfirmId(articleNumber);
  const cancelDelete = () => setConfirmId(null);

  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteInventoryItem(confirmId);
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
