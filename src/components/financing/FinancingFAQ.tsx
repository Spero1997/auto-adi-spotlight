
import { useLanguage } from '@/contexts/LanguageContext';

type FinancingFAQProps = {
  translations: any; // Accept the full translations object
}

const FinancingFAQ = ({ translations }: FinancingFAQProps) => {
  const { translate } = useLanguage();

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{translate('faqTitle', translations.faqTitle)}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {translate('faqSubtitle', translations.faqSubtitle)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('vehiclePrice', translations.vehiclePrice)}</h3>
          <p className="text-gray-600">
            {translate('installmentDescription', translations.installmentDescription)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('initialContribution', translations.initialContribution)}</h3>
          <p className="text-gray-600">
            {translate('creditDescription', translations.creditDescription)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('financingType', translations.financingType)}</h3>
          <p className="text-gray-600">
            {translate('leaseDescription', translations.leaseDescription)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('durationInMonths', translations.durationInMonths)}</h3>
          <p className="text-gray-600">
            {translate('creditDescription', translations.creditDescription)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-xl font-bold mb-2">{translate('calculatePayments', translations.calculatePayments)}</h3>
          <p className="text-gray-600">
            {translate('useCalculator', translations.useCalculator)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancingFAQ;
