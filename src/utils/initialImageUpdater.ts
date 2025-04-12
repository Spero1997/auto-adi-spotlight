
import { validateImageUrl } from './services/imageValidationService';
import { updateVehicleImage } from './vehicleImportService';

/**
 * Utility function to try to update a vehicle's image if it's invalid
 */
export const tryUpdateVehicleImageIfNeeded = async (vehicleId: string, imageUrl: string, fallbackImageUrl: string, catalogType: 'standard' | 'featured' = 'standard'): Promise<boolean> => {
  try {
    // Verify if current image is valid
    const isImageValid = await validateImageUrl(imageUrl);
    
    if (!isImageValid && fallbackImageUrl) {
      console.log(`Image invalide détectée pour le véhicule ${vehicleId}, tentative de mise à jour avec l'image de secours`);
      
      // Check if fallback image is valid
      const isFallbackValid = await validateImageUrl(fallbackImageUrl);
      
      if (isFallbackValid) {
        console.log(`Mise à jour de l'image du véhicule ${vehicleId} avec l'image de secours ${fallbackImageUrl}`);
        return updateVehicleImage(vehicleId, fallbackImageUrl, catalogType);
      } else {
        console.log(`L'image de secours ${fallbackImageUrl} est également invalide`);
        return false;
      }
    }
    
    return isImageValid;
  } catch (error) {
    console.error("Erreur lors de la vérification/mise à jour de l'image:", error);
    return false;
  }
};
