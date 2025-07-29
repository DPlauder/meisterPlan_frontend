// components/CustomerList.tsx

import React, { useMemo, useState } from 'react';
import {
  Search,
  Users,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  ChevronUp,
  ChevronDown,
  Plus,
} from 'lucide-react';
import type { businessCustomer } from '../../types/businessCustomer';

type SortField = keyof businessCustomer;
type SortDirection = 'asc' | 'desc';

interface CustomerListProps {
  customers: businessCustomer[];
  onEditCustomer?: (customer: businessCustomer) => void;
  onDeleteCustomer?: (customerId: string) => void;
  onAddCustomer?: () => void;
}

export default function CustomerList({
  customers,
  onEditCustomer,
  onDeleteCustomer,
  onAddCustomer,
}: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.country &&
          customer.country.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      return sortDirection === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

    return filtered;
  }, [customers, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(
    filteredAndSortedCustomers.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              Alle Kunden ({filteredAndSortedCustomers.length})
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kunden suchen..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white hover:border-gray-400 w-full sm:w-64"
              />
            </div>

            {/* Add Customer Button */}
            {onAddCustomer && (
              <button
                onClick={onAddCustomer}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Neuer Kunde
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Firmenname
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Kontakt
                  <SortIcon field="email" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('city')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Standort
                  <SortIcon field="city" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Erstellt
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                  {customer.taxNumber && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Hash className="w-3 h-3" />
                      {customer.taxNumber}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  {customer.phone && (
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.city}</div>
                  {customer.country && (
                    <div className="text-xs text-gray-500">
                      {customer.country}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {formatDate(customer.createdAt || new Date().toISOString())}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onEditCustomer && (
                      <button
                        onClick={() => onEditCustomer(customer)}
                        title="Bearbeiten"
                      >
                        <Edit className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                      </button>
                    )}
                    {onDeleteCustomer && (
                      <button
                        onClick={() => onDeleteCustomer(customer.id)}
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAndSortedCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keine Kunden gefunden
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Andere Suchbegriffe ausprobieren.'
                : 'Noch keine Kunden vorhanden.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <div>
            Zeige {startIndex + 1} bis{' '}
            {Math.min(
              startIndex + itemsPerPage,
              filteredAndSortedCustomers.length
            )}{' '}
            von {filteredAndSortedCustomers.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Zurück
            </button>
            <span>
              Seite {currentPage} von {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Weiter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
