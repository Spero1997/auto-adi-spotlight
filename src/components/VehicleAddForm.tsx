import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from 'lucide-react';
import { addImportedVehicle } from "@/utils/vehicleImportService";

const VehicleAddForm = () => {
  const { toast } = useToast();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [exteriorColor, setExteriorColor] = useState('');
  const [interiorColor, setInteriorColor] = useState('');
  const [transmission, setTransmission] = useState('');
  const [doors, setDoors] = useState('');
  const [engine, setEngine] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!brand || !model || !year || !mileage || !fuelType || !price) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const newVehicle = {
      id: `${brand}-${model}-${Date.now()}`,
      brand,
      model,
      year: parseInt(year),
      mileage: parseInt(mileage),
      fuelType,
      price: parseInt(price),
      image,
      description,
      exteriorColor,
      interiorColor,
      transmission,
      doors: doors ? parseInt(doors) : undefined,
      engine,
      features,
    };

    const success = await addImportedVehicle(newVehicle);

    if (success) {
      setBrand('');
      setModel('');
      setYear('');
      setMileage('');
      setFuelType('');
      setPrice('');
      setImage('');
      setDescription('');
      setExteriorColor('');
      setInteriorColor('');
      setTransmission('');
      setDoors('');
      setEngine('');
      setFeatures(['']);

      toast({
        title: "Succès",
        description: `${brand} ${model} a été ajouté avec succès.`,
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du véhicule.",
        variant: "destructive",
      });
    }
  };

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
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un véhicule manuellement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marque *</Label>
              <Input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modèle *</Label>
              <Input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Année *</Label>
              <Input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="mileage">Kilométrage *</Label>
              <Input
                type="number"
                id="mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fuelType">Type de carburant *</Label>
              <Select value={fuelType} onValueChange={setFuelType}>
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
            <div>
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select value={transmission} onValueChange={setTransmission}>
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
            <div>
              <Label htmlFor="doors">Nombre de portes</Label>
              <Input
                type="number"
                id="doors"
                value={doors}
                onChange={(e) => setDoors(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exteriorColor">Couleur extérieure</Label>
              <Input
                type="text"
                id="exteriorColor"
                value={exteriorColor}
                onChange={(e) => setExteriorColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interiorColor">Couleur intérieure</Label>
              <Input
                type="text"
                id="interiorColor"
                value={interiorColor}
                onChange={(e) => setInteriorColor(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="engine">Moteur</Label>
            <Input
              type="text"
              id="engine"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Équipements</Label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[index] = e.target.value;
                    setFeatures(newFeatures);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newFeatures = [...features];
                    newFeatures.splice(index, 1);
                    setFeatures(newFeatures);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFeatures([...features, ''])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un équipement
            </Button>
          </div>

          <Button type="submit">Ajouter le véhicule</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleAddForm;
