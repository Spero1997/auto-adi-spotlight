
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mise à jour des chemins d'accès aux images
const carImages = [
  "/lovable-uploads/b0b6f649-3ce2-455a-99e9-189b91475576.png",
  "/lovable-uploads/63df3762-9be9-4c57-92f4-a165c500700e.png",
  "/lovable-uploads/f9728fa8-3f2a-47a5-9ee8-acb985f96084.png",
  "/lovable-uploads/0432cb7e-118a-4667-9015-d31062cb8db2.png",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
];

const HeroCarousel = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoPlay) {
      interval = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % carImages.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);

  // Ajout de console.log pour déboguer
  console.log("Images du carrousel:", carImages);

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true, align: "start" }} 
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <CarouselContent className="h-full">
          {carImages.map((img, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className="relative w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 flex items-center">
                  {/* Conteneur avec fond coloré semi-transparent, positionné sur le côté */}
                  <div className={`
                    ${index % 2 === 0 ? 'bg-brand-blue/80' : 'bg-brand-orange/80'} 
                    max-w-md mx-6 p-5 rounded-lg shadow-lg backdrop-blur-sm
                    transform transition-all duration-500 ease-in-out
                    ${index % 2 === 0 ? 'ml-auto mr-10 md:mr-20' : 'ml-10 md:ml-20'}
                  `}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                      {index === 0 && "BMW M2 - Élégance et Performance"}
                      {index === 1 && "Mercedes AMG GT - Puissance Allemande"}
                      {index === 2 && "Mercedes AMG GT - Luxe à Monaco"}
                      {index === 3 && "BMW M5 - Confort et Sportivité"}
                      {index === 4 && "Trouvez la voiture parfaite pour vous"}
                    </h2>
                    <p className="text-base md:text-lg text-white mb-4">
                      {index === 0 && "Une sportive compacte pour les amateurs de sensations"}
                      {index === 1 && "Un bijou de technologie pour les passionnés"}
                      {index === 2 && "Le prestige sur la Côte d'Azur"}
                      {index === 3 && "La berline sportive par excellence"}
                      {index === 4 && "Des milliers de véhicules d'occasion vérifiés et garantis"}
                    </p>
                    
                    {index === 4 && (
                      <div className="flex mt-4">
                        <Link to="/vehicules/occasion">
                          <Button className="bg-white text-brand-blue hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-semibold">
                            Véhicules d'occasion
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 z-10 bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute right-4 z-10 bg-white/80 hover:bg-white" />
      </Carousel>

      {/* Indicateurs de pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              // Ajouter cette fonctionnalité pour changer le slide actif quand on clique sur un indicateur
              const api = document.querySelector(".embla__container");
              if (api) {
                console.log("Changing slide to", index);
              }
            }}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
