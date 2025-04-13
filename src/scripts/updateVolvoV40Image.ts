
import { getImportedVehicles, saveImportedVehicles } from '@/utils/vehicleImportService';

/**
 * Script pour mettre à jour l'image de la Volvo V40 D2 R-Design
 */
export const updateVolvoV40Image = () => {
  // Récupérer tous les véhicules
  const vehicles = getImportedVehicles();
  
  // Chercher la Volvo V40 D2 R-Design
  const volvoIndex = vehicles.findIndex(v => 
    v.brand?.toLowerCase() === 'volvo' && 
    v.model?.toLowerCase().includes('v40') &&
    v.model?.toLowerCase().includes('r-design')
  );
  
  // Si on a trouvé le véhicule, mettre à jour son image
  if (volvoIndex !== -1) {
    console.log('Volvo V40 trouvée, mise à jour de l\'image...');
    
    // Utiliser la nouvelle image téléchargée
    const newImageUrl = '/lovable-uploads/f5593454-45bf-457b-948f-dc913b26c8e1.png';
    
    // Vérification si l'image est déjà la bonne
    if (vehicles[volvoIndex].image === newImageUrl) {
      console.log('L\'image de la Volvo V40 est déjà à jour');
      return false;
    }
    
    const updatedVehicles = [...vehicles];
    updatedVehicles[volvoIndex] = {
      ...updatedVehicles[volvoIndex],
      image: newImageUrl
    };
    
    saveImportedVehicles(updatedVehicles);
    console.log('Image de la Volvo V40 mise à jour avec succès!');
    return true;
  } else {
    // Si on n'a pas trouvé le véhicule, on le signale
    console.log('Aucune Volvo V40 D2 R-Design trouvée dans le catalogue.');
    return false;
  }
};
