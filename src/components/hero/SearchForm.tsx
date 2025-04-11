
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

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
    
    // Navigate to the vehicules/occasion page with parameters
    navigate(`/vehicules/occasion?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">{translate('quickSearch', translations.quickSearch)}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block mb-1">{translate('brand', translations.brand)}</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                aria-label={translate('brand', translations.brand)}
              >
                <option value="">{translate('brand', translations.brand)}</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="citroen">Citroën</option>
                <option value="peugeot">Peugeot</option>
                <option value="renault">Renault</option>
                <option value="toyota">Toyota</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block mb-1">{translate('model', translations.model)}</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                aria-label={translate('model', translations.model)}
              >
                <option value="">{translate('model', translations.model)}</option>
                <option value="berline">Berline</option>
                <option value="suv">SUV</option>
                <option value="break">Break</option>
                <option value="citadine">Citadine</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block mb-1">{translate('maxBudget', translations.maxBudget)}</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                aria-label={translate('maxBudget', translations.maxBudget)}
              >
                <option value="">{translate('maxBudget', translations.maxBudget)}</option>
                <option value="10000">10 000 €</option>
                <option value="15000">15 000 €</option>
                <option value="20000">20 000 €</option>
                <option value="30000">30 000 €</option>
                <option value="50000">50 000 €</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block mb-1">{translate('fuel', translations.fuel)}</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                aria-label={translate('fuel', translations.fuel)}
              >
                <option value="">{translate('fuel', translations.fuel)}</option>
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybride">Hybride</option>
                <option value="electrique">Électrique</option>
              </select>
            </div>
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
  );
};

export default SearchForm;
