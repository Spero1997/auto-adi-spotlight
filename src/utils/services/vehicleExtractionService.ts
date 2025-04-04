
import { ImportedVehicle } from '../types/vehicle';
import { addVehicle } from './vehicleCatalogService';

/**
 * Extracts vehicles from a URL and adds them to the specified catalog
 */
export const extractVehiclesFromUrl = async (
  url: string,
  catalogType: 'standard' | 'featured' = 'standard'
): Promise<ImportedVehicle[]> => {
  console.log(`Extraction de véhicules depuis ${url} pour le catalogue ${catalogType}`);
  
  try {
    // Ici, normalement, nous ferions une requête à un service d'extraction
    // Pour cette démo, nous simulons des véhicules
    const mockVehicles = simulateVehicleExtraction(url);
    
    // Ajouter les véhicules extraits au catalogue
    const importedVehicles = mockVehicles.map(vehicle => {
      // Make sure we have the required fields based on ImportedVehicle type
      const enhancedVehicle: ImportedVehicle = {
        ...vehicle,
        id: `vehicle-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        catalogType,
        brand: vehicle.brand || '',
        model: vehicle.model || '',
        year: vehicle.year || 0,
        mileage: vehicle.mileage || 0,
        price: vehicle.price || 0,
        fuelType: vehicle.fuelType || ''
      };
      
      // Ajouter au catalogue
      addVehicle(enhancedVehicle, catalogType);
      return enhancedVehicle;
    });
    
    return importedVehicles;
  } catch (error) {
    console.error("Erreur lors de l'extraction des véhicules:", error);
    throw new Error(`Impossible d'extraire les données depuis ${url}`);
  }
};

/**
 * Simulates vehicle extraction based on URL patterns
 * For real implementation, this would make API calls or use web scraping
 */
const simulateVehicleExtraction = (url: string): Partial<ImportedVehicle>[] => {
  // Simulation de retards et de traitement
  console.log(`Simulation d'extraction depuis ${url}`);
  
  // Générer des véhicules simulés selon l'URL
  if (url.includes('autoscout24')) {
    return generateAutoScout24Vehicles();
  } else if (url.includes('lacentrale')) {
    return generateLaCentraleVehicles();
  } else if (url.includes('leboncoin')) {
    return generateLeboncoinVehicles();
  } else {
    return generateGenericVehicles();
  }
};

const generateAutoScout24Vehicles = (): Partial<ImportedVehicle>[] => [
  {
    brand: "BMW",
    model: "X5 xDrive40e",
    year: 2016,
    mileage: 120000,
    fuelType: "Hybride",
    price: 22900,
    image: "/lovable-uploads/0432cb7e-118a-4667-9015-d31062cb8db2.png",
    exteriorColor: "Noir",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0L + Électrique",
    features: ["Navigation", "Cuir", "Toit panoramique", "Caméra de recul"]
  },
  {
    brand: "Volkswagen",
    model: "T-Cross",
    year: 2021,
    mileage: 22500,
    fuelType: "Essence",
    price: 21900,
    image: "/lovable-uploads/15d96b88-ab2b-448d-b2c2-f9b6a6cc69f4.png",
    exteriorColor: "Blanc",
    interiorColor: "Noir",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.0 TSI 110ch",
    features: ["Apple CarPlay", "Android Auto", "Jantes alliage", "Régulateur de vitesse"]
  }
];

const generateLaCentraleVehicles = (): Partial<ImportedVehicle>[] => [
  {
    brand: "Audi",
    model: "A3 E-Tron",
    year: 2017,
    mileage: 78000,
    fuelType: "Hybride Rechargeable",
    price: 18990,
    image: "/lovable-uploads/874b916a-34fa-44b5-be0d-259391275fe7.png",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.4 TFSI + Électrique",
    features: ["Virtual Cockpit", "LED Matrix", "Climatisation bi-zone"]
  },
  {
    brand: "Kia",
    model: "Niro Hybride",
    year: 2017,
    mileage: 84000,
    fuelType: "Hybride",
    price: 13900,
    image: "/lovable-uploads/543454e5-3db4-4509-875a-d27b0336305f.png",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.6L + Électrique",
    features: ["Navigation", "Caméra de recul", "Régulateur adaptatif"]
  }
];

const generateLeboncoinVehicles = (): Partial<ImportedVehicle>[] => [
  {
    brand: "BMW",
    model: "X1 xDrive 25e",
    year: 2021,
    mileage: 34000,
    fuelType: "Hybride Rechargeable",
    price: 41500,
    image: "/lovable-uploads/8a5b39b1-1602-45f7-9d9d-ee6977cb2078.png",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.5L + Électrique",
    features: ["Affichage tête haute", "Aide au stationnement", "Apple CarPlay"]
  },
  {
    brand: "Audi",
    model: "Q5 Quattro S-Tronic",
    year: 2014,
    mileage: 151000,
    fuelType: "Diesel",
    price: 17990,
    image: "/lovable-uploads/323c06a8-64c4-49c5-9062-572bf86cb821.jpg",
    exteriorColor: "Blanc",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI 177ch",
    features: ["Quattro", "S-Line", "Toit ouvrant", "GPS"]
  }
];

const generateGenericVehicles = (): Partial<ImportedVehicle>[] => [
  {
    brand: "Audi",
    model: "Q7 245HK-2XS-Line",
    year: 2012,
    mileage: 158000,
    fuelType: "Diesel",
    price: 19900,
    image: "/lovable-uploads/053c06a8-64c4-49c5-9062-572bf86cb821.jpg",
    exteriorColor: "Noir",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    features: ["S-Line", "Xenon", "7 places"]
  },
  {
    brand: "Audi",
    model: "A3 Sportback 35 1,5 TFSI",
    year: 2019,
    mileage: 30000,
    fuelType: "Essence",
    price: 27900,
    image: "/lovable-uploads/a0025433-0eb4-479f-a45e-f67c027c67b8.png",
    exteriorColor: "Bleu",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "1.5 TFSI 150ch",
    features: ["Siège sport", "Jantes 18\"", "Navigation"]
  }
];
