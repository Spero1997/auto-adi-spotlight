
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Check } from 'lucide-react';

interface VehicleDetailTabsProps {
  description?: string;
  features?: string[];
}

const VehicleDetailTabs = ({ description, features }: VehicleDetailTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="description">
          <Info className="mr-2 h-4 w-4" />
          Description
        </TabsTrigger>
        <TabsTrigger value="features">
          <Check className="mr-2 h-4 w-4" />
          Équipements
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Description du véhicule</h2>
        {description ? (
          <div className="text-gray-700 space-y-4 whitespace-pre-line">
            {description}
          </div>
        ) : (
          <p className="text-gray-500 italic">Aucune description disponible pour ce véhicule.</p>
        )}
      </TabsContent>
      
      <TabsContent value="features" className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Équipements et options</h2>
        {features && features.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-4 w-4 text-brand-blue mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Aucun équipement spécifié pour ce véhicule.</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VehicleDetailTabs;
