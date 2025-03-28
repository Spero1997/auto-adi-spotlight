
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Shield, Zap, Award, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

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
    heroSubtitle: {
      FR: "Le moyen le plus simple d'obtenir la voiture de vos rêves",
      EN: "The easiest way to get the car of your dreams",
      ES: "La forma más fácil de conseguir el coche de sus sueños",
      IT: "Il modo più semplice per ottenere l'auto dei tuoi sogni",
      PT: "A maneira mais fácil de obter o carro dos seus sonhos",
      RO: "Cel mai simplu mod de a obține mașina visurilor tale"
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
    
    navigate(`/vehicules/occasion?${searchParams.toString()}`);
  };

  return (
    <section className="pt-24 md:pt-32">
      {/* Hero section with a grid layout for desktop */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8 md:py-16">
        {/* Left column - Text content */}
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {translate('heroTitle', translations.heroTitle)}
          </h1>
          <p className="mt-4 md:mt-6 text-xl md:text-2xl text-gray-700">
            {translate('heroSubtitle', translations.heroSubtitle)}
          </p>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            {translate('heroDescription', translations.heroDescription)}
          </p>
          
          {/* Features list */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-700">{translate('features.safety', translations.features.safety)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-700">{translate('features.performance', translations.features.performance)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-700">{translate('features.quality', translations.features.quality)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-brand-blue" />
              <span className="text-gray-700">{translate('features.warranty', translations.features.warranty)}</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-brand-blue hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-lg"
              onClick={() => navigate('/vehicules/occasion')}
            >
              {translate('usedVehicles', translations.usedVehicles)}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold text-lg"
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>
          </div>
        </div>
        
        {/* Right column - Hero image */}
        <div className="order-1 md:order-2 relative">
          <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-xl">
            <img 
              src="/lovable-uploads/b0b6f649-3ce2-455a-99e9-189b91475576.png" 
              alt="Luxury car" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
            
            {/* Floating badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-blue px-3 py-1 rounded-full font-medium text-sm shadow-lg">
              Premium
            </div>
          </div>
          
          {/* Floating stats cards */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
            <div className="text-3xl font-bold text-brand-blue">1500+</div>
            <div className="text-sm text-gray-600">Véhicules disponibles</div>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
            <div className="text-3xl font-bold text-brand-orange">98%</div>
            <div className="text-sm text-gray-600">Clients satisfaits</div>
          </div>
        </div>
      </div>
      
      {/* Quick search section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 -mt-16 relative z-10">
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
    </section>
  );
};

export default Hero;
