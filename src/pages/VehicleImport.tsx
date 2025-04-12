
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVehicleLoader } from '@/hooks/useVehicleLoader';
import VehicleQuickAdd from '@/components/import/VehicleQuickAdd';
import VehicleImportTabs from '@/components/import/VehicleImportTabs';

const VehicleImport = () => {
  const { vehiclesLoaded, triggerUpdate } = useVehicleLoader();
  
  return (
    <>
      <Helmet>
        <title>Importation de véhicules | AutoAdi</title>
        <meta name="description" content="Outil d'importation de véhicules depuis des sites de vente automobiles pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Gestion des véhicules</h1>
          <p className="text-center text-gray-600 mb-8">
            Ajoutez ou importez facilement des véhicules
          </p>
          
          <VehicleQuickAdd triggerUpdate={triggerUpdate} />
          
          <VehicleImportTabs triggerUpdate={triggerUpdate} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleImport;
