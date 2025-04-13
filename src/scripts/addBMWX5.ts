
import { addImportedVehicle, getImportedVehicles, ImportedVehicle, deleteImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addBMWX5 = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    
    const bmwExists = featuredVehicles.find(
      v => v.brand === "BMW" && 
          v.model === "X5 XDrive 40e M-Sport" && 
          v.year === 2018
    );
    
    // Si le véhicule existe déjà, le supprimer d'abord pour le mettre à jour
    if (bmwExists) {
      console.log("BMW X5 déjà présente dans le catalogue vedette - suppression pour mise à jour");
      deleteImportedVehicle(bmwExists.id, 'featured');
    }
    
    // Créer le véhicule avec le nouveau lien Facebook
    const bmwX5: ImportedVehicle = {
      id: bmwExists ? bmwExists.id : `vehicle-featured-bmw-x5-${Date.now()}`,
      brand: "BMW",
      model: "X5 XDrive 40e M-Sport",
      year: 2018,
      mileage: 114000,
      price: 12000,
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
      image: "/lovable-uploads/a4fa808b-f4bf-481d-8914-8e6c47e97a7c.png",
      fbLink: "https://www.facebook.com/share/18rZNUyZ2o/?mibextid=wwXIfr",
      featured: true,
      catalogType: 'featured'
    };
    
    // Ajouter le véhicule au catalogue vedette
    const success = addImportedVehicle(bmwX5, 'featured');
    
    if (success) {
      console.log("BMW X5 ajoutée/mise à jour dans le catalogue vedette avec succès");
      toast.success("BMW X5 mise à jour dans le catalogue vedette avec succès");
      
      // Déclencher un événement pour forcer la mise à jour de l'affichage
      window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: 'featured' } }));
    } else {
      console.error("Échec de l'ajout/mise à jour de la BMW X5 au catalogue vedette");
      toast.error("Échec de la mise à jour de la BMW X5 au catalogue vedette");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout/mise à jour de la BMW X5:", error);
    toast.error("Erreur lors de la mise à jour de la BMW X5");
  }
};
