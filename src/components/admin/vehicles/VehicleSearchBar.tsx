
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

interface VehicleSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddNewVehicle: () => void;
}

const VehicleSearchBar: React.FC<VehicleSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onAddNewVehicle,
}) => {
  return (
    <div className="flex gap-4 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Button onClick={onAddNewVehicle}>
        <Plus className="mr-2 h-4 w-4" />
        Ajouter un véhicule
      </Button>
    </div>
  );
};

export default VehicleSearchBar;
