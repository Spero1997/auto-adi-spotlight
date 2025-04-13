
import { ShieldCheck, Clock, Car, DollarSign, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const { translate } = useLanguage();
  
  // Traductions pour le composant Benefits
  const translations = {
    whyChooseTitle: {
      FR: "Pourquoi choisir Auto Adi",
      EN: "Why choose Auto Adi",
      ES: "Por qué elegir Auto Adi",
      IT: "Perché scegliere Auto Adi",
      PT: "Por que escolher Auto Adi",
      RO: "De ce să alegeți Auto Adi"
    },
    whyChooseSubtitle: {
      FR: "Découvrez les avantages qui font notre différence et la satisfaction de nos clients.",
      EN: "Discover the advantages that make our difference and the satisfaction of our customers.",
      ES: "Descubra las ventajas que hacen nuestra diferencia y la satisfacción de nuestros clientes.",
      IT: "Scopri i vantaggi che fanno la nostra differenza e la soddisfazione dei nostri clienti.",
      PT: "Descubra as vantagens que fazem nossa diferença e a satisfação de nossos clientes.",
      RO: "Descoperiți avantajele care ne diferențiază și satisfacția clienților noștri."
    },
    guaranteedQuality: {
      FR: "Qualité garantie",
      EN: "Guaranteed quality",
      ES: "Calidad garantizada",
      IT: "Qualità garantita",
      PT: "Qualidade garantida",
      RO: "Calitate garantată"
    },
    guaranteedQualityDesc: {
      FR: "Tous nos véhicules sont soigneusement inspectés et certifiés pour assurer votre tranquillité d'esprit.",
      EN: "All our vehicles are carefully inspected and certified to ensure your peace of mind.",
      ES: "Todos nuestros vehículos son cuidadosamente inspeccionados y certificados para garantizar su tranquilidad.",
      IT: "Tutti i nostri veicoli sono accuratamente ispezionati e certificati per garantire la vostra tranquillità.",
      PT: "Todos os nossos veículos são cuidadosamente inspecionados e certificados para garantir sua tranquilidade.",
      RO: "Toate vehiculele noastre sunt inspectate și certificate cu atenție pentru a vă asigura liniștea."
    },
    simpleProcess: {
      FR: "Processus simple",
      EN: "Simple process",
      ES: "Proceso simple",
      IT: "Processo semplice",
      PT: "Processo simples",
      RO: "Proces simplu"
    },
    simpleProcessDesc: {
      FR: "Achetez votre voiture en ligne ou en concession, comme vous préférez. Nous nous adaptons à vos besoins.",
      EN: "Buy your car online or at the dealership, as you prefer. We adapt to your needs.",
      ES: "Compre su coche en línea o en el concesionario, como prefiera. Nos adaptamos a sus necesidades.",
      IT: "Acquista la tua auto online o in concessionaria, come preferisci. Ci adattiamo alle tue esigenze.",
      PT: "Compre seu carro online ou na concessionária, como preferir. Nós nos adaptamos às suas necessidades.",
      RO: "Cumpărați mașina online sau la dealer, după cum preferați. Ne adaptăm nevoilor dvs."
    },
    freeTrial: {
      FR: "Essai gratuit",
      EN: "Free trial",
      ES: "Prueba gratuita",
      IT: "Prova gratuita",
      PT: "Teste gratuito",
      RO: "Test gratuit"
    },
    freeTrialDesc: {
      FR: "Testez votre future voiture pendant 14 jours avec notre garantie satisfait ou remboursé.",
      EN: "Test your future car for 14 days with our satisfaction or money back guarantee.",
      ES: "Pruebe su futuro coche durante 14 días con nuestra garantía de satisfacción o devolución del dinero.",
      IT: "Prova la tua futura auto per 14 giorni con la nostra garanzia soddisfatti o rimborsati.",
      PT: "Teste seu futuro carro por 14 dias com nossa garantia de satisfação ou devolução do dinheiro.",
      RO: "Testați viitoarea mașină timp de 14 zile cu garanția noastră de satisfacție sau banii înapoi."
    },
    customFinancing: {
      FR: "Financement sur mesure",
      EN: "Custom financing",
      ES: "Financiación personalizada",
      IT: "Finanziamento personalizzato",
      PT: "Financiamento personalizado",
      RO: "Finanțare personalizată"
    },
    customFinancingDesc: {
      FR: "Des solutions de financement adaptées à votre budget avec des mensualités sans intérêt de 6 à 84 mois.",
      EN: "Financing solutions adapted to your budget with interest-free monthly payments from 6 to 84 months.",
      ES: "Soluciones de financiación adaptadas a su presupuesto con pagos mensuales sin intereses de 6 a 84 meses.",
      IT: "Soluzioni di finanziamento adattate al tuo budget con rate mensili senza interessi da 6 a 84 mesi.",
      PT: "Soluções de financiamento adaptadas ao seu orçamento com pagamentos mensais sem juros de 6 a 84 meses.",
      RO: "Soluții de finanțare adaptate bugetului dvs. cu plăți lunare fără dobândă de la 6 la 84 de luni."
    },
    garageService: {
      FR: "Service garage",
      EN: "Garage service",
      ES: "Servicio de garaje",
      IT: "Servizio garage",
      PT: "Serviço de garagem",
      RO: "Serviciu de garaj"
    },
    garageServiceDesc: {
      FR: "Notre garage automobile prend soin de votre véhicule pour l'entretien et les réparations en Europe.",
      EN: "Our car garage takes care of your vehicle for maintenance and repairs in Europe.",
      ES: "Nuestro garaje se encarga de su vehículo para mantenimiento y reparaciones en Europa.",
      IT: "Il nostro garage auto si prende cura del tuo veicolo per manutenzione e riparazioni in Europa.",
      PT: "Nossa garagem cuida do seu veículo para manutenção e reparos na Europa.",
      RO: "Garajul nostru auto are grijă de vehiculul dvs. pentru întreținere și reparații în Europa."
    }
  };

  const benefits = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-brand-blue" />,
      title: translate("guaranteedQuality", translations.guaranteedQuality),
      description: translate("guaranteedQualityDesc", translations.guaranteedQualityDesc)
    },
    {
      icon: <Clock className="h-12 w-12 text-brand-blue" />,
      title: translate("simpleProcess", translations.simpleProcess),
      description: translate("simpleProcessDesc", translations.simpleProcessDesc)
    },
    {
      icon: <Car className="h-12 w-12 text-brand-blue" />,
      title: translate("freeTrial", translations.freeTrial),
      description: translate("freeTrialDesc", translations.freeTrialDesc)
    },
    {
      icon: <DollarSign className="h-12 w-12 text-brand-blue" />,
      title: translate("customFinancing", translations.customFinancing),
      description: translate("customFinancingDesc", translations.customFinancingDesc)
    },
    {
      icon: <Settings className="h-12 w-12 text-brand-blue" />,
      title: translate("garageService", translations.garageService),
      description: translate("garageServiceDesc", translations.garageServiceDesc)
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translate("whyChooseTitle", translations.whyChooseTitle)}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {translate("whyChooseSubtitle", translations.whyChooseSubtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center card-hover"
            >
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
