
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedCars from '@/components/FeaturedCars';
import CallToAction from '@/components/CallToAction';

const FeaturedVehicles = () => {
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
            <h1 className="text-4xl font-bold text-center mb-12">Nos véhicules vedettes</h1>
            
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
