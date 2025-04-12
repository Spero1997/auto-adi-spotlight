
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const VehicleNotFound = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
      <p className="text-gray-600 mb-6">
        Le véhicule que vous recherchez n'existe pas ou a été supprimé.
      </p>
      <Link to="/vehicules/occasion">
        <Button>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour aux véhicules d'occasion
        </Button>
      </Link>
    </div>
  );
};

export default VehicleNotFound;
