
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type CopyrightTranslations = {
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

const FooterCopyright = () => {
  const { translate } = useLanguage();

  const translations: CopyrightTranslations = {
    copyright: {
      FR: "© 2002 Auto Adi. N° d'identification: 827 514 860. Tous droits réservés.",
      EN: "© 2002 Auto Adi. ID number: 827 514 860. All rights reserved.",
      ES: "© 2002 Auto Adi. N° de identificación: 827 514 860. Todos los derechos reservados.",
      IT: "© 2002 Auto Adi. N° di identificazione: 827 514 860. Tutti i diritti riservati.",
      PT: "© 2002 Auto Adi. N° de identificação: 827 514 860. Todos os direitos reservados.",
      RO: "© 2002 Auto Adi. Număr de identificare: 827 514 860. Toate drepturile rezervate.",
      DE: "© 2002 Auto Adi. Identifikationsnummer: 827 514 860. Alle Rechte vorbehalten.",
      NL: "© 2002 Auto Adi. Identificatienummer: 827 514 860. Alle rechten voorbehouden.",
      PL: "© 2002 Auto Adi. Numer identyfikacyjny: 827 514 860. Wszelkie prawa zastrzeżone.",
      RU: "© 2002 Auto Adi. Идентификационный номер: 827 514 860. Все права защищены."
    }
  };

  return (
    <div className="text-center pt-2">
      <p className="text-gray-300 text-sm font-medium py-1 px-3 rounded bg-white/5 inline-block">
        {translate('copyright', translations.copyright)}
      </p>
    </div>
  );
};

export default FooterCopyright;
