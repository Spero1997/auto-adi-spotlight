
import { Search, ChevronRight, Shield, Zap, Award, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Hero = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  // Traductions pour l'interface du Hero
  const translations = {
    heroTitle: {
      FR: "Trouvez la voiture parfaite pour vous",
      EN: "Find the perfect car for you",
      ES: "Encuentre el coche perfecto para usted",
      IT: "Trova l'auto perfetta per te",
      PT: "Encontre o carro perfeito para você",
      RO: "Găsiți mașina perfectă pentru dvs."
    },
    heroDescription: {
      FR: "Des milliers de véhicules d'occasion vérifiés et garantis",
      EN: "Thousands of verified and guaranteed used vehicles",
      ES: "Miles de vehículos usados verificados y garantizados",
      IT: "Migliaia di veicoli usati verificati e garantiti",
      PT: "Milhares de veículos usados verificados e garantidos",
      RO: "Mii de vehicule second-hand verificate și garantate"
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand"
    },
    quickSearch: {
      FR: "Recherche rapide",
      EN: "Quick search",
      ES: "Búsqueda rápida",
      IT: "Ricerca rapida",
      PT: "Pesquisa rápida",
      RO: "Căutare rapidă"
    },
    brand: {
      FR: "Marque",
      EN: "Brand",
      ES: "Marca",
      IT: "Marca",
      PT: "Marca",
      RO: "Marcă"
    },
    model: {
      FR: "Modèle",
      EN: "Model",
      ES: "Modelo",
      IT: "Modello",
      PT: "Modelo",
      RO: "Model"
    },
    maxBudget: {
      FR: "Budget max",
      EN: "Max budget",
      ES: "Presupuesto máx",
      IT: "Budget massimo",
      PT: "Orçamento máx",
      RO: "Buget maxim"
    },
    fuel: {
      FR: "Énergie",
      EN: "Fuel",
      ES: "Combustible",
      IT: "Carburante",
      PT: "Combustível",
      RO: "Combustibil"
    },
    search: {
      FR: "Rechercher",
      EN: "Search",
      ES: "Buscar",
      IT: "Cerca",
      PT: "Pesquisar",
      RO: "Căutare"
    },
    features: {
      performance: {
        FR: "Performance",
        EN: "Performance",
        ES: "Rendimiento",
        IT: "Prestazioni",
        PT: "Desempenho",
        RO: "Performanță"
      },
      safety: {
        FR: "Sécurité",
        EN: "Safety",
        ES: "Seguridad",
        IT: "Sicurezza",
        PT: "Segurança",
        RO: "Siguranță"
      },
      warranty: {
        FR: "Garantie",
        EN: "Warranty",
        ES: "Garantía",
        IT: "Garanzia",
        PT: "Garantia",
        RO: "Garanție"
      },
      quality: {
        FR: "Qualité",
        EN: "Quality",
        ES: "Calidad",
        IT: "Qualità",
        PT: "Qualidade",
        RO: "Calitate"
      }
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (selectedBrand) searchParams.append('marque', selectedBrand);
    if (selectedModel) searchParams.append('modele', selectedModel);
    if (selectedBudget) searchParams.append('budget', selectedBudget);
    if (selectedFuel) searchParams.append('energie', selectedFuel);
    
    console.log('Hero Search initiated with params:', {
      brand: selectedBrand,
      model: selectedModel,
      budget: selectedBudget,
      fuel: selectedFuel
    });
    
    // Correction: Navigate to the vehicules/occasion page with parameters
    navigate(`/vehicules/occasion?${searchParams.toString()}`);
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden py-12">
      {/* Background image with enhanced overlay for better text contrast */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
          filter: "brightness(0.6) contrast(1.1)"
        }}
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            {translate('heroTitle', translations.heroTitle)}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100 drop-shadow">
            {translate('heroDescription', translations.heroDescription)}
          </p>
          
          {/* Key features with icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <Zap className="h-5 w-5 text-brand-orange" />
              <span>{translate('features.performance', translations.features.performance)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <Shield className="h-5 w-5 text-brand-orange" />
              <span>{translate('features.safety', translations.features.safety)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <Award className="h-5 w-5 text-brand-orange" />
              <span>{translate('features.quality', translations.features.quality)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <DollarSign className="h-5 w-5 text-brand-orange" />
              <span>{translate('features.warranty', translations.features.warranty)}</span>
            </div>
          </div>
          
          {/* Call to action button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/vehicules/occasion">
              <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg shadow-lg">
                {translate('usedVehicles', translations.usedVehicles)}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick search section - moved up by adjusting the margin */}
      <div className="container mx-auto px-4 relative z-10 -mt-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{translate('quickSearch', translations.quickSearch)}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">{translate('brand', translations.brand)}</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="citroen">Citroën</option>
                  <option value="peugeot">Peugeot</option>
                  <option value="renault">Renault</option>
                  <option value="toyota">Toyota</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">{translate('model', translations.model)}</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="break">Break</option>
                  <option value="citadine">Citadine</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                >
                  <option value="">{translate('maxBudget', translations.maxBudget)}</option>
                  <option value="10000">10 000 €</option>
                  <option value="15000">15 000 €</option>
                  <option value="20000">20 000 €</option>
                  <option value="30000">30 000 €</option>
                  <option value="50000">50 000 €</option>
                </select>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                >
                  <option value="">{translate('fuel', translations.fuel)}</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                </select>
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <Button 
                className="bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full md:w-auto px-8 py-5 rounded-md text-white font-semibold flex items-center justify-center shadow-lg"
                size="lg"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                {translate('search', translations.search)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
