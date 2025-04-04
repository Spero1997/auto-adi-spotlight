
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Star, Link as LinkIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImportedVehicle } from '@/utils/vehicleImportService';

interface VehicleCardProps {
  vehicle: ImportedVehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const isMobile = useIsMobile();
  
  // Fonction pour ouvrir directement la publication Facebook sur mobile et desktop
  const openFacebookLink = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    if (isMobile) {
      // Sur mobile, essayons d'ouvrir directement avec l'app Facebook si possible
      try {
        // Utiliser un format d'URL qui fonctionne mieux avec l'app Facebook
        // Format: fb://facewebmodal/f?href=URL_ENCODED
        const encodedUrl = encodeURIComponent(url);
        
        // Essayer d'ouvrir dans l'app Facebook
        window.location.href = `fb://facewebmodal/f?href=${encodedUrl}`;
        
        // Si l'app FB n'est pas installée, on ouvre dans le navigateur après un court délai
        setTimeout(() => {
          // Vérifier si on est toujours sur la même page (ce qui signifie que l'app FB n'a pas été ouverte)
          window.open(url, '_blank');
        }, 500); // Délai augmenté pour donner plus de temps à l'app FB pour s'ouvrir
      } catch (e) {
        console.error("Erreur lors de l'ouverture du lien Facebook:", e);
        // Fallback en cas d'erreur - ouvrir dans le navigateur
        window.open(url, '_blank');
      }
    } else {
      // Sur desktop, ouvrir dans un nouvel onglet normalement
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 relative h-48">
        <img
          src={vehicle.image || 'https://via.placeholder.com/640x480?text=No+Image'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="object-cover w-full h-full"
          onError={(e) => {
            console.error("Erreur de chargement de l'image:", vehicle.image);
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x480?text=No+Image';
          }}
        />
        {(vehicle.featured || vehicle.catalogType === 'featured') && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
            <Star className="h-5 w-5 fill-white" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{vehicle.brand} {vehicle.model}</h3>
        <p className="text-gray-600">{vehicle.year} • {vehicle.fuelType}</p>
        
        {vehicle.fbLink && (
          <button 
            onClick={(e) => openFacebookLink(vehicle.fbLink || '', e)}
            className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
            aria-label="Voir sur Facebook"
          >
            <LinkIcon className="h-4 w-4 mr-1" />
            Voir sur Facebook
          </button>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-blue">{vehicle.price?.toLocaleString('fr-FR')} €</span>
          <Link to={`/vehicule/${vehicle.id}`} data-testid={`vehicle-link-${vehicle.id}`}>
            <Button>
              Voir détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
