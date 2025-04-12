
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetCatalog, addImportedVehicle, getImportedVehicles } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

/**
 * Component responsible for initializing vehicle data on the home page.
 * This extracts the large data initialization logic from the Index page.
 */
const VehicleInitializer = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Reset catalog and initialize with demo vehicles
    resetCatalog('all');
    toast.success("Les catalogues ont été réinitialisés");
    
    // Add Jeep Compass to featured catalog
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
    
    // Add Porsche Panamera to featured catalog
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
    
    // Add BMW X6 to featured catalog
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
    
    // Add Audi E-tron to featured catalog
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
    
    // Add Range Rover Evoque to featured catalog
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
    
    // Add vehicles to standard catalog
    // Audi Q3
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
    
    // Add remaining standard vehicles
    const standardVehicles = [
      // Audi A4
      {
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
      },
      // BMW 518
      {
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
      },
      // Volkswagen Polo
      {
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
      },
      // BMW X1
      {
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
      },
      // Mercedes B180
      {
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
      },
      // Audi A6 Avant
      {
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
      }
    ];
    
    standardVehicles.forEach(vehicle => {
      addImportedVehicle(vehicle, 'standard');
      toast.success(`${vehicle.brand} ${vehicle.model} ajoutée au catalogue standard`);
    });
    
    try {
      const standardVehicles = getImportedVehicles('standard');
      const featuredVehicles = getImportedVehicles('featured');
      
      console.log(`Page d'accueil: ${standardVehicles.length} véhicules standard et ${featuredVehicles.length} véhicules vedette chargés`);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
    
    // Handle search parameters and scrolling
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
    
    // Handle catalog from URL
    const catalogId = searchParams.get('catalog');
    if (catalogId) {
      const catalogType = searchParams.get('type') || 'standard';
      console.log(`Catalog found in URL: ${catalogId}, type: ${catalogType}, will pre-load vehicles`);
    }
  }, [searchParams]);
  
  // The component doesn't render anything, it just initializes data
  return null;
};

export default VehicleInitializer;
