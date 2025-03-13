
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

// Générer un ID de catalogue unique s'il n'existe pas
const getCatalogId = (): string => {
  let catalogId = localStorage.getItem(CATALOG_ID_KEY);
  if (!catalogId) {
    catalogId = `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(CATALOG_ID_KEY, catalogId);
  }
  return catalogId;
};

// Récupérer l'ID de catalogue depuis l'URL s'il existe
export const getCatalogIdFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('catalog');
};

// Sauvegarder l'ID de catalogue dans l'URL
const saveCatalogIdToUrl = (catalogId: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('catalog', catalogId);
  window.history.replaceState({}, '', url.toString());
};

// Récupérer les véhicules importés du stockage local ou de l'URL avec validation
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    // Vérifier d'abord si un ID de catalogue est dans l'URL
    const urlCatalogId = getCatalogIdFromUrl();
    let localCatalogId = localStorage.getItem(CATALOG_ID_KEY);
    
    // Si on a un ID de catalogue dans l'URL, on le synchronise avec le local
    if (urlCatalogId) {
      // Adopter le catalog ID de l'URL dans le localStorage pour la synchronisation
      localStorage.setItem(CATALOG_ID_KEY, urlCatalogId);
      console.log(`Catalogue synchronisé depuis l'URL: ${urlCatalogId}`);
      
      // Si l'ID de catalogue a changé, déclenchons un événement pour avertir les autres composants
      if (localCatalogId !== urlCatalogId) {
        console.log(`Catalogue changé: ${localCatalogId} -> ${urlCatalogId}`);
        // Cet événement permettra aux autres composants de savoir qu'ils doivent rafraîchir leurs données
        window.dispatchEvent(new Event('catalogChanged'));
      }
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      console.log(`Véhicules récupérés du localStorage (${urlCatalogId ? 'via URL catalog' : 'local'})`, parsedData);
      
      // Vérifier que les données sont un tableau
      if (Array.isArray(parsedData)) {
        // Filtrer les véhicules pour ne garder que ceux qui ont les propriétés requises
        return parsedData.filter(vehicle => 
          vehicle && 
          typeof vehicle === 'object' &&
          vehicle.id && 
          vehicle.brand && 
          vehicle.model &&
          vehicle.price
        );
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
  }
  console.log("Aucun véhicule trouvé dans le localStorage ou données invalides");
  return [];
};

// Enregistrer les véhicules dans le stockage local et mettre à jour l'URL
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    
    // S'assurer que l'ID de catalogue est dans l'URL
    const catalogId = getCatalogId();
    saveCatalogIdToUrl(catalogId);
    
    // Déclencher un événement pour informer les autres composants que les données ont changé
    window.dispatchEvent(new Event('vehiclesUpdated'));
    
    console.log(`${vehicles.length} véhicules enregistrés dans le localStorage avec catalogId: ${catalogId}`);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des véhicules:", error);
    toast.error("Erreur lors de l'enregistrement des véhicules");
  }
};

// Générer une URL de partage pour le catalogue actuel
export const generateShareableUrl = (): string => {
  const catalogId = getCatalogId();
  const baseUrl = window.location.origin;
  // Créer une URL vers la page des véhicules d'occasion avec l'ID du catalogue
  return `${baseUrl}/vehicules/occasion?catalog=${catalogId}`;
};

// Ajouter de nouveaux véhicules aux véhicules existants
export const addImportedVehicles = (newVehicles: ImportedVehicle[]): void => {
  try {
    const currentVehicles = getImportedVehicles();
    console.log(`Ajout de ${newVehicles.length} véhicules aux ${currentVehicles.length} existants`);
    
    const existingIds = new Set(currentVehicles.map(v => v.id));
    
    // Filtrer les véhicules déjà existants par ID
    const uniqueNewVehicles = newVehicles.filter(v => !v.excluded && !existingIds.has(v.id));
    
    if (uniqueNewVehicles.length === 0) {
      toast.info("Aucun nouveau véhicule à importer");
      return;
    }
    
    // Combiner les véhicules existants avec les nouveaux
    const updatedVehicles = [...currentVehicles, ...uniqueNewVehicles];
    saveImportedVehicles(updatedVehicles);
    
    toast.success(`${uniqueNewVehicles.length} véhicule(s) importé(s) avec succès`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de véhicules:", error);
    toast.error("Erreur lors de l'importation des véhicules");
  }
};

// Supprimer un véhicule par son ID
export const deleteImportedVehicle = (id: string): void => {
  try {
    const vehicles = getImportedVehicles();
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    
    saveImportedVehicles(updatedVehicles);
    toast.success("Véhicule supprimé avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    toast.error("Erreur lors de la suppression du véhicule");
  }
};

// Fonction pour extraire les véhicules d'une URL externe
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  try {
    // Utiliser le service d'extraction
    return await extractVehiclesWithScraper(url);
  } catch (error) {
    console.error("Erreur lors de l'extraction:", error);
    throw error;
  }
};
