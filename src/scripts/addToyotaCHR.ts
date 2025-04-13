
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

/**
 * Script pour ajouter la Toyota C-HR au catalogue
 */
export const addToyotaCHR = () => {
  // Vérifier si le véhicule existe déjà
  const vehicles = getImportedVehicles();
  const toyotaExists = vehicles.some(v => 
    v.brand?.toLowerCase() === 'toyota' && 
    v.model?.toLowerCase().includes('c-hr') &&
    v.model?.toLowerCase().includes('gr sport')
  );
  
  // Si le véhicule existe déjà, ne rien faire
  if (toyotaExists) {
    console.log('La Toyota C-HR Hybride GR Sport existe déjà dans le catalogue');
    return false;
  }

  // Créer le véhicule avec les informations de la capture d'écran
  const toyotaCHR: ImportedVehicle = {
    id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    brand: 'Toyota',
    model: 'C-HR 1.8i Hybride GR Sport',
    year: 2022,
    price: 8000,
    mileage: 44409,
    fuelType: 'El +Essence',
    transmission: 'Automatique',
    exteriorColor: 'Bleu',
    engine: '122 CH',
    image: '/lovable-uploads/7c59b90c-9c91-4c3e-ae22-0560967a0dcf.png',
    description: `Modalités de paiement :
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
    features: [
      'Garantie 24 mois',
      'Kilométrage certifié',
      'Livraison à domicile',
      'GR Sport',
      'Hybride'
    ]
  };
  
  // Ajouter le véhicule au catalogue
  try {
    addImportedVehicle(toyotaCHR);
    console.log('Toyota C-HR Hybride GR Sport ajoutée au catalogue avec succès');
    toast.success('Toyota C-HR Hybride GR Sport ajoutée au catalogue');
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Toyota C-HR:", error);
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};
