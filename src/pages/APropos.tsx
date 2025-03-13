
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award, Building, Car, Calendar, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos d'Auto Adi</h1>
              <p className="text-xl mb-8">
                Depuis plus de 20 ans, nous accompagnons nos clients dans leurs projets automobiles avec passion et professionnalisme.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                    Nous contacter
                  </Button>
                </Link>
                <Link to="/vehicules/occasion">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                    Voir nos véhicules
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Fondée en 2002 à Florence en Italie, Auto Adi est née d'une passion pour l'automobile et d'une vision claire : offrir des véhicules de qualité à des prix justes, accompagnés d'un service irréprochable.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Ce qui a commencé comme un petit garage familial à Florence s'est progressivement développé pour devenir une entreprise reconnue avec une présence en Roumanie, tout en conservant les valeurs familiales qui ont fait notre succès.
                </p>
                <p className="text-lg text-gray-600">
                  Aujourd'hui, Auto Adi emploie plus de 120 collaborateurs passionnés et commercialise plus de 3 000 véhicules par an, tout en préparant son expansion en Espagne, au Portugal et en France.
                </p>
              </div>
              
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Auto Adi histoire" 
                  className="rounded-lg shadow-lg"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-4xl font-bold text-brand-blue">20+</h3>
                    <p className="text-gray-600 mt-2">Années d'expérience</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-4xl font-bold text-brand-blue">15 000+</h3>
                    <p className="text-gray-600 mt-2">Clients satisfaits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les principes qui guident chacune de nos actions au quotidien.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Proximité client</h3>
                  <p className="text-gray-600">
                    Nous privilégions une relation de confiance et de proximité avec nos clients, en restant à l'écoute de leurs besoins et en leur apportant des conseils personnalisés.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Award className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    Nous nous engageons à offrir des véhicules et des services de la plus haute qualité, en veillant à respecter les normes les plus exigeantes dans tous les aspects de notre activité.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Check className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Transparence</h3>
                  <p className="text-gray-600">
                    Nous croyons en une communication claire et honnête avec nos clients, en présentant les caractéristiques et l'historique de chaque véhicule de manière transparente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre parcours</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Les moments clés qui ont façonné notre entreprise au fil des années.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="hidden md:block absolute left-[100px] top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>
                
                {/* Timeline */}
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2002</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Création d'Auto Adi</h3>
                          <p className="text-gray-600">
                            Ouverture du premier garage à Florence, Italie, spécialisé dans la vente de véhicules d'occasion.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2010</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Expansion en Roumanie</h3>
                          <p className="text-gray-600">
                            Ouverture de notre première concession internationale à Bucarest et développement sur le marché roumain.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2016</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Lancement du paiement échelonné</h3>
                          <p className="text-gray-600">
                            Introduction de notre solution de financement sans frais qui a révolutionné l'achat automobile.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="text-center md:text-right md:w-[100px] flex-shrink-0">
                      <div className="bg-brand-blue rounded-full w-10 h-10 flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <span className="block mt-2 font-bold">2023</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Digitalisation et projets d'expansion</h3>
                          <p className="text-gray-600">
                            Lancement de notre plateforme en ligne et préparation pour l'expansion en Espagne, au Portugal et en France.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Rejoignez l'aventure Auto Adi</h2>
                <p className="text-xl mb-8">
                  Nous sommes toujours à la recherche de talents passionnés pour rejoindre notre équipe et contribuer à notre développement.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                      Voir nos offres d'emploi
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80" 
                  alt="Équipe Auto Adi" 
                  className="rounded-lg shadow-xl object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default APropos;
