import React, { useEffect, useState } from 'react';
import { useInventoryDelete } from '../../hooks/inventory/useInventoryDelete';
import { fetchInventoryItems } from '../../services/inventory/inventoryService';
import type { item } from '../../types/item';
import InventoryList from '../../components/inventory/InventoryList';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function Inventory() {
  const [items, setItems] = useState<item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook to handle inventory item deletion
  // It provides methods to request, confirm, and cancel deletion
  const { confirmId, requestDelete, cancelDelete, confirmDelete } =
    useInventoryDelete(
      (articleNumber) => {
        setItems((prev) =>
          prev.filter((i) => i.articleNumber !== articleNumber)
        );
      },
      (err) => {
        console.error('Fehler beim Löschen:', err);
        setError('Löschen fehlgeschlagen');
      }
    );

  useEffect(() => {
    fetchInventoryItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Lade Inventar...</p>;
  if (error) return <p className="p-4 text-red-600">Fehler: {error}</p>;

  return (
    <>
      <InventoryList
        items={items}
        onAddItem={() => console.log('Neuen Artikel hinzufügen')}
        onEditItem={(inv) => console.log('Bearbeiten:', inv)}
        onDeleteItem={requestDelete}
      />

      {confirmId && (
        <ConfirmDialog
          message="Möchtest du diesen Artikel wirklich löschen?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
