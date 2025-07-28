import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../../services/businessCustomers/businessCustomerService';

export default function CustomersList() {
  const [customers, setCustomers] = useState<any[]>([]);
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

  if (loading) return <p>Lade Kunden...</p>;
  if (error) return <p>Fehler: {error}</p>;

  if (customers.length === 0) return <p>Keine Kunden vorhanden</p>;

  return (
    <ul>
      {customers.map((c) => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}
