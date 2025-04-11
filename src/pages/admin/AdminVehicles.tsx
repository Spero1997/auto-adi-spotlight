
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  fetchVehiclesFromSupabase,
  addVehicleToSupabase,
  updateVehicleInSupabase,
  deleteVehicleFromSupabase,
  fetchTags,
  fetchVehicleTags,
  addVehicleTag,
  removeVehicleTag
} from '@/utils/services/supabaseService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Trash2, Edit, Eye, Car, Tag, Save, ChevronDown, ChevronUp, Search, Award } from 'lucide-react';
import { toast } from 'sonner';

// TypeScript interface for vehicle
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  price: number;
  description?: string;
  image_url?: string;
  additional_images?: string[];
  exterior_color?: string;
  interior_color?: string;
  engine?: string;
  power?: number;
  doors?: number;
  features?: string[];
  is_featured: boolean;
  is_sold: boolean;
  in_stock: boolean;
}

interface Tag {
  id: string;
  name: string;
}

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('brand');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [vehicleTags, setVehicleTags] = useState<Record<string, Tag[]>>({});
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    fuel_type: 'Diesel',
    transmission: 'Manuelle',
    price: 0,
    is_featured: false,
    is_sold: false,
    in_stock: true,
    features: []
  });

  // Filter by status state
  const [filter, setFilter] = useState('all');

  // Load vehicles and tags
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const vehiclesData = await fetchVehiclesFromSupabase();
        const tagsData = await fetchTags();
        
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
        setTags(tagsData);
        
        // Fetch tags for each vehicle
        const vehicleTagsMap: Record<string, Tag[]> = {};
        
        for (const vehicle of vehiclesData) {
          const vehicleTags = await fetchVehicleTags(vehicle.id);
          vehicleTagsMap[vehicle.id] = vehicleTags;
        }
        
        setVehicleTags(vehicleTagsMap);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        toast.error('Erreur lors du chargement des véhicules');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...vehicles];
    
    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(vehicle => 
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.fuel_type.toLowerCase().includes(searchLower) ||
        vehicle.year.toString().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filter === 'featured') {
      filtered = filtered.filter(v => v.is_featured);
    } else if (filter === 'sold') {
      filtered = filtered.filter(v => v.is_sold);
    } else if (filter === 'in_stock') {
      filtered = filtered.filter(v => v.in_stock);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'year') {
        comparison = a.year - b.year;
      } else if (sortBy === 'mileage') {
        comparison = a.mileage - b.mileage;
      } else if (sortBy === 'brand') {
        comparison = a.brand.localeCompare(b.brand);
      } else if (sortBy === 'model') {
        comparison = a.model.localeCompare(b.model);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, sortBy, sortOrder, filter]);

  const handleAddVehicle = async () => {
    try {
      const addedVehicle = await addVehicleToSupabase(newVehicle);
      
      if (addedVehicle) {
        // Add tags if any are selected
        for (const tag of selectedTags) {
          await addVehicleTag(addedVehicle.id, tag.id);
        }
        
        toast.success('Véhicule ajouté avec succès');
        
        // Refresh the vehicle list
        const vehiclesData = await fetchVehiclesFromSupabase();
        setVehicles(vehiclesData);
        
        // Reset the form
        setNewVehicle({
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          mileage: 0,
          fuel_type: 'Diesel',
          transmission: 'Manuelle',
          price: 0,
          is_featured: false,
          is_sold: false,
          in_stock: true,
          features: []
        });
        
        setSelectedTags([]);
        setShowAddDialog(false);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error("Erreur lors de l'ajout du véhicule");
    }
  };

  const handleEditVehicle = async () => {
    if (!currentVehicle) return;
    
    try {
      const updatedVehicle = await updateVehicleInSupabase(currentVehicle.id, currentVehicle);
      
      if (updatedVehicle) {
        // Update tags
        const currentTags = vehicleTags[currentVehicle.id] || [];
        const currentTagIds = currentTags.map(tag => tag.id);
        const selectedTagIds = selectedTags.map(tag => tag.id);
        
        // Add new tags
        for (const tag of selectedTags) {
          if (!currentTagIds.includes(tag.id)) {
            await addVehicleTag(currentVehicle.id, tag.id);
          }
        }
        
        // Remove deleted tags
        for (const tag of currentTags) {
          if (!selectedTagIds.includes(tag.id)) {
            await removeVehicleTag(currentVehicle.id, tag.id);
          }
        }
        
        toast.success('Véhicule mis à jour avec succès');
        
        // Refresh the vehicle list
        const vehiclesData = await fetchVehiclesFromSupabase();
        setVehicles(vehiclesData);
        
        // Refresh tags for this vehicle
        const updatedVehicleTags = await fetchVehicleTags(currentVehicle.id);
        setVehicleTags(prev => ({
          ...prev,
          [currentVehicle.id]: updatedVehicleTags
        }));
        
        setShowEditDialog(false);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error('Erreur lors de la mise à jour du véhicule');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        const success = await deleteVehicleFromSupabase(id);
        
        if (success) {
          toast.success('Véhicule supprimé avec succès');
          
          // Update local state
          setVehicles(vehicles.filter(v => v.id !== id));
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        toast.error('Erreur lors de la suppression du véhicule');
      }
    }
  };

  const handleToggleFeature = async (id: string, isFeatured: boolean) => {
    try {
      const updatedVehicle = await updateVehicleInSupabase(id, { is_featured: !isFeatured });
      
      if (updatedVehicle) {
        toast.success(`Véhicule ${!isFeatured ? 'ajouté aux' : 'retiré des'} vedettes`);
        
        // Update local state
        setVehicles(vehicles.map(v => 
          v.id === id ? { ...v, is_featured: !isFeatured } : v
        ));
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Erreur lors de la mise à jour du véhicule');
    }
  };

  const handleToggleSold = async (id: string, isSold: boolean) => {
    try {
      const updatedVehicle = await updateVehicleInSupabase(id, { is_sold: !isSold });
      
      if (updatedVehicle) {
        toast.success(`Véhicule marqué comme ${!isSold ? 'vendu' : 'disponible'}`);
        
        // Update local state
        setVehicles(vehicles.map(v => 
          v.id === id ? { ...v, is_sold: !isSold } : v
        ));
      }
    } catch (error) {
      console.error('Error toggling sold status:', error);
      toast.error('Erreur lors de la mise à jour du véhicule');
    }
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setCurrentVehicle({ ...vehicle });
    setSelectedTags(vehicleTags[vehicle.id] || []);
    setShowEditDialog(true);
  };

  // Fuel type options
  const fuelTypes = [
    'Diesel', 'Essence', 'Hybride', 'Électrique', 'GPL', 'Hybride rechargeable'
  ];

  // Transmission options
  const transmissionTypes = [
    'Manuelle', 'Automatique', 'Semi-automatique', 'CVT'
  ];

  // Feature management
  const handleAddFeature = () => {
    if (currentVehicle) {
      setCurrentVehicle({
        ...currentVehicle,
        features: [...(currentVehicle.features || []), '']
      });
    } else {
      setNewVehicle({
        ...newVehicle,
        features: [...(newVehicle.features || []), '']
      });
    }
  };

  const handleUpdateFeature = (index: number, value: string) => {
    if (currentVehicle) {
      const features = [...(currentVehicle.features || [])];
      features[index] = value;
      setCurrentVehicle({ ...currentVehicle, features });
    } else {
      const features = [...(newVehicle.features || [])];
      features[index] = value;
      setNewVehicle({ ...newVehicle, features });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (currentVehicle) {
      const features = [...(currentVehicle.features || [])];
      features.splice(index, 1);
      setCurrentVehicle({ ...currentVehicle, features });
    } else {
      const features = [...(newVehicle.features || [])];
      features.splice(index, 1);
      setNewVehicle({ ...newVehicle, features });
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Admin Auto ADI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des véhicules</h1>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Ajouter un véhicule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un véhicule</DialogTitle>
                <DialogDescription>
                  Remplissez les informations du véhicule ci-dessous.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Informations de base</TabsTrigger>
                  <TabsTrigger value="details">Détails techniques</TabsTrigger>
                  <TabsTrigger value="features">Équipements</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marque *</Label>
                      <Input
                        id="brand"
                        value={newVehicle.brand}
                        onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Modèle *</Label>
                      <Input
                        id="model"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
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
                        value={newVehicle.year}
                        onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (€) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({ ...newVehicle, price: parseFloat(e.target.value) })}
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
                        value={newVehicle.mileage}
                        onChange={(e) => setNewVehicle({ ...newVehicle, mileage: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel_type">Type de carburant *</Label>
                      <Select 
                        value={newVehicle.fuel_type}
                        onValueChange={(value) => setNewVehicle({ ...newVehicle, fuel_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newVehicle.description || ''}
                      onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_featured"
                        checked={newVehicle.is_featured}
                        onCheckedChange={(checked) => 
                          setNewVehicle({ ...newVehicle, is_featured: checked as boolean })
                        }
                      />
                      <Label htmlFor="is_featured">Véhicule en vedette</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="is_sold"
                        checked={newVehicle.is_sold}
                        onCheckedChange={(checked) => 
                          setNewVehicle({ ...newVehicle, is_sold: checked as boolean })
                        }
                      />
                      <Label htmlFor="is_sold">Véhicule vendu</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in_stock"
                        checked={newVehicle.in_stock}
                        onCheckedChange={(checked) => 
                          setNewVehicle({ ...newVehicle, in_stock: checked as boolean })
                        }
                      />
                      <Label htmlFor="in_stock">En stock</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge 
                          key={tag.id}
                          variant={selectedTags.some(t => t.id === tag.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedTags.some(t => t.id === tag.id)) {
                              setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select 
                        value={newVehicle.transmission}
                        onValueChange={(value) => setNewVehicle({ ...newVehicle, transmission: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissionTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                        value={newVehicle.doors || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, doors: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exterior_color">Couleur extérieure</Label>
                      <Input
                        id="exterior_color"
                        value={newVehicle.exterior_color || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, exterior_color: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interior_color">Couleur intérieure</Label>
                      <Input
                        id="interior_color"
                        value={newVehicle.interior_color || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, interior_color: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="engine">Moteur</Label>
                      <Input
                        id="engine"
                        value={newVehicle.engine || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, engine: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="power">Puissance (ch)</Label>
                      <Input
                        id="power"
                        type="number"
                        value={newVehicle.power || ''}
                        onChange={(e) => setNewVehicle({ ...newVehicle, power: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Équipements</Label>
                    <div className="border rounded-md p-4 space-y-2">
                      {(newVehicle.features || []).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => handleUpdateFeature(index, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddFeature}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un équipement
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="images" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL de l'image principale</Label>
                    <Input
                      id="image_url"
                      value={newVehicle.image_url || ''}
                      onChange={(e) => setNewVehicle({ ...newVehicle, image_url: e.target.value })}
                    />
                    {newVehicle.image_url && (
                      <div className="mt-2 rounded-md overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                        <img
                          src={newVehicle.image_url}
                          alt="Aperçu"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Invalid';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Images additionnelles (URLs séparées par des virgules)</Label>
                    <Textarea
                      value={(newVehicle.additional_images || []).join(', ')}
                      onChange={(e) => setNewVehicle({ 
                        ...newVehicle, 
                        additional_images: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
                      })}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddVehicle}>
                  <Save className="h-4 w-4 mr-2" />
                  Ajouter le véhicule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              prefix={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les véhicules</SelectItem>
                <SelectItem value="featured">En vedette</SelectItem>
                <SelectItem value="sold">Vendus</SelectItem>
                <SelectItem value="in_stock">En stock</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
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
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Vehicles List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <Car className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Aucun véhicule trouvé</h3>
            <p className="mt-1 text-gray-500">
              Ajoutez des véhicules ou modifiez vos filtres pour voir des résultats.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={vehicle.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                  
                  {vehicle.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      En vedette
                    </div>
                  )}
                  
                  {vehicle.is_sold && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      Vendu
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.model}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{vehicle.price.toLocaleString('fr-FR')} €</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Année:</span> {vehicle.year}
                    </div>
                    <div>
                      <span className="text-gray-500">Énergie:</span> {vehicle.fuel_type}
                    </div>
                    <div>
                      <span className="text-gray-500">Kilométrage:</span> {vehicle.mileage.toLocaleString('fr-FR')} km
                    </div>
                    <div>
                      <span className="text-gray-500">Transmission:</span> {vehicle.transmission || 'N/A'}
                    </div>
                  </div>
                  
                  {vehicleTags[vehicle.id] && vehicleTags[vehicle.id].length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1">
                      {vehicleTags[vehicle.id].map(tag => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-2 justify-between">
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(vehicle)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/vehicule/${vehicle.id}`} target="_blank" rel="noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </a>
                      </Button>
                    </div>
                    
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant={vehicle.is_featured ? "default" : "outline"}
                        onClick={() => handleToggleFeature(vehicle.id, vehicle.is_featured)}
                      >
                        <Award className={`h-4 w-4 mr-1 ${vehicle.is_featured ? 'text-yellow-200' : ''}`} />
                        {vehicle.is_featured ? 'Vedette' : 'Mettre en vedette'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le véhicule</DialogTitle>
            <DialogDescription>
              Modifiez les informations du véhicule ci-dessous.
            </DialogDescription>
          </DialogHeader>
          
          {currentVehicle && (
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="details">Détails techniques</TabsTrigger>
                <TabsTrigger value="features">Équipements</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-brand">Marque *</Label>
                    <Input
                      id="edit-brand"
                      value={currentVehicle.brand}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, brand: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-model">Modèle *</Label>
                    <Input
                      id="edit-model"
                      value={currentVehicle.model}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-year">Année *</Label>
                    <Input
                      id="edit-year"
                      type="number"
                      value={currentVehicle.year}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Prix (€) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={currentVehicle.price}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, price: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-mileage">Kilométrage *</Label>
                    <Input
                      id="edit-mileage"
                      type="number"
                      value={currentVehicle.mileage}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, mileage: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-fuel_type">Type de carburant *</Label>
                    <Select 
                      value={currentVehicle.fuel_type}
                      onValueChange={(value) => setCurrentVehicle({ ...currentVehicle, fuel_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={currentVehicle.description || ''}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, description: e.target.value })}
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-is_featured"
                      checked={currentVehicle.is_featured}
                      onCheckedChange={(checked) => 
                        setCurrentVehicle({ ...currentVehicle, is_featured: checked })
                      }
                    />
                    <Label htmlFor="edit-is_featured">Véhicule en vedette</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-is_sold"
                      checked={currentVehicle.is_sold}
                      onCheckedChange={(checked) => 
                        setCurrentVehicle({ ...currentVehicle, is_sold: checked })
                      }
                    />
                    <Label htmlFor="edit-is_sold">Véhicule vendu</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-in_stock"
                      checked={currentVehicle.in_stock}
                      onCheckedChange={(checked) => 
                        setCurrentVehicle({ ...currentVehicle, in_stock: checked })
                      }
                    />
                    <Label htmlFor="edit-in_stock">En stock</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge 
                        key={tag.id}
                        variant={selectedTags.some(t => t.id === tag.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedTags.some(t => t.id === tag.id)) {
                            setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-transmission">Transmission</Label>
                    <Select 
                      value={currentVehicle.transmission}
                      onValueChange={(value) => setCurrentVehicle({ ...currentVehicle, transmission: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-doors">Nombre de portes</Label>
                    <Input
                      id="edit-doors"
                      type="number"
                      value={currentVehicle.doors || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, doors: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-exterior_color">Couleur extérieure</Label>
                    <Input
                      id="edit-exterior_color"
                      value={currentVehicle.exterior_color || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, exterior_color: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-interior_color">Couleur intérieure</Label>
                    <Input
                      id="edit-interior_color"
                      value={currentVehicle.interior_color || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, interior_color: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-engine">Moteur</Label>
                    <Input
                      id="edit-engine"
                      value={currentVehicle.engine || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, engine: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-power">Puissance (ch)</Label>
                    <Input
                      id="edit-power"
                      type="number"
                      value={currentVehicle.power || ''}
                      onChange={(e) => setCurrentVehicle({ ...currentVehicle, power: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Équipements</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    {(currentVehicle.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleUpdateFeature(index, e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFeature(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddFeature}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un équipement
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image_url">URL de l'image principale</Label>
                  <Input
                    id="edit-image_url"
                    value={currentVehicle.image_url || ''}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, image_url: e.target.value })}
                  />
                  {currentVehicle.image_url && (
                    <div className="mt-2 rounded-md overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                      <img
                        src={currentVehicle.image_url}
                        alt="Aperçu"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Invalid';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Images additionnelles (URLs séparées par des virgules)</Label>
                  <Textarea
                    value={(currentVehicle.additional_images || []).join(', ')}
                    onChange={(e) => setCurrentVehicle({ 
                      ...currentVehicle, 
                      additional_images: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
                    })}
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditVehicle}>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminVehicles;
