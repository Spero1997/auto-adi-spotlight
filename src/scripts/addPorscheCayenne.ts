
import { addImportedVehicle, getImportedVehicles, ImportedVehicle, deleteImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addPorscheCayenne = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    
    const porscheExists = featuredVehicles.find(
      v => v.brand === "Porsche" && 
          v.model === "Cayenne Turbo PAW" && 
          v.year === 2018
    );
    
    // Si le véhicule existe déjà, le supprimer d'abord pour le mettre à jour
    if (porscheExists) {
      console.log("Porsche Cayenne Turbo PAW déjà présente dans le catalogue vedette - suppression pour mise à jour");
      const deleteSuccess = deleteImportedVehicle(porscheExists.id, 'featured');
      if (!deleteSuccess) {
        console.error("Échec de la suppression de la Porsche Cayenne Turbo PAW avant mise à jour");
      }
    }
    
    // Créer le véhicule avec le nouveau lien Facebook mis à jour
    const porscheCayenne: ImportedVehicle = {
      id: porscheExists ? porscheExists.id : `vehicle-featured-porsche-cayenne-${Date.now()}`,
      brand: "Porsche",
      model: "Cayenne Turbo PAW",
      year: 2018,
      mileage: 93000,
      price: 18900,
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
        "/lovable-uploads/b6e36253-96f9-4661-b91c-3d89337ebf11.png"
      ],
      image: "/lovable-uploads/b6e36253-96f9-4661-b91c-3d89337ebf11.png",
      fbLink: "https://www.facebook.com/share/1BVVuSFKu8/?mibextid=wwXIfr",
      featured: true,
      catalogType: 'featured'
    };
    
    // Ajouter le véhicule au catalogue vedette
    const success = addImportedVehicle(porscheCayenne, 'featured');
    
    if (success) {
      console.log("Porsche Cayenne Turbo PAW ajoutée/mise à jour dans le catalogue vedette avec succès");
      console.log("Nouveau lien Facebook:", porscheCayenne.fbLink);
      toast.success("Porsche Cayenne Turbo PAW mise à jour dans le catalogue vedette avec succès");
      
      // Déclencher un événement pour forcer la mise à jour de l'affichage
      window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: 'featured' } }));
    } else {
      console.error("Échec de l'ajout/mise à jour de la Porsche Cayenne Turbo PAW au catalogue vedette");
      toast.error("Échec de la mise à jour de la Porsche Cayenne Turbo PAW au catalogue vedette");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout/mise à jour de la Porsche Cayenne Turbo PAW:", error);
    toast.error("Erreur lors de la mise à jour de la Porsche Cayenne Turbo PAW");
  }
};
