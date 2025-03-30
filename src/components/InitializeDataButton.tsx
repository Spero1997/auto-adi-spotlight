
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { initializeVehicleData, checkIfDataExists } from '@/utils/initialData';
import { RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const InitializeDataButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitializeData = () => {
    setIsLoading(true);
    
    try {
      initializeVehicleData();
      // Fermer la boîte de dialogue après l'initialisation
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'initialisation des données:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Réinitialiser les catalogues
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Réinitialiser les catalogues</DialogTitle>
          <DialogDescription>
            Cette action va réinitialiser les catalogues et ajouter des véhicules de démonstration.
            Voulez-vous continuer ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleInitializeData} 
            disabled={isLoading}
          >
            {isLoading ? "Initialisation..." : "Réinitialiser"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitializeDataButton;
