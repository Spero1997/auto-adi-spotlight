
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrdersBackupComponent from '@/components/OrdersBackup';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const OrdersBackup = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Display a toast to inform the user to click Actualiser if they don't see their order
    // Make the message tailored for mobile or desktop
    toast({
      title: "Conseil",
      description: isMobile 
        ? "Si vous ne voyez pas votre commande, cliquez sur le bouton Actualiser en haut de la page. Vous pouvez télécharger les pièces jointes en cliquant sur leur nom."
        : "Si vous ne voyez pas votre commande, cliquez sur le bouton Actualiser. Vous pouvez télécharger les pièces jointes en cliquant sur leur nom.",
      duration: 6000, // Increased duration for mobile users to have time to read
    });
  }, [isMobile, toast]);

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
