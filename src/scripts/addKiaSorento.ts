
import { addImportedVehicle } from "@/utils/vehicleImportService";

export const addKiaSorento = () => {
  const kiaSorento = {
    id: `kia-sorento-${Date.now()}`,
    brand: "Kia",
    model: "Sorento 1.6 T-GDI Hybride rechargeable",
    year: 2021,
    mileage: 104000,
    price: 6000,
    fuelType: "Essence",
    transmission: "Automatique",
    exteriorColor: "Bleu",
    interiorColor: "Noir",
    engine: "265 CH",
    image: "/lovable-uploads/1d43c09f-608c-456e-bb7f-ae06eb9bab3b.png",
    description: `
Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
    features: [
      "Hybride rechargeable",
      "Transmission automatique",
      "265 chevaux",
      "Garantie 24 mois",
      "Délai de rétractation 14 jours",
      "Livraison à domicile",
      "Démarches d'importation incluses"
    ]
  };

  addImportedVehicle(kiaSorento, 'standard');
};
