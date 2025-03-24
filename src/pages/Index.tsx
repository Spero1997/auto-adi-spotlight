
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import FeaturedCars from '@/components/FeaturedCars';
import TestimonialSection from '@/components/TestimonialSection';
import { getImportedVehicles } from '@/utils/vehicleImportService';
import { addMercedesCLA250 } from '@/scripts/addMercedesCLA250';
import { addBMWX5 } from '@/scripts/addBMWX5';
import { addMercedesClassC } from '@/scripts/addMercedesClassC';
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

    // Vérifier si la BMW X5 existe déjà dans le catalogue vedette
    const bmwInFeatured = featuredVehicles.find(
      v => v.brand === "BMW" && 
          v.model === "X5 XDrive 40e M-Sport" && 
          v.year === 2018
    );

    if (!bmwInFeatured) {
      console.log("BMW X5 non trouvée dans le catalogue vedette, ajout au catalogue...");
      addBMWX5();
    } else {
      console.log("BMW X5 déjà présente dans le catalogue vedette");
    }
    
    // Vérifier si la Mercedes Benz Class C Coupé 4Matic existe déjà dans le catalogue vedette
    const mercedesClassCInFeatured = featuredVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Class C Coupé 4Matic" && 
          v.year === 2019
    );

    if (!mercedesClassCInFeatured) {
      console.log("Mercedes Benz Class C Coupé 4Matic non trouvée dans le catalogue vedette, ajout au catalogue...");
      addMercedesClassC();
    } else {
      console.log("Mercedes Benz Class C Coupé 4Matic déjà présente dans le catalogue vedette");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Auto ADI | Importation et vente de véhicules d'occasion</title>
        <meta name="description" content="Auto ADI - Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité. Large choix de marques et modèles disponibles." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        {/* Le Header standard est maintenant masqué sur la page d'accueil puisque nous utilisons AnimatedHero à la place */}
        <div className="hidden">
          <Header />
        </div>
        
        <main className="flex-grow">
          {/* AnimatedHero est ajouté directement dans App.tsx, pas besoin de l'ajouter ici */}
          <Benefits />
          <FeaturedCars featuredOnly={true} />
          <TestimonialSection />
          {/* Removed CallToAction component */}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
