
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "next-themes"
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { getCatalogIdFromUrl } from '@/utils/vehicleImportService'

// Vérifier si un catalogue est spécifié dans l'URL
const catalogId = new URLSearchParams(window.location.search).get('catalog');
const catalogType = new URLSearchParams(window.location.search).get('type') || 'standard';

// Si un catalogue est spécifié dans l'URL, nous l'utilisons
if (catalogId) {
  console.log(`Catalogue trouvé dans l'URL: ${catalogId}`);
  // Cela mettra à jour le localStorage avec le catalogId de l'URL
  getCatalogIdFromUrl(catalogType as 'standard' | 'featured');
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    <Toaster />
  </ThemeProvider>
);
