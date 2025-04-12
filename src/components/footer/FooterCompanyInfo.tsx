
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import FooterSocialMedia from './FooterSocialMedia';

type CompanyInfoTranslations = {
  [key: string]: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
    DE: string;
    NL: string;
    PL: string;
    RU: string;
  };
};

const FooterCompanyInfo = () => {
  const { translate } = useLanguage();

  const translations: CompanyInfoTranslations = {
    companyDescription: {
      FR: "Auto Adi, votre partenaire de confiance pour l'achat de véhicules neufs et d'occasion en Europe.",
      EN: "Auto Adi, your trusted partner for purchasing new and used vehicles in Europe.",
      ES: "Auto Adi, su socio de confianza para la compra de vehículos nuevos y usados en Europa.",
      IT: "Auto Adi, il tuo partner di fiducia per l'acquisto di veicoli nuovi e usati in Europa.",
      PT: "Auto Adi, o seu parceiro de confiança para a compra de veículos novos e usados na Europa.",
      RO: "Auto Adi, partenerul dvs. de încredere pentru achiziționarea de vehicule noi și second-hand în Europa.",
      DE: "Auto Adi, Ihr vertrauenswürdiger Partner für den Kauf von Neu- und Gebrauchtwagen in Europa.",
      NL: "Auto Adi, uw betrouwbare partner voor de aankoop van nieuwe en gebruikte voertuigen in Europa.",
      PL: "Auto Adi, Twój zaufany partner w zakupie nowych i używanych pojazdów w Europie.",
      RU: "Auto Adi, ваш надежный партнер по покупке новых и подержанных автомобилей в Европе."
    }
  };

  return (
    <div className="md:col-span-2">
      <Link to="/" className="block mb-3">
        <img 
          src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
          alt="Auto Adi" 
          className="h-14 mb-2"
        />
      </Link>
      <p className="text-gray-200 mb-3 text-left max-w-md text-sm md:text-base">
        {translate('companyDescription', translations.companyDescription)}
      </p>
      
      <FooterSocialMedia />
    </div>
  );
};

export default FooterCompanyInfo;
