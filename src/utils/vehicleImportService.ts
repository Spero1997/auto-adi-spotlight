// This file is now a facade that re-exports all vehicle-related functionality
// from the new modular files, to maintain backwards compatibility

// Import type first so we can use it in this file
import { ImportedVehicle } from './types/vehicle';

// Export types
export type { ImportedVehicle };

// Re-export constants
export {
  STORAGE_KEY,
  FEATURED_STORAGE_KEY,
  CATALOG_ID_KEY,
  FEATURED_CATALOG_ID_KEY,
  defaultVehicles
} from './constants/vehicleStorage';

// Re-export catalog URL services
export {
  generateShareableUrl,
  getCatalogIdFromUrl
} from './services/catalogService';

// Re-export storage services
export {
  getImportedVehicles,
  saveImportedVehicles
} from './services/vehicleStorageService';

// Explicitly import the functions we need
import { addVehicle, deleteVehicle, resetCatalog, moveVehicleBetweenCatalogs } from './services/vehicleCatalogService';
import { getImportedVehicles, saveImportedVehicles } from './services/vehicleStorageService';

// Re-export catalog management services directly
export { addVehicle, deleteVehicle, resetCatalog, moveVehicleBetweenCatalogs };

// Import extraction service
import { extractVehiclesFromUrl } from './services/vehicleExtractionService';

// Re-export extraction service
export { extractVehiclesFromUrl };

// Define aliases for backward compatibility
export const addImportedVehicle = addVehicle;
export const deleteImportedVehicle = deleteVehicle;

// Ajout d'une fonction pour vérifier la validité d'une URL d'image
export const validateImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Si c'est une URL relative qui commence par /lovable-uploads/
    if (url.startsWith('/lovable-uploads/')) {
      // On considère que c'est valide car c'est une image uploadée via Lovable
      resolve(true);
      return;
    }
    
    // Pour les autres URLs, on vérifie si l'image est accessible
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Fonction pour ajouter le Toyota C-HR au catalogue
export const addToyotaCHR = () => {
  try {
    const toyotaCHR: ImportedVehicle = {
      id: `vehicle-standard-${Date.now()}-toyota-chr-hybrid-gr-sport`,
      brand: 'Toyota',
      model: 'C-HR 1.8i Hybride GR Sport',
      year: 2022,
      mileage: 44000,
      price: 8000,
      fuelType: 'Essence',
      transmission: 'Automatique',
      exteriorColor: 'Bleu',
      interiorColor: 'Noir',
      image: '/lovable-uploads/a2e4d2f0-6ecf-4bb3-a88d-d89e102afe99.png',
      images: [
        '/lovable-uploads/4a7d0135-15bc-4d67-8593-95afa2898553.png',
        '/lovable-uploads/a148b039-46ad-4622-a3ec-a299bc1de8e4.png',
        '/lovable-uploads/b11a2e4e-48e8-4a7b-a908-f4bf4874c706.png',
        '/lovable-uploads/69913e1b-9583-451e-841b-0091350a3fba.png',
        '/lovable-uploads/8f78987f-d770-458f-820e-6298eaad2db1.png',
        '/lovable-uploads/68704d4d-09dd-42ce-b2f0-974c7764a40f.png'
      ],
      description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois

wa.me/393761753341`,
      features: [
        'Airbags (frontaux, latéraux, rideaux)',
        'Ceintures de sécurité (avec prétensionneurs)',
        'Système ABS (Anti-blocage des freins)',
        'ESP (Correcteur électronique de trajectoire)',
        'Aide au freinage d\'urgence',
        'Caméra de recul et capteurs de stationnement',
        'Aide au maintien de voie',
        'Détecteur d\'angle mort',
        'Régulateur et limiteur de vitesse',
        'Climatisation automatique',
        'Sièges chauffants',
        'Rétroviseurs électriques et dégivrants',
        'Vitres électriques',
        'Système Keyless (démarrage sans clé)',
        'Écran tactile avec GPS intégré',
        'Apple CarPlay & Android Auto',
        'Bluetooth et USB',
        'Feux LED',
        'Essuie-glaces automatiques',
        'Détecteur automatique de luminosité',
        'Boîte automatique',
        'Mode conduite (Eco, Sport)',
        'Système Start & Stop',
        'GR Sport Pack',
        'Jantes alliage sport',
        'Technologie hybride 122 CH'
      ],
      engine: '1.8i Hybride 122 CH',
      doors: 5,
      catalogType: 'standard'
    };
    
    const success = addVehicle(toyotaCHR, 'standard');
    
    if (success) {
      console.log('Toyota C-HR 1.8i Hybride GR Sport ajouté avec succès au catalogue!');
      
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
      
      window.dispatchEvent(new CustomEvent('catalogChanged'));
      
      return true;
    } else {
      console.error('Erreur lors de l\'ajout du Toyota C-HR 1.8i Hybride GR Sport');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Toyota C-HR 1.8i Hybride GR Sport:', error);
    return false;
  }
};

// Fonction pour mettre à jour l'image d'un véhicule
export const updateVehicleImage = (vehicleId: string, newImageUrl: string, catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Utilisation des fonctions importées explicitement
    const vehicles = getImportedVehicles(catalogType);
    
    const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId || 
      (v.brand === 'Toyota' && v.model.includes('C-HR') && v.year === 2022) ||
      (v.brand === 'Audi' && v.model.includes('Q2 Ultra Sport') && v.year === 2018));
    
    if (vehicleIndex !== -1) {
      // Mettre à jour l'image
      vehicles[vehicleIndex].image = newImageUrl;
      
      // Sauvegarder les modifications
      saveImportedVehicles(vehicles, catalogType);
      
      console.log(`Image de ${vehicles[vehicleIndex].brand} ${vehicles[vehicleIndex].model} mise à jour avec succès.`);
      
      // Déclencher un événement pour rafraîchir l'affichage
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType } 
      }));
      
      return true;
    } else {
      console.warn(`Véhicule avec ID ${vehicleId} non trouvé dans le catalogue ${catalogType}.`);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image du véhicule:", error);
    return false;
  }
};

// Fonction pour ajouter le Renault Scenic au catalogue
export const addRenaultScenic = () => {
  try {
    const renaultScenic: ImportedVehicle = {
      id: `vehicle-standard-${Date.now()}-renault-scenic-bose-edition`,
      brand: 'Renault',
      model: 'Scenic 1.5DCI 7-SETER BOSE-EDITION',
      year: 2017,
      mileage: 132000,
      price: 3000,
      fuelType: 'Diesel',
      transmission: 'Automatique',
      exteriorColor: 'Gris',
      interiorColor: 'Noir',
      image: '',
      images: [],
      description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois

wa.me/393761753341`,
      features: [
        'Airbags (frontaux, latéraux, rideaux)',
        'Ceintures de sécurité (avec prétensionneurs)',
        'Système ABS (Anti-blocage des freins)',
        'ESP (Correcteur électronique de trajectoire)',
        'Aide au freinage d\'urgence',
        'Caméra de recul et capteurs de stationnement',
        'Aide au maintien de voie',
        'Détecteur d\'angle mort',
        'Régulateur et limiteur de vitesse',
        
        'Climatisation automatique',
        'Sièges chauffants',
        'Rétroviseurs électriques et dégivrants',
        'Vitres électriques',
        'Toit panoramique',
        'Système Keyless (démarrage sans clé)',
        
        'Écran tactile avec GPS intégré',
        'Apple CarPlay & Android Auto',
        'Système audio Bose',
        'Bluetooth et USB',
        
        'Feux LED',
        'Essuie-glaces automatiques',
        'Détecteur automatique de luminosité',
        
        'Rangement modulable (sièges rabattables)',
        '7 places assises',
        
        'Boîte automatique',
        'Mode conduite (Eco, Sport)',
        'Système Start & Stop'
      ],
      engine: '1.5DCI 110 CH',
      doors: 5,
      catalogType: 'standard'
    };
    
    const success = addVehicle(renaultScenic, 'standard');
    
    if (success) {
      console.log('Renault Scenic 1.5DCI 7-SETER BOSE-EDITION ajouté avec succès au catalogue!');
      
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
      
      window.dispatchEvent(new CustomEvent('catalogChanged'));
      
      return true;
    } else {
      console.error('Erreur lors de l\'ajout du Renault Scenic 1.5DCI 7-SETER BOSE-EDITION');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Renault Scenic 1.5DCI 7-SETER BOSE-EDITION:', error);
    return false;
  }
};

// Fonction pour ajouter le Kia Sorento au catalogue
export const addKiaSorento = () => {
  try {
    const kiaSorento: ImportedVehicle = {
      id: `vehicle-standard-${Date.now()}-kia-sorento-hybrid-rechargeable`,
      brand: 'Kia',
      model: 'Sorento 1.6 T-GDI Hybride rechargeable',
      year: 2021,
      mileage: 104000,
      price: 6000,
      fuelType: 'Essence',
      transmission: 'Automatique',
      exteriorColor: 'Bleu',
      interiorColor: 'Noir',
      image: '/lovable-uploads/3b4fb48b-ad09-469b-84b9-b8c8c8b99888.png',
      images: [
        '/lovable-uploads/e8868948-8b92-4871-b4fb-b6bb393ea221.png',
        '/lovable-uploads/f385ebfd-67a0-4256-8a98-c43c8723ae8f.png',
        '/lovable-uploads/757b310b-bd11-4eab-99d0-06814a80623b.png'
      ],
      description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
      features: [
        'Airbags (frontaux, latéraux, rideaux)',
        'Système ABS (Anti-blocage des freins)',
        'ESP (Correcteur électronique de trajectoire)',
        'Aide au freinage d\'urgence',
        'Caméra de recul et capteurs de stationnement',
        'Aide au maintien de voie',
        'Détecteur d\'angle mort',
        'Régulateur de vitesse adaptatif',
        
        'Climatisation automatique bi-zone',
        'Sièges chauffants et ventilés',
        'Sièges en cuir premium',
        'Volant chauffant',
        'Rétroviseurs électriques et dégivrants',
        'Vitres électriques',
        'Toit panoramique',
        'Système Keyless (démarrage sans clé)',
        
        'Double écran tactile 10.25"',
        'Système de navigation',
        'Apple CarPlay & Android Auto',
        'Système audio premium',
        'Bluetooth et USB',
        'Recharge par induction pour smartphone',
        
        'Phares LED adaptatifs',
        'Feux diurnes LED',
        'Essuie-glaces automatiques',
        'Détecteur automatique de luminosité',
        
        'Hayon électrique',
        'Technologie hybride rechargeable',
        'Mode de conduite (Eco, Sport, Neige)',
        'Jantes alliage 19"',
        'Système Start & Stop'
      ],
      engine: '1.6 T-GDI Hybride rechargeable 265 CH',
      doors: 5,
      catalogType: 'standard'
    };
    
    const success = addVehicle(kiaSorento, 'standard');
    
    if (success) {
      console.log('Kia Sorento 1.6 T-GDI Hybride rechargeable ajouté avec succès au catalogue!');
      
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
      
      window.dispatchEvent(new CustomEvent('catalogChanged'));
      
      return true;
    } else {
      console.error('Erreur lors de l\'ajout du Kia Sorento 1.6 T-GDI Hybride rechargeable');
      return false;
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Kia Sorento 1.6 T-GDI Hybride rechargeable:', error);
    return false;
  }
};
