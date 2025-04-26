
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImportedVehicle } from '@/utils/vehicleImportService';

interface VehicleSpecificationsProps {
  vehicle: ImportedVehicle;
  translations: Record<string, any>;
}

const VehicleSpecifications: React.FC<VehicleSpecificationsProps> = ({ vehicle, translations }) => {
  const { translate } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="description">
              <Info className="mr-2 h-4 w-4" />
              {translate("description", translations.description)}
            </TabsTrigger>
            <TabsTrigger value="features">
              <Check className="mr-2 h-4 w-4" />
              {translate("features", translations.features)}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {translate("vehicleDescription", translations.vehicleDescription)}
            </h2>
            {vehicle.description ? (
              <div className="text-gray-700 space-y-4 whitespace-pre-line">
                {vehicle.description}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                {translate("noDescriptionAvailable", translations.noDescriptionAvailable)}
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="features" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {translate("equipmentAndOptions", translations.equipmentAndOptions)}
            </h2>
            {vehicle.features && vehicle.features.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-brand-blue mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                {translate("noFeaturesSpecified", translations.noFeaturesSpecified)}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">
              {translate("characteristics", translations.characteristics)}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">
                  {translate("brand", translations.brand)}
                </div>
                <div className="text-sm font-medium text-right">{vehicle.brand}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">
                  {translate("model", translations.model)}
                </div>
                <div className="text-sm font-medium text-right">{vehicle.model}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">
                  {translate("year", translations.year)}
                </div>
                <div className="text-sm font-medium text-right">{vehicle.year}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">
                  {translate("mileage", translations.mileage)}
                </div>
                <div className="text-sm font-medium text-right">
                  {vehicle.mileage.toLocaleString('fr-FR')} km
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">
                  {translate("fuel", translations.fuel)}
                </div>
                <div className="text-sm font-medium text-right">{vehicle.fuelType}</div>
              </div>
              {vehicle.transmission && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">
                    {translate("transmission", translations.transmission)}
                  </div>
                  <div className="text-sm font-medium text-right">{vehicle.transmission}</div>
                </div>
              )}
              {vehicle.exteriorColor && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">
                    {translate("exteriorColor", translations.exteriorColor)}
                  </div>
                  <div className="text-sm font-medium text-right">{vehicle.exteriorColor}</div>
                </div>
              )}
              {vehicle.interiorColor && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">
                    {translate("interiorColor", translations.interiorColor)}
                  </div>
                  <div className="text-sm font-medium text-right">{vehicle.interiorColor}</div>
                </div>
              )}
              {vehicle.doors && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">
                    {translate("doors", translations.doors)}
                  </div>
                  <div className="text-sm font-medium text-right">{vehicle.doors}</div>
                </div>
              )}
              {vehicle.engine && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">
                    {translate("engine", translations.engine)}
                  </div>
                  <div className="text-sm font-medium text-right">{vehicle.engine}</div>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>{translate("warranty", translations.warranty)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleSpecifications;
