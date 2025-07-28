import { API_ENDPOINTS } from '../../config/apiConfig';
import { apiFetch } from '../../lib/fetchClient';
import { businessCustomer } from '../../types/businessCustomer';

const BUSINESS_CUSTOMER_API = API_ENDPOINTS.customers;

export async function fetchCustomers(): Promise<businessCustomer[]> {
  console.log('Fetching customers from:', BUSINESS_CUSTOMER_API);
  return apiFetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
    method: 'GET',
  });
}

export async function createCustomer(data: any) {
  const response = await fetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Fehler beim Erstellen des Kunden');
  }
  return response.json();
}
