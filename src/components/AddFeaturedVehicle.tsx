
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { addImportedVehicle } from "@/utils/vehicleImportService";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { type ImportedVehicle } from '@/utils/types/vehicle';

const AddFeaturedVehicle = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [price, setPrice] = useState<number>(15000);
  const [mileage, setMileage] = useState<number>(0);
  const [fuelType, setFuelType] = useState('Essence');
  const [transmission, setTransmission] = useState('Automatique');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brand || !model || !year || !price) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const newVehicle: ImportedVehicle = {
      id: `vehicle-featured-${Date.now()}-${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}`,
      brand,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      image: image || '/lovable-uploads/3f3ae6c7-07fd-46fe-a81c-1a4dc615db1c.png',
      description,
      featured: true,
      catalogType: 'featured'
    };
    
    const success = addImportedVehicle(newVehicle, 'featured');
    
    if (success) {
      toast.success(`${brand} ${model} ajouté au catalogue vedette avec succès`);
      setIsSuccess(true);
      
      // Réinitialiser le formulaire
      setBrand('');
      setModel('');
      setYear(2023);
      setPrice(15000);
      setMileage(0);
      setFuelType('Essence');
      setTransmission('Automatique');
      setImage('');
      setDescription('');
      
      // Rediriger après un délai
      setTimeout(() => {
        navigate('/vehicules/vedette');
      }, 2000);
    } else {
      toast.error("Erreur lors de l'ajout du véhicule vedette");
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Ajouter un véhicule au catalogue vedette</CardTitle>
        <CardDescription>
          Remplissez le formulaire pour ajouter un véhicule à la liste des véhicules vedettes
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isSuccess ? (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-800">Véhicule ajouté avec succès</AlertTitle>
            <AlertDescription className="text-green-700">
              Le véhicule a été ajouté au catalogue vedette. Vous allez être redirigé vers la page des véhicules vedettes.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marque *</Label>
                <Input
                  id="brand"
                  placeholder="Ex: Toyota"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modèle *</Label>
                <Input
                  id="model"
                  placeholder="Ex: Corolla"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
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
                  min="1900"
                  max="2030"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mileage">Kilométrage</Label>
                <Input
                  id="mileage"
                  type="number"
                  min="0"
                  value={mileage}
                  onChange={(e) => setMileage(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelType">Type de carburant</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manuelle">Manuelle</SelectItem>
                  <SelectItem value="Automatique">Automatique</SelectItem>
                  <SelectItem value="Semi-automatique">Semi-automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">URL de l'image</Label>
              <Input
                id="image"
                placeholder="https://exemple.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Laissez vide pour utiliser une image par défaut.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description du véhicule..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Ajouter au catalogue vedette
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default AddFeaturedVehicle;
