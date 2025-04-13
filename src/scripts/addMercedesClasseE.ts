
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addMercedesClasseE = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const mercedesClasseEExists = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Classe E" && 
          v.year === 2018
    );
    
    if (mercedesClasseEExists) {
      console.log("Mercedes Benz Classe E déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const mercedesClasseE: ImportedVehicle = {
      id: `vehicle-standard-mercedes-classe-e-${Date.now()}`,
      brand: "Mercedes",
      model: "Benz Classe E",
      year: 2018,
      mileage: 92000,
      price: 8000,
      fuelType: "Essence",
      transmission: "Automatique",
      exteriorColor: "Blanc",
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
        "/lovable-uploads/0c43ad55-ae55-4fc4-b147-181fd7430b88.png"
      ],
      image: "/lovable-uploads/0c43ad55-ae55-4fc4-b147-181fd7430b88.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(mercedesClasseE, 'standard');
    
    if (success) {
      console.log("Mercedes Benz Classe E ajoutée au catalogue standard avec succès");
      toast.success("Mercedes Benz Classe E ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de la Mercedes Benz Classe E au catalogue standard");
      toast.error("Échec de l'ajout de la Mercedes Benz Classe E au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Mercedes Benz Classe E:", error);
    toast.error("Erreur lors de l'ajout de la Mercedes Benz Classe E");
  }
};
