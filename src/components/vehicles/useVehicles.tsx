
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ImportedVehicle, getImportedVehicles, getCatalogIdFromUrl } from '@/utils/vehicleImportService';

interface SearchFilters {
  brand?: string;
  model?: string;
  maxPrice?: number;
  fuelType?: string;
}

export const useVehicles = (searchFilters?: SearchFilters, featuredOnly = false) => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    loadVehicles();
    
    const handleVehiclesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const catalogType = customEvent.detail?.catalogType;
      
      console.log(`VehicleList: Event vehiclesUpdated reçu, catalogType=${catalogType}`);
      
      // On recharge les véhicules si:
      // - catalogType n'est pas défini (pour compatibilité)
      // - catalogType est 'standard' et nous affichons le catalogue standard (pas featuredOnly)
      // - catalogType est 'featured' et nous affichons le catalogue vedette (featuredOnly)
      // - catalogType est 'all'
      if (!catalogType || 
          (catalogType === 'standard' && !featuredOnly) || 
          (catalogType === 'featured' && featuredOnly) || 
          catalogType === 'all') {
        loadVehicles();
      }
    };
    
    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    window.addEventListener('catalogChanged', handleVehiclesUpdated);
    
    // Recharger les véhicules quand l'URL change
    loadVehicles();
    
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
      window.removeEventListener('catalogChanged', handleVehiclesUpdated);
    };
  }, [featuredOnly, location.search]);

  const loadVehicles = () => {
    setLoading(true);
    setError(null);
    try {
      const catalogType = featuredOnly ? 'featured' : 'standard';
      // Récupérer l'ID du catalogue à partir de l'URL si disponible
      const catalogId = getCatalogIdFromUrl(catalogType);
      
      console.log(`FeaturedCars: Chargement des véhicules pour le catalogue ${catalogType}, ID=${catalogId || 'local'}`);
      
      const importedVehicles = getImportedVehicles(catalogType);
      console.log(`FeaturedCars: ${importedVehicles.length} véhicules chargés depuis le catalogue ${catalogType}`);
      
      // Log individual vehicles to help with debugging
      importedVehicles.forEach(vehicle => {
        console.log(`Véhicule: ${vehicle.brand} ${vehicle.model}, Type: ${vehicle.catalogType || 'non spécifié'}`);
      });
      
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
    error
  };
};
