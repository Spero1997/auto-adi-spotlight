
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { extractVehiclesFromUrl, addImportedVehicle, ImportedVehicle } from "@/utils/vehicleImportService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VehicleImporter = () => {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [catalogType, setCatalogType] = useState<'standard' | 'featured'>('standard');

  // Limite l'ajout automatique des véhicules à une seule fois par session
  const addedKey = "vehicleAdded";

  const handleImport = async () => {
    if (!url.trim()) {
      toast.error("Veuillez entrer une URL valide");
      return;
    }
    
    setIsImporting(true);
    try {
      console.log(`VehicleImporter: Import depuis ${url} vers le catalogue ${catalogType}`);
      const importedVehicles = await extractVehiclesFromUrl(url, catalogType);
      
      if (importedVehicles.length > 0) {
        toast.success(`${importedVehicles.length} véhicule(s) importé(s) avec succès dans le catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}`);
        // Déclencher un événement pour mettre à jour l'affichage des véhicules
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
      } else {
        toast.warning("Aucun véhicule n'a pu être importé depuis cette URL");
      }
      
      setUrl('');
    } catch (error) {
      console.error("Erreur lors de l'importation:", error);
      toast.error("Erreur lors de l'importation des véhicules");
    } finally {
      setIsImporting(false);
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
        image: '/lovable-uploads/e619a891-0a93-420b-bae9-6d66cfdb9a8b.png',
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
      
      const success = addImportedVehicle(toyotaCamrySE, 'standard');
      
      if (success) {
        toast.success('Toyota Camry SE 2022 ajoutée avec succès au catalogue standard!');
        // Déclencher un événement pour mettre à jour l'affichage des véhicules
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
      } else {
        toast.error("Une erreur s'est produite lors de l'ajout de la Toyota Camry SE");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Toyota Camry SE:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="url">Importer depuis URL</TabsTrigger>
          <TabsTrigger value="presets">Véhicules préconçus</TabsTrigger>
        </TabsList>
      
        <TabsContent value="url" className="space-y-4">
          <h2 className="text-xl font-semibold">Importer depuis une URL</h2>
          <p className="text-gray-600">
            Entrez l'URL d'une page listant des véhicules pour importer automatiquement les informations.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="catalog-type">Catalogue de destination</Label>
            <Select
              value={catalogType}
              onValueChange={(value: 'standard' | 'featured') => setCatalogType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un catalogue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Catalogue standard</SelectItem>
                <SelectItem value="featured">Catalogue vedette</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Input
            type="url"
            placeholder="URL de la page de véhicules"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          
          <Button onClick={handleImport} disabled={isImporting}>
            {isImporting ? "Importation en cours..." : `Importer vers catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}`}
          </Button>
        </TabsContent>
        
        <TabsContent value="presets" className="space-y-4">
          <h2 className="text-xl font-semibold">Véhicules préconçus</h2>
          <p className="text-gray-600">
            Ajoutez rapidement des véhicules préconçus au catalogue standard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <img 
                  src="/lovable-uploads/e619a891-0a93-420b-bae9-6d66cfdb9a8b.png" 
                  alt="Toyota Camry SE 2022" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Toyota Camry SE</h3>
              <div className="text-sm space-y-1">
                <p>2022 • Essence • 28,000 km</p>
                <p className="font-bold">15,500 €</p>
              </div>
              <Button onClick={addToyotaCamrySE} className="w-full">
                Ajouter au catalogue standard
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleImporter;
