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
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
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

// Nouvelle BMW X1 xDrive 25e
const bmwX1 = {
  id: `bmw-x1-fixed`,
  brand: "BMW",
  model: "X1 xDrive 25e",
  year: 2021,
  mileage: 126000,
  fuelType: "Essence",
  price: 14000,
  transmission: "Automatique",
  exteriorColor: "Beige",
  interiorColor: "Marron",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Hybride rechargeable", "xDrive", "Système de navigation", "Toit panoramique", "Sièges chauffants", "Caméra de recul", "Jantes alliage", "Climatisation automatique", "Régulateur de vitesse adaptatif", "Bluetooth"],
  image: "/lovable-uploads/543454e5-3db4-4509-875a-d27b0336305f.png",
};

// Nouvelle Audi Q5 Quattro S-Tronic
const audiQ5 = {
  id: `audi-q5-fixed`,
  brand: "Audi",
  model: "Q5 Quattro S-Tronic",
  year: 2014,
  mileage: 135000,
  fuelType: "Diesel",
  price: 5000,
  transmission: "Automatique",
  exteriorColor: "Bleu",
  interiorColor: "Beige",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Quattro", "S-Tronic", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Sièges chauffants", "Jantes alliage", "Régulateur de vitesse", "Capteurs de stationnement"],
  image: "/lovable-uploads/ee5703fa-4d1c-4b0d-8ee7-63360be7c312.png",
};

// Nouvelle Audi Q7 245HK-2XS-Line
const audiQ7 = {
  id: `audi-q7-fixed`,
  brand: "Audi",
  model: "Q7 245HK-2XS-Line",
  year: 2012,
  mileage: 262000,
  fuelType: "Diesel",
  price: 5000,
  transmission: "Automatique",
  exteriorColor: "Noir mate",
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
  features: ["2XS-Line", "Phares LED", "Jantes sport", "Intérieur cuir", "Système de navigation", "Bluetooth", "Climatisation automatique", "Caméra de recul", "Sièges chauffants", "Suspensions pneumatiques"],
  image: "/lovable-uploads/84f33a30-1107-44ab-a3d5-2dcd01623f88.png",
};

// Nouvelle Audi A3 Sportback
const audiA3Sportback = {
  id: `audi-a3-sportback-fixed`,
  brand: "Audi",
  model: "A3 Sportback 35 1,5 TFSI",
  year: 2019,
  mileage: 78000,
  fuelType: "Essence",
  price: 9000,
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
  features: ["Sportback", "Phares LED", "Jantes alliage", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Régulateur de vitesse", "Capteurs de stationnement", "Sièges chauffants"],
  image: "/lovable-uploads/2a03c911-dfae-4186-b265-5b9977a7b1cb.png",
};

// Nouvelle BMW X3 xDrive 20d M-sport
const bmwX3 = {
  id: `bmw-x3-fixed`,
  brand: "BMW",
  model: "X3 xDrive 20d M-sport 190 CH",
  year: 2016,
  mileage: 127000,
  fuelType: "Diesel",
  price: 8000,
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
  features: ["M-Sport", "xDrive", "Phares LED", "Jantes alliage M", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Régulateur de vitesse", "Capteurs de stationnement"],
  image: "/lovable-uploads/8d7b5dff-9e58-47d0-92e3-2cb91694e58c.png",
};

// Nouvelle Range Rover Evoque
const rangeRoverEvoque = {
  id: `range-rover-evoque-fixed`,
  brand: "Range Rover",
  model: "Evoque 2.0 Prestige 241 CH",
  year: 2014,
  mileage: 117000,
  fuelType: "Essence",
  price: 10000,
  transmission: "Automatique",
  exteriorColor: "Grise",
  interiorColor: "Beige",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Prestige", "Toit panoramique", "Intérieur cuir", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Jantes alliage", "Régulateur de vitesse", "Capteurs de stationnement"],
  image: "/lovable-uploads/7044954c-4a4d-4bb0-9dd0-ed00db0b8115.png",
};

// Nouvelle BMW X3 2014
const bmwX3_2014 = {
  id: `bmw-x3-2014-fixed`,
  brand: "BMW",
  model: "X3 xDrive 20d",
  year: 2014,
  mileage: 126000,
  fuelType: "Diesel",
  price: 8700,
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
  features: ["xDrive", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Jantes alliage", "Régulateur de vitesse", "Capteurs de stationnement", "Sièges chauffants"],
  image: "/lovable-uploads/99e4c269-15bf-4ced-8ed9-f4c03f6f1378.png",
};

// Génère un ID unique pour le catalogue
export const generateCatalogId = () => {
  const existingId = localStorage.getItem(CATALOG_ID_KEY);
  if (existingId) return existingId;
  
  const newId = `catalog_${Date.now()}`;
  localStorage.setItem(CATALOG_ID_KEY, newId);
  return newId;
};

// Récupère l'ID du catalogue depuis l'URL
export const getCatalogIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('catalog');
};

// Génère une URL partageable avec l'ID du catalogue
export const generateShareableUrl = () => {
  const catalogId = generateCatalogId();
  const baseUrl = window.location.origin;
  return `${baseUrl}?catalog=${catalogId}`;
};

// Récupère les véhicules importés depuis le localStorage
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const storedVehicles = localStorage.getItem(STORAGE_KEY);
    let vehicles: ImportedVehicle[] = storedVehicles ? JSON.parse(storedVehicles) : [];
    
    // Vérifie la présence des véhicules fixes et les ajoute s'ils sont absents
    const fixedVehicles = [audiRSQ8, skodaOctavia, mercedesC220, jeepCompass, mercedesGLA, mercedesCLA, bmwSerie2, volvoV60, volvoV60Second, mercedesC350e, audiA6, volkswagenPolo, volkswagenTCross, bmwX5, audiA3ETron, kiaNiro, bmwX1, audiQ5, audiQ7, audiA3Sportback, bmwX3, rangeRoverEvoque, bmwX3_2014];
    
    for (const fixedVehicle of fixedVehicles) {
      const exists = vehicles.some(v => v.id === fixedVehicle.id);
      if (!exists) {
        vehicles.push(fixedVehicle);
      }
    }
    
    // Sauvegarde les véhicules mis à jour
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    
    return vehicles;
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
    return [];
  }
};

// Ajoute un véhicule à la liste des véhicules importés
export const addImportedVehicle = (vehicle: ImportedVehicle) => {
  try {
    const vehicles = getImportedVehicles();
    const exists = vehicles.some(v => 
      v.brand === vehicle.brand && 
      v.model === vehicle.model && 
      v.year === vehicle.year
    );
    
    if (!exists) {
      const newVehicles = [...vehicles, { ...vehicle, id: `${vehicle.brand}-${vehicle.model}-${Date.now()}` }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
      toast.success(`${vehicle.brand} ${vehicle.model} a été ajouté`);
      return true;
    } else {
      toast.error("Ce véhicule existe déjà dans le catalogue");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule:", error);
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};

// Sauvegarde les véhicules importés dans le localStorage
export const saveImportedVehicles = (vehicles: ImportedVehicle[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    // Dispatch un événement pour signaler que les véhicules ont été mis à jour
    window.dispatchEvent(new Event('vehiclesUpdated'));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des véhicules:", error);
    return false;
  }
};

// Supprime un véhicule de la liste des véhicules importés
export const removeImportedVehicle = (vehicleId: string) => {
  try {
    const vehicles = getImportedVehicles();
    const newVehicles = vehicles.filter(v => v.id !== vehicleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return false;
  }
};

// Supprime un véhicule par son ID
export const deleteImportedVehicle = (vehicleId: string) => {
  try {
    const vehicles = getImportedVehicles();
    const newVehicles = vehicles.filter(v => v.id !== vehicleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    // Dispatch un événement pour signaler que les véhicules ont été mis à jour
    window.dispatchEvent(new Event('vehiclesUpdated'));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du véhicule:", error);
    return false;
  }
};

// Marque un véhicule comme exclu (ne sera pas affiché dans le catalogue)
export const excludeVehicle = (vehicleId: string, excluded: boolean) => {
  try {
    const vehicles = getImportedVehicles();
    const newVehicles = vehicles.map(v => {
      if (v.id === vehicleId) {
        return { ...v, excluded };
      }
      return v;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVehicles));
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du véhicule:", error);
    return false;
  }
};

// Extrait les véhicules depuis une URL
export const extractVehiclesFromUrl = async (url: string) => {
  try {
    const vehicles = await extractVehiclesWithScraper(url);
    console.log("Véhicules extraits:", vehicles);
    
    if (vehicles.length === 0) {
      toast.error("Aucun véhicule n'a été trouvé sur cette URL");
      return [];
    }
    
    // Ajoute chaque véhicule extrait à la liste des véhicules importés
    const addedVehicles = [];
    for (const vehicle of vehicles) {
      const success = addImportedVehicle(vehicle);
      if (success) {
        addedVehicles.push(vehicle);
      }
    }
    
    if (addedVehicles.length > 0) {
      toast.success(`${addedVehicles.length} véhicule(s) importé(s) avec succès`);
    } else {
      toast.info("Aucun nouveau véhicule n'a été importé");
    }
    
    return addedVehicles;
  } catch (error) {
    console.error("Erreur lors de l'extraction des véhicules:", error);
    toast.error("Erreur lors de l'extraction des véhicules");
    return [];
  }
};
