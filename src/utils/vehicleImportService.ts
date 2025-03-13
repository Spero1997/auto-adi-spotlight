
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

/**
 * Récupère les véhicules importés depuis le stockage local
 * Retourne un tableau vide (catalogue supprimé)
 */
export const getImportedVehicles = (): ImportedVehicle[] => {
  // Retourne un tableau vide (catalogue supprimé)
  return [];
};

/**
 * Sauvegarde les véhicules dans le stockage local
 * Cette fonction est maintenant désactivée
 */
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): boolean => {
  console.log("Sauvegarde désactivée - Le catalogue a été supprimé");
  return true;
};

/**
 * Ajoute un nouveau véhicule importé au stockage local
 * Cette fonction est maintenant désactivée
 */
export const addImportedVehicle = (vehicle: ImportedVehicle): boolean => {
  console.log("Ajout désactivé - Le catalogue a été supprimé");
  toast.info("Le catalogue a été supprimé, impossible d'ajouter un véhicule");
  return false;
};

/**
 * Supprime un véhicule importé du stockage local
 * Cette fonction est maintenant désactivée
 */
export const deleteImportedVehicle = (vehicleId: string): boolean => {
  console.log("Suppression désactivée - Le catalogue a été supprimé");
  return true;
};

/**
 * Extraction des véhicules depuis une URL
 * Cette fonction est maintenant désactivée
 */
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  console.log("Extraction désactivée - Le catalogue a été supprimé");
  toast.info("Le catalogue a été supprimé, impossible d'importer des véhicules");
  return [];
};

// Aliasing pour compatibilité avec le code existant
export const addVehicle = addImportedVehicle;
export const deleteVehicle = deleteImportedVehicle;
