
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Fuel, Calendar, Info, Share2 } from 'lucide-react';
import { ImportedVehicle } from '@/utils/types/vehicle';
import { toast } from 'sonner';
import { generateVehicleSlug, generateVehicleImageAlt } from '@/utils/seoUtils';

interface VehicleCardProps {
  vehicle: ImportedVehicle;
  showShareButton?: boolean;
}

const SeoOptimizedVehicleCard: React.FC<VehicleCardProps> = ({ vehicle, showShareButton = true }) => {
  const {
    id,
    brand,
    model,
    year,
    mileage,
    fuelType,
    price,
    image,
    exteriorColor,
    featured
  } = vehicle;

  const [imageError, setImageError] = useState(false);
  const vehicleSlug = generateVehicleSlug(brand, model, year);
  const vehicleImageAlt = generateVehicleImageAlt(brand, model, year, exteriorColor);
  
  const shareVehicle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: `${brand} ${model} ${year}`,
        text: `Découvrez cette ${brand} ${model} ${year} à ${price}€ chez Auto Adi`,
        url: `${window.location.origin}/vehicule/${id}?utm_source=share&utm_medium=social`
      }).catch(err => {
        console.error('Erreur lors du partage:', err);
      });
    } else {
      const url = `${window.location.origin}/vehicule/${id}?utm_source=share&utm_medium=copy`;
      navigator.clipboard.writeText(url);
      toast.success('Lien copié dans le presse-papier');
    }
  };

  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image: ${image}`);
    setImageError(true);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-100">
        <Link to={`/vehicule/${id}/${vehicleSlug}`} className="block">
          {!imageError ? (
            <img
              src={image}
              alt={vehicleImageAlt}
              className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <Car className="h-16 w-16 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Image non disponible</p>
            </div>
          )}
          {featured && (
            <Badge variant="default" className="absolute top-2 left-2 bg-primary text-white">
              Véhicule vedette
            </Badge>
          )}
        </Link>
      </div>
      
      <CardContent className="flex-grow p-4">
        <div className="mb-3">
          <Link to={`/vehicule/${id}/${vehicleSlug}`} className="block">
            <h2 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {brand} {model}
            </h2>
            <p className="text-sm text-gray-500">{year} • {mileage.toLocaleString('fr-FR')} km</p>
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="flex items-center gap-1 text-xs py-1">
            <Fuel className="h-3 w-3" />
            {fuelType}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-xs py-1">
            <Calendar className="h-3 w-3" />
            {year}
          </Badge>
          {exteriorColor && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs py-1">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ 
                  backgroundColor: 
                    exteriorColor.toLowerCase() === 'blanc' ? 'white' :
                    exteriorColor.toLowerCase() === 'noir' ? 'black' :
                    exteriorColor.toLowerCase() === 'gris' ? 'gray' :
                    exteriorColor.toLowerCase() === 'bleu' ? 'blue' :
                    exteriorColor.toLowerCase() === 'rouge' ? 'red' :
                    '#ccc'
                }}
              />
              {exteriorColor}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between items-center">
        <div className="font-bold text-lg text-primary">
          {price.toLocaleString('fr-FR')} €
        </div>
        
        <div className="flex items-center gap-2">
          {showShareButton && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={shareVehicle}
              title="Partager"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
          
          <Link to={`/vehicule/${id}/${vehicleSlug}`}>
            <Button variant="default" size="sm" className="gap-1">
              <Info className="h-4 w-4" />
              Détails
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeoOptimizedVehicleCard;
