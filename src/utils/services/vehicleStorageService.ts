
import { ImportedVehicle } from '../types/vehicle';
import { 
  STORAGE_KEY, 
  FEATURED_STORAGE_KEY, 
  defaultVehicles 
} from '../constants/vehicleStorage';

/**
 * Récupère les véhicules importés depuis le stockage local
 */
export const getImportedVehicles = (catalogType: 'standard' | 'featured' = 'standard'): ImportedVehicle[] => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    const vehiclesJson = localStorage.getItem(storageKey);
    
    console.log(`getImportedVehicles: Chargement du catalogue ${catalogType}, clé de stockage: ${storageKey}`);
    
    // Si aucun véhicule n'est trouvé, initialiser avec un catalogue vide
    if (!vehiclesJson) {
      console.log(`getImportedVehicles: Aucun véhicule trouvé pour le catalogue ${catalogType}, initialisation d'un catalogue vide`);
      saveImportedVehicles(defaultVehicles, catalogType);
      return defaultVehicles;
    }
    
    const vehicles = JSON.parse(vehiclesJson);
    console.log(`getImportedVehicles: ${vehicles.length} véhicules chargés du catalogue ${catalogType}`);
    
    // Assurez-vous que chaque véhicule a sa propriété catalogType définie correctement
    return vehicles.map(vehicle => ({
      ...vehicle,
      catalogType: catalogType,
      featured: catalogType === 'featured' ? true : vehicle.featured
    }));
  } catch (error) {
    console.error(`Erreur lors du chargement des véhicules (${catalogType}):`, error);
    return defaultVehicles;
  }
};

/**
 * Sauvegarde les véhicules dans le stockage local
 */
export const saveImportedVehicles = (vehicles: ImportedVehicle[], catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    
    // S'assurer que chaque véhicule a le catalogType approprié avant la sauvegarde
    const updatedVehicles = vehicles.map(vehicle => ({
      ...vehicle,
      catalogType: catalogType,
      featured: catalogType === 'featured' ? true : vehicle.featured
    }));
    
    localStorage.setItem(storageKey, JSON.stringify(updatedVehicles));
    console.log(`saveImportedVehicles: ${updatedVehicles.length} véhicules sauvegardés dans le catalogue ${catalogType}`);
    
    // Déclencher un événement pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
    return true;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde des véhicules (${catalogType}):`, error);
    return false;
  }
};
