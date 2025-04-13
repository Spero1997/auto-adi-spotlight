
import { addImportedVehicle, getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const addAudiQ2 = () => {
  try {
    // Vérifier si le véhicule existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    
    const audiQ2Exists = standardVehicles.find(
      v => v.brand === "Audi" && 
          v.model === "Q2 ULTRA SPORT SIÈGES CROCHET LED ACC DAB" && 
          v.year === 2018
    );
    
    if (audiQ2Exists) {
      console.log("Audi Q2 déjà présente dans le catalogue standard");
      return;
    }
    
    // Créer le véhicule
    const audiQ2: ImportedVehicle = {
      id: `vehicle-standard-audi-q2-${Date.now()}`,
      brand: "Audi",
      model: "Q2 ULTRA SPORT SIÈGES CROCHET LED ACC DAB",
      year: 2018,
      mileage: 98149,
      price: 5000,
      fuelType: "Essence",
      transmission: "Automatique",
      exteriorColor: "Bleu",
      engine: "116 CH",
      description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
      features: [
        // Équipements de sécurité
        "Airbags (frontaux, latéraux, rideaux)",
        "Système ABS (Anti-blocage des freins)",
        "ESP (Correcteur électronique de trajectoire)",
        "Aide au freinage d'urgence",
        "Caméra de recul et capteurs de stationnement",
        "Régulateur et limiteur de vitesse adaptatif",
        // Équipements de confort
        "Climatisation automatique",
        "Sièges sport",
        "Rétroviseurs électriques et dégivrants",
        "Vitres électriques",
        "Système Keyless (démarrage sans clé)",
        // Équipements multimédias et connectivité
        "Écran tactile avec GPS intégré",
        "Apple CarPlay & Android Auto",
        "DAB (Radio numérique)",
        "Bluetooth et USB",
        // Équipements spécifiques
        "Phares LED",
        "Crochet d'attelage",
        "Jantes en alliage"
      ],
      images: [
        "/lovable-uploads/eb192815-1b5d-4a95-9be6-9efd9f2cd9ba.png"
      ],
      image: "/lovable-uploads/eb192815-1b5d-4a95-9be6-9efd9f2cd9ba.png",
      catalogType: 'standard'
    };
    
    // Ajouter le véhicule au catalogue standard
    const success = addImportedVehicle(audiQ2, 'standard');
    
    if (success) {
      console.log("Audi Q2 ajoutée au catalogue standard avec succès");
      toast.success("Audi Q2 ajoutée au catalogue standard avec succès");
    } else {
      console.error("Échec de l'ajout de l'Audi Q2 au catalogue standard");
      toast.error("Échec de l'ajout de l'Audi Q2 au catalogue standard");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'Audi Q2:", error);
    toast.error("Erreur lors de l'ajout de l'Audi Q2");
  }
};
