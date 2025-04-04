
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

// Re-export catalog management services
export {
  resetCatalog,
  addVehicle,
  deleteVehicle,
  moveVehicleBetweenCatalogs
} from './services/vehicleCatalogService';

// Re-export extraction service
export {
  extractVehiclesFromUrl
} from './services/vehicleExtractionService';

// Aliasing for compatibility with existing code
import { addVehicle } from './services/vehicleCatalogService';
import { deleteVehicle } from './services/vehicleCatalogService';
export const addImportedVehicle = addVehicle;
export const deleteImportedVehicle = deleteVehicle;
