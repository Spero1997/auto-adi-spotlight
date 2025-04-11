
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Bar, 
  Line, 
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchDailyStats, fetchVehiclesFromSupabase, fetchPayments } from '@/utils/services/supabaseService';
import { Loader2 } from 'lucide-react';

const AdminStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');
  const [stats, setStats] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get days based on timeframe
        const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
        
        // Fetch data
        const statsData = await fetchDailyStats(days);
        const vehiclesData = await fetchVehiclesFromSupabase();
        const paymentsData = await fetchPayments();
        
        setStats(statsData || []);
        setVehicles(vehiclesData || []);
        setPayments(paymentsData || []);
      } catch (error) {
        console.error('Error loading stats data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [timeframe]);

  // Prepare data for charts
  const salesData = stats.map(day => ({
    date: new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    amount: day.sales_amount || 0,
    count: day.sales_count || 0
  })).reverse();
  
  const visitorData = stats.map(day => ({
    date: new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    visitors: day.unique_visitors || 0,
    views: day.page_views || 0
  })).reverse();

  // Fuel type distribution
  const fuelTypesCount = vehicles.reduce((acc: Record<string, number>, vehicle) => {
    const fuelType = vehicle.fuel_type || 'Non spécifié';
    acc[fuelType] = (acc[fuelType] || 0) + 1;
    return acc;
  }, {});
  
  const fuelTypeData = Object.entries(fuelTypesCount).map(([name, value]) => ({
    name,
    value
  }));

  // Price ranges
  const priceRanges = [
    { name: '< 5 000 €', min: 0, max: 5000 },
    { name: '5 000 - 10 000 €', min: 5000, max: 10000 },
    { name: '10 000 - 20 000 €', min: 10000, max: 20000 },
    { name: '20 000 - 30 000 €', min: 20000, max: 30000 },
    { name: '> 30 000 €', min: 30000, max: Infinity }
  ];
  
  const priceRangeData = priceRanges.map(range => ({
    name: range.name,
    value: vehicles.filter(v => v.price >= range.min && v.price < range.max).length
  }));

  // Age distribution
  const currentYear = new Date().getFullYear();
  const ageRanges = [
    { name: '< 2 ans', min: currentYear - 2, max: currentYear + 1 },
    { name: '2-5 ans', min: currentYear - 5, max: currentYear - 2 },
    { name: '5-10 ans', min: currentYear - 10, max: currentYear - 5 },
    { name: '> 10 ans', min: 0, max: currentYear - 10 }
  ];
  
  const ageRangeData = ageRanges.map(range => ({
    name: range.name,
    value: vehicles.filter(v => v.year >= range.min && v.year < range.max).length
  }));

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

  return (
    <>
      <Helmet>
        <title>Statistiques | Admin Auto ADI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Statistiques & Analyses</h1>
          
          <div className="flex items-center space-x-2">
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">90 derniers jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : (
          <Tabs defaultValue="traffic">
            <TabsList>
              <TabsTrigger value="traffic">Trafic</TabsTrigger>
              <TabsTrigger value="sales">Ventes</TabsTrigger>
              <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="traffic" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vue d'ensemble du trafic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitorData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="visitors" 
                          stroke="#0088FE" 
                          name="Visiteurs uniques" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#00C49F" 
                          name="Vues de page" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Taux de conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.reverse()}>
                          <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} />
                          <YAxis />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Bar 
                            dataKey="leads_count" 
                            fill="#0088FE" 
                            name="Demandes de contact" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques récapitulatives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Visiteurs uniques</div>
                          <div className="text-2xl font-bold mt-1">
                            {stats.reduce((sum, day) => sum + (day.unique_visitors || 0), 0)}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Vues de page</div>
                          <div className="text-2xl font-bold mt-1">
                            {stats.reduce((sum, day) => sum + (day.page_views || 0), 0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Leads générés</div>
                          <div className="text-2xl font-bold mt-1">
                            {stats.reduce((sum, day) => sum + (day.leads_count || 0), 0)}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Taux de conversion</div>
                          <div className="text-2xl font-bold mt-1">
                            {stats.reduce((sum, day) => sum + (day.unique_visitors || 0), 0) > 0
                              ? ((stats.reduce((sum, day) => sum + (day.leads_count || 0), 0) / 
                                 stats.reduce((sum, day) => sum + (day.unique_visitors || 0), 0)) * 100).toFixed(2)
                              : '0.00'}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="sales" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vue d'ensemble des ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Bar 
                          dataKey="amount" 
                          fill="#0088FE" 
                          name="Montant des ventes (€)" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nombre de ventes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Bar 
                            dataKey="count" 
                            fill="#00C49F" 
                            name="Nombre de ventes" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques de ventes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Total des ventes</div>
                          <div className="text-2xl font-bold mt-1">
                            {payments
                              .filter(p => p.status === 'completed')
                              .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
                              .toLocaleString('fr-FR')} €
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Nombre de ventes</div>
                          <div className="text-2xl font-bold mt-1">
                            {payments.filter(p => p.status === 'completed').length}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Panier moyen</div>
                          <div className="text-2xl font-bold mt-1">
                            {payments.filter(p => p.status === 'completed').length > 0
                              ? (payments
                                  .filter(p => p.status === 'completed')
                                  .reduce((sum, payment) => sum + parseFloat(payment.amount), 0) / 
                                  payments.filter(p => p.status === 'completed').length)
                                  .toLocaleString('fr-FR', { maximumFractionDigits: 0 })
                              : '0'} €
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Paiements en attente</div>
                          <div className="text-2xl font-bold mt-1">
                            {payments
                              .filter(p => p.status === 'pending')
                              .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
                              .toLocaleString('fr-FR')} €
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="vehicles" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution par carburant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={fuelTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {fuelTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution par gamme de prix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={priceRangeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {priceRangeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution par âge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ageRangeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {ageRangeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques du catalogue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Nombre total</div>
                      <div className="text-2xl font-bold mt-1">
                        {vehicles.length}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">En vedette</div>
                      <div className="text-2xl font-bold mt-1">
                        {vehicles.filter(v => v.is_featured).length}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Vendus</div>
                      <div className="text-2xl font-bold mt-1">
                        {vehicles.filter(v => v.is_sold).length}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Prix moyen</div>
                      <div className="text-2xl font-bold mt-1">
                        {vehicles.length > 0
                          ? (vehicles.reduce((sum, v) => sum + parseFloat(v.price), 0) / vehicles.length)
                              .toLocaleString('fr-FR', { maximumFractionDigits: 0 })
                          : '0'} €
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default AdminStats;
