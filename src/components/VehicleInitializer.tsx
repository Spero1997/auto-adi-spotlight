
import { useEffect } from 'react';
import { cleanVehicleCatalogs, getImportedVehicles } from '@/utils/vehicleImportService';
import { addMercedesCLA250 } from '@/scripts/addMercedesCLA250';
import { addBMWX5 } from '@/scripts/addBMWX5';
import { addMercedesClassC } from '@/scripts/addMercedesClassC';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { addAudiRS6 } from '@/scripts/addAudiRS6';
import { addMercedesGLC } from '@/scripts/addMercedesGLC';
import { addMercedesClasseE } from '@/scripts/addMercedesClasseE';
import { addMercedesCLA200 } from '@/scripts/addMercedesCLA200';
import { addMercedesClassC180 } from '@/scripts/addMercedesClassC180';
import { addKiaSorento } from '@/scripts/addKiaSorento';
import { updateKiaSorentoImage, updateVehicleImages } from '@/scripts/updateVehicleImages';

const VehicleInitializer = () => {
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
        addMercedesClassC();
      }
      
      const porscheCayenneInFeatured = featuredVehicles.find(
        v => v.brand === "Porsche" && v.model === "Cayenne Turbo PAW" && v.year === 2018
      );
      if (!porscheCayenneInFeatured) {
        addPorscheCayenne();
      }
      
      const audiRS6InFeatured = featuredVehicles.find(
        v => v.brand === "Audi" && v.model === "RS 6" && v.year === 2020
      );
      if (!audiRS6InFeatured) {
        addAudiRS6();
      }
      
      const mercedesGLCInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz GLC 350e 326 CV 4Matic AMG" && v.year === 2018
      );
      if (!mercedesGLCInStandard) {
        addMercedesGLC();
      }
      
      const mercedesClasseEInStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe E" && v.year === 2018
      );
      if (!mercedesClasseEInStandard) {
        addMercedesClasseE();
      }
      
      const mercedesCLA200InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz CLA 200 CDI 136 CV AMG" && v.year === 2014
      );
      if (!mercedesCLA200InStandard) {
        addMercedesCLA200();
      }
      
      const mercedesClassC180InStandard = standardVehicles.find(
        v => v.brand === "Mercedes" && v.model === "Benz Classe C 180 AMG" && v.year === 2014
      );
      if (!mercedesClassC180InStandard) {
        addMercedesClassC180();
      }
      
      const kiaSorentoInStandard = standardVehicles.find(
        v => v.brand === "Kia" && 
            v.model === "Sorento 1.6 T-GDI Hybride rechargeable" && 
            v.year === 2021
      );
      
      if (!kiaSorentoInStandard) {
        addKiaSorento();
      }
      
      updateKiaSorentoImage();
      
      import('@/scripts/updateVehicleImages').then(module => {
        module.updateVehicleImages();
      });
    }
  }, []);

  return null;
};

export default VehicleInitializer;
