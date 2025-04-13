
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// S'assurer que l'élément racine existe avant de tenter le rendu
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Élément racine non trouvé");

// Créer la racine en utilisant l'API React 19
const root = createRoot(rootElement);

// Rendre l'application sans StrictMode pour éviter les problèmes de compatibilité
root.render(<App />);
