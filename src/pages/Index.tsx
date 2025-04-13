
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HeroCarousel from '@/components/HeroCarousel';
import Benefits from '@/components/Benefits';
import FeaturedCars from '@/components/FeaturedCars';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Brands from '@/components/Brands';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
// Import HeroScene3D seulement si vous décidez de l'utiliser
// import HeroScene3D from '@/components/HeroScene3D';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { translate } = useLanguage();
  const [animation3DComplete, setAnimation3DComplete] = useState(false);
  const [showHero3D, setShowHero3D] = useState(false);
  
  // Si le composant 3D n'est pas utilisé, remplaçons-le par un autre composant héros
  const heroComponent = showHero3D ? (
    // Nous pourrions importer dynamiquement HeroScene3D ici si nécessaire
    <HeroCarousel />
  ) : (
    <HeroCarousel />
  );

  return (
    <>
      <Helmet>
        <title>Auto Adi Florence - Votre concessionnaire automobile pas cher</title>
        <meta name="description" content="Vente de véhicules d'occasion à prix compétitifs. Financement auto à taux 0%, reprise gratuite de votre ancien véhicule. Livraison en Italie et partout en Europe." />
        <meta name="keywords" content="Auto Adi Florence, concessionnaire auto pas cher, vente voiture occasion, financement taux 0%, reprise vehicule gratuite, livraison Europe" />
        <link rel="canonical" href="https://autoadi.com" />
      </Helmet>
      
      <Header />
      
      {/* Contenu principal */}
      <main>
        {/* Section Hero - Utilisez soit HeroCarousel, soit Hero selon le besoin */}
        {heroComponent}
        
        {/* Autre option de hero standard sans 3D */}
        {!showHero3D && <Hero />}
        
        {/* Avantages */}
        <Benefits />
        
        {/* Véhicules vedettes */}
        <section className="py-16 bg-gray-50">
          <FeaturedCars featuredOnly={true} />
        </section>
        
        {/* Témoignages */}
        <TestimonialSection />
        
        {/* Appel à l'action */}
        <CallToAction />
        
        {/* Marques */}
        <Brands />
      </main>
      
      <Footer />
      
      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

export default Index;
