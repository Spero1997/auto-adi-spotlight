
import React from 'react';
import { Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type SocialMediaTranslations = {
  [key: string]: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
  };
};

const FooterSocialMedia = () => {
  const { translate } = useLanguage();

  const translations: SocialMediaTranslations = {
    socialMediaInfo: {
      FR: "Rejoignez-nous sur les réseaux sociaux",
      EN: "Join us on social media",
      ES: "Únase a nosotros en las redes sociales",
      IT: "Unisciti a noi sui social media",
      PT: "Junte-se a nós nas redes sociais",
      RO: "Alăturați-vă nouă pe rețelele sociale"
    },
    contactAvailability: {
      FR: "Nous sommes disponibles uniquement sur Facebook et WhatsApp",
      EN: "We are available only on Facebook and WhatsApp",
      ES: "Estamos disponibles solo en Facebook y WhatsApp",
      IT: "Siamo disponibili solo su Facebook e WhatsApp",
      PT: "Estamos disponíveis apenas no Facebook e WhatsApp",
      RO: "Suntem disponibili doar pe Facebook și WhatsApp"
    },
    facebookPage: {
      FR: "Page Facebook",
      EN: "Facebook Page",
      ES: "Página de Facebook",
      IT: "Pagina Facebook",
      PT: "Página do Facebook",
      RO: "Pagina Facebook"
    }
  };

  return (
    <div>
      <p className="text-gray-200 font-semibold mb-6 text-left">
        {translate('contactAvailability', translations.contactAvailability)}
      </p>
      <div className="flex space-x-6 mb-8">
        <a 
          href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300"
          aria-label="Facebook"
        >
          <Facebook size={24} className="text-white" />
        </a>
        <a 
          href="https://wa.me/393761753341" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/10 p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle size={24} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default FooterSocialMedia;
