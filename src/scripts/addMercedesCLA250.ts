
import { addImportedVehicle } from "../utils/vehicleImportService";
import { toast } from "sonner";

export const addMercedesCLA250 = () => {
  // Créer l'objet véhicule
  const mercedes = {
    id: `mercedes-cla250-amg-${Date.now()}`,
    brand: "Mercedes",
    model: "CLA 250 AMG",
    year: 2021,
    mileage: 54000,
    fuelType: "Essence",
    transmission: "Automatique",
    price: 22000,
    exteriorColor: "Noir",
    interiorColor: "Noir",
    fbLink: "https://www.facebook.com/share/p/1BMUFhAFab/?mibextid=wwXIfr",
    image: "/lovable-uploads/2bcee263-e800-4fed-8c8f-8e89e628e7ae.png", // Image principale
    images: [
      "/lovable-uploads/2bcee263-e800-4fed-8c8f-8e89e628e7ae.png",
      "/lovable-uploads/9ca1facf-12bf-47e8-8116-52eb4f9268e0.png",
      "/lovable-uploads/97d85bfa-5c08-4505-aa50-1c08486ff9e0.png",
      "/lovable-uploads/e801e17f-56c8-4c7a-9a68-23eea3a88cac.png",
      "/lovable-uploads/2bcee263-e800-4fed-8c8f-8e89e628e7ae.png"
    ],
    description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande

Nos services inclus :
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !

Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
    features: [
      "Pack AMG",
      "Système de navigation",
      "Caméra de recul",
      "Sièges chauffants",
      "Toit panoramique",
      "Jantes alliage AMG",
      "Système d'aide au stationnement",
      "Bluetooth"
    ]
  };

  // Ajouter le véhicule au catalogue standard
  const success = addImportedVehicle(mercedes, 'standard');

  if (success) {
    console.log("Mercedes CLA 250 AMG ajoutée avec succès !");
    toast.success("Mercedes CLA 250 AMG ajoutée avec succès !");
    return true;
  } else {
    console.error("Erreur lors de l'ajout de la Mercedes CLA 250 AMG");
    toast.error("Erreur lors de l'ajout du véhicule");
    return false;
  }
};

