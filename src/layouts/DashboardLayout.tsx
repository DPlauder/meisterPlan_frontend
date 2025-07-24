import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/ui/Header/Header';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
