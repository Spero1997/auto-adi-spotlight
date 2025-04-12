
import { ImportedVehicle } from '../types/vehicle';
import { getImportedVehicles, saveImportedVehicles } from './vehicleStorageService';
import { validateImageUrl } from '../vehicleImportService';

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
  
  // Forcer un rechargement des véhicules
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  }, 100);
};

/**
 * Adds a vehicle to the specified catalog
 */
export const addVehicle = async (
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
    
    const vehicles = getImportedVehicles(catalogType);
    console.log(`Ajout/Mise à jour du véhicule ${vehicle.brand} ${vehicle.model} (${vehicle.id}) au catalogue ${catalogType}`);
    
    // Check if a vehicle with this ID already exists
    const existingVehicleIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    if (existingVehicleIndex >= 0) {
      // Update existing vehicle
      console.log(`Mise à jour du véhicule existant à l'index ${existingVehicleIndex}`);
      vehicles[existingVehicleIndex] = vehicle;
    } else {
      // Add new vehicle
      console.log(`Ajout d'un nouveau véhicule au catalogue (total avant ajout: ${vehicles.length})`);
      vehicles.push(vehicle);
    }
    
    // Assurez-vous que catalogType est correctement défini
    if (!vehicle.catalogType) {
      vehicle.catalogType = catalogType;
    }
    
    saveImportedVehicles(vehicles, catalogType);
    console.log(`Catalogue ${catalogType} sauvegardé avec ${vehicles.length} véhicules`);
    
    // Déclencher un événement pour informer l'application du changement
    console.log(`Déclenchement de l'événement vehiclesUpdated pour le catalogue ${catalogType}`);
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType } 
    }));
    
    // Forcer un rechargement global après un court délai
    setTimeout(() => {
      console.log('Déclenchement d\'un événement vehiclesUpdated global pour assurer la mise à jour');
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'all' } 
      }));
    }, 100);
    
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
    
    // Forcer un rechargement global
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'all' } 
      }));
    }, 100);
    
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
