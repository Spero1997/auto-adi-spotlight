
import { ImportedVehicle } from './types/vehicle';
import { getImportedVehicles as getVehiclesFromStorage, saveImportedVehicles as saveVehiclesToStorage } from './services/vehicleStorageService';
import { validateImageUrl, cleanImageUrl } from './services/imageValidationService';

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
 * Réinitialise le catalogue spécifié
 */
export const resetCatalog = (catalogType: string = 'all') => {
  if (catalogType === 'all' || catalogType === 'standard') {
    console.log("Réinitialisation du catalogue standard");
    localStorage.removeItem('catalog_id');
    localStorage.removeItem('imported_vehicles');
  }
  
  if (catalogType === 'all' || catalogType === 'featured') {
    console.log("Réinitialisation du catalogue vedette");
    localStorage.removeItem('featured_catalog_id');
    localStorage.removeItem('featured_vehicles');
  }
  
  // Déclencher un événement pour informer l'application du changement
  window.dispatchEvent(new CustomEvent('catalogChanged', { 
    detail: { catalogType: 'all' } 
  }));
  
  // Forcer un rechargement des véhicules
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  }, 100);
};

/**
 * Récupère les véhicules importés d'un catalogue
 */
export const getImportedVehicles = (catalogType: 'standard' | 'featured' = 'standard'): ImportedVehicle[] => {
  return getVehiclesFromStorage(catalogType);
};

/**
 * Enregistre les véhicules importés dans un catalogue
 */
export const saveImportedVehicles = (vehicles: ImportedVehicle[], catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  return saveVehiclesToStorage(vehicles, catalogType);
};

/**
 * Supprime un véhicule importé
 */
export const deleteImportedVehicle = (id: string): boolean => {
  try {
    const standardVehicles = getImportedVehicles('standard');
    const standardFiltered = standardVehicles.filter(v => v.id !== id);
    
    const featuredVehicles = getImportedVehicles('featured');
    const featuredFiltered = featuredVehicles.filter(v => v.id !== id);
    
    let success = true;
    
    // Si des véhicules ont été trouvés et supprimés dans le catalogue standard
    if (standardVehicles.length !== standardFiltered.length) {
      success = saveImportedVehicles(standardFiltered, 'standard') && success;
    }
    
    // Si des véhicules ont été trouvés et supprimés dans le catalogue vedette
    if (featuredVehicles.length !== featuredFiltered.length) {
      success = saveImportedVehicles(featuredFiltered, 'featured') && success;
    }
    
    return success;
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return false;
  }
};

/**
 * Ajoute un véhicule au catalogue spécifié
 */
export const addVehicle = async (vehicle: ImportedVehicle, catalogType: 'standard' | 'featured' = 'standard'): Promise<boolean> => {
  try {
    // Vérifier l'image avant d'ajouter le véhicule
    if (vehicle.image) {
      const isImageValid = await validateImageUrl(vehicle.image);
      
      if (!isImageValid) {
        console.error(`L'image ${vehicle.image} n'est pas valide ou accessible`);
      } else {
        console.log(`L'image ${vehicle.image} a été validée avec succès`);
      }
    }
    
    const vehicles = getImportedVehicles(catalogType);
    console.log(`Ajout/Mise à jour du véhicule ${vehicle.brand} ${vehicle.model} (${vehicle.id}) au catalogue ${catalogType}`);
    
    // Check if a vehicle with this ID already exists
    const existingVehicleIndex = vehicles.findIndex(v => v.id === vehicle.id);
    
    if (existingVehicleIndex >= 0) {
      // Update existing vehicle
      console.log(`Mise à jour du véhicule existant à l'index ${existingVehicleIndex}`);
      vehicles[existingVehicleIndex] = vehicle;
    } else {
      // Add new vehicle
      console.log(`Ajout d'un nouveau véhicule au catalogue (total avant ajout: ${vehicles.length})`);
      vehicles.push(vehicle);
    }
    
    // Assurez-vous que catalogType est correctement défini
    if (!vehicle.catalogType) {
      vehicle.catalogType = catalogType;
    }
    
    const success = saveImportedVehicles(vehicles, catalogType);
    
    if (success) {
      console.log(`Catalogue ${catalogType} sauvegardé avec ${vehicles.length} véhicules`);
      
      // Déclencher un événement pour informer l'application du changement
      console.log(`Déclenchement de l'événement vehiclesUpdated pour le catalogue ${catalogType}`);
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
      
      // Forcer un rechargement global après un court délai
      setTimeout(() => {
        console.log('Déclenchement d\'un événement vehiclesUpdated global pour assurer la mise à jour');
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
          detail: { catalogType: 'all' } 
        }));
      }, 100);
    }
    
    return success;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule:", error);
    return false;
  }
};

/**
 * Ajoute un véhicule importé au catalogue spécifié
 */
export const addImportedVehicle = (vehicle: ImportedVehicle, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    // Cloner le véhicule pour éviter des problèmes avec des références
    const vehicleToAdd = { ...vehicle };
    
    // S'assurer que le véhicule a un ID
    if (!vehicleToAdd.id) {
      vehicleToAdd.id = `vehicle-${catalogType}-${Date.now()}-${vehicleToAdd.brand.toLowerCase()}-${vehicleToAdd.model.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    // S'assurer que le catalogType est défini
    vehicleToAdd.catalogType = catalogType;
    
    // Ajouter un marquage "featured" si c'est le catalogue vedette
    if (catalogType === 'featured') {
      vehicleToAdd.featured = true;
    }
    
    const vehicles = getImportedVehicles(catalogType);
    
    // Vérifier si un véhicule avec cet ID existe déjà
    const existingIndex = vehicles.findIndex(v => v.id === vehicleToAdd.id);
    
    if (existingIndex >= 0) {
      vehicles[existingIndex] = vehicleToAdd;
    } else {
      vehicles.push(vehicleToAdd);
    }
    
    const success = saveImportedVehicles(vehicles, catalogType);
    
    if (success) {
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
    }
    
    return success;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule importé:", error);
    return false;
  }
};

/**
 * Extrait des véhicules depuis une URL
 */
export const extractVehiclesFromUrl = async (url: string, catalogType: 'standard' | 'featured' = 'standard'): Promise<ImportedVehicle[]> => {
  console.log(`Extraction de véhicules depuis l'URL: ${url}`);
  
  try {
    // Simulation d'extraction de véhicules - dans un vrai cas, on ferait un appel API ou un scraping
    const vehicles: ImportedVehicle[] = [
      {
        id: `vehicle-${catalogType}-${Date.now()}-demo-1`,
        brand: 'Demo',
        model: 'Véhicule 1',
        year: 2023,
        mileage: 0,
        price: 25000,
        fuelType: 'Essence',
        image: 'https://via.placeholder.com/400x300?text=Demo+Vehicle+1',
        catalogType
      },
      {
        id: `vehicle-${catalogType}-${Date.now()}-demo-2`,
        brand: 'Demo',
        model: 'Véhicule 2',
        year: 2022,
        mileage: 15000,
        price: 18000,
        fuelType: 'Diesel',
        image: 'https://via.placeholder.com/400x300?text=Demo+Vehicle+2',
        catalogType
      }
    ];
    
    // Ajouter les véhicules au catalogue
    vehicles.forEach(vehicle => {
      addImportedVehicle(vehicle, catalogType);
    });
    
    return vehicles;
  } catch (error) {
    console.error("Erreur lors de l'extraction des véhicules:", error);
    return [];
  }
};

/**
 * Génère une URL partageable pour le catalogue
 */
export const generateShareableUrl = (catalogType: 'standard' | 'featured' = 'standard'): string => {
  try {
    const baseUrl = window.location.origin;
    const path = catalogType === 'featured' ? '/vehicules/vedette' : '/vehicules';
    const catalogId = `catalog-${Date.now()}`;
    
    // Stocker l'ID du catalogue dans le localStorage
    if (catalogType === 'featured') {
      localStorage.setItem('featured_catalog_id', catalogId);
    } else {
      localStorage.setItem('catalog_id', catalogId);
    }
    
    return `${path}?catalog=${catalogId}`;
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL partageable:", error);
    return '/vehicules';
  }
};

/**
 * Récupère l'ID du catalogue depuis l'URL
 */
export const getCatalogIdFromUrl = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('catalog');
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du catalogue depuis l'URL:", error);
    return null;
  }
};

/**
 * Met à jour l'image d'un véhicule
 */
export const updateVehicleImage = (vehicleId: string, newImageUrl: string, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
    
    if (vehicleIndex === -1) {
      console.error(`Véhicule avec ID ${vehicleId} non trouvé dans le catalogue ${catalogType}`);
      return false;
    }
    
    // Mettre à jour l'image
    vehicles[vehicleIndex].image = newImageUrl;
    
    // Sauvegarder les modifications
    const success = saveImportedVehicles(vehicles, catalogType);
    
    if (success) {
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
    }
    
    return success;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image du véhicule:", error);
    return false;
  }
};

// Exportation du type ImportedVehicle
export type { ImportedVehicle };
