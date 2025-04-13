
import { CreditCard, BarChart3, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import FinancingOption from './FinancingOption';

type FinancingOptionsTranslations = {
  financingSolutions: Record<string, string>;
  financingSolutionsDesc: Record<string, string>;
  traditionalCredit: Record<string, string>;
  traditionalCreditDesc: Record<string, string>;
  duration: Record<string, string>;
  months12to84: Record<string, string>;
  months24to60: Record<string, string>;
  months6to48: Record<string, string>;
  downPayment: Record<string, string>;
  from10percent: Record<string, string>;
  initialRent: Record<string, string>;
  from10To30Percent: Record<string, string>;
  ownership: Record<string, string>;
  fromSigning: Record<string, string>;
  purchaseOption: Record<string, string>;
  endOfContract: Record<string, string>;
  fixedPayments: Record<string, string>;
  earlyRepayment: Record<string, string>;
  youOwnVehicle: Record<string, string>;
  lowerPayments: Record<string, string>;
  endOfContractChoice: Record<string, string>;
  depreciationProtection: Record<string, string>;
  noFeesInterest: Record<string, string>;
  withoutFinancialOrg: Record<string, string>;
  fastSolution: Record<string, string>;
  requestQuote: Record<string, string>;
  popular: Record<string, string>;
  leaseWithOption: Record<string, string>;
  leaseWithOptionDesc: Record<string, string>;
  installmentPayment: Record<string, string>;
  installmentPaymentDesc: Record<string, string>;
  orderDeposit: Record<string, string>;
  atOrder: Record<string, string>;
}

type FinancingOptionsProps = {
  translations: FinancingOptionsTranslations;
}

const FinancingOptions = ({ translations }: FinancingOptionsProps) => {
  const { translate } = useLanguage();

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">{translate('financingSolutions', translations.financingSolutions)}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {translate('financingSolutionsDesc', translations.financingSolutionsDesc)}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <FinancingOption 
          title={translate('traditionalCredit', translations.traditionalCredit)}
          description={translate('traditionalCreditDesc', translations.traditionalCreditDesc)}
          icon={<CreditCard className="h-7 w-7 text-brand-blue" />}
          color="brand-blue"
          details={[
            { 
              label: translate('duration', translations.duration), 
              value: translate('months12to84', translations.months12to84) 
            },
            { 
              label: translate('downPayment', translations.downPayment), 
              value: translate('from10percent', translations.from10percent) 
            },
            { 
              label: translate('ownership', translations.ownership), 
              value: translate('fromSigning', translations.fromSigning) 
            }
          ]}
          benefits={[
            translate('fixedPayments', translations.fixedPayments),
            translate('earlyRepayment', translations.earlyRepayment),
            translate('youOwnVehicle', translations.youOwnVehicle)
          ]}
          requestQuoteText={translate('requestQuote', translations.requestQuote)}
        />
        
        <FinancingOption 
          title={translate('leaseWithOption', translations.leaseWithOption)}
          description={translate('leaseWithOptionDesc', translations.leaseWithOptionDesc)}
          icon={<BarChart3 className="h-7 w-7 text-brand-orange" />}
          color="brand-orange"
          details={[
            { 
              label: translate('duration', translations.duration), 
              value: translate('months24to60', translations.months24to60) 
            },
            { 
              label: translate('initialRent', translations.initialRent), 
              value: translate('from10To30Percent', translations.from10To30Percent) 
            },
            { 
              label: translate('purchaseOption', translations.purchaseOption), 
              value: translate('endOfContract', translations.endOfContract) 
            }
          ]}
          benefits={[
            translate('lowerPayments', translations.lowerPayments),
            translate('endOfContractChoice', translations.endOfContractChoice),
            translate('depreciationProtection', translations.depreciationProtection)
          ]}
          requestQuoteText={translate('requestQuote', translations.requestQuote)}
          isPopular={true}
          popularText={translate('popular', translations.popular)}
        />
        
        <FinancingOption 
          title={translate('installmentPayment', translations.installmentPayment)}
          description={translate('installmentPaymentDesc', translations.installmentPaymentDesc)}
          icon={<Calculator className="h-7 w-7 text-brand-green" />}
          color="brand-green"
          details={[
            { 
              label: translate('duration', translations.duration), 
              value: translate('months6to48', translations.months6to48) 
            },
            { 
              label: translate('orderDeposit', translations.orderDeposit), 
              value: translate('atOrder', translations.atOrder) 
            },
            { 
              label: translate('ownership', translations.ownership), 
              value: translate('fromSigning', translations.fromSigning) 
            }
          ]}
          benefits={[
            translate('noFeesInterest', translations.noFeesInterest),
            translate('withoutFinancialOrg', translations.withoutFinancialOrg),
            translate('fastSolution', translations.fastSolution)
          ]}
          requestQuoteText={translate('requestQuote', translations.requestQuote)}
        />
      </div>
    </div>
  );
};

export default FinancingOptions;
