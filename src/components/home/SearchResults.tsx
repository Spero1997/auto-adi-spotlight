
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FeaturedCars from '@/components/FeaturedCars';

interface SearchResultsProps {
  searchFilters: {
    brand: string;
    model: string;
    maxPrice?: number;
    fuelType: string;
  };
}

const SearchResults = ({ searchFilters }: SearchResultsProps) => {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  
  // Only render if there are search parameters
  if (!searchParams.toString()) {
    return null;
  }
  
  return (
    <div className="mt-10">
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
