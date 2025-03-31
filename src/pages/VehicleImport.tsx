
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import { getImportedVehicles, addImportedVehicle, ImportedVehicle } from '@/utils/vehicleImportService';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const VehicleImport = () => {
  const [activeTab, setActiveTab] = useState("add");
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
      
      addImportedVehicle(hyundaiSantaFe, 'standard');
      toast.success('Hyundai Santa Fe Sport ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Hyundai Santa Fe Sport:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
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
        image: '/lovable-uploads/d2af5dfc-e41f-41e3-a318-9ce590c3135e.png',
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
      
      addImportedVehicle(toyotaCamrySE, 'standard');
      toast.success('Toyota Camry SE ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Toyota Camry SE:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
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
        toast.success("La BMW X5 xDrive a été ajoutée au catalogue");
      }

      const tCross = vehicles.find(v => 
        v.brand === "Volkswagen" && 
        v.model.includes("T-Cross") && 
        v.year === 2021
      );
      
      if (tCross) {
        console.log("La Volkswagen T-Cross est présente dans le catalogue", tCross);
        toast.success("La Volkswagen T-Cross a été ajoutée au catalogue");
      }
      
      const audiA3 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 E-Tron") && 
        v.year === 2017
      );
      
      if (audiA3) {
        console.log("L'Audi A3 E-Tron est présente dans le catalogue", audiA3);
        toast.success("L'Audi A3 E-Tron a été ajoutée au catalogue");
      }
      
      const kiaNiro = vehicles.find(v => 
        v.brand === "Kia" && 
        v.model.includes("Niro") && 
        v.year === 2017
      );
      
      if (kiaNiro) {
        console.log("La Kia Niro Hybride est présente dans le catalogue", kiaNiro);
        toast.success("La Kia Niro Hybride a été ajoutée au catalogue");
      }
      
      const bmwX1 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X1") && 
        v.year === 2021
      );
      
      if (bmwX1) {
        console.log("La BMW X1 xDrive 25e est présente dans le catalogue", bmwX1);
        toast.success("La BMW X1 xDrive 25e a été ajoutée au catalogue");
      }
      
      const audiQ5 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q5 Quattro") && 
        v.year === 2014
      );
      
      if (audiQ5) {
        console.log("L'Audi Q5 Quattro S-Tronic est présente dans le catalogue", audiQ5);
        toast.success("L'Audi Q5 Quattro S-Tronic a été ajoutée au catalogue");
      }
      
      const audiQ7 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q7 245HK") && 
        v.year === 2012
      );
      
      if (audiQ7) {
        console.log("L'Audi Q7 245HK-2XS-Line est présente dans le catalogue", audiQ7);
        toast.success("L'Audi Q7 245HK-2XS-Line a été ajoutée au catalogue");
      }
      
      const audiA3Sportback = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 Sportback") && 
        v.year === 2019
      );
      
      if (audiA3Sportback) {
        console.log("L'Audi A3 Sportback 35 1,5 TFSI est présente dans le catalogue", audiA3Sportback);
        toast.success("L'Audi A3 Sportback 35 1,5 TFSI a été ajoutée au catalogue");
      }
      
      const bmwX3 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d M-sport") && 
        v.year === 2016
      );
      
      if (bmwX3) {
        console.log("La BMW X3 xDrive 20d M-sport est présente dans le catalogue", bmwX3);
        toast.success("La BMW X3 xDrive 20d M-sport a été ajoutée au catalogue");
      }
      
      const rangeRoverEvoque = vehicles.find(v => 
        v.brand === "Range Rover" && 
        v.model.includes("Evoque 2.0 Prestige") && 
        v.year === 2014
      );
      
      if (rangeRoverEvoque) {
        console.log("La Range Rover Evoque 2.0 Prestige est présente dans le catalogue", rangeRoverEvoque);
        toast.success("La Range Rover Evoque 2.0 Prestige a été ajoutée au catalogue");
      }
      
      const bmwX3_2014 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d") && 
        v.year === 2014
      );
      
      if (bmwX3_2014) {
        console.log("La BMW X3 xDrive 20d 2014 est présente dans le catalogue", bmwX3_2014);
        toast.success("La BMW X3 xDrive 20d 2014 a été ajoutée au catalogue");
      }
      
      const hyundaiSantaFe = vehicles.find(v => 
        v.brand === "Hyundai" && 
        v.model.includes("Santa Fe Sport") && 
        v.year === 2013
      );
      
      if (hyundaiSantaFe) {
        console.log("Le Hyundai Santa Fe Sport est présent dans le catalogue", hyundaiSantaFe);
        toast.success("Le Hyundai Santa Fe Sport a été ajouté au catalogue");
      }
      
      setVehiclesLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
      toast.error("Erreur lors du chargement des véhicules");
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
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Mise à jour effectuée</AlertTitle>
            <AlertDescription>
              La Volkswagen T-Cross 1,0 TSI 110 hk Life ACC a été ajoutée au catalogue avec sa nouvelle image.
            </AlertDescription>
          </Alert>

          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle>Nouvelle BMW ajoutée</AlertTitle>
            <AlertDescription>
              La BMW X5 xDrive 2016 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-green-50 border-green-200">
            <Info className="h-4 w-4 text-green-500" />
            <AlertDescription>
              L'Audi A3 E-Tron 1.4 S Tronic 2017 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-yellow-50 border-yellow-200">
            <Info className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              La Kia Niro Hybride 149 CH 2017 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              La BMW X1 xDrive 25e 2021 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-indigo-50 border-indigo-200">
            <Info className="h-4 w-4 text-indigo-500" />
            <AlertDescription>
              L'Audi Q5 Quattro S-Tronic 2014 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-purple-50 border-purple-200">
            <Info className="h-4 w-4 text-purple-500" />
            <AlertDescription>
              L'Audi Q7 245HK-2XS-Line 2012 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-pink-50 border-pink-200">
            <Info className="h-4 w-4 text-pink-500" />
            <AlertDescription>
              L'Audi A3 Sportback 35 1,5 TFSI 2019 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-6 bg-gray-50 border-gray-200">
            <Info className="h-4 w-4 text-gray-500" />
            <AlertDescription>
              La BMW X3 xDrive 20d M-sport 190 CH 2016 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-6 bg-teal-50 border-teal-200">
            <Info className="h-4 w-4 text-teal-500" />
            <AlertDescription>
              La Range Rover Evoque 2.0 Prestige 241 CH 2014 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-6 bg-slate-50 border-slate-200">
            <Info className="h-4 w-4 text-slate-500" />
            <AlertDescription>
              La BMW X3 xDrive 20d 2014 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-emerald-50 border-emerald-200">
            <Info className="h-4 w-4 text-emerald-500" />
            <AlertTitle>Nouveau Hyundai ajouté</AlertTitle>
            <AlertDescription>
              Le Hyundai Santa Fe Sport 2013 a été ajouté au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-red-50 border-red-200">
            <Info className="h-4 w-4 text-red-500" />
            <AlertTitle>Nouvelle Toyota ajoutée</AlertTitle>
            <AlertDescription>
              La Toyota Camry SE 2022 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
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
          </div>
          
          <Tabs defaultValue="add" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="add">Ajout manuel</TabsTrigger>
              <TabsTrigger value="import">Import depuis URL</TabsTrigger>
            </TabsList>
            
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
