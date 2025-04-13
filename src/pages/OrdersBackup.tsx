
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrdersBackupComponent from '@/components/OrdersBackup';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const OrdersBackup = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Set initialized to ensure components render after mobile detection is complete
    setInitialized(true);
    
    // Log mobile status for debugging
    console.log("OrdersBackup page - Mobile status:", isMobile);
    console.log("OrdersBackup page - Screen width:", window.innerWidth);
    
    // Display a toast to inform the user to click Actualiser if they don't see their order
    // Make the message tailored for mobile or desktop
    toast({
      title: "Conseil",
      description: isMobile 
        ? "Si vous ne voyez pas votre commande, cliquez sur Actualiser. Vous pouvez télécharger les pièces jointes en cliquant sur leur nom."
        : "Si vous ne voyez pas votre commande, cliquez sur le bouton Actualiser. Vous pouvez télécharger les pièces jointes en cliquant sur leur nom.",
      duration: 8000, // Increased duration to ensure user sees it
    });
  }, [isMobile, toast]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="p-8 rounded-lg bg-white shadow-md">
            <p className="text-center">Chargement...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-8 bg-gradient-to-b from-white to-gray-50"> 
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-playfair font-bold mb-8 text-center text-brand-darkBlue">Suivi de commandes</h1>
          <div className="max-w-5xl mx-auto">
            <OrdersBackupComponent />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersBackup;
