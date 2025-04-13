
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';

type FinancingHeroTranslations = {
  heroTitle: Record<Language, string>;
  heroSubtitle: Record<Language, string>;
  contactUsForInfo: Record<Language, string>;
  specialOffer: Record<Language, string>;
}

type FinancingHeroProps = {
  translations: any; // This allows us to accept the full translations object
}

const FinancingHero = ({ translations }: FinancingHeroProps) => {
  const { translate } = useLanguage();

  return (
    <section className="bg-brand-blue text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{translate('heroTitle', translations.heroTitle)}</h1>
          <p className="text-xl mb-8">{translate('heroSubtitle', translations.heroSubtitle)}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                {translate('contactUsForInfo', translations.contactUsForInfo)}
              </Button>
            </Link>
            <Link to="/vehicules/occasion">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                {translate('specialOffer', translations.specialOffer)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingHero;
