
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Zap, Award, DollarSign } from 'lucide-react';
import HeroFeatureCard from './HeroFeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroContentProps {
  translations: {
    heroTitle: Record<string, string>;
    heroDescription: Record<string, string>;
    usedVehicles: Record<string, string>;
    features: {
      performance: Record<string, string>;
      safety: Record<string, string>;
      warranty: Record<string, string>;
      quality: Record<string, string>;
    };
  };
}

const HeroContent = ({ translations }: HeroContentProps) => {
  const { translate } = useLanguage();

  return (
    <div className="max-w-3xl text-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg text-white">
        {translate('heroTitle', translations.heroTitle)}
      </h1>
      <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md font-medium">
        {translate('heroDescription', translations.heroDescription)}
      </p>
      
      {/* Key features with icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <HeroFeatureCard 
          icon={Zap} 
          text={translate('features.performance', translations.features.performance)} 
        />
        <HeroFeatureCard 
          icon={Shield} 
          text={translate('features.safety', translations.features.safety)} 
        />
        <HeroFeatureCard 
          icon={Award} 
          text={translate('features.quality', translations.features.quality)} 
        />
        <HeroFeatureCard 
          icon={DollarSign} 
          text={translate('features.warranty', translations.features.warranty)} 
        />
      </div>
      
      {/* Call to action button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/vehicules/occasion">
          <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg shadow-xl">
            {translate('usedVehicles', translations.usedVehicles)}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
