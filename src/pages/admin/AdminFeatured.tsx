
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  updateVehicleInSupabase, 
  fetchVehiclesFromSupabase 
} from '@/utils/services/supabaseService';
import { Label } from '@/components/ui/label';
import { Star, Award, AlertCircle } from 'lucide-react';
import { ImportedVehicle } from '@/utils/types/vehicle';

const AdminFeatured = () => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVehiclesFromSupabase();
        setVehicles(data);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les véhicules',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [toast]);

  const handleToggleFeatured = async (vehicle: any, featured: boolean) => {
    try {
      await updateVehicleInSupabase(vehicle.id, {
        is_featured: featured
      });
      
      setVehicles(prev => 
        prev.map(v => v.id === vehicle.id ? { ...v, featured } : v)
      );
      
      toast({
        title: 'Mise à jour réussie',
        description: `Le véhicule ${vehicle.brand} ${vehicle.model} a été ${featured ? 'ajouté aux' : 'retiré des'} véhicules en vedette`,
      });
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut du véhicule',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Véhicules en Vedette | Administration</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des Véhicules en Vedette</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              Véhicules en Vedette
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center my-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-lg font-medium">Aucun véhicule trouvé</p>
                <p className="text-gray-500">
                  Ajoutez des véhicules pour les mettre en vedette sur la page d'accueil
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>En vedette</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">
                        {vehicle.brand} {vehicle.model} ({vehicle.year})
                      </TableCell>
                      <TableCell>{vehicle.price.toLocaleString('fr-FR')} €</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`featured-${vehicle.id}`}
                            checked={vehicle.featured || false}
                            onCheckedChange={(checked) => handleToggleFeatured(vehicle, checked)}
                          />
                          <Label htmlFor={`featured-${vehicle.id}`}>
                            {vehicle.featured ? (
                              <span className="flex items-center text-yellow-600">
                                <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
                                En vedette
                              </span>
                            ) : (
                              "Standard"
                            )}
                          </Label>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminFeatured;
