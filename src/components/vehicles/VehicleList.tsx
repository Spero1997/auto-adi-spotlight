
import React from 'react';
import { Search, Plus } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EmptyState from '../EmptyState';
import { useAuth } from '@/hooks/use-auth';

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
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
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
          <EmptyState 
            title="Aucun véhicule trouvé"
            description={emptyMessage}
            icon={<Search className="h-12 w-12 text-gray-400" />}
          />
        </div>
      );
    } else {
      // Affiche un message pour ajouter un véhicule si le catalogue est vide (seulement pour les utilisateurs authentifiés)
      return (
        <div className="text-center my-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Commencez votre catalogue</h1>
            <p className="text-gray-600 mb-6">
              Aucun véhicule n'a encore été ajouté à votre catalogue.
              {isAuthenticated && " Commencez par ajouter votre premier véhicule !"}
            </p>
            {isAuthenticated && onAddVehicle ? (
              <Button 
                onClick={onAddVehicle}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter un véhicule
              </Button>
            ) : isAuthenticated ? (
              <Link to="/vehicules/import" className="w-full">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un véhicule
                </Button>
              </Link>
            ) : null}
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
