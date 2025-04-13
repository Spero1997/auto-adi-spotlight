import { ImportedVehicle } from './types/vehicle';
import { addVehicle } from './services/vehicleCatalogService';

/**
 * Fonction pour ajouter un véhicule Toyota C-HR au catalogue
 */
export const addToyotaCHR = () => {
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
  
  return addVehicle(toyotaCHR, 'standard');
};

/**
 * Fonction pour ajouter un véhicule Renault Scenic au catalogue
 */
export const addRenaultScenic = () => {
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
  
  return addVehicle(renaultScenic, 'standard');
};

/**
 * Fonction pour ajouter un véhicule Kia Sorento au catalogue
 */
export const addKiaSorento = () => {
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
    image: '/lovable-uploads/09a3cc25-c750-4556-927a-2c1db9a725b4.png',
    images: [
      '/lovable-uploads/0b3d94df-7bf3-4bdf-a10b-14c117c8aef8.png',
      '/lovable-uploads/61e64acf-14c0-41eb-8c86-eaf04b26ae2d.png',
      '/lovable-uploads/f3d9dc21-ffbf-409f-87ff-efafcb393b01.png'
    ],
    description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande`,
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
  
  return addVehicle(kiaSorento, 'standard');
};
