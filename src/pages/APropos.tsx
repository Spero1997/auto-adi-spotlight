
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
                  Fondée en 2002 par les frères Adam et Daniel Ivanic, Auto Adi est née d'une passion partagée pour l'automobile et d'une vision commune : offrir des véhicules de qualité à des prix justes, accompagnés d'un service irréprochable.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Ce qui a commencé comme un petit garage familial à Lyon s'est progressivement développé pour devenir un réseau de concessions respecté dans toute la France, tout en conservant les valeurs familiales qui ont fait notre succès.
                </p>
                <p className="text-lg text-gray-600">
                  Aujourd'hui, Auto Adi emploie plus de 120 collaborateurs passionnés et commercialise plus de 3 000 véhicules par an, tout en continuant à placer la satisfaction client au cœur de notre démarche.
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

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre équipe de direction</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Rencontrez les personnes qui contribuent à faire d'Auto Adi une entreprise d'exception.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Adam Ivanic" 
                    className="rounded-lg shadow-md w-full h-64 object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Adam Ivanic</h3>
                <p className="text-brand-blue font-medium mb-3">Co-fondateur & PDG</p>
                <p className="text-gray-600">
                  Passionné d'automobile depuis son plus jeune âge, Adam dirige l'entreprise avec vision et ambition.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                    alt="Daniel Ivanic" 
                    className="rounded-lg shadow-md w-full h-64 object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Daniel Ivanic</h3>
                <p className="text-brand-blue font-medium mb-3">Co-fondateur & Directeur Technique</p>
                <p className="text-gray-600">
                  Expert en mécanique automobile, Daniel supervise la qualité technique de tous nos véhicules.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Sophie Lambert" 
                    className="rounded-lg shadow-md w-full h-64 object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Sophie Lambert</h3>
                <p className="text-brand-blue font-medium mb-3">Directrice Commerciale</p>
                <p className="text-gray-600">
                  Avec 15 ans d'expérience dans le secteur automobile, Sophie dirige notre réseau commercial avec excellence.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Marc Dubois" 
                    className="rounded-lg shadow-md w-full h-64 object-cover object-center"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Marc Dubois</h3>
                <p className="text-brand-blue font-medium mb-3">Directeur Financier</p>
                <p className="text-gray-600">
                  Ancien banquier spécialisé dans le financement automobile, Marc gère les aspects financiers de l'entreprise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-16 bg-gray-50" id="locations">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos concessions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez-nous dans nos différentes concessions à travers la France.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1565609538-b2c9c516e9b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                      alt="Auto Adi Lyon" 
                      className="rounded-lg h-48 w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Auto Adi Lyon</h3>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">123 Avenue Jean Jaurès, 69007 Lyon</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600"><span className="font-semibold">Téléphone:</span> 04 78 12 34 56</p>
                    <p className="text-gray-600"><span className="font-semibold">Horaires:</span> Lun-Sam 9h-19h</p>
                  </div>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Contacter cette concession
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                      alt="Auto Adi Paris" 
                      className="rounded-lg h-48 w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Auto Adi Paris</h3>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">45 Boulevard Malesherbes, 75008 Paris</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600"><span className="font-semibold">Téléphone:</span> 01 45 67 89 10</p>
                    <p className="text-gray-600"><span className="font-semibold">Horaires:</span> Lun-Sam 9h-19h</p>
                  </div>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Contacter cette concession
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1493616710305-d1bbaf6b2e8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80" 
                      alt="Auto Adi Marseille" 
                      className="rounded-lg h-48 w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Auto Adi Marseille</h3>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">78 Boulevard Michelet, 13008 Marseille</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-600"><span className="font-semibold">Téléphone:</span> 04 91 23 45 67</p>
                    <p className="text-gray-600"><span className="font-semibold">Horaires:</span> Lun-Sam 9h-19h</p>
                  </div>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Contacter cette concession
                    </Button>
                  </Link>
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
                            Ouverture du premier garage à Lyon par les frères Ivanic, spécialisé dans la vente de véhicules d'occasion.
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
                      <span className="block mt-2 font-bold">2008</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Expansion à Paris</h3>
                          <p className="text-gray-600">
                            Ouverture de la première concession parisienne et développement de l'offre de services après-vente.
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
                      <span className="block mt-2 font-bold">2012</span>
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
                      <span className="block mt-2 font-bold">2018</span>
                    </div>
                    <div className="md:pt-2">
                      <Card className="bg-white shadow-md">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Ouverture à Marseille</h3>
                          <p className="text-gray-600">
                            Inauguration de la concession de Marseille et lancement du service de livraison à domicile.
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
                          <h3 className="text-xl font-bold mb-2">Digitalisation de l'expérience client</h3>
                          <p className="text-gray-600">
                            Lancement de notre plateforme en ligne permettant l'achat de véhicules entièrement à distance.
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
