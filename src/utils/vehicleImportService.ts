
import { ImportedVehicle } from './types/vehicle';

/**
 * Validates an image URL by attempting to load it
 */
export const validateImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Si l'URL est vide ou manquante, elle est considérée comme invalide
    if (!url || url.trim() === '') {
      console.log('URL vide ou non définie');
      resolve(false);
      return;
    }

    // Certaines URL sont considérées comme valides par défaut
    if (url.includes('placeholder') || url.includes('avatar') || url.startsWith('/')) {
      console.log('URL de placeholder ou relative considérée comme valide par défaut');
      resolve(true);
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      console.log(`Image valide: ${url}`);
      resolve(true);
    };
    
    img.onerror = () => {
      console.log(`Image invalide: ${url}`);
      resolve(false);
    };
    
    img.src = url;
    
    // Timeout pour éviter d'attendre trop longtemps
    setTimeout(() => {
      console.log(`Timeout pour l'URL: ${url}`);
      resolve(false);
    }, 5000);
  });
};

/**
 * Fonction pour nettoyer l'URL d'une image
 */
export const cleanImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Nettoyer les guillemets qui pourraient être inclus
  let cleanedUrl = url.replace(/["']/g, '');
  
  // Nettoyer les espaces
  cleanedUrl = cleanedUrl.trim();
  
  return cleanedUrl;
};

/**
 * Empty catalog reset function for backward compatibility
 */
export const resetCatalog = () => {
  console.log("Cette fonction a été désactivée.");
};

/**
 * Empty functions for backward compatibility with existing code
 */
export const getImportedVehicles = (): ImportedVehicle[] => {
  console.log("Cette fonction a été désactivée.");
  return [];
};

export const saveImportedVehicles = (vehicles: ImportedVehicle[]): boolean => {
  console.log("Cette fonction a été désactivée.");
  return false;
};

export const deleteImportedVehicle = (id: string): boolean => {
  console.log("Cette fonction a été désactivée.");
  return false;
};

export const addVehicle = (vehicle: ImportedVehicle, catalogType: string = 'standard'): boolean => {
  console.log("Cette fonction a été désactivée.");
  return false;
};
