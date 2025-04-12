
import { Link } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface VehicleShareAlertProps {
  showShareAlert: boolean;
  shareableUrl: string;
}

const VehicleShareAlert = ({ showShareAlert, shareableUrl }: VehicleShareAlertProps) => {
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      console.log('URL copiée dans le presse-papiers');
      toast.success('URL copiée dans le presse-papiers');
    } catch (err) {
      console.error('Impossible de copier l\'URL:', err);
      toast.error('Impossible de copier l\'URL');
    }
  };
  
  const handleViewCatalog = () => {
    window.location.href = shareableUrl;
  };

  if (!showShareAlert) return null;

  return (
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
  );
};

export default VehicleShareAlert;
