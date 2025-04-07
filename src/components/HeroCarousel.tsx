
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, Car, Settings, CreditCard, TruckIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// Images du carrousel
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    // Mettre à jour l'index actif lorsque le carousel change
    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoPlay && carouselApi) {
      interval = window.setInterval(() => {
        if (carouselApi) {
          carouselApi.scrollNext();
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, carouselApi]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Logo en superposition */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
          alt="Auto Adi" 
          className="h-12"
        />
      </div>

      {/* Burger menu pour mobile */}
      <div className="absolute top-6 right-6 z-20 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white shadow-md">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="py-4 flex flex-col gap-4 mt-8">
              <Link 
                to="/vehicules/occasion" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Car className="h-5 w-5 text-brand-blue" />
                <span className="font-medium">Véhicules d'occasion</span>
              </Link>
              <Link 
                to="/services" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Settings className="h-5 w-5 text-brand-blue" />
                <span className="font-medium">Services</span>
              </Link>
              <Link 
                to="/financement" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <CreditCard className="h-5 w-5 text-brand-blue" />
                <span className="font-medium">Financement</span>
              </Link>
              <Link 
                to="/rachat" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <TruckIcon className="h-5 w-5 text-brand-blue" />
                <span className="font-medium">Rachat de votre véhicule</span>
              </Link>
              <div className="border-t my-2"></div>
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Accueil
              </Link>
              <Link 
                to="/a-propos" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Navigation en superposition - visible uniquement sur desktop */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-4">
        <button 
          onClick={() => handleNavigation('/')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Accueil
        </button>
        <button 
          onClick={() => handleNavigation('/vehicules/occasion')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Véhicules
        </button>
        <button 
          onClick={() => handleNavigation('/services')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Services
        </button>
        <button 
          onClick={() => handleNavigation('/financement')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Financement
        </button>
        <button 
          onClick={() => handleNavigation('/a-propos')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          À propos
        </button>
        <button 
          onClick={() => handleNavigation('/contact')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Contact
        </button>
        <button 
          onClick={() => handleNavigation('/rachat')}
          className="text-white hover:text-opacity-70 transition-opacity font-medium text-shadow"
        >
          Rachat
        </button>
        <button className="text-white hover:text-opacity-70 transition-opacity">
          <Globe className="h-5 w-5" />
        </button>
      </div>

      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true, align: "start" }} 
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        setApi={setCarouselApi}
      >
        <CarouselContent className="h-full">
          {carImages.map((img, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className="relative w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* Overlay foncé pour améliorer la lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
                
                <div className="absolute inset-0 flex items-center">
                  {/* Conteneur avec fond coloré semi-transparent, positionné sur le côté */}
                  <div className={`
                    ${index % 2 === 0 ? 'bg-brand-blue/90' : 'bg-brand-orange/90'} 
                    max-w-md mx-6 p-5 sm:p-6 md:p-7 rounded-lg shadow-lg backdrop-blur-sm
                    transform transition-all duration-500 ease-in-out
                    ${index % 2 === 0 ? 'ml-auto mr-10 md:mr-20' : 'ml-10 md:ml-20'}
                  `}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white text-shadow">
                      {index === 0 && "BMW M2 - Élégance et Performance"}
                      {index === 1 && "Mercedes AMG GT - Puissance Allemande"}
                      {index === 2 && "Mercedes AMG GT - Luxe à Monaco"}
                      {index === 3 && "BMW M5 - Confort et Sportivité"}
                      {index === 4 && "Trouvez la voiture parfaite pour vous"}
                    </h2>
                    <p className="text-base md:text-lg text-white mb-4 font-medium">
                      {index === 0 && "Une sportive compacte pour les amateurs de sensations"}
                      {index === 1 && "Un bijou de technologie pour les passionnés"}
                      {index === 2 && "Le prestige sur la Côte d'Azur"}
                      {index === 3 && "La berline sportive par excellence"}
                      {index === 4 && "Des milliers de véhicules d'occasion vérifiés et garantis"}
                    </p>
                    
                    {index === 4 && (
                      <div className="flex mt-4">
                        <Link to="/vehicules/occasion">
                          <Button className="bg-white text-brand-blue hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-semibold text-base shadow-md">
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
        <CarouselPrevious className="absolute left-4 z-10 bg-white/90 hover:bg-white shadow-md" />
        <CarouselNext className="absolute right-4 z-10 bg-white/90 hover:bg-white shadow-md" />
      </Carousel>

      {/* Indicateurs de pagination améliorés */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              if (carouselApi) {
                carouselApi.scrollTo(index);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-white scale-125 shadow-lg" : "bg-white/70"
            }`}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
