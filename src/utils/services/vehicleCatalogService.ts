
import { ImportedVehicle } from '../types/vehicle';
import { CATALOG_ID_KEY, FEATURED_CATALOG_ID_KEY } from '../constants/vehicleStorage';
import { getImportedVehicles, saveImportedVehicles } from './vehicleStorageService';

/**
 * Réinitialise le catalogue en supprimant tous les véhicules
 */
export const resetCatalog = (catalogType?: 'standard' | 'featured' | 'all'): boolean => {
  try {
    if (catalogType === 'standard' || catalogType === 'all' || !catalogType) {
      // Réinitialiser le catalogue standard
      const newCatalogId = `catalog-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(CATALOG_ID_KEY, newCatalogId);
      saveImportedVehicles([], 'standard');
      console.log("Le catalogue standard a été réinitialisé");
    }
    
    if (catalogType === 'featured' || catalogType === 'all') {
      // Réinitialiser le catalogue vedette
      const newFeaturedCatalogId = `catalog-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(FEATURED_CATALOG_ID_KEY, newFeaturedCatalogId);
      saveImportedVehicles([], 'featured');
      console.log("Le catalogue vedette a été réinitialisé");
    }
    
    // Notifier les autres composants du changement de catalogue
    window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: catalogType || 'all' } }));
    return true;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du catalogue:", error);
    return false;
  }
};

/**
 * Ajoute un nouveau véhicule importé au stockage local
 */
export const addImportedVehicle = (vehicle: ImportedVehicle, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    
    // Assurez-vous que le véhicule a toutes les propriétés nécessaires définies
    const vehicleWithId = {
      ...vehicle,
      id: vehicle.id || `vehicle-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      catalogType: catalogType,
      featured: catalogType === 'featured' ? true : !!vehicle.featured
    };
    
    console.log(`addImportedVehicle: Ajout d'un véhicule au catalogue ${catalogType}:`, vehicleWithId);
    
    const updatedVehicles = [...vehicles, vehicleWithId];
    const success = saveImportedVehicles(updatedVehicles, catalogType);
    
    if (success) {
      console.log(`addImportedVehicle: Véhicule ${vehicleWithId.brand} ${vehicleWithId.model} ajouté avec succès au catalogue ${catalogType}`);
    }
    
    return success;
  } catch (error) {
    console.error(`Erreur lors de l'ajout du véhicule (${catalogType}):`, error);
    return false;
  }
};

/**
 * Supprime un véhicule importé du stockage local
 */
export const deleteImportedVehicle = (vehicleId: string, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
    
    if (vehicles.length === updatedVehicles.length) {
      console.warn(`Véhicule avec l'ID ${vehicleId} non trouvé dans le catalogue ${catalogType}`);
      return false;
    }
    
    saveImportedVehicles(updatedVehicles, catalogType);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du véhicule (${catalogType}):`, error);
    return false;
  }
};

/**
 * Déplace un véhicule d'un catalogue à l'autre
 */
export const moveVehicleBetweenCatalogs = (vehicleId: string, fromCatalogType: 'standard' | 'featured', toCatalogType: 'standard' | 'featured'): boolean => {
  try {
    // Récupérer le véhicule du catalogue source
    const sourceVehicles = getImportedVehicles(fromCatalogType);
    const vehicleToMove = sourceVehicles.find(v => v.id === vehicleId);
    
    if (!vehicleToMove) {
      console.warn(`Véhicule avec l'ID ${vehicleId} non trouvé dans le catalogue ${fromCatalogType}`);
      return false;
    }
    
    // Supprimer le véhicule du catalogue source
    const updatedSourceVehicles = sourceVehicles.filter(v => v.id !== vehicleId);
    saveImportedVehicles(updatedSourceVehicles, fromCatalogType);
    
    // Ajouter le véhicule au catalogue de destination avec un nouvel ID
    const updatedVehicle = {
      ...vehicleToMove,
      id: `vehicle-${toCatalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      catalogType: toCatalogType,
      featured: toCatalogType === 'featured' // Mettre à jour le statut "featured" en fonction du catalogue de destination
    };
    
    const destinationVehicles = getImportedVehicles(toCatalogType);
    const updatedDestinationVehicles = [...destinationVehicles, updatedVehicle];
    saveImportedVehicles(updatedDestinationVehicles, toCatalogType);
    
    console.log(`Véhicule déplacé du catalogue ${fromCatalogType === 'featured' ? 'vedette' : 'standard'} vers le catalogue ${toCatalogType === 'featured' ? 'vedette' : 'standard'}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors du déplacement du véhicule:`, error);
    return false;
  }
};
