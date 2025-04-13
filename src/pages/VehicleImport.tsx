import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import { getImportedVehicles } from '@/utils/vehicleImportService';
import { toast } from 'sonner';

const VehicleImport = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  
  // Force le chargement des véhicules au chargement de la page
  useEffect(() => {
    console.log("VehicleImport: Vérification des véhicules stockés");
    try {
      const vehicles = getImportedVehicles();
      console.log(`VehicleImport: ${vehicles.length} véhicules trouvés dans localStorage`);
      
      // Recherche de la BMW X5
      const bmwX5 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X5") && 
        v.year === 2016
      );
      
      if (bmwX5) {
        console.log("La BMW X5 xDrive est présente dans le catalogue", bmwX5);
        toast.success("La BMW X5 xDrive a été ajoutée au catalogue");
      }

      // Recherche de la Volkswagen T-Cross
      const tCross = vehicles.find(v => 
        v.brand === "Volkswagen" && 
        v.model.includes("T-Cross") && 
        v.year === 2021
      );
      
      if (tCross) {
        console.log("La Volkswagen T-Cross est présente dans le catalogue", tCross);
        toast.success("La Volkswagen T-Cross a été ajoutée au catalogue");
      }
      
      // Recherche de l'Audi A3 E-Tron
      const audiA3 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 E-Tron") && 
        v.year === 2017
      );
      
      if (audiA3) {
        console.log("L'Audi A3 E-Tron est présente dans le catalogue", audiA3);
        toast.success("L'Audi A3 E-Tron a été ajoutée au catalogue");
      }
      
      // Recherche de la Kia Niro Hybride
      const kiaNiro = vehicles.find(v => 
        v.brand === "Kia" && 
        v.model.includes("Niro") && 
        v.year === 2017
      );
      
      if (kiaNiro) {
        console.log("La Kia Niro Hybride est présente dans le catalogue", kiaNiro);
        toast.success("La Kia Niro Hybride a été ajoutée au catalogue");
      }
      
      // Recherche de la BMW X1
      const bmwX1 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X1") && 
        v.year === 2021
      );
      
      if (bmwX1) {
        console.log("La BMW X1 xDrive 25e est présente dans le catalogue", bmwX1);
        toast.success("La BMW X1 xDrive 25e a été ajoutée au catalogue");
      }
      
      // Recherche de l'Audi Q5 Quattro
      const audiQ5 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q5 Quattro") && 
        v.year === 2014
      );
      
      if (audiQ5) {
        console.log("L'Audi Q5 Quattro S-Tronic est présente dans le catalogue", audiQ5);
        toast.success("L'Audi Q5 Quattro S-Tronic a été ajoutée au catalogue");
      }
      
      // Recherche de l'Audi Q7 245HK
      const audiQ7 = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("Q7 245HK") && 
        v.year === 2012
      );
      
      if (audiQ7) {
        console.log("L'Audi Q7 245HK-2XS-Line est présente dans le catalogue", audiQ7);
        toast.success("L'Audi Q7 245HK-2XS-Line a été ajoutée au catalogue");
      }
      
      // Recherche de l'Audi A3 Sportback
      const audiA3Sportback = vehicles.find(v => 
        v.brand === "Audi" && 
        v.model.includes("A3 Sportback") && 
        v.year === 2019
      );
      
      if (audiA3Sportback) {
        console.log("L'Audi A3 Sportback 35 1,5 TFSI est présente dans le catalogue", audiA3Sportback);
        toast.success("L'Audi A3 Sportback 35 1,5 TFSI a été ajoutée au catalogue");
      }
      
      // Recherche de la BMW X3 xDrive 20d M-sport
      const bmwX3 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d M-sport") && 
        v.year === 2016
      );
      
      if (bmwX3) {
        console.log("La BMW X3 xDrive 20d M-sport est présente dans le catalogue", bmwX3);
        toast.success("La BMW X3 xDrive 20d M-sport a été ajoutée au catalogue");
      }
      
      // Recherche de la Range Rover Evoque
      const rangeRoverEvoque = vehicles.find(v => 
        v.brand === "Range Rover" && 
        v.model.includes("Evoque 2.0 Prestige") && 
        v.year === 2014
      );
      
      if (rangeRoverEvoque) {
        console.log("La Range Rover Evoque 2.0 Prestige est présente dans le catalogue", rangeRoverEvoque);
        toast.success("La Range Rover Evoque 2.0 Prestige a été ajoutée au catalogue");
      }
      
      // Recherche de la nouvelle BMW X3 2014
      const bmwX3_2014 = vehicles.find(v => 
        v.brand === "BMW" && 
        v.model.includes("X3 xDrive 20d") && 
        v.year === 2014
      );
      
      if (bmwX3_2014) {
        console.log("La BMW X3 xDrive 20d 2014 est présente dans le catalogue", bmwX3_2014);
        toast.success("La BMW X3 xDrive 20d 2014 a été ajoutée au catalogue");
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
        <title>Gestion des véhicules | AutoAdi</title>
        <meta name="description" content="Outil de gestion des véhicules pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Gestion des véhicules</h1>
          <p className="text-center text-gray-600 mb-8">
            Ajoutez ou importez facilement des véhicules
          </p>
          
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
