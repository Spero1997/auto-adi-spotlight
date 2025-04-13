
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Votre véhicule livré où que vous soyez</h2>
          <p className="text-xl mb-8">
            Bénéficiez de notre service de livraison internationale clé en main et recevez votre véhicule en toute sécurité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                Demander un devis
              </Button>
            </Link>
            <Link to="/vehicules">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                Voir nos véhicules
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
