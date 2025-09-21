import React, { useEffect, useState } from 'react';
import { useBusinessCustomerDelete } from '../../hooks/businessCustomers/useBusinessCustomerDelete';
import {
  deleteBusinessCustomer,
  fetchCustomers,
} from '../../services/businessCustomers/businessCustomerService';
import type { businessCustomer } from '../../types/businessCustomer';
import BusinessCustomerList from '../../components/businessCustomers/BusinessCustomerList';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function CustomersList() {
  const [customers, setCustomers] = useState<businessCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook to handle customer deletion
  // It provides methods to request, confirm, and cancel deletion
  const { confirmId, requestDelete, cancelDelete, confirmDelete } =
    useBusinessCustomerDelete(
      (id) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      },
      (err) => {
        console.error('Fehler beim Löschen:', err);
        setError('Löschen fehlgeschlagen');
      }
    );

  useEffect(() => {
    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Lade Kunden...</p>;
  if (error) return <p className="p-4 text-red-600">Fehler: {error}</p>;

  return (
    <>
      <BusinessCustomerList
        customers={customers}
        onAddCustomer={() => console.log('Neuer Kunde hinzufügen')}
        onEditCustomer={(customer) => console.log('Bearbeiten:', customer)}
        onDeleteCustomer={requestDelete}
      />

      {confirmId && (
        <ConfirmDialog
          message="Möchtest du diesen Kunden wirklich löschen?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
