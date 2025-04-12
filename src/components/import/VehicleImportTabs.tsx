
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import AiVehicleAdder from '@/components/AiVehicleAdder';

type VehicleImportTabsProps = {
  triggerUpdate: () => void;
};

const VehicleImportTabs = ({ triggerUpdate }: VehicleImportTabsProps) => {
  const [activeTab, setActiveTab] = useState("assistant");
  
  return (
    <Tabs defaultValue="assistant" className="w-full" onValueChange={(value) => setActiveTab(value)}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="assistant">Assistant IA</TabsTrigger>
        <TabsTrigger value="add">Ajout manuel</TabsTrigger>
        <TabsTrigger value="import">Import depuis URL</TabsTrigger>
      </TabsList>
      
      <TabsContent value="assistant" className="mt-0">
        <AiVehicleAdder />
      </TabsContent>
      
      <TabsContent value="add" className="mt-0">
        <VehicleAddForm />
      </TabsContent>
      
      <TabsContent value="import" className="mt-0">
        <VehicleImporter />
      </TabsContent>
    </Tabs>
  );
};

export default VehicleImportTabs;
