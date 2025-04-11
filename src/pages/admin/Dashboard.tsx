
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { fetchDailyStats } from '@/utils/services/supabaseService';
import { ArrowUpCircle, Users, Car, CreditCard, TrendingUp, ShoppingCart } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        // Fetch data for different periods
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
        const data = await fetchDailyStats(days);
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, [period]);

  // Mock data for demonstration
  const mockData = [
    { name: 'Lun', value: 12 },
    { name: 'Mar', value: 19 },
    { name: 'Mer', value: 7 },
    { name: 'Jeu', value: 23 },
    { name: 'Ven', value: 15 },
    { name: 'Sam', value: 8 },
    { name: 'Dim', value: 5 },
  ];

  const modelData = [
    { name: 'Renault Clio', value: 35 },
    { name: 'Peugeot 208', value: 28 },
    { name: 'Citroen C3', value: 18 },
    { name: 'Volkswagen Golf', value: 15 },
    { name: 'Toyota Yaris', value: 12 },
  ];

  // Sales summary
  const salesSummary = {
    today: {
      value: 3,
      percentage: '+15%'
    },
    week: {
      value: 27,
      percentage: '+8%'
    },
    month: {
      value: 127,
      percentage: '+12%'
    }
  };

  return (
    <>
      <Helmet>
        <title>Tableau de Bord | Administration</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Sales Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesSummary.today.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500">{salesSummary.today.percentage}</span> depuis hier
              </p>
            </CardContent>
          </Card>
          
          {/* Visitors Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500">+11%</span> depuis hier
              </p>
            </CardContent>
          </Card>
          
          {/* Inventory Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Stock</CardTitle>
              <Car className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <span>+5 nouveaux véhicules</span>
              </p>
            </CardContent>
          </Card>
          
          {/* Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenu</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">297.500 €</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpCircle className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500">+23%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Ventes</CardTitle>
              <Tabs defaultValue={period} onValueChange={setPeriod}>
                <TabsList>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="month">Mois</TabsTrigger>
                  <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Popular Models Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Modèles Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={true}
                      data={modelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {modelData.map((entry, index) => (
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
        
        <div className="grid grid-cols-1 gap-6">
          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Tendance Mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Jan', ventes: 65, visites: 420 },
                      { name: 'Fév', ventes: 59, visites: 380 },
                      { name: 'Mar', ventes: 80, visites: 500 },
                      { name: 'Avr', ventes: 81, visites: 540 },
                      { name: 'Mai', ventes: 56, visites: 320 },
                      { name: 'Juin', ventes: 55, visites: 350 },
                      { name: 'Juil', ventes: 40, visites: 250 },
                      { name: 'Août', ventes: 45, visites: 280 },
                      { name: 'Sep', ventes: 67, visites: 390 },
                      { name: 'Oct', ventes: 70, visites: 410 },
                      { name: 'Nov', ventes: 68, visites: 400 },
                      { name: 'Déc', ventes: 75, visites: 470 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventes" fill="#8884d8" />
                    <Bar dataKey="visites" fill="#82ca9d" />
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

export default Dashboard;
