
import React from 'react';
import { Calendar, Fuel, Car, Cog } from 'lucide-react';

interface VehicleSpecsProps {
  year: number;
  fuelType: string;
  mileage: number;
  transmission?: string;
}

const VehicleSpecs = ({ year, fuelType, mileage, transmission }: VehicleSpecsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Année</p>
          <p className="font-medium">{year}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Fuel className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Carburant</p>
          <p className="font-medium">{fuelType}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Car className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Kilométrage</p>
          <p className="font-medium">{mileage.toLocaleString('fr-FR')} km</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Cog className="h-5 w-5 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Transmission</p>
          <p className="font-medium">{transmission || 'Non spécifié'}</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
