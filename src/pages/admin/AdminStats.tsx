
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const barData = [
  { name: 'Jan', total: 12 },
  { name: 'Fév', total: 19 },
  { name: 'Mar', total: 15 },
  { name: 'Avr', total: 25 },
  { name: 'Mai', total: 32 },
  { name: 'Juin', total: 28 },
  { name: 'Juil', total: 42 },
  { name: 'Août', total: 36 },
  { name: 'Sep', total: 29 },
  { name: 'Oct', total: 33 },
  { name: 'Nov', total: 37 },
  { name: 'Déc', total: 40 },
];

const lineData = [
  { name: 'Lun', visitors: 240, leads: 15 },
  { name: 'Mar', visitors: 300, leads: 20 },
  { name: 'Mer', visitors: 280, leads: 18 },
  { name: 'Jeu', visitors: 320, leads: 22 },
  { name: 'Ven', visitors: 380, leads: 30 },
  { name: 'Sam', visitors: 420, leads: 32 },
  { name: 'Dim', visitors: 250, leads: 16 },
];

const pieData = [
  { name: 'Diesel', value: 42 },
  { name: 'Essence', value: 35 },
  { name: 'Hybride', value: 15 },
  { name: 'Électrique', value: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminStats = () => {
  return (
    <>
      <Helmet>
        <title>Statistiques | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Statistiques</h1>
        
        <Tabs defaultValue="sales" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="traffic">Trafic</TabsTrigger>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ventes totales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€42,500</div>
                  <p className="text-xs text-green-500">+20.1% par rapport au mois précédent</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Véhicules vendus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-green-500">+12.5% par rapport au mois précédent</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Panier moyen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€15,180</div>
                  <p className="text-xs text-green-500">+5.2% par rapport au mois précédent</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de conversion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2%</div>
                  <p className="text-xs text-red-500">-1.5% par rapport au mois précédent</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes mensuelles</CardTitle>
                  <CardDescription>
                    Vue d'ensemble des ventes sur les 12 derniers mois
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barData}
                        margin={{
                          top: 5,
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
                        <Bar dataKey="total" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Trafic du site web</CardTitle>
                <CardDescription>
                  Visiteurs et leads générés durant la semaine dernière
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lineData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par carburant</CardTitle>
                  <CardDescription>
                    Distribution des véhicules par type de carburant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
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
                  <CardTitle>Âge du stock</CardTitle>
                  <CardDescription>
                    Temps moyen des véhicules en stock avant la vente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: '< 30 jours', value: 15 },
                          { name: '30-60 jours', value: 8 },
                          { name: '60-90 jours', value: 5 },
                          { name: '> 90 jours', value: 2 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminStats;
