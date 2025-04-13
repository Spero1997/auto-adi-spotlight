
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Car } from 'lucide-react';
import VerticalMarquee from '@/components/VerticalMarquee';
import FeaturedCars from '@/components/FeaturedCars';
import QuickSearch from '@/components/QuickSearch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CallToAction from '@/components/CallToAction';
import { Button } from '@/components/ui/button';
import { addKiaSorento } from '@/utils/manualVehicleAdder';
import { toast } from '@/hooks/use-toast';

const VehiculesOccasion = () => {
  const [useQuickSearch, setUseQuickSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<any>({});
  
  const handleSearch = (params: any) => {
    setSearchParams(params);
    setUseQuickSearch(true);
  };
  
  const handleAddKiaSorento = () => {
    const success = addKiaSorento();
    if (success) {
      toast({
        title: "Kia Sorento ajoutée",
        description: "Le véhicule a été ajouté au catalogue standard.",
        variant: "default",
      });
      
      // Forcer le rechargement des véhicules
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'standard' } 
      }));
      
      // Recharger la page après un court délai pour voir le nouveau véhicule
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le véhicule au catalogue.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Véhicules d'occasion | Auto Adi</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion de qualité. Toutes marques, tous modèles, prix compétitifs." />
        <meta name="keywords" content="véhicules occasion, voiture occasion, auto occasion, occasion fiable, achat voiture occasion" />
        <link rel="canonical" href="https://auto-adi.fr/vehicules/occasion" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Véhicules d'occasion</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de véhicules d'occasion soigneusement vérifiés 
                pour vous offrir qualité et fiabilité à des prix compétitifs.
              </p>
              
              <div className="flex justify-center mt-4">
                <Button onClick={handleAddKiaSorento} variant="outline" className="gap-2">
                  <Car className="h-4 w-4" />
                  Ajouter Kia Sorento
                </Button>
              </div>
            </div>
            
            <QuickSearch />
          </div>
        </section>
        
        <FeaturedCars 
          searchFilters={useQuickSearch ? searchParams : undefined} 
          featuredOnly={false}
        />

        <VerticalMarquee />

        <CallToAction />
      </main>

      <Footer />
    </>
  );
};

export default VehiculesOccasion;
