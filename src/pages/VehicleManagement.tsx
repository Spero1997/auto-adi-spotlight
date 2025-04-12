
import { Helmet } from "react-helmet";
import VehicleManager from "@/components/VehicleManager";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import CatalogShare from "@/components/CatalogShare";

const VehicleManagement = () => {
  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Auto ADI</title>
        <meta name="description" content="Gérez vos véhicules d'occasion" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-3xl font-bold">Gestion des véhicules</h1>
              
              <div className="flex gap-3 flex-wrap">
                <CatalogShare />
                
                <Link to="/vehicules/import">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Importer des véhicules
                  </Button>
                </Link>
              </div>
            </div>
            
            <VehicleManager />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VehicleManagement;
