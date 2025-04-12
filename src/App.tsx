import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index from './pages/Index';
import VehiculesOccasion from './pages/VehiculesOccasion';
import Contact from './pages/Contact';
import Page404 from './pages/Page404';
import VehicleDetail from './pages/VehicleDetail';
import VehicleImport from './pages/VehicleImport';
import VehicleManagement from './pages/VehicleManagement';
import FeaturedVehicles from './pages/FeaturedVehicles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/vehicules",
    element: <VehiculesOccasion />
  },
  {
    path: "/vehicules/vedette",
    element: <FeaturedVehicles />
  },
  {
    path: "/vehicule/:id",
    element: <VehicleDetail />
  },
  {
    path: "/vehicule/import",
    element: <VehicleImport />
  },
  {
    path: "/gestion-vehicules",
    element: <VehicleManagement />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "*",
    element: <Page404 />
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
