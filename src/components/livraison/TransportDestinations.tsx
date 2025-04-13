
import { Truck, Ship, Plane, Clock } from 'lucide-react';

const TransportDestinations = () => {
  return (
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
  );
};

export default TransportDestinations;
