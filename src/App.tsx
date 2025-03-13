
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Routes pour les pages secondaires */}
          <Route path="/vehicules" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/vehicules/:id" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/vehicules/occasion" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/vehicules/utilitaires" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/services" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/financement" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/rachat" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/contact" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/rendez-vous" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/marques" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/marques/:marque" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/a-propos" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/mentions-legales" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/politique-confidentialite" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/cookies" element={<Index />} /> {/* À implémenter plus tard */}
          <Route path="/cgv" element={<Index />} /> {/* À implémenter plus tard */}
          {/* Route pour capture d'erreur */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
