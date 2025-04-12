
import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ContactInfoTranslations = {
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

const FooterContactInfo = () => {
  const { translate } = useLanguage();

  const translations: ContactInfoTranslations = {
    contact: {
      FR: "Contact",
      EN: "Contact",
      ES: "Contacto",
      IT: "Contatto",
      PT: "Contato",
      RO: "Contact",
      DE: "Kontakt",
      NL: "Contact",
      PL: "Kontakt",
      RU: "Контакт"
    },
    facebookPage: {
      FR: "Page Facebook",
      EN: "Facebook Page",
      ES: "Página de Facebook",
      IT: "Pagina Facebook",
      PT: "Página do Facebook",
      RO: "Pagina Facebook",
      DE: "Facebook-Seite",
      NL: "Facebook-pagina",
      PL: "Strona Facebook",
      RU: "Страница Facebook"
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-left">{translate('contact', translations.contact)}</h3>
      <ul className="space-y-2 text-left text-sm md:text-base">
        <li className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-brand-orange" />
          <span className="text-gray-200">‪+39 376 175 3341‬</span>
        </li>
        <li className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2 text-brand-orange" />
          <span className="text-gray-200">WhatsApp: ‪+39 376 175 3341‬</span>
        </li>
        <li className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-brand-orange" />
          <span className="text-gray-200">serviceautoadi@gmail.com</span>
        </li>
        <li className="flex items-start">
          <MapPin className="h-4 w-4 mr-2 text-brand-orange mt-1" />
          <span className="text-gray-200 text-sm">
            Borgo Ognissanti, 142r 50123 Firenze FI Italie
          </span>
        </li>
        <li className="flex items-center">
          <Facebook className="h-4 w-4 mr-2 text-brand-orange" />
          <a 
            href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-brand-orange transition-colors"
          >
            {translate('facebookPage', translations.facebookPage)}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterContactInfo;
