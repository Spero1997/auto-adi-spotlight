
import { addImportedVehicle, getImportedVehicles, ImportedVehicle, deleteImportedVehicle } from '@/utils/vehicleImportService';

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
      console.log("BMW X5 XDrive 40e M-Sport déjà présente dans le catalogue vedette - suppression pour mise à jour");
      const deleteSuccess = deleteImportedVehicle(bmwExists.id, 'featured');
      if (!deleteSuccess) {
        console.error("Échec de la suppression de la BMW X5 XDrive 40e M-Sport avant mise à jour");
      }
    }
    
    // Créer le véhicule avec le nouveau prix et la nouvelle image
    const bmwX5: ImportedVehicle = {
      id: bmwExists ? bmwExists.id : `vehicle-featured-bmw-x5-${Date.now()}`,
      brand: "BMW",
      model: "X5 XDrive 40e M-Sport",
      year: 2018,
      mileage: 99000,
      price: 9000, // Prix mis à jour
      fuelType: "Hybride",
      transmission: "Automatique",
      exteriorColor: "Blanc",
      interiorColor: "Noir",
      description: `# BMW X5 XDrive 40e M-Sport (Hybride, 313 CV)
- Année: 2018
- Kilométrage: 99.000 Km
- Prix: 9.000 €

## Modalités de paiement
- Acompte: 20% à la commande
- Solde: à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
- Offre spéciale: -10% pour paiement comptant à la commande

## Nos services inclus
- Délai de rétractation: 14 jours (Satisfait ou remboursé)
- Facilité de paiement: Payable comptant ou en mensualités sans intérêt
- Pas besoin de banque ni d'organisme financier, nous nous occupons de tout!
      
Garantie: 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
      images: [
        "/lovable-uploads/2bd6cf52-3fa8-4739-8770-07119259f83f.png"
      ],
      image: "/lovable-uploads/2bd6cf52-3fa8-4739-8770-07119259f83f.png", // Nouvelle image principale
      fbLink: "https://www.facebook.com/share/18rZNUyZ2o/?mibextid=wwXIfr",
      featured: true,
      catalogType: 'featured'
    };
    
    // Ajouter le véhicule au catalogue vedette
    const success = addImportedVehicle(bmwX5, 'featured');
    
    if (success) {
      console.log("BMW X5 XDrive 40e M-Sport mise à jour dans le catalogue vedette avec succès");
      
      // Déclencher un événement pour forcer la mise à jour de l'affichage
      window.dispatchEvent(new CustomEvent('catalogChanged', { detail: { catalogType: 'featured' } }));
      
      // Force refresh pour les pages de détails
      if (window.location.pathname.includes('vehicle-featured-bmw-x5')) {
        console.log("Page de détails BMW X5 détectée, rafraîchissement en cours...");
        setTimeout(() => window.location.reload(), 500);
      }
      
      return bmwX5;
    } else {
      console.error("Échec de la mise à jour de la BMW X5 XDrive 40e M-Sport au catalogue vedette");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la BMW X5 XDrive 40e M-Sport:", error);
    return null;
  }
};

// Fonction qui vérifie si nous sommes sur la page BMW X5 et exécute la mise à jour si nécessaire
export const checkAndUpdateBMWX5 = () => {
  if (window.location.pathname.includes('vehicle-featured-bmw-x5')) {
    console.log("Page BMW X5 détectée, vérification des mises à jour...");
    return addBMWX5();
  }
  return null;
};
