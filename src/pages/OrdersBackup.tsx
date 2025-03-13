
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrdersBackupComponent from '@/components/OrdersBackup';

const OrdersBackup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <OrdersBackupComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersBackup;
