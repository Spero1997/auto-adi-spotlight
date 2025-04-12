
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, Filter } from 'lucide-react';

const payments = [
  {
    id: 'PAY-001',
    customer: 'Jean Dupont',
    vehicle: 'Renault Clio 2018',
    amount: 12500,
    status: 'completed',
    date: '2023-04-15',
  },
  {
    id: 'PAY-002',
    customer: 'Marie Martin',
    vehicle: 'Peugeot 208 2019',
    amount: 14900,
    status: 'completed',
    date: '2023-04-12',
  },
  {
    id: 'PAY-003',
    customer: 'Paul Bernard',
    vehicle: 'Citroën C3 2020',
    amount: 16300,
    status: 'pending',
    date: '2023-04-10',
  },
  {
    id: 'PAY-004',
    customer: 'Sophie Petit',
    vehicle: 'Dacia Sandero 2017',
    amount: 9500,
    status: 'completed',
    date: '2023-04-08',
  },
  {
    id: 'PAY-005',
    customer: 'Thomas Leroy',
    vehicle: 'Volkswagen Golf 2019',
    amount: 18900,
    status: 'cancelled',
    date: '2023-04-05',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Complété</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
};

const AdminPayments = () => {
  return (
    <>
      <Helmet>
        <title>Paiements | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des paiements</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="completed">Complétés</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="cancelled">Annulés</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-xl">Historique des paiements</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>{payment.vehicle}</TableCell>
                    <TableCell>{payment.amount.toLocaleString('fr-FR')} €</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paiements totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">72 100 €</p>
              <p className="text-sm text-gray-500">5 transactions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">16 300 €</p>
              <p className="text-sm text-gray-500">1 transaction</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Montant moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">14 420 €</p>
              <p className="text-sm text-gray-500">par transaction</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminPayments;
