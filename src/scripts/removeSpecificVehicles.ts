
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

// Liste des véhicules à supprimer (vide car nous voulons garder tous les véhicules)
const vehiclesToRemove: { brand: string; model: string }[] = [];

/**
 * Vérifie si un véhicule correspond à l'un des véhicules à supprimer
 */
const shouldRemoveVehicle = (vehicle: ImportedVehicle): boolean => {
  return vehiclesToRemove.some(vehicleToRemove => 
    vehicle.brand?.toLowerCase().includes(vehicleToRemove.brand.toLowerCase()) && 
    vehicle.model?.toLowerCase().includes(vehicleToRemove.model.toLowerCase())
  );
};

/**
 * Supprime les véhicules spécifiques des catalogues
 * IMPORTANT: Cette fonction est désactivée et retourne toujours true pour assurer
 * que tous les véhicules sont visibles sur toutes les plateformes
 */
export const removeSpecificVehicles = (): boolean => {
  console.log("Fonction de suppression spécifique de véhicules DÉSACTIVÉE - Tous les véhicules restent visibles");
  return true;
};
