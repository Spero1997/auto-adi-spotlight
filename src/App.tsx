
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
      </Router>
    </LanguageProvider>
  );
}

export default App;
