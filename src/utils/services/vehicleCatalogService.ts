
import { ImportedVehicle } from '../types/vehicle';
import { getImportedVehicles, saveImportedVehicles } from './vehicleStorageService';
import { STORAGE_KEY, FEATURED_STORAGE_KEY } from '../constants/vehicleStorage';

/**
 * Adds a vehicle to a catalog
 */
export const addVehicle = (vehicle: ImportedVehicle, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    if (!vehicle.id) {
      console.error("Erreur: le véhicule doit avoir un ID");
      return false;
    }
    
    // Marquer le véhicule comme appartenant au catalogue approprié
    vehicle.catalogType = catalogType;
    
    // Récupérer la liste actuelle des véhicules
    const vehicles = getImportedVehicles(catalogType);
    
    // Vérifier si le véhicule existe déjà
    const existingIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    // S'il existe, le mettre à jour; sinon, l'ajouter
    if (existingIndex >= 0) {
      vehicles[existingIndex] = vehicle;
      console.log(`Véhicule mis à jour dans le catalogue ${catalogType}: ${vehicle.brand} ${vehicle.model}`);
    } else {
      vehicles.push(vehicle);
      console.log(`Véhicule ajouté au catalogue ${catalogType}: ${vehicle.brand} ${vehicle.model}`);
    }
    
    // Enregistrer les véhicules
    return saveImportedVehicles(vehicles, catalogType);
  } catch (error) {
    console.error(`Erreur lors de l'ajout du véhicule au catalogue ${catalogType}:`, error);
    return false;
  }
};

/**
 * Deletes a vehicle from a catalog
 */
export const deleteVehicle = (vehicleId: string, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    // Récupérer les véhicules
    const vehicles = getImportedVehicles(catalogType);
    
    // Filtrer pour exclure le véhicule à supprimer
    const filteredVehicles = vehicles.filter(v => v.id !== vehicleId);
    
    // Vérifier si le véhicule a été trouvé et supprimé
    if (filteredVehicles.length === vehicles.length) {
      console.warn(`Aucun véhicule avec ID ${vehicleId} trouvé dans le catalogue ${catalogType}`);
      return false;
    }
    
    // Enregistrer les véhicules mis à jour
    const success = saveImportedVehicles(filteredVehicles, catalogType);
    
    if (success) {
      console.log(`Véhicule avec ID ${vehicleId} supprimé du catalogue ${catalogType}`);
      
      // Déclencher explicitement l'événement de mise à jour
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType, action: 'delete', vehicleId, timestamp: Date.now() } 
      }));
    }
    
    return success;
  } catch (error) {
    console.error(`Erreur lors de la suppression du véhicule ${vehicleId} du catalogue ${catalogType}:`, error);
    return false;
  }
};

/**
 * Resets a catalog to empty state
 */
export const resetCatalog = (catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    
    // Vider le catalogue
    localStorage.setItem(storageKey, JSON.stringify([]));
    console.log(`Catalogue ${catalogType} réinitialisé avec succès`);
    
    // Déclencher explicitement l'événement de mise à jour
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType, action: 'reset', timestamp: Date.now() } 
    }));
    window.dispatchEvent(new CustomEvent('catalogChanged'));
    
    return true;
  } catch (error) {
    console.error(`Erreur lors de la réinitialisation du catalogue ${catalogType}:`, error);
    return false;
  }
};

/**
 * Moves a vehicle between catalogs
 */
export const moveVehicleBetweenCatalogs = (
  vehicleId: string, 
  fromCatalogType: 'standard' | 'featured',
  toCatalogType: 'standard' | 'featured'
): boolean => {
  try {
    // Si les catalogues sont identiques, rien à faire
    if (fromCatalogType === toCatalogType) {
      console.warn("Les catalogues source et destination sont identiques");
      return true;
    }
    
    // Récupérer les catalogues
    const sourceVehicles = getImportedVehicles(fromCatalogType);
    const targetVehicles = getImportedVehicles(toCatalogType);
    
    // Rechercher le véhicule dans le catalogue source
    const vehicleIndex = sourceVehicles.findIndex(v => v.id === vehicleId);
    
    if (vehicleIndex === -1) {
      console.error(`Véhicule avec ID ${vehicleId} non trouvé dans le catalogue ${fromCatalogType}`);
      return false;
    }
    
    // Obtenir une copie du véhicule
    const vehicle = { ...sourceVehicles[vehicleIndex] };
    
    // Mettre à jour le type de catalogue
    vehicle.catalogType = toCatalogType;
    
    if (toCatalogType === 'featured') {
      vehicle.featured = true;
    } else {
      vehicle.featured = false;
    }
    
    // Ajouter au catalogue cible
    targetVehicles.push(vehicle);
    
    // Supprimer du catalogue source
    sourceVehicles.splice(vehicleIndex, 1);
    
    // Enregistrer les deux catalogues
    const sourceSuccess = saveImportedVehicles(sourceVehicles, fromCatalogType);
    const targetSuccess = saveImportedVehicles(targetVehicles, toCatalogType);
    
    if (sourceSuccess && targetSuccess) {
      console.log(`Véhicule déplacé avec succès de ${fromCatalogType} vers ${toCatalogType}`);
      
      // Déclencher deux événements de mise à jour, un pour chaque catalogue
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'all', action: 'move', vehicleId, timestamp: Date.now() } 
      }));
      
      return true;
    } else {
      console.error(`Erreur lors du déplacement: sourceSuccess=${sourceSuccess}, targetSuccess=${targetSuccess}`);
      return false;
    }
  } catch (error) {
    console.error(`Erreur lors du déplacement du véhicule ${vehicleId}:`, error);
    return false;
  }
};
