
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

// Données de véhicules par défaut pour initialiser le catalogue
const defaultVehicles: ImportedVehicle[] = [
  {
    id: "bmw-x5-2016",
    brand: "BMW",
    model: "X5 xDrive",
    year: 2016,
    mileage: 85000,
    fuelType: "Diesel",
    price: 36500,
    image: "/lovable-uploads/326ac07b-0af8-47ee-93b3-390735bed464.png",
    description: "BMW X5 xDrive 30d, parfait état, carnet d'entretien complet.",
    exteriorColor: "Noir",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 5,
    engine: "3.0L TDI",
    features: ["GPS", "Toit ouvrant", "Sièges chauffants", "Caméra de recul"],
    featured: true
  },
  {
    id: "vw-tcross-2020",
    brand: "Volkswagen",
    model: "T-Cross 1,0 TSI 110 hk Life ACC",
    year: 2020,
    mileage: 42000,
    fuelType: "Essence",
    price: 21990,
    image: "/lovable-uploads/84f33a30-1107-44ab-a3d5-2dcd01623f88.png",
    description: "Volkswagen T-Cross Life, excellent état, faible kilométrage.",
    exteriorColor: "Blanc",
    interiorColor: "Noir",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.0 TSI",
    features: ["Climatisation", "Régulateur de vitesse adaptatif", "Bluetooth"],
    featured: true
  },
  {
    id: "audi-a3-etron-2017",
    brand: "Audi",
    model: "A3 E-Tron 1.4 S Tronic",
    year: 2017,
    mileage: 68000,
    fuelType: "Hybride",
    price: 24500,
    image: "/lovable-uploads/63df3762-9be9-4c57-92f4-a165c500700e.png",
    description: "Audi A3 E-Tron, hybride rechargeable, parfait pour la ville.",
    exteriorColor: "Gris métallisé",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.4 TFSI",
    features: ["GPS", "Sièges chauffants", "Apple CarPlay", "Android Auto"],
    featured: false
  },
  {
    id: "kia-niro-2017",
    brand: "Kia",
    model: "Niro Hybride 149 CH",
    year: 2017,
    mileage: 65000,
    fuelType: "Hybride",
    price: 18990,
    image: "/lovable-uploads/0467d19e-0099-458b-ad02-3a728b8c0048.png",
    description: "Kia Niro Hybride, économique et spacieux.",
    exteriorColor: "Blanc",
    interiorColor: "Gris",
    transmission: "Automatique",
    doors: 5,
    engine: "1.6 GDi",
    features: ["Caméra de recul", "Bluetooth", "Climatisation automatique"],
    featured: false
  },
  {
    id: "bmw-x1-2021",
    brand: "BMW",
    model: "X1 xDrive 25e",
    year: 2021,
    mileage: 25000,
    fuelType: "Hybride rechargeable",
    price: 42900,
    image: "/lovable-uploads/2a03c911-dfae-4186-b265-5b9977a7b1cb.png",
    description: "BMW X1 xDrive 25e, hybride rechargeable, parfait état, sous garantie.",
    exteriorColor: "Bleu",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.5 Hybride",
    features: ["Navigation GPS", "Apple CarPlay", "Toit panoramique", "Caméra 360°"],
    featured: true
  },
  {
    id: "audi-q5-2014",
    brand: "Audi",
    model: "Q5 Quattro S-Tronic",
    year: 2014,
    mileage: 120000,
    fuelType: "Diesel",
    price: 19990,
    image: "/lovable-uploads/806b392d-aa03-4648-aadc-bcbd39514bac.png",
    description: "Audi Q5 Quattro, transmission intégrale, idéal pour tous types de terrain.",
    exteriorColor: "Noir",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI",
    features: ["Quattro", "Sièges en cuir", "GPS", "Bluetooth"],
    featured: false
  },
  {
    id: "audi-q7-2012",
    brand: "Audi",
    model: "Q7 245HK-2XS-Line",
    year: 2012,
    mileage: 145000,
    fuelType: "Diesel",
    price: 17500,
    image: "/lovable-uploads/f589fba6-8301-4717-8c66-976c7c7bbcd7.png",
    description: "Audi Q7, 7 places, parfait pour les grandes familles.",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "3.0 TDI",
    features: ["7 places", "Toit ouvrant", "GPS", "Sièges chauffants"],
    featured: false
  },
  {
    id: "audi-a3-2019",
    brand: "Audi",
    model: "A3 Sportback 35 1,5 TFSI",
    year: 2019,
    mileage: 45000,
    fuelType: "Essence",
    price: 24900,
    image: "/lovable-uploads/0be763d1-940e-4e04-b837-ee5fcf47e4ee.png",
    description: "Audi A3 Sportback, élégante et économique.",
    exteriorColor: "Rouge",
    interiorColor: "Noir",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.5 TFSI",
    features: ["Climatisation", "Régulateur de vitesse", "Bluetooth"],
    featured: false
  },
  {
    id: "bmw-x3-2016",
    brand: "BMW",
    model: "X3 xDrive 20d M-sport 190 CH",
    year: 2016,
    mileage: 92000,
    fuelType: "Diesel",
    price: 25900,
    image: "/lovable-uploads/53e6dee5-6e5b-48db-85d6-065a7bdc8435.png",
    description: "BMW X3 xDrive M-sport, pack sport, dynamique et confortable.",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI",
    features: ["Pack M-sport", "GPS", "Toit panoramique", "Suspension sport"],
    featured: false
  },
  {
    id: "range-rover-2014",
    brand: "Range Rover",
    model: "Evoque 2.0 Prestige 241 CH",
    year: 2014,
    mileage: 98000,
    fuelType: "Diesel",
    price: 21500,
    image: "/lovable-uploads/99e4c269-15bf-4ced-8ed9-f4c03f6f1378.png",
    description: "Range Rover Evoque, SUV de luxe, look distinctif.",
    exteriorColor: "Blanc",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TD4",
    features: ["Intérieur cuir", "Toit panoramique", "GPS", "Sièges chauffants"],
    featured: false
  },
  {
    id: "bmw-x3-2014",
    brand: "BMW",
    model: "X3 xDrive 20d",
    year: 2014,
    mileage: 110000,
    fuelType: "Diesel",
    price: 19900,
    image: "/lovable-uploads/b0b6f649-3ce2-455a-99e9-189b91475576.png",
    description: "BMW X3 xDrive, confort et performances.",
    exteriorColor: "Noir",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI",
    features: ["Climatisation automatique", "Régulateur de vitesse", "Bluetooth"],
    featured: false
  }
];

/**
 * Récupère les véhicules importés depuis le stockage local
 */
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const vehiclesJson = localStorage.getItem(STORAGE_KEY);
    
    // Si aucun véhicule n'est trouvé, initialiser avec les véhicules par défaut
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
