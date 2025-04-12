
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractVehiclesFromUrl, generateShareableUrl } from "@/utils/vehicleImportService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface VehicleUrlImporterProps {
  onImportSuccess?: (shareableUrl: string) => void;
}

const VehicleUrlImporter = ({ onImportSuccess }: VehicleUrlImporterProps) => {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [catalogType, setCatalogType] = useState<'standard' | 'featured'>('standard');

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
  }, []);

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
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { detail: { catalogType } }));
        toast.success(`${importedVehicles.length} véhicule(s) importé(s) avec succès`);
        
        const generatedUrl = generateShareableUrl(catalogType);
        if (onImportSuccess) {
          onImportSuccess(generatedUrl);
        }
      } else {
        console.warn("Aucun véhicule n'a pu être importé depuis cette URL");
        toast.error("Aucun véhicule n'a pu être importé depuis cette URL");
      }
      
      setUrl('');
    } catch (error) {
      console.error("Erreur lors de l'importation:", error);
      toast.error("Erreur lors de l'importation");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default VehicleUrlImporter;
