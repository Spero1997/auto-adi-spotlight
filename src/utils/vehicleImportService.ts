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

// Nouvelle Mercedes Benz C 220 
const mercedesC220 = {
  id: `mercedes-c220-fixed`,
  brand: "Mercedes",
  model: "Benz C 220 BlueTEC d Luxury Line",
  year: 2015,
  mileage: 92300,
  fuelType: "Diesel",
  price: 7000,
  transmission: "Automatique",
  exteriorColor: "Blanc",
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
  features: ["Système de navigation", "Intérieur cuir", "Sièges chauffants", "Climatisation automatique", "Finitions bois", "Caméra de recul", "Aide au stationnement", "Bluetooth", "Commandes au volant"],
  image: "/lovable-uploads/65c852dc-07fc-46a2-be4e-0214d01f670f.png",
};

// Nouvelle Jeep Compass
const jeepCompass = {
  id: `jeep-compass-fixed`,
  brand: "Jeep",
  model: "Compass 1,3 T4 PHEV 4Xe",
  year: 2021,
  mileage: 66800,
  fuelType: "Essence",
  price: 12000,
  transmission: "Automatique",
  exteriorColor: "Bleu",
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
  features: ["Système de navigation", "Écran tactile", "Bluetooth", "Climatisation automatique", "Intérieur cuir", "Jantes alliage", "Caméra de recul", "Technologie hybride rechargeable", "4 roues motrices"],
  image: "/lovable-uploads/94fe2476-71ba-4d26-9226-a959f05a815a.png",
};

// Nouvelle Mercedes Benz GLA
const mercedesGLA = {
  id: `mercedes-gla-fixed`,
  brand: "Mercedes",
  model: "Benz GLA",
  year: 2014,
  mileage: 182290,
  fuelType: "Diesel",
  price: 7000,
  transmission: "Automatique",
  exteriorColor: "Gris",
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
  features: ["Système de navigation", "Écran tactile multimédia", "Bluetooth", "Sièges réglables électriquement", "Jantes alliage", "Climatisation automatique", "Caméra de recul", "Aide au stationnement", "Régulateur de vitesse"],
  image: "/lovable-uploads/326ac07b-0af8-47ee-93b3-390735bed464.png",
};

// Nouvelle Mercedes Benz CLA AMG 250 E
const mercedesCLA = {
  id: `mercedes-cla-amg-fixed`,
  brand: "Mercedes",
  model: "Benz CLA AMG 250 E",
  year: 2021,
  mileage: 64000,
  fuelType: "Essence",
  price: 16000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["Pack AMG", "Système de navigation", "Écran tactile", "Bluetooth", "Sièges sport", "Jantes alliage AMG", "Climatisation automatique", "Caméra de recul", "Aide au stationnement", "Régulateur de vitesse adaptatif"],
  image: "/lovable-uploads/45e8b867-e03c-4870-9001-f18a3fcac619.png",
};

// Nouvelle BMW Série 2
const bmwSerie2 = {
  id: `bmw-serie2-fixed`,
  brand: "BMW",
  model: "Série 2 225xe iPerfomance",
  year: 2020,
  mileage: 119000,
  fuelType: "Essence",
  price: 14500,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["Hybride rechargeable", "Système de navigation", "Écran tactile", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse", "Capteurs de stationnement"],
  image: "/lovable-uploads/25665832-6bfa-4f10-b6a9-1f6ad5052b3a.png",
};

// Nouvelle Volvo V60
const volvoV60 = {
  id: `volvo-v60-fixed`,
  brand: "Volvo",
  model: "V60 T8 Twin Engine",
  year: 2020,
  mileage: 119000,
  fuelType: "Essence",
  price: 14500,
  transmission: "Automatique",
  exteriorColor: "Grise",
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
  features: ["Hybride rechargeable", "Système de navigation", "Écran tactile", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse adaptatif", "Système audio premium"],
  image: "/lovable-uploads/0be763d1-940e-4e04-b837-ee5fcf47e4ee.png",
};

// Nouvelle Volvo V60 T8 Twin Engine (seconde version)
const volvoV60Second = {
  id: `volvo-v60-second-fixed`,
  brand: "Volvo",
  model: "V60 T8 Twin Engine",
  year: 2020,
  mileage: 132000,
  fuelType: "Essence",
  price: 12500,
  transmission: "Automatique",
  exteriorColor: "Grise",
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
  features: ["Hybride rechargeable", "Système de navigation", "Écran tactile", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse adaptatif", "Système audio premium"],
  image: "/lovable-uploads/0be763d1-940e-4e04-b837-ee5fcf47e4ee.png",
};

// Nouvelle Mercedes Benz Classe C AMG 350 e
const mercedesC350e = {
  id: `mercedes-c350e-fixed`,
  brand: "Mercedes",
  model: "Benz Classe C AMG 350 e",
  year: 2016,
  mileage: 118000,
  fuelType: "Essence",
  price: 10500,
  transmission: "Automatique",
  exteriorColor: "Bleu",
  interiorColor: "Noir",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 �� Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Pack AMG", "Hybride rechargeable", "Système de navigation", "Écran tactile", "Bluetooth", "Sièges sport", "Jantes alliage AMG", "Climatisation automatique", "Caméra de recul", "Régulateur de vitesse adaptatif"],
  image: "/lovable-uploads/cd88c053-fbf9-490b-862a-20760071cc69.png",
};

// Nouvelle Audi A6 3.0 TDI V6 S Line
const audiA6 = {
  id: `audi-a6-fixed`,
  brand: "Audi",
  model: "A6 3.0 TDI V6 S Line",
  year: 2016,
  mileage: 99800,
  fuelType: "Diesel",
  price: 10000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["S Line", "Intérieur cuir", "Système de navigation", "Bluetooth", "Caméra de recul", "Sièges chauffants", "Jantes alliage", "Climatisation automatique", "Régulateur de vitesse", "Aide au stationnement"],
  image: "/lovable-uploads/46b47302-22df-4ef8-a230-63621a783e09.png",
};

// Nouvelle Volkswagen Polo
const volkswagenPolo = {
  id: `volkswagen-polo-fixed`,
  brand: "Volkswagen",
  model: "Polo 1,0 TSI 95hk Style ACCI 95 CH",
  year: 2022,
  mileage: 24000,
  fuelType: "Essence",
  price: 9000,
  transmission: "Automatique",
  exteriorColor: "Rouge",
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
  features: ["Style ACCI", "Système de navigation", "Bluetooth", "Climatisation automatique", "Jantes alliage", "Caméra de recul", "Régulateur de vitesse", "Aide au stationnement", "Détecteur de pluie"],
  image: "/lovable-uploads/e8318a68-3e1a-444c-995b-892f48be6b73.png",
};

// Nouvelle Volkswagen T-Cross avec ID unique
const volkswagenTCross = {
  id: `volkswagen-tcross-custom-${Date.now()}`,
  brand: "Volkswagen",
  model: "T-Cross 1,0 TSI 110 hk Life ACC",
  year: 2021,
  mileage: 16117,
  fuelType: "Essence",
  price: 10000,
  transmission: "Automatique",
  exteriorColor: "Blanche",
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
  features: ["Life ACC", "Système de navigation", "Bluetooth", "Climatisation automatique", "Jantes alliage", "Caméra de recul", "Régulateur de vitesse adaptatif", "Aide au stationnement", "Détecteur de pluie"],
  image: "/lovable-uploads/68c5b5a8-be3a-4375-a4cd-36a636de7b50.png",
};

// Nouvelle BMW X5 xDrive
const bmwX5 = {
  id: `bmw-x5-fixed`,
  brand: "BMW",
  model: "X5 xDrive",
  year: 2016,
  mileage: 131000,
  fuelType: "Essence",
  price: 10000,
  transmission: "Automatique",
  exteriorColor: "Blanche",
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
  features: ["xDrive", "Système de navigation", "Toit panoramique", "Sièges chauffants", "Caméra de recul", "Jantes alliage", "Climatisation automatique", "Régulateur de vitesse adaptatif", "Aide au stationnement"],
  image: "/lovable-uploads/d0fedee6-6a92-45a0-8a79-eedf08214ac1.png",
};

// Nouvelle Audi A3 E-Tron
const audiA3ETron = {
  id: `audi-a3-etron-fixed`,
  brand: "Audi",
  model: "A3 E-Tron 1.4 S Tronic",
  year: 2017,
  mileage: 105000,
  fuelType: "Essence",
  price: 9500,
  transmission: "Automatique",
  exteriorColor: "Blanche",
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
  features: ["Hybride rechargeable", "S Tronic", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse", "Capteurs de stationnement"],
  image: "/lovable-uploads/a5bbd614-2507-408f-b364-1efbec70eec8.png",
};

// Nouvelle Kia Niro Hybride
const kiaNiro = {
  id: `kia-niro-fixed`,
  brand: "Kia",
  model: "Niro Hybride 149 CH",
  year: 2017,
  mileage: 83000,
  fuelType: "Essence",
  price: 9500,
  transmission: "Automatique",
  exteriorColor: "Blanche",
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
  features: ["Hybride", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse adaptatif", "Aide au stationnement"],
  image: "/lovable-uploads/ca65b2bc-23d7-4e24-8236-2b3b89aee2e2.png",
};

// Définition des véhicules par défaut - ajout de la nouvelle Kia Niro
const DEFAULT_VEHICLES = [audiRSQ8, skodaOctavia, mercedesC220, jeepCompass, mercedesGLA, mercedesCLA, bmwSerie2, volvoV60, volvoV60Second, mercedesC350e, audiA6, volkswagenPolo, volkswagenTCross, bmwX5, audiA3ETron, kiaNiro];

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
  const mercedesExists = vehicles.some(v => v.id === mercedesC220.id || (v.brand === "Mercedes" && v.model === "Benz C 220 BlueTEC d Luxury Line"));
  const jeepExists = vehicles.some(v => v.id === jeepCompass.id || (v.brand === "Jeep" && v.model === "Compass 1,3 T4 PHEV 4Xe"));
  const mercedesGLAExists = vehicles.some(v => v.id === mercedesGLA.id || (v.brand === "Mercedes" && v.model === "Benz GLA"));
  const mercedesCLAExists = vehicles.some(v => v.id === mercedesCLA.id || (v.brand === "Mercedes" && v.model === "Benz CLA AMG 250 E"));
  const bmwSerie2Exists = vehicles.some(v => v.id === bmwSerie2.id || (v.brand === "BMW" && v.model === "Série 2 225xe iPerfomance"));
  const volvoV60Exists = vehicles.some(v => v.id === volvoV60.id || (v.brand === "Volvo" && v.model === "V60 T8 Twin Engine" && v.mileage === 119000));
  const volvoV60SecondExists = vehicles.some(v => v.id === volvoV60Second.id || (v.brand === "Volvo" && v.model === "V60 T8 Twin Engine" && v.mileage === 132000));
  const mercedesC350eExists = vehicles.some(v => v.id === mercedesC350e.id || (v.brand === "Mercedes" && v.model === "Benz Classe C AMG 350 e"));
  const audiA6Exists = vehicles.some(v => v.id === audiA6.id || (v.brand === "Audi" && v.model === "A6 3.0 TDI V6 S Line"));
  const volkswagenPoloExists = vehicles.some(v => v.id === volkswagenPolo.id || (v.brand === "Volkswagen" && v.model === "Polo 1,0 TSI 95hk Style ACCI 95 CH"));
  const volkswagenTCrossExists = vehicles.some(v => v.id === volkswagenTCross.id || (v.brand === "Volkswagen" && v.model === "T-Cross 1,0 TSI 110 hk Life ACC"));
  const bmwX5Exists = vehicles.some(v => v.id === bmwX5.id || (v.brand === "BMW" && v.model === "X5 xDrive"));
  const audiA3ETronExists = vehicles.some(v => v.id === audiA3ETron.id || (v.brand === "Audi" && v.model === "A3 E-Tron 1.4 S Tronic"));
  const kiaNiroExists = vehicles.some(v => v.id === kiaNiro.id || (v.brand === "Kia" && v.model === "Niro Hybride 149 CH"));
  
  let changed = false;
  
  if (!rsq8Exists) {
    vehicles.push(audiRSQ8);
    changed = true;
  }
  
  if (!octaviaExists) {
    vehicles.push(skodaOctavia);
    changed = true;
  }
  
  if (!mercedesExists) {
    vehicles.push(mercedesC220);
    changed = true;
  }
  
  if (!jeepExists) {
    vehicles.push(jeepCompass);
    changed = true;
  }

  if (!mercedesGLAExists) {
    vehicles.push(mercedesGLA);
    changed = true;
  }
  
  if (!mercedesCLAExists) {
    vehicles.push(mercedesCLA);
    changed = true;
  }
  
  if (!bmwSerie2Exists) {
    vehicles.push(bmwSerie2);
    changed = true;
  }
  
  if (!volvoV60Exists) {
    vehicles.push(volvoV60);
    changed = true;
  }
  
  if (!volvoV60SecondExists) {
    vehicles.push(volvoV60Second);
    changed = true;
  }
  
  if (!mercedesC350eExists) {
    vehicles.push(mercedesC350e);
    changed = true;
  }
  
  if (!audiA6Exists) {
    vehicles.push(audiA6);
    changed = true;
  }
  
  if (!volkswagenPoloExists) {
    vehicles.push(volkswagenPolo);
    changed = true;
  }
  
  if (!volkswagenTCrossExists) {
    vehicles.push(volkswagenTCross);
    changed = true;
  }
  
  if (!bmwX5Exists) {
    vehicles.push(bmwX5);
    changed = true;
  }
  
  if (!audiA3ETronExists) {
    vehicles.push(audiA3ETron);
    changed = true;
  }
  
  if (!kiaNiroExists) {
    vehicles.push(kiaNiro);
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
    if (id === 'rsq8-fixed' || id === 'octavia-fixed' || id.includes('mercedes') || id.includes('jeep') || 
        id.includes('bmw') || id.includes('volvo') || id.includes('audi') || id.includes('volkswagen')) {
      toast.error("Impossible de supprimer un véhicule par défaut");
      return;
    }
    
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    
    if (updatedVehicles.length === vehicles.length) {
      toast.error("Véhicule non trouvé");
      return;
    }
    
    saveImportedVehicles(updatedVehicles);
    toast.success("Véhicule supprimé avec succès");
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    toast.error("Erreur lors de la suppression du véhicule");
  }
};

// Export the extractVehiclesFromUrl function
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  try {
    return await extractVehiclesWithScraper(url);
  } catch (error) {
    console.error("Error extracting vehicles:", error);
    throw error;
  }
};
