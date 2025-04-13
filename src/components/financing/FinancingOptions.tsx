
import { CreditCard, BarChart3, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import FinancingOption from './FinancingOption';

type FinancingOptionsProps = {
  translations: any; // Accept the full translations object
}

const FinancingOptions = ({ translations }: FinancingOptionsProps) => {
  const { translate } = useLanguage();

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">{translate('financingOptions', translations.financingOptions)}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {translate('useCalculator', translations.useCalculator)}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <FinancingOption 
          title={translate('traditionalCredit', translations.traditionalCredit)}
          description={translate('creditDescription', translations.creditDescription)}
          icon={<CreditCard className="h-7 w-7 text-brand-blue" />}
          color="brand-blue"
          details={[
            { 
              label: translate('durationInMonths', translations.durationInMonths), 
              value: "12-84" 
            },
            { 
              label: translate('initialContribution', translations.initialContribution), 
              value: "10%" 
            },
            { 
              label: translate('financingType', translations.financingType), 
              value: translate('traditionalCredit', translations.traditionalCredit)
            }
          ]}
          benefits={[
            translate('calculatePayments', translations.calculatePayments),
            translate('vehiclePrice', translations.vehiclePrice),
            translate('totalCost', translations.totalCost)
          ]}
          requestQuoteText={translate('contactOurTeam', translations.contactOurTeam)}
        />
        
        <FinancingOption 
          title={translate('leaseWithOption', translations.leaseWithOption)}
          description={translate('leaseDescription', translations.leaseDescription)}
          icon={<BarChart3 className="h-7 w-7 text-brand-orange" />}
          color="brand-orange"
          details={[
            { 
              label: translate('durationInMonths', translations.durationInMonths), 
              value: "24-60"
            },
            { 
              label: translate('initialContribution', translations.initialContribution), 
              value: "10-30%" 
            },
            { 
              label: translate('financingType', translations.financingType), 
              value: translate('leaseWithOption', translations.leaseWithOption)
            }
          ]}
          benefits={[
            translate('monthlyPayment', translations.monthlyPayment),
            translate('interestRate', translations.interestRate),
            translate('totalCost', translations.totalCost)
          ]}
          requestQuoteText={translate('contactOurTeam', translations.contactOurTeam)}
          isPopular={true}
          popularText={translate('specialOffer', translations.specialOffer)}
        />
        
        <FinancingOption 
          title={translate('installmentPayment', translations.installmentPayment)}
          description={translate('installmentDescription', translations.installmentDescription)}
          icon={<Calculator className="h-7 w-7 text-brand-green" />}
          color="brand-green"
          details={[
            { 
              label: translate('durationInMonths', translations.durationInMonths), 
              value: "6-48"
            },
            { 
              label: translate('initialContribution', translations.initialContribution), 
              value: "20%" 
            },
            { 
              label: translate('financingType', translations.financingType), 
              value: translate('installmentPayment', translations.installmentPayment)
            }
          ]}
          benefits={[
            translate('vehiclePrice', translations.vehiclePrice),
            translate('calculatePayments', translations.calculatePayments),
            translate('monthlyPayment', translations.monthlyPayment)
          ]}
          requestQuoteText={translate('contactOurTeam', translations.contactOurTeam)}
        />
      </div>
    </div>
  );
};

export default FinancingOptions;
