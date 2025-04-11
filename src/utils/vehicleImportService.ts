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

// Amélioration de la fonction d'ajout de véhicule pour vérifier l'image
export const addImportedVehicle = async (
  vehicle: ImportedVehicle, 
  catalogType: 'standard' | 'featured' = 'standard'
): Promise<boolean> => {
  try {
    // Vérifier l'image avant d'ajouter le véhicule
    const isImageValid = await validateImageUrl(vehicle.image);
    
    if (!isImageValid) {
      console.error(`L'image ${vehicle.image} n'est pas valide ou accessible`);
      // On ajoute quand même le véhicule mais on le signale
    } else {
      console.log(`L'image ${vehicle.image} a été validée avec succès`);
    }
    
    // Récupérer les véhicules existants
    const vehicles = getImportedVehicles(catalogType);
    
    // Vérifier si le véhicule existe déjà (par son ID)
    const existingVehicleIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    if (existingVehicleIndex !== -1) {
      // Si le véhicule existe déjà, on le met à jour
      console.log(`Mise à jour du véhicule existant avec l'ID ${vehicle.id}`);
      vehicles[existingVehicleIndex] = { ...vehicle, catalogType };
    } else {
      // Sinon, on l'ajoute
      console.log(`Ajout d'un nouveau véhicule avec l'ID ${vehicle.id}`);
      vehicles.push({ ...vehicle, catalogType });
    }
    
    // Sauvegarder les véhicules mis à jour
    saveImportedVehicles(vehicles, catalogType);
    
    // Déclencher un événement pour informer l'application de la modification
    console.log(`Déclenchement de l'événement vehiclesUpdated pour le catalogue ${catalogType}`);
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType } 
    }));
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule:", error);
    return false;
  }
};
