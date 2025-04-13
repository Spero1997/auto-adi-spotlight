import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Search, Star, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { translate } = useLanguage();

  const translations = {
    featuredVehicles: {
      FR: "Nos véhicules en vedette",
      EN: "Our featured vehicles",
      ES: "Nuestros vehículos destacados",
      IT: "I nostri veicoli in evidenza",
      PT: "Nossos veículos em destaque",
      RO: "Vehiculele noastre în evidență"
    },
    allVehicles: {
      FR: "Tous nos véhicules d'occasion",
      EN: "All our used vehicles",
      ES: "Todos nuestros vehículos usados",
      IT: "Tutti i nostri veicoli usati",
      PT: "Todos os nossos veículos usados",
      RO: "Toate vehiculele noastre second-hand"
    },
    searchResults: {
      FR: "Résultats de votre recherche",
      EN: "Results of your search",
      ES: "Resultados de su búsqueda",
      IT: "Risultati della tua ricerca",
      PT: "Resultados da sua pesquisa",
      RO: "Rezultatele căutării dvs."
    },
    loading: {
      FR: "Chargement des véhicules...",
      EN: "Loading vehicles...",
      ES: "Cargando vehículos...",
      IT: "Caricamento veicoli...",
      PT: "Carregando veículos...",
      RO: "Încărcare vehicule..."
    },
    error: {
      FR: "Erreur: ",
      EN: "Error: ",
      ES: "Error: ",
      IT: "Errore: ",
      PT: "Erro: ",
      RO: "Eroare: "
    },
    noVehiclesFound: {
      FR: "Aucun véhicule trouvé.",
      EN: "No vehicles found.",
      ES: "No se encontraron vehículos.",
      IT: "Nessun veicolo trovato.",
      PT: "Nenhum veículo encontrado.",
      RO: "Nu s-au găsit vehicule."
    },
    noVehiclesInFeatured: {
      FR: "Aucun véhicule n'a encore été ajouté au catalogue vedette.",
      EN: "No vehicles have been added to the featured catalog yet.",
      ES: "Aún no se han añadido vehículos al catálogo destacado.",
      IT: "Nessun veicolo è stato ancora aggiunto al catalogo in evidenza.",
      PT: "Nenhum veículo foi adicionado ao catálogo em destaque ainda.",
      RO: "Niciun vehicul nu a fost adăugat încă la catalogul evidențiat."
    },
    noVehiclesMatchingCriteria: {
      FR: "Aucun véhicule ne correspond à vos critères de recherche.",
      EN: "No vehicles match your search criteria.",
      ES: "Ningún vehículo coincide con sus criterios de búsqueda.",
      IT: "Nessun veicolo corrisponde ai tuoi criteri di ricerca.",
      PT: "Nenhum veículo corresponde aos seus critérios de pesquisa.",
      RO: "Niciun vehicul nu corespunde criteriilor dvs. de căutare."
    },
    viewOnFacebook: {
      FR: "Voir sur Facebook",
      EN: "View on Facebook",
      ES: "Ver en Facebook",
      IT: "Visualizza su Facebook",
      PT: "Ver no Facebook",
      RO: "Vezi pe Facebook"
    },
    updated: {
      FR: "(MAJ)",
      EN: "(UPD)",
      ES: "(ACT)",
      IT: "(AGG)",
      PT: "(ATU)",
      RO: "(ACT)"
    },
    viewDetails: {
      FR: "Voir détails",
      EN: "View details",
      ES: "Ver detalles",
      IT: "Vedi dettagli",
      PT: "Ver detalhes",
      RO: "Vezi detalii"
    },
    viewAllVehicles: {
      FR: "Voir tous les véhicules",
      EN: "View all vehicles",
      ES: "Ver todos los vehículos",
      IT: "Vedi tutti i veicoli",
      PT: "Ver todos os veículos",
      RO: "Vezi toate vehiculele"
    }
  };

  useEffect(() => {
    loadVehicles();
    
    const handleVehiclesUpdated = () => {
      console.log("Événement vehiclesUpdated détecté, rechargement des véhicules");
      loadVehicles();
    };
    
    const handleCatalogChanged = () => {
      console.log("Événement catalogChanged détecté, rechargement des véhicules");
      loadVehicles();
    };
    
    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    window.addEventListener('catalogChanged', handleCatalogChanged);
    
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
      window.removeEventListener('catalogChanged', handleCatalogChanged);
    };
  }, [featuredOnly]);

  const loadVehicles = () => {
    setLoading(true);
    setError(null);
    try {
      let importedVehicles: ImportedVehicle[] = [];
      
      if (featuredOnly) {
        const featuredVehicles = getImportedVehicles('featured');
        importedVehicles = featuredVehicles;
        console.log(`FeaturedCars: ${importedVehicles.length} véhicules chargés depuis le catalogue featured`);
      } else {
        const standardVehicles = getImportedVehicles('standard');
        const featuredVehicles = getImportedVehicles('featured');
        
        console.log(`Chargement des véhicules: ${standardVehicles.length} standard, ${featuredVehicles.length} featured`);
        console.log(`Plateforme actuelle: ${isMobile ? 'Mobile' : 'Desktop'}`);
        
        const uniqueVehicles = new Map<string, ImportedVehicle>();
        
        standardVehicles.forEach(vehicle => {
          const key = `${vehicle.id || 'no-id'}-${vehicle.brand || 'no-brand'}-${vehicle.model || 'no-model'}-${vehicle.year || 'no-year'}`;
          uniqueVehicles.set(key, { ...vehicle, featured: false });
          console.log(`Ajout du véhicule standard: ${vehicle.brand} ${vehicle.model} avec clé ${key}`);
        });
        
        featuredVehicles.forEach(vehicle => {
          const key = `${vehicle.id || 'no-id'}-${vehicle.brand || 'no-brand'}-${vehicle.model || 'no-model'}-${vehicle.year || 'no-year'}`;
          uniqueVehicles.set(key, { ...vehicle, featured: true });
          console.log(`Ajout du véhicule featured: ${vehicle.brand} ${vehicle.model} avec clé ${key}`);
        });
        
        importedVehicles = Array.from(uniqueVehicles.values());
        
        console.log(`FeaturedCars: ${standardVehicles.length} véhicules standard + ${featuredVehicles.length} véhicules featured = ${importedVehicles.length} total après déduplication`);
        console.log(`Plateforme: ${isMobile ? 'Mobile' : 'Desktop'} - ${importedVehicles.length} véhicules chargés au total`);
        
        console.log("Liste complète des véhicules chargés:");
        importedVehicles.forEach((v, index) => {
          console.log(`${index + 1}. ${v.brand} ${v.model} (ID: ${v.id}, FB Link: ${v.fbLink || 'none'})`);
        });
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

  const openFacebookLink = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    console.log("Ouverture du lien Facebook:", url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        {searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)
          ? translate("searchResults", translations.searchResults)
          : featuredOnly
            ? translate("featuredVehicles", translations.featuredVehicles)
            : translate("allVehicles", translations.allVehicles)}
      </h2>

      {loading && <p className="text-center">{translate("loading", translations.loading)}</p>}
      {error && <p className="text-center text-red-500">{translate("error", translations.error)}{error}</p>}

      {!loading && featured.length === 0 ? (
        <div className="text-center my-12">
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">{translate("noVehiclesFound", translations.noVehiclesFound)}</p>
          <p className="text-gray-400">
            {featuredOnly 
              ? translate("noVehiclesInFeatured", translations.noVehiclesInFeatured)
              : translate("noVehiclesMatchingCriteria", translations.noVehiclesMatchingCriteria)}
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
                  
                  {vehicle.fbLink && (
                    <button 
                      onClick={(e) => openFacebookLink(vehicle.fbLink || '', e)}
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                      aria-label={translate("viewOnFacebook", translations.viewOnFacebook)}
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      {translate("viewOnFacebook", translations.viewOnFacebook)} {vehicle.brand === "Porsche" && translate("updated", translations.updated)} 
                    </button>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-blue">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                    <Link to={`/vehicule/${vehicle.id}`} data-testid={`vehicle-link-${vehicle.id}`}>
                      <Button>
                        {translate("viewDetails", translations.viewDetails)}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {featuredOnly && (
            <div className="mt-10 text-center">
              <Link to="/vehicules/occasion">
                <Button className="px-6" size="lg">
                  {translate("viewAllVehicles", translations.viewAllVehicles)}
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
