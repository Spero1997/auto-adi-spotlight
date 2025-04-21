
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Calendar, Fuel, Car, Cog } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { ImportedVehicle } from '@/utils/vehicleImportService';

interface VehicleInformationProps {
  vehicle: ImportedVehicle;
  onBuyClick: () => void;
  translations: Record<string, string>;
}

const VehicleInformation: React.FC<VehicleInformationProps> = ({ vehicle, onBuyClick, translations }) => {
  const { translate } = useLanguage();
  const { toast: shadowToast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h1>
        <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString('fr-FR')} km • {vehicle.fuelType}</p>
      </div>
      
      <div className="text-3xl font-bold text-brand-blue">
        {vehicle.price.toLocaleString('fr-FR')} €
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">{translate("year", translations.year)}</p>
            <p className="font-medium">{vehicle.year}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Fuel className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">{translate("fuel", translations.fuel)}</p>
            <p className="font-medium">{vehicle.fuelType}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">{translate("mileage", translations.mileage)}</p>
            <p className="font-medium">{vehicle.mileage.toLocaleString('fr-FR')} km</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cog className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">{translate("transmission", translations.transmission)}</p>
            <p className="font-medium">{vehicle.transmission || translate("notSpecified", translations.notSpecified)}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Button 
          variant="default" 
          className="w-full md:w-auto flex-1 bg-brand-blue hover:bg-brand-darkBlue"
          onClick={onBuyClick}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {translate("buyVehicle", translations.buyVehicle)}
        </Button>
        <Button 
          variant="outline" 
          className="w-full md:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
          onClick={() => {
            navigator.share({
              title: `${vehicle.brand} ${vehicle.model} - AutoAdi`,
              text: `Découvrez cette ${vehicle.brand} ${vehicle.model} d'occasion chez AutoAdi`,
              url: window.location.href
            }).catch(() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success(translate("linkCopied", translations.linkCopied));
              shadowToast({
                title: translate("linkCopiedTitle", translations.linkCopiedTitle),
                description: translate("linkCopiedDesc", translations.linkCopiedDesc),
              });
            });
          }}
        >
          {translate("share", translations.share)}
        </Button>
      </div>
    </div>
  );
};

export default VehicleInformation;
