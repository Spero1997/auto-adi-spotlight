import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Search } from 'lucide-react';

interface SearchFilters {
  brand?: string;
  model?: string;
  maxPrice?: number;
  fuelType?: string;
}

const FeaturedCars = ({ searchFilters }: { searchFilters?: SearchFilters }) => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    setLoading(true);
    setError(null);
    try {
      const importedVehicles = getImportedVehicles();
      setVehicles(importedVehicles);
    } catch (e) {
      setError("Failed to load vehicles.");
      console.error("Error loading vehicles:", e);
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
          : "Nos véhicules d'occasion en vedette"}
      </h2>

      {loading && <p className="text-center">Chargement des véhicules...</p>}
      {error && <p className="text-center text-red-500">Erreur: {error}</p>}

      {!loading && !error && featured.length === 0 && (
        <div className="text-center">
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <p className="text-gray-500">Aucun véhicule ne correspond à vos critères de recherche.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((vehicle) => (
          <Card key={vehicle.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image'}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x480?text=No+Image';
                }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{vehicle.brand} {vehicle.model}</h3>
              <p className="text-gray-600">{vehicle.year} • {vehicle.fuelType}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-brand-blue">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                <Link to={`/vehicule/${vehicle.id}`}>
                  <Button>
                    Voir détails
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
