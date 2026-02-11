import type React from 'react';
import {
  X,
  Building,
  Mail,
  Phone,
  MapPin,
  Hash,
  Calendar,
  Globe,
  Trash2,
} from 'lucide-react';
import type { businessCustomer } from '../../types/businessCustomer';
import { useState } from 'react';

interface CustomerDetailModalProps {
  customer: businessCustomer | null;
  onClose: () => void;
  onDeleteCustomer?: (customerId: string) => void;
}

export default function CustomerDetailModal({
  customer,
  onClose,
  onDeleteCustomer,
}: CustomerDetailModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!customer) return null;

  const handleDelete = () => {
    if (onDeleteCustomer) {
      onDeleteCustomer(customer.id);
      onClose();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Building className="w-6 h-6" />
            Kundendetails
          </h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            title="Schließen"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Firmenname und ID */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {customer.name}
            </h3>
            {customer.id && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                ID: {customer.id}
              </p>
            )}
          </div>

          {/* Kontaktinformationen */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Kontaktinformationen
            </h4>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  E-Mail-adresse
                </p>
                <p className="text-sm text-gray-900 break-all">
                  {customer.email}
                </p>
              </div>
            </div>

            {/* Telefon */}
            {customer.phone && (
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Telefonnummer
                  </p>
                  <p className="text-sm text-gray-900">{customer.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Adressinformationen */}
          <div className="space-y-4 pb-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">Adresse</h4>

            {/* Straße */}
            {customer.address && (
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Straße
                  </p>
                  <p className="text-sm text-gray-900">{customer.address}</p>
                </div>
              </div>
            )}

            {/* Stadt und Postleitzahl */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.city && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Stadt
                  </p>
                  <p className="text-sm text-gray-900">{customer.city}</p>
                </div>
              )}
              {customer.postalCode && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Postleitzahl
                  </p>
                  <p className="text-sm text-gray-900">{customer.postalCode}</p>
                </div>
              )}
            </div>

            {/* Land */}
            {customer.country && (
              <div className="flex items-start gap-4">
                <Globe className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Land
                  </p>
                  <p className="text-sm text-gray-900">{customer.country}</p>
                </div>
              </div>
            )}
          </div>

          {/* Weitere Informationen */}
          <div className="space-y-4">
            {customer.taxNumber && (
              <div className="flex items-start gap-4">
                <Hash className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Steuernummer
                  </p>
                  <p className="text-sm text-gray-900">{customer.taxNumber}</p>
                </div>
              </div>
            )}

            {customer.createdAt && (
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Erstellt am
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatDate(customer.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {showDeleteConfirm ? (
          <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 bg-red-50 rounded-b-2xl space-y-3">
            <p className="text-sm font-medium text-red-900">
              Möchtest du diesen Kunden wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Löschen
              </button>
            </div>
          </div>
        ) : (
          <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-between items-center">
            {onDeleteCustomer && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Löschen
              </button>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
