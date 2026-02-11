// components/InventoryList.tsx

import React, { useMemo, useState } from 'react';
import {
  Search,
  Package,
  Edit,
  Trash2,
  Hash,
  MapPin,
  Box,
  ChevronUp,
  ChevronDown,
  Plus,
} from 'lucide-react';
import type { item } from '../../types/item';

type SortField = keyof item;
type SortDirection = 'asc' | 'desc';

interface InventoryListProps {
  items: item[];
  onEditItem?: (item: item) => void;
  onDeleteItem?: (articleNumber: string) => void;
  onAddItem?: () => void;
}

export default function InventoryList({
  items,
  onEditItem,
  onDeleteItem,
  onAddItem,
}: InventoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((inv) =>
      [inv.name, inv.articleNumber, inv.location, inv.quantity.toString()]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortField === 'quantity') {
        return sortDirection === 'asc'
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      }

      return sortDirection === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });

    return filtered;
  }, [items, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredAndSortedItems.slice(
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

  const formatQuantity = (quantity: number) =>
    new Intl.NumberFormat('de-DE').format(quantity);

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
            <Package className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              Lagerbestand ({filteredAndSortedItems.length})
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Inventar suchen..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white hover:border-gray-400 w-full sm:w-64"
              />
            </div>

            {/* Add Item Button */}
            {onAddItem && (
              <button
                onClick={onAddItem}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Neuer Artikel
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
                  onClick={() => handleSort('articleNumber')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Artikelnummer
                  <SortIcon field="articleNumber" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Artikelname
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Bestand
                  <SortIcon field="quantity" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                >
                  Lagerort
                  <SortIcon field="location" />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((inv) => (
              <tr
                key={inv.articleNumber}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {inv.articleNumber}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Hash className="w-3 h-3" />
                    Artikel-ID
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{inv.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {formatQuantity(inv.quantity)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Box className="w-3 h-3" />
                    Verfügbar
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{inv.location}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    Lagerplatz
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onEditItem && (
                      <button
                        onClick={() => onEditItem(inv)}
                        title="Bearbeiten"
                      >
                        <Edit className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                      </button>
                    )}
                    {onDeleteItem && (
                      <button
                        onClick={() => onDeleteItem(inv.articleNumber)}
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
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Kein Inventar gefunden
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Andere Suchbegriffe ausprobieren.'
                : 'Noch keine Artikel vorhanden.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <div>
            Zeige {startIndex + 1} bis{' '}
            {Math.min(startIndex + itemsPerPage, filteredAndSortedItems.length)}{' '}
            von {filteredAndSortedItems.length}
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
