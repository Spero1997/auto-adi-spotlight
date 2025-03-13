
import { toast } from "sonner";
import { ImportedVehicle } from "./vehicleImportService";

// Clés des sites supportés pour l'extraction
export const SUPPORTED_SITES = {
  "lacentrale.fr": {
    name: "La Centrale",
    selectors: {
      itemContainer: ".searchCard",
      brand: ".titleVehiculeInfo",
      model: ".titleVehiculeInfo",
      price: ".fieldPrice span.price",
      year: ".fieldYear",
      mileage: ".fieldMileage",
      fuelType: ".fieldFuel",
      image: ".imgLink img",
      transmission: ".fieldGearbox",
    }
  },
  "leboncoin.fr": {
    name: "Leboncoin",
    selectors: {
      itemContainer: ".styles_adCard__N3Qht",
      brand: "p.styles_adTitle",
      price: ".price",
      description: ".styles_AdCardDescription",
      image: ".styles_img",
    }
  },
  "autoscout24.fr": {
    name: "AutoScout24",
    selectors: {
      itemContainer: ".cldt-summary-full-item",
      brand: ".cldt-summary-title",
      price: ".cldt-price",
      year: ".cldt-summary-vehicle-data span:nth-child(1)",
      mileage: ".cldt-summary-vehicle-data span:nth-child(2)",
      fuelType: ".cldt-summary-vehicle-data span:nth-child(4)",
      image: ".cldt-summary-gallery-container img",
    }
  }
};

// Fonction pour identifier le site à partir de l'URL
export const identifySite = (url: string): string | null => {
  for (const siteKey in SUPPORTED_SITES) {
    if (url.includes(siteKey)) {
      return siteKey;
    }
  }
  return null;
};

// Cette fonction simule l'extraction en attendant une implémentation réelle
const simulateExtraction = async (url: string, siteName: string): Promise<ImportedVehicle[]> => {
  console.log(`Extraction simulée depuis ${siteName} (${url})`);
  
  // Simuler un délai d'extraction
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Générer entre 4 et 8 véhicules
  const count = 4 + Math.floor(Math.random() * 5);
  
  // Tableau des marques par site
  const brandsByDomain: Record<string, string[]> = {
    "lacentrale.fr": ["Renault", "Peugeot", "Citroën", "Dacia", "Alpine"],
    "leboncoin.fr": ["Volkswagen", "Audi", "BMW", "Mercedes", "Opel", "Ford"],
    "autoscout24.fr": ["BMW", "Audi", "Mercedes", "Porsche", "Volkswagen"],
  };
  
  // Utiliser les marques appropriées ou des marques par défaut
  const siteKey = Object.keys(SUPPORTED_SITES).find(key => url.includes(key)) || "";
  const relevantBrands = brandsByDomain[siteKey] || ["Renault", "Peugeot", "Toyota", "Ford", "Opel"];
  
  const vehicles: ImportedVehicle[] = [];
  
  for (let i = 0; i < count; i++) {
    const brand = relevantBrands[Math.floor(Math.random() * relevantBrands.length)];
    
    // Générer des modèles pertinents selon la marque
    let models: string[] = [];
    switch (brand.toLowerCase()) {
      case "renault":
        models = ["Clio", "Megane", "Captur", "Arkana", "Scenic"];
        break;
      case "peugeot":
        models = ["208", "308", "3008", "2008", "5008"];
        break;
      case "citroen":
        models = ["C3", "C4", "C5", "Berlingo", "C3 Aircross"];
        break;
      case "volkswagen":
        models = ["Golf", "Polo", "Tiguan", "Passat", "T-Roc"];
        break;
      case "bmw":
        models = ["Série 1", "Série 3", "Série 5", "X1", "X3"];
        break;
      case "audi":
        models = ["A1", "A3", "A4", "Q3", "Q5"];
        break;
      case "mercedes":
        models = ["Classe A", "Classe C", "GLC", "Classe E", "GLA"];
        break;
      default:
        models = ["Modèle A", "Modèle B", "Modèle C"];
    }
    
    const model = models[Math.floor(Math.random() * models.length)];
    const year = 2018 + Math.floor(Math.random() * 6); // Entre 2018 et 2023
    const mileage = 5000 + Math.floor(Math.random() * 100000);
    const price = 10000 + Math.floor(Math.random() * 40000);
    
    // Tableau d'images réalistes
    const imagePool = [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&q=80",
      "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&q=80"
    ];
    
    // Tableau des types de carburant
    const fuelTypes = ["Essence", "Diesel", "Hybride", "Électrique"];
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    
    // Tableau des transmissions
    const transmissions = ["Manuelle", "Automatique"];
    const transmission = transmissions[Math.floor(Math.random() * transmissions.length)];
    
    // Tableau des couleurs extérieures
    const exteriorColors = ["Noir", "Blanc", "Gris", "Bleu", "Rouge", "Argent"];
    const exteriorColor = exteriorColors[Math.floor(Math.random() * exteriorColors.length)];
    
    // Tableau des couleurs intérieures
    const interiorColors = ["Noir", "Beige", "Gris", "Marron"];
    const interiorColor = interiorColors[Math.floor(Math.random() * interiorColors.length)];
    
    // Caractéristiques de base pour tous les véhicules
    const baseFeatures = [
      "Climatisation", "Vitres électriques", "Fermeture centralisée", "Bluetooth",
      "Régulateur de vitesse", "Jantes alliage", "ESP", "ABS"
    ];
    
    // Caractéristiques supplémentaires pour les véhicules plus chers
    const additionalFeatures = [
      "Toit ouvrant", "Sièges chauffants", "GPS", "Caméra de recul",
      "Aide au stationnement", "Système audio premium", "Système d'infodivertissement",
      "Volant multifonction", "Détecteur d'angles morts", "Régulateur de vitesse adaptatif"
    ];
    
    // Ajouter des caractéristiques supplémentaires en fonction du prix
    let features = [...baseFeatures];
    if (price > 20000) {
      // Ajouter quelques caractéristiques supplémentaires pour les véhicules plus chers
      for (let j = 0; j < 4; j++) {
        features.push(additionalFeatures[Math.floor(Math.random() * additionalFeatures.length)]);
      }
    }
    
    // Éliminer les doublons
    features = [...new Set(features)];
    
    // Type de moteur en fonction du carburant
    let engine;
    if (fuelType === "Essence") {
      engine = `${(1 + Math.random()).toFixed(1)}L ${90 + Math.floor(Math.random() * 100)} ch`;
    } else if (fuelType === "Diesel") {
      engine = `${(1.5 + Math.random() * 0.6).toFixed(1)}L TDI ${110 + Math.floor(Math.random() * 80)} ch`;
    } else if (fuelType === "Hybride") {
      engine = `Hybride ${(1.8 + Math.random() * 0.4).toFixed(1)}L ${130 + Math.floor(Math.random() * 70)} ch`;
    } else {
      engine = `Électrique ${100 + Math.floor(Math.random() * 150)} kW`;
    }
    
    // Créer un identifiant unique
    const id = `${brand.substring(0, 3).toLowerCase()}-${model.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}-${i}`;
    
    // Créer le véhicule avec toutes les propriétés
    vehicles.push({
      id,
      brand,
      model,
      year,
      mileage,
      price,
      fuelType,
      image: imagePool[Math.floor(Math.random() * imagePool.length)],
      description: `${brand} ${model} ${year} en excellent état. ${fuelType}, ${transmission.toLowerCase()}, ${mileage.toLocaleString('fr-FR')} km.`,
      exteriorColor,
      interiorColor,
      transmission,
      doors: [3, 5][Math.floor(Math.random() * 2)],
      engine,
      features
    });
  }
  
  return vehicles;
};

// Fonction pour vérifier si l'extraction est possible sur un site
export const canExtractFromUrl = (url: string): boolean => {
  return identifySite(url) !== null;
};

// Fonction pour extraire des véhicules à partir d'une URL
export const extractVehiclesFromUrl = async (url: string): Promise<ImportedVehicle[]> => {
  try {
    const siteKey = identifySite(url);
    
    if (!siteKey) {
      throw new Error("Site non supporté pour l'extraction");
    }
    
    const siteName = SUPPORTED_SITES[siteKey as keyof typeof SUPPORTED_SITES].name;
    
    // Notification pour informer l'utilisateur
    toast.info(`Extraction depuis ${siteName} en cours...`);
    
    try {
      // Tentative d'extraction réelle (ici nous simulons)
      // En production, vous remplaceriez ceci par un appel à une API de scraping
      const vehicles = await simulateExtraction(url, siteName);
      
      if (vehicles.length === 0) {
        throw new Error("Aucun véhicule trouvé sur cette page");
      }
      
      return vehicles;
    } catch (error) {
      console.error("Erreur lors de l'extraction:", error);
      throw new Error(`Impossible d'extraire les véhicules depuis ${siteName}`);
    }
  } catch (error) {
    console.error("Erreur globale d'extraction:", error);
    throw error;
  }
};

export default {
  canExtractFromUrl,
  extractVehiclesFromUrl,
  SUPPORTED_SITES,
  identifySite
};
