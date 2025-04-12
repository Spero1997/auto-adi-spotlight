
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Car, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VehicleList from './vehicles/VehicleList';
import { useVehicles } from './vehicles/useVehicles';
import { useAuth } from '@/hooks/use-auth';

interface SearchFilters {
  brand?: string;
  model?: string;
  maxPrice?: number;
  fuelType?: string;
}

const FeaturedCars = ({ searchFilters, featuredOnly = false }: { 
  searchFilters?: SearchFilters;
  featuredOnly?: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const { vehicles, loading, error, refresh } = useVehicles(searchFilters, featuredOnly, refreshKey);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleVehiclesUpdated = () => {
      console.log("FeaturedCars: Événement vehiclesUpdated détecté");
      setRefreshKey(Date.now());
      refresh();
    };

    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
    };
  }, [refresh]);

  const handleAddVehicle = () => {
    navigate('/vehicules/import');
  };

  const getTitle = () => {
    if (searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)) {
      return "Résultats de votre recherche";
    }
    return featuredOnly ? "Nos véhicules vedettes" : "Nos véhicules d'occasion";
  };

  const getEmptyMessage = () => {
    if (isSearchContext) {
      return "Aucun véhicule ne correspond à vos critères de recherche.";
    }
    return featuredOnly 
      ? "Aucun véhicule n'a encore été ajouté au catalogue vedette." 
      : "Aucun véhicule n'a encore été ajouté au catalogue.";
  };

  const handleRefresh = () => {
    toast.info("Actualisation du catalogue...");
    setRefreshKey(Date.now());
    refresh();
  };

  const isSearchContext = searchParams.size > 0 || !!searchFilters;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          {getTitle()}
        </h2>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          
          {isAuthenticated && (
            <Button size="sm" onClick={handleAddVehicle} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un véhicule
            </Button>
          )}
        </div>
      </div>

      <VehicleList 
        vehicles={vehicles}
        loading={loading}
        error={error}
        emptyMessage={getEmptyMessage()}
        isSearchContext={isSearchContext}
        onAddVehicle={isAuthenticated ? handleAddVehicle : undefined}
        key={refreshKey}
      />
    </div>
  );
};

export default FeaturedCars;
