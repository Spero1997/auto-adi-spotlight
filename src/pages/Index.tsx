
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import FeaturedCars from '@/components/FeaturedCars';
import TestimonialSection from '@/components/TestimonialSection';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { getImportedVehicles, cleanVehicleCatalogs } from '@/utils/vehicleImportService';
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

const Index = () => {
  useEffect(() => {
    // Utiliser une clé de localStorage pour vérifier si c'est la première visite
    const firstLoadKey = 'indexPageFirstLoad';
    const isFirstLoad = !localStorage.getItem(firstLoadKey);
    
    if (isFirstLoad) {
      // Marquer comme chargé pour les prochaines visites
      localStorage.setItem(firstLoadKey, 'loaded');
      
      // Nettoyer les catalogues (supprimer les véhicules sans images)
      cleanVehicleCatalogs();
      
      // Vérification et ajout silencieux des véhicules
      const standardVehicles = getImportedVehicles('standard');
      const featuredVehicles = getImportedVehicles('featured');
      
      // Vérifier silencieusement l'existence de chaque véhicule et l'ajouter si nécessaire
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
      }

      // Vérifications silencieuses des autres véhicules
      // BMW X5
      const bmwInFeatured = featuredVehicles.find(
        v => v.brand === "BMW" && v.model === "X5 XDrive 40e M-Sport" && v.year === 2018
      );
      if (!bmwInFeatured) {
        console.log("BMW X5 non trouvée dans le catalogue vedette, ajout au catalogue...");
        addBMWX5();
      }
      
      // Mercedes Class C Coupé
      const mercedesClassCInFeatured = featuredVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Class C Coupé 4Matic" && v.year === 2019
      );
      if (!mercedesClassCInFeatured) {
        console.log("Mercedes Benz Class C Coupé 4Matic non trouvée dans le catalogue vedette, ajout au catalogue...");
        addMercedesClassC();
      }
      
      // Porsche Cayenne
      const porscheCayenneInFeatured = featuredVehicles.find(
        v => v.brand === "Porsche" && v.model === "Cayenne Turbo PAW" && v.year === 2018
      );
      if (!porscheCayenneInFeatured) {
        console.log("Porsche Cayenne Turbo PAW non trouvée dans le catalogue vedette, ajout au catalogue...");
        addPorscheCayenne();
      }
      
      // Audi RS6
      const audiRS6InFeatured = featuredVehicles.find(
        v => v.brand === "Audi" && v.model === "RS 6" && v.year === 2020
      );
      if (!audiRS6InFeatured) {
        console.log("Audi RS 6 non trouvée dans le catalogue vedette, ajout au catalogue...");
        addAudiRS6();
      }
      
      // Mercedes GLC
      const mercedesGLCInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz GLC 350e 326 CV 4Matic AMG" && v.year === 2018
      );
      if (!mercedesGLCInStandard) {
        console.log("Mercedes Benz GLC 350e non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesGLC();
      }
      
      // Mercedes Classe E
      const mercedesClasseEInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe E" && v.year === 2018
      );
      if (!mercedesClasseEInStandard) {
        console.log("Mercedes Benz Classe E non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesClasseE();
      }
      
      // Mercedes CLA 200
      const mercedesCLA200InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz CLA 200 CDI 136 CV AMG" && v.year === 2014
      );
      if (!mercedesCLA200InStandard) {
        console.log("Mercedes Benz CLA 200 CDI non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesCLA200();
      }
      
      // Mercedes Classe C 180
      const mercedesClassC180InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe C 180 AMG" && v.year === 2014
      );
      if (!mercedesClassC180InStandard) {
        console.log("Mercedes Benz Classe C 180 AMG non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesClassC180();
      }
      
      // Mettre à jour l'image de la Kia Sorento
      updateKiaSorentoImage();
      
      // Import dynamique du script de mise à jour des images
      import('@/scripts/updateVehicleImages').then(module => {
        // Mettre à jour les images des véhicules spécifiés
        module.updateVehicleImages();
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Auto ADI | Importation et vente de véhicules d'occasion</title>
        <meta name="description" content="Auto ADI - Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité. Large choix de marques et modèles disponibles." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-[100vh]">
          <Benefits />
          <FeaturedCars featuredOnly={true} />
          
          {/* Ajout de la section des conditions d'achat avec une classe spécifique pour le débogage */}
          <div id="conditions-section" className="w-full">
            <ConditionsHighlight />
          </div>
          
          <TestimonialSection />
          {/* Removed CallToAction component */}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
