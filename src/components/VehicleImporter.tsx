
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { extractVehiclesFromUrl } from "@/utils/vehicleImportService";

const VehicleImporter = () => {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      toast.error("Veuillez entrer une URL valide");
      return;
    }
    
    setIsImporting(true);
    try {
      toast.info("Le catalogue a été supprimé, impossible d'importer des véhicules");
      setUrl('');
    } catch (error) {
      console.error("Erreur lors de l'importation:", error);
      toast.error("Erreur lors de l'importation des véhicules");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Importer depuis une URL</h2>
      <p className="text-gray-600">
        Entrez l'URL d'une page listant des véhicules pour importer automatiquement les informations.
      </p>
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-amber-700">Le catalogue a été supprimé. L'importation de véhicules n'est plus disponible.</p>
      </div>
      <Input
        type="url"
        placeholder="URL de la page de véhicules"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={true}
      />
      <Button onClick={handleImport} disabled={true}>
        Importer
      </Button>
    </div>
  );
};

export default VehicleImporter;
