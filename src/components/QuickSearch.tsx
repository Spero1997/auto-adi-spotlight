import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

type QuickSearchProps = {
  insideHero?: boolean;
};

const QuickSearch = ({ insideHero = false }: QuickSearchProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { language, translate } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const brandModels: Record<string, string[]> = {
    audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'],
    bmw: ['Série 1', 'Série 2', 'Série 3', 'Série 4', 'Série 5', 'Série 6', 'Série 7', 'X1', 'X3', 'X5', 'X6', 'Z4', 'M2', 'M3', 'M4', 'M5'],
    citroen: ['C1', 'C3', 'C4', 'C5', 'Berlingo', 'C3 Aircross', 'C4 Cactus', 'C5 Aircross', 'SpaceTourer', 'C-Elysée'],
    dacia: ['Sandero', 'Duster', 'Logan', 'Spring', 'Jogger'],
    fiat: ['500', 'Panda', 'Tipo', '500X', '500L'],
    ford: ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Puma', 'Mustang', 'Ranger', 'Transit'],
    honda: ['Civic', 'Jazz', 'CR-V', 'HR-V', 'e'],
    hyundai: ['i10', 'i20', 'i30', 'Tucson', 'Kona', 'Santa Fe', 'IONIQ'],
    kia: ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Niro', 'Stonic', 'Sorento'],
    mazda: ['2', '3', '6', 'CX-3', 'CX-5', 'CX-30', 'MX-5'],
    mercedes: ['Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 'GLA', 'GLC', 'GLE', 'CLA', 'AMG GT'],
    mini: ['Cooper', 'Countryman', 'Clubman', 'Cabrio'],
    nissan: ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Navara'],
    opel: ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland'],
    peugeot: ['108', '208', '308', '508', '2008', '3008', '5008', 'Rifter', 'Partner', 'Traveller'],
    renault: ['Clio', 'Captur', 'Megane', 'Kadjar', 'Scenic', 'Talisman', 'Twingo', 'Kangoo', 'Zoe', 'Arkana'],
    seat: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco', 'Alhambra'],
    skoda: ['Fabia', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Scala'],
    smart: ['Fortwo', 'Forfour'],
    tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
    toyota: ['Aygo', 'Yaris', 'Corolla', 'C-HR', 'RAV4', 'Prius', 'Land Cruiser', 'Camry', 'Supra'],
    volkswagen: ['Polo', 'Golf', 'Passat', 'Tiguan', 'T-Roc', 'T-Cross', 'Touran', 'Arteon', 'ID.3', 'ID.4'],
    volvo: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'],
  };

  const translations = {
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
    selectBrandFirst: {
      FR: "Sélectionnez une marque d'abord",
      EN: "Select a brand first",
      ES: "Seleccione una marca primero",
      IT: "Seleziona prima una marca",
      PT: "Selecione uma marca primeiro",
      RO: "Selectați mai întâi o marcă"
    },
    petrol: {
      FR: "Essence",
      EN: "Petrol",
      ES: "Gasolina",
      IT: "Benzina",
      PT: "Gasolina",
      RO: "Benzină"
    },
    diesel: {
      FR: "Diesel",
      EN: "Diesel",
      ES: "Diesel",
      IT: "Diesel",
      PT: "Diesel",
      RO: "Diesel"
    },
    hybrid: {
      FR: "Hybride",
      EN: "Hybrid",
      ES: "Híbrido",
      IT: "Ibrido",
      PT: "Híbrido",
      RO: "Hibrid"
    },
    electric: {
      FR: "Électrique",
      EN: "Electric",
      ES: "Eléctrico",
      IT: "Elettrico",
      PT: "Elétrico",
      RO: "Electric"
    },
    searchWarning: {
      FR: "Veuillez sélectionner au moins un critère de recherche",
      EN: "Please select at least one search criteria",
      ES: "Por favor, seleccione al menos un criterio de búsqueda",
      IT: "Si prega di selezionare almeno un criterio di ricerca",
      PT: "Por favor, selecione pelo menos um critério de pesquisa",
      RO: "Vă rugăm să selectați cel puțin un criteriu de căutare"
    },
    searchStarted: {
      FR: "Recherche lancée",
      EN: "Search started",
      ES: "Búsqueda iniciada",
      IT: "Ricerca avviata",
      PT: "Pesquisa iniciada",
      RO: "Căutare inițiată"
    },
    all: {
      FR: "Toutes",
      EN: "All",
      ES: "Todas",
      IT: "Tutte",
      PT: "Todas",
      RO: "Toate"
    }
  };

  useEffect(() => {
    if (selectedBrand && brandModels[selectedBrand]) {
      setAvailableModels(brandModels[selectedBrand]);
    } else {
      setAvailableModels([]);
    }
  }, [selectedBrand]);

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel(''); // Reset model when brand changes
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value);
  };

  const handleFuelChange = (value: string) => {
    setSelectedFuel(value);
  };

  const handleSearch = () => {
    if (!selectedBrand && !selectedModel && !selectedBudget && !selectedFuel) {
      toast.warning(translate('searchWarning', translations.searchWarning), {
        duration: 3000,
      });
      return;
    }
    
    const searchParams = new URLSearchParams();
    if (selectedBrand) searchParams.append('marque', selectedBrand);
    if (selectedModel) searchParams.append('modele', selectedModel);
    if (selectedBudget) searchParams.append('budget', selectedBudget);
    if (selectedFuel) searchParams.append('energie', selectedFuel);
    
    toast.success(translate('searchStarted', translations.searchStarted), {
      description: `${translate('brand', translations.brand)}: ${selectedBrand || translate('all', translations.all)}, ${translate('model', translations.model)}: ${selectedModel || translate('all', translations.all)}, ${translate('maxBudget', translations.maxBudget)}: ${selectedBudget ? selectedBudget + '€' : translate('all', translations.all)}, ${translate('fuel', translations.fuel)}: ${selectedFuel || translate('all', translations.all)}`,
      duration: 3000,
    });
    
    console.log('Search initiated with params:', {
      brand: selectedBrand,
      model: selectedModel,
      budget: selectedBudget,
      fuel: selectedFuel
    });
    
    navigate(`/vehicules/occasion?${searchParams.toString()}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'p-4' : 'p-6 md:p-8'} ${insideHero ? '' : '-mt-10 mb-16'}`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-4 text-gray-800`}>
            {translate('quickSearch', translations.quickSearch)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={handleBrandChange} value={selectedBrand}>
              <SelectTrigger className="w-full bg-white text-gray-800 border-gray-300 shadow-none">
                <SelectValue placeholder={translate('brand', translations.brand)} className="text-gray-800" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="audi" className="text-gray-800">Audi</SelectItem>
                <SelectItem value="bmw" className="text-gray-800">BMW</SelectItem>
                <SelectItem value="citroen" className="text-gray-800">Citroën</SelectItem>
                <SelectItem value="dacia" className="text-gray-800">Dacia</SelectItem>
                <SelectItem value="fiat" className="text-gray-800">Fiat</SelectItem>
                <SelectItem value="ford" className="text-gray-800">Ford</SelectItem>
                <SelectItem value="honda" className="text-gray-800">Honda</SelectItem>
                <SelectItem value="hyundai" className="text-gray-800">Hyundai</SelectItem>
                <SelectItem value="kia" className="text-gray-800">Kia</SelectItem>
                <SelectItem value="mazda" className="text-gray-800">Mazda</SelectItem>
                <SelectItem value="mercedes" className="text-gray-800">Mercedes</SelectItem>
                <SelectItem value="mini" className="text-gray-800">Mini</SelectItem>
                <SelectItem value="nissan" className="text-gray-800">Nissan</SelectItem>
                <SelectItem value="opel" className="text-gray-800">Opel</SelectItem>
                <SelectItem value="peugeot" className="text-gray-800">Peugeot</SelectItem>
                <SelectItem value="renault" className="text-gray-800">Renault</SelectItem>
                <SelectItem value="seat" className="text-gray-800">Seat</SelectItem>
                <SelectItem value="skoda" className="text-gray-800">Skoda</SelectItem>
                <SelectItem value="smart" className="text-gray-800">Smart</SelectItem>
                <SelectItem value="tesla" className="text-gray-800">Tesla</SelectItem>
                <SelectItem value="toyota" className="text-gray-800">Toyota</SelectItem>
                <SelectItem value="volkswagen" className="text-gray-800">Volkswagen</SelectItem>
                <SelectItem value="volvo" className="text-gray-800">Volvo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedModel} onValueChange={handleModelChange} disabled={!selectedBrand}>
              <SelectTrigger className="w-full bg-white text-gray-800 border-gray-300 shadow-none">
                <SelectValue placeholder={translate('model', translations.model)} className="text-gray-800" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {selectedBrand ? (
                  availableModels.map((model) => (
                    <SelectItem key={model} value={model.toLowerCase()} className="text-gray-800">
                      {model}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="brand-required" disabled className="text-gray-800">
                    {translate('selectBrandFirst', translations.selectBrandFirst)}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={handleBudgetChange}>
              <SelectTrigger className="w-full bg-white text-gray-800 border-gray-300 shadow-none">
                <SelectValue placeholder={translate('maxBudget', translations.maxBudget)} className="text-gray-800" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="3000" className="text-gray-800">3 000 €</SelectItem>
                <SelectItem value="5000" className="text-gray-800">5 000 €</SelectItem>
                <SelectItem value="10000" className="text-gray-800">10 000 €</SelectItem>
                <SelectItem value="15000" className="text-gray-800">15 000 €</SelectItem>
                <SelectItem value="20000" className="text-gray-800">20 000 €</SelectItem>
                <SelectItem value="30000" className="text-gray-800">30 000 €</SelectItem>
                <SelectItem value="50000" className="text-gray-800">50 000 €</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFuel} onValueChange={handleFuelChange}>
              <SelectTrigger className="w-full bg-white text-gray-800 border-gray-300 shadow-none">
                <SelectValue placeholder={translate('fuel', translations.fuel)} className="text-gray-800" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="essence" className="text-gray-800">{translate('petrol', translations.petrol)}</SelectItem>
                <SelectItem value="diesel" className="text-gray-800">{translate('diesel', translations.diesel)}</SelectItem>
                <SelectItem value="hybride" className="text-gray-800">{translate('hybrid', translations.hybrid)}</SelectItem>
                <SelectItem value="electrique" className="text-gray-800">{translate('electric', translations.electric)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <Button 
            className={`bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full md:w-auto ${isMobile ? 'px-6 py-4 text-sm' : 'px-8 py-5'} rounded-md text-white font-semibold flex items-center justify-center`}
            size={isMobile ? "default" : "lg"}
            onClick={handleSearch}
          >
            <Search className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
            {translate('search', translations.search)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
