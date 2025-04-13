
import { Phone, Mail, Calendar, MessageCircle, ShoppingCart, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CallToAction = () => {
  const { language, translate } = useLanguage();

  const translations = {
    needHelpTitle: {
      FR: "Besoin d'aide pour votre projet automobile ?",
      EN: "Need help with your car project?",
      ES: "¿Necesita ayuda con su proyecto de automóvil?",
      IT: "Hai bisogno di aiuto per il tuo progetto automobilistico?",
      PT: "Precisa de ajuda com o seu projeto automóvel?",
      RO: "Aveți nevoie de ajutor pentru proiectul dvs. auto?"
    },
    advisorsAvailable: {
      FR: "Nos conseillers sont à votre disposition pour vous aider à trouver le véhicule de vos rêves. Achetez en ligne ou contactez-nous pour toute question.",
      EN: "Our advisors are at your disposal to help you find the vehicle of your dreams. Buy online or contact us for any questions.",
      ES: "Nuestros asesores están a su disposición para ayudarle a encontrar el vehículo de sus sueños. Compre en línea o contáctenos para cualquier pregunta.",
      IT: "I nostri consulenti sono a tua disposizione per aiutarti a trovare il veicolo dei tuoi sogni. Acquista online o contattaci per qualsiasi domanda.",
      PT: "Os nossos consultores estão à sua disposição para o ajudar a encontrar o veículo dos seus sonhos. Compre online ou contacte-nos para qualquer pergunta.",
      RO: "Consilierii noștri sunt la dispoziția dvs. pentru a vă ajuta să găsiți vehiculul visurilor dvs. Cumpărați online sau contactați-ne pentru orice întrebare."
    },
    contactUs: {
      FR: "Nous contacter",
      EN: "Contact us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    },
    buyOnline: {
      FR: "Acheter en ligne",
      EN: "Buy online",
      ES: "Comprar en línea",
      IT: "Acquista online",
      PT: "Comprar online",
      RO: "Cumpără online"
    },
    hoursAvailable: {
      FR: "Lun-Sam: 9h00-19h00",
      EN: "Mon-Sat: 9AM-7PM",
      ES: "Lun-Sáb: 9h00-19h00",
      IT: "Lun-Sab: 9:00-19:00",
      PT: "Seg-Sáb: 9h00-19h00",
      RO: "Lun-Sâm: 9:00-19:00"
    },
    socialMediaInfo: {
      FR: "Disponible sur Facebook et WhatsApp",
      EN: "Available on Facebook and WhatsApp",
      ES: "Disponible en Facebook y WhatsApp",
      IT: "Disponibile su Facebook e WhatsApp",
      PT: "Disponível no Facebook e WhatsApp",
      RO: "Disponibil pe Facebook și WhatsApp"
    }
  };
  
  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {translate('needHelpTitle', translations.needHelpTitle)}
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              {translate('advisorsAvailable', translations.advisorsAvailable)}
            </p>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">+39 376 175 3341</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">WhatsApp: +39 376 175 3341</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">serviceautoadi@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">{translate('hoursAvailable', translations.hoursAvailable)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-lg font-semibold flex items-center mb-2">
                <Facebook className="h-5 w-5 mr-3 text-brand-orange" />
                {translate('socialMediaInfo', translations.socialMediaInfo)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white px-3 py-2 rounded flex items-center hover:bg-[#166fe5] transition-colors"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </a>
                <a 
                  href="https://wa.me/393761753341" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-3 py-2 rounded flex items-center hover:bg-[#22c35e] transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-brand-orange text-white hover:bg-brand-lightOrange transition-colors px-6 py-3 text-lg font-semibold">
                  {translate('contactUs', translations.contactUs)}
                </Button>
              </Link>
              <Link to="/vehicules/occasion">
                <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors px-6 py-3 text-lg text-white font-semibold inline-flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {translate('buyOnline', translations.buyOnline)}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560250056-07ba64664864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                alt="Conseiller Auto Adi" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-brand-blue/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
