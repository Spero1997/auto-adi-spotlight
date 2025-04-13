
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickSearch, { SearchFilters } from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import { updateVehicleImages } from '@/scripts/updateVehicleImages';
import { updateAudiQ2 } from '@/scripts/updateAudiQ2';
import { cleanVehicleCatalogs } from '@/utils/vehicleImportService';
import { removeSpecificVehicles } from '@/scripts/removeSpecificVehicles';

const VehiculesOccasion = () => {
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  // Effet pour appliquer les filtres de recherche depuis l'URL
  useEffect(() => {
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const maxPrice = searchParams.get('maxPrice');
    const fuelType = searchParams.get('fuelType');
    
    const filters: SearchFilters = {};
    if (brand) filters.brand = brand;
    if (model) filters.model = model;
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    if (fuelType) filters.fuelType = fuelType;
    
    setSearchFilters(filters);
  }, [searchParams]);

  // Effet pour garantir que tous les véhicules sont visibles
  useEffect(() => {
    // Désactiver le nettoyage des catalogues pour préserver tous les véhicules
    cleanVehicleCatalogs();
    
    // Désactiver la suppression de véhicules spécifiques
    removeSpecificVehicles();
    
    // Mise à jour silencieuse des images et de l'Audi Q2 sans notifications toast
    updateVehicleImages();
    updateAudiQ2();
    
    // Log pour debug
    console.log("VehiculesOccasion: initialisation terminée - tous les véhicules devraient être visibles");
  }, []);

  // Fonction pour mettre à jour les filtres de recherche
  function handleSearchFilters(filters: SearchFilters) {
    setSearchFilters(filters);
  }

  return (
    <>
      <Helmet>
        <title>Véhicules d'occasion | Auto ADI</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion de qualité. Importation directe et garantie sur tous nos véhicules." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <section className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <QuickSearch onSearch={handleSearchFilters} />
            </div>
          </section>
          
          <FeaturedCars searchFilters={searchFilters} />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VehiculesOccasion;
