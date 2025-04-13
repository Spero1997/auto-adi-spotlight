
import { getImportedVehicles, saveImportedVehicles } from '@/utils/vehicleImportService';

/**
 * Script pour mettre à jour l'image de la Toyota C-HR
 */
export const updateToyotaCHRImage = () => {
  // Récupérer tous les véhicules
  const vehicles = getImportedVehicles();
  
  // Chercher la Toyota C-HR
  const toyotaIndex = vehicles.findIndex(v => 
    v.brand?.toLowerCase() === 'toyota' && 
    v.model?.toLowerCase().includes('c-hr') &&
    v.model?.toLowerCase().includes('gr sport')
  );
  
  // Si on a trouvé le véhicule, mettre à jour son image
  if (toyotaIndex !== -1) {
    console.log('Toyota C-HR trouvée, mise à jour de l\'image...');
    
    // Utiliser la nouvelle image téléchargée
    const newImageUrl = '/lovable-uploads/7c59b90c-9c91-4c3e-ae22-0560967a0dcf.png';
    
    // Vérification si l'image est déjà la bonne
    if (vehicles[toyotaIndex].image === newImageUrl) {
      console.log('L\'image de la Toyota C-HR est déjà à jour');
      return false;
    }
    
    const updatedVehicles = [...vehicles];
    updatedVehicles[toyotaIndex] = {
      ...updatedVehicles[toyotaIndex],
      image: newImageUrl
    };
    
    saveImportedVehicles(updatedVehicles);
    console.log('Image de la Toyota C-HR mise à jour avec succès!');
    return true;
  } else {
    // Si on n'a pas trouvé le véhicule, on le signale
    console.log('Aucune Toyota C-HR trouvée dans le catalogue.');
    return false;
  }
};
