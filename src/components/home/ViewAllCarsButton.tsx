
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ViewAllCarsButton = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Link to="/vehicules/occasion">
        <Button className="mx-auto flex items-center gap-2 px-6 py-3 text-base" size="lg">
          <Car className="h-5 w-5" />
          {language === 'FR' 
            ? "Tous nos véhicules d'occasion" 
            : "All our used vehicles"}
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllCarsButton;
