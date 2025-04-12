
import { useState, useEffect } from 'react';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

export const useVehicleLoader = () => {
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  
  const checkVehicles = () => {
    console.log("VehicleImport: Vérification des véhicules stockés");
    try {
      const vehicles = getImportedVehicles();
      console.log(`VehicleImport: ${vehicles.length} véhicules trouvés dans localStorage`);
      
      // BMW X5
      const bmwX5 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X5") && 
        v.year === 2016
      );
      
      if (bmwX5) {
        console.log("La BMW X5 xDrive est présente dans le catalogue", bmwX5);
      }

      // Volkswagen T-Cross
      const tCross = vehicles.find(v => 
        v.brand === "Volkswagen" && 
        v.model.includes("T-Cross") && 
        v.year === 2021
      );
      
      if (tCross) {
        console.log("La Volkswagen T-Cross est présente dans le catalogue", tCross);
      }
      
      // Audi A3 E-Tron
      const audiA3 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 E-Tron") && 
        v.year === 2017
      );
      
      if (audiA3) {
        console.log("L'Audi A3 E-Tron est présente dans le catalogue", audiA3);
      }
      
      // Kia Niro
      const kiaNiro = vehicles.find(v => 
        v.brand === "Kia" && 
        v.model.includes("Niro") && 
        v.year === 2017
      );
      
      if (kiaNiro) {
        console.log("La Kia Niro Hybride est présente dans le catalogue", kiaNiro);
      }
      
      // BMW X1
      const bmwX1 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X1") && 
        v.year === 2021
      );
      
      if (bmwX1) {
        console.log("La BMW X1 xDrive 25e est présente dans le catalogue", bmwX1);
      }
      
      // Audi Q5
      const audiQ5 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q5 Quattro") && 
        v.year === 2014
      );
      
      if (audiQ5) {
        console.log("L'Audi Q5 Quattro S-Tronic est présente dans le catalogue", audiQ5);
      }
      
      // Audi Q7
      const audiQ7 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q7 245HK") && 
        v.year === 2012
      );
      
      if (audiQ7) {
        console.log("L'Audi Q7 245HK-2XS-Line est présente dans le catalogue", audiQ7);
      }
      
      // Audi A3 Sportback
      const audiA3Sportback = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 Sportback") && 
        v.year === 2019
      );
      
      if (audiA3Sportback) {
        console.log("L'Audi A3 Sportback 35 1,5 TFSI est présente dans le catalogue", audiA3Sportback);
      }
      
      // BMW X3 M-sport
      const bmwX3 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d M-sport") && 
        v.year === 2016
      );
      
      if (bmwX3) {
        console.log("La BMW X3 xDrive 20d M-sport est présente dans le catalogue", bmwX3);
      }
      
      // Range Rover Evoque
      const rangeRoverEvoque = vehicles.find(v => 
        v.brand === "Range Rover" && 
        v.model.includes("Evoque 2.0 Prestige") && 
        v.year === 2014
      );
      
      if (rangeRoverEvoque) {
        console.log("La Range Rover Evoque 2.0 Prestige est présente dans le catalogue", rangeRoverEvoque);
      }
      
      // BMW X3 2014
      const bmwX3_2014 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d") && 
        v.year === 2014
      );
      
      if (bmwX3_2014) {
        console.log("La BMW X3 xDrive 20d 2014 est présente dans le catalogue", bmwX3_2014);
      }
      
      const bmwX7 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X7 xDrive 40d M Sport Pro") && 
        v.year === 2022
      );
      
      if (bmwX7) {
        console.log("La BMW X7 xDrive 40d M Sport Pro est présente dans le catalogue", bmwX7);
        // Check if image needs update
        if (bmwX7.image !== '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png') {
          console.log('Image de la BMW X7 xDrive 40d M Sport Pro mise à jour!');
        }
      }
      
      setVehiclesLoaded(true);
      return vehicles;
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
      return [];
    }
  };
  
  const triggerUpdate = () => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  };

  useEffect(() => {
    checkVehicles();
  }, []);

  return { vehiclesLoaded, checkVehicles, triggerUpdate };
};
