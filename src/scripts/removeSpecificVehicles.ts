
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

/**
 * Vérifie si un véhicule correspond à l'un des véhicules à supprimer
 * Cette fonction n'est plus utilisée car la suppression est désactivée
 */
const shouldRemoveVehicle = (vehicle: ImportedVehicle): boolean => {
  return false; // Toujours retourner false pour ne jamais supprimer de véhicules
};

/**
 * IMPORTANT: Cette fonction est complètement désactivée pour garantir que
 * tous les véhicules sont visibles sur toutes les plateformes (mobile et desktop)
 */
export const removeSpecificVehicles = (): boolean => {
  console.log("IMPORTANT: Fonction de suppression de véhicules DÉSACTIVÉE - Tous les véhicules restent visibles");
  return true;
};
