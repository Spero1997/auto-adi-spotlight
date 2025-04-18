import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Financement from "./pages/Financement";
import Rachat from "./pages/Rachat";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Cookies from "./pages/Cookies";
import CGV from "./pages/CGV";
import Conditions from "./pages/Conditions";
import OrdersBackup from "./pages/OrdersBackup";
import VehiculesOccasion from "./pages/VehiculesOccasion";
import VehicleManagement from "./pages/VehicleManagement";
import VehicleImport from "./pages/VehicleImport";
import VehicleDetails from "./pages/VehicleDetails";
import { useEffect } from "react";
import { getCatalogIdFromUrl } from "./utils/vehicleImportService";
import AnimatedHero from "./components/AnimatedHero";
import Garantie from "./pages/Garantie";
import Livraison from "./pages/Livraison";
import ServicePremium from "./pages/ServicePremium";
import ScrollToTop from "./components/ScrollToTop";
import FAQ from "./pages/FAQ";
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';

const CatalogChecker = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const catalogId = getCatalogIdFromUrl();
    if (catalogId) {
      console.log(`Catalogue trouvé dans l'URL: ${catalogId}`);
    }
  }, []);

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <CatalogChecker>
                <Routes>
                  <Route path="/" element={<>
                    <AnimatedHero />
                    <Index />
                  </>} />
                  
                  <Route path="/services" element={<Services />} />
                  <Route path="/financement" element={<Financement />} />
                  <Route path="/rachat" element={<Rachat />} />
                  <Route path="/a-propos" element={<APropos />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  
                  <Route path="/garantie" element={<Garantie />} />
                  <Route path="/livraison" element={<Livraison />} />
                  <Route path="/service-premium" element={<ServicePremium />} />
                  
                  <Route path="/orders-backup" element={<OrdersBackup />} />
                  
                  <Route path="/mentions-legales" element={<MentionsLegales />} />
                  <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/cgv" element={<CGV />} />
                  <Route path="/conditions" element={<Conditions />} />
                  
                  <Route path="/admin/vehicules" element={<VehicleManagement />} />
                  <Route path="/vehicules/import" element={<VehicleImport />} />
                  
                  <Route path="/vehicules" element={<Index />} />
                  <Route path="/vehicule/:id" element={<VehicleDetails />} />
                  <Route path="/vehicule/:id" element={<VehicleDetails />} />
                  <Route path="/vehicules/occasion" element={<VehiculesOccasion />} />
                  <Route path="/vehicules/utilitaires" element={<Index />} />
                  <Route path="/vehicules/neufs" element={<Index />} />
                  <Route path="/rendez-vous" element={<Index />} />
                  <Route path="/marques" element={<Index />} />
                  <Route path="/marques/:marque" element={<Index />} />
                  
                  <Route path="/panier" element={<Cart />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CatalogChecker>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
