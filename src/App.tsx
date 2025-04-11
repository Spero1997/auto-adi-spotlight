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

// Admin Dashboard
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminStats from './pages/admin/AdminStats';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPayments from './pages/admin/AdminPayments';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminFeatured from './pages/admin/AdminFeatured';

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
        <Route path="/vehicule/:id" element={<VehicleDetails />} />
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
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="vehicles" element={<AdminVehicles />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="featured" element={<AdminFeatured />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
