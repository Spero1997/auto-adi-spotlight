
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

/**
 * Vérifie si un véhicule correspond à l'un des véhicules à supprimer
 */
const shouldRemoveVehicle = (vehicle: ImportedVehicle): boolean => {
  // Spécifiquement filtrer les BMW X7
  if (vehicle.brand === "BMW" && vehicle.model && vehicle.model.includes("X7")) {
    return true;
  }
  return false;
};

/**
 * Supprime les véhicules spécifiques (BMW X7) de tous les catalogues
 */
export const removeSpecificVehicles = (): boolean => {
  try {
    console.log("Suppression des véhicules BMW X7 de tous les catalogues...");
    
    // Nettoyer le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    const filteredStandardVehicles = standardVehicles.filter(vehicle => !shouldRemoveVehicle(vehicle));
    
    if (standardVehicles.length !== filteredStandardVehicles.length) {
      console.log(`${standardVehicles.length - filteredStandardVehicles.length} BMW X7 supprimées du catalogue standard`);
      saveImportedVehicles(filteredStandardVehicles, 'standard');
    }
    
    // Nettoyer le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    const filteredFeaturedVehicles = featuredVehicles.filter(vehicle => !shouldRemoveVehicle(vehicle));
    
    if (featuredVehicles.length !== filteredFeaturedVehicles.length) {
      console.log(`${featuredVehicles.length - filteredFeaturedVehicles.length} BMW X7 supprimées du catalogue vedette`);
      saveImportedVehicles(filteredFeaturedVehicles, 'featured');
    }
    
    // Déclencher un événement pour notifier les composants d'interface utilisateur
    window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: 'all' } }));
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des BMW X7:", error);
    return false;
  }
};
