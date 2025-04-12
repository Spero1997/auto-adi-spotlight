
// This file is now a facade that re-exports all vehicle-related functionality
// from the new modular files, to maintain backwards compatibility

// Export types
export type { ImportedVehicle } from './types/vehicle';

// Re-export constants
export {
  STORAGE_KEY,
  FEATURED_STORAGE_KEY,
  CATALOG_ID_KEY,
  FEATURED_CATALOG_ID_KEY,
  defaultVehicles
} from './constants/vehicleStorage';

// Re-export catalog URL services
export {
  generateShareableUrl,
  getCatalogIdFromUrl
} from './services/catalogService';

// Re-export storage services
export {
  getImportedVehicles,
  saveImportedVehicles
} from './services/vehicleStorageService';

// Explicitly import the functions we need
import { addVehicle, deleteVehicle, resetCatalog, moveVehicleBetweenCatalogs } from './services/vehicleCatalogService';
import { getImportedVehicles, saveImportedVehicles } from './services/vehicleStorageService';

// Re-export catalog management services directly
export { addVehicle, deleteVehicle, resetCatalog, moveVehicleBetweenCatalogs };

// Import extraction service
import { extractVehiclesFromUrl } from './services/vehicleExtractionService';

// Re-export extraction service
export { extractVehiclesFromUrl };

// Define aliases for backward compatibility
export const addImportedVehicle = addVehicle;
export const deleteImportedVehicle = deleteVehicle;

// Ajout d'une fonction pour vérifier la validité d'une URL d'image
export const validateImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Si c'est une URL relative qui commence par /lovable-uploads/
    if (url.startsWith('/lovable-uploads/')) {
      // On considère que c'est valide car c'est une image uploadée via Lovable
      resolve(true);
      return;
    }
    
    // Pour les autres URLs, on vérifie si l'image est accessible
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Fonction pour mettre à jour l'image de l'Audi Q2
export const updateVehicleImage = (vehicleId: string, newImageUrl: string, catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Utilisation des fonctions importées explicitement
    const vehicles = getImportedVehicles(catalogType);
    
    const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId || 
      (v.brand === 'Audi' && v.model.includes('Q2 Ultra Sport') && v.year === 2018));
    
    if (vehicleIndex !== -1) {
      // Mettre à jour l'image
      vehicles[vehicleIndex].image = newImageUrl;
      
      // Sauvegarder les modifications
      saveImportedVehicles(vehicles, catalogType);
      
      console.log(`Image de ${vehicles[vehicleIndex].brand} ${vehicles[vehicleIndex].model} mise à jour avec succès.`);
      
      // Déclencher un événement pour rafraîchir l'affichage
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
      
      return true;
    } else {
      console.warn(`Véhicule avec ID ${vehicleId} non trouvé dans le catalogue ${catalogType}.`);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image du véhicule:", error);
    return false;
  }
};
