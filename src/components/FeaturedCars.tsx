
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Search, Star } from 'lucide-react';

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
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
    
    // Écouter les événements de mise à jour des véhicules
    const handleVehiclesUpdated = (event: Event) => {
      // Vérifier si l'événement contient des détails sur le type de catalogue
      const customEvent = event as CustomEvent;
      const catalogType = customEvent.detail?.catalogType;
      
      // Si c'est un événement pour le catalogue standard ou pour tous les catalogues,
      // ou si aucun type n'est spécifié, recharger les véhicules
      if (!catalogType || catalogType === 'standard' || catalogType === 'all' || 
          (featuredOnly && catalogType === 'featured')) {
        loadVehicles();
      }
    };
    
    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    window.addEventListener('catalogChanged', handleVehiclesUpdated);
    
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
      window.removeEventListener('catalogChanged', handleVehiclesUpdated);
    };
  }, [featuredOnly]);

  const loadVehicles = () => {
    setLoading(true);
    setError(null);
    try {
      // Charger les véhicules du catalogue approprié
      const catalogType = featuredOnly ? 'featured' : 'standard';
      const importedVehicles = getImportedVehicles(catalogType);
      console.log(`FeaturedCars: ${importedVehicles.length} véhicules chargés depuis le catalogue ${catalogType}`);
      setVehicles(importedVehicles);
    } catch (e) {
      setError("Échec du chargement des véhicules.");
      console.error("Erreur lors du chargement des véhicules:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = () => {
    let filtered = [...vehicles];

    if (searchFilters) {
      if (searchFilters.brand) {
        filtered = filtered.filter(v => v.brand?.toLowerCase().includes(searchFilters.brand!.toLowerCase()));
      }
      if (searchFilters.model) {
        filtered = filtered.filter(v => v.model?.toLowerCase().includes(searchFilters.model!.toLowerCase()));
      }
      if (searchFilters.maxPrice) {
        filtered = filtered.filter(v => v.price <= searchFilters.maxPrice!);
      }
      if (searchFilters.fuelType) {
        filtered = filtered.filter(v => v.fuelType?.toLowerCase().includes(searchFilters.fuelType!.toLowerCase()));
      }
    }

    return filtered;
  };

  const featured = filteredVehicles();

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        {searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)
          ? "Résultats de votre recherche"
          : featuredOnly
            ? "Nos véhicules en vedette"
            : "Tous nos véhicules d'occasion"}
      </h2>

      {loading && <p className="text-center">Chargement des véhicules...</p>}
      {error && <p className="text-center text-red-500">Erreur: {error}</p>}

      {!loading && featured.length === 0 ? (
        <div className="text-center my-12">
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Aucun véhicule trouvé.</p>
          <p className="text-gray-400">
            {featuredOnly 
              ? "Aucun véhicule n'a encore été ajouté au catalogue vedette." 
              : "Aucun véhicule ne correspond à vos critères de recherche."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((vehicle) => (
            <Card key={vehicle.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <img
                  src={vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image'}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    console.error("Erreur de chargement de l'image:", vehicle.image);
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x480?text=No+Image';
                  }}
                />
                {(vehicle.featured || vehicle.catalogType === 'featured') && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
                    <Star className="h-5 w-5 fill-white" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-gray-600">{vehicle.year} • {vehicle.fuelType}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-brand-blue">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                  <Link to={`/vehicules/${vehicle.id}`}>
                    <Button>
                      Voir détails
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!featuredOnly && !searchFilters && (
        <div className="mt-8 text-center">
          <Link to="/vehicules">
            <Button variant="outline" className="mx-auto">
              Voir tous nos véhicules d'occasion
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedCars;
