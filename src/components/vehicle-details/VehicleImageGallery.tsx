
import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

interface VehicleImageGalleryProps {
  image: string;
  images?: string[];
  brand: string;
  model: string;
}

const VehicleImageGallery = ({ image, images, brand, model }: VehicleImageGalleryProps) => {
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState(image);
  const [allImages, setAllImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Réinitialiser l'état d'erreur lors du changement d'image
    setImageError(false);
    setCurrentImage(image);
    
    // Créer un tableau de toutes les images (principale + additionnelles)
    const imageArray: string[] = [];
    
    // D'abord ajouter l'image principale si elle existe
    if (image && image.trim() !== '') {
      imageArray.push(image);
    }
    
    // Puis ajouter les images additionnelles valides
    if (images && Array.isArray(images)) {
      const validAdditionalImages = images.filter(img => img && img.trim() !== '');
      imageArray.push(...validAdditionalImages);
    }
    
    console.log(`VehicleImageGallery: ${brand} ${model} - ${imageArray.length} images au total`);
    setAllImages(imageArray);
  }, [image, images, brand, model]);

  const handleThumbnailClick = (img: string) => {
    setCurrentImage(img);
    setImageError(false);
  };

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
        {currentImage && !imageError ? (
          <img 
            src={currentImage} 
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Erreur de chargement de l'image:", currentImage);
              setImageError(true);
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
            <Car className="h-16 w-16 text-gray-400" />
            <p className="text-gray-500 mt-2">Aucune image disponible</p>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
          Occasion
        </div>
      </div>
      
      {allImages.length > 1 && (
        <div className="flex overflow-x-auto space-x-2 py-2">
          {allImages.map((img, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 h-16 w-24 rounded overflow-hidden cursor-pointer 
                ${img === currentImage ? 'ring-2 ring-primary' : 'opacity-70'}`}
              onClick={() => handleThumbnailClick(img)}
            >
              <img 
                src={img}
                alt={`${brand} ${model} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x80?text=Error';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;
