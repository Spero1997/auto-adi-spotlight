
import { Helmet } from "react-helmet";
import VehicleManager from "@/components/VehicleManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import CatalogShare from "@/components/CatalogShare";
import { useState, useEffect } from "react";

const VehicleManagement = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check for admin access in URL parameters
    // This is a simple solution - in a real app, you would use proper authentication
    const params = new URLSearchParams(location.search);
    setIsAdmin(params.get("admin") === "true");
    
    // Store admin status in local storage to persist across page refreshes
    if (params.get("admin") === "true") {
      localStorage.setItem("autoAdiAdmin", "true");
    } else if (localStorage.getItem("autoAdiAdmin")) {
      setIsAdmin(true);
    }
  }, [location]);

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
                
                {isAdmin && (
                  <Link to="/vehicules/import">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Importer des véhicules
                    </Button>
                  </Link>
                )}
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
