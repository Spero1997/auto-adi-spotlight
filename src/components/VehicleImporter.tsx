
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
      // Ajouter un log pour déboguer
      console.log("Début de l'importation depuis:", url);
      
      const importedVehicles = await extractVehiclesFromUrl(url);
      
      // Vérifier les images importées
      importedVehicles.forEach((vehicle, index) => {
        console.log(`Véhicule ${index + 1} importé:`, vehicle.brand, vehicle.model);
        console.log(`Image URL:`, vehicle.image || 'Pas d\'image');
      });
      
      console.log(`${importedVehicles.length} véhicules importés avec succès`);
      
      toast.success(`${importedVehicles.length} véhicules importés avec succès`);
      setUrl('');
      
      // Forcer la mise à jour de l'affichage
      window.dispatchEvent(new Event('vehiclesUpdated'));
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
      <Input
        type="url"
        placeholder="URL de la page de véhicules"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isImporting}
      />
      <Button onClick={handleImport} disabled={isImporting}>
        {isImporting ? 'Importation en cours...' : 'Importer'}
      </Button>
    </div>
  );
};

export default VehicleImporter;
