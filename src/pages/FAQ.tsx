
import LegalPageLayout from '@/components/LegalPageLayout';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { HelpCircle, Truck, CreditCard, ShieldCheck, Car } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getFAQTranslations } from '@/components/faq/FAQTranslations';

const FAQ = () => {
  const { language, translate } = useLanguage();
  const translations = getFAQTranslations();

  return (
    <LegalPageLayout title={translate('faqTitle', translations.faqTitle)}>
      <div className="mb-8">
        <p className="text-lg text-gray-600 mb-8">
          {translate('faqDescription', translations.faqDescription)}
        </p>
        
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
              <Car className="h-12 w-12 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('certifiedVehicles', translations.certifiedVehicles)}</h3>
              <p className="text-gray-600">{translate('certifiedVehiclesDescription', translations.certifiedVehiclesDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
              <ShieldCheck className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('extendedWarranty', translations.extendedWarranty)}</h3>
              <p className="text-gray-600">{translate('extendedWarrantyDescription', translations.extendedWarrantyDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg">
              <CreditCard className="h-12 w-12 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('flexibleFinancing', translations.flexibleFinancing)}</h3>
              <p className="text-gray-600">{translate('flexibleFinancingDescription', translations.flexibleFinancingDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
              <Truck className="h-12 w-12 text-amber-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('fastDelivery', translations.fastDelivery)}</h3>
              <p className="text-gray-600">{translate('fastDeliveryDescription', translations.fastDeliveryDescription)}</p>
            </div>
          </div>
        </div>
        
        <FAQAccordion sections={translations.faqSections[language]} />
        
        <div className="bg-blue-50 rounded-xl p-8 mt-12 text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">{translate('moreQuestions', translations.moreQuestions)}</h3>
          <p className="text-lg mb-6">{translate('teamAvailable', translations.teamAvailable)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {translate('contactUs', translations.contactUs)}
            </a>
            <a href="tel:+39 376 175 3341" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              {translate('callDirectly', translations.callDirectly)}
            </a>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
};

export default FAQ;
