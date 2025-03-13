
import React, { useState, useEffect } from 'react';
import { getStoredOrders } from '@/utils/emailService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Car, User, Phone, Mail, MapPin, CreditCard, AlertCircle, FileText, Trash2, RefreshCw } from 'lucide-react';

interface Order {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: string[];
  replyTo?: string;
  timestamp: string;
  id: string;
}

export const OrdersBackup = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const loadOrders = () => {
    const storedOrders = getStoredOrders();
    setOrders(storedOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    try {
      // Get current orders
      const currentOrders = getStoredOrders();
      // Filter out the order to delete
      const updatedOrders = currentOrders.filter((order: Order) => order.id !== orderId);
      // Save back to localStorage
      localStorage.setItem('autoAdiOrders', JSON.stringify(updatedOrders));
      // Update state
      setOrders(updatedOrders);
      
      if (selectedOrder?.id === orderId) {
        setDetailsOpen(false);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderType = (subject: string) => {
    if (subject.startsWith('Nouvelle commande:')) return 'order';
    if (subject.startsWith('Preuve de paiement:')) return 'payment';
    if (subject.startsWith('Nouveau contact:')) return 'contact';
    return 'other';
  };

  const clearAllOrders = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes sauvegardées ?')) {
      localStorage.removeItem('autoAdiOrders');
      setOrders([]);
      setDetailsOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sauvegarde des commandes</h1>
          <p className="text-gray-500 mt-1">
            Les commandes sont sauvegardées localement en cas d'échec d'envoi d'email
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={loadOrders} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="destructive" onClick={clearAllOrders} className="flex items-center" disabled={orders.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Tout effacer
          </Button>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Aucune commande sauvegardée</p>
            <p className="text-gray-400 text-sm text-center mt-1">
              Les commandes seront sauvegardées ici si l'envoi d'email échoue
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => {
            const orderType = getOrderType(order.subject);
            
            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.subject}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        {formatDate(order.timestamp)}
                      </CardDescription>
                    </div>
                    <Badge className={`
                      ${orderType === 'order' ? 'bg-green-100 text-green-800' : ''}
                      ${orderType === 'payment' ? 'bg-blue-100 text-blue-800' : ''}
                      ${orderType === 'contact' ? 'bg-purple-100 text-purple-800' : ''}
                      ${orderType === 'other' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {orderType === 'order' && 'Commande'}
                      {orderType === 'payment' && 'Paiement'}
                      {orderType === 'contact' && 'Contact'}
                      {orderType === 'other' && 'Autre'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{order.text}</p>
                  
                  {order.attachments && order.attachments.length > 0 && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      {order.attachments.length} pièce(s) jointe(s)
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                    Voir les détails
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedOrder.subject}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(selectedOrder.timestamp)}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="details" className="overflow-hidden">
                <TabsList>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="text">Texte</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="overflow-hidden">
                  <ScrollArea className="h-[50vh]">
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-500">Contact</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">{selectedOrder.replyTo || 'Non spécifié'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-500">Informations</h3>
                        <p className="text-sm whitespace-pre-line">{selectedOrder.text}</p>
                      </div>
                      
                      {selectedOrder.attachments && selectedOrder.attachments.length > 0 && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <h3 className="font-semibold text-sm text-gray-500">Pièces jointes</h3>
                            <div className="space-y-1">
                              {selectedOrder.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center p-2 bg-gray-50 rounded-md">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-sm">{attachment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="html">
                  <ScrollArea className="h-[50vh]">
                    <div className="p-4">
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div dangerouslySetInnerHTML={{ __html: selectedOrder.html || 'Pas de contenu HTML' }} />
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="text">
                  <ScrollArea className="h-[50vh]">
                    <div className="p-4">
                      <div className="p-4 bg-gray-50 rounded-md">
                        <pre className="text-sm whitespace-pre-wrap">{selectedOrder.text}</pre>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fermer
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteOrder(selectedOrder.id)}>
                  Supprimer
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersBackup;
