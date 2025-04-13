
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

// Liste des véhicules à supprimer (vide pour le moment car nous voulons garder tous les véhicules)
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
 * IMPORTANT: Désactivé pour maintenir la cohérence entre mobile et desktop
 */
export const removeSpecificVehicles = (): boolean => {
  console.log("Suppression spécifique de véhicules désactivée pour maintenir tous les véhicules visibles");
  return true;
};
