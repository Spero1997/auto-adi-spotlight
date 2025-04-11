
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line } from 'recharts';
import { fetchDailyStats, fetchVehiclesFromSupabase, fetchPayments } from '@/utils/services/supabaseService';
import { Loader2, TrendingUp, ShoppingCart, Users, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');

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
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [timeframe]);

  // Calculate summary statistics
  const totalVehicles = vehicles.length;
  const featuredVehicles = vehicles.filter(v => v.is_featured).length;
  const soldVehicles = vehicles.filter(v => v.is_sold).length;
  
  const totalSales = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  
  const recentSales = payments
    .filter(p => p.status === 'completed')
    .slice(0, 5);

  // Prepare chart data
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

  // Popular vehicles
  const uniquePopularIds = new Set();
  stats.forEach(day => {
    if (day.popular_vehicle_ids) {
      day.popular_vehicle_ids.forEach((id: string) => uniquePopularIds.add(id));
    }
  });
  
  const popularVehicleIds = Array.from(uniquePopularIds) as string[];
  const popularVehicles = vehicles.filter(v => popularVehicleIds.includes(v.id)).slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Admin Auto ADI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          
          <div className="flex items-center space-x-2">
            <Tabs defaultValue={timeframe} onValueChange={(value) => setTimeframe(value)}>
              <TabsList>
                <TabsTrigger value="7d">7 jours</TabsTrigger>
                <TabsTrigger value="30d">30 jours</TabsTrigger>
                <TabsTrigger value="90d">90 jours</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalVehicles}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {featuredVehicles} en vedette, {soldVehicles} vendus
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventes</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSales.toLocaleString('fr-FR')} €</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {payments.filter(p => p.status === 'completed').length} ventes complétées
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.reduce((sum, day) => sum + (day.unique_visitors || 0), 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.length > 0 ? `+${stats[0].unique_visitors || 0} aujourd'hui` : 'Aucune donnée'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vues</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.reduce((sum, day) => sum + (day.page_views || 0), 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.length > 0 ? `+${stats[0].page_views || 0} aujourd'hui` : 'Aucune donnée'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="amount" fill="#3b82f6" name="Montant (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trafic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitorData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="visitors" stroke="#3b82f6" name="Visiteurs uniques" />
                        <Line type="monotone" dataKey="views" stroke="#10b981" name="Vues de page" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Ventes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {recentSales.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune vente récente</p>
                ) : (
                  <div className="space-y-8">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{sale.client_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {sale.client_email}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {parseFloat(sale.amount).toLocaleString('fr-FR')} €
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle>Véhicules populaires</CardTitle>
              </CardHeader>
              <CardContent>
                {popularVehicles.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune donnée sur les véhicules populaires</p>
                ) : (
                  <div className="space-y-8">
                    {popularVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center">
                        <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200">
                          {vehicle.image_url ? (
                            <img 
                              src={vehicle.image_url} 
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                              <Car className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.year} - {parseFloat(vehicle.price).toLocaleString('fr-FR')} €
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
