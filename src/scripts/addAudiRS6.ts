
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addAudiRS6 = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    
    const audiExists = featuredVehicles.find(
      v => v.brand === "Audi" && 
          v.model === "RS 6" && 
          v.year === 2020
    );
    
    if (audiExists) {
      console.log("Audi RS 6 déjà présente dans le catalogue vedette");
      return;
    }
    
    // Créer le véhicule
    const audiRS6: ImportedVehicle = {
      id: `vehicle-featured-audi-rs6-${Date.now()}`,
      brand: "Audi",
      model: "RS 6",
      year: 2020,
      mileage: 85000,
      price: 19000,
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
        "/lovable-uploads/8a8b248f-b68b-4b4a-94fb-faeb428d4752.png"
      ],
      image: "/lovable-uploads/8a8b248f-b68b-4b4a-94fb-faeb428d4752.png",
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      featured: true,
      catalogType: 'featured'
    };
    
    // Ajouter le véhicule au catalogue vedette
    const success = addImportedVehicle(audiRS6, 'featured');
    
    if (success) {
      console.log("Audi RS 6 ajoutée au catalogue vedette avec succès");
      toast.success("Audi RS 6 ajoutée au catalogue vedette avec succès");
    } else {
      console.error("Échec de l'ajout de l'Audi RS 6 au catalogue vedette");
      toast.error("Échec de l'ajout de l'Audi RS 6 au catalogue vedette");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'Audi RS 6:", error);
    toast.error("Erreur lors de l'ajout de l'Audi RS 6");
  }
};
