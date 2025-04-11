
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Vehicules from './pages/VehiculesOccasion';
import Contact from './pages/Contact';
import LegalMentions from './pages/LegalMentions';
import VehicleDetails from './pages/VehicleDetails';
import VehicleImport from './pages/VehicleImport';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import Blog from './pages/Blog';
import Services from './pages/Services';
import Financement from './pages/Financement';
import Rachat from './pages/Rachat';
import APropos from './pages/APropos';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import Cookies from './pages/Cookies';
import CGV from './pages/CGV';
import Conditions from './pages/Conditions';
import Chatbot from './components/Chatbot';
import { type ImportedVehicle } from './utils/types/vehicle';

window.addVehicleFromAssistant = (
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
): boolean => {
  try {
    import('./utils/vehicleImportService').then(({ addVehicle }) => {
      const vehicle: ImportedVehicle = {
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
      
      console.log(`Ajout du véhicule ${brand} ${model} via l'API window`);
      addVehicle(vehicle, catalogType);
    });
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout du véhicule via l'API window:", error);
    return false;
  }
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicules/occasion" element={<Vehicules />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/vehicule/:id/:slug" element={<VehicleDetails />} />
          <Route path="/vehicules/import" element={<VehicleImport />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/financement" element={<Financement />} />
          <Route path="/rachat" element={<Rachat />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </Router>
    </LanguageProvider>
  );
}

export default App;
