
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Livraison internationale de véhicules</h1>
          <p className="text-xl mb-8">Notre service de livraison internationale vous permet d'acquérir votre véhicule où que vous soyez en Europe.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold">
                Demander un devis
              </Button>
            </Link>
            <a href="tel:+33123456789">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                Nous appeler
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
