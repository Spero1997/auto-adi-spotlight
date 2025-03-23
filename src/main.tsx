
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure root element exists before attempting to render
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Create root using the new React 19 API
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
