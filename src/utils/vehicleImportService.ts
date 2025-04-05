
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
