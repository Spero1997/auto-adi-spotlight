
import React from 'react';
import { Search, Plus } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import VehicleNotFound from '../vehicle-details/VehicleNotFound';
import { Button } from '@/components/ui/button';

interface VehicleListProps {
  vehicles: ImportedVehicle[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
  isSearchContext?: boolean;
  onAddVehicle?: () => void;
}

const VehicleList = ({ 
  vehicles, 
  loading, 
  error, 
  emptyMessage = "Aucun véhicule ne correspond à vos critères de recherche.", 
  isSearchContext = true,
  onAddVehicle
}: VehicleListProps) => {
  if (loading) {
    return <p className="text-center">Chargement des véhicules...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  if (vehicles.length === 0) {
    if (isSearchContext) {
      return (
        <div className="text-center my-12">
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Aucun véhicule trouvé.</p>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      );
    } else {
      // Affiche un bouton pour ajouter un véhicule à la place du composant VehicleNotFound
      return (
        <div className="text-center my-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Commencez votre catalogue</h1>
            <p className="text-gray-600 mb-6">
              Aucun véhicule n'a encore été ajouté à votre catalogue. Commencez par ajouter votre premier véhicule !
            </p>
            <Button 
              onClick={onAddVehicle}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>
      );
    }
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
