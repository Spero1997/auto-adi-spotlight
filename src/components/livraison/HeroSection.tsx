
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Truck, Phone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-brand-blue to-brand-darkBlue text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 animate-fade-in">Livraison internationale de véhicules</h1>
          <p className="text-xl mb-8 opacity-90 animate-fade-in animation-delay-300">Notre service de livraison internationale vous permet d'acquérir votre véhicule où que vous soyez en Europe.</p>
          <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
            <Link to="/contact">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold group">
                <span>Demander un devis</span>
                <Truck className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+33123456789">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold group">
                <Phone className="mr-2 h-5 w-5" />
                <span>Nous appeler</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
