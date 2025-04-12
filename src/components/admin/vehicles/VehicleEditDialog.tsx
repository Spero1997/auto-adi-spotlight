
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import { Plus, Save, X } from 'lucide-react';

interface VehicleEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentVehicle: ImportedVehicle | null;
  setCurrentVehicle: (vehicle: ImportedVehicle | null) => void;
  onSave: (vehicle: ImportedVehicle) => void;
}

const VehicleEditDialog: React.FC<VehicleEditDialogProps> = ({
  isOpen,
  onOpenChange,
  currentVehicle,
  setCurrentVehicle,
  onSave,
}) => {
  const [newImageUrl, setNewImageUrl] = useState('');

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

  const handleAddImage = () => {
    if (!currentVehicle || !newImageUrl.trim()) return;

    const currentImages = currentVehicle.images || [];
    setCurrentVehicle({
      ...currentVehicle,
      images: [...currentImages, newImageUrl]
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (!currentVehicle || !currentVehicle.images) return;

    const updatedImages = [...currentVehicle.images];
    updatedImages.splice(index, 1);
    
    setCurrentVehicle({
      ...currentVehicle,
      images: updatedImages
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                <Label htmlFor="image">URL de l'image principale</Label>
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
                <Label>Images additionnelles</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="URL de l'image..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddImage}
                    variant="secondary"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
                
                {currentVehicle.images && currentVehicle.images.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {currentVehicle.images.map((img, index) => (
                      <div key={index} className="relative border rounded-md overflow-hidden group">
                        <img
                          src={img}
                          alt={`Image ${index + 1}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Invalide';
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-8 mt-4 text-gray-500">
                    <img src="https://via.placeholder.com/64" alt="No images" className="h-12 w-12 text-gray-300 mb-2" />
                    <p>Aucune image additionnelle</p>
                    <p className="text-sm">Ajoutez des images en utilisant le champ ci-dessus</p>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={() => currentVehicle && onSave(currentVehicle)}>
            {currentVehicle?.id ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleEditDialog;
