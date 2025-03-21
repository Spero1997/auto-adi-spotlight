
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Search, Star, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  useEffect(() => {
    loadVehicles();
    
    const handleVehiclesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const catalogType = customEvent.detail?.catalogType;
      
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
      let importedVehicles: ImportedVehicle[] = [];
      
      if (featuredOnly) {
        // Sur la page d'accueil (featuredOnly=true), on charge seulement les véhicules en vedette
        importedVehicles = getImportedVehicles('featured');
        console.log(`FeaturedCars: ${importedVehicles.length} véhicules chargés depuis le catalogue featured`);
      } else {
        // Sur la page des véhicules d'occasion, on charge TOUS les véhicules (standard et featured)
        const standardVehicles = getImportedVehicles('standard');
        const featuredVehicles = getImportedVehicles('featured');
        
        // Combiner les deux catalogues en évitant les doublons par ID (car les ID sont uniques entre catalogues)
        const allVehiclesMap = new Map<string, ImportedVehicle>();
        
        // Ajouter d'abord les véhicules standard
        standardVehicles.forEach(vehicle => {
          allVehiclesMap.set(vehicle.id, vehicle);
        });
        
        // Puis ajouter les véhicules featured (si un véhicule existe dans les deux catalogues, prioriser le featured)
        featuredVehicles.forEach(vehicle => {
          // Marquer comme featured même si provenant du catalogue featured
          const vehicleWithFeatured = { ...vehicle, featured: true };
          allVehiclesMap.set(vehicle.id, vehicleWithFeatured);
        });
        
        importedVehicles = Array.from(allVehiclesMap.values());
        console.log(`FeaturedCars: ${standardVehicles.length} véhicules standard + ${featuredVehicles.length} véhicules featured = ${importedVehicles.length} total`);
      }
      
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

  // Fonction améliorée pour ouvrir directement la publication Facebook sur mobile et desktop
  const openFacebookLink = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    if (isMobile) {
      // Sur mobile, essayons d'ouvrir directement avec l'app Facebook si possible
      try {
        // Utiliser un format d'URL qui fonctionne mieux avec l'app Facebook
        // Format: fb://facewebmodal/f?href=URL_ENCODED
        const encodedUrl = encodeURIComponent(url);
        
        // Essayer d'ouvrir dans l'app Facebook
        window.location.href = `fb://facewebmodal/f?href=${encodedUrl}`;
        
        // Si l'app FB n'est pas installée, on ouvre dans le navigateur après un court délai
        setTimeout(() => {
          // Vérifier si on est toujours sur la même page (ce qui signifie que l'app FB n'a pas été ouverte)
          window.open(url, '_blank');
        }, 500); // Délai augmenté pour donner plus de temps à l'app FB pour s'ouvrir
      } catch (e) {
        console.error("Erreur lors de l'ouverture du lien Facebook:", e);
        // Fallback en cas d'erreur - ouvrir dans le navigateur
        window.open(url, '_blank');
      }
    } else {
      // Sur desktop, ouvrir dans un nouvel onglet normalement
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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
        <>
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
                  
                  {/* Bouton Facebook amélioré avec nouvelle logique pour une meilleure compatibilité mobile */}
                  {vehicle.fbLink && (
                    <button 
                      onClick={(e) => openFacebookLink(vehicle.fbLink || '', e)}
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                      aria-label="Voir sur Facebook"
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Voir sur Facebook
                    </button>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-blue">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                    <Link to={`/vehicule/${vehicle.id}`} data-testid={`vehicle-link-${vehicle.id}`}>
                      <Button>
                        Voir détails
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Bouton pour voir tous les véhicules, visible uniquement sur la page d'accueil avec featuredOnly=true */}
          {featuredOnly && (
            <div className="mt-10 text-center">
              <Link to="/vehicules/occasion">
                <Button className="px-6" size="lg">
                  Voir tous les véhicules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedCars;
