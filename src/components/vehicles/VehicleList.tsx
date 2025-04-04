
import React from 'react';
import { Search } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { ImportedVehicle } from '@/utils/vehicleImportService';

interface VehicleListProps {
  vehicles: ImportedVehicle[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
}

const VehicleList = ({ vehicles, loading, error, emptyMessage = "Aucun véhicule ne correspond à vos critères de recherche." }: VehicleListProps) => {
  if (loading) {
    return <p className="text-center">Chargement des véhicules...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center my-12">
        <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg mb-2">Aucun véhicule trouvé.</p>
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;
