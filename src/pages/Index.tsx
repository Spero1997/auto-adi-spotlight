
import { useState, useEffect } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import QuickSearch from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { getImportedVehicles, getCatalogIdFromUrl } from '@/utils/vehicleImportService';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Suppression de la réinitialisation du catalogue et de l'ajout de véhicules à chaque chargement
    try {
      const standardVehicles = getImportedVehicles('standard');
      const featuredVehicles = getImportedVehicles('featured');
      
      console.log(`Page d'accueil: ${standardVehicles.length} véhicules standard et ${featuredVehicles.length} véhicules vedette chargés`);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
    
    if (searchParams.toString()) {
      console.log('Found search parameters:', {
        marque: searchParams.get('marque'),
        modele: searchParams.get('modele'),
        budget: searchParams.get('budget'),
        energie: searchParams.get('energie')
      });
      
      const featuredCarsElement = document.getElementById('featured-cars');
      if (featuredCarsElement) {
        setTimeout(() => {
          featuredCarsElement.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
    
    const catalogId = searchParams.get('catalog');
    if (catalogId) {
      const catalogType = searchParams.get('type') || 'standard';
      console.log(`Catalogue trouvé dans l'URL: ${catalogId}`);
    }
  }, [searchParams]);
  
  const searchFilters = {
    brand: searchParams.get('marque') || '',
    model: searchParams.get('modele') || '',
    maxPrice: searchParams.get('budget') ? parseInt(searchParams.get('budget') || '0') : undefined,
    fuelType: searchParams.get('energie') || ''
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <HeroCarousel />
        
        <div className="container mx-auto px-4 mt-16">
          <QuickSearch />
        </div>
        
        <ConditionsHighlight />
        <div className="mt-10" id="featured-cars">
          <FeaturedCars featuredOnly={true} />
        </div>
        
        <div className="container mx-auto px-4 py-8 text-center">
          <Link to="/vehicules/occasion">
            <Button className="mx-auto flex items-center gap-2 px-6 py-3 text-base" size="lg">
              <Car className="h-5 w-5" />
              Tous nos véhicules d'occasion
            </Button>
          </Link>
        </div>
        
        {searchParams.toString() ? (
          <div className="mt-10">
            <FeaturedCars searchFilters={searchFilters} featuredOnly={false} />
          </div>
        ) : null}
        <Benefits />
        <div id="testimonials">
          <TestimonialSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
