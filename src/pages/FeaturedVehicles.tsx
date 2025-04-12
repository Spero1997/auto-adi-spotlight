
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedCars from '@/components/FeaturedCars';
import CallToAction from '@/components/CallToAction';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const FeaturedVehicles = () => {
  const navigate = useNavigate();
  
  const handleAddVehicle = () => {
    navigate('/gestion-vehicules');
  };
  
  return (
    <>
      <Helmet>
        <title>Nos véhicules vedettes | Auto ADI</title>
        <meta name="description" content="Découvrez notre sélection de véhicules vedettes disponibles à la vente chez Auto ADI" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Nos véhicules vedettes</h1>
              
              <Button onClick={handleAddVehicle} className="flex items-center gap-2">
                <PlusCircle size={16} />
                Ajouter un véhicule vedette
              </Button>
            </div>
            
            <div className="mb-10">
              <FeaturedCars featuredOnly={true} />
            </div>
          </div>
          
          <CallToAction />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FeaturedVehicles;
