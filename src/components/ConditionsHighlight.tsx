
import { Check, Shield, Calendar, CreditCard, Truck, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ConditionsHighlight = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos conditions avantageuses</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Concessionnaire automobile, nous vendons des voitures d'occasion en Europe. Nous livrons partout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-t-4 border-t-brand-blue shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <CreditCard className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Modalités de paiement</h3>
                </div>
                <ul className="space-y-3 text-gray-600 flex-1">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Acompte : 20% à la commande</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)</span>
                  </li>
                  <li className="flex items-start font-semibold text-brand-blue">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>Offre spéciale : -10% pour paiement comptant à la commande</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-brand-orange shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-brand-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Check className="h-7 w-7 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Nos services inclus</h3>
                </div>
                <ul className="space-y-3 text-gray-600 flex-1">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>Délai de rétractation : 14 jours (Satisfait ou remboursé)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>Facilité de paiement : Payable comptant ou en mensualités sans intérêt</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-green-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Garantie</h3>
                </div>
                <div className="space-y-3 text-gray-600 flex-1">
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>12 à 48 mois, selon le type de véhicule</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Possibilité d'extension de garantie</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Valable dans toute l'Europe</span>
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
                    <Settings className="h-6 w-6 text-brand-blue" />
                    <p className="font-medium text-gray-800">Service garage automobile disponible</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl flex items-start">
            <Truck className="h-6 w-6 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">
              <span className="font-semibold">Livraison européenne :</span> Nous livrons nos véhicules partout en Europe. Contactez-nous pour plus d'informations sur les délais et les modalités de livraison.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionsHighlight;
