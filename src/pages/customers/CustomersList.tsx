import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../../services/businessCustomers/businessCustomerService';
import type { businessCustomer } from '../../types/businessCustomer';
import BusinessCustomerList from '../../components/businessCustomers/BusinessCustomerList';

export default function CustomersList() {
  const [customers, setCustomers] = useState<businessCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <BusinessCustomerList
      customers={customers}
      onAddCustomer={() => console.log('Neuer Kunde hinzufügen')}
      onEditCustomer={(customer) => console.log('Bearbeiten:', customer)}
      onDeleteCustomer={(id) => console.log('Löschen:', id)}
    />
  );
}
