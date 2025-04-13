
import { getImportedVehicles, saveImportedVehicles } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const updateKiaSorentoImage = () => {
  try {
    // Récupérer les véhicules du catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    // Chercher la Kia Sorento
    const kiaSorentoIndex = standardVehicles.findIndex(
      v => v.brand === "Kia" && 
          v.model === "Sorento" ||
          v.id.includes("kia-sorento")
    );
    
    if (kiaSorentoIndex !== -1) {
      console.log("Kia Sorento trouvée dans le catalogue standard, mise à jour de l'image...");
      
      // Mettre à jour l'image
      standardVehicles[kiaSorentoIndex] = {
        ...standardVehicles[kiaSorentoIndex],
        image: '/lovable-uploads/baea681c-b5d8-4fa3-b426-c0e82cb8d4c3.png'
      };
      
      // Sauvegarder les modifications
      saveImportedVehicles(standardVehicles, 'standard');
      console.log("Image de la Kia Sorento mise à jour avec succès !");
      toast.success("Image de la Kia Sorento mise à jour");
      return true;
    } else {
      console.log("Kia Sorento non trouvée dans le catalogue standard");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image de la Kia Sorento:", error);
    toast.error("Erreur lors de la mise à jour de l'image");
    return false;
  }
};
