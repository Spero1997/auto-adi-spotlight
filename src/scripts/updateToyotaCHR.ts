
import { getImportedVehicles, saveImportedVehicles } from "@/utils/vehicleImportService";
import { toast } from "sonner";

export const updateToyotaCHR = () => {
  try {
    // Récupérer les véhicules existants
    const vehicles = getImportedVehicles();
    
    // Vérifier si le Toyota C-HR existe déjà
    const existingToyotaIndex = vehicles.findIndex(v => 
      v.brand.toLowerCase() === 'toyota' && 
      v.model.toLowerCase().includes('c-hr')
    );
    
    // URL de l'image téléchargée
    const imageUrl = '/lovable-uploads/29c63ae4-6dcf-4bb5-a1fd-af31182ebd12.png';
    
    if (existingToyotaIndex !== -1) {
      // Mettre à jour l'image du véhicule existant
      vehicles[existingToyotaIndex] = {
        ...vehicles[existingToyotaIndex],
        image: imageUrl
      };
      
      // Sauvegarder les modifications
      saveImportedVehicles(vehicles);
      console.log("Image du Toyota C-HR mise à jour avec succès");
    } else {
      // Créer une nouvelle entrée pour le Toyota C-HR
      const newToyota = {
        id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        brand: "Toyota",
        model: "C-HR 1.8i Hybride GR Sport",
        year: 2022,
        mileage: 44409,
        fuelType: "Hybride Essence",
        price: 8000,
        image: imageUrl,
        features: [
          "Hybride",
          "Boîte automatique",
          "GR Sport",
          "Garantie 24 mois"
        ],
        description: `Toyota C-HR 1.8i Hybride GR Sport
Année: 02/2022
Kilométrage: 44 409 km (Certifié)
Puissance: 122 CH
Carburant: Hybride Essence
Boîte de Vitesse: Automatique

Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. 
Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
        transmission: "Automatique",
        engine: "1.8i Hybride 122 CH",
        exteriorColor: "Bleu",
        interiorColor: "Noir",
        doors: 5
      };
      
      // Ajouter le nouveau véhicule
      vehicles.push(newToyota);
      
      // Sauvegarder les modifications
      saveImportedVehicles(vehicles);
      console.log("Toyota C-HR ajouté avec succès");
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du Toyota C-HR:", error);
    toast.error("Erreur lors de la mise à jour du Toyota C-HR");
    return false;
  }
};
