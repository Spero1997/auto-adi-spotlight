
/**
 * Constantes de marque pour Auto Adi
 */

export const BRAND_INFO = {
  NAME: "Auto Adi",
  LOGO_PATH: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png",
  PRIMARY_COLOR: "#064EA2", // Bleu
  SECONDARY_COLOR: "#FF9752", // Orange
  COPYRIGHT: "© 2002 Auto Adi. N° d'identification: 827 514 860. Tous droits réservés."
};

/**
 * Retourne le chemin du logo
 */
export const getLogoPath = (): string => {
  return BRAND_INFO.LOGO_PATH;
};

/**
 * Retourne le nom de la marque
 */
export const getBrandName = (): string => {
  return BRAND_INFO.NAME;
};

/**
 * Retourne les métadonnées SEO de base
 */
export const getBaseSEO = () => {
  return {
    title: `${BRAND_INFO.NAME} - Concessionnaire auto pas cher | Achat voiture neuve et occasion Florence`,
    description: `${BRAND_INFO.NAME}, votre concessionnaire automobile de confiance pour l'achat de véhicules neufs et d'occasion à Florence. Financement auto taux 0%, reprise véhicule gratuite.`,
    keywords: "achat voiture neuve, achat voiture occasion, concessionnaire auto pas cher"
  };
};
