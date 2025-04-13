
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wrench, AlertTriangle, Calendar, CheckCircle, Settings, Activity, ShieldCheck, Clock, Truck, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { translate } = useLanguage();

  // Traductions pour la page Services
  const translations = {
    // Hero section
    servicesTitle: {
      FR: "Services automobiles professionnels",
      EN: "Professional automotive services",
      ES: "Servicios automotrices profesionales",
      IT: "Servizi automobilistici professionali",
      PT: "Serviços automotivos profissionais",
      RO: "Servicii auto profesionale"
    },
    servicesDescription: {
      FR: "Notre équipe d'experts est à votre service pour l'entretien, la réparation et l'acquisition de votre véhicule.",
      EN: "Our team of experts is at your service for the maintenance, repair and acquisition of your vehicle.",
      ES: "Nuestro equipo de expertos está a su servicio para el mantenimiento, reparación y adquisición de su vehículo.",
      IT: "Il nostro team di esperti è al tuo servizio per la manutenzione, la riparazione e l'acquisizione del tuo veicolo.",
      PT: "Nossa equipe de especialistas está ao seu serviço para manutenção, reparo e aquisição do seu veículo.",
      RO: "Echipa noastră de experți vă stă la dispoziție pentru întreținerea, repararea și achiziționarea vehiculului dumneavoastră."
    },
    scheduleAppointment: {
      FR: "Prendre rendez-vous",
      EN: "Schedule an appointment",
      ES: "Programar una cita",
      IT: "Fissare un appuntamento",
      PT: "Agendar uma consulta",
      RO: "Programează o întâlnire"
    },
    ourServices: {
      FR: "Nos services",
      EN: "Our services",
      ES: "Nuestros servicios",
      IT: "I nostri servizi",
      PT: "Nossos serviços",
      RO: "Serviciile noastre"
    },
    
    // Specialized services section
    specializedServices: {
      FR: "Nos services spécialisés",
      EN: "Our specialized services",
      ES: "Nuestros servicios especializados",
      IT: "I nostri servizi specializzati",
      PT: "Nossos serviços especializados",
      RO: "Serviciile noastre specializate"
    },
    tailoredSolutions: {
      FR: "Des solutions sur mesure pour répondre à tous vos besoins automobiles.",
      EN: "Tailored solutions to meet all your automotive needs.",
      ES: "Soluciones a medida para satisfacer todas sus necesidades automotrices.",
      IT: "Soluzioni su misura per soddisfare tutte le tue esigenze automobilistiche.",
      PT: "Soluções personalizadas para atender a todas as suas necessidades automotivas.",
      RO: "Soluții personalizate pentru a răspunde tuturor nevoilor dumneavoastră auto."
    },
    
    // Manufacturer warranty
    manufacturerWarranty: {
      FR: "Garantie constructeur",
      EN: "Manufacturer warranty",
      ES: "Garantía del fabricante",
      IT: "Garanzia del produttore",
      PT: "Garantia do fabricante",
      RO: "Garanția producătorului"
    },
    manufacturerWarrantyDesc: {
      FR: "Nous maintenons la garantie constructeur de votre véhicule tout en offrant un service de qualité à prix compétitif.",
      EN: "We maintain your vehicle's manufacturer warranty while offering quality service at competitive prices.",
      ES: "Mantenemos la garantía del fabricante de su vehículo mientras ofrecemos un servicio de calidad a precios competitivos.",
      IT: "Manteniamo la garanzia del produttore del tuo veicolo offrendo al contempo un servizio di qualità a prezzi competitivi.",
      PT: "Mantemos a garantia do fabricante do seu veículo enquanto oferecemos um serviço de qualidade a preços competitivos.",
      RO: "Menținem garanția producătorului vehiculului dvs. oferind în același timp servicii de calitate la prețuri competitive."
    },
    learnMore: {
      FR: "En savoir plus",
      EN: "Learn more",
      ES: "Saber más",
      IT: "Saperne di più",
      PT: "Saber mais",
      RO: "Aflați mai multe"
    },
    
    // International delivery
    internationalDelivery: {
      FR: "Livraison internationale",
      EN: "International delivery",
      ES: "Entrega internacional",
      IT: "Consegna internazionale",
      PT: "Entrega internacional",
      RO: "Livrare internațională"
    },
    internationalDeliveryDesc: {
      FR: "Notre service de livraison internationale vous permet d'acquérir votre véhicule où que vous soyez en Europe.",
      EN: "Our international delivery service allows you to acquire your vehicle wherever you are in Europe.",
      ES: "Nuestro servicio de entrega internacional le permite adquirir su vehículo dondequiera que esté en Europa.",
      IT: "Il nostro servizio di consegna internazionale ti consente di acquisire il tuo veicolo ovunque tu sia in Europa.",
      PT: "O nosso serviço de entrega internacional permite-lhe adquirir o seu veículo onde quer que esteja na Europa.",
      RO: "Serviciul nostru de livrare internațională vă permite să achiziționați vehiculul oriunde v-ați afla în Europa."
    },
    
    // Premium customer service
    premiumCustomerService: {
      FR: "Service client premium",
      EN: "Premium customer service",
      ES: "Servicio al cliente premium",
      IT: "Servizio clienti premium",
      PT: "Serviço premium ao cliente",
      RO: "Serviciu premium pentru clienți"
    },
    premiumCustomerServiceDesc: {
      FR: "Notre équipe de conseillers dédiés vous offre un accompagnement personnalisé pour tous vos projets automobiles.",
      EN: "Our team of dedicated advisors offers you personalized support for all your automotive projects.",
      ES: "Nuestro equipo de asesores dedicados le ofrece un apoyo personalizado para todos sus proyectos automotrices.",
      IT: "Il nostro team di consulenti dedicati ti offre un supporto personalizzato per tutti i tuoi progetti automobilistici.",
      PT: "A nossa equipa de consultores dedicados oferece-lhe apoio personalizado para todos os seus projetos automóveis.",
      RO: "Echipa noastră de consilieri dedicați vă oferă asistență personalizată pentru toate proiectele dvs. auto."
    },
    
    // Automotive services section
    automotiveServices: {
      FR: "Nos services automobiles",
      EN: "Our automotive services",
      ES: "Nuestros servicios automotrices",
      IT: "I nostri servizi automobilistici",
      PT: "Nossos serviços automotivos",
      RO: "Serviciile noastre auto"
    },
    completeServiceRange: {
      FR: "Découvrez notre gamme complète de services pour maintenir votre véhicule en parfait état.",
      EN: "Discover our complete range of services to keep your vehicle in perfect condition.",
      ES: "Descubra nuestra gama completa de servicios para mantener su vehículo en perfectas condiciones.",
      IT: "Scopri la nostra gamma completa di servizi per mantenere il tuo veicolo in perfette condizioni.",
      PT: "Descubra a nossa gama completa de serviços para manter o seu veículo em perfeitas condições.",
      RO: "Descoperiți gama noastră completă de servicii pentru a menține vehiculul dvs. în stare perfectă."
    },
    
    // Regular maintenance
    regularMaintenance: {
      FR: "Entretien régulier",
      EN: "Regular maintenance",
      ES: "Mantenimiento regular",
      IT: "Manutenzione regolare",
      PT: "Manutenção regular",
      RO: "Întreținere regulată"
    },
    regularMaintenanceDesc: {
      FR: "Services d'entretien régulier incluant vidange d'huile, remplacement des filtres et vérification complète des systèmes.",
      EN: "Regular maintenance services including oil change, filter replacement and complete system check.",
      ES: "Servicios de mantenimiento regular que incluyen cambio de aceite, reemplazo de filtros y verificación completa del sistema.",
      IT: "Servizi di manutenzione regolare che includono cambio dell'olio, sostituzione dei filtri e controllo completo del sistema.",
      PT: "Serviços de manutenção regular, incluindo mudança de óleo, substituição de filtros e verificação completa do sistema.",
      RO: "Servicii de întreținere regulată, inclusiv schimb de ulei, înlocuirea filtrelor și verificarea completă a sistemului."
    },
    oilChange: {
      FR: "Vidange d'huile et remplacement de filtre",
      EN: "Oil change and filter replacement",
      ES: "Cambio de aceite y reemplazo de filtro",
      IT: "Cambio olio e sostituzione filtro",
      PT: "Mudança de óleo e substituição de filtro",
      RO: "Schimb de ulei și înlocuire de filtru"
    },
    tireRotation: {
      FR: "Rotation des pneus et équilibrage",
      EN: "Tire rotation and balancing",
      ES: "Rotación y equilibrado de neumáticos",
      IT: "Rotazione e bilanciamento degli pneumatici",
      PT: "Rotação e balanceamento dos pneus",
      RO: "Rotație și echilibrare anvelope"
    },
    fluidLevels: {
      FR: "Vérification des niveaux de fluides",
      EN: "Fluid level check",
      ES: "Verificación de niveles de fluidos",
      IT: "Controllo del livello dei fluidi",
      PT: "Verificação dos níveis de fluidos",
      RO: "Verificarea nivelurilor de fluide"
    },
    brakeInspection: {
      FR: "Inspection des freins",
      EN: "Brake inspection",
      ES: "Inspección de frenos",
      IT: "Ispezione dei freni",
      PT: "Inspeção dos travões",
      RO: "Inspecția frânelor"
    },
    
    // Electronic diagnostics
    electronicDiagnostics: {
      FR: "Diagnostic électronique",
      EN: "Electronic diagnostics",
      ES: "Diagnóstico electrónico",
      IT: "Diagnostica elettronica",
      PT: "Diagnóstico eletrónico",
      RO: "Diagnostic electronic"
    },
    electronicDiagnosticsDesc: {
      FR: "Diagnostic complet des systèmes électroniques et informatiques de votre véhicule grâce à des équipements de pointe.",
      EN: "Comprehensive diagnostics of your vehicle's electronic and computer systems using state-of-the-art equipment.",
      ES: "Diagnóstico completo de los sistemas electrónicos e informáticos de su vehículo utilizando equipos de última generación.",
      IT: "Diagnostica completa dei sistemi elettronici e informatici del tuo veicolo utilizzando apparecchiature all'avanguardia.",
      PT: "Diagnóstico abrangente dos sistemas eletrónicos e informáticos do seu veículo utilizando equipamento de ponta.",
      RO: "Diagnostic complet al sistemelor electronice și informatice ale vehiculului dvs. folosind echipamente de ultimă generație."
    },
    faultCodeReading: {
      FR: "Lecture des codes défaut",
      EN: "Fault code reading",
      ES: "Lectura de códigos de fallo",
      IT: "Lettura dei codici di guasto",
      PT: "Leitura de códigos de falha",
      RO: "Citirea codurilor de eroare"
    },
    electronicsIssues: {
      FR: "Diagnostic des pannes électroniques",
      EN: "Electronic fault diagnosis",
      ES: "Diagnóstico de averías electrónicas",
      IT: "Diagnosi di guasti elettronici",
      PT: "Diagnóstico de falhas eletrónicas",
      RO: "Diagnosticarea defecțiunilor electronice"
    },
    sensorActuatorTesting: {
      FR: "Test des capteurs et actuateurs",
      EN: "Sensor and actuator testing",
      ES: "Prueba de sensores y actuadores",
      IT: "Test di sensori e attuatori",
      PT: "Teste de sensores e atuadores",
      RO: "Testarea senzorilor și actuatoarelor"
    },
    ecuReprogramming: {
      FR: "Reprogrammation des calculateurs",
      EN: "ECU reprogramming",
      ES: "Reprogramación de ECU",
      IT: "Riprogrammazione della centralina",
      PT: "Reprogramação da ECU",
      RO: "Reprogramarea calculatoarelor"
    },
    
    // Mechanical repairs
    mechanicalRepairs: {
      FR: "Réparations mécaniques",
      EN: "Mechanical repairs",
      ES: "Reparaciones mecánicas",
      IT: "Riparazioni meccaniche",
      PT: "Reparações mecânicas",
      RO: "Reparații mecanice"
    },
    mechanicalRepairsDesc: {
      FR: "Services de réparation pour tous types de problèmes mécaniques, réalisés par nos techniciens qualifiés.",
      EN: "Repair services for all types of mechanical problems, performed by our qualified technicians.",
      ES: "Servicios de reparación para todo tipo de problemas mecánicos, realizados por nuestros técnicos cualificados.",
      IT: "Servizi di riparazione per tutti i tipi di problemi meccanici, eseguiti dai nostri tecnici qualificati.",
      PT: "Serviços de reparação para todos os tipos de problemas mecânicos, realizados pelos nossos técnicos qualificados.",
      RO: "Servicii de reparații pentru toate tipurile de probleme mecanice, efectuate de tehnicienii noștri calificați."
    },
    engineRepair: {
      FR: "Réparation de moteur",
      EN: "Engine repair",
      ES: "Reparación de motor",
      IT: "Riparazione del motore",
      PT: "Reparação de motor",
      RO: "Repararea motorului"
    },
    brakingSystem: {
      FR: "Système de freinage",
      EN: "Braking system",
      ES: "Sistema de frenado",
      IT: "Sistema frenante",
      PT: "Sistema de travagem",
      RO: "Sistem de frânare"
    },
    transmissionGearbox: {
      FR: "Boîte de vitesses et transmission",
      EN: "Transmission and gearbox",
      ES: "Transmisión y caja de cambios",
      IT: "Trasmissione e cambio",
      PT: "Transmissão e caixa de velocidades",
      RO: "Transmisie și cutie de viteze"
    },
    suspensionSteering: {
      FR: "Suspension et direction",
      EN: "Suspension and steering",
      ES: "Suspensión y dirección",
      IT: "Sospensione e sterzo",
      PT: "Suspensão e direção",
      RO: "Suspensie și direcție"
    },
    
    // Service process section
    serviceProcess: {
      FR: "Notre processus de service",
      EN: "Our service process",
      ES: "Nuestro proceso de servicio",
      IT: "Il nostro processo di servizio",
      PT: "Nosso processo de serviço",
      RO: "Procesul nostru de servicii"
    },
    transparentProcess: {
      FR: "Un service transparent et efficace du début à la fin.",
      EN: "A transparent and efficient service from start to finish.",
      ES: "Un servicio transparente y eficiente de principio a fin.",
      IT: "Un servizio trasparente ed efficiente dall'inizio alla fine.",
      PT: "Um serviço transparente e eficiente do início ao fim.",
      RO: "Un serviciu transparent și eficient de la început până la sfârșit."
    },
    
    // Service steps
    appointment: {
      FR: "1. Rendez-vous",
      EN: "1. Appointment",
      ES: "1. Cita",
      IT: "1. Appuntamento",
      PT: "1. Agendamento",
      RO: "1. Programare"
    },
    appointmentDesc: {
      FR: "Prenez rendez-vous en ligne ou par téléphone selon vos disponibilités.",
      EN: "Schedule an appointment online or by phone according to your availability.",
      ES: "Programe una cita en línea o por teléfono según su disponibilidad.",
      IT: "Fissa un appuntamento online o telefonicamente in base alla tua disponibilità.",
      PT: "Marque uma consulta online ou por telefone de acordo com a sua disponibilidade.",
      RO: "Programați o întâlnire online sau prin telefon în funcție de disponibilitatea dvs."
    },
    diagnostics: {
      FR: "2. Diagnostic",
      EN: "2. Diagnostics",
      ES: "2. Diagnóstico",
      IT: "2. Diagnostica",
      PT: "2. Diagnóstico",
      RO: "2. Diagnostic"
    },
    diagnosticsDesc: {
      FR: "Nos techniciens examinent votre véhicule et vous fournissent un devis détaillé.",
      EN: "Our technicians examine your vehicle and provide you with a detailed quote.",
      ES: "Nuestros técnicos examinan su vehículo y le proporcionan un presupuesto detallado.",
      IT: "I nostri tecnici esaminano il tuo veicolo e ti forniscono un preventivo dettagliato.",
      PT: "Os nossos técnicos examinam o seu veículo e fornecem-lhe um orçamento detalhado.",
      RO: "Tehnicienii noștri examinează vehiculul dvs. și vă oferă o estimare detaliată."
    },
    intervention: {
      FR: "3. Intervention",
      EN: "3. Intervention",
      ES: "3. Intervención",
      IT: "3. Intervento",
      PT: "3. Intervenção",
      RO: "3. Intervenție"
    },
    interventionDesc: {
      FR: "Après votre approbation, nos mécaniciens effectuent les travaux nécessaires.",
      EN: "After your approval, our mechanics perform the necessary work.",
      ES: "Después de su aprobación, nuestros mecánicos realizan el trabajo necesario.",
      IT: "Dopo la tua approvazione, i nostri meccanici eseguono i lavori necessari.",
      PT: "Após a sua aprovação, os nossos mecânicos realizam o trabalho necessário.",
      RO: "După aprobarea dvs., mecanicii noștri efectuează lucrările necesare."
    },
    vehicleDelivery: {
      FR: "4. Remise du véhicule",
      EN: "4. Vehicle delivery",
      ES: "4. Entrega del vehículo",
      IT: "4. Consegna del veicolo",
      PT: "Entrega do veículo",
      RO: "Livrarea vehiculului"
    },
    vehicleDeliveryDesc: {
      FR: "Récupérez votre véhicule avec une explication détaillée des travaux effectués.",
      EN: "Pick up your vehicle with a detailed explanation of the work performed.",
      ES: "Recoja su vehículo con una explicación detallada del trabajo realizado.",
      IT: "Ritira il tuo veicolo con una spiegazione dettagliata del lavoro svolto.",
      PT: "Recolha o seu veículo com uma explicação detalhada do trabalho realizado.",
      RO: "Ridicați-vă vehiculul cu o explicație detaliată a lucrărilor efectuate."
    },
    
    // CTA section
    needService: {
      FR: "Besoin d'un service pour votre véhicule ?",
      EN: "Need a service for your vehicle?",
      ES: "¿Necesita un servicio para su vehículo?",
      IT: "Hai bisogno di un servizio per il tuo veicolo?",
      PT: "Precisa de um serviço para o seu veículo?",
      RO: "Aveți nevoie de un serviciu pentru vehiculul dvs.?"
    },
    expertsAtYourService: {
      FR: "Nos experts sont à votre service pour entretenir et réparer votre véhicule, quelle que soit sa marque ou son modèle.",
      EN: "Our experts are at your service to maintain and repair your vehicle, regardless of its brand or model.",
      ES: "Nuestros expertos están a su servicio para mantener y reparar su vehículo, independientemente de su marca o modelo.",
      IT: "I nostri esperti sono al tuo servizio per mantenere e riparare il tuo veicolo, indipendentemente dalla marca o dal modello.",
      PT: "Os nossos especialistas estão ao seu serviço para manter e reparar o seu veículo, independentemente da marca ou modelo.",
      RO: "Experții noștri sunt la dispoziția dvs. pentru a întreține și repara vehiculul dvs., indiferent de marca sau modelul acestuia."
    },
    contactUs: {
      FR: "Nous contacter",
      EN: "Contact us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-brand-blue to-brand-darkBlue text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          <div className="relative container mx-auto px-4 z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 animate-fade-in">{translate('servicesTitle', translations.servicesTitle)}</h1>
              <p className="text-xl mb-8 opacity-90 animate-fade-in animation-delay-300">{translate('servicesDescription', translations.servicesDescription)}</p>
              <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold group">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>{translate('scheduleAppointment', translations.scheduleAppointment)}</span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    {translate('contactUs', translations.contactUs)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4">{translate('specializedServices', translations.specializedServices)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('tailoredSolutions', translations.tailoredSolutions)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-green-100 p-4 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <ShieldCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{translate('manufacturerWarranty', translations.manufacturerWarranty)}</h3>
                <p className="text-gray-600 mb-5 text-center">
                  {translate('manufacturerWarrantyDesc', translations.manufacturerWarrantyDesc)}
                </p>
                <Link to="/garantie" className="block w-full">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    {translate('learnMore', translations.learnMore)}
                  </Button>
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-blue-100 p-4 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{translate('internationalDelivery', translations.internationalDelivery)}</h3>
                <p className="text-gray-600 mb-5 text-center">
                  {translate('internationalDeliveryDesc', translations.internationalDeliveryDesc)}
                </p>
                <Link to="/livraison" className="block w-full">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    {translate('learnMore', translations.learnMore)}
                  </Button>
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-amber-100 p-4 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{translate('premiumCustomerService', translations.premiumCustomerService)}</h3>
                <p className="text-gray-600 mb-5 text-center">
                  {translate('premiumCustomerServiceDesc', translations.premiumCustomerServiceDesc)}
                </p>
                <Link to="/service-premium" className="block w-full">
                  <Button variant="outline" className="w-full border-amber-600 text-amber-600 hover:bg-amber-50">
                    {translate('learnMore', translations.learnMore)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Automotive Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4">{translate('automotiveServices', translations.automotiveServices)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('completeServiceRange', translations.completeServiceRange)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Regular Maintenance */}
              <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-blue/10 p-4 rounded-full mr-4">
                    <Wrench className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold">{translate('regularMaintenance', translations.regularMaintenance)}</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {translate('regularMaintenanceDesc', translations.regularMaintenanceDesc)}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('oilChange', translations.oilChange)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('tireRotation', translations.tireRotation)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('fluidLevels', translations.fluidLevels)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('brakeInspection', translations.brakeInspection)}</span>
                  </li>
                </ul>
                <div>
                  <Link to="/rendez-vous" className="block w-full">
                    <Button className="w-full">{translate('scheduleAppointment', translations.scheduleAppointment)}</Button>
                  </Link>
                </div>
              </div>

              {/* Electronic Diagnostics */}
              <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-blue/10 p-4 rounded-full mr-4">
                    <Activity className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold">{translate('electronicDiagnostics', translations.electronicDiagnostics)}</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {translate('electronicDiagnosticsDesc', translations.electronicDiagnosticsDesc)}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('faultCodeReading', translations.faultCodeReading)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('electronicsIssues', translations.electronicsIssues)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('sensorActuatorTesting', translations.sensorActuatorTesting)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('ecuReprogramming', translations.ecuReprogramming)}</span>
                  </li>
                </ul>
                <div>
                  <Link to="/rendez-vous" className="block w-full">
                    <Button className="w-full">{translate('scheduleAppointment', translations.scheduleAppointment)}</Button>
                  </Link>
                </div>
              </div>

              {/* Mechanical Repairs */}
              <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-blue/10 p-4 rounded-full mr-4">
                    <Settings className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold">{translate('mechanicalRepairs', translations.mechanicalRepairs)}</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {translate('mechanicalRepairsDesc', translations.mechanicalRepairsDesc)}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('engineRepair', translations.engineRepair)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('brakingSystem', translations.brakingSystem)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('transmissionGearbox', translations.transmissionGearbox)}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{translate('suspensionSteering', translations.suspensionSteering)}</span>
                  </li>
                </ul>
                <div>
                  <Link to="/rendez-vous" className="block w-full">
                    <Button className="w-full">{translate('scheduleAppointment', translations.scheduleAppointment)}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold mb-4">{translate('serviceProcess', translations.serviceProcess)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('transparentProcess', translations.transparentProcess)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-brand-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4">{translate('appointment', translations.appointment)}</h3>
                <p className="text-gray-600">
                  {translate('appointmentDesc', translations.appointmentDesc)}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-brand-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4">{translate('diagnostics', translations.diagnostics)}</h3>
                <p className="text-gray-600">
                  {translate('diagnosticsDesc', translations.diagnosticsDesc)}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-brand-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wrench className="h-10 w-10 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4">{translate('intervention', translations.intervention)}</h3>
                <p className="text-gray-600">
                  {translate('interventionDesc', translations.interventionDesc)}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-brand-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4">{translate('vehicleDelivery', translations.vehicleDelivery)}</h3>
                <p className="text-gray-600">
                  {translate('vehicleDeliveryDesc', translations.vehicleDeliveryDesc)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-darkBlue text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-playfair font-bold mb-6">{translate('needService', translations.needService)}</h2>
              <p className="text-xl mb-8">
                {translate('expertsAtYourService', translations.expertsAtYourService)}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    {translate('scheduleAppointment', translations.scheduleAppointment)}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    {translate('contactUs', translations.contactUs)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
