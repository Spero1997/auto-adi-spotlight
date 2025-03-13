
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
  featured?: boolean; // Propriété pour marquer les véhicules en vedette
  catalogType?: 'standard' | 'featured'; // Nouvelle propriété pour différencier les catalogues
}

const STORAGE_KEY = 'imported_vehicles';
const FEATURED_STORAGE_KEY = 'featured_vehicles'; // Nouvelle clé pour le catalogue vedette
const CATALOG_ID_KEY = 'catalog_id';
const FEATURED_CATALOG_ID_KEY = 'featured_catalog_id'; // Nouvelle clé pour l'ID du catalogue vedette

/**
 * Génère une URL partageable pour le catalogue actuel
 */
export const generateShareableUrl = (catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Sélectionner la clé appropriée en fonction du type de catalogue
    const catalogIdKey = catalogType === 'featured' ? FEATURED_CATALOG_ID_KEY : CATALOG_ID_KEY;
    
    // Générer un ID unique si aucun n'existe déjà
    let catalogId = localStorage.getItem(catalogIdKey);
    
    if (!catalogId) {
      catalogId = `catalog-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(catalogIdKey, catalogId);
    }
    
    // Construire l'URL avec l'ID du catalogue
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = new URL(baseUrl);
    shareableUrl.searchParams.set('catalog', catalogId);
    shareableUrl.searchParams.set('type', catalogType);
    
    return shareableUrl.toString();
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL partageable:", error);
    return window.location.href;
  }
};

/**
 * Récupère l'identifiant du catalogue à partir de l'URL ou utilise le catalogue local
 */
export const getCatalogIdFromUrl = (catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Sélectionner la clé appropriée en fonction du type de catalogue
    const catalogIdKey = catalogType === 'featured' ? FEATURED_CATALOG_ID_KEY : CATALOG_ID_KEY;
    
    // Récupérer l'ID depuis l'URL si disponible
    const url = new URL(window.location.href);
    const catalogId = url.searchParams.get('catalog');
    const urlCatalogType = url.searchParams.get('type');
    
    if (catalogId && (!urlCatalogType || urlCatalogType === catalogType)) {
      // Stocker l'ID de catalogue dans localStorage pour le réutiliser
      localStorage.setItem(catalogIdKey, catalogId);
      return catalogId;
    }
    
    // Si pas d'ID dans l'URL, essayer de récupérer depuis localStorage
    return localStorage.getItem(catalogIdKey) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du catalogue:", error);
    return null;
  }
};

// Catalogues vides par défaut
const defaultVehicles: ImportedVehicle[] = [];

/**
 * Récupère les véhicules importés depuis le stockage local
 */
export const getImportedVehicles = (catalogType: 'standard' | 'featured' = 'standard'): ImportedVehicle[] => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    const vehiclesJson = localStorage.getItem(storageKey);
    
    // Si aucun véhicule n'est trouvé, initialiser avec un catalogue vide
    if (!vehiclesJson) {
      saveImportedVehicles(defaultVehicles, catalogType);
      return defaultVehicles;
    }
    
    return JSON.parse(vehiclesJson);
  } catch (error) {
    console.error(`Erreur lors du chargement des véhicules (${catalogType}):`, error);
    return defaultVehicles;
  }
};

/**
 * Sauvegarde les véhicules dans le stockage local
 */
export const saveImportedVehicles = (vehicles: ImportedVehicle[], catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const storageKey = catalogType === 'featured' ? FEATURED_STORAGE_KEY : STORAGE_KEY;
    localStorage.setItem(storageKey, JSON.stringify(vehicles));
    
    // Déclencher un événement pour notifier les autres composants
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
    return true;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde des véhicules (${catalogType}):`, error);
    toast.error("Erreur lors de la sauvegarde des véhicules.");
    return false;
  }
};

/**
 * Réinitialise le catalogue en supprimant tous les véhicules
 */
export const resetCatalog = (catalogType?: 'standard' | 'featured' | 'all'): boolean => {
  try {
    if (catalogType === 'standard' || catalogType === 'all' || !catalogType) {
      // Réinitialiser le catalogue standard
      const newCatalogId = `catalog-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(CATALOG_ID_KEY, newCatalogId);
      saveImportedVehicles([], 'standard');
      toast.success("Le catalogue standard a été réinitialisé");
    }
    
    if (catalogType === 'featured' || catalogType === 'all') {
      // Réinitialiser le catalogue vedette
      const newFeaturedCatalogId = `catalog-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(FEATURED_CATALOG_ID_KEY, newFeaturedCatalogId);
      saveImportedVehicles([], 'featured');
      toast.success("Le catalogue vedette a été réinitialisé");
    }
    
    // Notifier les autres composants du changement de catalogue
    window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: catalogType || 'all' } }));
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
export const addImportedVehicle = (vehicle: ImportedVehicle, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const vehicleWithId = {
      ...vehicle,
      id: vehicle.id || `vehicle-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      catalogType
    };
    
    const updatedVehicles = [...vehicles, vehicleWithId];
    saveImportedVehicles(updatedVehicles, catalogType);
    
    toast.success(`Véhicule ajouté au catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'ajout du véhicule (${catalogType}):`, error);
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};

/**
 * Supprime un véhicule importé du stockage local
 */
export const deleteImportedVehicle = (vehicleId: string, catalogType: 'standard' | 'featured' = 'standard'): boolean => {
  try {
    const vehicles = getImportedVehicles(catalogType);
    const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
    
    if (vehicles.length === updatedVehicles.length) {
      console.warn(`Véhicule avec l'ID ${vehicleId} non trouvé dans le catalogue ${catalogType}`);
      return false;
    }
    
    saveImportedVehicles(updatedVehicles, catalogType);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du véhicule (${catalogType}):`, error);
    toast.error("Erreur lors de la suppression du véhicule");
    return false;
  }
};

/**
 * Déplace un véhicule d'un catalogue à l'autre
 */
export const moveVehicleBetweenCatalogs = (vehicleId: string, fromCatalogType: 'standard' | 'featured', toCatalogType: 'standard' | 'featured'): boolean => {
  try {
    // Récupérer le véhicule du catalogue source
    const sourceVehicles = getImportedVehicles(fromCatalogType);
    const vehicleToMove = sourceVehicles.find(v => v.id === vehicleId);
    
    if (!vehicleToMove) {
      console.warn(`Véhicule avec l'ID ${vehicleId} non trouvé dans le catalogue ${fromCatalogType}`);
      return false;
    }
    
    // Supprimer le véhicule du catalogue source
    const updatedSourceVehicles = sourceVehicles.filter(v => v.id !== vehicleId);
    saveImportedVehicles(updatedSourceVehicles, fromCatalogType);
    
    // Ajouter le véhicule au catalogue de destination avec un nouvel ID
    const updatedVehicle = {
      ...vehicleToMove,
      id: `vehicle-${toCatalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      catalogType: toCatalogType,
      featured: toCatalogType === 'featured' // Mettre à jour le statut "featured" en fonction du catalogue de destination
    };
    
    const destinationVehicles = getImportedVehicles(toCatalogType);
    const updatedDestinationVehicles = [...destinationVehicles, updatedVehicle];
    saveImportedVehicles(updatedDestinationVehicles, toCatalogType);
    
    toast.success(`Véhicule déplacé du catalogue ${fromCatalogType === 'featured' ? 'vedette' : 'standard'} vers le catalogue ${toCatalogType === 'featured' ? 'vedette' : 'standard'}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors du déplacement du véhicule:`, error);
    toast.error("Erreur lors du déplacement du véhicule");
    return false;
  }
};

/**
 * Extraction des véhicules depuis une URL
 */
export const extractVehiclesFromUrl = async (url: string, catalogType: 'standard' | 'featured' = 'standard'): Promise<ImportedVehicle[]> => {
  try {
    toast.info("Extraction des véhicules en cours...");
    const vehicles = await extractVehiclesWithScraper(url);
    
    if (!vehicles || vehicles.length === 0) {
      toast.error("Aucun véhicule trouvé sur cette URL");
      return [];
    }
    
    // Ajouter les véhicules extraits au catalogue
    const existingVehicles = getImportedVehicles(catalogType);
    
    // Assigner des IDs uniques et normaliser les URLs des images
    const processedVehicles = vehicles.map(vehicle => ({
      ...vehicle,
      id: `vehicle-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      image: vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image',
      catalogType,
      featured: catalogType === 'featured' // Marquer comme vedette si ajouté au catalogue vedette
    }));
    
    const updatedVehicles = [...existingVehicles, ...processedVehicles];
    saveImportedVehicles(updatedVehicles, catalogType);
    
    toast.success(`${vehicles.length} véhicule(s) importé(s) avec succès dans le catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}`);
    return processedVehicles;
  } catch (error) {
    console.error(`Erreur lors de l'extraction des véhicules pour le catalogue ${catalogType}:`, error);
    toast.error("Erreur lors de l'extraction des véhicules");
    return [];
  }
};

// Aliasing pour compatibilité avec le code existant
export const addVehicle = addImportedVehicle;
export const deleteVehicle = deleteImportedVehicle;
