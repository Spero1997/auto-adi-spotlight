import React, { useEffect, useState } from 'react';
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
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { addBMWX5 } from '@/scripts/addBMWX5';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';

const VehiculesOccasion = () => {
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [initialized, setInitialized] = useState(false);

  // Effet pour remonter la page au début lors du chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Effet pour garantir que tous les véhicules sont visibles sur toutes les plateformes
  useEffect(() => {
    if (initialized) return;
    
    // Forces de garantir que tous les véhicules sont visibles
    console.log("VehiculesOccasion: Initialisation - Préparation pour affichage complet");
    
    // Désactiver explicitement le nettoyage des catalogues
    cleanVehicleCatalogs();
    
    // Activer explicitement la suppression des BMW X7
    removeSpecificVehicles();
    
    // Mise à jour silencieuse des images et de l'Audi Q2 sans notifications toast
    updateVehicleImages();
    updateAudiQ2();
    
    // Mise à jour de la BMW X5 avec le nouveau lien Facebook - suppression de la notification
    addBMWX5();
    
    // Mise à jour de la Porsche Cayenne avec le nouveau lien Facebook - suppression de la notification
    addPorscheCayenne();
    
    // Déclencher un événement pour forcer le rechargement des véhicules
    window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: 'all' } }));
    
    console.log("VehiculesOccasion: Initialisation terminée - tous les véhicules devraient être visibles");
    setInitialized(true);
    
  }, [initialized]);

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
        
        <main className="flex-grow mt-8">
          <section className="bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-8 text-center text-brand-darkBlue">Véhicules d'occasion</h1>
              <div className="max-w-5xl mx-auto">
                <QuickSearch onSearch={handleSearchFilters} />
              </div>
            </div>
          </section>
          
          <FeaturedCars searchFilters={searchFilters} />
          
          <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <ConditionsHighlight />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VehiculesOccasion;
