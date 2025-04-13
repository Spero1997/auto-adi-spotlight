
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Calendar, Car, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Garantie = () => {
  const { translate } = useLanguage();
  
  const translations = {
    warrantyService: {
      FR: "Service de garantie constructeur",
      EN: "Manufacturer warranty service",
      ES: "Servicio de garantía del fabricante",
      IT: "Servizio di garanzia del produttore",
      PT: "Serviço de garantia do fabricante",
      RO: "Serviciu de garanție producător"
    },
    warrantyIntro: {
      FR: "Maintenez la garantie de votre véhicule tout en bénéficiant de notre expertise et de nos tarifs avantageux.",
      EN: "Maintain your vehicle warranty while benefiting from our expertise and competitive rates.",
      ES: "Mantenga la garantía de su vehículo mientras se beneficia de nuestra experiencia y tarifas competitivas.",
      IT: "Mantieni la garanzia del tuo veicolo beneficiando della nostra esperienza e delle nostre tariffe competitive.",
      PT: "Mantenha a garantia do seu veículo enquanto beneficia da nossa experiência e preços competitivos.",
      RO: "Mențineți garanția vehiculului dvs. beneficiind de expertiza noastră și de tarifele noastre competitive."
    },
    scheduleAppointment: {
      FR: "Prendre rendez-vous",
      EN: "Schedule an appointment",
      ES: "Programar una cita",
      IT: "Fissare un appuntamento",
      PT: "Agendar uma consulta",
      RO: "Programează o întâlnire"
    },
    callUs: {
      FR: "Nous appeler",
      EN: "Call us",
      ES: "Llámanos",
      IT: "Chiamaci",
      PT: "Ligue-nos",
      RO: "Sunați-ne"
    },
    
    whyChooseUs: {
      FR: "Pourquoi choisir notre service de garantie constructeur ?",
      EN: "Why choose our manufacturer warranty service?",
      ES: "¿Por qué elegir nuestro servicio de garantía de fabricante?",
      IT: "Perché scegliere il nostro servizio di garanzia del produttore?",
      PT: "Por que escolher o nosso serviço de garantia do fabricante?",
      RO: "De ce să alegeți serviciul nostru de garanție producător?"
    },
    commitments: {
      FR: "Nos engagements",
      EN: "Our commitments",
      ES: "Nuestros compromisos",
      IT: "I nostri impegni",
      PT: "Nossos compromissos",
      RO: "Angajamentele noastre"
    },
    serviceProcess: {
      FR: "Notre processus de service",
      EN: "Our service process",
      ES: "Nuestro proceso de servicio",
      IT: "Il nostro processo di servizio",
      PT: "Nosso processo de serviço",
      RO: "Procesul nostru de servicii"
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
        <section className="relative bg-gradient-to-b from-green-500 to-green-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          <div className="relative container mx-auto px-4 z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 animate-fade-in">{translate('warrantyService', translations.warrantyService)}</h1>
              <p className="text-xl mb-8 opacity-90 animate-fade-in animation-delay-300">{translate('warrantyIntro', translations.warrantyIntro)}</p>
              <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg font-semibold group">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>{translate('scheduleAppointment', translations.scheduleAppointment)}</span>
                  </Button>
                </Link>
                <a href="tel:+33123456789">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold group">
                    <span>{translate('callUs', translations.callUs)}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-playfair font-bold mb-6">{translate('whyChooseUs', translations.whyChooseUs)}</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Notre atelier agréé utilise exclusivement des pièces d'origine et respecte scrupuleusement les recommandations du constructeur pour chaque intervention. Vous conservez ainsi tous les avantages de votre garantie tout en bénéficiant de nos tarifs avantageux.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  La loi permet aux automobilistes de faire entretenir leur véhicule sous garantie dans le garage de leur choix sans perdre le bénéfice de cette garantie, à condition que les opérations soient effectuées selon les préconisations du constructeur.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Notre équipe de techniciens certifiés possède toutes les accréditations nécessaires et utilise les mêmes outils de diagnostic que les concessionnaires officiels.
                </p>
                
                <h3 className="text-2xl font-bold mb-6 mt-10">{translate('commitments', translations.commitments)}</h3>
                <ul className="space-y-5">
                  <li className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-gray-700">Utilisation exclusive de pièces d'origine certifiées</p>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-gray-700">Respect strict du carnet d'entretien constructeur</p>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-gray-700">Documentation complète dans votre carnet d'entretien</p>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-gray-700">Équipements de diagnostic identiques à ceux des concessionnaires</p>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-gray-700">Mise à jour des logiciels embarqués incluse</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-playfair font-bold mb-8">{translate('serviceProcess', translations.serviceProcess)}</h3>
                
                <div className="space-y-6">
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Calendar className="h-6 w-6 text-green-500" />
                      </div>
                      <h4 className="text-xl font-bold">1. Prise de rendez-vous</h4>
                    </div>
                    <p className="text-gray-700">
                      Réservez facilement en ligne ou par téléphone. Nous vous proposerons un créneau adapté à vos disponibilités.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Car className="h-6 w-6 text-green-500" />
                      </div>
                      <h4 className="text-xl font-bold">2. Diagnostic initial</h4>
                    </div>
                    <p className="text-gray-700">
                      À votre arrivée, nous effectuons un examen complet de votre véhicule et consultons son historique d'entretien.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Wrench className="h-6 w-6 text-green-500" />
                      </div>
                      <h4 className="text-xl font-bold">3. Intervention selon les standards</h4>
                    </div>
                    <p className="text-gray-700">
                      Nos techniciens réalisent toutes les opérations conformément aux spécifications du constructeur.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <ShieldCheck className="h-6 w-6 text-green-500" />
                      </div>
                      <h4 className="text-xl font-bold">4. Documentation et livraison</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous mettons à jour votre carnet d'entretien et vous fournissons un rapport détaillé des interventions effectuées.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border border-green-200 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Garantie de satisfaction</h3>
                  <p className="text-gray-700 mb-6">
                    Tous nos services d'entretien sous garantie constructeur sont eux-mêmes garantis pendant 12 mois. Si vous rencontrez le moindre problème, nous intervenons gratuitement.
                  </p>
                  <Link to="/rendez-vous">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Prendre rendez-vous maintenant
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center mb-10">Questions fréquentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Est-ce que je perds ma garantie constructeur si je viens chez vous ?</h3>
                <p className="text-gray-700">
                  Non, absolument pas. La loi (règlement européen n° 461/2010) garantit votre droit de faire entretenir votre véhicule dans le garage de votre choix sans perdre la garantie constructeur, tant que nous respectons les procédures préconisées, ce que nous faisons scrupuleusement.
                </p>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Utilisez-vous des pièces d'origine ?</h3>
                <p className="text-gray-700">
                  Oui, nous n'utilisons que des pièces d'origine certifiées pour tous les véhicules sous garantie constructeur, assurant ainsi la qualité et la durabilité de nos réparations.
                </p>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Quels sont vos avantages par rapport au concessionnaire ?</h3>
                <p className="text-gray-700">
                  Nous offrons des tarifs plus compétitifs, des délais de rendez-vous plus courts et un service plus personnalisé, tout en maintenant le même niveau de qualité technique que les concessionnaires.
                </p>
              </div>
              
              <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Comment prendre rendez-vous ?</h3>
                <p className="text-gray-700">
                  Vous pouvez prendre rendez-vous en ligne via notre site web, par téléphone au 01.23.45.67.89 ou directement à notre atelier. Nous vous confirmerons rapidement votre créneau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-playfair font-bold mb-6">{translate('warrantyService', translations.warrantyService)}</h2>
              <p className="text-xl mb-8">
                {translate('warrantyIntro', translations.warrantyIntro)}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg font-semibold px-8 py-3 group">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>{translate('scheduleAppointment', translations.scheduleAppointment)}</span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    <span>{translate('contactUs', translations.contactUs)}</span>
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

export default Garantie;
