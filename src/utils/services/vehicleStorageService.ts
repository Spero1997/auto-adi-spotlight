
import { ImportedVehicle } from '../types/vehicle';
import { STORAGE_KEY, FEATURED_STORAGE_KEY } from '../constants/vehicleStorage';

/**
 * Gets imported vehicles from storage based on catalog type
 */
export const getImportedVehicles = (catalogType: 'standard' | 'featured' = 'standard'): ImportedVehicle[] => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    const storedVehicles = localStorage.getItem(storageKey);
    
    if (storedVehicles) {
      const parsedVehicles = JSON.parse(storedVehicles);
      console.log(`${parsedVehicles.length} véhicules chargés depuis ${storageKey}`);
      
      // Vérification d'intégrité des données
      const validVehicles = parsedVehicles.filter((vehicle: any) => {
        const isValid = vehicle && vehicle.id && vehicle.brand && vehicle.model;
        if (!isValid) {
          console.warn('Véhicule incomplet détecté et ignoré:', vehicle);
        }
        return isValid;
      });
      
      if (validVehicles.length !== parsedVehicles.length) {
        console.warn(`${parsedVehicles.length - validVehicles.length} véhicules invalides ont été filtrés.`);
      }
      
      return validVehicles;
    } else {
      console.log(`Aucun véhicule trouvé dans ${storageKey}, retour tableau vide`);
      return [];
    }
  } catch (error) {
    console.error(`Erreur lors du chargement des véhicules depuis ${catalogType}:`, error);
    return [];
  }
};

/**
 * Saves imported vehicles to storage based on catalog type
 */
export const saveImportedVehicles = (
  vehicles: ImportedVehicle[], 
  catalogType: 'standard' | 'featured' = 'standard'
): boolean => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    
    // Vérification d'intégrité des données
    const validVehicles = vehicles.filter(vehicle => {
      const isValid = vehicle && vehicle.id && vehicle.brand && vehicle.model;
      if (!isValid) {
        console.warn('Tentative de sauvegarde d\'un véhicule incomplet ignorée:', vehicle);
      }
      return isValid;
    });
    
    if (validVehicles.length !== vehicles.length) {
      console.warn(`${vehicles.length - validVehicles.length} véhicules invalides ont été filtrés avant la sauvegarde.`);
    }
    
    localStorage.setItem(storageKey, JSON.stringify(validVehicles));
    console.log(`${validVehicles.length} véhicules enregistrés dans ${storageKey}`);
    
    // Vérification de la sauvegarde
    try {
      const verifData = localStorage.getItem(storageKey);
      const verifVehicles = verifData ? JSON.parse(verifData) : [];
      if (verifVehicles.length !== validVehicles.length) {
        console.error('Problème de vérification de sauvegarde: nombre de véhicules différent');
        return false;
      }
      console.log('Vérification de sauvegarde réussie.');
      
      // Déclencher un événement pour informer l'application de la mise à jour
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
      
      return true;
    } catch (verificationError) {
      console.error('Erreur lors de la vérification de la sauvegarde:', verificationError);
      return false;
    }
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des véhicules dans ${catalogType}:`, error);
    return false;
  }
};
