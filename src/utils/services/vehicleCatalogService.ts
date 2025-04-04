
import { ImportedVehicle } from '../types/vehicle';
import { getImportedVehicles, saveImportedVehicles } from './vehicleStorageService';

/**
 * Resets all catalogs to their default empty state
 */
export const resetCatalog = (catalogType: 'standard' | 'featured' | 'all' = 'all'): void => {
  if (catalogType === 'all' || catalogType === 'standard') {
    console.log("Réinitialisation du catalogue standard");
    localStorage.removeItem('catalog_id');
    localStorage.removeItem('imported_vehicles');
  }
  
  if (catalogType === 'all' || catalogType === 'featured') {
    console.log("Réinitialisation du catalogue vedette");
    localStorage.removeItem('featured_catalog_id');
    localStorage.removeItem('featured_vehicles');
  }
  
  // Déclencher un événement pour informer l'application du changement
  window.dispatchEvent(new CustomEvent('catalogChanged', { 
    detail: { catalogType: 'all' } 
  }));
};

/**
 * Adds a vehicle to the specified catalog
 */
export const addVehicle = (
  vehicle: ImportedVehicle, 
  catalogType: 'standard' | 'featured' = 'standard'
): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    
    // Check if a vehicle with this ID already exists
    const existingVehicleIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    if (existingVehicleIndex >= 0) {
      // Update existing vehicle
      vehicles[existingVehicleIndex] = vehicle;
    } else {
      // Add new vehicle
      vehicles.push(vehicle);
    }
    
    saveImportedVehicles(vehicles, catalogType);
    
    // Déclencher un événement pour informer l'application du changement
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType } 
    }));
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule:", error);
    return false;
  }
};

/**
 * Deletes a vehicle from the specified catalog
 */
export const deleteVehicle = (
  id: string,
  catalogType: 'standard' | 'featured' = 'standard'
): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    
    if (vehicles.length === filteredVehicles.length) {
      console.warn(`Aucun véhicule trouvé avec l'ID ${id} dans le catalogue ${catalogType}`);
      return false;
    }
    
    saveImportedVehicles(filteredVehicles, catalogType);
    
    // Déclencher un événement pour informer l'application du changement
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType } 
    }));
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return false;
  }
};

/**
 * Moves a vehicle between catalogs
 */
export const moveVehicleBetweenCatalogs = (
  vehicleId: string,
  sourceCatalogType: 'standard' | 'featured',
  targetCatalogType: 'standard' | 'featured'
): boolean => {
  try {
    if (sourceCatalogType === targetCatalogType) {
      console.warn("Les catalogues source et cible sont identiques");
      return false;
    }
    
    const sourceVehicles = getImportedVehicles(sourceCatalogType);
    const targetVehicles = getImportedVehicles(targetCatalogType);
    
    // Trouver le véhicule à déplacer
    const vehicleToMove = sourceVehicles.find(v => v.id === vehicleId);
    
    if (!vehicleToMove) {
      console.warn(`Véhicule avec ID ${vehicleId} non trouvé dans le catalogue ${sourceCatalogType}`);
      return false;
    }
    
    // Mettre à jour le type de catalogue du véhicule
    const updatedVehicle = {
      ...vehicleToMove,
      catalogType: targetCatalogType
    };
    
    // Retirer du catalogue source
    const updatedSourceVehicles = sourceVehicles.filter(v => v.id !== vehicleId);
    saveImportedVehicles(updatedSourceVehicles, sourceCatalogType);
    
    // Ajouter au catalogue cible
    targetVehicles.push(updatedVehicle);
    saveImportedVehicles(targetVehicles, targetCatalogType);
    
    // Déclencher des événements pour informer l'application des changements
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
    
    return true;
  } catch (error) {
    console.error("Erreur lors du déplacement du véhicule entre catalogues:", error);
    return false;
  }
};
