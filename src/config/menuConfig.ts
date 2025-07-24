// src/config/menu.ts

import type React from 'react';
import {
  Home,
  Users,
  Box,
  BarChart2,
  Settings,
  ClipboardList,
} from 'lucide-react';

export interface MenuItemConfig {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType;
  children?: MenuItemConfig[];
}

export const menuItemsConfig: MenuItemConfig[] = [
  {
    id: '1',
    label: 'Home',
    path: '/',
    icon: Home,
  },
  {
    id: '2',
    label: 'Kunden',
    path: '/customers',
    icon: Users,
    children: [
      { id: '2-1', label: 'Alle Kunden', path: '/customers/all' },
      { id: '2-2', label: 'Neuen Kunden anlegen', path: '/customers/new' },
    ],
  },
  {
    id: '3',
    label: 'Produkte & Lager',
    path: '/products',
    icon: Box,
    children: [
      { id: '3-1', label: 'Produktübersicht', path: '/products/list' },
      { id: '3-2', label: 'Lagerbestände', path: '/products/inventory' },
    ],
  },
  {
    id: '4',
    label: 'Bestellungen & Rechnungen',
    path: '/orders',
    icon: ClipboardList,
    children: [
      { id: '4-1', label: 'Bestellungen', path: '/orders/list' },
      { id: '4-2', label: 'Rechnungen', path: '/invoices' },
    ],
  },
  {
    id: '5',
    label: 'Berichte',
    path: '/reports',
    icon: BarChart2,
  },
  {
    id: '6',
    label: 'Einstellungen',
    path: '/settings',
    icon: Settings,
  },
];
