
/**
 * Utilities for SEO optimization
 */

/**
 * Generate SEO-friendly URL slug from vehicle data
 * @param brand Vehicle brand
 * @param model Vehicle model
 * @param year Vehicle year
 * @returns SEO-friendly URL slug
 */
export const generateVehicleSlug = (brand: string, model: string, year: number): string => {
  const cleanBrand = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const cleanModel = model.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Remove double hyphens and trim hyphens from start/end
  return `${cleanBrand}-${cleanModel}-${year}-occasion-auto-adi`
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Generate SEO-optimized image alt text for vehicles
 * @param brand Vehicle brand
 * @param model Vehicle model
 * @param year Vehicle year
 * @param color Vehicle color (optional)
 * @returns SEO-optimized alt text
 */
export const generateVehicleImageAlt = (
  brand: string, 
  model: string, 
  year: number, 
  color?: string
): string => {
  const colorText = color ? `${color} ` : '';
  return `${brand} ${model} ${colorText}${year} occasion Auto Adi Florence`;
};

/**
 * Generate vehicle meta description for SEO
 * @param vehicle Vehicle data
 * @returns SEO-optimized meta description
 */
export const generateVehicleMetaDescription = (
  brand: string,
  model: string,
  year: number,
  mileage: number,
  fuelType: string,
  price: number
): string => {
  return `${brand} ${model} ${year} à ${price.toLocaleString('fr-FR')} € chez Auto Adi Florence. ${mileage.toLocaleString('fr-FR')} km, ${fuelType}. Financement auto taux 0%, reprise véhicule gratuite. Garantie et livraison incluses.`;
};

/**
 * Schema.org data for a single vehicle
 */
export const generateVehicleSchema = (vehicle: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    "brand": {
      "@type": "Brand",
      "name": vehicle.brand
    },
    "model": vehicle.model,
    "modelDate": vehicle.year,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileage,
      "unitCode": "KMT"
    },
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": vehicle.engine || `${vehicle.fuelType} Engine`
    },
    "fuelType": vehicle.fuelType,
    "vehicleTransmission": vehicle.transmission || "Automatic",
    "vehicleInteriorColor": vehicle.interiorColor,
    "vehicleInteriorType": vehicle.interiorColor ? `${vehicle.interiorColor} interior` : undefined,
    "color": vehicle.exteriorColor,
    "numberOfDoors": vehicle.doors || 5,
    "offers": {
      "@type": "Offer",
      "price": vehicle.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Auto Adi",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Florence",
          "addressCountry": "IT"
        }
      }
    },
    "image": vehicle.image
  };
};

/**
 * Generate blog post topics based on SEO needs
 */
export const getSeoFocusedBlogTopics = () => {
  return [
    {
      title: "Comment vérifier l'état d'un véhicule d'occasion avant l'achat ?",
      slug: "comment-verifier-etat-vehicule-occasion-avant-achat",
      topics: ["inspection visuelle", "vérification mécanique", "historique d'entretien", "essai routier"]
    },
    {
      title: "Financement auto à taux 0% : tout ce que vous devez savoir",
      slug: "financement-auto-taux-zero-tout-ce-que-vous-devez-savoir",
      topics: ["options de financement", "avantages du taux 0%", "critères d'éligibilité", "comparaison avec crédit traditionnel"]
    },
    {
      title: "Les 10 voitures d'occasion les plus fiables en 2025",
      slug: "10-voitures-occasion-plus-fiables-2025",
      topics: ["Toyota Corolla", "Honda Civic", "Volkswagen Golf", "Mazda 3", "fiabilité à long terme"]
    },
    {
      title: "Guide complet pour importer une voiture en Italie depuis l'étranger",
      slug: "guide-complet-importer-voiture-italie-depuis-etranger",
      topics: ["documents nécessaires", "taxes et frais", "homologation", "immatriculation", "services Auto Adi"]
    },
    {
      title: "Voiture électrique vs hybride : quelle est la meilleure option en 2025 ?",
      slug: "voiture-electrique-vs-hybride-meilleure-option-2025",
      topics: ["coût total", "infrastructure de recharge", "impact environnemental", "autonomie", "subventions gouvernementales"]
    }
  ];
};
