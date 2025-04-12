
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
      
      // Assurons-nous que tous les véhicules ont un tableau images, même s'il est vide
      const vehiclesWithImages = validVehicles.map((vehicle: ImportedVehicle) => {
        if (!vehicle.images) {
          return { ...vehicle, images: [] };
        }
        return vehicle;
      });
      
      return vehiclesWithImages;
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
    
    // S'assurer que le tableau images existe pour chaque véhicule
    const vehiclesWithImages = validVehicles.map(vehicle => {
      if (!vehicle.images) {
        return { ...vehicle, images: [] };
      }
      return vehicle;
    });
    
    localStorage.setItem(storageKey, JSON.stringify(vehiclesWithImages));
    console.log(`${vehiclesWithImages.length} véhicules enregistrés dans ${storageKey}`);
    
    // Vérification de la sauvegarde
    try {
      const verifData = localStorage.getItem(storageKey);
      const verifVehicles = verifData ? JSON.parse(verifData) : [];
      if (verifVehicles.length !== vehiclesWithImages.length) {
        console.error('Problème de vérification de sauvegarde: nombre de véhicules différent');
        return false;
      }
      console.log('Vérification de sauvegarde réussie.');
      
      // Déclencher un événement pour informer l'application de la mise à jour
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType, timestamp: Date.now() } 
      }));
      
      // Forcer la mise à jour du localStorage pour les autres onglets
      window.dispatchEvent(new StorageEvent('storage', {
        key: storageKey,
        newValue: JSON.stringify(vehiclesWithImages)
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

// Ajouter une fonction pour récupérer directement un véhicule par son ID
export const getVehicleById = (
  id: string, 
  catalogType: 'standard' | 'featured' = 'standard'
): ImportedVehicle | null => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const vehicle = vehicles.find(v => v.id === id);
    return vehicle || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
    return null;
  }
};
