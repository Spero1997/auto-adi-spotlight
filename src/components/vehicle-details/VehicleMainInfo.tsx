import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { ImportedVehicle } from '@/utils/types/vehicle';
import UpdateVehicleImage from './UpdateVehicleImage';

interface VehicleMainInfoProps {
  vehicle: ImportedVehicle;
  onBuyClick: () => void;
  updateImage?: (newImageUrl: string) => void;
}

const VehicleMainInfo = ({ vehicle, onBuyClick, updateImage }: VehicleMainInfoProps) => {
  const { toast: shadowToast } = useToast();
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.brand} ${vehicle.model} - AutoAdi`,
        text: `Découvrez cette ${vehicle.brand} ${vehicle.model} d'occasion chez AutoAdi`,
        url: window.location.href
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
    shadowToast({
      title: "Lien copié",
      description: "L'URL a été copiée dans votre presse-papier",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h1>
        <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString('fr-FR')} km • {vehicle.fuelType}</p>
      </div>
      
      <div className="text-3xl font-bold text-brand-blue">
        {vehicle.price.toLocaleString('fr-FR')} €
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Button 
          variant="default" 
          className="w-full md:w-auto flex-1 bg-brand-blue hover:bg-brand-darkBlue"
          onClick={onBuyClick}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Acheter ce véhicule
        </Button>
        <Button 
          variant="outline" 
          className="w-full md:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
          onClick={handleShareClick}
        >
          Partager
        </Button>
      </div>
      
      {/* Afficher le bouton d'update pour tous les véhicules si updateImage est disponible */}
      {updateImage && (
        <UpdateVehicleImage 
          vehicleId={vehicle.id} 
          updateImage={updateImage} 
        />
      )}
    </div>
  );
};

export default VehicleMainInfo;
