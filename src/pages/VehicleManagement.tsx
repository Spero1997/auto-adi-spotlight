
import { Helmet } from "react-helmet";
import VehicleManager from "@/components/VehicleManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import CatalogShare from "@/components/CatalogShare";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { toast } from "sonner";

const VehicleManagement = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  // Rediriger si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Vous devez être connecté pour accéder à cette page");
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);
  
  const handleAddVehicle = () => {
    navigate('/vehicules/import');
  };
  
  // Si le chargement est en cours ou l'utilisateur n'est pas connecté, ne rien afficher
  if (loading || !user) {
    return null;
  }
  
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
                
                <Button className="flex items-center gap-2" onClick={handleAddVehicle}>
                  <Plus className="h-4 w-4" />
                  Ajouter un véhicule
                </Button>
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
