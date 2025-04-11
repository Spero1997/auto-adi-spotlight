
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

interface SearchFormProps {
  translations: {
    quickSearch: Record<string, string>;
    brand: Record<string, string>;
    model: Record<string, string>;
    maxBudget: Record<string, string>;
    fuel: Record<string, string>;
    search: Record<string, string>;
  };
}

const SearchForm = ({ translations }: SearchFormProps) => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [hasAirbags, setHasAirbags] = useState(false);
  const [hasAbs, setHasAbs] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasNavigation, setHasNavigation] = useState(false);
  
  const brandModels: Record<string, string[]> = {
    audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7'],
    bmw: ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'],
    citroen: ['C3', 'C4', 'C5', 'Berlingo', 'C3 Aircross'],
    peugeot: ['208', '308', '508', '2008', '3008', '5008'],
    renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic'],
    toyota: ['Yaris', 'Corolla', 'C-HR', 'RAV4', 'Prius'],
    volkswagen: ['Polo', 'Golf', 'Passat', 'Tiguan', 'T-Roc'],
    mercedes: ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC']
  };

  useEffect(() => {
    if (selectedBrand && brandModels[selectedBrand]) {
      setAvailableModels(brandModels[selectedBrand]);
    } else {
      setAvailableModels([]);
    }
  }, [selectedBrand]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (selectedBrand) searchParams.append('marque', selectedBrand);
    if (selectedModel) searchParams.append('modele', selectedModel);
    
    if (advancedMode) {
      // Add advanced search parameters
      searchParams.append('prixMin', priceRange[0].toString());
      searchParams.append('prixMax', priceRange[1].toString());
      
      if (selectedFuel) searchParams.append('energie', selectedFuel);
      if (hasAirbags) searchParams.append('airbags', 'true');
      if (hasAbs) searchParams.append('abs', 'true');
      if (hasAC) searchParams.append('climatisation', 'true');
      if (hasNavigation) searchParams.append('navigation', 'true');
    } else {
      // Basic search just uses the budget dropdown
      if (selectedBudget) searchParams.append('budget', selectedBudget);
      if (selectedFuel) searchParams.append('energie', selectedFuel);
    }
    
    // Check if at least one parameter is selected
    if (searchParams.toString() === '') {
      toast.warning("Veuillez sélectionner au moins un critère de recherche");
      return;
    }
    
    console.log('Hero Search initiated with params:', Object.fromEntries(searchParams.entries()));
    
    // Navigate to the vehicules/occasion page with parameters
    navigate(`/vehicules/occasion?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{translate('quickSearch', translations.quickSearch)}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setAdvancedMode(!advancedMode)}
          className="flex items-center gap-2"
        >
          <Filter size={16} />
          {advancedMode ? "Recherche simple" : "Recherche avancée"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand" className="font-medium text-gray-700">
              {translate('brand', translations.brand)}
            </Label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                <SelectValue placeholder={translate('brand', translations.brand)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les marques</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="citroen">Citroën</SelectItem>
                <SelectItem value="peugeot">Peugeot</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model" className="font-medium text-gray-700">
              {translate('model', translations.model)}
            </Label>
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel}
              disabled={!selectedBrand}
            >
              <SelectTrigger id="model" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                <SelectValue placeholder={translate('model', translations.model)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les modèles</SelectItem>
                {availableModels.map(model => (
                  <SelectItem key={model} value={model.toLowerCase()}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {!advancedMode ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="budget" className="font-medium text-gray-700">
                  {translate('maxBudget', translations.maxBudget)}
                </Label>
                <Select 
                  value={selectedBudget}
                  onValueChange={setSelectedBudget}
                >
                  <SelectTrigger id="budget" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <SelectValue placeholder={translate('maxBudget', translations.maxBudget)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Budget max</SelectItem>
                    <SelectItem value="10000">10 000 €</SelectItem>
                    <SelectItem value="15000">15 000 €</SelectItem>
                    <SelectItem value="20000">20 000 €</SelectItem>
                    <SelectItem value="30000">30 000 €</SelectItem>
                    <SelectItem value="50000">50 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuel" className="font-medium text-gray-700">
                  {translate('fuel', translations.fuel)}
                </Label>
                <Select 
                  value={selectedFuel}
                  onValueChange={setSelectedFuel}
                >
                  <SelectTrigger id="fuel" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <SelectValue placeholder={translate('fuel', translations.fuel)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Carburant</SelectItem>
                    <SelectItem value="essence">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybride">Hybride</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="fuel" className="font-medium text-gray-700">
                  {translate('fuel', translations.fuel)}
                </Label>
                <Select 
                  value={selectedFuel}
                  onValueChange={setSelectedFuel}
                >
                  <SelectTrigger id="fuel" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <SelectValue placeholder={translate('fuel', translations.fuel)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les carburants</SelectItem>
                    <SelectItem value="essence">Essence</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybride">Hybride</SelectItem>
                    <SelectItem value="electrique">Électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium text-gray-700">Année</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                      <SelectValue placeholder="Max" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
        
        {advancedMode && (
          <>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="font-medium text-gray-700">Prix</Label>
                  <span className="text-sm text-gray-600">
                    {priceRange[0].toLocaleString('fr-FR')} € - {priceRange[1].toLocaleString('fr-FR')} €
                  </span>
                </div>
                <Slider
                  min={5000}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
            </div>
            
            <div>
              <Label className="font-medium text-gray-700 mb-2 block">Équipements</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="airbags" 
                    checked={hasAirbags}
                    onCheckedChange={(checked) => setHasAirbags(checked as boolean)}
                  />
                  <label
                    htmlFor="airbags"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Airbags
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="abs" 
                    checked={hasAbs}
                    onCheckedChange={(checked) => setHasAbs(checked as boolean)}
                  />
                  <label
                    htmlFor="abs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ABS
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ac" 
                    checked={hasAC}
                    onCheckedChange={(checked) => setHasAC(checked as boolean)}
                  />
                  <label
                    htmlFor="ac"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Climatisation
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="navigation" 
                    checked={hasNavigation}
                    onCheckedChange={(checked) => setHasNavigation(checked as boolean)}
                  />
                  <label
                    htmlFor="navigation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Navigation GPS
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-center mt-2">
          <Button 
            className="bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full md:w-auto px-8 py-3 rounded-md text-white font-semibold flex items-center justify-center shadow-lg"
            size="lg"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            {translate('search', translations.search)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
