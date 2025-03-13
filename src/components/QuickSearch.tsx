
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

const QuickSearch = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
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
    // Check if at least one filter is selected
    if (!selectedBrand && !selectedModel && !selectedBudget && !selectedFuel) {
      toast.warning('Veuillez sélectionner au moins un critère de recherche', {
        duration: 3000,
      });
      return;
    }
    
    const searchParams = new URLSearchParams();
    if (selectedBrand) searchParams.append('marque', selectedBrand);
    if (selectedModel) searchParams.append('modele', selectedModel);
    if (selectedBudget) searchParams.append('budget', selectedBudget);
    if (selectedFuel) searchParams.append('energie', selectedFuel);
    
    toast.success('Recherche lancée', {
      description: `Marque: ${selectedBrand || 'Toutes'}, Modèle: ${selectedModel || 'Tous'}, Budget: ${selectedBudget ? selectedBudget + '€' : 'Tous'}, Énergie: ${selectedFuel || 'Toutes'}`,
      duration: 3000,
    });
    
    // For now, redirect to Index page with search params until we create a proper search results page
    console.log('Search initiated with params:', {
      brand: selectedBrand,
      model: selectedModel,
      budget: selectedBudget,
      fuel: selectedFuel
    });
    
    // Navigate to the search page with parameters
    navigate(`/vehicules?${searchParams.toString()}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'p-4' : 'p-6 md:p-8'} -mt-10 mb-16`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-4 text-gray-800`}>Recherche rapide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={handleBrandChange} value={selectedBrand}>
              <SelectTrigger className={`w-full ${isMobile ? 'p-2 text-sm' : 'p-3'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue`}>
                <SelectValue placeholder="Marque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="citroen">Citroën</SelectItem>
                <SelectItem value="dacia">Dacia</SelectItem>
                <SelectItem value="fiat">Fiat</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="kia">Kia</SelectItem>
                <SelectItem value="mazda">Mazda</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
                <SelectItem value="mini">Mini</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
                <SelectItem value="opel">Opel</SelectItem>
                <SelectItem value="peugeot">Peugeot</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="seat">Seat</SelectItem>
                <SelectItem value="skoda">Skoda</SelectItem>
                <SelectItem value="smart">Smart</SelectItem>
                <SelectItem value="tesla">Tesla</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="volvo">Volvo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedModel} onValueChange={handleModelChange} disabled={!selectedBrand}>
              <SelectTrigger className={`w-full ${isMobile ? 'p-2 text-sm' : 'p-3'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue`}>
                <SelectValue placeholder="Modèle" />
              </SelectTrigger>
              <SelectContent>
                {selectedBrand ? (
                  availableModels.map((model) => (
                    <SelectItem key={model} value={model.toLowerCase()}>
                      {model}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="select-brand-first" disabled>
                    Sélectionnez une marque d'abord
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={handleBudgetChange}>
              <SelectTrigger className={`w-full ${isMobile ? 'p-2 text-sm' : 'p-3'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue`}>
                <SelectValue placeholder="Budget max" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3000">3 000 €</SelectItem>
                <SelectItem value="5000">5 000 €</SelectItem>
                <SelectItem value="10000">10 000 €</SelectItem>
                <SelectItem value="15000">15 000 €</SelectItem>
                <SelectItem value="20000">20 000 €</SelectItem>
                <SelectItem value="30000">30 000 €</SelectItem>
                <SelectItem value="50000">50 000 €</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFuel} onValueChange={handleFuelChange}>
              <SelectTrigger className={`w-full ${isMobile ? 'p-2 text-sm' : 'p-3'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue`}>
                <SelectValue placeholder="Énergie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essence">Essence</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybride">Hybride</SelectItem>
                <SelectItem value="electrique">Électrique</SelectItem>
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
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
