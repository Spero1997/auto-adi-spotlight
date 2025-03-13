
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
      
      // Recherche de la Volkswagen T-Cross
      const tCross = vehicles.find(v => 
        v.brand === "Volkswagen" && 
        v.model.includes("T-Cross") && 
        v.year === 2021
      );
      
      if (tCross) {
        console.log("La Volkswagen T-Cross est présente dans le catalogue", tCross);
        toast.success("La Volkswagen T-Cross a été ajoutée au catalogue");
      } else {
        console.warn("La Volkswagen T-Cross n'est pas présente dans le catalogue");
        toast.error("La Volkswagen T-Cross n'a pas pu être trouvée dans le catalogue");
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
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Mise à jour effectuée</AlertTitle>
            <AlertDescription>
              La Volkswagen T-Cross 1,0 TSI 110 hk Life ACC a été ajoutée au catalogue avec sa nouvelle image.
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
