
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const VehicleDetailsHeader = () => {
  return (
    <div className="mb-6">
      <Link 
        to="/vehicules/occasion" 
        className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Retour aux véhicules d'occasion
      </Link>
    </div>
  );
};

export default VehicleDetailsHeader;
