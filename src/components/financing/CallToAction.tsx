
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type CallToActionTranslations = {
  readyToFinance: Record<string, string>;
  financialAdvisors: Record<string, string>;
  getQuote: Record<string, string>;
}

type CallToActionProps = {
  translations: CallToActionTranslations;
}

const CallToAction = ({ translations }: CallToActionProps) => {
  const { translate } = useLanguage();

  return (
    <div className="bg-brand-blue text-white rounded-lg p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">{translate('readyToFinance', translations.readyToFinance)}</h2>
      <p className="text-xl mb-6 max-w-3xl mx-auto">
        {translate('financialAdvisors', translations.financialAdvisors)}
      </p>
      <Link to="/contact">
        <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
          {translate('getQuote', translations.getQuote)}
        </Button>
      </Link>
    </div>
  );
};

export default CallToAction;
