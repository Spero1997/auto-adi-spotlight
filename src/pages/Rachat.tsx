
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Clipboard, ArrowRight, Banknote, FileCheck, CalendarClock, Clock, Check, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Rachat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Vendez votre véhicule rapidement et au meilleur prix</h1>
                <p className="text-xl mb-8">Auto Adi vous propose une solution simple et transparente pour vendre votre voiture, quelle que soit sa marque, son modèle ou son état.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                      Estimer mon véhicule
                    </Button>
                  </Link>
                  <a href="tel:+33123456789">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                      Nous appeler
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80" 
                  alt="Vente de voiture" 
                  className="rounded-lg shadow-xl object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi vendre votre véhicule à Auto Adi ?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nous vous offrons un service complet de rachat de véhicules avec des avantages exclusifs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Banknote className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Prix compétitif</h3>
                  <p className="text-gray-600">
                    Nous vous proposons le meilleur prix du marché pour votre véhicule, basé sur une évaluation précise.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Vente rapide</h3>
                  <p className="text-gray-600">
                    Évitez les délais d'une vente entre particuliers et obtenez une offre de rachat en moins de 24h.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FileCheck className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Démarches simplifiées</h3>
                  <p className="text-gray-600">
                    Nous nous occupons de toutes les formalités administratives liées à la vente de votre véhicule.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Rachat en l'état</h3>
                  <p className="text-gray-600">
                    Nous rachetons votre voiture quelque soit son état : en panne, accidentée ou avec un fort kilométrage.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un processus simple en 4 étapes pour vendre votre véhicule rapidement.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="hidden md:block absolute left-[75px] top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>
                
                {/* Steps */}
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Clipboard className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">1. Demande d'estimation</h3>
                      <p className="text-gray-600">
                        Remplissez notre formulaire en ligne avec les informations de votre véhicule ou contactez-nous par téléphone. Vous pouvez également vous rendre directement dans l'une de nos concessions.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Car className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">2. Expertise de votre véhicule</h3>
                      <p className="text-gray-600">
                        Nos experts évaluent votre véhicule soit à distance sur base de photos, soit lors d'un rendez-vous en concession. L'expertise prend en compte l'état général, l'historique d'entretien et le marché actuel.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Banknote className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">3. Offre de rachat</h3>
                      <p className="text-gray-600">
                        Vous recevez une offre ferme et sans engagement sous 24h. Notre proposition est valable 7 jours, vous laissant le temps de prendre votre décision.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <FileCheck className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">4. Finalisation de la vente</h3>
                      <p className="text-gray-600">
                        Si vous acceptez notre offre, nous nous occupons de toutes les formalités administratives. Le paiement est effectué par virement bancaire ou par chèque de banque le jour même.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Estimez votre véhicule</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Remplissez ce formulaire pour recevoir une estimation gratuite de votre véhicule sous 24h.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Marque *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Modèle *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Année *</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        min="1990"
                        max="2030"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Kilométrage *</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Type de carburant *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" required>
                      <option value="">Sélectionnez</option>
                      <option value="essence">Essence</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybride">Hybride</option>
                      <option value="electrique">Électrique</option>
                      <option value="gpl">GPL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">État général du véhicule *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" required>
                      <option value="">Sélectionnez</option>
                      <option value="excellent">Excellent - Comme neuf</option>
                      <option value="bon">Bon - Quelques marques d'usure</option>
                      <option value="moyen">Moyen - Usure normale</option>
                      <option value="mauvais">Mauvais - Problèmes mécaniques ou esthétiques</option>
                      <option value="accidente">Accidenté</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nom *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Commentaires (optionnel)</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue h-32"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue text-lg font-semibold py-3">
                    Demander une estimation
                  </Button>
                </form>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">Documents à prévoir</h3>
                  <p className="text-gray-600 mb-6">
                    Pour la vente de votre véhicule, vous devrez présenter les documents suivants :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Carte grise originale du véhicule</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Pièce d'identité en cours de validité</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Justificatif de domicile de moins de 3 mois</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Carnet d'entretien et factures d'entretien (si disponibles)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Contrôle technique de moins de 6 mois pour les véhicules de plus de 4 ans</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Les deux clés du véhicule</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-blue/10 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">Témoignage client</h3>
                  <blockquote className="italic text-gray-700 mb-6">
                    "J'avais besoin de vendre ma voiture rapidement pour financer mon prochain achat. Auto Adi m'a proposé un prix juste et a géré toutes les démarches administratives. Transaction rapide et professionnelle !"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <p className="font-bold">Michel D.</p>
                      <p className="text-sm text-gray-600">Lyon</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
                  <p className="text-gray-600 mb-6">
                    Notre équipe est à votre disposition pour répondre à toutes vos questions concernant la vente de votre véhicule.
                  </p>
                  <div className="space-y-4">
                    <a href="tel:+33123456789" className="flex items-center text-brand-blue hover:underline">
                      <Phone className="h-5 w-5 mr-2" />
                      01 23 45 67 89
                    </a>
                    <a href="mailto:contact@auto-adi.fr" className="flex items-center text-brand-blue hover:underline">
                      <Mail className="h-5 w-5 mr-2" />
                      contact@auto-adi.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tout ce que vous devez savoir sur notre service de rachat de véhicules.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Combien de temps faut-il pour obtenir une offre de rachat ?</h3>
                <p className="text-gray-600">
                  Après réception de votre demande et des informations sur votre véhicule, nous vous faisons parvenir une estimation sous 24h ouvrées. Une offre définitive peut être faite immédiatement après l'expertise physique du véhicule.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Rachetez-vous les véhicules en panne ou accidentés ?</h3>
                <p className="text-gray-600">
                  Oui, nous rachetons tous types de véhicules, y compris ceux qui sont en panne, accidentés ou avec un fort kilométrage. La valeur de rachat sera simplement ajustée en fonction de l'état du véhicule.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Comment est calculé le prix de rachat ?</h3>
                <p className="text-gray-600">
                  Le prix de rachat est calculé en fonction de plusieurs critères : la marque et le modèle, l'année, le kilométrage, l'état général, l'historique d'entretien, les équipements et options, ainsi que la demande du marché pour ce type de véhicule.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Puis-je vendre ma voiture si elle est encore sous crédit ?</h3>
                <p className="text-gray-600">
                  Oui, c'est possible. Nous pouvons racheter votre véhicule même s'il est encore sous financement. Nous nous occuperons des démarches nécessaires pour solder votre crédit auprès de l'organisme financier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Prêt à vendre votre véhicule ?</h2>
              <p className="text-xl mb-8">
                Obtenez une estimation gratuite et sans engagement en quelques minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    Demander une estimation
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

export default Rachat;
