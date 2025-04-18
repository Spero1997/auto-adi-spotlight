
import { getImportedVehicles, saveImportedVehicles } from '@/utils/vehicleImportService';

export const updateKiaSorentoImage = () => {
  try {
    // Récupérer les véhicules du catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    // Chercher la Kia Sorento
    const kiaSorentoIndex = standardVehicles.findIndex(
      v => v.brand === "Kia" && 
          (v.model === "Sorento" ||
          v.model?.includes("Sorento") ||
          v.id.includes("kia-sorento"))
    );
    
    if (kiaSorentoIndex !== -1) {
      console.log("Kia Sorento trouvée dans le catalogue standard, mise à jour de l'image...");
      
      // Vérifier si l'image est déjà correcte
      const currentImage = standardVehicles[kiaSorentoIndex].image;
      const targetImage = '/lovable-uploads/1d43c09f-608c-456e-bb7f-ae06eb9bab3b.png';
      
      // Ne mettre à jour que si l'image actuelle est différente de l'image cible ou un placeholder
      if (currentImage !== targetImage && (currentImage?.includes('placeholder') || !currentImage)) {
        // Mettre à jour l'image avec l'image correcte
        standardVehicles[kiaSorentoIndex] = {
          ...standardVehicles[kiaSorentoIndex],
          image: targetImage
        };
        
        // Sauvegarder les modifications
        saveImportedVehicles(standardVehicles, 'standard');
        console.log("Image de la Kia Sorento mise à jour avec succès !");
        return true;
      } else {
        console.log("L'image de la Kia Sorento est déjà à jour.");
        return false;
      }
    } else {
      console.log("Kia Sorento non trouvée dans le catalogue standard");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image de la Kia Sorento:", error);
    return false;
  }
};
