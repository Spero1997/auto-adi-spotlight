
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrdersBackupComponent from '@/components/OrdersBackup';
import { useToast } from '@/hooks/use-toast';

const OrdersBackup = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Display a toast to inform the user to click Actualiser if they don't see their order
    toast({
      title: "Conseil",
      description: "Si vous ne voyez pas votre commande, cliquez sur le bouton Actualiser. Vous pouvez télécharger les pièces jointes en cliquant sur leur nom.",
    });
  }, []);

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
