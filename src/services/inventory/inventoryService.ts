import { API_RESSOURCE } from '../../config/apiConfig';
import { apiFetch, apiDelete } from '../../lib/fetchClient';
import { item } from '../../types/item';

const INVENTORY_API = API_RESSOURCE.inventory;

export async function fetchInventoryItems(): Promise<item[]> {
  return apiFetch(`${INVENTORY_API}`, {
    method: 'GET',
  });
}
export async function fetchInventoryItemByArticleNumber(
  articleNumber: string
): Promise<item> {
  return apiFetch(`${INVENTORY_API}/${articleNumber}`, {
    method: 'GET',
  });
}
export async function createInventoryItem(
  data: Omit<item, 'articleNumber'>
): Promise<item> {
  return apiFetch(`${INVENTORY_API}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export async function updateInventoryItem(
  articleNumber: string,
  data: Partial<Omit<item, 'articleNumber'>>
): Promise<item> {
  return apiFetch(`${INVENTORY_API}/${articleNumber}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export async function deleteInventoryItem(
  articleNumber: string
): Promise<void> {
  try {
    const success = await apiDelete(`${INVENTORY_API}/${articleNumber}`);
    if (!success) {
      throw new Error('Failed to delete inventory item');
    }
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
}
