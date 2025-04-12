
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
      RO: "© 2002 Auto Adi. Număr de identificare: 827 514 860. Toate drepturile rezervate."
    }
  };

  return (
    <div className="text-center border-t border-white/10 pt-6">
      <p className="text-gray-300 font-medium py-2 px-4 rounded bg-white/5 inline-block">
        {translate('copyright', translations.copyright)}
      </p>
    </div>
  );
};

export default FooterCopyright;
