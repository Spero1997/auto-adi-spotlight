
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "next-themes"
import App from './App.tsx'
import './index.css'
import './styles/noBadge.css' // Import du style pour masquer le badge
import { Toaster } from "@/components/ui/toaster"
import { getCatalogIdFromUrl } from '@/utils/vehicleImportService'
import { ImportedVehicle } from './utils/types/vehicle'

// Vérifier si un catalogue est spécifié dans l'URL
const catalogId = new URLSearchParams(window.location.search).get('catalog');
const catalogType = new URLSearchParams(window.location.search).get('type') || 'standard';

// Si un catalogue est spécifié dans l'URL, nous l'utilisons
if (catalogId) {
  console.log(`Catalogue trouvé dans l'URL: ${catalogId}`);
  // Cela mettra à jour le localStorage avec le catalogId de l'URL
  getCatalogIdFromUrl(catalogType as 'standard' | 'featured');
  
  // Déclencher un événement pour forcer le rechargement des véhicules
  window.dispatchEvent(new CustomEvent('catalogChanged', { 
    detail: { catalogType: catalogType || 'standard' } 
  }));
}

// Fonction pour ajouter des véhicules de démo automatiquement au premier chargement
const addDemoVehicles = () => {
  // Importer les fonctions nécessaires
  import('./utils/vehicleImportService').then(({ getImportedVehicles, addVehicle, saveImportedVehicles }) => {
    const vehicles = getImportedVehicles('standard');
    let vehiclesUpdated = false;
    
    // Identifiants fixes pour éviter les duplications
    const volvoV40Id = 'vehicle-standard-volvo-v40-d2-rdesign-2014';
    const bmwX7Id = 'vehicle-standard-bmw-x7-xdrive-40d-msport-pro-2022';
    const audiQ2Id = 'vehicle-standard-audi-q2-ultra-sport-2018';
    
    // Vérifier si la Volvo V40 existe déjà dans le catalogue
    const volvoV40Exists = vehicles.some(v => 
      (v.id === volvoV40Id) || 
      (v.brand === 'Volvo' && 
      v.model.includes('V40 D2 R-Design') && 
      v.year === 2014)
    );
    
    // Si elle n'existe pas, on l'ajoute
    if (!volvoV40Exists) {
      const volvoV40: ImportedVehicle = {
        id: volvoV40Id,
        brand: 'Volvo',
        model: 'V40 D2 R-Design',
        year: 2014,
        mileage: 116000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Blanc',
        interiorColor: 'Noir',
        image: '/lovable-uploads/27eeacb3-e4bf-46b9-babd-527e06b998e1.png', // Image mise à jour
        fbLink: 'https://www.facebook.com/share/p/1Hhh6zzGhy/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'R-Design',
          'Automatique',
          '115 ch'
        ],
        engine: 'D2 115ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      console.log("Ajout de la Volvo V40 avec image:", volvoV40.image);
      addVehicle(volvoV40, 'standard');
      console.log('Volvo V40 D2 R-Design ajoutée automatiquement au catalogue!');
      vehiclesUpdated = true;
    } else {
      // Si elle existe déjà, mettre à jour son image
      const existingVolvo = vehicles.find(v => 
        (v.id === volvoV40Id) || 
        (v.brand === 'Volvo' && 
        v.model.includes('V40 D2 R-Design') && 
        v.year === 2014)
      );
      
      if (existingVolvo) {
        existingVolvo.image = '/lovable-uploads/27eeacb3-e4bf-46b9-babd-527e06b998e1.png';
        console.log("Mise à jour de l'image de la Volvo V40 avec:", existingVolvo.image);
        saveImportedVehicles(vehicles, 'standard');
        console.log('Image de la Volvo V40 D2 R-Design mise à jour dans le catalogue!');
        vehiclesUpdated = true;
      }
    }
    
    // Vérifier si la BMW X7 existe déjà dans le catalogue
    const bmwX7Exists = vehicles.some(v => 
      (v.id === bmwX7Id) ||
      (v.brand === 'BMW' && 
      v.model.includes('X7 xDrive 40d M Sport Pro') && 
      v.year === 2022)
    );
    
    // Si elle n'existe pas, on l'ajoute
    if (!bmwX7Exists) {
      const bmwX7: ImportedVehicle = {
        id: bmwX7Id,
        brand: 'BMW',
        model: 'X7 xDrive 40d M Sport Pro',
        year: 2022,
        mileage: 43000,
        price: 27000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Noir',
        interiorColor: 'Noir',
        image: '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png',
        fbLink: '',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'M Sport Pro',
          'Automatique',
          '259 ch'
        ],
        engine: 'xDrive 40d 259ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(bmwX7, 'standard');
      console.log('BMW X7 xDrive 40d M Sport Pro ajoutée automatiquement au catalogue!');
      vehiclesUpdated = true;
    } else {
      // Si elle existe déjà, mettre à jour son image
      const existingBMWX7 = vehicles.find(v => 
        (v.id === bmwX7Id) || 
        (v.brand === 'BMW' && 
        v.model.includes('X7 xDrive 40d M Sport Pro') && 
        v.year === 2022)
      );
      
      if (existingBMWX7) {
        existingBMWX7.image = '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png';
        console.log("Mise à jour de l'image de la BMW X7 avec:", existingBMWX7.image);
        saveImportedVehicles(vehicles, 'standard');
        console.log('Image de la BMW X7 xDrive 40d M Sport Pro mise à jour dans le catalogue!');
        vehiclesUpdated = true;
      } else {
        console.log('La BMW X7 xDrive 40d M Sport Pro est déjà présente dans le catalogue');
      }
    }
    
    // Vérifier si l'Audi Q2 existe déjà dans le catalogue
    const audiQ2Exists = vehicles.some(v => 
      (v.id === audiQ2Id) ||
      (v.brand === 'Audi' && 
      v.model.includes('Q2 Ultra Sport') && 
      v.year === 2018)
    );
    
    // Si elle n'existe pas, on l'ajoute
    if (!audiQ2Exists) {
      const audiQ2: ImportedVehicle = {
        id: audiQ2Id,
        brand: 'Audi',
        model: 'Q2 Ultra Sport Sièges Crochet LED',
        year: 2018,
        mileage: 98000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Bleu',
        interiorColor: 'Noir',
        image: '/lovable-uploads/e48430e0-9c0b-4c80-83a9-f7e586bd9a71.png',
        fbLink: '',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'Sport Sièges',
          'Automatique',
          '116 ch'
        ],
        engine: 'Ultra 116ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(audiQ2, 'standard');
      console.log('Audi Q2 Ultra Sport ajoutée automatiquement au catalogue!');
      vehiclesUpdated = true;
    }
    
    // Si des véhicules ont été ajoutés, on déclenche l'événement une seule fois
    if (vehiclesUpdated) {
      // Déclencher un événement global pour mettre à jour l'affichage
      console.log('Déclenchement de l\'événement vehiclesUpdated pour rafraîchir l\'interface');
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
    }
  });
};

// Appeler la fonction après le chargement initial
window.addEventListener('load', addDemoVehicles);

// Ajouter un écouteur pour garantir que les véhicules sont chargés
// même si l'événement 'load' a déjà été déclenché
document.addEventListener('DOMContentLoaded', () => {
  // Petite temporisation pour s'assurer que tout est bien initialisé
  setTimeout(addDemoVehicles, 500);
});

// Ajouter manuellement la BMW X7 via l'API window
setTimeout(() => {
  if (window.addVehicleFromAssistant) {
    window.addVehicleFromAssistant(
      'BMW',
      'X7 xDrive 40d M Sport Pro',
      2022,
      43000,
      27000,
      'Diesel',
      'Automatique',
      'Noir',
      'Noir',
      '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png',
      '',
      `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
      [
        'Toit panoramique',
        'Navigation',
        'Caméra de recul',
        'M Sport Pro',
        'Automatique',
        '259 ch'
      ],
      'standard'
    );
    console.log('BMW X7 xDrive 40d M Sport Pro ajoutée via l\'API window.addVehicleFromAssistant');
  } else {
    console.error('La fonction window.addVehicleFromAssistant n\'est pas disponible');
  }
}, 2000);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    <Toaster />
  </ThemeProvider>
);
