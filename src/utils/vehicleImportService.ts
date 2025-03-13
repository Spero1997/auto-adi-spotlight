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

// Mercedes GLC 350e 4Matic - Nouvelle voiture ajoutée
const mercedesGLC350e = {
  id: `mercedes-glc350e-fixed`,
  brand: "Mercedes",
  model: "Benz GLC 350e 4Matic",
  year: 2017,
  mileage: 89000,
  fuelType: "Essence",
  price: 18000,
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
  features: ["4Matic", "Hybride rechargeable", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Jantes alliage", "Sièges chauffants", "Régulateur de vitesse adaptatif"],
  image: "/lovable-uploads/8a5b39b1-1602-45f7-9d9d-ee6977cb2078.png",
};

// Skoda Octavia
const skodaOctavia = {
  id: `skoda-octavia-fixed`,
  brand: "Skoda",
  model: "Octavia Combi 2.0 TDI",
  year: 2019,
  mileage: 45000,
  fuelType: "Diesel",
  price: 15000,
  transmission: "Manuelle",
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
  features: ["Climatisation", "Bluetooth", "Régulateur de vitesse", "Jantes alliage", "Système de navigation"],
  image: "/lovable-uploads/skoda-octavia.jpg",
};

// Mercedes C220
const mercedesC220 = {
  id: `mercedes-c220-fixed`,
  brand: "Mercedes",
  model: "C220 CDI",
  year: 2018,
  mileage: 60000,
  fuelType: "Diesel",
  price: 22000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["Toit ouvrant", "Sièges chauffants", "Caméra de recul", "Système de navigation", "Jantes AMG"],
  image: "/lovable-uploads/mercedes-c220.jpg",
};

// Jeep Compass
const jeepCompass = {
  id: `jeep-compass-fixed`,
  brand: "Jeep",
  model: "Compass 1.4 MultiAir",
  year: 2020,
  mileage: 35000,
  fuelType: "Essence",
  price: 19500,
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
  features: ["4x4", "Écran tactile", "Apple CarPlay", "Android Auto", "Climatisation automatique"],
  image: "/lovable-uploads/jeep-compass.jpg",
};

// Mercedes GLA
const mercedesGLA = {
  id: `mercedes-gla-fixed`,
  brand: "Mercedes",
  model: "GLA 200d",
  year: 2021,
  mileage: 25000,
  fuelType: "Diesel",
  price: 28000,
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
  features: ["Toit panoramique", "Système MBUX", "Caméra 360°", "Sièges chauffants", "Jantes AMG"],
  image: "/lovable-uploads/mercedes-gla.jpg",
};

// Mercedes CLA
const mercedesCLA = {
  id: `mercedes-cla-fixed`,
  brand: "Mercedes",
  model: "CLA 180 Shooting Brake",
  year: 2020,
  mileage: 30000,
  fuelType: "Essence",
  price: 26000,
  transmission: "Automatique",
  exteriorColor: "Gris",
  interiorColor: "Rouge",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Pack AMG", "Système MBUX", "Apple CarPlay", "Android Auto", "Sièges sport"],
  image: "/lovable-uploads/mercedes-cla.jpg",
};

// BMW Série 2
const bmwSerie2 = {
  id: `bmw-serie2-fixed`,
  brand: "BMW",
  model: "Série 2 Gran Coupé 220d",
  year: 2021,
  mileage: 28000,
  fuelType: "Diesel",
  price: 29000,
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
  features: ["Pack M Sport", "Système iDrive", "Toit ouvrant", "Caméra de recul", "Jantes alliage 18 pouces"],
  image: "/lovable-uploads/bmw-serie2.jpg",
};

// Volvo V60
const volvoV60 = {
  id: `volvo-v60-fixed`,
  brand: "Volvo",
  model: "V60 D4",
  year: 2019,
  mileage: 50000,
  fuelType: "Diesel",
  price: 24000,
  transmission: "Automatique",
  exteriorColor: "Gris",
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
  features: ["Sièges cuir", "Système Sensus", "Toit panoramique", "Régulateur adaptatif", "Jantes alliage"],
  image: "/lovable-uploads/volvo-v60.jpg",
};

// Volvo V60 Second
const volvoV60Second = {
  id: `volvo-v60-second-fixed`,
  brand: "Volvo",
  model: "V60 T6 Twin Engine",
  year: 2020,
  mileage: 40000,
  fuelType: "Hybride",
  price: 32000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["Hybride rechargeable", "Système Sensus Pro", "Sièges ventilés", "Harman Kardon", "Pilot Assist"],
  image: "/lovable-uploads/volvo-v60-second.jpg",
};

// Mercedes C350e
const mercedesC350e = {
  id: `mercedes-c350e-fixed`,
  brand: "Mercedes",
  model: "C350e",
  year: 2018,
  mileage: 55000,
  fuelType: "Hybride",
  price: 27000,
  transmission: "Automatique",
  exteriorColor: "Argent",
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
  features: ["Hybride rechargeable", "Système COMAND", "Toit ouvrant", "Sièges chauffants", "LED Intelligent Light"],
  image: "/lovable-uploads/mercedes-c350e.jpg",
};

// Audi A6
const audiA6 = {
  id: `audi-a6-fixed`,
  brand: "Audi",
  model: "A6 40 TDI",
  year: 2020,
  mileage: 45000,
  fuelType: "Diesel",
  price: 31000,
  transmission: "Automatique",
  exteriorColor: "Noir",
  interiorColor: "Gris",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["MMI Navigation Plus", "Virtual Cockpit", "Sièges cuir", "Caméra 360°", "Bang & Olufsen"],
  image: "/lovable-uploads/audi-a6.jpg",
};

// Volkswagen Polo
const volkswagenPolo = {
  id: `volkswagen-polo-fixed`,
  brand: "Volkswagen",
  model: "Polo 1.0 TSI",
  year: 2021,
  mileage: 20000,
  fuelType: "Essence",
  price: 16000,
  transmission: "Manuelle",
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
  features: ["App-Connect", "Climatisation", "Régulateur de vitesse", "Capteurs de stationnement", "Jantes alliage"],
  image: "/lovable-uploads/volkswagen-polo.jpg",
};

// Volkswagen T-Cross
const volkswagenTCross = {
  id: `volkswagen-tcross-fixed`,
  brand: "Volkswagen",
  model: "T-Cross 1.0 TSI",
  year: 2020,
  mileage: 30000,
  fuelType: "Essence",
  price: 18500,
  transmission: "Automatique",
  exteriorColor: "Bleu",
  interiorColor: "Gris",
  description: `Modalités de paiement
 • Acompte : 20 % à la commande
 • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
 • Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
 • Délai de rétractation : 14 jours (Satisfait ou remboursé)
 • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
 • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
  features: ["Digital Cockpit", "App-Connect", "Caméra de recul", "Climatisation automatique", "Jantes 17 pouces"],
  image: "/lovable-uploads/volkswagen-tcross.jpg",
};

// BMW X5
const bmwX5 = {
  id: `bmw-x5-fixed`,
  brand: "BMW",
  model: "X5 xDrive30d",
  year: 2019,
  mileage: 60000,
  fuelType: "Diesel",
  price: 45000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["xDrive", "Toit panoramique", "Système iDrive Pro", "Caméra 360°", "Harman Kardon"],
  image: "/lovable-uploads/bmw-x5.jpg",
};

// Audi A3 e-tron
const audiA3ETron = {
  id: `audi-a3-etron-fixed`,
  brand: "Audi",
  model: "A3 Sportback e-tron",
  year: 2018,
  mileage: 40000,
  fuelType: "Hybride",
  price: 23000,
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
  features: ["Hybride rechargeable", "MMI Navigation", "Sièges chauffants", "Caméra de recul", "Jantes alliage"],
  image: "/lovable-uploads/audi-a3-etron.jpg",
};

// Kia Niro
const kiaNiro = {
  id: `kia-niro-fixed`,
  brand: "Kia",
  model: "Niro Hybrid",
  year: 2020,
  mileage: 35000,
  fuelType: "Hybride",
  price: 21000,
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
  features: ["Hybride", "Écran tactile 10.25\"", "Apple CarPlay", "Android Auto", "Caméra de recul"],
  image: "/lovable-uploads/kia-niro.jpg",
};

// BMW X1
const bmwX1 = {
  id: `bmw-x1-fixed`,
  brand: "BMW",
  model: "X1 sDrive18d",
  year: 2020,
  mileage: 40000,
  fuelType: "Diesel",
  price: 26000,
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
  features: ["Système iDrive", "Caméra de recul", "Sièges chauffants", "Jantes alliage", "Climatisation automatique"],
  image: "/lovable-uploads/bmw-x1.jpg",
};

// Audi Q5
const audiQ5 = {
  id: `audi-q5-fixed`,
  brand: "Audi",
  model: "Q5 40 TDI quattro",
  year: 2019,
  mileage: 50000,
  fuelType: "Diesel",
  price: 33000,
  transmission: "Automatique",
  exteriorColor: "Gris",
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
  features: ["Quattro", "MMI Navigation Plus", "Virtual Cockpit", "Toit panoramique", "Bang & Olufsen"],
  image: "/lovable-uploads/audi-q5.jpg",
};

// Audi Q7
const audiQ7 = {
  id: `audi-q7-fixed`,
  brand: "Audi",
  model: "Q7 50 TDI quattro",
  year: 2020,
  mileage: 45000,
  fuelType: "Diesel",
  price: 48000,
  transmission: "Automatique",
  exteriorColor: "Noir",
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
  features: ["7 places", "Quattro", "MMI Navigation Plus", "Caméra 360°", "Bose Surround Sound"],
  image: "/lovable-uploads/audi-q7.jpg",
};

// Audi A3 Sportback
const audiA3Sportback = {
  id: `audi-a3-sportback-fixed`,
  brand: "Audi",
  model: "A3 Sportback 35 TFSI",
  year: 2021,
  mileage: 25000,
  fuelType: "Essence",
  price: 24000,
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
  features: ["Virtual Cockpit", "MMI Navigation", "Sièges sport", "Jantes alliage 18 pouces", "Climatisation automatique"],
  image: "/lovable-uploads/audi-a3-sportback.jpg",
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
  features: ["M-sport", "xDrive", "Phares LED", "Jantes alliage M", "Système de navigation", "Bluetooth", "Caméra de recul", "Climatisation automatique", "Régulateur de vitesse adaptatif", "Aide au stationnement"],
  image: "/lovable-uploads/f9728fa8-3f2a-47a5-9ee8-acb985f96084.png",
};

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
 */
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const catalogId = getCatalogIdFromUrl();
    const storageKey = catalogId ? `${STORAGE_KEY}_${catalogId}` : STORAGE_KEY;
    
    console.log(`Récupération des véhicules depuis ${storageKey}`);
    
    const existingVehicles = localStorage.getItem(storageKey);
    
    if (existingVehicles) {
      const parsedVehicles = JSON.parse(existingVehicles);
      
      if (Array.isArray(parsedVehicles)) {
        // Filtrer les véhicules exclus
        return parsedVehicles.filter(v => !v.excluded);
      }
    }
    
    // Si aucun véhicule n'
