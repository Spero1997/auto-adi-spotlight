
import { toast } from "sonner";

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

// Récupérer les véhicules importés du stockage local
export const getImportedVehicles = (): ImportedVehicle[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules:", error);
  }
  return [];
};

// Enregistrer les véhicules dans le stockage local
export const saveImportedVehicles = (vehicles: ImportedVehicle[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des véhicules:", error);
    toast.error("Erreur lors de l'enregistrement des véhicules");
  }
};

// Ajouter de nouveaux véhicules aux véhicules existants
export const addImportedVehicles = (newVehicles: ImportedVehicle[]): void => {
  try {
    const currentVehicles = getImportedVehicles();
    const existingIds = new Set(currentVehicles.map(v => v.id));
    
    // Filtrer les véhicules déjà existants par ID
    const uniqueNewVehicles = newVehicles.filter(v => !existingIds.has(v.id));
    
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
    // Simulation d'une requête d'extraction (à remplacer par une API réelle)
    // Dans une application réelle, vous utiliseriez une API de scraping ou un backend
    const response = await fetch(`/api/extract-vehicles?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error("Erreur lors de l'extraction des véhicules");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'extraction:", error);
    
    // En cas d'erreur de l'API, nous simulons une réponse pour démonstration
    // En production, il faudrait gérer cette erreur correctement
    return simulateVehicleExtraction(url);
  }
};

// Fonction de simulation d'extraction (à utiliser uniquement pour la démonstration)
const simulateVehicleExtraction = (url: string): ImportedVehicle[] => {
  console.log(`Simulation d'extraction depuis: ${url}`);
  
  // Vérifier si l'URL contient des indices pour déterminer quels véhicules simuler
  const isLuxuryDealer = url.includes('luxury') || url.includes('premium');
  const isBudgetDealer = url.includes('budget') || url.includes('occasion');
  
  // Déterminer la marque de véhicule à partir de l'URL si possible
  let brandHint = '';
  ['bmw', 'audi', 'mercedes', 'renault', 'peugeot', 'toyota', 'honda'].forEach(brand => {
    if (url.toLowerCase().includes(brand)) {
      brandHint = brand;
    }
  });
  
  // Créer un tableau basé sur les indices extraits de l'URL
  const vehicles: ImportedVehicle[] = [];
  const count = 3 + Math.floor(Math.random() * 5); // Entre 3 et 7 véhicules
  
  for (let i = 0; i < count; i++) {
    let vehicle: ImportedVehicle;
    
    if (brandHint) {
      // Créer un véhicule de la marque spécifiée
      vehicle = createBrandSpecificVehicle(brandHint, i);
    } else if (isLuxuryDealer) {
      // Créer des véhicules de luxe
      const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Porsche'];
      const brand = luxuryBrands[Math.floor(Math.random() * luxuryBrands.length)];
      vehicle = createBrandSpecificVehicle(brand.toLowerCase(), i);
    } else if (isBudgetDealer) {
      // Créer des véhicules économiques
      const budgetBrands = ['Dacia', 'Fiat', 'Kia', 'Hyundai', 'Suzuki'];
      const brand = budgetBrands[Math.floor(Math.random() * budgetBrands.length)];
      vehicle = createBrandSpecificVehicle(brand.toLowerCase(), i);
    } else {
      // Véhicules variés par défaut
      const allBrands = ['Renault', 'Peugeot', 'Citroën', 'Toyota', 'Ford', 'Opel', 'Volkswagen'];
      const brand = allBrands[Math.floor(Math.random() * allBrands.length)];
      vehicle = createBrandSpecificVehicle(brand.toLowerCase(), i);
    }
    
    vehicles.push(vehicle);
  }
  
  return vehicles;
};

// Fonction auxiliaire pour créer un véhicule spécifique à une marque
const createBrandSpecificVehicle = (brand: string, index: number): ImportedVehicle => {
  // Tableau des modèles par marque
  const brandModels: Record<string, string[]> = {
    bmw: ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'],
    mercedes: ['Classe A', 'Classe C', 'Classe E', 'GLC', 'GLE'],
    audi: ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5'],
    renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic'],
    peugeot: ['208', '308', '3008', '5008', '508'],
    citroen: ['C3', 'C4', 'C5', 'Berlingo', 'C3 Aircross'],
    toyota: ['Yaris', 'Corolla', 'RAV4', 'C-HR', 'Prius'],
    ford: ['Fiesta', 'Focus', 'Kuga', 'Puma', 'Mondeo'],
    opel: ['Corsa', 'Astra', 'Mokka', 'Grandland', 'Crossland'],
    volkswagen: ['Polo', 'Golf', 'Tiguan', 'Passat', 'T-Roc'],
    dacia: ['Sandero', 'Duster', 'Logan', 'Spring', 'Jogger'],
    fiat: ['500', 'Panda', 'Tipo', '500X', '500L'],
    kia: ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Niro'],
    hyundai: ['i10', 'i20', 'i30', 'Tucson', 'Kona'],
    suzuki: ['Swift', 'Vitara', 'Ignis', 'S-Cross', 'Jimny'],
    lexus: ['UX', 'NX', 'RX', 'IS', 'ES'],
    porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan']
  };
  
  // Utiliser des modèles par défaut si la marque n'est pas dans notre base
  brand = brand.toLowerCase();
  const models = brandModels[brand] || ['Modèle A', 'Modèle B', 'Modèle C'];
  
  // Sélectionner un modèle aléatoire pour cette marque
  const model = models[Math.floor(Math.random() * models.length)];
  
  // Déterminer une gamme de prix appropriée en fonction de la marque
  let priceRange = { min: 15000, max: 25000 }; // Gamme par défaut
  
  if (['bmw', 'mercedes', 'audi', 'lexus', 'porsche'].includes(brand)) {
    priceRange = { min: 35000, max: 95000 }; // Marques premium
  } else if (['volkswagen', 'toyota', 'ford'].includes(brand)) {
    priceRange = { min: 20000, max: 40000 }; // Marques intermédiaires
  } else if (['dacia', 'fiat', 'suzuki'].includes(brand)) {
    priceRange = { min: 10000, max: 20000 }; // Marques économiques
  }
  
  // Générer un prix aléatoire dans la gamme
  const price = Math.floor(priceRange.min + Math.random() * (priceRange.max - priceRange.min));
  
  // Types de carburant avec probabilités variables selon la marque
  let fuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
  if (['toyota', 'lexus'].includes(brand)) {
    fuelTypes = ['Hybride', 'Hybride', 'Essence', 'Électrique']; // Plus de chances d'être hybride
  } else if (['porsche', 'bmw', 'audi'].includes(brand)) {
    fuelTypes = ['Essence', 'Essence', 'Diesel', 'Hybride', 'Électrique'];
  }
  
  const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
  
  // Caractéristiques supplémentaires
  const transmissions = ['Manuelle', 'Automatique'];
  const exteriorColors = ['Noir', 'Blanc', 'Gris', 'Bleu', 'Rouge', 'Argent'];
  const interiorColors = ['Noir', 'Beige', 'Gris', 'Marron'];
  
  // Générer des caractéristiques en fonction de la marque et du modèle
  const features = generateFeatures(brand, price);
  
  // Créer un ID unique basé sur la marque, le modèle et un timestamp
  const id = `${brand.substring(0, 3)}-${model.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-${index}`;
  
  // Image générée de manière aléatoire à partir d'URLs d'images de voitures
  const imagePool = [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  ];
  
  return {
    id,
    brand: brand.charAt(0).toUpperCase() + brand.slice(1), // Première lettre en majuscule
    model,
    year: 2018 + Math.floor(Math.random() * 5), // Entre 2018 et 2022
    mileage: Math.floor(Math.random() * 80000) + 5000,
    fuelType,
    price,
    image: imagePool[Math.floor(Math.random() * imagePool.length)],
    description: `${brand.charAt(0).toUpperCase() + brand.slice(1)} ${model} en excellent état. ${fuelType}, entretien régulier.`,
    exteriorColor: exteriorColors[Math.floor(Math.random() * exteriorColors.length)],
    interiorColor: interiorColors[Math.floor(Math.random() * interiorColors.length)],
    transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
    doors: [3, 5][Math.floor(Math.random() * 2)],
    engine: generateEngine(fuelType, price),
    features
  };
};

// Génère un descriptif de moteur en fonction du type de carburant et du prix
const generateEngine = (fuelType: string, price: number): string => {
  if (fuelType === 'Électrique') {
    const power = 100 + Math.floor(Math.random() * 300);
    return `Moteur électrique ${power} kW`;
  } else if (fuelType === 'Hybride') {
    const power = 100 + Math.floor(Math.random() * 150);
    return `Hybride ${(1.5 + Math.random()).toFixed(1)}L ${power} ch`;
  } else if (fuelType === 'Essence') {
    const displacement = price > 30000 ? (2 + Math.random() * 2).toFixed(1) : (1 + Math.random()).toFixed(1);
    const power = price > 30000 ? 150 + Math.floor(Math.random() * 250) : 90 + Math.floor(Math.random() * 80);
    return `${displacement}L ${power} ch`;
  } else { // Diesel
    const displacement = price > 30000 ? (2 + Math.random()).toFixed(1) : (1.5 + Math.random() * 0.5).toFixed(1);
    const power = price > 30000 ? 150 + Math.floor(Math.random() * 150) : 90 + Math.floor(Math.random() * 70);
    return `${displacement}L TDI ${power} ch`;
  }
};

// Génère des caractéristiques en fonction de la marque et du prix
const generateFeatures = (brand: string, price: number): string[] => {
  const baseFeatures = [
    'Climatisation', 'Vitres électriques', 'Fermeture centralisée', 'Direction assistée'
  ];
  
  const midFeatures = [
    'Régulateur de vitesse', 'Capteurs de stationnement', 'Bluetooth', 'Jantes alliage',
    'Sièges chauffants', 'GPS', 'Caméra de recul'
  ];
  
  const highFeatures = [
    'Toit ouvrant', 'Sièges en cuir', 'Affichage tête haute', 'Système audio premium', 
    'Système de navigation avancé', 'Assistance au stationnement', 'Détection d\'angle mort'
  ];
  
  const luxuryFeatures = [
    'Suspension pneumatique', 'Massage des sièges', 'Système audio haut de gamme',
    'Conduite semi-autonome', 'Vision nocturne', 'Système d\'infodivertissement avancé'
  ];
  
  let features = [...baseFeatures];
  
  // Ajouter des caractéristiques en fonction du prix
  if (price > 15000) {
    // Ajouter quelques caractéristiques de milieu de gamme
    for (let i = 0; i < 3; i++) {
      features.push(midFeatures[Math.floor(Math.random() * midFeatures.length)]);
    }
  }
  
  if (price > 30000) {
    // Ajouter quelques caractéristiques haut de gamme
    for (let i = 0; i < 3; i++) {
      features.push(highFeatures[Math.floor(Math.random() * highFeatures.length)]);
    }
  }
  
  if (price > 50000) {
    // Ajouter quelques caractéristiques de luxe
    for (let i = 0; i < 2; i++) {
      features.push(luxuryFeatures[Math.floor(Math.random() * luxuryFeatures.length)]);
    }
  }
  
  // Ajouter des caractéristiques spécifiques à la marque
  if (['bmw', 'mercedes', 'audi'].includes(brand.toLowerCase())) {
    features.push('Système iDrive');
    features.push('Éclairage d\'ambiance');
  } else if (['toyota', 'lexus'].includes(brand.toLowerCase())) {
    features.push('Toyota Safety Sense');
    features.push('Système hybride synergique');
  }
  
  // Éliminer les doublons et mélanger l'ordre
  return [...new Set(features)].sort(() => 0.5 - Math.random());
};
