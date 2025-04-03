
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVehiclesFromUrl, addImportedVehicle, ImportedVehicle, generateShareableUrl } from "@/utils/vehicleImportService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';

const VehicleImporter = () => {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [catalogType, setCatalogType] = useState<'standard' | 'featured'>('standard');
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');
  const navigate = useNavigate();

  const handleImport = async () => {
    if (!url.trim()) {
      console.error("Veuillez entrer une URL valide");
      return;
    }
    
    setIsImporting(true);
    try {
      console.log(`VehicleImporter: Import depuis ${url} vers le catalogue ${catalogType}`);
      const importedVehicles = await extractVehiclesFromUrl(url, catalogType);
      
      if (importedVehicles.length > 0) {
        console.log(`${importedVehicles.length} véhicule(s) importé(s) avec succès dans le catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}`);
        // Déclencher un événement pour mettre à jour l'affichage des véhicules
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
        
        // Générer une URL partageable et l'afficher à l'utilisateur
        const url = generateShareableUrl(catalogType);
        setShareableUrl(url);
        setShowShareAlert(true);
      } else {
        console.warn("Aucun véhicule n'a pu être importé depuis cette URL");
      }
      
      setUrl('');
    } catch (error) {
      console.error("Erreur lors de l'importation:", error);
    } finally {
      setIsImporting(false);
    }
  };
  
  // Fonction pour ajouter un véhicule manuellement à partir d'informations fournies
  const addVehicleFromInfo = (
    brand: string,
    model: string,
    year: number,
    mileage: number,
    price: number,
    fuelType: string,
    transmission: string,
    exteriorColor: string,
    interiorColor: string,
    image: string,
    fbLink: string,
    description: string,
    features: string[],
    catalogType: 'standard' | 'featured' = 'standard'
  ) => {
    try {
      const newVehicle: ImportedVehicle = {
        id: `vehicle-${catalogType}-${Date.now()}-${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}`,
        brand,
        model,
        year,
        mileage,
        price,
        fuelType,
        transmission,
        exteriorColor,
        interiorColor,
        image,
        fbLink,
        description,
        features,
        catalogType
      };
      
      const success = addImportedVehicle(newVehicle, catalogType);
      
      if (success) {
        console.log(`${brand} ${model} ${year} ajouté avec succès au catalogue ${catalogType === 'featured' ? 'vedette' : 'standard'}!`);
        // Déclencher un événement pour mettre à jour l'affichage des véhicules
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
        
        // Générer une URL partageable et l'afficher à l'utilisateur
        const url = generateShareableUrl(catalogType);
        setShareableUrl(url);
        setShowShareAlert(true);
        return true;
      } else {
        console.error(`Une erreur s'est produite lors de l'ajout de ${brand} ${model}`);
        return false;
      }
    } catch (error) {
      console.error(`Erreur lors de l'ajout de ${brand} ${model}:`, error);
      return false;
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
        image: '/lovable-uploads/3f3ae6c7-07fd-46fe-a81c-1a4dc615db1c.png',
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
        console.log('Toyota Camry SE 2022 ajoutée avec succès au catalogue standard!');
        // Déclencher un événement pour mettre à jour l'affichage des véhicules
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType: 'standard' } }));
        
        // Générer une URL partageable et l'afficher à l'utilisateur
        const url = generateShareableUrl('standard');
        setShareableUrl(url);
        setShowShareAlert(true);
      } else {
        console.error("Une erreur s'est produite lors de l'ajout de la Toyota Camry SE");
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la Toyota Camry SE:', error);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      console.log('URL copiée dans le presse-papiers');
    } catch (err) {
      console.error('Impossible de copier l\'URL:', err);
    }
  };
  
  const handleViewCatalog = () => {
    navigate(shareableUrl);
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
                  src="/lovable-uploads/3f3ae6c7-07fd-46fe-a81c-1a4dc615db1c.png" 
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
