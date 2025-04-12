
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ImportedVehicle, getCatalogIdFromUrl } from '@/utils/vehicleImportService';
import { fetchVehiclesFromSupabase } from '@/utils/services/vehicleService';

interface SearchFilters {
  brand?: string;
  model?: string;
  maxPrice?: number;
  fuelType?: string;
}

export const useVehicles = (searchFilters?: SearchFilters, featuredOnly = false, refreshKey?: number) => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const catalogType = featuredOnly ? 'featured' : 'standard';
      // Récupérer l'ID du catalogue à partir de l'URL si disponible
      const catalogId = getCatalogIdFromUrl(catalogType);
      
      console.log(`useVehicles: Chargement des véhicules depuis Supabase, catalogType=${catalogType}, ID=${catalogId || 'local'}, refreshKey=${refreshKey || 'none'}`);
      
      // Charger les véhicules directement depuis Supabase
      try {
        const supabaseVehicles = await fetchVehiclesFromSupabase();
        
        // Transformer les véhicules Supabase au format ImportedVehicle
        const transformedVehicles = supabaseVehicles.map(v => ({
          id: v.id,
          brand: v.brand,
          model: v.model,
          year: v.year,
          mileage: v.mileage,
          fuelType: v.fuel_type,
          transmission: v.transmission,
          price: v.price,
          description: v.description,
          image: v.image_url,
          images: v.additional_images,
          exteriorColor: v.exterior_color,
          interiorColor: v.interior_color,
          engine: v.engine,
          doors: v.doors,
          features: v.features,
          featured: v.is_featured,
          catalogType: v.is_featured ? 'featured' : 'standard'
        })) as ImportedVehicle[];
        
        // Si on ne cherche que les véhicules vedettes, filtrer les résultats
        const filteredVehicles = featuredOnly 
          ? transformedVehicles.filter(v => v.featured) 
          : transformedVehicles;
        
        // Trier les véhicules par année (du plus récent au plus ancien)
        filteredVehicles.sort((a, b) => (b.year || 0) - (a.year || 0));
        
        // Log individual vehicles to help with debugging
        filteredVehicles.forEach((vehicle, index) => {
          console.log(`Véhicule ${index+1}: ${vehicle.brand} ${vehicle.model}, Année: ${vehicle.year}, Type: ${vehicle.catalogType || 'non spécifié'}, ID: ${vehicle.id}`);
        });
        
        setVehicles(filteredVehicles);
        console.log(`useVehicles: ${filteredVehicles.length} véhicules chargés depuis Supabase`);
      } catch (supabaseError) {
        console.error("Erreur lors du chargement des véhicules depuis Supabase:", supabaseError);
        setError("Échec du chargement des véhicules depuis Supabase.");
        setVehicles([]);
      }
    } catch (e) {
      setError("Échec du chargement des véhicules.");
      console.error("Erreur lors du chargement des véhicules:", e);
    } finally {
      setLoading(false);
    }
  }, [featuredOnly, refreshKey]); // Add refreshKey to dependencies

  useEffect(() => {
    // Chargement initial des véhicules
    loadVehicles();
    
    const handleVehiclesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const catalogType = customEvent.detail?.catalogType;
      
      console.log(`useVehicles: Event vehiclesUpdated reçu, catalogType=${catalogType}`);
      
      // On recharge les véhicules si:
      // - catalogType n'est pas défini (pour compatibilité)
      // - catalogType est 'standard' et nous affichons le catalogue standard (pas featuredOnly)
      // - catalogType est 'featured' et nous affichons le catalogue vedette (featuredOnly)
      // - catalogType est 'all'
      if (!catalogType || 
          (catalogType === 'standard' && !featuredOnly) || 
          (catalogType === 'featured' && featuredOnly) || 
          catalogType === 'all') {
        console.log('useVehicles: Rechargement des véhicules suite à vehiclesUpdated');
        loadVehicles();
      }
    };
    
    const handleCatalogChanged = () => {
      console.log('useVehicles: Event catalogChanged reçu, rechargement des véhicules');
      loadVehicles();
    };
    
    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    window.addEventListener('catalogChanged', handleCatalogChanged);
    
    // Recharger les véhicules quand l'URL change ou le refreshKey change
    loadVehicles();
    
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
      window.removeEventListener('catalogChanged', handleCatalogChanged);
    };
  }, [featuredOnly, location.search, loadVehicles, refreshKey]); // Add refreshKey to dependencies

  // Fonction pour filtrer les véhicules selon les critères de recherche
  const filteredVehicles = () => {
    let filtered = [...vehicles];
    
    // Debug log to see what vehicles we're working with
    console.log(`Filtrage: ${filtered.length} véhicules avant filtre`);

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
    
    console.log(`Filtrage: ${filtered.length} véhicules après filtre`);
    return filtered;
  };

  return {
    vehicles: filteredVehicles(),
    loading,
    error,
    refresh: loadVehicles // Exposer la fonction de rechargement
  };
};
