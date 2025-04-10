
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

// Fonction pour ajouter la Volvo V40 automatiquement au premier chargement
const checkAndAddVolvoV40 = () => {
  // Importer les fonctions nécessaires
  import('./utils/vehicleImportService').then(({ getImportedVehicles, addImportedVehicle }) => {
    const vehicles = getImportedVehicles('standard');
    
    // Vérifier si la Volvo V40 existe déjà dans le catalogue
    const volvoV40Exists = vehicles.some(v => 
      v.brand === 'Volvo' && 
      v.model.includes('V40 D2 R-Design') && 
      v.year === 2014
    );
    
    // Si elle n'existe pas, on l'ajoute
    if (!volvoV40Exists) {
      const volvoV40: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-volvo-v40-d2-rdesign`,
        brand: 'Volvo',
        model: 'V40 D2 R-Design',
        year: 2014,
        mileage: 116000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Blanc',
        interiorColor: 'Noir',
        image: '/lovable-uploads/f712b73e-a1b9-4fbf-899b-1e030d77e98b.png',
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
      
      addImportedVehicle(volvoV40, 'standard');
      console.log('Volvo V40 D2 R-Design ajoutée automatiquement au catalogue!');
      
      // Déclencher un événement pour mettre à jour l'affichage
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
    } else {
      console.log('La Volvo V40 D2 R-Design est déjà présente dans le catalogue');
    }
  });
};

// Appeler la fonction après le chargement initial
window.addEventListener('load', checkAndAddVolvoV40);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    <Toaster />
  </ThemeProvider>
);
