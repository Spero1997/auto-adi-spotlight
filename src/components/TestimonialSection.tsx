import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Language } from '@/contexts/LanguageContext';

const testimonials = [
  {
    id: 1,
    name: "Maria Ionescu",
    position: "Director de marketing",
    message: "Am cumpărat un Peugeot 3008 de la Auto Adi și sunt absolut încântată de serviciu. Echipa a fost incredibil de prietenoasă și profesionistă. Le recomand cu cea mai mare încredere!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    language: "RO"
  },
  {
    id: 2,
    name: "Andrei Popescu",
    position: "Inginer software",
    message: "Un serviciu client excepțional! Am găsit exact mașina pe care o căutam la un preț foarte rezonabil. Procesul de finanțare a fost simplu și rapid, fără bătăi de cap.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    language: "RO"
  },
  {
    id: 3,
    name: "Elena Radu",
    position: "Profesoară",
    message: "Auto Adi mi-a făcut achiziția primei mașini extrem de ușoară! Personalul m-a ajutat să aleg un vehicul care se potrivește perfect bugetului și nevoilor mele. O experiență plăcută și profesionistă.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    language: "RO"
  },
  {
    id: 4,
    name: "Marc Lambert",
    position: "Chef d'entreprise",
    message: "Excellente sélection de véhicules haut de gamme. Je suis très satisfait de mon Audi A5 et du service personnalisé que j'ai reçu. Je reviendrai certainement pour mon prochain achat.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    language: "FR"
  },
  {
    id: 5,
    name: "Marco Rossi",
    position: "Architetto",
    message: "Ho comprato la mia BMW Serie 5 da Auto Adi e sono rimasto colpito dalla qualità del servizio. Il team è professionale e attento alle esigenze del cliente. Tornerò sicuramente!",
    rating: 5,
    avatar: "/lovable-uploads/f589fba6-8301-4717-8c66-976c7c7bbcd7.png",
    language: "IT"
  },
  {
    id: 6,
    name: "Robert Miller",
    position: "Truck Driver",
    message: "I found my Volkswagen Touareg at Auto Adi while traveling through France. Despite the language barrier, they made the process incredibly smooth. Excellent service!",
    rating: 5,
    avatar: "/lovable-uploads/99e4c269-15bf-4ced-8ed9-f4c03f6f1378.png",
    language: "EN"
  },
  {
    id: 7,
    name: "Carlos Mendoza",
    position: "Ejecutivo de ventas",
    message: "¡Excelente experiencia! Compré un Renault Captur y estoy muy satisfecho con la calidad y el precio. El equipo de Auto Adi fue muy atento y transparente durante todo el proceso.",
    rating: 4,
    avatar: "/lovable-uploads/39a66c8b-f5a7-452c-b7a1-ea5713f7a059.png",
    language: "ES"
  },
  {
    id: 8,
    name: "Maria Silva",
    position: "Enfermeira",
    message: "Encontrei o carro perfeito para minha família na Auto Adi. O Citroën C4 tem sido uma excelente escolha e o preço estava dentro do meu orçamento. Atendimento cinco estrelas!",
    rating: 5,
    avatar: "/lovable-uploads/0dd80e06-e79c-4aee-98e3-92fdad89a399.png",
    language: "PT"
  },
  {
    id: 9,
    name: "Francesca Bianchi",
    position: "Insegnante",
    message: "Ho visitato Auto Adi durante la mia vacanza in Francia e sono rimasta impressionata dalla vasta gamma di veicoli. Ho acquistato una Peugeot 208 a un prezzo incredibile!",
    rating: 5,
    avatar: "/lovable-uploads/0467d19e-0099-458b-ad02-3a728b8c0048.png",
    language: "IT"
  },
  {
    id: 10,
    name: "Heinrich Weber",
    position: "Ingenieur",
    message: "Ich habe meinen Mercedes bei Auto Adi gekauft und bin sehr zufrieden mit dem Service. Das Team war äußerst hilfsbereit und hat mir einen fantastischen Preis angeboten.",
    rating: 5,
    avatar: "/lovable-uploads/53e6dee5-6e5b-48db-85d6-065a7bdc8435.png",
    language: "DE"
  },
  {
    id: 11,
    name: "José Rodriguez",
    position: "Empresario",
    message: "Auto Adi ofrece una selección impresionante de vehículos de alta gama. El personal fue muy profesional y me ayudó a encontrar exactamente lo que buscaba. ¡Muy recomendable!",
    rating: 5,
    avatar: "/lovable-uploads/52ca535e-08c4-44c4-b40e-2610809981e8.png",
    language: "ES"
  },
  {
    id: 12,
    name: "Pedro Costa",
    position: "Gerente de projeto",
    message: "Comprei meu Renault Megane na Auto Adi e fiquei impressionado com o processo simples e transparente. A equipe foi extremamente prestativa e consegui um ótimo negócio.",
    rating: 4,
    avatar: "/lovable-uploads/c16ba104-bd7b-4103-8664-8e744b0ac0e2.png",
    language: "PT"
  },
  {
    id: 13,
    name: "Elizabeth Turner",
    position: "Office Manager",
    message: "I was visiting France and needed a reliable dealership. Auto Adi exceeded my expectations with their English-speaking staff and exceptional service. I highly recommend them!",
    rating: 5,
    avatar: "/lovable-uploads/3bad6300-9dea-486e-b0cd-a6c2784c35c1.png",
    language: "EN"
  },
  {
    id: 14,
    name: "Giovanni Ricci",
    position: "Consulente finanziario",
    message: "Servizio eccellente e prezzi competitivi. Ho acquistato una Citroën C3 per mia figlia e siamo entrambi molto soddisfatti. Il personale di Auto Adi è stato fantastico!",
    rating: 5,
    avatar: "/lovable-uploads/6148daec-b490-4c80-a5c6-634990c2ecd1.png",
    language: "IT"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('FR');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage as Language);
    }
  }, []);

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const translations: Record<string, Record<Language, string>> = {
    'title': {
      'FR': 'Ce que disent nos clients',
      'EN': 'What our customers say',
      'ES': 'Lo que dicen nuestros clientes',
      'IT': 'Cosa dicono i nostri clienti',
      'PT': 'O que nossos clientes dizem',
      'RO': 'Ce spun clienții noștri'
    },
    'subtitle': {
      'FR': 'Découvrez les témoignages de nos clients satisfaits qui ont trouvé leur bonheur chez Auto Adi.',
      'EN': 'Discover testimonials from our satisfied customers who found their happiness at Auto Adi.',
      'ES': 'Descubra testimonios de nuestros clientes satisfechos que encontraron su felicidad en Auto Adi.',
      'IT': 'Scopri le testimonianze dei nostri clienti soddisfatti che hanno trovato la loro felicità presso Auto Adi.',
      'PT': 'Descubra depoimentos de nossos clientes satisfeitos que encontraram sua felicidade na Auto Adi.',
      'RO': 'Descoperiți mărturiile clienților noștri mulțumiți care și-au găsit fericirea la Auto Adi.'
    },
    'prevButton': {
      'FR': 'Témoignage précédent',
      'EN': 'Previous testimonial',
      'ES': 'Testimonio anterior',
      'IT': 'Testimonianza precedente',
      'PT': 'Depoimento anterior',
      'RO': 'Mărturia anterioară'
    },
    'nextButton': {
      'FR': 'Témoignage suivant',
      'EN': 'Next testimonial',
      'ES': 'Siguiente testimonio',
      'IT': 'Prossima testimonianza',
      'PT': 'Próximo depoimento',
      'RO': 'Următoarea mărturie'
    }
  };

  const getTranslation = (key: string) => {
    return translations[key]?.[currentLanguage] || translations[key]?.['FR'] || key;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getTranslation('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {getTranslation('subtitle')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-8">
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100"
            aria-label={getTranslation('prevButton')}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button 
            onClick={nextTestimonial} 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-100"
            aria-label={getTranslation('nextButton')}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          <div className="bg-white p-8 rounded-lg shadow-lg overflow-hidden">
            <div 
              className={`flex flex-col items-center text-center transition-opacity duration-300 ${
                direction ? 'animate-slide-in' : ''
              }`}
              onAnimationEnd={() => setDirection(null)}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-brand-blue text-white rounded-full text-sm">
                  {testimonials[activeIndex].language}
                </span>
              </div>

              <div className="mb-6">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-brand-blue"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg"; // Fallback to placeholder if image fails to load
                  }}
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

          <div className="flex justify-center mt-8 space-x-2 flex-wrap">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mb-2 ${
                  index === activeIndex ? 'bg-brand-blue' : 'bg-gray-300'
                }`}
                aria-label={`${getTranslation('nextButton')} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
