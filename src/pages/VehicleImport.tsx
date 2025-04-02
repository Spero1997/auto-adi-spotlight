
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';
import VehicleAddForm from '@/components/VehicleAddForm';
import { getImportedVehicles, addImportedVehicle, ImportedVehicle } from '@/utils/vehicleImportService';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Clé pour vérifier si l'initialisation a déjà été faite dans cette session
const SESSION_INIT_KEY = "vehicle_import_initialized";

const VehicleImport = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  // Tableau d'alertes vides pour ne pas afficher les alertes au chargement
  const [alerts, setAlerts] = useState<string[]>([]);
  
  const addHyundaiSantaFe = () => {
    try {
      const hyundaiSantaFe: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-hyundai-santa-fe`,
        brand: 'Hyundai',
        model: 'Santa Fe Sport',
        year: 2013,
        mileage: 79000,
        price: 4500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Vert',
        interiorColor: 'Noir',
        image: '/lovable-uploads/74794e1d-cef3-4179-9428-d3359d588743.png',
        fbLink: 'https://www.facebook.com/share/p/1GsrVVncej/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !
Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
        features: [
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage'
        ],
        catalogType: 'standard'
      };
      
      addImportedVehicle(hyundaiSantaFe, 'standard');
      toast.success('Hyundai Santa Fe Sport ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Hyundai Santa Fe Sport:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };
  
  const addToyotaCamrySE = () => {
    try {
      const toyotaCamrySE: ImportedVehicle = {
        id: `vehicle-standard-${Date.now()}-toyota-camry-se`,
        brand: 'Toyota',
        model: 'Camry SE',
        year: 2022,
        mileage: 28000,
        price: 15500,
        fuelType: 'Essence',
        transmission: 'Automatique',
        exteriorColor: 'Rouge',
        interiorColor: 'Noir',
        image: '/lovable-uploads/86cf6e1b-5f63-424c-8a21-168c2f127e59.png',
        fbLink: 'https://www.facebook.com/share/p/1EqQLrWetM/?mibextid=wwXIfr',
        description: `Modalités de paiement
• Acompte : 20 % à la commande
• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)
• Offre spéciale : -10 % pour paiement comptant à la commande
Nos services inclus :
• Délai de rétractation : 14 jours (Satisfait ou remboursé)
• Facilité de paiement : Payable comptant ou en mensualités sans intérêt.
• Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !
Garantie : 12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.`,
        features: [
          'Transmission automatique',
          'Climatisation',
          'Direction assistée',
          'Vitres électriques',
          'Jantes alliage',
          'Système de navigation',
          'Caméra de recul'
        ],
        catalogType: 'standard'
      };
      
      addImportedVehicle(toyotaCamrySE, 'standard');
      toast.success('Toyota Camry SE ajouté avec succès au catalogue!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Toyota Camry SE:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };

  // Ce code est maintenant exécuté uniquement si l'initialisation n'a pas encore été effectuée
  const initializeCatalog = () => {
    // Ne pas exécuter si déjà initialisé dans cette session
    if (sessionStorage.getItem(SESSION_INIT_KEY)) {
      console.log("Le catalogue a déjà été initialisé dans cette session");
      setVehiclesLoaded(true);
      return;
    }
    
    // Marquer comme initialisé pour cette session
    sessionStorage.setItem(SESSION_INIT_KEY, "true");
    
    try {
      const vehicles = getImportedVehicles();
      
      // Vérifier et ajouter les véhicules manquants
      const hyundaiSantaFe = vehicles.find(v => 
        v.brand === "Hyundai" && 
        v.model.includes("Santa Fe Sport") && 
        v.year === 2013
      );
      
      if (!hyundaiSantaFe) {
        console.log("Ajout automatique du Hyundai Santa Fe Sport au catalogue");
        addHyundaiSantaFe();
      }
      
      const toyotaCamry = vehicles.find(v => 
        v.brand === "Toyota" && 
        v.model.includes("Camry SE") && 
        v.year === 2022
      );
      
      if (!toyotaCamry) {
        console.log("Ajout automatique du Toyota Camry SE au catalogue");
        addToyotaCamrySE();
      }
      
      setVehiclesLoaded(true);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
    }
  };
  
  // Utilise useState pour effectuer l'initialisation une seule fois
  React.useEffect(() => {
    initializeCatalog();
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Importation de véhicules | AutoAdi</title>
        <meta name="description" content="Outil d'importation de véhicules depuis des sites de vente automobiles pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Gestion des véhicules</h1>
          <p className="text-center text-gray-600 mb-8">
            Ajoutez ou importez facilement des véhicules
          </p>
          
          {alerts.length > 0 && 
            <div className="space-y-4 mb-6">
              {alerts.map((alert, index) => (
                <Alert key={index} className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>{alert}</AlertDescription>
                </Alert>
              ))}
            </div>
          }
          
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={addHyundaiSantaFe}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Ajouter le Hyundai Santa Fe Sport au catalogue
            </Button>
            
            <Button 
              onClick={addToyotaCamrySE}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ajouter la Toyota Camry SE au catalogue
            </Button>
          </div>
          
          <Tabs defaultValue="add" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="add">Ajout manuel</TabsTrigger>
              <TabsTrigger value="import">Import depuis URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add" className="mt-0">
              <VehicleAddForm />
            </TabsContent>
            
            <TabsContent value="import" className="mt-0">
              <VehicleImporter />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleImport;
