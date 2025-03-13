
import { toast } from "sonner";
import { extractVehiclesFromUrl as extractVehiclesWithScraper } from "./extractionService";

export interface ImportedVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  price: number;
  image: string;
  description?: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  doors?: number;
  engine?: string;
  features?: string[];
  excluded?: boolean;
  featured?: boolean; // Nouvelle propriété pour marquer les véhicules en vedette
}

const STORAGE_KEY = 'imported_vehicles';
const CATALOG_ID_KEY = 'catalog_id';

/**
 * Génère une URL partageable pour le catalogue actuel
 */
export const generateShareableUrl = () => {
  try {
    // Générer un ID unique si aucun n'existe déjà
    let catalogId = localStorage.getItem(CATALOG_ID_KEY);
    
    if (!catalogId) {
      catalogId = `catalog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(CATALOG_ID_KEY, catalogId);
    }
    
    // Construire l'URL avec l'ID du catalogue
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = new URL(baseUrl);
    shareableUrl.searchParams.set('catalog', catalogId);
    
    return shareableUrl.toString();
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL partageable:", error);
    return window.location.href;
  }
};

/**
 * Récupère l'identifiant du catalogue à partir de l'URL ou utilise le catalogue local
 */
export const getCatalogIdFromUrl = () => {
  try {
    // Récupérer l'ID depuis l'URL si disponible
    const url = new URL(window.location.href);
    const catalogId = url.searchParams.get('catalog');
    
    if (catalogId) {
      // Stocker l'ID de catalogue dans localStorage pour le réutiliser
      localStorage.setItem(CATALOG_ID_KEY, catalogId);
      return catalogId;
    }
    
    // Si pas d'ID dans l'URL, essayer de récupérer depuis localStorage
    return localStorage.getItem(CATALOG_ID_KEY) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du catalogue:", error);
    return null;
  }
};

// Catalogue vide par défaut
const defaultVehicles: ImportedVehicle[] = [];

/**
 * Récupère les véhicules importés depuis le stockage local
 */
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const vehiclesJson = localStorage.getItem(STORAGE_KEY);
    
    // Si aucun véhicule n'est trouvé, initialiser avec un catalogue vide
    if (!vehiclesJson) {
      saveImportedVehicles(defaultVehicles);
      return defaultVehicles;
    }
    
    return JSON.parse(vehiclesJson);
  } catch (error) {
    console.error("Erreur lors du chargement des véhicules:", error);
    return defaultVehicles;
  }
};

/**
 * Sauvegarde les véhicules dans le stockage local
 */
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    
    // Déclencher un événement pour notifier les autres composants
    window.dispatchEvent(new Event('vehiclesUpdated'));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des véhicules:", error);
    toast.error("Erreur lors de la sauvegarde des véhicules.");
    return false;
  }
};

/**
 * Réinitialise le catalogue en supprimant tous les véhicules
 */
export const resetCatalog = (): boolean => {
  try {
    // Générer un nouvel ID de catalogue pour marquer le nouveau catalogue
    const newCatalogId = `catalog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(CATALOG_ID_KEY, newCatalogId);
    
    // Sauvegarder un catalogue vide
    saveImportedVehicles([]);
    
    toast.success("Le catalogue a été réinitialisé avec succès");
    
    // Notifier les autres composants du changement de catalogue
    window.dispatchEvent(new Event('catalogChanged'));
    return true;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du catalogue:", error);
    toast.error("Erreur lors de la réinitialisation du catalogue");
    return false;
  }
};

/**
 * Ajoute un nouveau véhicule importé au stockage local
 */
export const addImportedVehicle = (vehicle: ImportedVehicle): boolean => {
  try {
    const vehicles = getImportedVehicles();
    const vehicleWithId = {
      ...vehicle,
      id: vehicle.id || `vehicle-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
    
    const updatedVehicles = [...vehicles, vehicleWithId];
    saveImportedVehicles(updatedVehicles);
    
    toast.success("Véhicule ajouté avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule:", error);
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};

/**
 * Supprime un véhicule importé du stockage local
 */
export const deleteImportedVehicle = (vehicleId: string): boolean => {
  try {
    const vehicles = getImportedVehicles();
    const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
    
    if (vehicles.length === updatedVehicles.length) {
      console.warn(`Véhicule avec l'ID ${vehicleId} non trouvé`);
      return false;
    }
    
    saveImportedVehicles(updatedVehicles);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    toast.error("Erreur lors de la suppression du véhicule");
    return false;
  }
};

/**
 * Extraction des véhicules depuis une URL
 */
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  try {
    toast.info("Extraction des véhicules en cours...");
    const vehicles = await extractVehiclesWithScraper(url);
    
    if (!vehicles || vehicles.length === 0) {
      toast.error("Aucun véhicule trouvé sur cette URL");
      return [];
    }
    
    // Ajouter les véhicules extraits au catalogue
    const existingVehicles = getImportedVehicles();
    
    // Assigner des IDs uniques et normaliser les URLs des images
    const processedVehicles = vehicles.map(vehicle => ({
      ...vehicle,
      id: `vehicle-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      image: vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image'
    }));
    
    const updatedVehicles = [...existingVehicles, ...processedVehicles];
    saveImportedVehicles(updatedVehicles);
    
    toast.success(`${vehicles.length} véhicule(s) importé(s) avec succès`);
    return processedVehicles;
  } catch (error) {
    console.error("Erreur lors de l'extraction des véhicules:", error);
    toast.error("Erreur lors de l'extraction des véhicules");
    return [];
  }
};

/**
 * Marque un véhicule comme étant en vedette ou non
 */
export const toggleVehicleFeatured = (vehicleId: string, featured: boolean): boolean => {
  try {
    const vehicles = getImportedVehicles();
    const updatedVehicles = vehicles.map(v => 
      v.id === vehicleId ? { ...v, featured } : v
    );
    
    saveImportedVehicles(updatedVehicles);
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut vedette:", error);
    toast.error("Erreur lors de la mise à jour du véhicule");
    return false;
  }
};

// Aliasing pour compatibilité avec le code existant
export const addVehicle = addImportedVehicle;
export const deleteVehicle = deleteImportedVehicle;
