
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import SearchForm from './hero/SearchForm';
import { heroTranslations } from './hero/heroTranslations';

const Hero = () => {
  const { language } = useLanguage();

  return (
    <div className="relative bg-gray-900 overflow-hidden py-12">
      <HeroBackground />
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <HeroContent translations={heroTranslations} />
      </div>

      {/* Quick search section - moved up by adjusting the margin */}
      <div className="container mx-auto px-4 relative z-10 -mt-8">
        <SearchForm translations={heroTranslations} />
      </div>
    </div>
  );
};

export default Hero;
