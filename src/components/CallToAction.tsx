
import { Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'aide pour votre projet automobile ?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Nos conseillers sont à votre disposition pour vous aider à trouver le véhicule de vos rêves. N'hésitez pas à nous contacter pour toute question.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">contact@auto-adi.fr</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-lg">Lun-Sam: 9h00-19h00</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-white text-brand-blue hover:bg-gray-100 transition-colors px-6 py-3 text-lg font-semibold">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/rendez-vous">
                <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors px-6 py-3 text-lg text-white font-semibold">
                  Prendre rendez-vous
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
