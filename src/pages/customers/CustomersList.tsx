import React, { useEffect, useState } from 'react';
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
  const [confirmId, setConfirmId] = useState<string | null>(null); // ID des Kunden, der gelöscht werden soll

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

  const handleConfirmDelete = async () => {
    if (!confirmId) return;
    try {
      await deleteBusinessCustomer(confirmId);
      setCustomers((prev) => prev.filter((c) => c.id !== confirmId));
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
      setError('Löschen fehlgeschlagen');
    } finally {
      setConfirmId(null); // Dialog schließen
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Lade Kunden...</p>;
  if (error) return <p className="p-4 text-red-600">Fehler: {error}</p>;

  return (
    <>
      <BusinessCustomerList
        customers={customers}
        onAddCustomer={() => console.log('Neuer Kunde hinzufügen')}
        onEditCustomer={(customer) => console.log('Bearbeiten:', customer)}
        onDeleteCustomer={(id) => setConfirmId(id)} // Statt direkt löschen → ID merken
      />

      {confirmId && (
        <ConfirmDialog
          message="Möchtest du diesen Kunden wirklich löschen?"
          onCancel={() => setConfirmId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
