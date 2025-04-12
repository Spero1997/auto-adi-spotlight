
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { fetchPayments, updatePaymentStatus } from '@/utils/services/supabaseService';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  CreditCard, 
  MoreHorizontal, 
  Check, 
  X, 
  Clock, 
  ArrowDown, 
  ArrowUp,
  EyeIcon,
  FileText,
  Euro,
  Filter
} from 'lucide-react';

interface Payment {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  payment_date: string;
  vehicle_id?: string;
  vehicles?: any;
}

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPayments = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPayments();
        setPayments(data);
      } catch (error) {
        console.error('Error loading payments:', error);
        toast.error('Erreur lors du chargement des paiements');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPayments();
  }, []);

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    try {
      await updatePaymentStatus(paymentId, newStatus);
      
      // Update local state
      setPayments(payments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: newStatus as any } 
          : payment
      ));
      
      toast.success(`Statut mis à jour : ${newStatus}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Complété</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">En attente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Remboursé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesSearch = 
        payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.vehicles?.brand + ' ' + payment.vehicles?.model).toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toString().includes(searchTerm);
      
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.payment_date).getTime();
      const dateB = new Date(b.payment_date).getTime();
      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <>
      <Helmet>
        <title>Gestion des paiements | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des paiements</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="completed">Complétés</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoués</SelectItem>
                <SelectItem value="refunded">Remboursés</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSortOrder}
            >
              {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="text-center p-12 border rounded-lg bg-gray-50">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">Aucun paiement trouvé</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Aucun résultat pour ces critères de recherche."
                    : "Aucun paiement n'a encore été effectué."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {new Date(payment.payment_date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.customer_name}</div>
                            <div className="text-sm text-gray-500">{payment.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {payment.vehicles ? (
                            <div>
                              <div className="font-medium">{payment.vehicles.brand} {payment.vehicles.model}</div>
                              <div className="text-sm text-gray-500">{payment.vehicles.year}</div>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {payment.amount.toLocaleString('fr-FR')} €
                        </TableCell>
                        <TableCell>{payment.payment_method}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                <EyeIcon className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                              
                              {payment.status !== 'completed' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'completed')}>
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                  Marquer comme complété
                                </DropdownMenuItem>
                              )}
                              
                              {payment.status !== 'pending' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'pending')}>
                                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                  Marquer comme en attente
                                </DropdownMenuItem>
                              )}
                              
                              {payment.status !== 'failed' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'failed')}>
                                  <X className="mr-2 h-4 w-4 text-red-500" />
                                  Marquer comme échoué
                                </DropdownMenuItem>
                              )}
                              
                              {payment.status !== 'refunded' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(payment.id, 'refunded')}>
                                  <Euro className="mr-2 h-4 w-4 text-blue-500" />
                                  Marquer comme remboursé
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* View Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Détails du paiement</DialogTitle>
              <DialogDescription>
                Information complète sur la transaction
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  Information de transaction
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">ID</div>
                  <div className="text-sm font-medium">{selectedPayment.id.substring(0, 8)}...</div>
                  
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="text-sm font-medium">
                    {new Date(selectedPayment.payment_date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="text-sm text-gray-500">Montant</div>
                  <div className="text-sm font-medium">{selectedPayment.amount.toLocaleString('fr-FR')} €</div>
                  
                  <div className="text-sm text-gray-500">Méthode</div>
                  <div className="text-sm font-medium">{selectedPayment.payment_method}</div>
                  
                  <div className="text-sm text-gray-500">Statut</div>
                  <div className="text-sm font-medium">{getStatusBadge(selectedPayment.status)}</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <div className="text-sm text-gray-500">Client</div>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-500">Nom</div>
                  <div className="text-sm font-medium">{selectedPayment.customer_name}</div>
                  
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-sm font-medium">{selectedPayment.customer_email}</div>
                </div>
              </div>
              
              {selectedPayment.vehicles && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <div className="text-sm text-gray-500">Véhicule</div>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-500">Modèle</div>
                    <div className="text-sm font-medium">
                      {selectedPayment.vehicles.brand} {selectedPayment.vehicles.model}
                    </div>
                    
                    <div className="text-sm text-gray-500">Année</div>
                    <div className="text-sm font-medium">{selectedPayment.vehicles.year}</div>
                    
                    <div className="text-sm text-gray-500">Prix</div>
                    <div className="text-sm font-medium">
                      {selectedPayment.vehicles.price?.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AdminPayments;
