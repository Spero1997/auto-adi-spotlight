
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, RefreshCw } from 'lucide-react';

interface VehicleNotFoundProps {
  vehicleId?: string;
  onRefresh?: () => void;
}

const VehicleNotFound = ({ vehicleId, onRefresh }: VehicleNotFoundProps) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
      <p className="text-gray-600 mb-3">
        Le véhicule que vous recherchez n'existe pas ou a été supprimé.
      </p>
      
      {vehicleId && (
        <p className="text-gray-500 mb-6 text-sm">
          Identifiant recherché : <code className="bg-gray-100 px-1 py-0.5 rounded">{vehicleId}</code>
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/vehicules/occasion" className="flex-1">
          <Button className="w-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux véhicules
          </Button>
        </Link>
        
        {onRefresh && (
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
            Essayer à nouveau
          </Button>
        )}
      </div>
    </div>
  );
};

export default VehicleNotFound;
