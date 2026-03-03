import React, { useEffect, useState } from 'react';
import { useInventoryDelete } from '../../hooks/inventory/useInventoryDelete';
import { fetchInventoryItems } from '../../services/inventory/inventoryService';
import {
  fetchProductByArticleNum,
  fetchProducts,
} from '../../services/products/productsService';
import type { item } from '../../types/item';
import type { product } from '../../types/product';
import InventoryList from '../../components/inventory/InventoryList';
import ProductDetailModal from '../../components/products/ProductDetailModal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function Inventory() {
  const [items, setItems] = useState<item[]>([]);
  const [products, setProducts] = useState<product[]>([]);
  const [selectedItem, setSelectedItem] = useState<item | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeArticleNumber = (value: string) => value.trim().toLowerCase();

  // Hook to handle inventory item deletion
  // It provides methods to request, confirm, and cancel deletion
  const { confirmId, requestDelete, cancelDelete, confirmDelete } =
    useInventoryDelete(
      (articleNumber) => {
        setItems((prev) =>
          prev.filter((i) => i.articleNumber !== articleNumber)
        );
      },
      (err) => {
        console.error('Fehler beim Löschen:', err);
        setError('Löschen fehlgeschlagen');
      }
    );

  useEffect(() => {
    Promise.all([fetchInventoryItems(), fetchProducts()])
      .then(([inventoryData, productsData]) => {
        setItems(inventoryData);
        setProducts(productsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Lade Inventar...</p>;
  if (error) return <p className="p-4 text-red-600">Fehler: {error}</p>;

  return (
    <>
      <InventoryList
        items={items}
        onAddItem={() => console.log('Neuen Artikel hinzufügen')}
        onViewItem={async (item) => {
          try {
            const linkedProduct = await fetchProductByArticleNum(
              item.articleNumber
            );

            setProducts((prevProducts) => {
              const productExists = prevProducts.some(
                (product) => product.id === linkedProduct.id
              );

              if (productExists) return prevProducts;
              return [...prevProducts, linkedProduct];
            });

            setSelectedItem(item);
            setSelectedProduct(linkedProduct);
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
        inventoryData={selectedItem}
        onEdit={() => {
          if (selectedItem) {
            console.log('Bearbeiten:', selectedItem);
          }
        }}
        onDelete={() => {
          if (selectedItem) {
            requestDelete(selectedItem.articleNumber);
            setSelectedItem(null);
            setSelectedProduct(null);
          }
        }}
        onClose={() => {
          setSelectedItem(null);
          setSelectedProduct(null);
        }}
      />

      {confirmId && (
        <ConfirmDialog
          message="Möchtest du diesen Artikel wirklich löschen?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
