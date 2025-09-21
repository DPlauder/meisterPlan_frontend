import { API_ENDPOINTS } from '../../config/apiConfig';
import { apiFetch, apiDelete } from '../../lib/fetchClient';
import { businessCustomer } from '../../types/businessCustomer';

const BUSINESS_CUSTOMER_API = API_ENDPOINTS.customers;

export async function fetchCustomers(): Promise<businessCustomer[]> {
  return apiFetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
    method: 'GET',
  });
}
export async function fetchBusinessCustomerById(
  id: string
): Promise<businessCustomer> {
  return apiFetch(`${BUSINESS_CUSTOMER_API}/business-customers/${id}`, {
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
export async function updateBusinessCustomer(
  id: string,
  data: Partial<Omit<businessCustomer, 'id' | 'createdAt'>>
): Promise<businessCustomer> {
  const response = await fetch(
    `${BUSINESS_CUSTOMER_API}/business-customers/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Kunde konnte nicht aktualisiert werden.');
  }

  const result = await response.json();
  return result;
}
export async function deleteBusinessCustomer(id: string): Promise<void> {
  try {
    const success = await apiDelete(
      `${BUSINESS_CUSTOMER_API}/business-customers/${id}`
    );

    console.log('Delete Response from Gateway:', success);

    // apiDelete gibt boolean zurück basierend auf response.ok oder response content
    if (!success) {
      throw new Error('Kunde konnte nicht gelöscht werden');
    }

    console.log('Customer successfully deleted');
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}
