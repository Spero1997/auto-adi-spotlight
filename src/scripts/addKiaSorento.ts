
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addKiaSorento = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const kiaSorentoExists = standardVehicles.find(
      v => v.brand === "Kia" && 
          v.model === "Sorento 1.6 T-GDI Hybride rechargeable" && 
          v.year === 2021
    );
    
    if (kiaSorentoExists) {
      console.log("Kia Sorento déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const kiaSorento: ImportedVehicle = {
      id: `vehicle-standard-kia-sorento-${Date.now()}`,
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
      description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois

wa.me/393761753341`,
      features: [
        // Équipements de sécurité
        "Airbags (frontaux, latéraux, rideaux)",
        "Ceintures de sécurité (avec prétensionneurs)",
        "Système ABS (Anti-blocage des freins)",
        "ESP (Correcteur électronique de trajectoire)",
        "Aide au freinage d'urgence",
        "Caméra de recul et capteurs de stationnement",
        "Aide au maintien de voie",
        "Détecteur d'angle mort",
        "Régulateur et limiteur de vitesse",
        // Équipements de confort
        "Climatisation automatique",
        "Sièges chauffants",
        "Volant chauffant",
        "Rétroviseurs électriques et dégivrants",
        "Vitres électriques",
        "Toit panoramique",
        "Système Keyless (démarrage sans clé)",
        // Équipements multimédias et connectivité
        "Écran tactile avec GPS intégré",
        "Apple CarPlay & Android Auto",
        "Système audio haut de gamme",
        "Bluetooth et USB",
        "Wi-Fi embarqué",
        "Recharge par induction pour smartphone"
      ],
      images: [
        "/lovable-uploads/e514ebbb-5f65-4dc7-8030-c5dfea8c8091.png",
        "/lovable-uploads/40401bdc-68ba-4d81-8c38-c702e40887cb.png",
        "/lovable-uploads/daadb09a-4fb1-4cea-b225-eef696283ba1.png",
        "/lovable-uploads/5924cff4-b62d-4f75-902a-f8c2abc078fd.png"
      ],
      image: "/lovable-uploads/e514ebbb-5f65-4dc7-8030-c5dfea8c8091.png",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(kiaSorento, 'standard');
    
    if (success) {
      console.log("Kia Sorento ajoutée au catalogue standard avec succès");
      toast.success("Kia Sorento ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de la Kia Sorento au catalogue standard");
      toast.error("Échec de l'ajout de la Kia Sorento au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la Kia Sorento:", error);
    toast.error("Erreur lors de l'ajout de la Kia Sorento");
  }
};
