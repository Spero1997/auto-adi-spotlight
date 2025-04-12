
import React, { useState, useEffect } from 'react';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Réinitialiser l'état d'erreur lors du changement d'image
    setImageError(false);
    setCurrentImage(image);
    
    // Créer un tableau de toutes les images (principale + additionnelles)
    const imageArray = [image];
    if (images && images.length > 0) {
      imageArray.push(...images);
    }
    setAllImages(imageArray);
    setCurrentIndex(0);
  }, [image, images]);

  const handleThumbnailClick = (img: string, index: number) => {
    setCurrentImage(img);
    setCurrentIndex(index);
    setImageError(false);
  };
  
  const handleNext = () => {
    if (allImages.length <= 1) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(allImages[nextIndex]);
    setImageError(false);
  };
  
  const handlePrevious = () => {
    if (allImages.length <= 1) return;
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setCurrentImage(allImages[prevIndex]);
    setImageError(false);
  };

  // Assurons-nous que le chemin de l'image est correct
  const getFixedImagePath = (imagePath: string) => {
    // Si l'image commence par /lovable-uploads/ ou http
    if (imagePath && (imagePath.startsWith('/lovable-uploads/') || imagePath.startsWith('http'))) {
      return imagePath;
    }
    // Si c'est un chemin relatif, ajoutons le préfixe
    if (imagePath && !imagePath.startsWith('/')) {
      return `/${imagePath}`;
    }
    return imagePath;
  };

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
        {currentImage && !imageError ? (
          <>
            <img 
              src={getFixedImagePath(currentImage)} 
              alt={`${brand} ${model}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Erreur de chargement de l'image:", currentImage);
                setImageError(true);
                // Utiliser la nouvelle image uploadée comme fallback
                (e.target as HTMLImageElement).src = '/lovable-uploads/a2e4d2f0-6ecf-4bb3-a88d-d89e102afe99.png';
              }}
            />
            {allImages.length > 1 && (
              <>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {currentIndex + 1} / {allImages.length}
                  </span>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
            <img
              src="/lovable-uploads/a2e4d2f0-6ecf-4bb3-a88d-d89e102afe99.png"
              alt={`${brand} ${model} - Image de remplacement`}
              className="w-full h-full object-cover"
              onError={() => {
                // Si même l'image de fallback échoue, on affiche l'icône
                console.error("L'image de fallback a également échoué");
              }}
            />
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
              onClick={() => handleThumbnailClick(img, index)}
            >
              <img 
                src={getFixedImagePath(img)}
                alt={`${brand} ${model} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/lovable-uploads/a2e4d2f0-6ecf-4bb3-a88d-d89e102afe99.png';
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
