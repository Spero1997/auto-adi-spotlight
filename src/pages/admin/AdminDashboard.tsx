
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Car, DollarSign, Users, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const data = [
  { name: 'Jan', value: 12 },
  { name: 'Fév', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Avr', value: 25 },
  { name: 'Mai', value: 32 },
  { name: 'Juin', value: 28 },
  { name: 'Juil', value: 42 },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Tableau de bord</h1>
            <p className="text-gray-500">Bienvenue, {user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Car />} title="Véhicules" value="28" description="Total des véhicules" />
          <StatCard icon={<ShoppingCart />} title="Commandes" value="12" description="En attente" />
          <StatCard icon={<Users />} title="Utilisateurs" value="159" description="Total des utilisateurs" />
          <StatCard icon={<DollarSign />} title="Revenus" value="€42,500" description="Ce mois-ci" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventes mensuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
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
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem 
                  title="Nouveau véhicule ajouté" 
                  description="Renault Clio 2018 - Diesel"
                  time="Il y a 32 minutes"
                />
                <ActivityItem 
                  title="Réservation enregistrée" 
                  description="Jean Dupont - Peugeot 208"
                  time="Il y a 2 heures"
                />
                <ActivityItem 
                  title="Témoignage approuvé" 
                  description="Marie L. - ⭐⭐⭐⭐⭐"
                  time="Il y a 3 heures"
                />
                <ActivityItem 
                  title="Paiement reçu" 
                  description="Acompte - Citroën C3"
                  time="Il y a 5 heures"
                />
                <ActivityItem 
                  title="Mise à jour des prix" 
                  description="5 véhicules mis à jour"
                  time="Il y a 1 jour"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ icon, title, value, description }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  description: string 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-blue-600" })}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ title, description, time }: { 
  title: string; 
  description: string; 
  time: string 
}) => {
  return (
    <div className="flex items-start">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
