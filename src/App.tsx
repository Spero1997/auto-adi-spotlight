import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import '@/App.css';

// Importation de vos pages
import Index from '@/pages/Index';
// ... importer toutes les autres pages nécessaires

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ... autres routes */}
      </Routes>
      
      {/* Toast pour les notifications */}
      <Toaster position="top-right" richColors closeButton />
      <ShadcnToaster />
    </Router>
  );
}

export default App;
