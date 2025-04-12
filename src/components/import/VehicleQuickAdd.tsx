
import { ImportedVehicle, addVehicle } from '@/utils/vehicleImportService';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type VehicleAddProps = {
  triggerUpdate: () => void;
};

const VehicleQuickAdd = ({ triggerUpdate }: VehicleAddProps) => {
  const navigate = useNavigate();
  
  const addHyundaiSantaFe = () => {
    try {
      const hyundaiSantaFe: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-hyundai-santa-fe`,
        brand: 'Hyundai',
        model: 'Santa Fe Sport',
        year: 2013,
        mileage: 79000,
        price: 4500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Vert',
        interiorColor: 'Noir',
        image: '/lovable-uploads/74794e1d-cef3-4179-9428-d3359d588743.png',
        fbLink: 'https://www.facebook.com/share/p/1GsrVVncej/?mibextid=wwXIfr',
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
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage'
        ],
        catalogType: 'standard'
      };
      
      addVehicle(hyundaiSantaFe, 'standard');
      console.log('Hyundai Santa Fe Sport ajouté avec succès au catalogue!');
      toast.success('Hyundai Santa Fe Sport ajouté avec succès!');
      triggerUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Hyundai Santa Fe Sport:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addToyotaCamrySE = () => {
    try {
      const toyotaCamrySE: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-toyota-camry-se`,
        brand: 'Toyota',
        model: 'Camry SE',
        year: 2022,
        mileage: 28000,
        price: 15500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Rouge',
        interiorColor: 'Noir',
        image: '/lovable-uploads/86cf6e1b-5f63-424c-8a21-168c2f127e59.png',
        fbLink: 'https://www.facebook.com/share/p/1EqQLrWetM/?mibextid=wwXIfr',
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
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage',
          'Système de navigation',
          'Caméra de recul'
        ],
        catalogType: 'standard'
      };
      
      addVehicle(toyotaCamrySE, 'standard');
      console.log('Toyota Camry SE ajouté avec succès au catalogue!');
      toast.success('Toyota Camry SE ajouté avec succès!');
      triggerUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Toyota Camry SE:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addVolvoV40 = () => {
    try {
      const volvoV40: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-volvo-v40-d2-rdesign`,
        brand: 'Volvo',
        model: 'V40 D2 R-Design',
        year: 2014,
        mileage: 116000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Blanc',
        interiorColor: 'Noir',
        image: '/lovable-uploads/27eeacb3-e4bf-46b9-babd-527e06b998e1.png',
        fbLink: 'https://www.facebook.com/share/p/1Hhh6zzGhy/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'R-Design',
          'Automatique',
          '115 ch'
        ],
        engine: 'D2 115ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(volvoV40, 'standard');
      console.log('Volvo V40 D2 R-Design ajoutée avec succès au catalogue!');
      toast.success('Volvo V40 D2 R-Design ajoutée avec succès!');
      
      triggerUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Volvo V40 D2 R-Design:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addBMWX7 = () => {
    try {
      const bmwX7: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-bmw-x7-xdrive-40d-msport-pro`,
        brand: 'BMW',
        model: 'X7 xDrive 40d M Sport Pro',
        year: 2022,
        mileage: 43000,
        price: 27000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Noir',
        interiorColor: 'Noir',
        image: '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png',
        fbLink: '',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'M Sport Pro',
          'Automatique',
          '259 ch'
        ],
        engine: 'xDrive 40d 259ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(bmwX7, 'standard');
      console.log('BMW X7 xDrive 40d M Sport Pro ajoutée avec succès au catalogue!');
      toast.success('BMW X7 xDrive 40d M Sport Pro ajoutée avec succès!');
      
      triggerUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la BMW X7 xDrive 40d M Sport Pro:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addAudiQ2 = () => {
    try {
      const audiQ2: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-audi-q2-ultra-sport`,
        brand: 'Audi',
        model: 'Q2 Ultra Sport Sièges Crochet LED',
        year: 2018,
        mileage: 98000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Bleu',
        interiorColor: 'Noir',
        image: '/lovable-uploads/efaee038-1389-45b1-9a8d-970b6f3c5832.png',
        fbLink: '',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'Sport Sièges',
          'Automatique',
          '116 ch'
        ],
        engine: 'Ultra 116ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(audiQ2, 'standard');
      console.log('Audi Q2 Ultra Sport ajoutée avec succès au catalogue!');
      toast.success('Audi Q2 Ultra Sport ajoutée avec succès!');
      
      triggerUpdate();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'Audi Q2 Ultra Sport:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
      <Button 
        onClick={addVolvoV40}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Ajouter la Volvo V40 D2 R-Design au catalogue
      </Button>
      
      <Button 
        onClick={addHyundaiSantaFe}
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        Ajouter le Hyundai Santa Fe Sport au catalogue
      </Button>
      
      <Button 
        onClick={addToyotaCamrySE}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        Ajouter la Toyota Camry SE au catalogue
      </Button>

      <Button 
        onClick={addBMWX7}
        className="bg-gray-800 hover:bg-gray-900 text-white"
      >
        Ajouter la BMW X7 xDrive 40d M Sport Pro
      </Button>
      
      <Button 
        onClick={addAudiQ2}
        className="bg-blue-800 hover:bg-blue-900 text-white"
      >
        Ajouter l'Audi Q2 Ultra Sport
      </Button>
    </div>
  );
};

export default VehicleQuickAdd;
