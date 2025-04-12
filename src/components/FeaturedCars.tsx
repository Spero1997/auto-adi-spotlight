
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Car, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const { vehicles, loading, error, refresh } = useVehicles(searchFilters, featuredOnly, refreshKey);

  // Événement pour les mises à jour de véhicules
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

  // Fonction pour rediriger vers la page d'ajout de véhicule
  const handleAddVehicle = () => {
    navigate('/vehicules/import');
  };

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
    toast.info("Actualisation du catalogue...");
    setRefreshKey(Date.now());
    refresh();
  };

  // Déterminer si nous sommes dans un contexte de recherche ou d'affichage initial
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
          
          {vehicles.length === 0 && !isSearchContext && (
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
        onAddVehicle={handleAddVehicle}
        key={refreshKey}
      />
    </div>
  );
};

export default FeaturedCars;
