
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VehicleFormProvider, useVehicleForm } from './vehicles/VehicleFormContext';
import VehicleBasicInfoForm from './vehicles/VehicleBasicInfoForm';
import VehicleSpecificationsForm from './vehicles/VehicleSpecificationsForm';
import VehicleImagesForm from './vehicles/VehicleImagesForm';
import VehicleFeaturesForm from './vehicles/VehicleFeaturesForm';

// Composant de formulaire interne qui utilise le contexte
const VehicleFormContent = () => {
  const { handleSubmit } = useVehicleForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="basic">Infos de base</TabsTrigger>
          <TabsTrigger value="specs">Spécifications</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="features">Équipements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <VehicleBasicInfoForm />
        </TabsContent>
        
        <TabsContent value="specs" className="space-y-4">
          <VehicleSpecificationsForm />
        </TabsContent>
        
        <TabsContent value="images" className="space-y-4">
          <VehicleImagesForm />
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <VehicleFeaturesForm />
        </TabsContent>
      </Tabs>
      
      <Button type="submit" className="w-full">Ajouter le véhicule</Button>
    </form>
  );
};

// Composant principal qui fournit le contexte
const VehicleAddForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un véhicule manuellement</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleFormProvider>
          <VehicleFormContent />
        </VehicleFormProvider>
      </CardContent>
    </Card>
  );
};

export default VehicleAddForm;
