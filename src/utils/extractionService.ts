
import { toast } from "sonner";
import { ImportedVehicle } from "./vehicleImportService";

export const SUPPORTED_SITES = {
  "lacentrale.fr": {
    name: "La Centrale",
    url: "https://www.lacentrale.fr/",
    support: true
  },
  "leboncoin.fr": {
    name: "Leboncoin",
    url: "https://www.leboncoin.fr/",
    support: true
  },
  "autoscout24.fr": {
    name: "AutoScout24",
    url: "https://www.autoscout24.fr/",
    support: true
  }
};

export const canExtractFromUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    
    // Vérifie si le domaine ou un sous-domaine est supporté
    return Object.keys(SUPPORTED_SITES).some(supportedDomain => 
      domain === supportedDomain || domain.endsWith(`.${supportedDomain}`)
    );
  } catch (e) {
    return false;
  }
};

// Simule l'extraction de véhicules depuis une URL
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  console.log("Extracting vehicles from URL:", url);
  
  if (!canExtractFromUrl(url)) {
    throw new Error("Cette URL n'est pas supportée par notre système d'extraction.");
  }
  
  // Simuler un délai de traitement pour une expérience plus réaliste
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // Ces véhicules sont simulés pour démonstration
    const domain = new URL(url).hostname;
    
    if (domain.includes("lacentrale.fr")) {
      return generateLaCentraleVehicles();
    } else if (domain.includes("leboncoin.fr")) {
      return generateLeboncoinVehicles();
    } else if (domain.includes("autoscout24.fr")) {
      return generateAutoScoutVehicles();
    } else {
      return generateGenericVehicles();
    }
  } catch (error) {
    console.error("Erreur lors de l'extraction des véhicules:", error);
    throw new Error("Impossible d'extraire les véhicules depuis cette URL. Veuillez vérifier que l'URL est correcte et réessayer.");
  }
};

// Génère des véhicules simulés pour La Centrale
const generateLaCentraleVehicles = (): ImportedVehicle[] => [
  {
    id: `lacentrale-${Date.now()}-1`,
    brand: "Peugeot",
    model: "308 GT",
    year: 2019,
    mileage: 45000,
    fuelType: "Diesel",
    price: 18990,
    image: "https://images.unsplash.com/photo-1551826152-d7c64fcede73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Bleu",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 BlueHDi 180ch",
    features: ["GPS", "Toit panoramique", "Caméra de recul"]
  },
  {
    id: `lacentrale-${Date.now()}-2`,
    brand: "Renault",
    model: "Megane RS",
    year: 2020,
    mileage: 30000,
    fuelType: "Essence",
    price: 29900,
    image: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Jaune",
    interiorColor: "Noir",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.8 TCe 300ch",
    features: ["Jantes alliage 19\"", "Châssis Cup", "Système RS Vision"]
  },
  {
    id: `lacentrale-${Date.now()}-3`,
    brand: "Audi",
    model: "A4 Avant",
    year: 2021,
    mileage: 25000,
    fuelType: "Diesel",
    price: 35900,
    image: "https://images.unsplash.com/photo-1606664413542-65866df2248f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI 190ch",
    features: ["Audi Virtual Cockpit", "MMI Navigation plus", "Bang & Olufsen Sound System"]
  },
];

// Génère des véhicules simulés pour Leboncoin
const generateLeboncoinVehicles = (): ImportedVehicle[] => [
  {
    id: `leboncoin-${Date.now()}-1`,
    brand: "Volkswagen",
    model: "Golf VII",
    year: 2018,
    mileage: 60000,
    fuelType: "Essence",
    price: 16500,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Noir",
    interiorColor: "Gris",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.4 TSI 125ch",
    features: ["Climatisation", "Bluetooth", "Régulateur de vitesse"]
  },
  {
    id: `leboncoin-${Date.now()}-2`,
    brand: "Citroen",
    model: "C3",
    year: 2020,
    mileage: 15000,
    fuelType: "Essence",
    price: 13900,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Rouge",
    interiorColor: "Beige",
    transmission: "Manuelle",
    doors: 5,
    engine: "1.2 PureTech 83ch",
    features: ["Airbump", "Connect Nav", "Aide au stationnement"]
  },
];

// Génère des véhicules simulés pour AutoScout24
const generateAutoScoutVehicles = (): ImportedVehicle[] => [
  {
    id: `autoscout-${Date.now()}-1`,
    brand: "BMW",
    model: "Serie 3",
    year: 2022,
    mileage: 10000,
    fuelType: "Hybride",
    price: 45900,
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Blanc",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 4,
    engine: "330e 292ch",
    features: ["Navigation Professional", "Sièges chauffants", "Système Hi-Fi Harman Kardon"]
  },
  {
    id: `autoscout-${Date.now()}-2`,
    brand: "Mercedes",
    model: "Classe C",
    year: 2021,
    mileage: 20000,
    fuelType: "Essence",
    price: 42800,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Noir",
    interiorColor: "Beige",
    transmission: "Automatique",
    doors: 4,
    engine: "C200 184ch",
    features: ["Pack AMG Line", "MBUX", "Affichage tête haute"]
  },
  {
    id: `autoscout-${Date.now()}-3`,
    brand: "Audi",
    model: "Q5",
    year: 2020,
    mileage: 35000,
    fuelType: "Diesel",
    price: 39900,
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    exteriorColor: "Gris",
    interiorColor: "Noir",
    transmission: "Automatique",
    doors: 5,
    engine: "2.0 TDI 190ch",
    features: ["S line", "Quattro", "Matrix LED"]
  },
];

// Génère des véhicules génériques
const generateGenericVehicles = (): ImportedVehicle[] => [
  {
    id: `generic-${Date.now()}-1`,
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    mileage: 25000,
    fuelType: "Hybride",
    price: 23500,
    image: "https://images.unsplash.com/photo-1590674899484-13b2a3af9b4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    transmission: "Automatique"
  },
  {
    id: `generic-${Date.now()}-2`,
    brand: "Ford",
    model: "Puma",
    year: 2022,
    mileage: 15000,
    fuelType: "Essence",
    price: 22900,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    transmission: "Manuelle"
  },
];
