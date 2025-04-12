
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import Services from './pages/Services';
import APropos from './pages/APropos';
import CGV from './pages/CGV';
import Conditions from './pages/Conditions';
import Cookies from './pages/Cookies';
import Financement from './pages/Financement';
import LegalMentions from './pages/LegalMentions';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import Rachat from './pages/Rachat';
import VehiculesOccasion from './pages/VehiculesOccasion';
import VehicleDetails from './pages/VehicleDetails';
import VehicleImport from './pages/VehicleImport';
import VehicleManagement from './pages/VehicleManagement';
import OrdersBackup from './pages/OrdersBackup';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vehicules" element={<VehiculesOccasion />} />
        <Route path="/vehicules/occasion" element={<VehiculesOccasion />} />
        <Route path="/vehicule/:id" element={<VehicleDetails />} />
        <Route path="/vehicule/:id/:slug" element={<VehicleDetails />} />
        <Route path="/vehicules/import" element={<VehicleImport />} />
        <Route path="/vehicules/gestion" element={<VehicleManagement />} />
        <Route path="/rachat" element={<Rachat />} />
        <Route path="/financement" element={<Financement />} />
        <Route path="/orders" element={<OrdersBackup />} />
        
        {/* Legal pages */}
        <Route path="/cgv" element={<CGV />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
