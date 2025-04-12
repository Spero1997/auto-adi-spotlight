
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  fetchVehiclesFromSupabase, 
  addVehicleToSupabase, 
  updateVehicleInSupabase, 
  deleteVehicleFromSupabase,
  fetchTags,
  fetchVehicleTags,
  addTag,
  addVehicleTag,
  removeVehicleTag
} from '@/utils/services/supabaseService';
import { ImportedVehicle } from '@/utils/types/vehicle';
import { Tag } from '@/utils/types/tag';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Car, 
  Edit, 
  Trash2, 
  Plus, 
  MoreHorizontal, 
  Tag as TagIcon, 
  Star, 
  Search, 
  X 
} from 'lucide-react';

const AdminVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [vehicleTags, setVehicleTags] = useState<Record<string, Tag[]>>({});
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadVehiclesAndTags = async () => {
      setIsLoading(true);
      try {
        // Fetch vehicles
        const vehiclesData = await fetchVehiclesFromSupabase();
        setVehicles(vehiclesData);
        
        // Fetch tags
        const tagsData = await fetchTags();
        setTags(tagsData);
        
        // Fetch tags for each vehicle
        const vehicleTagsMap: Record<string, Tag[]> = {};
        
        for (const vehicle of vehiclesData) {
          const vTags = await fetchVehicleTags(vehicle.id);
          vehicleTagsMap[vehicle.id] = vTags;
        }
        
        setVehicleTags(vehicleTagsMap);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVehiclesAndTags();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    const isFeatured = activeTab === 'featured' ? vehicle.is_featured : true;
    const matchesSearch = 
      vehicle.brand?.toLowerCase().includes(searchLower) ||
      vehicle.model?.toLowerCase().includes(searchLower) ||
      vehicle.fuel_type?.toLowerCase().includes(searchLower) ||
      String(vehicle.year).includes(searchTerm) ||
      String(vehicle.price).includes(searchTerm);
    
    return matchesSearch && (activeTab === 'all' || isFeatured);
  });

  const handleDeleteClick = (id: string) => {
    setVehicleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!vehicleToDelete) return;
    
    try {
      await deleteVehicleFromSupabase(vehicleToDelete);
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete));
      toast.success('Véhicule supprimé avec succès');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const handleEditClick = (vehicle: any) => {
    setCurrentVehicle({ ...vehicle });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentVehicle) return;
    
    try {
      if (currentVehicle.id) {
        // Update existing vehicle
        await updateVehicleInSupabase(currentVehicle.id, currentVehicle);
        setVehicles(vehicles.map(v => v.id === currentVehicle.id ? currentVehicle : v));
        toast.success('Véhicule mis à jour avec succès');
      } else {
        // Add new vehicle
        const addedVehicle = await addVehicleToSupabase(currentVehicle);
        setVehicles([addedVehicle, ...vehicles]);
        toast.success('Véhicule ajouté avec succès');
      }
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsEditDialogOpen(false);
      setCurrentVehicle(null);
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    
    try {
      const newTag = await addTag(newTagName);
      setTags([...tags, newTag]);
      setNewTagName('');
      toast.success('Tag ajouté avec succès');
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error('Erreur lors de l\'ajout du tag');
    }
  };

  const handleAddTagToVehicle = async (vehicleId: string, tagId: string) => {
    try {
      await addVehicleTag(vehicleId, tagId);
      
      // Update local state
      const tag = tags.find(t => t.id === tagId);
      if (tag) {
        const vehicleCurrentTags = vehicleTags[vehicleId] || [];
        setVehicleTags(prev => ({
          ...prev,
          [vehicleId]: [...vehicleCurrentTags, tag]
        }));
      }
      
      toast.success('Tag ajouté au véhicule');
    } catch (error) {
      console.error('Error adding tag to vehicle:', error);
      toast.error('Erreur lors de l\'ajout du tag au véhicule');
    }
  };

  const handleRemoveTagFromVehicle = async (vehicleId: string, tagId: string) => {
    try {
      await removeVehicleTag(vehicleId, tagId);
      
      // Update local state
      setVehicleTags(prev => ({
        ...prev,
        [vehicleId]: prev[vehicleId]?.filter(tag => tag.id !== tagId) || []
      }));
      
      toast.success('Tag retiré du véhicule');
    } catch (error) {
      console.error('Error removing tag from vehicle:', error);
      toast.error('Erreur lors du retrait du tag');
    }
  };

  const handleToggleFeatured = async (vehicle: any) => {
    try {
      const updatedVehicle = {
        ...vehicle,
        is_featured: !vehicle.is_featured
      };
      
      await updateVehicleInSupabase(vehicle.id, updatedVehicle);
      
      // Update local state
      setVehicles(vehicles.map(v => 
        v.id === vehicle.id ? updatedVehicle : v
      ));
      
      toast.success(`Véhicule ${updatedVehicle.is_featured ? 'ajouté aux' : 'retiré des'} favoris`);
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Erreur lors de la mise à jour du statut favoris');
    }
  };

  const handleAddNewVehicle = () => {
    setCurrentVehicle({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel_type: '',
      transmission: '',
      description: '',
      image_url: '',
      is_featured: false
    });
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des véhicules</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
            
            <Button variant="outline" onClick={() => setIsTagDialogOpen(true)}>
              <TagIcon className="mr-2 h-4 w-4" />
              Gérer les tags
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tous les véhicules</TabsTrigger>
            <TabsTrigger value="featured">Véhicules en vedette</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center p-12 border rounded-lg bg-gray-50">
                <Car className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">Aucun véhicule trouvé</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ? "Aucun résultat pour cette recherche." : "Ajoutez des véhicules pour commencer."}
                </p>
              </div>
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
                      <TableHead>Vedette</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          {vehicle.image_url ? (
                            <div className="h-16 w-24 rounded overflow-hidden">
                              <img
                                src={vehicle.image_url}
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
                        <TableCell>{vehicle.fuel_type}</TableCell>
                        <TableCell>
                          <Button
                            variant={vehicle.is_featured ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleFeatured(vehicle)}
                          >
                            <Star
                              className={`h-4 w-4 ${vehicle.is_featured ? 'text-yellow-400 fill-yellow-400' : ''}`}
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {vehicleTags[vehicle.id]?.map((tag) => (
                              <Badge key={tag.id} variant="outline" className="flex items-center gap-1">
                                {tag.name}
                                <button
                                  onClick={() => handleRemoveTagFromVehicle(vehicle.id, tag.id)}
                                  className="hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Ajouter un tag</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {tags
                                  .filter(tag => !vehicleTags[vehicle.id]?.some(vt => vt.id === tag.id))
                                  .map(tag => (
                                    <DropdownMenuItem
                                      key={tag.id}
                                      onClick={() => handleAddTagToVehicle(vehicle.id, tag.id)}
                                    >
                                      {tag.name}
                                    </DropdownMenuItem>
                                  ))
                                }
                                {tags.filter(tag => !vehicleTags[vehicle.id]?.some(vt => vt.id === tag.id)).length === 0 && (
                                  <div className="px-2 py-1 text-sm text-gray-500">
                                    Aucun tag disponible
                                  </div>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditClick(vehicle)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(vehicle.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured" className="p-0">
            {/* Same content structure as "all" tab but with featured vehicles only */}
            {/* The filtering is handled in the filteredVehicles variable */}
          </TabsContent>
        </Tabs>
      </div>

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

      {/* Edit Vehicle Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentVehicle?.id ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
            </DialogTitle>
          </DialogHeader>
          
          {currentVehicle && (
            <Tabs defaultValue="basic">
              <TabsList>
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails techniques</TabsTrigger>
                <TabsTrigger value="media">Médias</TabsTrigger>
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
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentVehicle.description || ''}
                    onChange={(e) => setCurrentVehicle({...currentVehicle, description: e.target.value})}
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={currentVehicle.is_featured || false}
                    onChange={(e) => setCurrentVehicle({...currentVehicle, is_featured: e.target.checked})}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="is_featured">Véhicule en vedette</Label>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel_type">Type de carburant</Label>
                    <Select
                      value={currentVehicle.fuel_type || ''}
                      onValueChange={(value) => setCurrentVehicle({...currentVehicle, fuel_type: value})}
                    >
                      <SelectTrigger id="fuel_type">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Essence">Essence</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybride">Hybride</SelectItem>
                        <SelectItem value="Électrique">Électrique</SelectItem>
                        <SelectItem value="GPL">GPL</SelectItem>
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
                        <SelectItem value="Manuelle">Manuelle</SelectItem>
                        <SelectItem value="Automatique">Automatique</SelectItem>
                        <SelectItem value="Semi-automatique">Semi-automatique</SelectItem>
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
                    <Label htmlFor="exterior_color">Couleur extérieure</Label>
                    <Input
                      id="exterior_color"
                      value={currentVehicle.exterior_color || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, exterior_color: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interior_color">Couleur intérieure</Label>
                    <Input
                      id="interior_color"
                      value={currentVehicle.interior_color || ''}
                      onChange={(e) => setCurrentVehicle({...currentVehicle, interior_color: e.target.value})}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image principale</Label>
                  <Input
                    id="image_url"
                    value={currentVehicle.image_url || ''}
                    onChange={(e) => setCurrentVehicle({...currentVehicle, image_url: e.target.value})}
                  />
                  {currentVehicle.image_url && (
                    <div className="mt-2 border rounded-md overflow-hidden h-40 bg-gray-100">
                      <img
                        src={currentVehicle.image_url}
                        alt="Aperçu"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Invalide';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Additional images would go here in a more complex implementation */}
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

      {/* Manage Tags Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gérer les tags</DialogTitle>
            <DialogDescription>
              Ajoutez ou supprimez des tags pour organiser vos véhicules.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nouveau tag..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
              <Button onClick={handleAddTag}>Ajouter</Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell>{tag.name}</TableCell>
                      <TableCell>
                        {/* In a more complete implementation, you would add a delete tag feature here */}
                      </TableCell>
                    </TableRow>
                  ))}
                  {tags.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-gray-500">
                        Aucun tag disponible
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsTagDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminVehicles;
