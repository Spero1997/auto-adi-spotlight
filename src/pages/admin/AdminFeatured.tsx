
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { resetCatalog } from '@/utils/vehicleImportService';
import { toast } from 'sonner';
import { Trash2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const AdminFeatured = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResetFeaturedCatalog = () => {
    setIsLoading(true);
    try {
      resetCatalog('featured');
      toast.success("Le catalogue des véhicules en vedette a été vidé avec succès");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du catalogue vedette:", error);
      toast.error("Erreur lors de la réinitialisation du catalogue vedette");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetStandardCatalog = () => {
    setIsLoading(true);
    try {
      resetCatalog('standard');
      toast.success("Le catalogue standard des véhicules a été vidé avec succès");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du catalogue standard:", error);
      toast.error("Erreur lors de la réinitialisation du catalogue standard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAllCatalogs = () => {
    setIsLoading(true);
    try {
      resetCatalog('all');
      toast.success("Tous les catalogues de véhicules ont été vidés avec succès");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des catalogues:", error);
      toast.error("Erreur lors de la réinitialisation des catalogues");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Véhicules en vedette | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des véhicules en vedette</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Réinitialiser les catalogues</CardTitle>
              <CardDescription>
                Supprimez tous les véhicules des catalogues. Cette action est irréversible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  La réinitialisation d'un catalogue supprimera définitivement tous les véhicules qu'il contient.
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="destructive" 
                  onClick={handleResetFeaturedCatalog}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                  Vider le catalogue vedette
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleResetStandardCatalog}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                  Vider le catalogue standard
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleResetAllCatalogs}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                  Vider tous les catalogues
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gérer les catalogues</CardTitle>
              <CardDescription>
                Accédez à l'interface de gestion des véhicules pour éditer ou ajouter des véhicules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/gestion-vehicules')}
                className="w-full"
              >
                Aller à la gestion des véhicules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminFeatured;
