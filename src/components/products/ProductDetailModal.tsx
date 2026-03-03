import type React from 'react';
import {
  X,
  Package,
  Hash,
  FileText,
  Euro,
  Calendar,
  Box,
  MapPin,
} from 'lucide-react';
import type { product } from '../../types/product';
import type { item } from '../../types/item';

interface ProductDetailModalProps {
  productData: product | null;
  inventoryData: item | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  productData,
  inventoryData,
  onClose,
}: ProductDetailModalProps) {
  if (!productData || !inventoryData) return null;

  const articleNumber = productData.articleNum;
  const name = productData.name;
  const description = productData.description || 'Keine Beschreibung';
  const price = productData.price;
  const createdAt = productData.createdAt;
  const quantity = inventoryData.quantity;
  const location = inventoryData.location;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);

  const formatQuantity = (quantity: number) =>
    new Intl.NumberFormat('de-DE').format(quantity);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Produktdetails
          </h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            title="Schließen"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Artikelnummer: {articleNumber}
            </p>
          </div>

          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">
              Produktinformationen
            </h4>

            <div className="flex items-start gap-4">
              <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Beschreibung
                </p>
                <p className="text-sm text-gray-900">{description}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Euro className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Preis
                </p>
                <p className="text-sm text-gray-900">{formatPrice(price)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Erstellt am
                </p>
                <p className="text-sm text-gray-900">{formatDate(createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">
              Lagerinformationen
            </h4>

            <div className="flex items-start gap-4">
              <Box className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Bestand
                </p>
                <p className="text-sm text-gray-900">
                  {formatQuantity(quantity)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Lagerort
                </p>
                <p className="text-sm text-gray-900">{location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-end items-center">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
