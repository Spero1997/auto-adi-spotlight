
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';

type Translations = {
  [key: string]: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
  };
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Auto Adi",
  "description": "Concessionnaire auto pas cher pour l'achat de voitures neuves et d'occasion à Florence, Italie",
  "url": "https://autoadi.com",
  "logo": "https://autoadi.com/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Florence",
    "addressCountry": "IT"
  },
  "offers": {
    "@type": "Offer",
    "description": "Financement auto taux 0%, reprise véhicule gratuite",
    "priceCurrency": "EUR"
  }
};

const HomeHeader = () => {
  const { translate, language } = useLanguage();
  
  const translations: Translations = {
    pageTitle: {
      FR: "Auto Adi - Concessionnaire auto pas cher | Achat voiture neuve et occasion Florence",
      EN: "Auto Adi - Affordable Car Dealer | New and Used Cars in Florence, Italy",
      ES: "Auto Adi - Concesionario de coches económicos | Compra de coches nuevos y usados en Florencia, Italia",
      IT: "Auto Adi - Concessionario auto economico | Acquisto auto nuove e usate a Firenze, Italia",
      PT: "Auto Adi - Concessionário de automóveis acessível | Carros novos e usados em Florença, Itália",
      RO: "Auto Adi - Dealer auto la prețuri accesibile | Mașini noi și second-hand în Florența, Italia"
    },
    pageDescription: {
      FR: "Auto Adi, votre concessionnaire automobile de confiance pour l'achat de véhicules neufs et d'occasion à Florence. Financement auto taux 0%, reprise véhicule gratuite et garanties exceptionnelles.",
      EN: "Auto Adi, your trusted car dealer for buying new and used vehicles in Florence. 0% auto financing, free vehicle trade-in and exceptional warranties.",
      ES: "Auto Adi, su concesionario de confianza para la compra de vehículos nuevos y usados en Florencia. Financiación al 0%, recompra gratuita y garantías excepcionales.",
      IT: "Auto Adi, il tuo concessionario di fiducia per l'acquisto di veicoli nuovi e usati a Firenze. Finanziamento auto 0%, ripresa gratuita del veicolo e garanzie eccezionali.",
      PT: "Auto Adi, seu concessionário de confiança para a compra de veículos novos e usados em Florença. Financiamento automóvel 0%, retoma gratuita de veículos e garantias excepcionais.",
      RO: "Auto Adi, dealerul dvs. auto de încredere pentru achiziționarea de vehicule noi și second-hand în Florența. Finanțare auto 0%, preluare gratuită a vehiculelor și garanții excepționale."
    },
    heading: {
      FR: "Concessionnaire Auto Pas Cher - Achat Voiture Occasion",
      EN: "Affordable Car Dealer - Used Car Sales",
      ES: "Concesionario de Coches Económicos - Venta de Coches Usados",
      IT: "Concessionario Auto Economico - Vendita Auto Usate",
      PT: "Concessionário de Automóveis Acessível - Venda de Carros Usados",
      RO: "Dealer Auto la Prețuri Accesibile - Vânzare Mașini Second-hand"
    }
  };

  return (
    <>
      <Helmet>
        <title>{translate('pageTitle', translations.pageTitle)}</title>
        <meta name="description" content={translate('pageDescription', translations.pageDescription)} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 mt-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          {translate('heading', translations.heading)}
        </h1>
      </div>
    </>
  );
};

export default HomeHeader;
