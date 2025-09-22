import { API_RESSOURCE } from '../../config/apiConfig';
import { apiFetch, apiDelete } from '../../lib/fetchClient';
import { product } from '../../types/product';

const PRODUCT_API = API_RESSOURCE.products;

export async function fetchProducts(): Promise<product[]> {
  return apiFetch(`${PRODUCT_API}`, {
    method: 'GET',
  });
}

export async function fetchProductById(id: string): Promise<product> {
  return apiFetch(`${PRODUCT_API}/${id}`, {
    method: 'GET',
  });
}

export async function createProduct(
  data: Omit<product, 'id' | 'createdAt'>
): Promise<product> {
  return apiFetch(`${PRODUCT_API}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<product, 'id' | 'createdAt'>>
): Promise<product> {
  return apiFetch(`${PRODUCT_API}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const success = await apiDelete(`${PRODUCT_API}/${id}`);

    console.log('Delete Product Response from Gateway:', success);

    if (!success) {
      throw new Error('Produkt konnte nicht gelöscht werden');
    }

    console.log('Product successfully deleted');
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}
