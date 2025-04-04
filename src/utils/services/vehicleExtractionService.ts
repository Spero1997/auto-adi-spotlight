
import { ImportedVehicle } from '../types/vehicle';
import { extractVehiclesFromUrl as extractVehiclesWithScraper } from '../extractionService';
import { getImportedVehicles, saveImportedVehicles } from './vehicleStorageService';

/**
 * Extraction des véhicules depuis une URL
 */
export const extractVehiclesFromUrl = async (url: string, catalogType: 'standard' | 'featured' = 'standard'): Promise<ImportedVehicle[]> => {
  try {
    console.log("Extraction des véhicules en cours...");
    const vehicles = await extractVehiclesWithScraper(url);
    
    if (!vehicles || vehicles.length === 0) {
      console.warn("Aucun véhicule trouvé sur cette URL");
      return [];
    }
    
    // Ajouter les véhicules extraits au catalogue
    const existingVehicles = getImportedVehicles(catalogType);
    
    console.log(`extractVehiclesFromUrl: ${vehicles.length} véhicules extraits pour le catalogue ${catalogType}`);
    
    // Assigner des IDs uniques et normaliser les URLs des images
    const processedVehicles = vehicles.map(vehicle => ({
      ...vehicle,
      id: `vehicle-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      image: vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image',
      catalogType: catalogType,
      featured: catalogType === 'featured' // Marquer comme vedette si ajouté au catalogue vedette
    }));
    
    const updatedVehicles = [...existingVehicles, ...processedVehicles];
    saveImportedVehicles(updatedVehicles, catalogType);
    
    console.log(`extractVehiclesFromUrl: ${processedVehicles.length} véhicules importés dans le catalogue ${catalogType}`);
    return processedVehicles;
  } catch (error) {
    console.error(`Erreur lors de l'extraction des véhicules pour le catalogue ${catalogType}:`, error);
    return [];
  }
};
