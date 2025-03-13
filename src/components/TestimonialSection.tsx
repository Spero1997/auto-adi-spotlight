
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    position: "Directrice marketing",
    message: "J'ai acheté ma nouvelle Peugeot 3008 chez Auto Adi et je suis ravie du service. Le personnel était incroyablement serviable et professionnel. Je recommande vivement!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    position: "Ingénieur",
    message: "Service clientèle exceptionnel! J'ai trouvé exactement la voiture que je cherchais à un prix très raisonnable. Le processus de financement était simple et rapide.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Julie Petit",
    position: "Enseignante",
    message: "Auto Adi a rendu l'achat de ma première voiture si facile! Le personnel m'a aidée à choisir un véhicule qui correspond parfaitement à mon budget et à mes besoins.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 4,
    name: "Marc Lambert",
    position: "Chef d'entreprise",
    message: "Excellente sélection de véhicules haut de gamme. Je suis très satisfait de mon Audi A5 et du service personnalisé que j'ai reçu. Je reviendrai certainement pour mon prochain achat.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui ont trouvé leur bonheur chez Auto Adi.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-8">
          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button 
            onClick={nextTestimonial} 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Testimonial card */}
          <div className="bg-white p-8 rounded-lg shadow-lg overflow-hidden">
            <div 
              className={`flex flex-col items-center text-center transition-opacity duration-300 ${
                direction ? 'animate-slide-in' : ''
              }`}
              onAnimationEnd={() => setDirection(null)}
            >
              <div className="mb-6">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-brand-blue"
                />
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < testimonials[activeIndex].rating ? "#FF9752" : "none"} 
                    className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? "text-brand-orange" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "{testimonials[activeIndex].message}"
              </blockquote>
              
              <div className="text-gray-900 font-semibold">
                {testimonials[activeIndex].name}
              </div>
              
              <div className="text-gray-600">
                {testimonials[activeIndex].position}
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-brand-blue' : 'bg-gray-300'
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
