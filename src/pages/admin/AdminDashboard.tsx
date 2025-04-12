
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Car, Tag, Users, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [vehicleStats, setVehicleStats] = useState({
    totalVehicles: 0,
    avgPrice: 0,
    totalValue: 0,
    byBrand: [] as {name: string, count: number}[]
  });

  useEffect(() => {
    loadVehicles();
    
    window.addEventListener('vehiclesUpdated', loadVehicles);
    return () => {
      window.removeEventListener('vehiclesUpdated', loadVehicles);
    };
  }, []);

  const loadVehicles = () => {
    try {
      const importedVehicles = getImportedVehicles();
      setVehicles(importedVehicles);
      calculateStats(importedVehicles);
    } catch (error) {
      console.error("Error loading vehicles:", error);
    }
  };

  const calculateStats = (vehicles: ImportedVehicle[]) => {
    // Calculate total value and average price
    const totalValue = vehicles.reduce((acc, vehicle) => acc + (vehicle.price || 0), 0);
    const avgPrice = vehicles.length > 0 ? totalValue / vehicles.length : 0;
    
    // Calculate vehicles by brand
    const brandCounts: Record<string, number> = {};
    vehicles.forEach(vehicle => {
      if (vehicle.brand) {
        brandCounts[vehicle.brand] = (brandCounts[vehicle.brand] || 0) + 1;
      }
    });
    
    const byBrand = Object.entries(brandCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    setVehicleStats({
      totalVehicles: vehicles.length,
      avgPrice,
      totalValue,
      byBrand
    });
  };

  // Mock data for demonstration
  const visitData = [
    { name: 'Lun', visits: 540 },
    { name: 'Mar', visits: 620 },
    { name: 'Mer', visits: 700 },
    { name: 'Jeu', visits: 680 },
    { name: 'Ven', visits: 750 },
    { name: 'Sam', visits: 890 },
    { name: 'Dim', visits: 820 },
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Administration</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Véhicules</p>
                  <h3 className="text-2xl font-bold mt-1">{vehicleStats.totalVehicles}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Prix Moyen</p>
                  <h3 className="text-2xl font-bold mt-1">{vehicleStats.avgPrice.toLocaleString('fr-FR')} €</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Tag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Valeur Totale</p>
                  <h3 className="text-2xl font-bold mt-1">{vehicleStats.totalValue.toLocaleString('fr-FR')} €</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Visiteurs</p>
                  <h3 className="text-2xl font-bold mt-1">4,210</h3>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Véhicules par marque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={vehicleStats.byBrand}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visites du site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={visitData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visits" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
