
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addMercedesClassC = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    
    const mercedesExists = featuredVehicles.find(
      v => v.brand === "Mercedes" && 
          v.model === "Benz Class C Coupé 4Matic" && 
          v.year === 2019
    );
    
    if (mercedesExists) {
      console.log("Mercedes Benz Class C Coupé 4Matic déjà présente dans le catalogue vedette");
      return;
    }
    
    // Créer le véhicule
    const mercedesClassC: ImportedVehicle = {
      id: `vehicle-featured-mercedes-classc-${Date.now()}`,
      brand: "Mercedes",
      model: "Benz Class C Coupé 4Matic",
      year: 2019,
      mileage: 65000,
      price: 14500,
      fuelType: "Essence",
      transmission: "Automatique",
      exteriorColor: "Noir",
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
        "/lovable-uploads/bf1c68c3-cf86-499a-bfc0-60fcddefbb3a.png",
        "/lovable-uploads/20ca6f90-db5a-43a4-a026-0b22f1dc311b.png"
      ],
      image: "/lovable-uploads/bf1c68c3-cf86-499a-bfc0-60fcddefbb3a.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      featured: true,
      catalogType: 'featured'
    };
    
    // Ajouter le véhicule au catalogue vedette
    const success = addImportedVehicle(mercedesClassC, 'featured');
    
    if (success) {
      console.log("Mercedes Benz Class C Coupé 4Matic ajoutée au catalogue vedette avec succès");
      toast.success("Mercedes Benz Class C Coupé 4Matic ajoutée au catalogue vedette avec succès");
    } else {
      console.error("Échec de l'ajout de la Mercedes Benz Class C Coupé 4Matic au catalogue vedette");
      toast.error("Échec de l'ajout de la Mercedes Benz Class C Coupé 4Matic au catalogue vedette");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Mercedes Benz Class C Coupé 4Matic:", error);
    toast.error("Erreur lors de l'ajout de la Mercedes Benz Class C Coupé 4Matic");
  }
};
