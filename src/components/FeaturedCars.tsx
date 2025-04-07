
import { useSearchParams } from 'react-router-dom';
import { Car } from 'lucide-react';
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
  const { vehicles, loading, error } = useVehicles(searchFilters, featuredOnly);

  // Déterminer le titre approprié en fonction des filtres et du type de catalogue
  const getTitle = () => {
    if (searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)) {
      return "Résultats de votre recherche";
    }
    return featuredOnly ? "Nos véhicules vedettes" : "Tous nos véhicules d'occasion";
  };

  // Message à afficher quand aucun véhicule n'est trouvé
  const getEmptyMessage = () => {
    return featuredOnly 
      ? "Aucun véhicule n'a encore été ajouté au catalogue vedette." 
      : "Aucun véhicule ne correspond à vos critères de recherche.";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        {getTitle()}
      </h2>

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
