
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateShareableUrl } from "@/utils/vehicleImportService";

import VehicleUrlImporter from './import/VehicleUrlImporter';
import VehiclePresetList from './import/VehiclePresetList';
import VehicleShareAlert from './import/VehicleShareAlert';

const VehicleImporter = () => {
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <VehicleShareAlert 
        showShareAlert={showShareAlert}
        shareableUrl={shareableUrl}
      />
      
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="url">Importer depuis URL</TabsTrigger>
          <TabsTrigger value="presets">Véhicules préconçus</TabsTrigger>
        </TabsList>
      
        <TabsContent value="url" className="space-y-4">
          <VehicleUrlImporter 
            onImportSuccess={(url) => {
              setShareableUrl(url);
              setShowShareAlert(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="presets" className="space-y-4">
          <h2 className="text-xl font-semibold">Véhicules préconçus</h2>
          <p className="text-gray-600">
            Ajoutez rapidement des véhicules préconçus au catalogue standard.
          </p>
          
          <VehiclePresetList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleImporter;
