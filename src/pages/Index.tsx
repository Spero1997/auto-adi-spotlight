
import { useSearchParams } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import HomeHeader from '@/components/home/HomeHeader';
import VehicleInitializer from '@/components/home/VehicleInitializer';
import ViewAllCarsButton from '@/components/home/ViewAllCarsButton';
import SearchResults from '@/components/home/SearchResults';

const Index = () => {
  const [searchParams] = useSearchParams();
  
  // Create search filters object from URL parameters
  const searchFilters = {
    brand: searchParams.get('marque') || '',
    model: searchParams.get('modele') || '',
    maxPrice: searchParams.get('budget') ? parseInt(searchParams.get('budget') || '0') : undefined,
    fuelType: searchParams.get('energie') || ''
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO and Meta tags */}
      <HomeHeader />
      
      {/* Data initialization component */}
      <VehicleInitializer />
      
      <main>
        {/* Hero section with carousel */}
        <HeroCarousel />
        
        {/* Main heading already in HomeHeader */}
        
        {/* Highlight our conditions */}
        <ConditionsHighlight />
        
        {/* Featured vehicles section */}
        <div className="mt-10" id="featured-cars">
          <FeaturedCars featuredOnly={true} />
        </div>
        
        {/* View all vehicles button */}
        <ViewAllCarsButton />
        
        {/* Search results section (only shown when search parameters exist) */}
        <SearchResults searchFilters={searchFilters} />
        
        {/* Testimonials and benefits */}
        <TestimonialSection />
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
