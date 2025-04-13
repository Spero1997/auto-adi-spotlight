
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addMercedesGLC = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const mercedesGLCExists = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz GLC 350e 326 CV 4Matic AMG" && 
          v.year === 2018
    );
    
    if (mercedesGLCExists) {
      console.log("Mercedes Benz GLC 350e déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const mercedesGLC: ImportedVehicle = {
      id: `vehicle-standard-mercedes-glc-${Date.now()}`,
      brand: "Mercedes",
      model: "Benz GLC 350e 326 CV 4Matic AMG",
      year: 2018,
      mileage: 88000,
      price: 16000,
      fuelType: "Essence",
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
      images: [
        "/lovable-uploads/7894c071-f4f7-4d86-b407-236586828cb9.png"
      ],
      image: "/lovable-uploads/7894c071-f4f7-4d86-b407-236586828cb9.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(mercedesGLC, 'standard');
    
    if (success) {
      console.log("Mercedes Benz GLC 350e ajoutée au catalogue standard avec succès");
      toast.success("Mercedes Benz GLC 350e ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de la Mercedes Benz GLC 350e au catalogue standard");
      toast.error("Échec de l'ajout de la Mercedes Benz GLC 350e au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Mercedes Benz GLC 350e:", error);
    toast.error("Erreur lors de l'ajout de la Mercedes Benz GLC 350e");
  }
};
