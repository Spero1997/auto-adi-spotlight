
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

// Récupérer les véhicules importés du stockage local avec validation
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      console.log(`Véhicules récupérés du localStorage:`, parsedData);
      
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

// Enregistrer les véhicules dans le stockage local
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    console.log(`${vehicles.length} véhicules enregistrés dans le localStorage`);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des véhicules:", error);
    toast.error("Erreur lors de l'enregistrement des véhicules");
  }
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
