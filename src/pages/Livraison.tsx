import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plane, Package, MapPin, FileText, Clock, ShieldCheck, Globe, Truck, Ship } from 'lucide-react';

const Livraison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Livraison internationale de véhicules</h1>
              <p className="text-xl mb-8">Notre service de livraison internationale vous permet d'acquérir votre véhicule où que vous soyez en Europe.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold">
                    Demander un devis
                  </Button>
                </Link>
                <a href="tel:+33123456789">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    Nous appeler
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
                <h2 className="text-3xl font-bold mb-6">Un service clé en main partout en Europe</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Nous prenons en charge toutes les démarches administratives, douanières et logistiques pour vous livrer votre véhicule dans les meilleures conditions, quelle que soit votre localisation en Europe.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Notre service de livraison internationale a été spécialement conçu pour faciliter l'acquisition de votre véhicule sans les contraintes habituelles liées à l'importation. Que vous soyez un particulier ou un professionnel, nous gérons l'intégralité du processus.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Nous travaillons avec un réseau de transporteurs spécialisés et certifiés qui garantissent la sécurité et l'intégrité de votre véhicule pendant tout le trajet.
                </p>
                
                <h3 className="text-2xl font-bold mb-4 mt-8">Nos garanties</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Livraison sécurisée dans toute l'Europe</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Assurance transport complète incluse</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Inspection complète du véhicule avant expédition</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Suivi en temps réel de votre livraison</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">Documentation complète pour les démarches administratives</p>
                  </li>
                </ul>
              </div>
              
              {/* Right Column - Process Cards */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Notre processus de livraison</h3>
                
                <div className="space-y-6">
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FileText className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-xl font-bold">1. Préparation du dossier</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous constituons un dossier complet avec tous les documents nécessaires pour l'exportation du véhicule.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Package className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-xl font-bold">2. Inspection et préparation</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous effectuons une inspection complète du véhicule, le préparons pour le transport et documentons son état par des photos.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Truck className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-xl font-bold">3. Transport sécurisé</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous confions votre véhicule à nos transporteurs spécialisés qui l'acheminent jusqu'à la destination finale.
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-xl font-bold">4. Livraison et inspection finale</h4>
                    </div>
                    <p className="text-gray-700">
                      Nous livrons votre véhicule à l'adresse indiquée et procédons à une inspection finale avec vous pour vérifier son état.
                    </p>
                  </div>
                </div>
                
                <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-bold mb-4">Options de transport</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">Transport standard par camion porte-voitures</span>
                    </li>
                    <li className="flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">Transport premium en camion fermé</span>
                    </li>
                    <li className="flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">Livraison express avec chauffeur privé</span>
                    </li>
                    <li className="flex items-center">
                      <Globe className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">Transport maritime pour destinations hors Europe</span>
                    </li>
                  </ul>
                  <Link to="/contact">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Demander un devis personnalisé
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Destinations de livraison</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Road Transport Section */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-500 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center">
                    <Truck className="h-8 w-8 mr-3" /> Transport routier
                  </h3>
                  <p className="text-blue-100">Livraison fiable par camion à travers l'Europe</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">France</span>
                        <p className="text-sm text-gray-600">Délai: 1-3 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Allemagne, Belgique, Luxembourg</span>
                        <p className="text-sm text-gray-600">Délai: 2-4 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Espagne, Portugal</span>
                        <p className="text-sm text-gray-600">Délai: 3-5 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Europe de l'Est</span>
                        <p className="text-sm text-gray-600">Délai: 4-7 jours</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Maritime Transport Section */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-700 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center">
                    <Ship className="h-8 w-8 mr-3" /> Transport maritime
                  </h3>
                  <p className="text-blue-100">Expédition par voie maritime pour les longues distances</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Royaume-Uni, Irlande</span>
                        <p className="text-sm text-gray-600">Délai: 7-10 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Pays scandinaves</span>
                        <p className="text-sm text-gray-600">Délai: 8-12 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Afrique du Nord</span>
                        <p className="text-sm text-gray-600">Délai: 12-18 jours</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                      <div>
                        <span className="font-medium">Autres destinations</span>
                        <p className="text-sm text-gray-600">Contactez-nous pour un devis personnalisé</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Air Transport Section */}
            <h3 className="text-2xl font-bold text-center mb-6">Transport aérien express</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">France</h3>
                <p className="text-gray-600">Délai moyen: 2-3 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Allemagne</h3>
                <p className="text-gray-600">Délai moyen: 3-5 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Belgique</h3>
                <p className="text-gray-600">Délai moyen: 2-4 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Espagne</h3>
                <p className="text-gray-600">Délai moyen: 4-6 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Italie</h3>
                <p className="text-gray-600">Délai moyen: 4-6 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Suisse</h3>
                <p className="text-gray-600">Délai moyen: 3-5 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Royaume-Uni</h3>
                <p className="text-gray-600">Délai moyen: 5-7 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Portugal</h3>
                <p className="text-gray-600">Délai moyen: 4-6 jours</p>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <Plane className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Autres pays</h3>
                <p className="text-gray-600">Contactez-nous pour plus d'informations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ils nous ont fait confiance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold text-xl">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jean Dupont</h4>
                    <p className="text-gray-600">Zurich, Suisse</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "J'ai acheté une Mercedes CLA depuis la France et elle a été livrée en Suisse en parfait état. Toutes les démarches douanières ont été prises en charge. Service impeccable !"
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold text-xl">MM</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Maria Müller</h4>
                    <p className="text-gray-600">Berlin, Allemagne</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Livraison rapide et sérieuse de mon Audi Q5. Le suivi en temps réel m'a permis d'être informée à chaque étape. Je recommande vivement."
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-500 font-bold text-xl">AR</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Antonio Rodriguez</h4>
                    <p className="text-gray-600">Barcelone, Espagne</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Service premium avec la livraison en camion fermé. Le véhicule est arrivé en parfait état et toute la documentation était prête pour l'immatriculation en Espagne."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-500 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Votre véhicule livré où que vous soyez</h2>
              <p className="text-xl mb-8">
                Bénéficiez de notre service de livraison internationale clé en main et recevez votre véhicule en toute sécurité.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    Demander un devis
                  </Button>
                </Link>
                <Link to="/vehicules">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    Voir nos véhicules
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

export default Livraison;
