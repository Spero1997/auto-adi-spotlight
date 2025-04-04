
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
      return parsedVehicles;
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
): void => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    localStorage.setItem(storageKey, JSON.stringify(vehicles));
    console.log(`${vehicles.length} véhicules enregistrés dans ${storageKey}`);
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement des véhicules dans ${catalogType}:`, error);
  }
};
