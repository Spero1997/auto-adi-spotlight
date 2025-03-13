
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import { getImportedVehicles } from '@/utils/vehicleImportService';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
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
      
      // Recherche de la Kia Niro
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
            <AlertTitle>Nouvelle Audi ajoutée</AlertTitle>
            <AlertDescription>
              L'Audi A3 E-Tron 1.4 S Tronic 2017 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-4 bg-yellow-50 border-yellow-200">
            <Info className="h-4 w-4 text-yellow-500" />
            <AlertTitle>Nouvelle Kia ajoutée</AlertTitle>
            <AlertDescription>
              La Kia Niro Hybride 149 CH 2017 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-500" />
            <AlertTitle>Nouvelle BMW X1 ajoutée</AlertTitle>
            <AlertDescription>
              La BMW X1 xDrive 25e 2021 a été ajoutée au catalogue avec succès.
            </AlertDescription>
          </Alert>
          
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
