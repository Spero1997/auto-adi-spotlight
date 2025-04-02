import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/LegalPageLayout";
import VehicleImporter from "@/components/VehicleImporter";

// Remplacer la déclaration React globale par une importation correcte
// import React from 'react'; <- Ceci est déjà fait via l'import de useRef et useState

interface VehicleData {
  url: string;
  brand?: string;
  model?: string;
  year?: string;
  price?: number;
  description?: string;
  error?: string;
  catalogId?: string;
}

const VehicleImport = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [selectedTab, setSelectedTab] = useState<"url" | "json" | "csv">("url");
  const jsonInputRef = useRef<HTMLTextAreaElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const handleUrlImport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/import-vehicle?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to import vehicle from URL. Status: ${response.status}`);
      }
      const data = await response.json();
      setVehicleData(data);
      toast({
        title: "Vehicle Imported",
        description: "Vehicle data has been successfully imported.",
      });
    } catch (error: any) {
      console.error("Import error:", error);
      toast({
        variant: "destructive",
        title: "Import Error",
        description: error.message || "Failed to import vehicle from URL.",
      });
      setVehicleData({ url, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleJsonImport = () => {
    if (!jsonInputRef.current) return;
    try {
      const jsonData = JSON.parse(jsonInputRef.current.value);
      setVehicles(Array.isArray(jsonData) ? jsonData : [jsonData]);
      toast({
        title: "Vehicles Imported",
        description: "Vehicles have been successfully imported from JSON.",
      });
    } catch (error: any) {
      console.error("JSON parsing error:", error);
      toast({
        variant: "destructive",
        title: "JSON Parsing Error",
        description: error.message || "Failed to parse JSON.",
      });
    }
  };

  const handleCsvImport = () => {
    if (!csvInputRef.current) return;
    const file = csvInputRef.current.files?.[0];
    if (!file) {
      toast({
        variant: "destructive",
        title: "No CSV File",
        description: "Please select a CSV file to import.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvText = e.target?.result as string;
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      const importedVehicles: VehicleData[] = [];

      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(',');
        if (data.length === headers.length) {
          const vehicle: any = {};
          for (let j = 0; j < headers.length; j++) {
            vehicle[headers[j].trim()] = data[j].trim();
          }
          importedVehicles.push(vehicle);
        }
      }

      setVehicles(importedVehicles);
      toast({
        title: "Vehicles Imported",
        description: "Vehicles have been successfully imported from CSV.",
      });
    };

    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "CSV File Error",
        description: "Failed to read the CSV file.",
      });
    };

    reader.readAsText(file);
  };

  return (
    <Layout title="Import de Véhicules" description="Importez des véhicules depuis des sites externes">
      <div className="w-full mb-8">
        <div className="flex space-x-2 mb-6">
          <Button 
            variant={selectedTab === "url" ? "default" : "outline"}
            onClick={() => setSelectedTab("url")}
          >
            URL
          </Button>
          <Button 
            variant={selectedTab === "json" ? "default" : "outline"}
            onClick={() => setSelectedTab("json")}
          >
            JSON
          </Button>
          <Button 
            variant={selectedTab === "csv" ? "default" : "outline"}
            onClick={() => setSelectedTab("csv")}
          >
            CSV
          </Button>
        </div>

        {selectedTab === "url" && (
          <Card className="p-4">
            <Label htmlFor="url">URL du Véhicule</Label>
            <div className="flex mt-2">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com/vehicle123"
              />
              <Button
                className="ml-2"
                onClick={handleUrlImport}
                disabled={loading}
              >
                {loading ? "Importing..." : "Importer"}
              </Button>
            </div>
            {vehicleData && vehicleData.error && (
              <p className="text-red-500 mt-2">Error: {vehicleData.error}</p>
            )}
            {vehicleData && !vehicleData.error && vehicleData.brand && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Vehicle Details</h3>
                <p>Brand: {vehicleData.brand}</p>
                <p>Model: {vehicleData.model}</p>
                {/* Display other vehicle details here */}
              </div>
            )}
          </Card>
        )}

        {selectedTab === "json" && (
          <Card className="p-4">
            <Label htmlFor="json">JSON Data</Label>
            <Textarea
              id="json"
              ref={jsonInputRef}
              placeholder='[{"brand": "Toyota", "model": "Camry"}, {"brand": "Honda", "model": "Civic"}]'
              className="mt-2"
            />
            <Button className="mt-4" onClick={handleJsonImport}>
              Importer JSON
            </Button>
          </Card>
        )}

        {selectedTab === "csv" && (
          <Card className="p-4">
            <Label htmlFor="csv">CSV File</Label>
            <Input
              id="csv"
              type="file"
              accept=".csv"
              ref={csvInputRef}
              className="mt-2"
            />
            <Button className="mt-4" onClick={handleCsvImport}>
              Importer CSV
            </Button>
          </Card>
        )}

        {vehicles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Imported Vehicles</h2>
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="mb-4 p-4">
                <h3 className="text-lg font-semibold">Vehicle #{index + 1}</h3>
                {Object.entries(vehicle).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}
                  </p>
                ))}
              </Card>
            ))}
          </div>
        )}
      </div>

      <VehicleImporter />
    </Layout>
  );
};

export default VehicleImport;
