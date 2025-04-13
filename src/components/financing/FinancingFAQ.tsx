
import { useLanguage } from '@/contexts/LanguageContext';

type FinancingFAQTranslations = {
  frequentlyAskedQuestions: Record<string, string>;
  everythingToKnow: Record<string, string>;
  whatDocumentsNeeded: Record<string, string>;
  idProofEtc: Record<string, string>;
  canIgetFinancingWithMinContribution: Record<string, string>;
  yesSolutionsFrom10Percent: Record<string, string>;
  whatsDifferenceCreditLoa: Record<string, string>;
  withCreditYouOwnVehicle: Record<string, string>;
  isInstallmentPaymentSubjectToFees: Record<string, string>;
  noOurInstallmentPaymentIsFree: Record<string, string>;
  canIRepayMyCreditEarly: Record<string, string>;
  yesEarlyRepaymentPossible: Record<string, string>;
}

type FinancingFAQProps = {
  translations: FinancingFAQTranslations;
}

const FinancingFAQ = ({ translations }: FinancingFAQProps) => {
  const { translate } = useLanguage();

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{translate('frequentlyAskedQuestions', translations.frequentlyAskedQuestions)}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {translate('everythingToKnow', translations.everythingToKnow)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('whatDocumentsNeeded', translations.whatDocumentsNeeded)}</h3>
          <p className="text-gray-600">
            {translate('idProofEtc', translations.idProofEtc)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('canIgetFinancingWithMinContribution', translations.canIgetFinancingWithMinContribution)}</h3>
          <p className="text-gray-600">
            {translate('yesSolutionsFrom10Percent', translations.yesSolutionsFrom10Percent)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('whatsDifferenceCreditLoa', translations.whatsDifferenceCreditLoa)}</h3>
          <p className="text-gray-600">
            {translate('withCreditYouOwnVehicle', translations.withCreditYouOwnVehicle)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">{translate('isInstallmentPaymentSubjectToFees', translations.isInstallmentPaymentSubjectToFees)}</h3>
          <p className="text-gray-600">
            {translate('noOurInstallmentPaymentIsFree', translations.noOurInstallmentPaymentIsFree)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-xl font-bold mb-2">{translate('canIRepayMyCreditEarly', translations.canIRepayMyCreditEarly)}</h3>
          <p className="text-gray-600">
            {translate('yesEarlyRepaymentPossible', translations.yesEarlyRepaymentPossible)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancingFAQ;
