
import { Helmet } from "react-helmet";
import VehicleManager from "@/components/VehicleManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Star } from "lucide-react";
import CatalogShare from "@/components/CatalogShare";
import AddFeaturedVehicle from "@/components/AddFeaturedVehicle";

const VehicleManagement = () => {
  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Auto ADI</title>
        <meta name="description" content="Gérez vos véhicules d'occasion" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-3xl font-bold">Gestion des véhicules</h1>
              
              <div className="flex gap-3 flex-wrap">
                <CatalogShare />
                
                <Link to="/vehicule/import">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter un véhicule
                  </Button>
                </Link>
              </div>
            </div>
            
            <Tabs defaultValue="vehicles" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="vehicles">Gestion des véhicules</TabsTrigger>
                <TabsTrigger value="featured">
                  <Star className="h-4 w-4 mr-1" />
                  Ajouter un véhicule vedette
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="vehicles">
                <VehicleManager />
              </TabsContent>
              
              <TabsContent value="featured">
                <AddFeaturedVehicle />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VehicleManagement;
