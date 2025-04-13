import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import AiVehicleAdder from '@/components/AiVehicleAdder';
import { getImportedVehicles, addVehicle, ImportedVehicle } from '@/utils/vehicleImportService';
import { Button } from '@/components/ui/button';

const VehicleImport = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  
  const addHyundaiSantaFe = () => {
    try {
      const hyundaiSantaFe: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-hyundai-santa-fe`,
        brand: 'Hyundai',
        model: 'Santa Fe Sport',
        year: 2013,
        mileage: 79000,
        price: 4500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Vert',
        interiorColor: 'Noir',
        image: '/lovable-uploads/74794e1d-cef3-4179-9428-d3359d588743.png',
        fbLink: 'https://www.facebook.com/share/p/1GsrVVncej/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !
Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
        features: [
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage'
        ],
        catalogType: 'standard'
      };
      
      addVehicle(hyundaiSantaFe, 'standard');
      console.log('Hyundai Santa Fe Sport ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Hyundai Santa Fe Sport:', error);
      console.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addToyotaCamrySE = () => {
    try {
      const toyotaCamrySE: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-toyota-camry-se`,
        brand: 'Toyota',
        model: 'Camry SE',
        year: 2022,
        mileage: 28000,
        price: 15500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Rouge',
        interiorColor: 'Noir',
        image: '/lovable-uploads/86cf6e1b-5f63-424c-8a21-168c2f127e59.png',
        fbLink: 'https://www.facebook.com/share/p/1EqQLrWetM/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !
Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
        features: [
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage',
          'Système de navigation',
          'Caméra de recul'
        ],
        catalogType: 'standard'
      };
      
      addVehicle(toyotaCamrySE, 'standard');
      console.log('Toyota Camry SE ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Toyota Camry SE:', error);
      console.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addVolvoV40 = () => {
    try {
      const volvoV40: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-volvo-v40-d2-rdesign`,
        brand: 'Volvo',
        model: 'V40 D2 R-Design',
        year: 2014,
        mileage: 116000,
        price: 4000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Blanc',
        interiorColor: 'Noir',
        image: '/lovable-uploads/27eeacb3-e4bf-46b9-babd-527e06b998e1.png',
        fbLink: 'https://www.facebook.com/share/p/1Hhh6zzGhy/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'R-Design',
          'Automatique',
          '115 ch'
        ],
        engine: 'D2 115ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(volvoV40, 'standard');
      console.log('Volvo V40 D2 R-Design ajoutée avec succès au catalogue!');
      
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Volvo V40 D2 R-Design:', error);
      console.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addBMWX7 = () => {
    try {
      const bmwX7: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-bmw-x7-xdrive-40d-msport-pro`,
        brand: 'BMW',
        model: 'X7 xDrive 40d M Sport Pro',
        year: 2022,
        mileage: 43000,
        price: 27000,
        fuelType: 'Diesel',
        transmission: 'Automatique',
        exteriorColor: 'Noir',
        interiorColor: 'Noir',
        image: '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png',
        fbLink: '',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Importation et livraison à domicile (délai : 5 jours)
• Garantie 24 mois
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !`,
        features: [
          'Toit panoramique',
          'Navigation',
          'Caméra de recul',
          'M Sport Pro',
          'Automatique',
          '259 ch'
        ],
        engine: 'xDrive 40d 259ch',
        doors: 5,
        catalogType: 'standard'
      };
      
      addVehicle(bmwX7, 'standard');
      console.log('BMW X7 xDrive 40d M Sport Pro ajoutée avec succès au catalogue!');
      
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la BMW X7 xDrive 40d M Sport Pro:', error);
      console.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  useEffect(() => {
    console.log("VehicleImport: Vérification des véhicules stockés");
    try {
      const vehicles = getImportedVehicles();
      console.log(`VehicleImport: ${vehicles.length} véhicules trouvés dans localStorage`);
      
      const bmwX5 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X5") && 
        v.year === 2016
      );
      
      if (bmwX5) {
        console.log("La BMW X5 xDrive est présente dans le catalogue", bmwX5);
      }

      const tCross = vehicles.find(v => 
        v.brand === "Volkswagen" && 
        v.model.includes("T-Cross") && 
        v.year === 2021
      );
      
      if (tCross) {
        console.log("La Volkswagen T-Cross est présente dans le catalogue", tCross);
      }
      
      const audiA3 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 E-Tron") && 
        v.year === 2017
      );
      
      if (audiA3) {
        console.log("L'Audi A3 E-Tron est présente dans le catalogue", audiA3);
      }
      
      const kiaNiro = vehicles.find(v => 
        v.brand === "Kia" && 
        v.model.includes("Niro") && 
        v.year === 2017
      );
      
      if (kiaNiro) {
        console.log("La Kia Niro Hybride est présente dans le catalogue", kiaNiro);
      }
      
      const bmwX1 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X1") && 
        v.year === 2021
      );
      
      if (bmwX1) {
        console.log("La BMW X1 xDrive 25e est présente dans le catalogue", bmwX1);
      }
      
      const audiQ5 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q5 Quattro") && 
        v.year === 2014
      );
      
      if (audiQ5) {
        console.log("L'Audi Q5 Quattro S-Tronic est présente dans le catalogue", audiQ5);
      }
      
      const audiQ7 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q7 245HK") && 
        v.year === 2012
      );
      
      if (audiQ7) {
        console.log("L'Audi Q7 245HK-2XS-Line est présente dans le catalogue", audiQ7);
      }
      
      const audiA3Sportback = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 Sportback") && 
        v.year === 2019
      );
      
      if (audiA3Sportback) {
        console.log("L'Audi A3 Sportback 35 1,5 TFSI est présente dans le catalogue", audiA3Sportback);
      }
      
      const bmwX3 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d M-sport") && 
        v.year === 2016
      );
      
      if (bmwX3) {
        console.log("La BMW X3 xDrive 20d M-sport est présente dans le catalogue", bmwX3);
      }
      
      const rangeRoverEvoque = vehicles.find(v => 
        v.brand === "Range Rover" && 
        v.model.includes("Evoque 2.0 Prestige") && 
        v.year === 2014
      );
      
      if (rangeRoverEvoque) {
        console.log("La Range Rover Evoque 2.0 Prestige est présente dans le catalogue", rangeRoverEvoque);
      }
      
      const bmwX3_2014 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d") && 
        v.year === 2014
      );
      
      if (bmwX3_2014) {
        console.log("La BMW X3 xDrive 20d 2014 est présente dans le catalogue", bmwX3_2014);
      }
      
      const hyundaiSantaFe = vehicles.find(v => 
        v.brand === "Hyundai" && 
        v.model.includes("Santa Fe Sport") && 
        v.year === 2013
      );
      
      if (!hyundaiSantaFe) {
        console.log("Ajout automatique du Hyundai Santa Fe Sport au catalogue");
        addHyundaiSantaFe();
      } else {
        console.log("Le Hyundai Santa Fe Sport est présent dans le catalogue", hyundaiSantaFe);
      }
      
      const toyotaCamry = vehicles.find(v => 
        v.brand === "Toyota" && 
        v.model.includes("Camry SE") && 
        v.year === 2022
      );
      
      if (!toyotaCamry) {
        console.log("Ajout automatique du Toyota Camry SE au catalogue");
        addToyotaCamrySE();
      } else {
        console.log("La Toyota Camry SE est présente dans le catalogue", toyotaCamry);
      }
      
      const volvoV40 = vehicles.find(v => 
        v.brand === "Volvo" && 
        v.model.includes("V40 D2 R-Design") && 
        v.year === 2014
      );
      
      if (!volvoV40) {
        console.log("Ajout automatique de la Volvo V40 au catalogue");
        addVolvoV40();
      } else {
        console.log("La Volvo V40 est présente dans le catalogue", volvoV40);
      }
      
      const bmwX7 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X7 xDrive 40d M Sport Pro") && 
        v.year === 2022
      );
      
      if (bmwX7) {
        console.log("La BMW X7 xDrive 40d M Sport Pro est présente dans le catalogue", bmwX7);
        if (bmwX7.image !== '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png') {
          bmwX7.image = '/lovable-uploads/13feee90-eb32-47e8-9525-3886e46966b4.png';
          const updatedVehicles = vehicles.map(v => 
            (v.id === bmwX7.id) ? bmwX7 : v
          );
          addVehicle(bmwX7, 'standard');
          console.log('Image de la BMW X7 xDrive 40d M Sport Pro mise à jour!');
        }
      } else {
        console.log("Ajout automatique de la BMW X7 xDrive 40d M Sport Pro au catalogue");
        addBMWX7();
      }
      
      setVehiclesLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Importation de véhicules | AutoAdi</title>
        <meta name="description" content="Outil d'importation de véhicules depuis des sites de vente automobiles pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Gestion des véhicules</h1>
          <p className="text-center text-gray-600 mb-8">
            Ajoutez ou importez facilement des véhicules
          </p>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={addVolvoV40}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ajouter la Volvo V40 D2 R-Design au catalogue
            </Button>
            
            <Button 
              onClick={addHyundaiSantaFe}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Ajouter le Hyundai Santa Fe Sport au catalogue
            </Button>
            
            <Button 
              onClick={addToyotaCamrySE}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ajouter la Toyota Camry SE au catalogue
            </Button>

            <Button 
              onClick={addBMWX7}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              Ajouter la BMW X7 xDrive 40d M Sport Pro
            </Button>
          </div>
          
          <Tabs defaultValue="assistant" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="assistant">Assistant IA</TabsTrigger>
              <TabsTrigger value="add">Ajout manuel</TabsTrigger>
              <TabsTrigger value="import">Import depuis URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="mt-0">
              <AiVehicleAdder />
            </TabsContent>
            
            <TabsContent value="add" className="mt-0">
              <VehicleAddForm />
            </TabsContent>
            
            <TabsContent value="import" className="mt-0">
              <VehicleImporter />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleImport;
