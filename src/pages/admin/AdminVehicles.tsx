
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Car, Edit, Trash2, Plus, Search } from 'lucide-react';
import { getImportedVehicles, saveImportedVehicles, deleteImportedVehicle, ImportedVehicle } from '@/utils/vehicleImportService';

const AdminVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<ImportedVehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
    
    window.addEventListener('vehiclesUpdated', loadVehicles);
    return () => {
      window.removeEventListener('vehiclesUpdated', loadVehicles);
    };
  }, []);

  const loadVehicles = () => {
    try {
      setIsLoading(true);
      const importedVehicles = getImportedVehicles();
      setVehicles(importedVehicles);
    } catch (error) {
      console.error("Error loading vehicles:", error);
      toast.error("Erreur lors du chargement des véhicules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.brand?.toLowerCase().includes(searchLower) ||
      vehicle.model?.toLowerCase().includes(searchLower) ||
      vehicle.fuelType?.toLowerCase().includes(searchLower) ||
      String(vehicle.year).includes(searchTerm) ||
      String(vehicle.price).includes(searchTerm)
    );
  });

  const handleEditClick = (vehicle: ImportedVehicle) => {
    setCurrentVehicle({ ...vehicle });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentVehicle) return;

    try {
      const updatedVehicles = vehicles.map(v => 
        v.id === currentVehicle.id ? currentVehicle : v
      );
      
      saveImportedVehicles(updatedVehicles);
      setVehicles(updatedVehicles);
      setIsEditDialogOpen(false);
      toast.success(`${currentVehicle.brand} ${currentVehicle.model} mis à jour avec succès`);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Erreur lors de la sauvegarde du véhicule");
    }
  };

  const handleDeleteClick = (id: string) => {
    setVehicleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!vehicleToDelete) return;
    
    try {
      deleteImportedVehicle(vehicleToDelete);
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete));
      toast.success("Véhicule supprimé avec succès");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Erreur lors de la suppression du véhicule");
    } finally {
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const handleAddNewVehicle = () => {
    const newVehicle: ImportedVehicle = {
      id: crypto.randomUUID(),
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: 'Essence',
      transmission: 'Manuelle',
      image: '',
      features: []
    };
    
    setCurrentVehicle(newVehicle);
    setIsEditDialogOpen(true);
  };

  const getFuelTypeOptions = () => [
    { value: 'Essence', label: 'Essence' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Hybride', label: 'Hybride' },
    { value: 'Électrique', label: 'Électrique' },
    { value: 'GPL', label: 'GPL' }
  ];

  const getTransmissionOptions = () => [
    { value: 'Manuelle', label: 'Manuelle' },
    { value: 'Automatique', label: 'Automatique' },
    { value: 'Semi-automatique', label: 'Semi-automatique' }
  ];

  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des véhicules</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            <Button onClick={handleAddNewVehicle}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <Car className="h-12 w-12 text-gray-400 mb-4" />
              <CardTitle className="text-xl mb-2">Aucun véhicule trouvé</CardTitle>
              <p className="text-gray-500">
                {searchTerm ? "Aucun résultat pour cette recherche." : "Ajoutez des véhicules pour commencer."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Marque & Modèle</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Carburant</TableHead>
                  <TableHead>Kilométrage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      {vehicle.image ? (
                        <div className="h-16 w-24 rounded overflow-hidden">
                          <img
                            src={vehicle.image}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100?text=No+Image';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-24 bg-gray-200 flex items-center justify-center rounded">
                          <Car className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vehicle.brand}</div>
                        <div className="text-sm text-gray-500">{vehicle.model}</div>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.price?.toLocaleString('fr-FR')} €</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.fuelType}</TableCell>
                    <TableCell>{vehicle.mileage?.toLocaleString('fr-FR')} km</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(vehicle)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(vehicle.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentVehicle?.id ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
            </DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour {currentVehicle?.id ? 'modifier' : 'ajouter'} un véhicule.
            </DialogDescription>
          </DialogHeader>
          
          {currentVehicle && (
            <Tabs defaultValue="basic">
              <TabsList>
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails techniques</TabsTrigger>
                <TabsTrigger value="media">Médias & Description</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marque</Label>
                    <Input
                      id="brand"
                      value={currentVehicle.brand || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, brand: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input
                      id="model"
                      value={currentVehicle.model || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, model: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Année</Label>
                    <Input
                      id="year"
                      type="number"
                      value={currentVehicle.year || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, year: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={currentVehicle.price || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, price: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Kilométrage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={currentVehicle.mileage || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, mileage: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Type de carburant</Label>
                    <Select
                      value={currentVehicle.fuelType || ''}
                      onValueChange={(value) => setCurrentVehicle({...currentVehicle, fuelType: value})}
                    >
                      <SelectTrigger id="fuelType">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getFuelTypeOptions().map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select
                      value={currentVehicle.transmission || ''}
                      onValueChange={(value) => setCurrentVehicle({...currentVehicle, transmission: value})}
                    >
                      <SelectTrigger id="transmission">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getTransmissionOptions().map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Nombre de portes</Label>
                    <Input
                      id="doors"
                      type="number"
                      value={currentVehicle.doors || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, doors: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="engine">Moteur</Label>
                    <Input
                      id="engine"
                      value={currentVehicle.engine || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, engine: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exteriorColor">Couleur extérieure</Label>
                    <Input
                      id="exteriorColor"
                      value={currentVehicle.exteriorColor || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, exteriorColor: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interiorColor">Couleur intérieure</Label>
                    <Input
                      id="interiorColor"
                      value={currentVehicle.interiorColor || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, interiorColor: e.target.value})}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={currentVehicle.image || ''}
                    onChange={(e) => setCurrentVehicle({...currentVehicle, image: e.target.value})}
                  />
                  
                  {currentVehicle.image && (
                    <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-100">
                      <img
                        src={currentVehicle.image}
                        alt="Aperçu"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Invalide';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentVehicle.description || ''}
                    onChange={(e) => setCurrentVehicle({...currentVehicle, description: e.target.value})}
                    rows={5}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {currentVehicle?.id ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminVehicles;
