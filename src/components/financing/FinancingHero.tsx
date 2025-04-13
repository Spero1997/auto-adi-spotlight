
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { PiggyBank, Car } from 'lucide-react';

type FinancingHeroTranslations = {
  financingTitle: Record<Language, string>;
  financingDescription: Record<Language, string>;
  getQuote: Record<Language, string>;
  seeVehicles: Record<Language, string>;
}

type FinancingHeroProps = {
  translations: FinancingHeroTranslations;
}

const FinancingHero = ({ translations }: FinancingHeroProps) => {
  const { translate } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-brand-blue to-brand-darkBlue text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 animate-fade-in">
            {translate('financingTitle', translations.financingTitle)}
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fade-in animation-delay-300">
            {translate('financingDescription', translations.financingDescription)}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
            <Link to="/contact">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold group">
                <PiggyBank className="mr-2 h-5 w-5" />
                <span>{translate('getQuote', translations.getQuote)}</span>
              </Button>
            </Link>
            <Link to="/vehicules/occasion">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold group">
                <Car className="mr-2 h-5 w-5" />
                <span>{translate('seeVehicles', translations.seeVehicles)}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingHero;
