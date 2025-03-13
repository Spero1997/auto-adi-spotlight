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

// Véhicule Audi RS Q8 pré-ajouté avec ID fixe pour éviter la duplication
const audiRSQ8 = {
  id: `rsq8-fixed`,
  brand: "Audi",
  model: "RS Q8",
  year: 2023,
  mileage: 5000,
  fuelType: "Essence",
  price: 21000,
  transmission: "Automatique",
  exteriorColor: "Noire",
  interiorColor: "Or et noir",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Toit ouvrant panoramique", "Système de navigation", "Sièges chauffants", "Caméra 360°", "Jantes sport noires"],
  image: "/lovable-uploads/651a21f8-3788-49f4-b379-6c254cb950ef.png",
};

// Véhicule Skoda Octavia pré-ajouté avec ID fixe pour éviter la duplication
const skodaOctavia = {
  id: `octavia-fixed`,
  brand: "Skoda",
  model: "Octavia 2.0",
  year: 2025,
  mileage: 10,
  fuelType: "Essence",
  price: 21000,
  transmission: "Automatique",
  exteriorColor: "Vert citron",
  interiorColor: "Noir",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Écran tactile multimédia", "Système de navigation", "Sièges sport", "Jantes aluminium", "Phares LED Crystal", "Digital Cockpit", "Assistance au stationnement"],
  image: "/lovable-uploads/7bd0f803-8c8f-410c-bb65-da54acbab023.png",
};

// Définition des véhicules par défaut
const DEFAULT_VEHICLES = [audiRSQ8, skodaOctavia];

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
        window.dispatchEvent(new CustomEvent('catalogChanged', {
          detail: { catalogId: urlCatalogId }
        }));
      }
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      console.log(`Véhicules récupérés du localStorage (${urlCatalogId ? 'via URL catalog' : 'local'})`, parsedData);
      
      // Vérifier que les données sont un tableau
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        // Filtrer les véhicules pour ne garder que ceux qui ont les propriétés requises
        const validVehicles = parsedData.filter(vehicle => 
          vehicle && 
          typeof vehicle === 'object' &&
          vehicle.id && 
          vehicle.brand && 
          vehicle.model &&
          vehicle.price
        );
        
        // Si des véhicules valides sont trouvés, les retourner avec les véhicules par défaut garantis
        if (validVehicles.length > 0) {
          // Vérifier si les véhicules par défaut sont présents
          ensureDefaultVehicles(validVehicles);
          return validVehicles;
        }
      }
      
      // Si on arrive ici, soit le tableau est vide, soit il n'y a pas de véhicules valides
      console.log("Aucun véhicule valide trouvé, utilisation des véhicules par défaut");
      localStorage.removeItem(STORAGE_KEY); // Supprimer les données invalides
      saveImportedVehicles(DEFAULT_VEHICLES);
      return DEFAULT_VEHICLES;
    } else {
      // Si aucun véhicule n'est dans le localStorage, ajouter les véhicules par défaut
      console.log("Aucune donnée dans le localStorage, initialisation avec les véhicules par défaut");
      saveImportedVehicles(DEFAULT_VEHICLES);
      return DEFAULT_VEHICLES;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
    // En cas d'erreur, réinitialiser avec les véhicules par défaut
    localStorage.removeItem(STORAGE_KEY);
    saveImportedVehicles(DEFAULT_VEHICLES);
    return DEFAULT_VEHICLES;
  }
};

// Fonction pour s'assurer que les véhicules par défaut sont présents
const ensureDefaultVehicles = (vehicles: ImportedVehicle[]): void => {
  const rsq8Exists = vehicles.some(v => v.id === audiRSQ8.id || (v.brand === "Audi" && v.model === "RS Q8"));
  const octaviaExists = vehicles.some(v => v.id === skodaOctavia.id || (v.brand === "Skoda" && v.model === "Octavia 2.0"));
  
  let changed = false;
  
  if (!rsq8Exists) {
    vehicles.push(audiRSQ8);
    changed = true;
  }
  
  if (!octaviaExists) {
    vehicles.push(skodaOctavia);
    changed = true;
  }
  
  // Si des changements ont été faits, mettre à jour le localStorage
  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }
};

// Enregistrer les véhicules dans le stockage local et mettre à jour l'URL
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): void => {
  try {
    // S'assurer que les véhicules par défaut sont inclus
    ensureDefaultVehicles(vehicles);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    
    // S'assurer que l'ID de catalogue est dans l'URL
    const catalogId = getCatalogId();
    saveCatalogIdToUrl(catalogId);
    
    // Déclencher un événement pour informer les autres composants que les données ont changé
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', {
      detail: { vehicles }
    }));
    
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
    
    // Ne pas supprimer les véhicules par défaut
    if (vehicles.some(v => v.id === id && ((v.brand === "Audi" && v.model === "RS Q8") || (v.brand === "Skoda" && v.model === "Octavia 2.0")))) {
      toast.error("Ce véhicule ne peut pas être supprimé");
      return;
    }
    
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
