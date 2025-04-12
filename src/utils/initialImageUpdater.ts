
import { updateVehicleImage } from './vehicleImportService';

// Fonction pour mettre à jour l'image de l'Audi Q2 au chargement de l'application
export const updateAudiQ2Image = () => {
  // URL de l'image téléchargée
  const newImageUrl = '/lovable-uploads/f1910bf4-1361-4308-b68a-e2b90159423d.png';
  
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
