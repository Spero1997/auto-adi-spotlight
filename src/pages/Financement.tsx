
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, BarChart3, Calculator, Shield, Check, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Financement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions de financement adaptées</h1>
              <p className="text-xl mb-8">Découvrez nos options de financement flexibles pour acquérir le véhicule de vos rêves sans contraintes budgétaires.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                    Obtenir un devis personnalisé
                  </Button>
                </Link>
                <Link to="/vehicules/occasion">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    Voir les véhicules disponibles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Financing Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos solutions de financement</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choisissez la solution qui correspond le mieux à vos besoins et à votre budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-t-4 border-t-brand-blue shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <CreditCard className="h-7 w-7 text-brand-blue" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Crédit classique</h3>
                    <p className="text-gray-600">
                      Financez votre véhicule avec des mensualités fixes sur la durée de votre choix.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-semibold">12 à 84 mois</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Apport initial</span>
                        <span className="font-semibold">Dès 10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Propriété</span>
                        <span className="font-semibold">Dès la signature</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Mensualités fixes et prévisibles</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Possibilité de remboursement anticipé</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Vous êtes propriétaire du véhicule</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/contact" className="w-full">
                      <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-brand-orange shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="absolute top-0 right-0 bg-brand-orange text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Populaire
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-brand-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <BarChart3 className="h-7 w-7 text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Location avec Option d'Achat (LOA)</h3>
                    <p className="text-gray-600">
                      Louez votre véhicule avec option d'achat à la fin du contrat.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-semibold">24 à 60 mois</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Premier loyer</span>
                        <span className="font-semibold">10% à 30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Option d'achat</span>
                        <span className="font-semibold">En fin de contrat</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Loyers souvent moins élevés qu'un crédit</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Choix en fin de contrat : acheter ou restituer</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Protection contre la dépréciation du véhicule</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/contact" className="w-full">
                      <Button className="w-full bg-brand-orange hover:bg-brand-lightOrange">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="bg-green-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Calculator className="h-7 w-7 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Paiement échelonné</h3>
                    <p className="text-gray-600">
                      Solution exclusive Auto Adi : payez en plusieurs fois sans frais ni intérêts.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-semibold">6 à 48 mois</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Acompte</span>
                        <span className="font-semibold">20% à la commande</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Propriété</span>
                        <span className="font-semibold">Dès le paiement final</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Aucun frais ni intérêt</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Sans organisme financier</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Solution rapide sans dossier complexe</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/contact" className="w-full">
                      <Button className="w-full bg-green-500 hover:bg-green-600">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="max-w-3xl mx-auto">
              <Info className="h-5 w-5" />
              <AlertTitle>Offre spéciale paiement comptant</AlertTitle>
              <AlertDescription>
                Bénéficiez d'une remise de 10% sur le prix du véhicule pour tout paiement comptant à la commande.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Simulez votre financement</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Utilisez notre calculateur pour obtenir une estimation de vos mensualités selon le type de financement choisi.
                </p>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Prix du véhicule</label>
                    <input
                      type="text"
                      placeholder="25 000 €"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Apport initial</label>
                    <input
                      type="text"
                      placeholder="5 000 €"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Durée (en mois)</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                      <option value="12">12 mois</option>
                      <option value="24">24 mois</option>
                      <option value="36" selected>36 mois</option>
                      <option value="48">48 mois</option>
                      <option value="60">60 mois</option>
                      <option value="72">72 mois</option>
                      <option value="84">84 mois</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Type de financement</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue">
                      <option value="credit">Crédit classique</option>
                      <option value="loa">Location avec Option d'Achat (LOA)</option>
                      <option value="echelonne">Paiement échelonné</option>
                    </select>
                  </div>
                  <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                    Calculer mes mensualités
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <img 
                  src="/calculateur-financement.jpg" 
                  alt="Simulation de financement" 
                  className="rounded-lg shadow-lg object-cover h-[300px] w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
                <img 
                  src="/contrat-financement.jpg" 
                  alt="Calculateur de financement" 
                  className="rounded-lg shadow-lg object-cover h-[180px] w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tout ce que vous devez savoir sur nos solutions de financement.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Quels documents sont nécessaires pour une demande de financement ?</h3>
                <p className="text-gray-600">
                  Pour toute demande de financement, vous devrez généralement fournir une pièce d'identité, un justificatif de domicile récent, vos trois derniers bulletins de salaire et votre dernier avis d'imposition.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Puis-je obtenir un financement avec un apport minimal ?</h3>
                <p className="text-gray-600">
                  Oui, nous proposons des solutions avec un apport minimal de seulement 10% du prix du véhicule. Dans certains cas, selon votre profil, des financements sans apport peuvent même être envisagés.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Quelle est la différence entre crédit et LOA ?</h3>
                <p className="text-gray-600">
                  Avec un crédit classique, vous devenez propriétaire du véhicule dès la signature du contrat. Avec la LOA, vous louez le véhicule et avez l'option de l'acheter en fin de contrat en payant la valeur résiduelle.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Le paiement échelonné est-il soumis à des frais ?</h3>
                <p className="text-gray-600">
                  Non, notre solution de paiement échelonné est sans frais ni intérêts. Vous payez uniquement le prix du véhicule réparti sur la durée choisie, sans aucun coût supplémentaire.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Puis-je rembourser mon crédit par anticipation ?</h3>
                <p className="text-gray-600">
                  Oui, le remboursement anticipé est possible pour tous nos financements. Pour les crédits classiques, des indemnités de remboursement anticipé peuvent s'appliquer selon les conditions du contrat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à financer votre prochain véhicule ?</h2>
              <p className="text-xl mb-8">
                Nos conseillers financiers sont à votre disposition pour vous aider à trouver la solution la plus adaptée à votre situation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    Demander un devis
                  </Button>
                </Link>
                <Link to="/vehicules/occasion">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    Voir nos véhicules
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Financement;
