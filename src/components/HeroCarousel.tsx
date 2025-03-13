
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Search } from 'lucide-react';
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
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center px-4">
                    {index === 0 && "BMW M2 - Élégance et Performance"}
                    {index === 1 && "Mercedes AMG GT - Puissance Allemande"}
                    {index === 2 && "Mercedes AMG GT - Luxe à Monaco"}
                    {index === 3 && "BMW M5 - Confort et Sportivité"}
                    {index === 4 && "Trouvez la voiture parfaite pour vous"}
                  </h2>
                  <p className="text-xl max-w-2xl text-center px-4 mb-6">
                    {index === 0 && "Une sportive compacte pour les amateurs de sensations"}
                    {index === 1 && "Un bijou de technologie pour les passionnés"}
                    {index === 2 && "Le prestige sur la Côte d'Azur"}
                    {index === 3 && "La berline sportive par excellence"}
                    {index === 4 && "Des milliers de véhicules d'occasion vérifiés et garantis"}
                  </p>
                  
                  {index === 4 && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <Link to="/vehicules/occasion">
                        <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg">
                          Véhicules d'occasion
                        </Button>
                      </Link>
                    </div>
                  )}
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
      
      {/* Quick search section */}
      <div className="container mx-auto px-4 absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 -mb-20">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Recherche rapide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Marque</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="citroen">Citroën</option>
                  <option value="peugeot">Peugeot</option>
                  <option value="renault">Renault</option>
                  <option value="toyota">Toyota</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Modèle</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="break">Break</option>
                  <option value="citadine">Citadine</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Budget max</option>
                  <option value="10000">10 000 €</option>
                  <option value="15000">15 000 €</option>
                  <option value="20000">20 000 €</option>
                  <option value="30000">30 000 €</option>
                  <option value="50000">50 000 €</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Énergie</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                </select>
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <Button 
                className="bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full md:w-auto px-8 py-5 rounded-md text-white font-semibold flex items-center justify-center"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
