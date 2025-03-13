
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')" 
        }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trouvez la voiture parfaite pour vous
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Des milliers de véhicules neufs et d'occasion vérifiés et garantis
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/vehicules/neufs">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg">
                Véhicules neufs
              </Button>
            </Link>
            <Link to="/vehicules/occasion">
              <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg">
                Véhicules d'occasion
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick search section */}
      <div className="container mx-auto px-4 relative z-10 -mb-16">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Recherche rapide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Marque</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="citroen">Citroën</option>
                  <option value="peugeot">Peugeot</option>
                  <option value="renault">Renault</option>
                  <option value="toyota">Toyota</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Modèle</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="break">Break</option>
                  <option value="citadine">Citadine</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Budget max</option>
                  <option value="10000">10 000 €</option>
                  <option value="15000">15 000 €</option>
                  <option value="20000">20 000 €</option>
                  <option value="30000">30 000 €</option>
                  <option value="50000">50 000 €</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  defaultValue=""
                >
                  <option value="" disabled>Énergie</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                </select>
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <Button 
                className="bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full md:w-auto px-8 py-5 rounded-md text-white font-semibold flex items-center justify-center"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
