
import { CATALOG_ID_KEY, FEATURED_CATALOG_ID_KEY } from '../constants/vehicleStorage';

/**
 * Génère une URL partageable pour le catalogue actuel
 */
export const generateShareableUrl = (catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Sélectionner la clé appropriée en fonction du type de catalogue
    const catalogIdKey = catalogType === 'featured' ? FEATURED_CATALOG_ID_KEY : CATALOG_ID_KEY;
    
    // Générer un ID unique si aucun n'existe déjà
    let catalogId = localStorage.getItem(catalogIdKey);
    
    if (!catalogId) {
      catalogId = `catalog-${catalogType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(catalogIdKey, catalogId);
    }
    
    // Construire l'URL avec l'ID du catalogue
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = new URL(baseUrl);
    shareableUrl.searchParams.set('catalog', catalogId);
    shareableUrl.searchParams.set('type', catalogType);
    
    return shareableUrl.toString();
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL partageable:", error);
    return window.location.href;
  }
};

/**
 * Récupère l'identifiant du catalogue à partir de l'URL ou utilise le catalogue local
 */
export const getCatalogIdFromUrl = (catalogType: 'standard' | 'featured' = 'standard') => {
  try {
    // Sélectionner la clé appropriée en fonction du type de catalogue
    const catalogIdKey = catalogType === 'featured' ? FEATURED_CATALOG_ID_KEY : CATALOG_ID_KEY;
    
    // Récupérer l'ID depuis l'URL si disponible
    const url = new URL(window.location.href);
    const catalogId = url.searchParams.get('catalog');
    const urlCatalogType = url.searchParams.get('type');
    
    if (catalogId && (!urlCatalogType || urlCatalogType === catalogType)) {
      // Stocker l'ID de catalogue dans localStorage pour le réutiliser
      localStorage.setItem(catalogIdKey, catalogId);
      return catalogId;
    }
    
    // Si pas d'ID dans l'URL, essayer de récupérer depuis localStorage
    return localStorage.getItem(catalogIdKey) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du catalogue:", error);
    return null;
  }
};
