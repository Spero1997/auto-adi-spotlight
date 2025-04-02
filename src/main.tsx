
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Assurer un environnement compatible
const isClient = typeof window !== 'undefined';

// Make sure we have a valid DOM element before rendering
const rootElement = isClient ? document.getElementById("root") : null;
if (isClient && !rootElement) throw new Error("Failed to find the root element");

// Ne rendre l'application que côté client
if (isClient && rootElement) {
  createRoot(rootElement).render(<App />);
}
