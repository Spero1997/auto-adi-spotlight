
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { AlertCircle, Trash2, Edit, Eye, Plus, Save, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getImportedVehicles, saveImportedVehicles, deleteImportedVehicle, ImportedVehicle } from '@/utils/vehicleImportService';

const VehicleManager = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingVehicle, setEditingVehicle] = useState<ImportedVehicle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Charger les véhicules lors du montage du composant
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    const importedVehicles = getImportedVehicles();
    setVehicles(importedVehicles);
  };

  const handleSave = (vehicle: ImportedVehicle) => {
    try {
      const updatedVehicles = vehicles.map(v => 
        v.id === vehicle.id ? vehicle : v
      );
      
      saveImportedVehicles(updatedVehicles);
      setVehicles(updatedVehicles);
      setEditingVehicle(null);
      setIsDialogOpen(false);
      
      toast({
        title: "Véhicule modifié",
        description: `${vehicle.brand} ${vehicle.model} a été mis à jour avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteImportedVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
      
      toast({
        title: "Véhicule supprimé",
        description: "Le véhicule a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le véhicule.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (vehicle: ImportedVehicle) => {
    setEditingVehicle({ ...vehicle });
    setIsDialogOpen(true);
  };

  const handleSortChange = (value: string) => {
    if (value === sortBy) {
      // Si on clique sur le même critère, on change la direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Sinon, on change le critère et on reset la direction
      setSortBy(value);
      setSortDirection('asc');
    }
  };

  // Fonction pour filtrer et trier les véhicules
  const filteredAndSortedVehicles = vehicles
    .filter(vehicle => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.fuelType?.toLowerCase().includes(searchLower) ||
        String(vehicle.year).includes(searchTerm) ||
        String(vehicle.price).includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortBy) {
        case 'brand':
          return direction * a.brand.localeCompare(b.brand);
        case 'model':
          return direction * a.model.localeCompare(b.model);
        case 'price':
          return direction * (a.price - b.price);
        case 'year':
          return direction * (a.year - b.year);
        case 'mileage':
          return direction * (a.mileage - b.mileage);
        default:
          return 0;
      }
    });

  const getFuelTypeOptions = () => [
    { value: 'Essence', label: 'Essence' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Hybride', label: 'Hybride' },
    { value: 'Électrique', label: 'Électrique' },
    { value: 'GPL', label: 'GPL' },
    { value: 'Hydrogène', label: 'Hydrogène' }
  ];

  const getTransmissionOptions = () => [
    { value: 'Manuelle', label: 'Manuelle' },
    { value: 'Automatique', label: 'Automatique' },
    { value: 'Semi-automatique', label: 'Semi-automatique' }
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Gestion des véhicules</h1>
        
        {vehicles.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Aucun véhicule trouvé</AlertTitle>
            <AlertDescription>
              Aucun véhicule n'a été importé. Utilisez l'outil d'importation pour ajouter des véhicules.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Marque</SelectItem>
                    <SelectItem value="model">Modèle</SelectItem>
                    <SelectItem value="price">Prix</SelectItem>
                    <SelectItem value="year">Année</SelectItem>
                    <SelectItem value="mileage">Kilométrage</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  disabled={!sortBy}
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={vehicle.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.model}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                        <div className="flex space-x-1">
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => handleEdit(vehicle)}
                            className="h-8 w-8 bg-white/80 hover:bg-white"
                          >
                            <Edit className="h-4 w-4 text-gray-700" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="destructive"
                            onClick={() => handleDelete(vehicle.id)}
                            className="h-8 w-8 bg-white/80 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4 text-gray-700 group-hover:text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Année:</span> {vehicle.year}
                      </div>
                      <div>
                        <span className="text-gray-500">Énergie:</span> {vehicle.fuelType}
                      </div>
                      <div>
                        <span className="text-gray-500">Kilométrage:</span> {vehicle.mileage?.toLocaleString('fr-FR')} km
                      </div>
                      <div>
                        <span className="text-gray-500">Transmission:</span> {vehicle.transmission || 'N/A'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Dialogue d'édition */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Modifier le véhicule</DialogTitle>
            <DialogDescription>
              Modifiez les détails du véhicule. Tous les champs marqués d'un * sont obligatoires.
            </DialogDescription>
          </DialogHeader>
          
          {editingVehicle && (
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails techniques</TabsTrigger>
                <TabsTrigger value="additional">Informations additionnelles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marque *</Label>
                    <Input
                      id="brand"
                      value={editingVehicle.brand}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, brand: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle *</Label>
                    <Input
                      id="model"
                      value={editingVehicle.model}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Année *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={editingVehicle.year}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editingVehicle.price}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, price: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Kilométrage *</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={editingVehicle.mileage}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, mileage: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Type de carburant *</Label>
                    <Select 
                      value={editingVehicle.fuelType}
                      onValueChange={(value) => setEditingVehicle({ ...editingVehicle, fuelType: value })}
                    >
                      <SelectTrigger>
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={editingVehicle.image}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
                  />
                  {editingVehicle.image && (
                    <div className="mt-2 rounded-md overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                      <img
                        src={editingVehicle.image}
                        alt="Aperçu"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Invalid';
                        }}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select 
                      value={editingVehicle.transmission || ''}
                      onValueChange={(value) => setEditingVehicle({ ...editingVehicle, transmission: value })}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <Label htmlFor="doors">Nombre de portes</Label>
                    <Input
                      id="doors"
                      type="number"
                      value={editingVehicle.doors || ''}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, doors: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exteriorColor">Couleur extérieure</Label>
                    <Input
                      id="exteriorColor"
                      value={editingVehicle.exteriorColor || ''}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, exteriorColor: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interiorColor">Couleur intérieure</Label>
                    <Input
                      id="interiorColor"
                      value={editingVehicle.interiorColor || ''}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, interiorColor: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="engine">Moteur</Label>
                  <Input
                    id="engine"
                    value={editingVehicle.engine || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, engine: e.target.value })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="additional" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingVehicle.description || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Équipements</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    {editingVehicle.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const updatedFeatures = [...(editingVehicle.features || [])];
                            updatedFeatures[index] = e.target.value;
                            setEditingVehicle({ ...editingVehicle, features: updatedFeatures });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedFeatures = [...(editingVehicle.features || [])];
                            updatedFeatures.splice(index, 1);
                            setEditingVehicle({ ...editingVehicle, features: updatedFeatures });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const features = editingVehicle.features || [];
                        setEditingVehicle({ ...editingVehicle, features: [...features, ''] });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un équipement
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleSave(editingVehicle!)}>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleManager;
