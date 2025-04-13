
import LegalPageLayout from '@/components/LegalPageLayout';
import FAQAccordion from '@/components/faq/FAQAccordion';
import FAQBanner from '@/components/faq/FAQBanner';
import { HelpCircle, Truck, CreditCard, ShieldCheck, Car, Search } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getFAQTranslations } from '@/components/faq/FAQTranslations';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const FAQ = () => {
  const { language, translate } = useLanguage();
  const translations = getFAQTranslations();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter FAQ items based on search term
  const filteredSections = translations.faqSections[language].map(section => ({
    ...section,
    faqs: section.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(section => section.faqs.length > 0);

  return (
    <LegalPageLayout title={translate('faqTitle', translations.faqTitle)}>
      <div className="mb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-darkBlue rounded-xl p-10 mb-12 text-white text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">{translate('faqTitle', translations.faqTitle)}</h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-white/90">
            {translate('faqDescription', translations.faqDescription)}
          </p>
          <div className="relative max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Rechercher une question..."
              className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
          </div>
        </div>
        
        <p className="text-lg text-gray-600 mb-8 animate-fade-in">
          {translate('faqDescription', translations.faqDescription)}
        </p>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 mb-12 shadow-sm border border-gray-100 animate-fade-in animation-delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
              <Car className="h-12 w-12 text-brand-blue mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('certifiedVehicles', translations.certifiedVehicles)}</h3>
              <p className="text-gray-600">{translate('certifiedVehiclesDescription', translations.certifiedVehiclesDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100">
              <ShieldCheck className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('extendedWarranty', translations.extendedWarranty)}</h3>
              <p className="text-gray-600">{translate('extendedWarrantyDescription', translations.extendedWarrantyDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100">
              <CreditCard className="h-12 w-12 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('flexibleFinancing', translations.flexibleFinancing)}</h3>
              <p className="text-gray-600">{translate('flexibleFinancingDescription', translations.flexibleFinancingDescription)}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100">
              <Truck className="h-12 w-12 text-amber-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{translate('fastDelivery', translations.fastDelivery)}</h3>
              <p className="text-gray-600">{translate('fastDeliveryDescription', translations.fastDeliveryDescription)}</p>
            </div>
          </div>
        </div>
        
        {searchTerm && filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-500">Essayez avec un autre terme de recherche</p>
          </div>
        ) : (
          <FAQAccordion sections={searchTerm ? filteredSections : translations.faqSections[language]} />
        )}
        
        <FAQBanner 
          className="mt-12"
          title={translate('moreQuestions', translations.moreQuestions)}
          description={translate('teamAvailable', translations.teamAvailable)}
        />
      </div>
    </LegalPageLayout>
  );
};

export default FAQ;
