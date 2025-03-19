
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import QuickSearch from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import CallToAction from '@/components/CallToAction';
import TestimonialSection from '@/components/TestimonialSection';
import { getImportedVehicles } from '@/utils/vehicleImportService';
import { addMercedesCLA250 } from '@/scripts/addMercedesCLA250';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Vérifier si la Mercedes CLA 250 AMG existe déjà dans les catalogues
    const standardVehicles = getImportedVehicles('standard');
    const featuredVehicles = getImportedVehicles('featured');
    
    const mercedesInStandard = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "CLA 250 AMG" && 
          v.year === 2021
    );
    
    const mercedesInFeatured = featuredVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "CLA 250 AMG" && 
          v.year === 2021
    );

    if (!mercedesInStandard || !mercedesInFeatured) {
      console.log("Mercedes CLA 250 AMG non trouvée dans un des catalogues, ajout aux catalogues...");
      addMercedesCLA250();
    } else {
      console.log("Mercedes CLA 250 AMG déjà présente dans les deux catalogues");
      toast.success("La Mercedes CLA 250 AMG est déjà dans les catalogues !");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Auto ADI | Importation et vente de véhicules d'occasion</title>
        <meta name="description" content="Auto ADI - Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité. Large choix de marques et modèles disponibles." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <Benefits />
          <QuickSearch />
          <FeaturedCars featuredOnly={true} />
          <TestimonialSection />
          <CallToAction />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
