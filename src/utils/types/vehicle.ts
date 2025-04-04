
export interface ImportedVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  price: number;
  image: string;
  images?: string[]; // Tableau d'images pour la galerie
  description?: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  doors?: number;
  engine?: string;
  features?: string[];
  fbLink?: string; // Lien Facebook
  excluded?: boolean;
  featured?: boolean; // Propriété pour marquer les véhicules en vedette
  catalogType?: 'standard' | 'featured'; // Nouvelle propriété pour différencier les catalogues
}
