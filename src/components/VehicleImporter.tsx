
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Upload, Check, UploadCloud, X, AlertTriangle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ImportedVehicle, extractVehiclesFromUrl, addImportedVehicles } from '@/utils/vehicleImportService';

const VehicleImporter = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<ImportedVehicle[]>([]);
  const [showPreview, setShowPreview] = useState(true);

  const handleUrlImport = async () => {
    if (!url) {
      toast({
        title: "URL requise",
        description: "Veuillez entrer une URL valide",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const vehicles = await extractVehiclesFromUrl(url);
      setPreviewData(vehicles);
      
      toast({
        title: "Extraction réussie",
        description: `${vehicles.length} véhicules extraits`,
      });
    } catch (error) {
      console.error("Erreur lors de l'extraction:", error);
      toast({
        title: "Erreur d'extraction",
        description: "Impossible d'extraire les véhicules depuis cette URL",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJsonImport = () => {
    if (!jsonInput) {
      toast({
        title: "Données JSON requises",
        description: "Veuillez entrer des données JSON valides",
        variant: "destructive"
      });
      return;
    }

    try {
      const data = JSON.parse(jsonInput);
      const vehicles = Array.isArray(data) ? data : [data];
      
      // Valider que les données contiennent les champs requis
      const validVehicles = vehicles.filter(vehicle => 
        vehicle && 
        typeof vehicle === 'object' && 
        'brand' in vehicle && 
        'model' in vehicle && 
        'price' in vehicle
      );
      
      if (validVehicles.length === 0) {
        throw new Error("Aucun véhicule valide trouvé dans les données JSON");
      }
      
      // Ajouter des ID si manquants
      const processedVehicles = validVehicles.map((vehicle, index) => ({
        id: vehicle.id || `imported-${Date.now()}-${index}`,
        ...vehicle
      }));
      
      setPreviewData(processedVehicles);
      
      toast({
        title: "Importation JSON réussie",
        description: `${processedVehicles.length} véhicules importés`,
      });
    } catch (error) {
      console.error("Erreur lors de l'importation JSON:", error);
      toast({
        title: "Erreur d'importation JSON",
        description: "Les données JSON ne sont pas valides",
        variant: "destructive"
      });
    }
  };

  const handleConfirmImport = () => {
    if (previewData.length === 0) {
      toast({
        title: "Aucune donnée à importer",
        description: "Veuillez d'abord extraire ou importer des véhicules",
        variant: "destructive"
      });
      return;
    }

    addImportedVehicles(previewData);
    setPreviewData([]);
    setUrl('');
    setJsonInput('');
    
    toast({
      title: "Importation réussie",
      description: `${previewData.length} véhicules ont été ajoutés à votre catalogue`,
    });
  };

  const toggleVehicle = (id: string) => {
    setPreviewData(prev => 
      prev.map(vehicle => 
        vehicle.id === id 
          ? { ...vehicle, excluded: !vehicle.excluded }
          : vehicle
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Importation de véhicules</h1>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Cet outil vous permet d'importer des véhicules depuis un site externe 
          ou à partir de données JSON. Les véhicules importés seront stockés 
          localement dans votre navigateur.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="url" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">Importer par URL</TabsTrigger>
          <TabsTrigger value="json">Importer par JSON</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importer depuis une URL</CardTitle>
              <CardDescription>
                Entrez l'URL d'un site web contenant des véhicules à importer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="https://example.com/vehicules" 
                  className="flex-1"
                />
                <Button 
                  onClick={handleUrlImport} 
                  disabled={isLoading || !url}
                >
                  {isLoading ? (
                    <>Extraction...</>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Extraire
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Pour tester l'importation, essayez ces sites (simulation):</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium cursor-pointer text-blue-600" onClick={() => setUrl('https://luxury-cars-dealer.com/inventory')}>luxury-cars-dealer.com/inventory</span></li>
                  <li><span className="font-medium cursor-pointer text-blue-600" onClick={() => setUrl('https://budget-autos.com/occasion')}>budget-autos.com/occasion</span></li>
                  <li><span className="font-medium cursor-pointer text-blue-600" onClick={() => setUrl('https://bmw-dealer.com/used')}>bmw-dealer.com/used</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="json" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importer depuis JSON</CardTitle>
              <CardDescription>
                Collez les données de véhicules au format JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder='[{"brand": "Renault", "model": "Clio", "year": 2020, "price": 12500, "mileage": 25000, "fuelType": "Essence", "image": "https://example.com/clio.jpg"}]'
                className="min-h-[200px] font-mono text-sm"
              />
              <Button 
                onClick={handleJsonImport} 
                className="mt-4"
                disabled={!jsonInput}
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Importer JSON
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {previewData.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Aperçu des véhicules ({previewData.length})</h2>
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-preview" 
                checked={showPreview} 
                onCheckedChange={setShowPreview}
              />
              <Label htmlFor="show-preview">Afficher l'aperçu</Label>
            </div>
          </div>
          
          {showPreview && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {previewData.map((vehicle) => (
                <Card 
                  key={vehicle.id} 
                  className={`overflow-hidden ${vehicle.excluded ? 'opacity-50 border-red-300' : ''}`}
                >
                  <div className="relative h-40">
                    <img 
                      src={vehicle.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                    <button 
                      className={`absolute top-2 right-2 p-1 rounded-full ${
                        vehicle.excluded ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => toggleVehicle(vehicle.id)}
                    >
                      {vehicle.excluded ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{vehicle.brand} {vehicle.model}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-lg font-semibold">{vehicle.price?.toLocaleString('fr-FR')} €</span>
                      <span className="text-gray-500">{vehicle.year} · {vehicle.mileage?.toLocaleString('fr-FR')} km</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {vehicle.fuelType} · {vehicle.transmission}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setPreviewData([])}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleConfirmImport}
              disabled={previewData.filter(v => !v.excluded).length === 0}
            >
              <Upload className="mr-2 h-4 w-4" />
              Confirmer l'importation ({previewData.filter(v => !v.excluded).length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleImporter;
