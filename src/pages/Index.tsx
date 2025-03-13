
import HeroCarousel from '@/components/HeroCarousel';
import QuickSearch from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getImportedVehicles, resetCatalog } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

const Index = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Réinitialiser les deux catalogues
    resetCatalog('all');
    toast.success("Les catalogues ont été réinitialisés");
    
    // Vérifier les catalogues après réinitialisation
    try {
      const standardVehicles = getImportedVehicles('standard');
      const featuredVehicles = getImportedVehicles('featured');
      
      console.log(`Page d'accueil: ${standardVehicles.length} véhicules standard et ${featuredVehicles.length} véhicules vedette chargés`);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
    
    // Check if there are search parameters in the URL
    if (searchParams.toString()) {
      console.log('Found search parameters:', {
        marque: searchParams.get('marque'),
        modele: searchParams.get('modele'),
        budget: searchParams.get('budget'),
        energie: searchParams.get('energie')
      });
      
      // Scroll to FeaturedCars section as it would display search results
      const featuredCarsElement = document.getElementById('featured-cars');
      if (featuredCarsElement) {
        setTimeout(() => {
          featuredCarsElement.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
    
    // Check for the catalog parameter and pre-load if necessary
    const catalogId = searchParams.get('catalog');
    if (catalogId) {
      const catalogType = searchParams.get('type') || 'standard';
      console.log(`Catalog found in URL: ${catalogId}, type: ${catalogType}, will pre-load vehicles`);
    }
  }, [searchParams]);
  
  // Extract search params to pass to FeaturedCars
  const searchFilters = {
    brand: searchParams.get('marque') || '',
    model: searchParams.get('modele') || '',
    maxPrice: searchParams.get('budget') ? parseInt(searchParams.get('budget') || '0') : undefined,
    fuelType: searchParams.get('energie') || ''
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroCarousel />
        <div className="container mx-auto px-4 relative z-10">
          <QuickSearch />
        </div>
        <ConditionsHighlight />
        <div className="mt-10" id="featured-cars">
          <FeaturedCars featuredOnly={true} />
        </div>
        <div className="mt-10">
          <FeaturedCars searchFilters={searchFilters} featuredOnly={false} />
        </div>
        <Benefits />
        <div id="testimonials">
          <TestimonialSection />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
