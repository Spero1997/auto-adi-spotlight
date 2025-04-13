
import { getImportedVehicles, saveImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

// Structure pour définir les correspondances entre véhicules et images de remplacement
interface VehicleImageMapping {
  brandKeywords: string[];
  modelKeywords: string[];
  replacementImage: string;
  displayName: string;
}

// Définition des mappings pour les véhicules mentionnés
const vehicleImageMappings: VehicleImageMapping[] = [
  {
    brandKeywords: ['Kia'],
    modelKeywords: ['Sorento', 'Hybride rechargeable'],
    replacementImage: 'https://via.placeholder.com/800x600/007bff/ffffff?text=Kia+Sorento',
    displayName: 'Kia Sorento'
  },
  {
    brandKeywords: ['Audi'],
    modelKeywords: ['Q2', 'ULTRA SPORT'],
    replacementImage: '/lovable-uploads/aca2e4c0-cadb-4939-8cc9-5cc39ce3ed09.png',
    displayName: 'Audi Q2'
  },
  {
    brandKeywords: ['Volvo'],
    modelKeywords: ['V40', 'D2', 'R-Design'],
    replacementImage: 'https://via.placeholder.com/800x600/023047/ffffff?text=Volvo+V40',
    displayName: 'Volvo V40'
  },
  {
    brandKeywords: ['Toyota'],
    modelKeywords: ['C-HR', 'Hybride', 'GR Sport'],
    replacementImage: 'https://via.placeholder.com/800x600/219ebc/ffffff?text=Toyota+C-HR',
    displayName: 'Toyota C-HR'
  }
];

/**
 * Vérifie si un véhicule correspond aux critères de recherche
 */
const matchesVehicle = (vehicle: ImportedVehicle, mapping: VehicleImageMapping): boolean => {
  // Vérifier la marque
  const matchesBrand = mapping.brandKeywords.some(keyword => 
    vehicle.brand?.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (!matchesBrand) return false;
  
  // Vérifier le modèle (au moins un des mots-clés doit correspondre)
  const matchesModel = mapping.modelKeywords.some(keyword => 
    vehicle.model?.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return matchesModel;
};

/**
 * Met à jour les images des véhicules spécifiés
 */
export const updateVehicleImages = (): boolean => {
  try {
    // Récupérer les véhicules des deux catalogues
    const standardVehicles = getImportedVehicles('standard');
    const featuredVehicles = getImportedVehicles('featured');
    
    let standardUpdated = false;
    let featuredUpdated = false;
    
    // Parcourir les mappings et mettre à jour les images correspondantes dans le catalogue standard
    vehicleImageMappings.forEach(mapping => {
      const vehicleIndex = standardVehicles.findIndex(v => matchesVehicle(v, mapping));
      
      if (vehicleIndex !== -1) {
        console.log(`${mapping.displayName} trouvé dans le catalogue standard, mise à jour de l'image...`);
        standardVehicles[vehicleIndex] = {
          ...standardVehicles[vehicleIndex],
          image: mapping.replacementImage
        };
        standardUpdated = true;
      }
    });
    
    // Parcourir les mappings et mettre à jour les images correspondantes dans le catalogue vedette
    vehicleImageMappings.forEach(mapping => {
      const vehicleIndex = featuredVehicles.findIndex(v => matchesVehicle(v, mapping));
      
      if (vehicleIndex !== -1) {
        console.log(`${mapping.displayName} trouvé dans le catalogue vedette, mise à jour de l'image...`);
        featuredVehicles[vehicleIndex] = {
          ...featuredVehicles[vehicleIndex],
          image: mapping.replacementImage
        };
        featuredUpdated = true;
      }
    });
    
    // Sauvegarder les modifications si nécessaire
    if (standardUpdated) {
      saveImportedVehicles(standardVehicles, 'standard');
      console.log("Images mises à jour dans le catalogue standard");
    }
    
    if (featuredUpdated) {
      saveImportedVehicles(featuredVehicles, 'featured');
      console.log("Images mises à jour dans le catalogue vedette");
    }
    
    if (standardUpdated || featuredUpdated) {
      toast.success("Images des véhicules mises à jour");
      return true;
    } else {
      console.log("Aucun des véhicules spécifiés n'a été trouvé dans les catalogues");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des images des véhicules:", error);
    toast.error("Erreur lors de la mise à jour des images");
    return false;
  }
};
