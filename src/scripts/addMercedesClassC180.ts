
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addMercedesClassC180 = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const mercedesClassC180Exists = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Classe C 180 AMG" && 
          v.year === 2014
    );
    
    if (mercedesClassC180Exists) {
      console.log("Mercedes Benz Classe C 180 AMG déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const mercedesClassC180: ImportedVehicle = {
      id: `vehicle-standard-mercedes-class-c-180-${Date.now()}`,
      brand: "Mercedes",
      model: "Benz Classe C 180 AMG",
      year: 2014,
      mileage: 79000,
      price: 6500,
      fuelType: "Essence",
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
      images: [
        "/lovable-uploads/6aa56ab0-85c0-4800-b6ed-5917059cf7c9.png"
      ],
      image: "/lovable-uploads/6aa56ab0-85c0-4800-b6ed-5917059cf7c9.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(mercedesClassC180, 'standard');
    
    if (success) {
      console.log("Mercedes Benz Classe C 180 AMG ajoutée au catalogue standard avec succès");
      toast.success("Mercedes Benz Classe C 180 AMG ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de la Mercedes Benz Classe C 180 AMG au catalogue standard");
      toast.error("Échec de l'ajout de la Mercedes Benz Classe C 180 AMG au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Mercedes Benz Classe C 180 AMG:", error);
    toast.error("Erreur lors de l'ajout de la Mercedes Benz Classe C 180 AMG");
  }
};
