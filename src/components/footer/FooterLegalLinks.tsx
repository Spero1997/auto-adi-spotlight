
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type LegalLinksTranslations = {
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

const FooterLegalLinks = () => {
  const { translate } = useLanguage();

  const translations: LegalLinksTranslations = {
    legalInfo: {
      FR: "Informations légales",
      EN: "Legal information",
      ES: "Información legal",
      IT: "Informazioni legali",
      PT: "Informações legais",
      RO: "Informații legale",
      DE: "Rechtliche Informationen",
      NL: "Juridische informatie",
      PL: "Informacje prawne",
      RU: "Юридическая информация"
    },
    legalNotice: {
      FR: "Mentions légales",
      EN: "Legal notice",
      ES: "Avisos legales",
      IT: "Note legali",
      PT: "Avisos legais",
      RO: "Mențiuni legale",
      DE: "Rechtliche Hinweise",
      NL: "Juridische vermeldingen",
      PL: "Informacje prawne",
      RU: "Правовое уведомление"
    },
    privacyPolicy: {
      FR: "Politique de confidentialité",
      EN: "Privacy policy",
      ES: "Política de privacidad",
      IT: "Politica sulla privacy",
      PT: "Política de privacidade",
      RO: "Politica de confidențialitate",
      DE: "Datenschutzrichtlinie",
      NL: "Privacybeleid",
      PL: "Polityka prywatności",
      RU: "Политика конфиденциальности"
    },
    cookieManagement: {
      FR: "Gestion des cookies",
      EN: "Cookie management",
      ES: "Gestión de cookies",
      IT: "Gestione dei cookie",
      PT: "Gestão de cookies",
      RO: "Gestionarea cookie-urilor",
      DE: "Cookie-Verwaltung",
      NL: "Cookie-beheer",
      PL: "Zarządzanie plikami cookie",
      RU: "Управление файлами cookie"
    },
    termsAndConditions: {
      FR: "CGV",
      EN: "Terms and conditions",
      ES: "Términos y condiciones",
      IT: "Termini e condizioni",
      PT: "Termos e condições",
      RO: "Termeni și condiții",
      DE: "Allgemeine Geschäftsbedingungen",
      NL: "Algemene voorwaarden",
      PL: "Warunki korzystania",
      RU: "Условия использования"
    },
    saleConditions: {
      FR: "Conditions de vente",
      EN: "Sale conditions",
      ES: "Condiciones de venta",
      IT: "Condizioni di vendita",
      PT: "Condições de venda",
      RO: "Condiții de vânzare",
      DE: "Verkaufsbedingungen",
      NL: "Verkoopvoorwaarden",
      PL: "Warunki sprzedaży",
      RU: "Условия продажи"
    }
  };

  return (
    <div className="mb-3">
      <h3 className="text-lg font-semibold mb-2 text-center">
        {translate('legalInfo', translations.legalInfo)}
      </h3>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
        <Link to="/mentions-legales" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm text-sm">
          <Shield className="h-3 w-3 mr-1 text-brand-orange" />
          {translate('legalNotice', translations.legalNotice)}
        </Link>
        <Link to="/politique-confidentialite" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm text-sm">
          <Shield className="h-3 w-3 mr-1 text-brand-orange" />
          {translate('privacyPolicy', translations.privacyPolicy)}
        </Link>
        <Link to="/cookies" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm text-sm">
          <Settings className="h-3 w-3 mr-1 text-brand-orange" />
          {translate('cookieManagement', translations.cookieManagement)}
        </Link>
        <Link to="/cgv" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm text-sm">
          <FileText className="h-3 w-3 mr-1 text-brand-orange" />
          {translate('termsAndConditions', translations.termsAndConditions)}
        </Link>
        <Link to="/conditions" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm text-sm">
          <FileText className="h-3 w-3 mr-1 text-brand-orange" />
          {translate('saleConditions', translations.saleConditions)}
        </Link>
      </div>
    </div>
  );
};

export default FooterLegalLinks;
