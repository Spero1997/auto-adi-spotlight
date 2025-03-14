
import HeroCarousel from '@/components/HeroCarousel';
import QuickSearch from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getImportedVehicles, resetCatalog, addImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Réinitialiser les deux catalogues
    resetCatalog('all');
    toast.success("Les catalogues ont été réinitialisés");
    
    // Ajouter la Jeep Compass au catalogue vedette avec la nouvelle image
    const jeepCompass = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Jeep",
      model: "Compass 1,3 T4 PHEV 4Xe 240hk Mode S",
      year: 2021,
      mileage: 66000,
      fuelType: "Essence",
      price: 12000,
      image: "/lovable-uploads/095b7466-7c2a-479c-861c-ebf3e0234239.png", // Nouvelle image
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Bleu",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "1.3 T4 PHEV 4Xe 240ch",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      features: [
        "Système hybride rechargeable",
        "4 roues motrices",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges chauffants",
        "Mode de conduite S"
      ]
    };
    
    addImportedVehicle(jeepCompass, 'featured');
    toast.success("Jeep Compass ajoutée au catalogue vedette");
    
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
        
        {/* Bouton Tous nos véhicules d'occasion */}
        <div className="container mx-auto px-4 py-8 text-center">
          <Link to="/vehicules/occasion">
            <Button className="mx-auto flex items-center gap-2 px-6 py-3 text-base" size="lg">
              <Car className="h-5 w-5" />
              Tous nos véhicules d'occasion
            </Button>
          </Link>
        </div>
        
        {/* This section shows standard vehicles or search results */}
        {searchParams.toString() ? (
          <div className="mt-10">
            <FeaturedCars searchFilters={searchFilters} featuredOnly={false} />
          </div>
        ) : null}
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
