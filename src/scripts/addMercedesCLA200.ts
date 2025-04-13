
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addMercedesCLA200 = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const mercedesCLA200Exists = standardVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz CLA 200 CDI 136 CV AMG" && 
          v.year === 2014
    );
    
    if (mercedesCLA200Exists) {
      console.log("Mercedes Benz CLA 200 CDI déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const mercedesCLA200: ImportedVehicle = {
      id: `vehicle-standard-mercedes-cla-200-${Date.now()}`,
      brand: "Mercedes",
      model: "Benz CLA 200 CDI 136 CV AMG",
      year: 2014,
      mileage: 118000,
      price: 5500,
      fuelType: "Diesel",
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
        "/lovable-uploads/ef36053d-6e92-41d9-9654-497a534d2b84.png"
      ],
      image: "/lovable-uploads/ef36053d-6e92-41d9-9654-497a534d2b84.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(mercedesCLA200, 'standard');
    
    if (success) {
      console.log("Mercedes Benz CLA 200 CDI ajoutée au catalogue standard avec succès");
      toast.success("Mercedes Benz CLA 200 CDI ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de la Mercedes Benz CLA 200 CDI au catalogue standard");
      toast.error("Échec de l'ajout de la Mercedes Benz CLA 200 CDI au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Mercedes Benz CLA 200 CDI:", error);
    toast.error("Erreur lors de l'ajout de la Mercedes Benz CLA 200 CDI");
  }
};
