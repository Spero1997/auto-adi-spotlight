
import React, { useState, useEffect } from 'react';
import { getStoredOrders } from '@/utils/emailService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileDown, Clock, Car, User, Mail, Phone, Truck, CreditCard, AlertCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const OrdersBackup = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = getStoredOrders();
    setOrders(storedOrders.reverse()); // Most recent first
    setLoading(false);
  }, []);

  const clearAllOrders = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes sauvegardées ? Cette action est irréversible.')) {
      localStorage.removeItem('autoAdiOrders');
      setOrders([]);
      toast({
        title: "Commandes supprimées",
        description: "Toutes les commandes ont été supprimées du stockage local.",
      });
    }
  };

  const exportOrdersAsJSON = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `auto-adi-orders-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return 'Date invalide';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch(method) {
      case 'card': return 'Carte bancaire';
      case 'transfer': return 'Virement bancaire';
      case 'coupon': return 'Coupon';
      case 'gift': return 'Carte cadeau';
      default: return method;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sauvegarde des commandes</h1>
          <p className="text-gray-600 mb-4">
            Ces commandes sont stockées localement dans votre navigateur comme backup en cas d'échec d'envoi d'email.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={exportOrdersAsJSON} disabled={orders.length === 0}>
            <FileDown className="mr-2 h-4 w-4" />
            Exporter JSON
          </Button>
          <Button variant="destructive" onClick={clearAllOrders} disabled={orders.length === 0}>
            Tout supprimer
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-full max-w-md mx-auto mb-4">
            <Progress value={70} className="h-2" />
          </div>
          <p className="text-gray-500">Chargement des commandes sauvegardées...</p>
        </div>
      ) : orders.length === 0 ? (
        <Card className="bg-gray-50 border-dashed">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Aucune commande sauvegardée</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Les commandes seront automatiquement sauvegardées ici si l'envoi d'email échoue.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Liste ({orders.length})</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order, index) => {
                // Extract car model from subject or html content
                const subjectMatch = order.subject?.match(/Nouvelle commande: (.+)/) || [];
                const htmlMatch = order.html?.match(/<p><strong>Modèle:<\/strong> (.+?)<\/p>/) || [];
                const carModel = subjectMatch[1] || htmlMatch[1] || 'Véhicule';
                
                // Extract price from html content
                const priceMatch = order.html?.match(/<p><strong>Prix:<\/strong> (\d+)€<\/p>/) || [];
                const price = priceMatch[1] || '';
                
                // Extract customer name from html content
                const nameMatch = order.html?.match(/<p><strong>Client:<\/strong> (.+?)<\/p>/) || [];
                const customerName = nameMatch[1] || 'Client';
                
                // Extract payment method from html content
                const methodMatch = order.html?.match(/<p><strong>Méthode de paiement:<\/strong> (.+?)<\/p>/) || [];
                const paymentMethod = methodMatch[1] || '';
                
                return (
                  <Card key={order.id || index} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={index === 0 ? "default" : "outline"} className="mb-2">
                          {index === 0 ? "Récent" : `#${orders.length - index}`}
                        </Badge>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <CardTitle className="text-xl truncate">{carModel}</CardTitle>
                      <CardDescription className="flex items-center">
                        {formatTimestamp(order.timestamp)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="truncate">{customerName}</span>
                        </div>
                        {price && (
                          <div className="flex items-center text-sm">
                            <Car className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">{price} €</span>
                          </div>
                        )}
                        {paymentMethod && (
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{getPaymentMethodLabel(paymentMethod)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {orders.map((order, index) => {
                    // Extract customer info
                    const nameMatch = order.html?.match(/<p><strong>Client:<\/strong> (.+?)<\/p>/) || [];
                    const emailMatch = order.html?.match(/<p><strong>Email:<\/strong> (.+?)<\/p>/) || [];
                    const phoneMatch = order.html?.match(/<p><strong>Téléphone:<\/strong> (.+?)<\/p>/) || [];
                    
                    // Extract car details
                    const carMatch = order.html?.match(/<p><strong>Modèle:<\/strong> (.+?)<\/p>/) || [];
                    const priceMatch = order.html?.match(/<p><strong>Prix:<\/strong> (\d+)€<\/p>/) || [];
                    
                    // Extract delivery info
                    const deliveryOptionMatch = order.html?.match(/<p><strong>Option:<\/strong> (.+?)<\/p>/) || [];
                    const deliveryAddressMatch = order.html?.match(/<p><strong>Adresse:<\/strong> (.+?)<\/p>/) || [];
                    
                    // Extract payment info
                    const methodMatch = order.html?.match(/<p><strong>Méthode de paiement:<\/strong> (.+?)<\/p>/) || [];
                    const depositMatch = order.html?.match(/<p><strong>Acompte de 20%:<\/strong> (.+?)€<\/p>/) || [];
                    
                    return (
                      <div key={order.id || index} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{carMatch[1] || 'Commande'}</h3>
                            <p className="text-gray-500 text-sm">
                              {formatTimestamp(order.timestamp)}
                            </p>
                          </div>
                          <Badge variant={index === 0 ? "default" : "outline"}>
                            {index === 0 ? "Plus récent" : `#${orders.length - index}`}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Informations client</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{nameMatch[1] || 'Non spécifié'}</span>
                                </div>
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{emailMatch[1] || 'Non spécifié'}</span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{phoneMatch[1] || 'Non spécifié'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Détails du véhicule</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Car className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{carMatch[1] || 'Non spécifié'}</span>
                                </div>
                                {priceMatch[1] && (
                                  <div className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium">{priceMatch[1]} €</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Livraison</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Truck className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{deliveryOptionMatch[1] || 'Non spécifié'}</span>
                                </div>
                                <div className="flex items-start">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                  <span className="text-sm">{deliveryAddressMatch[1] || 'Non spécifié'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Paiement</h4>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{getPaymentMethodLabel(methodMatch[1] || '')}</span>
                                </div>
                                {depositMatch[1] && (
                                  <div className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>Acompte: {depositMatch[1]} €</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {order.attachments && order.attachments.length > 0 && (
                          <div className="mt-2 mb-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Pièces jointes</h4>
                            <div className="space-y-1">
                              {order.attachments.map((attachment: string, i: number) => (
                                <div key={i} className="flex items-center">
                                  <FileDown className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-sm">{attachment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {index < orders.length - 1 && (
                          <Separator className="my-6" />
                        )}
                      </div>
                    );
                  })}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default OrdersBackup;
