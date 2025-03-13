
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleManager from '@/components/VehicleManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert } from 'lucide-react';

const VehicleManagement = () => {
  const [activeTab, setActiveTab] = useState('manage');
  
  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | AutoAdi</title>
        <meta name="description" content="Outil de gestion des véhicules pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start">
            <ShieldAlert className="text-amber-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-medium text-amber-800">Zone d'administration</h2>
              <p className="text-sm text-amber-700">
                Cette section est réservée aux administrateurs du site. Les modifications apportées ici seront visibles par tous les visiteurs.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="manage" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="manage">Gérer les véhicules</TabsTrigger>
              <TabsTrigger value="import">Importer des véhicules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage">
              <VehicleManager />
            </TabsContent>
            
            <TabsContent value="import">
              <VehicleImporter />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleManagement;
