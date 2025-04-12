
import React, { useState } from 'react';
import { Car } from 'lucide-react';

interface VehicleImageGalleryProps {
  image: string;
  brand: string;
  model: string;
}

const VehicleImageGallery = ({ image, brand, model }: VehicleImageGalleryProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
      {image && !imageError ? (
        <img 
          src={image} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Erreur de chargement de l'image:", image);
            setImageError(true);
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Car className="h-16 w-16 text-gray-400" />
          <p className="text-gray-500 mt-2">Aucune image disponible</p>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
        Occasion
      </div>
    </div>
  );
};

export default VehicleImageGallery;
