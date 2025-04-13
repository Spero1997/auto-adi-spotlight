
import { getImportedVehicles, saveImportedVehicles, addImportedVehicle } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

export const updateAudiQ2 = () => {
  try {
    // Informations de l'Audi Q2 basées sur les données fournies
    const audiQ2Data = {
      id: 'audi-q2-ultra-sport',
      brand: 'Audi',
      model: 'Q2 ULTRA SPORT SIÈGES CROCHET LED ACC DAB',
      year: 2018,
      mileage: 98149,
      fuelType: 'Essence',
      price: 5000,
      image: '/lovable-uploads/46b47302-22df-4ef8-a230-63621a783e09.png',
      transmission: 'Automatique',
      description: `NOUVEAU EU!
Année: 04/2018
Kilométrage: 98 149 km (Certifié)
Puissance: 116 CH
Carburant: Essence
Boîte de Vitesse: Automatique

Modalités de paiement:
- Acompte : 20 % à la commande
- Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
- Offre spéciale : -10 % de réduction pour tout achat comptant à la commande

Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison a votre domicile. 
Délais de livraison 5 jours / Délai de rétractation 14 JOURS (Satisfait ou remboursé)
Garantie 24 mois`,
      engine: '116 CH',
      features: [
        'SIÈGES SPORT',
        'CROCHET',
        'LED',
        'ACC',
        'DAB'
      ]
    };

    // Rechercher si l'Audi Q2 existe déjà dans le catalogue standard
    const standardVehicles = getImportedVehicles('standard');
    const audiQ2IndexInStandard = standardVehicles.findIndex(
      v => v.brand === 'Audi' && 
          (v.model?.includes('Q2') || v.model?.includes('ULTRA SPORT'))
    );

    // Rechercher si l'Audi Q2 existe déjà dans le catalogue vedette
    const featuredVehicles = getImportedVehicles('featured');
    const audiQ2IndexInFeatured = featuredVehicles.findIndex(
      v => v.brand === 'Audi' && 
          (v.model?.includes('Q2') || v.model?.includes('ULTRA SPORT'))
    );

    // Mise à jour dans le catalogue standard
    if (audiQ2IndexInStandard !== -1) {
      console.log("Audi Q2 trouvée dans le catalogue standard, mise à jour...");
      standardVehicles[audiQ2IndexInStandard] = {
        ...standardVehicles[audiQ2IndexInStandard],
        ...audiQ2Data
      };
      saveImportedVehicles(standardVehicles, 'standard');
      toast.success("Audi Q2 mise à jour dans le catalogue standard");
    } else {
      console.log("Audi Q2 non trouvée dans le catalogue standard, ajout...");
      addImportedVehicle(audiQ2Data, 'standard');
    }

    // Mise à jour dans le catalogue vedette
    if (audiQ2IndexInFeatured !== -1) {
      console.log("Audi Q2 trouvée dans le catalogue vedette, mise à jour...");
      featuredVehicles[audiQ2IndexInFeatured] = {
        ...featuredVehicles[audiQ2IndexInFeatured],
        ...audiQ2Data,
        featured: true
      };
      saveImportedVehicles(featuredVehicles, 'featured');
      toast.success("Audi Q2 mise à jour dans le catalogue vedette");
    } else {
      console.log("Audi Q2 non trouvée dans le catalogue vedette, ajout...");
      addImportedVehicle({...audiQ2Data, featured: true}, 'featured');
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'Audi Q2:", error);
    toast.error("Erreur lors de la mise à jour de l'Audi Q2");
    return false;
  }
};
