import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import CustomersList from '../pages/customers/CustomersList';
import CustomersNew from '../pages/customers/CustomersNew';
import ProductList from '../pages/products/ProductsList';
import Inventory from '../pages/products/Inventory';
import Orders from '../pages/orders/Orders';
import Invoices from '../pages/orders/Invoices';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Home />} />
      <Route path="customers/all" element={<CustomersList />} />
      <Route path="customers/new" element={<CustomersNew />} />
      <Route path="products/list" element={<ProductList />} />
      <Route path="products/inventory" element={<Inventory />} />
      <Route path="orders/list" element={<Orders />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
);

export default AppRouter;
