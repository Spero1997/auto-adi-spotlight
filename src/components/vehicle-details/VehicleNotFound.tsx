
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, RefreshCw, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface VehicleNotFoundProps {
  vehicleId?: string;
  onRefresh?: () => void;
  isSearchContext?: boolean;
}

const VehicleNotFound = ({ vehicleId, onRefresh, isSearchContext = true }: VehicleNotFoundProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  const handleAddVehicle = () => {
    navigate('/vehicules/import');
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {isSearchContext ? (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
          <p className="text-gray-600 mb-3">
            Le véhicule que vous recherchez n'existe pas ou a été supprimé.
          </p>
          
          {vehicleId && (
            <p className="text-gray-500 mb-6 text-sm">
              Identifiant recherché : <code className="bg-gray-100 px-1 py-0.5 rounded">{vehicleId}</code>
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Aucun véhicule trouvé</h1>
          <p className="text-gray-600 mb-6">
            Aucun véhicule n'a encore été ajouté à votre catalogue.
            {isAuthenticated && " Commencez par ajouter votre premier véhicule !"}
          </p>
        </>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/vehicules" className="flex-1">
          <Button className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
        
        {onRefresh && isSearchContext && (
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
            Essayer à nouveau
          </Button>
        )}
        
        {isAuthenticated && !isSearchContext && (
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleAddVehicle}
          >
            <Plus className="h-4 w-4" />
            Ajouter un véhicule
          </Button>
        )}
      </div>
    </div>
  );
};

export default VehicleNotFound;
