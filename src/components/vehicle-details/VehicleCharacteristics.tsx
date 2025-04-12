
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { ImportedVehicle } from '@/utils/types/vehicle';

interface VehicleCharacteristicsProps {
  vehicle: ImportedVehicle;
}

const VehicleCharacteristics = ({ vehicle }: VehicleCharacteristicsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Marque</div>
            <div className="text-sm font-medium text-right">{vehicle.brand}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Modèle</div>
            <div className="text-sm font-medium text-right">{vehicle.model}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Année</div>
            <div className="text-sm font-medium text-right">{vehicle.year}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Kilométrage</div>
            <div className="text-sm font-medium text-right">{vehicle.mileage.toLocaleString('fr-FR')} km</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Carburant</div>
            <div className="text-sm font-medium text-right">{vehicle.fuelType}</div>
          </div>
          {vehicle.transmission && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Transmission</div>
              <div className="text-sm font-medium text-right">{vehicle.transmission}</div>
            </div>
          )}
          {vehicle.exteriorColor && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Couleur extérieure</div>
              <div className="text-sm font-medium text-right">{vehicle.exteriorColor}</div>
            </div>
          )}
          {vehicle.interiorColor && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Couleur intérieure</div>
              <div className="text-sm font-medium text-right">{vehicle.interiorColor}</div>
            </div>
          )}
          {vehicle.doors && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Portes</div>
              <div className="text-sm font-medium text-right">{vehicle.doors}</div>
            </div>
          )}
          {vehicle.engine && (
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Moteur</div>
              <div className="text-sm font-medium text-right">{vehicle.engine}</div>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Garantie 12 mois minimum</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCharacteristics;
