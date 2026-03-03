import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDelete } from '../../hooks/products/useProductDelete';
import { fetchProducts } from '../../services/products/productsService';
import {
  fetchInventoryItemByArticleNumber,
  fetchInventoryItems,
} from '../../services/inventory/inventoryService';
import type { product } from '../../types/product';
import type { item } from '../../types/item';
import ProductsListComponent from '../../components/products/ProductsList';
import ProductDetailModal from '../../components/products/ProductDetailModal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function ProductsListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<product[]>([]);
  const [inventoryItems, setInventoryItems] = useState<item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
  const [selectedInventoryItem, setSelectedInventoryItem] =
    useState<item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeArticleNumber = (value: string) => value.trim().toLowerCase();

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
    Promise.all([fetchProducts(), fetchInventoryItems()])
      .then(([productsData, inventoryData]) => {
        setProducts(productsData);
        setInventoryItems(inventoryData);
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
        onViewProduct={async (product) => {
          try {
            let linkedInventoryItem: item | null = null;

            try {
              linkedInventoryItem = await fetchInventoryItemByArticleNumber(
                product.articleNum
              );
            } catch {
              linkedInventoryItem = null;
            }

            if (!linkedInventoryItem) {
              const latestInventoryItems = await fetchInventoryItems();
              setInventoryItems(latestInventoryItems);

              linkedInventoryItem =
                latestInventoryItems.find(
                  (inventoryItem) =>
                    normalizeArticleNumber(inventoryItem.articleNumber) ===
                    normalizeArticleNumber(product.articleNum)
                ) || null;
            }

            if (!linkedInventoryItem) {
              throw new Error('Kein zugehöriger Lagerartikel gefunden');
            }

            setSelectedProduct(product);
            setSelectedInventoryItem(linkedInventoryItem);
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : 'Detaildaten konnten nicht geladen werden'
            );
          }
        }}
      />

      <ProductDetailModal
        productData={selectedProduct}
        inventoryData={selectedInventoryItem}
        onEdit={() => {
          if (selectedProduct) {
            console.log('Bearbeiten:', selectedProduct);
          }
        }}
        onDelete={() => {
          if (selectedProduct) {
            requestDelete(selectedProduct.id);
            setSelectedProduct(null);
            setSelectedInventoryItem(null);
          }
        }}
        onClose={() => {
          setSelectedProduct(null);
          setSelectedInventoryItem(null);
        }}
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
