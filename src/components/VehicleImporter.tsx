
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateShareableUrl } from "@/utils/vehicleImportService";
import { toast } from 'sonner';

import VehicleUrlImporter from './import/VehicleUrlImporter';
import VehiclePresetList from './import/VehiclePresetList';

const VehicleImporter = () => {
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  }, []);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      console.log('URL copiée dans le presse-papiers');
      toast.success('URL copiée dans le presse-papiers');
    } catch (err) {
      console.error('Impossible de copier l\'URL:', err);
      toast.error('Impossible de copier l\'URL');
    }
  };
  
  const handleViewCatalog = () => {
    window.location.href = shareableUrl;
  };

  return (
    <div className="flex flex-col space-y-6">
      {showShareAlert && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800 flex items-center gap-2">
            <Link className="h-5 w-5" />
            Véhicule ajouté avec succès
          </AlertTitle>
          <AlertDescription className="text-green-700">
            <p className="mb-2">Pour voir ce véhicule sur d'autres appareils, partagez ce lien :</p>
            <div className="flex items-center gap-2 mt-3">
              <Input value={shareableUrl} readOnly className="flex-1" />
              <Button variant="outline" onClick={handleCopyUrl}>Copier</Button>
              <Button variant="default" onClick={handleViewCatalog}>Voir</Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="url">Importer depuis URL</TabsTrigger>
          <TabsTrigger value="presets">Véhicules préconçus</TabsTrigger>
        </TabsList>
      
        <TabsContent value="url" className="space-y-4">
          <VehicleUrlImporter />
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
