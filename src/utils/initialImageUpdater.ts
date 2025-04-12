
import { updateVehicleImage } from './vehicleImportService';

// Fonction pour mettre à jour l'image de l'Audi Q2 au chargement de l'application
export const updateAudiQ2Image = () => {
  // URL de la nouvelle image téléchargée
  const newImageUrl = '/lovable-uploads/495da563-1459-4d21-b284-b231e9820ce3.png';
  
  console.log("Tentative de mise à jour de l'image de l'Audi Q2 Ultra Sport...");
  
  // Appel de la fonction updateVehicleImage pour tous les catalogues
  const standardUpdate = updateVehicleImage("audi-q2", newImageUrl, 'standard');
  const featuredUpdate = updateVehicleImage("audi-q2", newImageUrl, 'featured');
  
  if (standardUpdate || featuredUpdate) {
    console.log("L'image de l'Audi Q2 Ultra Sport a été mise à jour avec succès !");
  } else {
    console.warn("Aucun véhicule Audi Q2 Ultra Sport n'a été trouvé dans les catalogues.");
  }
};
