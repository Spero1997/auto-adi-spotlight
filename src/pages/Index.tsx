
// Only updating the translation objects
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroCarousel from '@/components/HeroCarousel';
import QuickSearch from '@/components/QuickSearch';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { resetCatalog, addImportedVehicle, getImportedVehicles } from '@/utils/vehicleImportService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Auto Adi",
  "description": "Concessionnaire auto pas cher pour l'achat de voitures neuves et d'occasion à Florence, Italie",
  "url": "https://autoadi.com",
  "logo": "https://autoadi.com/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Florence",
    "addressCountry": "IT"
  },
  "offers": {
    "@type": "Offer",
    "description": "Financement auto taux 0%, reprise véhicule gratuite",
    "priceCurrency": "EUR"
  }
};

const Index = () => {
  const { translate, language } = useLanguage();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const translations = {
    pageTitle: {
      FR: "Auto Adi - Concessionnaire auto pas cher | Achat voiture neuve et occasion Florence",
      EN: "Auto Adi - Affordable Car Dealer | New and Used Cars in Florence, Italy",
      ES: "Auto Adi - Concesionario de coches económicos | Compra de coches nuevos y usados en Florencia, Italia",
      IT: "Auto Adi - Concessionario auto economico | Acquisto auto nuove e usate a Firenze, Italia",
      PT: "Auto Adi - Concessionário de automóveis acessível | Carros novos e usados em Florença, Itália",
      RO: "Auto Adi - Dealer auto la prețuri accesibile | Mașini noi și second-hand în Florența, Italia",
      DE: "Auto Adi - Günstiger Autohändler | Neue und gebrauchte Autos in Florenz, Italien",
      NL: "Auto Adi - Betaalbare autodealer | Nieuwe en gebruikte auto's in Florence, Italië",
      PL: "Auto Adi - Przystępny cenowo dealer samochodowy | Nowe i używane samochody we Florencji, Włochy",
      RU: "Auto Adi - Доступный автодилер | Новые и подержанные автомобили во Флоренции, Италия"
    },
    pageDescription: {
      FR: "Auto Adi, votre concessionnaire automobile de confiance pour l'achat de véhicules neufs et d'occasion à Florence. Financement auto taux 0%, reprise véhicule gratuite et garanties exceptionnelles.",
      EN: "Auto Adi, your trusted car dealer for buying new and used vehicles in Florence. 0% auto financing, free vehicle trade-in and exceptional warranties.",
      ES: "Auto Adi, su concesionario de confianza para la compra de vehículos nuevos y usados en Florencia. Financiación al 0%, recompra gratuita y garantías excepcionales.",
      IT: "Auto Adi, il tuo concessionario di fiducia per l'acquisto di veicoli nuovi e usati a Firenze. Finanziamento auto 0%, ripresa gratuita del veicolo e garanzie eccezionali.",
      PT: "Auto Adi, seu concessionário de confiança para a compra de veículos novos e usados em Florença. Financiamento automóvel 0%, retoma gratuita de veículos e garantias excepcionais.",
      RO: "Auto Adi, dealerul dvs. auto de încredere pentru achiziționarea de vehicule noi și second-hand în Florența. Finanțare auto 0%, preluare gratuită a vehiculelor și garanții excepționale.",
      DE: "Auto Adi, Ihr vertrauenswürdiger Autohändler für den Kauf von Neu- und Gebrauchtwagen in Florenz. 0% Autofinanzierung, kostenlose Fahrzeuginzahlungnahme und außergewöhnliche Garantien.",
      NL: "Auto Adi, uw vertrouwde autodealer voor het kopen van nieuwe en gebruikte voertuigen in Florence. 0% autofinanciering, gratis inruil van voertuigen en uitzonderlijke garanties.",
      PL: "Auto Adi, Twój zaufany dealer samochodowy do zakupu nowych i używanych pojazdów we Florencji. Finansowanie samochodu 0%, bezpłatny odkup pojazdu i wyjątkowe gwarancje.",
      RU: "Auto Adi, ваш надежный автодилер для покупки новых и подержанных автомобилей во Флоренции. Автофинансирование 0%, бесплатный обмен автомобилей и исключительные гарантии."
    },
  };

  useEffect(() => {
    resetCatalog('all');
    toast.success("Les catalogues ont été réinitialisés");
    
    const jeepCompass = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Jeep",
      model: "Compass 1,3 T4 PHEV 4Xe 240hk Mode S",
      year: 2021,
      mileage: 66000,
      fuelType: "Essence",
      price: 12000,
      image: "/lovable-uploads/095b7466-7c2a-479c-861c-ebf3e0234239.png",
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Bleu",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "1.3 T4 PHEV 4Xe 240ch",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1671QH1TxG/?mibextid=wwXIfr",
      features: [
        "Système hybride rechargeable",
        "4 roues motrices",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges chauffants",
        "Mode de conduite S"
      ]
    };
    
    addImportedVehicle(jeepCompass, 'featured');
    toast.success("Jeep Compass ajoutée au catalogue vedette");
    
    const porschePanamera = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Porsche",
      model: "Panamera 4 E-Hubrid 2.9 V6 Sport",
      year: 2018,
      mileage: 85000,
      fuelType: "Essence",
      price: 27000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Bleu",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "2.9 V6 E-Hybrid",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1HhP4ZJ2mC/?mibextid=wwXIfr",
      images: [
        "/lovable-uploads/5b0ac084-9fbd-4a0d-aab9-ca973c04ab9e.png", 
        "/lovable-uploads/30950546-1b7b-4f41-a34b-8a334b23cdb4.png",
        "/lovable-uploads/5292dbd1-9c95-4d0e-90db-04172cf64db6.png",
        "/lovable-uploads/2e0556f3-89ce-4f00-85bd-dbfafda58599.png"
      ],
      image: "/lovable-uploads/5b0ac084-9fbd-4a0d-aab9-ca973c04ab9e.png",
      features: [
        "Hybride rechargeable",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges sport",
        "Finition luxe",
        "Modes de conduite multiples"
      ]
    };
    
    addImportedVehicle(porschePanamera, 'featured');
    toast.success("Porsche Panamera ajoutée au catalogue vedette");
    
    const bmwX6 = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "BMW",
      model: "X6 245 CV",
      year: 2011,
      mileage: 228000,
      fuelType: "Diesel",
      price: 7000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Noir",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "245 CV",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1RhcruSxuk/?mibextid=wwXIfr",
      images: [
        "/lovable-uploads/3039077e-1e13-41c6-8c3d-f15276d09415.png",
        "/lovable-uploads/3039077e-1e13-41c6-8c3d-f15276d09415.png",
        "/lovable-uploads/3039077e-1e13-41c6-8c3d-f15276d09415.png",
        "/lovable-uploads/3039077e-1e13-41c6-8c3d-f15276d09415.png"
      ],
      image: "/lovable-uploads/3039077e-1e13-41c6-8c3d-f15276d09415.png",
      features: [
        "SUV coupé",
        "Transmission intégrale",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges en cuir",
        "Jantes sport"
      ]
    };
    
    addImportedVehicle(bmwX6, 'featured');
    toast.success("BMW X6 ajoutée au catalogue vedette");
    
    const audiEtron = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Audi",
      model: "E-tron 95 KWh 55 Sportback QUATTRO Full S-",
      year: 2021,
      mileage: 28000,
      fuelType: "Essence",
      price: 11000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Noir",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "95 KWh 55 Sportback QUATTRO",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1HWXvRRcRr/?mibextid=wwXIfr",
      image: "/lovable-uploads/3c524853-d7e0-4c6c-9b24-a8aae8dec66e.png",
      features: [
        "SUV électrique",
        "Transmission intégrale QUATTRO",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges en cuir",
        "Toit panoramique"
      ]
    };
    
    addImportedVehicle(audiEtron, 'featured');
    toast.success("Audi E-tron ajoutée au catalogue vedette");
    
    const rangeRoverEvoque = {
      id: `vehicle-featured-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Range Rover",
      model: "Evoque 2.0 TD4",
      year: 2017,
      mileage: 93000,
      fuelType: "Essence",
      price: 11000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Gris",
      interiorColor: "beige et noir",
      transmission: "Automatique",
      engine: "2.0 TD4",
      featured: true,
      catalogType: 'featured' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1BNJdfLvts/?mibextid=wwXIfr",
      image: "/lovable-uploads/5a883e3e-42cb-4514-bb8d-df84b1dd553e.png",
      features: [
        "SUV compact de luxe",
        "Transmission intégrale",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges en cuir",
        "Jantes alliage"
      ]
    };
    
    addImportedVehicle(rangeRoverEvoque, 'featured');
    toast.success("Range Rover Evoque ajoutée au catalogue vedette");
    
    const audiQ3Sportback = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Audi",
      model: "Q3 Sportback 1.5 TFSI S-LINE",
      year: 2020,
      mileage: 71000,
      fuelType: "Essence",
      price: 9000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Blanc",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "1.5 TFSI",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1AKFTUXv7r/?mibextid=wwXIfr",
      image: "/lovable-uploads/6589b138-2549-4b9e-a3f9-44574595942a.png",
      features: [
        "SUV coupé",
        "Finition S-LINE",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges sport",
        "Jantes alliage"
      ]
    };
    
    addImportedVehicle(audiQ3Sportback, 'standard');
    toast.success("Audi Q3 Sportback ajoutée au catalogue standard");
    
    const audiA4 = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Audi",
      model: "A4 2.0 TDI",
      year: 2018,
      mileage: 86000,
      fuelType: "Diesel",
      price: 8500,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Noir",
      interiorColor: "Beige",
      transmission: "Automatique",
      engine: "2.0 TDI",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/18ocATnFgF/?mibextid=wwXIfr",
      image: "/lovable-uploads/aa17735f-9d1a-4373-a5f9-ede012057c94.png",
      features: [
        "Berline premium",
        "Moteur TDI économique",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Sièges en cuir beige",
        "Jantes alliage sport"
      ]
    };
    
    addImportedVehicle(audiA4, 'standard');
    toast.success("Audi A4 ajoutée au catalogue standard");
    
    const bmw518 = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "BMW",
      model: "518",
      year: 2022,
      mileage: 86000,
      fuelType: "Diesel",
      price: 12000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Noir",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "Diesel",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1BdqC7EyLa/?mibextid=wwXIfr",
      image: "/lovable-uploads/a0025433-0eb4-479f-a45e-f67c027c67b8.png",
      features: [
        "Berline premium",
        "Jantes alliage sport",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Siges en cuir",
        "Finition luxe"
      ]
    };
    
    addImportedVehicle(bmw518, 'standard');
    toast.success("BMW 518 ajoutée au catalogue standard");
    
    const volkswagenPolo = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Volkswagen",
      model: "Polo 1.0 TSI Complet",
      year: 2022,
      mileage: 57000,
      fuelType: "Essence",
      price: 11000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Noir",
      interiorColor: "Gris",
      transmission: "Automatique",
      engine: "1.0 TSI",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/1DXtEDYZfd/?mibextid=wwXIfr",
      image: "/lovable-uploads/874b916a-34fa-44b5-be0d-259391275fe7.png",
      features: [
        "Citadine compacte",
        "Moteur TSI économique",
        "Jantes alliage sportives",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Aide au stationnement"
      ]
    };
    
    addImportedVehicle(volkswagenPolo, 'standard');
    toast.success("Volkswagen Polo ajoutée au catalogue standard");
    
    const bmwX1 = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "BMW",
      model: "X1 1,5 dA",
      year: 2020,
      mileage: 98000,
      fuelType: "Essence",
      price: 10500,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Blanc",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "1,5 dA",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/18svCvKiPp/?mibextid=wwXIfr",
      image: "/lovable-uploads/35a31385-5aff-459e-aab9-5c59b5f95018.png",
      features: [
        "SUV compact",
        "Moteur diesel automatique",
        "Jantes alliage",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Aide au stationnement"
      ]
    };
    
    addImportedVehicle(bmwX1, 'standard');
    toast.success("BMW X1 ajoutée au catalogue standard");
    
    const mercedesB180 = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Mercedes",
      model: "Benz B180",
      year: 2018,
      mileage: 65000,
      fuelType: "Diesel",
      price: 13000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Gris",
      interiorColor: "Noir",
      transmission: "Automatique",
      engine: "Diesel",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      image: "/lovable-uploads/f41fc6e5-ceb2-448f-966d-41c5806ff77f.png",
      features: [
        "Monospace compact",
        "Moteur diesel économique",
        "Jantes alliage",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Aide au stationnement"
      ]
    };
    
    addImportedVehicle(mercedesB180, 'standard');
    toast.success("Mercedes Benz B180 ajoutée au catalogue standard");
    
    const audiA6Avant = {
      id: `vehicle-standard-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      brand: "Audi",
      model: "A6 Avant 2.0 TDI",
      year: 2020,
      mileage: 91000,
      fuelType: "Diesel",
      price: 11000,
      description: "Modalités de paiement\n • Acompte : 20 % à la commande\n • Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)\n • Offre spéciale : -10 % pour paiement comptant à la commande\nNos services inclus :\n • Délai de rétractation : 14 jours (Satisfait ou remboursé)\n • Facilité de paiement : Payable comptant ou en mensualités sans intérêt.\n • Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !\nGarantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.",
      exteriorColor: "Gris",
      interiorColor: "Beige",
      transmission: "Automatique",
      engine: "2.0 TDI",
      featured: false,
      catalogType: 'standard' as 'standard' | 'featured',
      fbLink: "https://www.facebook.com/share/p/15s6ctVrwn/?mibextid=wwXIfr",
      image: "/lovable-uploads/5f88b44f-6204-470c-97d8-3426c0105de3.png",
      features: [
        "Break premium",
        "Moteur TDI économique",
        "Jantes alliage sportives",
        "Écran tactile",
        "Navigation GPS",
        "Climatisation automatique",
        "Intérieur beige élégant"
      ]
    };
    
    addImportedVehicle(audiA6Avant, 'standard');
    toast.success("Audi A6 Avant ajoutée au catalogue standard");
    
    try {
      const standardVehicles = getImportedVehicles('standard');
      const featuredVehicles = getImportedVehicles('featured');
      
      console.log(`Page d'accueil: ${standardVehicles.length} véhicules standard et ${featuredVehicles.length} véhicules vedette chargés`);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
    
    if (searchParams.toString()) {
      console.log('Found search parameters:', {
        marque: searchParams.get('marque'),
        modele: searchParams.get('modele'),
        budget: searchParams.get('budget'),
        energie: searchParams.get('energie')
      });
      
      const featuredCarsElement = document.getElementById('featured-cars');
      if (featuredCarsElement) {
        setTimeout(() => {
          featuredCarsElement.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
    
    const catalogId = searchParams.get('catalog');
    if (catalogId) {
      const catalogType = searchParams.get('type') || 'standard';
      console.log(`Catalog found in URL: ${catalogId}, type: ${catalogType}, will pre-load vehicles`);
    }
  }, [searchParams]);
  
  const searchFilters = {
    brand: searchParams.get('marque') || '',
    model: searchParams.get('modele') || '',
    maxPrice: searchParams.get('budget') ? parseInt(searchParams.get('budget') || '0') : undefined,
    fuelType: searchParams.get('energie') || ''
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{translate('pageTitle', translations.pageTitle)}</title>
        <meta name="description" content={translate('pageDescription', translations.pageDescription)} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      
      <main className="flex flex-col w-full">
        {/* Carrousel pleine largeur */}
        <div className="w-full full-width-container">
          <HeroCarousel />
        </div>
        
        <div className="container mx-auto px-4 mt-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            {language === 'FR' 
              ? "Concessionnaire Auto Pas Cher - Achat Voiture Occasion" 
              : "Affordable Car Dealer - Used Car Sales"}
          </h1>
          <div className="mt-12 quick-search-container">
            <QuickSearch />
          </div>
        </div>
        
        <ConditionsHighlight />
        <div className="mt-10" id="featured-cars">
          <FeaturedCars featuredOnly={true} />
        </div>
        
        <div className="container mx-auto px-4 py-8 text-center">
          <Link to="/vehicules/occasion">
            <Button className="mx-auto flex items-center gap-2 px-6 py-3 text-base" size="lg">
              <Car className="h-5 w-5" />
              {language === 'FR' 
                ? "Tous nos véhicules d'occasion" 
                : "All our used vehicles"}
            </Button>
          </Link>
        </div>
        
        {searchParams.toString() ? (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'FR' 
                ? "Résultats de votre recherche" 
                : "Your Search Results"}
            </h2>
            <FeaturedCars searchFilters={searchFilters} featuredOnly={false} />
          </div>
        ) : null}
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'FR' 
                ? "Financement Auto Taux 0% et Reprise Véhicule Gratuite" 
                : "0% Auto Financing and Free Vehicle Trade-in"}
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-700">
              {language === 'FR' 
                ? "Chez Auto Adi, nous proposons des solutions de financement avantageuses et une reprise de votre ancien véhicule sans frais supplémentaires." 
                : "At Auto Adi, we offer advantageous financing solutions and we'll take your old vehicle with no additional fees."}
            </p>
          </div>
        </section>
        
        <Benefits />
        <div id="testimonials">
          <TestimonialSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
