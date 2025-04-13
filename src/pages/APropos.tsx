
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award, Building, Car, Calendar, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const APropos = () => {
  const { translate } = useLanguage();

  // Translations for the About page
  const translations = {
    aboutTitle: {
      FR: "À propos d'Auto Adi",
      EN: "About Auto Adi",
      ES: "Acerca de Auto Adi",
      IT: "Chi è Auto Adi",
      PT: "Sobre a Auto Adi",
      RO: "Despre Auto Adi"
    },
    aboutDescription: {
      FR: "Depuis plus de 20 ans, nous accompagnons nos clients dans leurs projets automobiles avec passion et professionnalisme.",
      EN: "For over 20 years, we have been supporting our customers in their automotive projects with passion and professionalism.",
      ES: "Durante más de 20 años, hemos estado apoyando a nuestros clientes en sus proyectos automotrices con pasión y profesionalismo.",
      IT: "Da oltre 20 anni, supportiamo i nostri clienti nei loro progetti automobilistici con passione e professionalità.",
      PT: "Há mais de 20 anos, apoiamos nossos clientes em seus projetos automotivos com paixão e profissionalismo.",
      RO: "De peste 20 de ani, sprijinim clienții noștri în proiectele lor auto cu pasiune și profesionalism."
    },
    contactUs: {
      FR: "Nous contacter",
      EN: "Contact us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    },
    seeVehicles: {
      FR: "Voir nos véhicules",
      EN: "See our vehicles",
      ES: "Ver nuestros vehículos",
      IT: "Vedi i nostri veicoli",
      PT: "Ver nossos veículos",
      RO: "Vedeți vehiculele noastre"
    },
    ourStory: {
      FR: "Notre histoire",
      EN: "Our story",
      ES: "Nuestra historia",
      IT: "La nostra storia",
      PT: "Nossa história",
      RO: "Povestea noastră"
    },
    storyParagraph1: {
      FR: "Fondée en 2002 à Florence en Italie, Auto Adi est née d'une passion pour l'automobile et d'une vision claire : offrir des véhicules de qualité à des prix justes, accompagnés d'un service irréprochable.",
      EN: "Founded in 2002 in Florence, Italy, Auto Adi was born from a passion for automobiles and a clear vision: to offer quality vehicles at fair prices, accompanied by impeccable service.",
      ES: "Fundada en 2002 en Florencia, Italia, Auto Adi nació de una pasión por los automóviles y una visión clara: ofrecer vehículos de calidad a precios justos, acompañados de un servicio impecable.",
      IT: "Fondata nel 2002 a Firenze, Italia, Auto Adi è nata da una passione per le automobili e da una visione chiara: offrire veicoli di qualità a prezzi equi, accompagnati da un servizio impeccabile.",
      PT: "Fundada em 2002 em Florença, Itália, a Auto Adi nasceu de uma paixão por automóveis e uma visão clara: oferecer veículos de qualidade a preços justos, acompanhados de um serviço impecável.",
      RO: "Fondată în 2002 la Florența, Italia, Auto Adi s-a născut dintr-o pasiune pentru automobile și o viziune clară: de a oferi vehicule de calitate la prețuri corecte, însoțite de un serviciu impecabil."
    },
    storyParagraph2: {
      FR: "Ce qui a commencé comme un petit garage familial à Florence s'est progressivement développé pour devenir une entreprise reconnue avec une présence en Roumanie, tout en conservant les valeurs familiales qui ont fait notre succès.",
      EN: "What started as a small family garage in Florence has gradually developed into a recognized company with a presence in Romania, while maintaining the family values that have made our success.",
      ES: "Lo que comenzó como un pequeño garaje familiar en Florencia se ha desarrollado gradualmente hasta convertirse en una empresa reconocida con presencia en Rumania, manteniendo los valores familiares que han hecho nuestro éxito.",
      IT: "Ciò che è iniziato come un piccolo garage di famiglia a Firenze si è gradualmente sviluppato in un'azienda riconosciuta con una presenza in Romania, mantenendo i valori familiari che hanno fatto il nostro successo.",
      PT: "O que começou como uma pequena garagem familiar em Florença desenvolveu-se gradualmente numa empresa reconhecida com presença na Roménia, mantendo os valores familiares que fizeram o nosso sucesso.",
      RO: "Ceea ce a început ca un mic garaj de familie în Florența s-a dezvoltat treptat într-o companie recunoscută cu prezență în România, păstrând valorile familiale care au făcut succesul nostru."
    },
    storyParagraph3: {
      FR: "Aujourd'hui, Auto Adi emploie plus de 120 collaborateurs passionnés et commercialise plus de 3 000 véhicules par an, tout en préparant son expansion en Espagne, au Portugal et en France.",
      EN: "Today, Auto Adi employs over 120 passionate employees and sells more than 3,000 vehicles per year, while preparing its expansion in Spain, Portugal and France.",
      ES: "Hoy, Auto Adi emplea a más de 120 empleados apasionados y vende más de 3.000 vehículos por año, mientras prepara su expansión en España, Portugal y Francia.",
      IT: "Oggi, Auto Adi impiega oltre 120 dipendenti appassionati e vende più di 3.000 veicoli all'anno, preparando la sua espansione in Spagna, Portogallo e Francia.",
      PT: "Hoje, a Auto Adi emprega mais de 120 funcionários apaixonados e vende mais de 3.000 veículos por ano, enquanto prepara sua expansão na Espanha, Portugal e França.",
      RO: "Astăzi, Auto Adi angajează peste 120 de angajați pasionați și vinde mai mult de 3.000 de vehicule pe an, pregătindu-și expansiunea în Spania, Portugalia și Franța."
    },
    yearsExperience: {
      FR: "Années d'expérience",
      EN: "Years of experience",
      ES: "Años de experiencia",
      IT: "Anni di esperienza",
      PT: "Anos de experiência",
      RO: "Ani de experiență"
    },
    satisfiedCustomers: {
      FR: "Clients satisfaits",
      EN: "Satisfied customers",
      ES: "Clientes satisfechos",
      IT: "Clienti soddisfatti",
      PT: "Clientes satisfeitos",
      RO: "Clienți mulțumiți"
    },
    ourValues: {
      FR: "Nos valeurs",
      EN: "Our values",
      ES: "Nuestros valores",
      IT: "I nostri valori",
      PT: "Nossos valores",
      RO: "Valorile noastre"
    },
    valuesDescription: {
      FR: "Découvrez les principes qui guident chacune de nos actions au quotidien.",
      EN: "Discover the principles that guide each of our actions on a daily basis.",
      ES: "Descubra los principios que guían cada una de nuestras acciones diariamente.",
      IT: "Scopri i principi che guidano ciascuna delle nostre azioni quotidianamente.",
      PT: "Descubra os princípios que orientam cada uma de nossas ações diariamente.",
      RO: "Descoperiți principiile care ne ghidează fiecare acțiune în fiecare zi."
    },
    customerProximity: {
      FR: "Proximité client",
      EN: "Customer proximity",
      ES: "Proximidad al cliente",
      IT: "Prossimità al cliente",
      PT: "Proximidade com o cliente",
      RO: "Proximitate cu clientul"
    },
    customerProximityDesc: {
      FR: "Nous privilégions une relation de confiance et de proximité avec nos clients, en restant à l'écoute de leurs besoins et en leur apportant des conseils personnalisés.",
      EN: "We prioritize a relationship of trust and proximity with our customers, listening to their needs and providing them with personalized advice.",
      ES: "Priorizamos una relación de confianza y proximidad con nuestros clientes, escuchando sus necesidades y brindándoles consejos personalizados.",
      IT: "Diamo priorità a un rapporto di fiducia e vicinanza con i nostri clienti, ascoltando le loro esigenze e fornendo loro consigli personalizzati.",
      PT: "Priorizamos uma relação de confiança e proximidade com nossos clientes, ouvindo suas necessidades e fornecendo-lhes conselhos personalizados.",
      RO: "Prioritizăm o relație de încredere și proximitate cu clienții noștri, ascultându-le nevoile și oferindu-le sfaturi personalizate."
    },
    excellence: {
      FR: "Excellence",
      EN: "Excellence",
      ES: "Excelencia",
      IT: "Eccellenza",
      PT: "Excelência",
      RO: "Excelență"
    },
    excellenceDesc: {
      FR: "Nous nous engageons à offrir des véhicules et des services de la plus haute qualité, en veillant à respecter les normes les plus exigeantes dans tous les aspects de notre activité.",
      EN: "We are committed to offering vehicles and services of the highest quality, ensuring that we meet the most demanding standards in all aspects of our business.",
      ES: "Nos comprometemos a ofrecer vehículos y servicios de la más alta calidad, asegurando que cumplimos con los estándares más exigentes en todos los aspectos de nuestro negocio.",
      IT: "Ci impegniamo a offrire veicoli e servizi della più alta qualità, garantendo di soddisfare gli standard più esigenti in tutti gli aspetti della nostra attività.",
      PT: "Estamos comprometidos em oferecer veículos e serviços da mais alta qualidade, garantindo que atendemos aos padrões mais exigentes em todos os aspectos de nosso negócio.",
      RO: "Ne angajăm să oferim vehicule și servicii de cea mai înaltă calitate, asigurându-ne că îndeplinim cele mai exigente standarde în toate aspectele afacerii noastre."
    },
    transparency: {
      FR: "Transparence",
      EN: "Transparency",
      ES: "Transparencia",
      IT: "Trasparenza",
      PT: "Transparência",
      RO: "Transparență"
    },
    transparencyDesc: {
      FR: "Nous croyons en une communication claire et honnête avec nos clients, en présentant les caractéristiques et l'historique de chaque véhicule de manière transparente.",
      EN: "We believe in clear and honest communication with our customers, presenting the characteristics and history of each vehicle in a transparent manner.",
      ES: "Creemos en una comunicación clara y honesta con nuestros clientes, presentando las características y la historia de cada vehículo de manera transparente.",
      IT: "Crediamo in una comunicazione chiara e onesta con i nostri clienti, presentando le caratteristiche e la storia di ogni veicolo in modo trasparente.",
      PT: "Acreditamos em uma comunicação clara e honesta com nossos clientes, apresentando as características e o histórico de cada veículo de maneira transparente.",
      RO: "Credem într-o comunicare clară și onestă cu clienții noștri, prezentând caracteristicile și istoricul fiecărui vehicul într-o manieră transparentă."
    },
    ourJourney: {
      FR: "Notre parcours",
      EN: "Our journey",
      ES: "Nuestro viaje",
      IT: "Il nostro percorso",
      PT: "Nossa jornada",
      RO: "Călătoria noastră"
    },
    journeyDescription: {
      FR: "Les moments clés qui ont façonné notre entreprise au fil des années.",
      EN: "The key moments that have shaped our company over the years.",
      ES: "Los momentos clave que han dado forma a nuestra empresa a lo largo de los años.",
      IT: "I momenti chiave che hanno plasmato la nostra azienda nel corso degli anni.",
      PT: "Os momentos-chave que moldaram nossa empresa ao longo dos anos.",
      RO: "Momentele cheie care ne-au modelat compania de-a lungul anilor."
    },
    // Add more translations for the timeline events
    joinAdventure: {
      FR: "Rejoignez l'aventure Auto Adi",
      EN: "Join the Auto Adi adventure",
      ES: "Únase a la aventura Auto Adi",
      IT: "Unisciti all'avventura Auto Adi",
      PT: "Junte-se à aventura Auto Adi",
      RO: "Alăturați-vă aventurii Auto Adi"
    },
    joinDescription: {
      FR: "Nous sommes toujours à la recherche de talents passionnés pour rejoindre notre équipe et contribuer à notre développement.",
      EN: "We are always looking for passionate talents to join our team and contribute to our development.",
      ES: "Siempre estamos buscando talentos apasionados para unirse a nuestro equipo y contribuir a nuestro desarrollo.",
      IT: "Siamo sempre alla ricerca di talenti appassionati per unirsi al nostro team e contribuire al nostro sviluppo.",
      PT: "Estamos sempre procurando talentos apaixonados para se juntar à nossa equipe e contribuir para o nosso desenvolvimento.",
      RO: "Suntem mereu în căutare de talente pasionate pentru a se alătura echipei noastre și a contribui la dezvoltarea noastră."
    },
    seeJobOffers: {
      FR: "Voir nos offres d'emploi",
      EN: "See our job offers",
      ES: "Ver nuestras ofertas de trabajo",
      IT: "Vedi le nostre offerte di lavoro",
      PT: "Ver nossas ofertas de emprego",
      RO: "Vedeți ofertele noastre de muncă"
    },
    // Timeline events
    foundingTitle: {
      FR: "Création d'Auto Adi",
      EN: "Creation of Auto Adi",
      ES: "Creación de Auto Adi",
      IT: "Creazione di Auto Adi",
      PT: "Criação da Auto Adi",
      RO: "Crearea Auto Adi"
    },
    foundingDesc: {
      FR: "Ouverture du premier garage à Florence, Italie, spécialisé dans la vente de véhicules d'occasion.",
      EN: "Opening of the first garage in Florence, Italy, specializing in the sale of used vehicles.",
      ES: "Apertura del primer garaje en Florencia, Italia, especializado en la venta de vehículos usados.",
      IT: "Apertura del primo garage a Firenze, Italia, specializzato nella vendita di veicoli usati.",
      PT: "Abertura da primeira garagem em Florença, Itália, especializada na venda de veículos usados.",
      RO: "Deschiderea primului garaj din Florența, Italia, specializat în vânzarea de vehicule second-hand."
    },
    expansionTitle: {
      FR: "Expansion en Roumanie",
      EN: "Expansion to Romania",
      ES: "Expansión a Rumania",
      IT: "Espansione in Romania",
      PT: "Expansão para a Romênia",
      RO: "Expansiune în România"
    },
    expansionDesc: {
      FR: "Ouverture de notre première concession internationale à Bucarest et développement sur le marché roumain.",
      EN: "Opening of our first international dealership in Bucharest and development in the Romanian market.",
      ES: "Apertura de nuestra primera concesión internacional en Bucarest y desarrollo en el mercado rumano.",
      IT: "Apertura della nostra prima concessionaria internazionale a Bucarest e sviluppo nel mercado rumeno.",
      PT: "Abertura da nossa primeira concessionária internacional em Bucareste e desenvolvimento no mercado romeno.",
      RO: "Deschiderea primei noastre reprezentanțe internaționale în București și dezvoltarea pe piața românească."
    },
    paymentTitle: {
      FR: "Lancement du paiement échelonné",
      EN: "Launch of installment payment",
      ES: "Lanzamiento del pago a plazos",
      IT: "Lancio del pagamento a rate",
      PT: "Lançamento do pagamento parcelado",
      RO: "Lansarea plății în rate"
    },
    paymentDesc: {
      FR: "Introduction de notre solution de financement sans frais qui a révolutionné l'achat automobile.",
      EN: "Introduction of our fee-free financing solution that has revolutionized car buying.",
      ES: "Introducción de nuestra solución de financiación sin comisiones que ha revolucionado la compra de coches.",
      IT: "Introduzione della nostra soluzione di finanziamento senza commissioni che ha rivoluzionato l'acquisto di auto.",
      PT: "Introdução da nossa solução de financiamento sem taxas que revolucionou a compra de carros.",
      RO: "Introducerea soluției noastre de finanțare fără comisioane care a revoluționat cumpărarea de mașini."
    },
    digitalTitle: {
      FR: "Digitalisation et projets d'expansion",
      EN: "Digitalization and expansion projects",
      ES: "Digitalización y proyectos de expansión",
      IT: "Digitalizzazione e progetti di espansione",
      PT: "Digitalização e projetos de expansão",
      RO: "Digitalizare și proiecte de expansiune"
    },
    digitalDesc: {
      FR: "Lancement de notre plateforme en ligne et préparation pour l'expansion en Espagne, au Portugal et en France.",
      EN: "Launch of our online platform and preparation for expansion in Spain, Portugal and France.",
      ES: "Lanzamiento de nuestra plataforma en línea y preparación para la expansión en España, Portugal y Francia.",
      IT: "Lancio della nostra piattaforma online e preparazione per l'espansione in Spagna, Portogallo e Francia.",
      PT: "Lançamento da nossa plataforma online e preparação para expansão na Espanha, Portugal e França.",
      RO: "Lansarea platformei noastre online și pregătirea pentru extinderea în Spania, Portugalia și Franța."
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{translate('aboutTitle', translations.aboutTitle)}</h1>
              <p className="text-xl mb-8">
                {translate('aboutDescription', translations.aboutDescription)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                    {translate('contactUs', translations.contactUs)}
                  </Button>
                </Link>
                <Link to="/vehicules/occasion">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    {translate('seeVehicles', translations.seeVehicles)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{translate('ourStory', translations.ourStory)}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {translate('storyParagraph1', translations.storyParagraph1)}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  {translate('storyParagraph2', translations.storyParagraph2)}
                </p>
                <p className="text-lg text-gray-600">
                  {translate('storyParagraph3', translations.storyParagraph3)}
                </p>
              </div>
              
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Auto Adi histoire" 
                  className="rounded-lg shadow-lg"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-4xl font-bold text-brand-blue">20+</h3>
                    <p className="text-gray-600 mt-2">{translate('yearsExperience', translations.yearsExperience)}</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-4xl font-bold text-brand-blue">15 000+</h3>
                    <p className="text-gray-600 mt-2">{translate('satisfiedCustomers', translations.satisfiedCustomers)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{translate('ourValues', translations.ourValues)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('valuesDescription', translations.valuesDescription)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate('customerProximity', translations.customerProximity)}</h3>
                  <p className="text-gray-600">
                    {translate('customerProximityDesc', translations.customerProximityDesc)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Award className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate('excellence', translations.excellence)}</h3>
                  <p className="text-gray-600">
                    {translate('excellenceDesc', translations.excellenceDesc)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Check className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate('transparency', translations.transparency)}</h3>
                  <p className="text-gray-600">
                    {translate('transparencyDesc', translations.transparencyDesc)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{translate('ourJourney', translations.ourJourney)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('journeyDescription', translations.journeyDescription)}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="hidden md:block absolute left-[100px] top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>
                
                {/* Timeline */}
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2002</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{translate('foundingTitle', translations.foundingTitle)}</h3>
                          <p className="text-gray-600">
                            {translate('foundingDesc', translations.foundingDesc)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2010</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{translate('expansionTitle', translations.expansionTitle)}</h3>
                          <p className="text-gray-600">
                            {translate('expansionDesc', translations.expansionDesc)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2016</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{translate('paymentTitle', translations.paymentTitle)}</h3>
                          <p className="text-gray-600">
                            {translate('paymentDesc', translations.paymentDesc)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2023</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">{translate('digitalTitle', translations.digitalTitle)}</h3>
                          <p className="text-gray-600">
                            {translate('digitalDesc', translations.digitalDesc)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{translate('joinAdventure', translations.joinAdventure)}</h2>
                <p className="text-xl mb-8">
                  {translate('joinDescription', translations.joinDescription)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                      {translate('seeJobOffers', translations.seeJobOffers)}
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                      {translate('contactUs', translations.contactUs)}
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" 
                  alt="Équipe Auto Adi" 
                  className="rounded-lg shadow-xl object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default APropos;
