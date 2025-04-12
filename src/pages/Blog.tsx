
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { getSeoFocusedBlogTopics } from '@/utils/seoUtils';

const blogTopics = getSeoFocusedBlogTopics();

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog Auto Adi | Conseils et guides sur l'achat de voiture, financement auto taux 0%</title>
        <meta 
          name="description" 
          content="Découvrez nos guides d'achat, conseils et actualités sur l'automobile. Reprise véhicule gratuite, financement auto taux 0%, achat voiture neuve et occasion."
        />
        <meta 
          name="keywords" 
          content="blog automobile, conseils achat voiture, financement auto taux 0%, reprise véhicule gratuite, guide achat voiture occasion"
        />
        <link rel="canonical" href="https://autoadi.com/blog" />
      </Helmet>

      <Header />

      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog Auto Adi</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos guides d'achat, conseils et actualités sur l'automobile. Tout ce que vous devez savoir pour faire le bon choix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogTopics.map((topic, index) => (
              <Card key={index} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative pb-[56.25%] overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-400 text-sm">Image d'illustration à venir</p>
                  </div>
                </div>
                
                <CardContent className="flex-grow p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>À paraître</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                    {topic.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    Cet article à venir couvrira: {topic.topics.join(', ')}.
                  </p>
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <Button variant="ghost" className="ml-auto flex items-center gap-1">
                    À venir prochainement
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-primary/5 rounded-xl p-8 mb-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Vous avez une question spécifique ?</h2>
              <p className="text-gray-600 mb-6">
                Notre équipe d'experts est disponible pour vous aider dans votre recherche du véhicule idéal.
              </p>
              <Link to="/contact">
                <Button size="lg">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
