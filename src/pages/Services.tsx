
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wrench, Car, Calendar, Shield, Gauge, Fuel, ScrollText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Services automobiles professionnels</h1>
              <p className="text-xl mb-8">Notre équipe d'experts est à votre service pour l'entretien et la réparation de votre véhicule.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                    Prendre rendez-vous
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

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos services automobiles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre gamme complète de services pour maintenir votre véhicule en parfait état.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Wrench className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Entretien régulier</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Services d'entretien régulier incluant vidange d'huile, remplacement des filtres et vérification complète des systèmes.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Vidange d'huile et remplacement de filtre</li>
                    <li>Rotation des pneus et équilibrage</li>
                    <li>Vérification des niveaux de fluides</li>
                    <li>Inspection des freins</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Gauge className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Diagnostic électronique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Diagnostic complet des systèmes électroniques et informatiques de votre véhicule grâce à des équipements de pointe.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Lecture des codes défaut</li>
                    <li>Diagnostic des pannes électroniques</li>
                    <li>Test des capteurs et actuateurs</li>
                    <li>Reprogrammation des calculateurs</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Wrench className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Réparations mécaniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Services de réparation pour tous types de problèmes mécaniques, réalisés par nos techniciens qualifiés.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Réparation de moteur</li>
                    <li>Système de freinage</li>
                    <li>Boîte de vitesses et transmission</li>
                    <li>Suspension et direction</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Garantie constructeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Entretien de votre véhicule sous garantie constructeur sans l'affecter, en utilisant des pièces d'origine.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Service agréé multi-marques</li>
                    <li>Utilisation de pièces d'origine</li>
                    <li>Respect du carnet d'entretien</li>
                    <li>Documentation complète des interventions</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Car className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Préparation technique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Préparation de votre véhicule pour le contrôle technique, avec pré-contrôle et corrections nécessaires.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Pré-contrôle technique complet</li>
                    <li>Correction des points de défaillance</li>
                    <li>Rapport détaillé des interventions</li>
                    <li>Accompagnement administratif</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Fuel className="h-7 w-7 text-brand-blue" />
                  </div>
                  <CardTitle>Climatisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Service complet pour les systèmes de climatisation : recharge, désinfection et réparation.
                  </p>
                  <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
                    <li>Recharge de gaz climatisation</li>
                    <li>Nettoyage et désinfection du circuit</li>
                    <li>Remplacement des filtres d'habitacle</li>
                    <li>Détection et réparation des fuites</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/rendez-vous" className="w-full">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre processus de service</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Un service transparent et efficace du début à la fin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Rendez-vous</h3>
                <p className="text-gray-600">
                  Prenez rendez-vous en ligne ou par téléphone selon vos disponibilités.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Diagnostic</h3>
                <p className="text-gray-600">
                  Nos techniciens examinent votre véhicule et vous fournissent un devis détaillé.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Intervention</h3>
                <p className="text-gray-600">
                  Après votre approbation, nos mécaniciens effectuent les travaux nécessaires.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ScrollText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">4. Remise du véhicule</h3>
                <p className="text-gray-600">
                  Récupérez votre véhicule avec une explication détaillée des travaux effectués.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Besoin d'un service pour votre véhicule ?</h2>
              <p className="text-xl mb-8">
                Nos experts sont à votre service pour entretenir et réparer votre véhicule, quelle que soit sa marque ou son modèle.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/rendez-vous">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    Prendre rendez-vous
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    Nous contacter
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

export default Services;
