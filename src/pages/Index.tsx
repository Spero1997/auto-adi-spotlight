import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cleanVehicleCatalogs, getImportedVehicles } from '@/utils/vehicleImportService';
import {
  addMercedesCLA250,
  addBMWX5,
  addMercedesClassC,
  addPorscheCayenne,
  addAudiRS6,
  addMercedesGLC,
  addMercedesClasseE,
  addMercedesCLA200,
  addMercedesClassC180,
  addKiaSorento,
  updateKiaSorentoImage
} from '@/scripts/updateVehicleImages';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import FeaturedCars from '@/components/FeaturedCars';
import TestimonialSection from '@/components/TestimonialSection';
import ConditionsHighlight from '@/components/ConditionsHighlight';

const Index = () => {
  const isMobile = useIsMobile();
  const { language, translate } = useLanguage();

  useEffect(() => {
    const firstLoadKey = 'indexPageFirstLoad';
    const isFirstLoad = !localStorage.getItem(firstLoadKey);
    
    if (isFirstLoad) {
      localStorage.setItem(firstLoadKey, 'loaded');
      
      cleanVehicleCatalogs();
      
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
      }

      const bmwInFeatured = featuredVehicles.find(
        v => v.brand === "BMW" && v.model === "X5 XDrive 40e M-Sport" && v.year === 2018
      );
      if (!bmwInFeatured) {
        console.log("BMW X5 non trouvée dans le catalogue vedette, ajout au catalogue...");
        addBMWX5();
      }
      
      const mercedesClassCInFeatured = featuredVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Class C Coupé 4Matic" && v.year === 2019
      );
      if (!mercedesClassCInFeatured) {
        console.log("Mercedes Benz Class C Coupé 4Matic non trouvée dans le catalogue vedette, ajout au catalogue...");
        addMercedesClassC();
      }
      
      const porscheCayenneInFeatured = featuredVehicles.find(
        v => v.brand === "Porsche" && v.model === "Cayenne Turbo PAW" && v.year === 2018
      );
      if (!porscheCayenneInFeatured) {
        console.log("Porsche Cayenne Turbo PAW non trouvée dans le catalogue vedette, ajout au catalogue...");
        addPorscheCayenne();
      }
      
      const audiRS6InFeatured = featuredVehicles.find(
        v => v.brand === "Audi" && v.model === "RS 6" && v.year === 2020
      );
      if (!audiRS6InFeatured) {
        console.log("Audi RS 6 non trouvée dans le catalogue vedette, ajout au catalogue...");
        addAudiRS6();
      }
      
      const mercedesGLCInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz GLC 350e 326 CV 4Matic AMG" && v.year === 2018
      );
      if (!mercedesGLCInStandard) {
        console.log("Mercedes Benz GLC 350e non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesGLC();
      }
      
      const mercedesClasseEInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe E" && v.year === 2018
      );
      if (!mercedesClasseEInStandard) {
        console.log("Mercedes Benz Classe E non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesClasseE();
      }
      
      const mercedesCLA200InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz CLA 200 CDI 136 CV AMG" && v.year === 2014
      );
      if (!mercedesCLA200InStandard) {
        console.log("Mercedes Benz CLA 200 CDI non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesCLA200();
      }
      
      const mercedesClassC180InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe C 180 AMG" && v.year === 2014
      );
      if (!mercedesClassC180InStandard) {
        console.log("Mercedes Benz Classe C 180 AMG non trouvée dans le catalogue standard, ajout au catalogue...");
        addMercedesClassC180();
      }
      
      const kiaSorentoInStandard = standardVehicles.find(
        v => v.brand === "Kia" && 
            v.model === "Sorento 1.6 T-GDI Hybride rechargeable" && 
            v.year === 2021
      );
      
      if (!kiaSorentoInStandard) {
        console.log("Kia Sorento non trouvée dans le catalogue standard, ajout au catalogue...");
        addKiaSorento();
      }
      
      updateKiaSorentoImage();
      
      import('@/scripts/updateVehicleImages').then(module => {
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
        <div className="fixed top-4 right-4 z-50">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 border-brand-blue/30 text-brand-blue bg-white/90 backdrop-blur-sm"
                >
                  <Languages className="h-4 w-4" />
                  <span>{language}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-6 pt-2">
                <div className="mx-auto w-full max-w-sm">
                  <div className="flex items-center space-x-2 mb-4 p-2 border-b border-gray-100">
                    <Languages className="h-6 w-6 text-brand-blue" />
                    <div className="font-semibold text-brand-darkBlue text-lg">
                      {translate('selectLanguage', {
                        FR: 'Sélectionnez une langue',
                        EN: 'Select a language',
                        ES: 'Seleccione un idioma',
                        IT: 'Seleziona una lingua',
                        PT: 'Selecione um idioma',
                        RO: 'Selectați o limbă'
                      })}
                    </div>
                  </div>
                  <LanguageSwitcher />
                  <DrawerClose className="mt-4 w-full">
                    <Button variant="outline" className="w-full">
                      {translate('close', {
                        FR: 'Fermer',
                        EN: 'Close',
                        ES: 'Cerrar',
                        IT: 'Chiudi',
                        PT: 'Fechar',
                        RO: 'Închide'
                      })}
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-brand-blue/30 text-brand-blue bg-white/90 backdrop-blur-sm font-semibold">
                  <Languages className="h-5 w-5" />
                  <span>{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-sm p-3 w-[470px]"
              >
                <div className="text-sm font-medium text-gray-700 mb-2 px-2 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-brand-blue" />
                  {translate('selectLanguage', {
                    FR: 'Sélectionnez une langue',
                    EN: 'Select a language',
                    ES: 'Seleccione un idioma',
                    IT: 'Seleziona una lingua',
                    PT: 'Selecione um idioma',
                    RO: 'Selectați o limbă'
                  })}
                </div>
                <LanguageSwitcher />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <main className="flex-grow">
          <Benefits />
          <FeaturedCars featuredOnly={true} />
          
          <div id="conditions-section" className="w-full">
            <ConditionsHighlight />
          </div>
          
          <TestimonialSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
