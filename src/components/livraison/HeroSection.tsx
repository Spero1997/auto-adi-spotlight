
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Truck, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define translations
const translations = {
  title: {
    FR: "Livraison internationale de véhicules",
    EN: "International Vehicle Delivery",
    ES: "Entrega internacional de vehículos",
    IT: "Consegna internazionale di veicoli",
    PT: "Entrega internacional de veículos",
    RO: "Livrare internațională de vehicule"
  },
  description: {
    FR: "Notre service de livraison internationale vous permet d'acquérir votre véhicule où que vous soyez en Europe.",
    EN: "Our international delivery service allows you to acquire your vehicle anywhere in Europe.",
    ES: "Nuestro servicio de entrega internacional le permite adquirir su vehículo en cualquier lugar de Europa.",
    IT: "Il nostro servizio di consegna internazionale ti permette di acquistare il tuo veicolo ovunque in Europa.",
    PT: "Nosso serviço de entrega internacional permite que você adquira seu veículo em qualquer lugar da Europa.",
    RO: "Serviciul nostru de livrare internațională vă permite să achiziționați vehiculul oriunde în Europa."
  },
  requestQuote: {
    FR: "Demander un devis",
    EN: "Request a quote",
    ES: "Solicitar presupuesto",
    IT: "Richiedi un preventivo",
    PT: "Solicitar orçamento",
    RO: "Solicitați o ofertă"
  },
  callUs: {
    FR: "Nous appeler",
    EN: "Call us",
    ES: "Llámenos",
    IT: "Chiamaci",
    PT: "Ligue para nós",
    RO: "Sunați-ne"
  }
};

const HeroSection = () => {
  const { translate } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-brand-blue to-brand-darkBlue text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('/lovable-uploads/b2097994-da2c-4127-8a9d-1a70dea60caf.png')] bg-cover bg-center"></div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 animate-fade-in">
            {translate('title', translations.title)}
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fade-in animation-delay-300">
            {translate('description', translations.description)}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
            <Link to="/contact">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold group">
                <span>{translate('requestQuote', translations.requestQuote)}</span>
                <Truck className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+33123456789">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold group">
                <Phone className="mr-2 h-5 w-5" />
                <span>{translate('callUs', translations.callUs)}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
