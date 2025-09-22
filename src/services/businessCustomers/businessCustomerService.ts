import { API_RESSOURCE } from '../../config/apiConfig';
import { apiFetch } from '../../lib/fetchClient';
import { businessCustomer } from '../../types/businessCustomer';

const BUSINESS_CUSTOMER_API = API_RESSOURCE.businessCustomers;

export async function fetchCustomers(): Promise<businessCustomer[]> {
  return apiFetch(`${BUSINESS_CUSTOMER_API}`, {
    method: 'GET',
  });
}
export async function fetchBusinessCustomerById(
  id: string
): Promise<businessCustomer> {
  return apiFetch(`${BUSINESS_CUSTOMER_API}/${id}`, {
    method: 'GET',
  });
}
export async function createBusinessCustomer(
  data: Omit<businessCustomer, 'id' | 'createdAt'>
): Promise<businessCustomer> {
  const response = await fetch(`${BUSINESS_CUSTOMER_API}`, {
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
export async function updateBusinessCustomer(
  id: string,
  data: Partial<Omit<businessCustomer, 'id' | 'createdAt'>>
): Promise<businessCustomer> {
  const response = await fetch(`${BUSINESS_CUSTOMER_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Kunde konnte nicht aktualisiert werden.');
  }

  const result = await response.json();
  return result;
}
export async function deleteBusinessCustomer(id: string): Promise<void> {
  try {
    const response = await apiFetch<{ success: boolean }>(
      `${BUSINESS_CUSTOMER_API}/${id}`,
      {
        method: 'DELETE',
      }
    );

    console.log('Delete Response from Gateway:', response);

    // Gateway gibt JSON zurück: { success: boolean }
    if (response.success !== true) {
      throw new Error('Kunde konnte nicht gelöscht werden');
    }

    console.log('Customer successfully deleted');
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}
