
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useLanguage } from '@/contexts/LanguageContext';

interface VehicleGalleryProps {
  images?: string[];
  image?: string;
  brand: string;
  model: string;
  translations: Record<string, any>;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ images, image, brand, model, translations }) => {
  const { translate } = useLanguage();

  if (images && images.length > 0) {
    return (
      <Carousel className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <img 
                src={img} 
                alt={`${brand} ${model} - Photo ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Erreur de chargement de l'image:", img);
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    );
  }

  if (image) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
        <img 
          src={image} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Erreur de chargement de l'image:", image);
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-200">
      <p className="text-gray-500">{translate("noImageAvailable", translations.noImageAvailable)}</p>
    </div>
  );
};

export default VehicleGallery;
