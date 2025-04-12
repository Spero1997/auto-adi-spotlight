
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ImportedVehicle, addImportedVehicle } from "@/utils/vehicleImportService";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const VehiclePresetList = () => {
  const navigate = useNavigate();
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');

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
        image: '/lovable-uploads/3f3ae6c7-07fd-46fe-a81c-1a4dc615db1c.png',
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
      
      const success = addImportedVehicle(toyotaCamrySE, 'standard');
      
      if (success) {
        console.log('Toyota Camry SE 2022 ajoutée avec succès au catalogue standard!');
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
        toast.success('Toyota Camry SE 2022 ajoutée avec succès');

        setTimeout(() => {
          navigate('/vehicules');
        }, 2000);
      } else {
        console.error("Une erreur s'est produite lors de l'ajout de la Toyota Camry SE");
        toast.error("Une erreur s'est produite lors de l'ajout de la Toyota Camry SE");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Toyota Camry SE:', error);
      toast.error("Erreur lors de l'ajout de la Toyota Camry SE");
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
      
      const success = addImportedVehicle(volvoV40, 'standard');
      
      if (success) {
        console.log('Volvo V40 D2 R-Design ajoutée avec succès au catalogue standard!');
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
        toast.success('Volvo V40 D2 R-Design ajoutée avec succès');

        setTimeout(() => {
          navigate('/vehicules');
        }, 2000);
      } else {
        console.error("Une erreur s'est produite lors de l'ajout de la Volvo V40");
        toast.error("Une erreur s'est produite lors de l'ajout de la Volvo V40");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Volvo V40:', error);
      toast.error("Erreur lors de l'ajout de la Volvo V40");
    }
  };

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
      
      const success = addImportedVehicle(hyundaiSantaFe, 'standard');
      
      if (success) {
        console.log('Hyundai Santa Fe Sport ajouté avec succès au catalogue standard!');
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
        toast.success('Hyundai Santa Fe Sport ajouté avec succès');

        setTimeout(() => {
          navigate('/vehicules');
        }, 2000);
      } else {
        console.error("Une erreur s'est produite lors de l'ajout du Hyundai Santa Fe");
        toast.error("Une erreur s'est produite lors de l'ajout du Hyundai Santa Fe");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Hyundai Santa Fe Sport:', error);
      toast.error("Erreur lors de l'ajout du Hyundai Santa Fe Sport");
    }
  };

  const addBMWX7 = () => {
    try {
      const bmwX7: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-bmw-x7-xdrive-40d-m-sport-pro`,
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
      
      const success = addImportedVehicle(bmwX7, 'standard');
      
      if (success) {
        console.log('BMW X7 xDrive 40d M Sport Pro ajoutée avec succès au catalogue standard!');
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
        toast.success('BMW X7 xDrive 40d M Sport Pro ajoutée avec succès');

        setTimeout(() => {
          navigate('/vehicules');
        }, 2000);
      } else {
        console.error("Une erreur s'est produite lors de l'ajout de la BMW X7");
        toast.error("Une erreur s'est produite lors de l'ajout de la BMW X7");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la BMW X7:', error);
      toast.error("Erreur lors de l'ajout de la BMW X7");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="border rounded-lg p-4 space-y-3">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <img 
            src="/lovable-uploads/27eeacb3-e4bf-46b9-babd-527e06b998e1.png" 
            alt="Volvo V40 D2 R-Design 2014" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold">Volvo V40 D2 R-Design</h3>
        <div className="text-sm space-y-1">
          <p>2014 • Diesel • 116 000 km</p>
          <p className="font-bold">4 000 €</p>
        </div>
        <Button onClick={addVolvoV40} className="w-full">
          Ajouter au catalogue standard
        </Button>
      </div>
      
      <div className="border rounded-lg p-4 space-y-3">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <img 
            src="/lovable-uploads/3f3ae6c7-07fd-46fe-a81c-1a4dc615db1c.png" 
            alt="Toyota Camry SE 2022" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold">Toyota Camry SE</h3>
        <div className="text-sm space-y-1">
          <p>2022 • Essence • 28,000 km</p>
          <p className="font-bold">15,500 €</p>
        </div>
        <Button onClick={addToyotaCamrySE} className="w-full">
          Ajouter au catalogue standard
        </Button>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <img 
            src="/lovable-uploads/74794e1d-cef3-4179-9428-d3359d588743.png" 
            alt="Hyundai Santa Fe Sport 2013" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold">Hyundai Santa Fe Sport</h3>
        <div className="text-sm space-y-1">
          <p>2013 • Essence • 79,000 km</p>
          <p className="font-bold">4,500 €</p>
        </div>
        <Button onClick={addHyundaiSantaFe} className="w-full">
          Ajouter au catalogue standard
        </Button>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <div className="aspect-video relative rounded-md overflow-hidden">
          <img 
            src="/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png" 
            alt="BMW X7 xDrive 40d M Sport Pro 2022" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold">BMW X7 xDrive 40d M Sport Pro</h3>
        <div className="text-sm space-y-1">
          <p>2022 • Diesel • 43,000 km</p>
          <p className="font-bold">27,000 €</p>
        </div>
        <Button onClick={addBMWX7} className="w-full">
          Ajouter au catalogue standard
        </Button>
      </div>
    </div>
  );
};

export default VehiclePresetList;
