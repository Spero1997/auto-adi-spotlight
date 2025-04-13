
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

/**
 * Script pour ajouter la Volvo V40 D2 R-Design au catalogue
 */
export const addVolvoV40 = () => {
  // Vérifier si le véhicule existe déjà
  const vehicles = getImportedVehicles();
  const volvoExists = vehicles.some(v => 
    v.brand?.toLowerCase() === 'volvo' && 
    v.model?.toLowerCase().includes('v40') &&
    v.model?.toLowerCase().includes('r-design')
  );
  
  // Si le véhicule existe déjà, ne rien faire
  if (volvoExists) {
    console.log('La Volvo V40 D2 R-Design existe déjà dans le catalogue');
    return false;
  }

  // Créer le véhicule avec les informations de la capture d'écran
  const volvoV40: ImportedVehicle = {
    id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    brand: 'Volvo',
    model: 'V40 D2 R-Design',
    year: 2014,
    price: 4000,
    mileage: 116000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    exteriorColor: 'Blanc',
    interiorColor: 'Noir',
    doors: 5,
    engine: 'D2 115ch',
    image: '/lovable-uploads/9d49d39c-ef6c-4f74-a302-3f7c8a2d031c.png',
    description: `Modalités de paiement :
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
      'Garantie 24 mois',
      'Livraison à domicile',
      'Paiement en mensualités sans intérêt'
    ]
  };
  
  // Ajouter le véhicule au catalogue
  try {
    addImportedVehicle(volvoV40);
    console.log('Volvo V40 D2 R-Design ajoutée au catalogue avec succès');
    toast.success('Volvo V40 D2 R-Design ajoutée au catalogue');
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Volvo V40:", error);
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};

// Exécuter la fonction lors de l'importation
addVolvoV40();
