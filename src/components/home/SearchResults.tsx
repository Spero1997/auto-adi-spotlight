
import React from 'react';
import FeaturedCars from '@/components/FeaturedCars';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResultsProps {
  searchFilters: {
    brand: string;
    model: string;
    maxPrice?: number;
    fuelType: string;
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchFilters }) => {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  
  // Si aucun paramètre de recherche, ne rien afficher
  if (!searchParams.toString()) {
    return null;
  }
  
  return (
    <div className="mt-10 w-full">
      <h2 className="text-3xl font-bold text-center mb-8">
        {language === 'FR' 
          ? "Résultats de votre recherche" 
          : "Your Search Results"}
      </h2>
      <FeaturedCars searchFilters={searchFilters} featuredOnly={false} />
    </div>
  );
};

export default SearchResults;
