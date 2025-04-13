
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Headset, Clock, User, Car, Calendar, ShieldCheck, Clock3, Award } from 'lucide-react';

const ServicePremium = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-amber-500 to-amber-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Service client premium</h1>
              <p className="text-xl mb-8">Une expérience automobile d'exception avec un accompagnement personnalisé à chaque étape de votre projet.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-amber-600 hover:bg-gray-100 text-lg font-semibold">
                    Devenir client premium
                  </Button>
                </Link>
                <a href="tel:+33123456789">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    Ligne dédiée premium
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Main Description */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Un accompagnement personnalisé de A à Z</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Dès votre premier contact, un conseiller dédié prend en charge votre dossier et reste votre interlocuteur unique tout au long de votre projet. Disponible sur rendez-vous en dehors des heures d'ouverture, il vous garantit un suivi privilégié.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Notre service premium a été conçu pour les clients exigeants qui souhaitent bénéficier d'une attention particulière et d'un service sur-mesure. Nous nous adaptons à vos contraintes et vous proposons des solutions personnalisées.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Que ce soit pour l'achat d'un véhicule, son entretien ou sa revente, notre équipe de conseillers d'élite s'occupe de tout et vous fait gagner un temps précieux.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 mt-8">Les avantages exclusifs</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <User className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Conseiller personnel attitré disponible 6j/7</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Rendez-vous prioritaires et horaires étendus</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Car className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Véhicule de remplacement haut de gamme</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Invitations exclusives aux événements de la marque</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Assistance prioritaire en cas de problème</p>
                  </li>
                </ul>
              </div>
              
              {/* Right Column - Service Cards */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Nos services premium</h3>
                
                <div className="space-y-6">
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-amber-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Headset className="h-6 w-6 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-bold">Conciergerie automobile</h4>
                    </div>
                    <p className="text-gray-700">
                      Notre service de conciergerie s'occupe de toutes vos démarches administratives liées à votre véhicule : carte grise, assurance, contrôle technique, etc.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-amber-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Car className="h-6 w-6 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-bold">Prise en charge et livraison</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous récupérons votre véhicule à votre domicile ou votre lieu de travail pour l'entretien et vous le restituons une fois les travaux terminés.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-amber-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Calendar className="h-6 w-6 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-bold">Planification d'entretien</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous gérons le calendrier d'entretien de votre véhicule et vous contactons proactivement pour planifier les interventions nécessaires.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-amber-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <Clock3 className="h-6 w-6 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-bold">Service d'urgence 24/7</h4>
                    </div>
                    <p className="text-gray-700">
                      Une ligne téléphonique dédiée aux clients premium est disponible 24h/24 et 7j/7 en cas d'urgence, avec intervention prioritaire.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="text-xl font-bold mb-4">Forfaits premium</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Essential</span>
                      <span className="text-amber-600 font-bold">49€/mois</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Business</span>
                      <span className="text-amber-600 font-bold">89€/mois</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Elite</span>
                      <span className="text-amber-600 font-bold">149€/mois</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link to="/contact">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                        Demander une présentation détaillée
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos clients premium</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-8 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-xl">"</span>
                </div>
                <p className="text-gray-700 italic mb-6 pt-4">
                  "En tant que chef d'entreprise, mon temps est précieux. Le service premium me permet de déléguer toute la gestion de ma flotte de véhicules. Un gain de temps considérable !"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">PM</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Pierre Martin</h4>
                    <p className="text-gray-600">PDG, Entreprise de logistique</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-8 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-xl">"</span>
                </div>
                <p className="text-gray-700 italic mb-6 pt-4">
                  "J'apprécie particulièrement le service de prise en charge à domicile. Mon conseiller personnel connaît parfaitement mes véhicules et mes préférences."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">SL</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sophie Laurent</h4>
                    <p className="text-gray-600">Avocate</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-8 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-xl">"</span>
                </div>
                <p className="text-gray-700 italic mb-6 pt-4">
                  "La qualité d'accueil et le salon VIP réservé aux membres premium font toute la différence. On se sent vraiment privilégié."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">TD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Thomas Dubois</h4>
                    <p className="text-gray-600">Directeur commercial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-500 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Rejoignez notre cercle de clients privilégiés</h2>
              <p className="text-xl mb-8">
                Découvrez une nouvelle façon de vivre l'automobile avec un service exclusif et personnalisé.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-amber-600 hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    Devenir client premium
                  </Button>
                </Link>
                <a href="tel:+33123456789">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    Nous appeler
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePremium;
