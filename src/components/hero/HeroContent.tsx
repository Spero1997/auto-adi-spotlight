
import { useLanguage } from '@/contexts/LanguageContext';
import QuickSearch from '@/components/QuickSearch';

// Define translations directly in the component
const heroTranslations = {
  welcomeHeader: {
    FR: "Votre Partenaire Automobile en Europe",
    EN: "Your Automotive Partner in Europe",
    ES: "Su Socio Automotriz en Europa",
    IT: "Il Tuo Partner Automobilistico in Europa",
    PT: "Seu Parceiro Automotivo na Europa",
    RO: "Partenerul Dvs. Auto în Europa"
  },
  welcomeSubtext: {
    FR: "Explorez notre collection exclusive de véhicules premium et découvrez notre service sur mesure",
    EN: "Explore our exclusive collection of premium vehicles and discover our tailored service",
    ES: "Explore nuestra colección exclusiva de vehículos premium y descubra nuestro servicio a medida",
    IT: "Esplora la nostra collezione esclusiva di veicoli premium e scopri il nostro servizio su misura",
    PT: "Explore nossa coleção exclusiva de veículos premium e descubra nosso serviço personalizado",
    RO: "Explorați colecția noastră exclusivă de vehicule premium și descoperiți serviciul nostru personalizat"
  }
};

const HeroContent = () => {
  const { translate } = useLanguage();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg animate-fade-in">
          {translate('welcomeHeader', heroTranslations.welcomeHeader)}
        </h1>
        <p className="font-montserrat text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
          {translate('welcomeSubtext', heroTranslations.welcomeSubtext)}
        </p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto animate-fade-in animation-delay-300">
        <QuickSearch />
      </div>
    </div>
  );
};

export default HeroContent;
