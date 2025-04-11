
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { fetchDailyStats, fetchVehiclesFromSupabase, fetchPayments } from '@/utils/services/supabaseService';
import { 
  Car as CarIcon, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  ShoppingCart, 
  Calendar, 
  Loader2 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    vehiclesInStock: 0,
    soldVehicles: 0,
    featuredVehicles: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0,
    pageViews: 0,
    uniqueVisitors: 0
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch vehicles
        const vehicles = await fetchVehiclesFromSupabase();
        
        // Fetch stats
        const statsData = await fetchDailyStats(30);
        
        // Fetch payments
        const payments = await fetchPayments();
        
        // Process data for summary stats
        const vehiclesInStock = vehicles.filter(v => v.in_stock).length;
        const soldVehicles = vehicles.filter(v => v.is_sold).length;
        const featuredVehicles = vehicles.filter(v => v.is_featured).length;
        
        const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0);
        const pendingPayments = payments.filter(p => p.status === 'pending').length;
        const completedPayments = payments.filter(p => p.status === 'completed').length;
        
        // Prepare chart data
        const dailyStats = statsData.map(day => ({
          date: new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
          views: day.page_views,
          visitors: day.unique_visitors,
          sales: day.sales_amount
        })).reverse();
        
        // Prepare vehicle data for pie chart
        const vehiclesByBrand = vehicles.reduce((acc: Record<string, number>, vehicle) => {
          acc[vehicle.brand] = (acc[vehicle.brand] || 0) + 1;
          return acc;
        }, {});
        
        const vehiclePieData = Object.entries(vehiclesByBrand).map(([brand, count]) => ({
          name: brand,
          value: count
        }));
        
        // Sort recent payments by date
        const sortedPayments = [...payments]
          .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
          .slice(0, 5);
        
        // Update state
        setStats({
          totalVehicles: vehicles.length,
          vehiclesInStock,
          soldVehicles,
          featuredVehicles,
          totalRevenue,
          pendingPayments,
          completedPayments,
          pageViews: statsData.reduce((sum, day) => sum + day.page_views, 0),
          uniqueVisitors: statsData.reduce((sum, day) => sum + day.unique_visitors, 0)
        });
        
        setChartData(dailyStats);
        setVehicleData(vehiclePieData);
        setRecentPayments(sortedPayments);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const statCards = [
    {
      title: 'Total Véhicules',
      value: stats.totalVehicles,
      icon: <CarIcon className="h-6 w-6 text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'En Stock',
      value: stats.vehiclesInStock,
      icon: <ShoppingCart className="h-6 w-6 text-green-500" />,
      color: 'green'
    },
    {
      title: 'Véhicules Vendus',
      value: stats.soldVehicles,
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      color: 'purple'
    },
    {
      title: 'Véhicules en Vedette',
      value: stats.featuredVehicles,
      icon: <Activity className="h-6 w-6 text-yellow-500" />,
      color: 'yellow'
    },
    {
      title: 'Chiffre d\'affaires',
      value: `${stats.totalRevenue.toLocaleString('fr-FR')} €`,
      icon: <CreditCard className="h-6 w-6 text-red-500" />,
      color: 'red'
    },
    {
      title: 'Paiements en Attente',
      value: stats.pendingPayments,
      icon: <Calendar className="h-6 w-6 text-orange-500" />,
      color: 'orange'
    },
    {
      title: 'Paiements Complétés',
      value: stats.completedPayments,
      icon: <CreditCard className="h-6 w-6 text-emerald-500" />,
      color: 'emerald'
    },
    {
      title: 'Visiteurs Uniques',
      value: stats.uniqueVisitors,
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      color: 'indigo'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B66FF'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Admin Auto ADI</title>
      </Helmet>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  {stat.icon}
                </div>
                <p className={`text-2xl font-bold mt-2 text-${stat.color}-600`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" name="Vues" fill="#3b82f6" />
                    <Bar dataKey="visitors" name="Visiteurs" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Vehicle Distribution */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Distribution des Véhicules par Marque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {vehicleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex flex-col">
                      <p className="font-medium">{payment.client_name}</p>
                      <p className="text-sm text-gray-500">{payment.client_email}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(payment.payment_date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-bold">{parseFloat(payment.amount).toLocaleString('fr-FR')} €</p>
                      <Badge variant={payment.status === 'completed' ? 'success' : 'warning'}>
                        {payment.status === 'completed' ? 'Payé' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">Aucune transaction récente</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
