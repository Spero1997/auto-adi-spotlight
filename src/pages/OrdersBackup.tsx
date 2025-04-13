
import React, { useEffect, useState } from 'react';
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
        <main className="flex-grow flex items-center justify-center pt-[100vh]">
          <p>Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-[100vh]">
        <OrdersBackupComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersBackup;
