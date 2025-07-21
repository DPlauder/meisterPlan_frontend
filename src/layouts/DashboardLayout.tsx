import React from 'react';
import Header from '../components/ui/Header/Header';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div >
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
