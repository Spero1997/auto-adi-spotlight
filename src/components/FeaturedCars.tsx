
import { useSearchParams } from 'react-router-dom';
import { Car, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleList from './vehicles/VehicleList';
import { useVehicles } from './vehicles/useVehicles';

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
  const { vehicles, loading, error, refresh } = useVehicles(searchFilters, featuredOnly);

  // Déterminer le titre approprié en fonction des filtres et du type de catalogue
  const getTitle = () => {
    if (searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)) {
      return "Résultats de votre recherche";
    }
    return featuredOnly ? "Nos véhicules vedettes" : "Nos véhicules d'occasion";
  };

  // Message à afficher quand aucun véhicule n'est trouvé
  const getEmptyMessage = () => {
    return featuredOnly 
      ? "Aucun véhicule n'a encore été ajouté au catalogue vedette." 
      : "Aucun véhicule ne correspond à vos critères de recherche.";
  };

  // Fonction pour forcer le rechargement des véhicules
  const handleRefresh = () => {
    refresh();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          {getTitle()}
        </h2>
        
        <Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </Button>
      </div>

      <VehicleList 
        vehicles={vehicles}
        loading={loading}
        error={error}
        emptyMessage={getEmptyMessage()}
      />
    </div>
  );
};

export default FeaturedCars;
