
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const carImages = [
  "/lovable-uploads/b0b6f649-3ce2-455a-99e9-189b91475576.png",
  "/lovable-uploads/63df3762-9be9-4c57-92f4-a165c500700e.png",
  "/lovable-uploads/f9728fa8-3f2a-47a5-9ee8-acb985f96084.png",
  "/lovable-uploads/0432cb7e-118a-4667-9015-d31062cb8db2.png"
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

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
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
                  </h2>
                  <p className="text-xl max-w-2xl text-center px-4">
                    {index === 0 && "Une sportive compacte pour les amateurs de sensations"}
                    {index === 1 && "Un bijou de technologie pour les passionnés"}
                    {index === 2 && "Le prestige sur la Côte d'Azur"}
                    {index === 3 && "La berline sportive par excellence"}
                  </p>
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
            onClick={() => setActiveIndex(index)}
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
