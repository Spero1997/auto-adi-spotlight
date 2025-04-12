
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

// Re-export catalog management services directly
export { addVehicle, deleteVehicle, resetCatalog, moveVehicleBetweenCatalogs };

// Import extraction service from both possible locations
import { extractVehiclesFromUrl as extractFromService } from './services/vehicleExtractionService';

// Re-export the extraction service
export const extractVehiclesFromUrl = extractFromService;

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
