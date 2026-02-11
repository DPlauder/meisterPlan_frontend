import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDelete } from '../../hooks/products/useProductDelete';
import { fetchProducts } from '../../services/products/productsService';
import type { product } from '../../types/product';
import ProductsListComponent from '../../components/products/ProductsList';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function ProductsListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook to handle product deletion
  // It provides methods to request, confirm, and cancel deletion
  const { confirmId, requestDelete, cancelDelete, confirmDelete } =
    useProductDelete(
      (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      },
      (err) => {
        console.error('Fehler beim Löschen:', err);
        setError('Löschen fehlgeschlagen');
      }
    );

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Lade Produkte...</p>;
  if (error) return <p className="p-4 text-red-600">Fehler: {error}</p>;

  return (
    <>
      <ProductsListComponent
        products={products}
        onAddProduct={() => navigate('/products/new')}
        onEditProduct={(product) => console.log('Bearbeiten:', product)}
        onDeleteProduct={requestDelete}
      />

      {confirmId && (
        <ConfirmDialog
          message="Möchtest du dieses Produkt wirklich löschen?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
