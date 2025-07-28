import { API_ENDPOINTS } from '../../config/apiConfig';
import { apiFetch } from '../../lib/fetchClient';
import { businessCustomer } from '../../types/businessCustomer';

const BUSINESS_CUSTOMER_API = API_ENDPOINTS.customers;

export async function fetchCustomers(): Promise<businessCustomer[]> {
  return apiFetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
    method: 'GET',
  });
}

export async function createBusinessCustomer(
  data: Omit<businessCustomer, 'id' | 'createdAt'>
): Promise<businessCustomer> {
  const response = await fetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Kunde konnte nicht erstellt werden.');
  }

  const result = await response.json();
  return result;
}
