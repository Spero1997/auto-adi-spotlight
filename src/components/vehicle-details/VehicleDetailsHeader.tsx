
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehicleDetailsHeaderProps {
  onRefresh?: () => void;
}

const VehicleDetailsHeader = ({ onRefresh }: VehicleDetailsHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <Link 
        to="/vehicules/occasion" 
        className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Retour aux véhicules d'occasion
      </Link>
      
      {onRefresh && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          className="flex items-center gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Actualiser
        </Button>
      )}
    </div>
  );
};

export default VehicleDetailsHeader;
