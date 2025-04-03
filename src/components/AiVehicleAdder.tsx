
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from 'lucide-react';
import { ImportedVehicle, addImportedVehicle, generateShareableUrl } from "@/utils/vehicleImportService";
import { useNavigate } from 'react-router-dom';

const AiVehicleAdder = () => {
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');
  const navigate = useNavigate();
  
  // Fonction pour ajouter un véhicule à partir des données fournies par l'assistant
  const addVehicleFromAssistant = (
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
    fbLink: string = '',
    description: string = '',
    features: string[] = [],
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

  // Cette fonction sera exposée pour être utilisée par l'assistant
  // @ts-ignore - Cette fonction sera utilisée par l'assistant directement
  window.addVehicleFromAssistant = addVehicleFromAssistant;

  return (
    <div className="mb-6">
      {showShareAlert && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800 flex items-center gap-2">
            <Link className="h-5 w-5" />
            Véhicule ajouté avec succès
          </AlertTitle>
          <AlertDescription className="text-green-700">
            <p className="mb-2">Pour voir ce véhicule sur d'autres appareils, partagez ce lien :</p>
            <div className="flex items-center gap-2 mt-3">
              <input value={shareableUrl} readOnly className="flex-1 p-2 border rounded" />
              <Button variant="outline" onClick={handleCopyUrl}>Copier</Button>
              <Button variant="default" onClick={handleViewCatalog}>Voir</Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Assistant d'ajout de véhicules</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Envoyez-moi simplement les informations et la photo du véhicule, et je l'ajouterai automatiquement au catalogue pour vous.
          </p>
          <div className="mt-4">
            <p className="font-medium">Format recommandé :</p>
            <pre className="bg-gray-100 p-3 rounded text-sm mt-2">
{`Marque: [marque]
Modèle: [modèle]  
Année: [année]
Kilométrage: [kilométrage] km
Prix: [prix] euros
Type de carburant: [type]
Transmission: [type]
Couleur extérieure: [couleur]
Couleur intérieure: [couleur]
Lien Facebook: [url] (optionnel)

Description: [description détaillée]

[Joindre une photo du véhicule]`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiVehicleAdder;
