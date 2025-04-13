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
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { addAudiRS6 } from '@/scripts/addAudiRS6';
import { addMercedesGLC } from '@/scripts/addMercedesGLC';
import { addMercedesClasseE } from '@/scripts/addMercedesClasseE';
import { addMercedesCLA200 } from '@/scripts/addMercedesCLA200';
import { addMercedesClassC180 } from '@/scripts/addMercedesClassC180';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
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
    
    // Vérifier si la Porsche Cayenne Turbo PAW existe déjà dans le catalogue vedette
    const porscheCayenneInFeatured = featuredVehicles.find(
      v => v.brand === "Porsche" && 
          v.model === "Cayenne Turbo PAW" && 
          v.year === 2018
    );

    if (!porscheCayenneInFeatured) {
      console.log("Porsche Cayenne Turbo PAW non trouvée dans le catalogue vedette, ajout au catalogue...");
      addPorscheCayenne();
    } else {
      console.log("Porsche Cayenne Turbo PAW déjà présente dans le catalogue vedette");
    }
    
    // Vérifier si l'Audi RS 6 existe déjà dans le catalogue vedette
    const audiRS6InFeatured = featuredVehicles.find(
      v => v.brand === "Audi" && 
          v.model === "RS 6" && 
          v.year === 2020
    );

    if (!audiRS6InFeatured) {
      console.log("Audi RS 6 non trouvée dans le catalogue vedette, ajout au catalogue...");
      addAudiRS6();
    } else {
      console.log("Audi RS 6 déjà présente dans le catalogue vedette");
    }
    
    // Vérifier si la Mercedes GLC existe déjà dans le catalogue standard
    const mercedesGLCInStandard = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz GLC 350e 326 CV 4Matic AMG" && 
          v.year === 2018
    );

    if (!mercedesGLCInStandard) {
      console.log("Mercedes Benz GLC 350e non trouvée dans le catalogue standard, ajout au catalogue...");
      addMercedesGLC();
    } else {
      console.log("Mercedes Benz GLC 350e déjà présente dans le catalogue standard");
    }
    
    // Vérifier si la Mercedes Classe E existe déjà dans le catalogue standard
    const mercedesClasseEInStandard = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Classe E" && 
          v.year === 2018
    );

    if (!mercedesClasseEInStandard) {
      console.log("Mercedes Benz Classe E non trouvée dans le catalogue standard, ajout au catalogue...");
      addMercedesClasseE();
    } else {
      console.log("Mercedes Benz Classe E déjà présente dans le catalogue standard");
    }
    
    // Vérifier si la Mercedes CLA 200 CDI existe déjà dans le catalogue standard
    const mercedesCLA200InStandard = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz CLA 200 CDI 136 CV AMG" && 
          v.year === 2014
    );

    if (!mercedesCLA200InStandard) {
      console.log("Mercedes Benz CLA 200 CDI non trouvée dans le catalogue standard, ajout au catalogue...");
      addMercedesCLA200();
    } else {
      console.log("Mercedes Benz CLA 200 CDI déjà présente dans le catalogue standard");
    }
    
    // Vérifier si la Mercedes Classe C 180 AMG existe déjà dans le catalogue standard
    const mercedesClassC180InStandard = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Classe C 180 AMG" && 
          v.year === 2014
    );

    if (!mercedesClassC180InStandard) {
      console.log("Mercedes Benz Classe C 180 AMG non trouvée dans le catalogue standard, ajout au catalogue...");
      addMercedesClassC180();
    } else {
      console.log("Mercedes Benz Classe C 180 AMG déjà présente dans le catalogue standard");
    }
    
    // Mettre à jour l'image de la Kia Sorento
    updateKiaSorentoImage();
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
