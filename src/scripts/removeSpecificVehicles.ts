
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

// Liste des véhicules à supprimer
const vehiclesToRemove = [
  {
    brand: 'BMW',
    model: 'X7 xDrive 40d M Sport Pro'
  },
  {
    brand: 'Toyota',
    model: 'C-HR 1.8i Hybride GR Sport'
  },
  {
    brand: 'Renault',
    model: 'Scenic 1.5DCI 7-SETER BOSE-EDITION'
  },
  {
    brand: 'Kia',
    model: 'Sorento 1.6 T-GDI Hybride rechargeable'
  }
];

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
 */
export const removeSpecificVehicles = (): boolean => {
  try {
    // Récupérer les véhicules des deux catalogues
    const standardVehicles = getImportedVehicles('standard');
    const featuredVehicles = getImportedVehicles('featured');
    
    // Filtrer les véhicules à conserver
    const filteredStandardVehicles = standardVehicles.filter(vehicle => !shouldRemoveVehicle(vehicle));
    const filteredFeaturedVehicles = featuredVehicles.filter(vehicle => !shouldRemoveVehicle(vehicle));
    
    // Compter les véhicules supprimés
    const standardRemoved = standardVehicles.length - filteredStandardVehicles.length;
    const featuredRemoved = featuredVehicles.length - filteredFeaturedVehicles.length;
    
    // Sauvegarder les catalogues mis à jour
    saveImportedVehicles(filteredStandardVehicles, 'standard');
    saveImportedVehicles(filteredFeaturedVehicles, 'featured');
    
    console.log(`${standardRemoved} véhicules spécifiques supprimés du catalogue standard`);
    console.log(`${featuredRemoved} véhicules spécifiques supprimés du catalogue vedette`);
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des véhicules spécifiques:", error);
    return false;
  }
};
