import React, { useState, useEffect } from 'react';
import { getStoredOrders, clearStoredOrders, exportOrdersAsJSON } from '@/utils/emailService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileDown, Clock, Car, User, Mail, Phone, Truck, CreditCard, AlertCircle, RefreshCw, Download } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const OrdersBackup = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const loadOrders = () => {
    setLoading(true);
    
    // Add a small delay to ensure UI feedback is visible
    setTimeout(() => {
      try {
        // Force localStorage refresh by calling it directly
        const storedOrders = getStoredOrders();
        console.log("Retrieved orders:", storedOrders);
        
        // Check if storedOrders is valid before setting state
        if (Array.isArray(storedOrders)) {
          setOrders(storedOrders.reverse()); // Most recent first
        } else {
          console.error("Invalid orders format, received:", storedOrders);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les commandes sauvegardées.",
          variant: "destructive"
        });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleClearAllOrders = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes sauvegardées ? Cette action est irréversible.')) {
      clearStoredOrders();
      setOrders([]);
      toast({
        title: "Commandes supprimées",
        description: "Toutes les commandes ont été supprimées du stockage local.",
      });
    }
  };

  const handleExportOrdersAsJSON = () => {
    if (exportOrdersAsJSON(orders)) {
      toast({
        title: "Export réussi",
        description: "Les commandes ont été exportées au format JSON.",
      });
    } else {
      toast({
        title: "Échec de l'export",
        description: "Une erreur est survenue lors de l'export des commandes.",
        variant: "destructive"
      });
    }
  };

  const handleRefreshOrders = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadOrders();
      setRefreshing(false);
      toast({
        title: "Actualisation terminée",
        description: "Les commandes ont été rechargées.",
      });
    }, 300);
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

  const handleDownloadAttachment = (attachmentName: string, orderTimestamp: string) => {
    try {
      const dataStr = `Ce document est une preuve de paiement jointe à une commande faite le ${formatTimestamp(orderTimestamp)}.
      
Nom du fichier: ${attachmentName}

Note: Ce fichier est une recréation à partir des données de sauvegarde locale car le fichier original n'est pas stocké dans le navigateur.
      
Pour plus d'informations, veuillez contacter le service client.`;
      
      const blob = new Blob([dataStr], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = attachmentName;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "Téléchargement démarré",
        description: `Le fichier ${attachmentName} est en cours de téléchargement.`,
      });
    } catch (error) {
      console.error("Error downloading attachment:", error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le fichier demandé.",
        variant: "destructive"
      });
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
          <Button 
            variant="outline" 
            onClick={handleRefreshOrders}
            disabled={refreshing}
            className="relative"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </Button>
          <Button variant="outline" onClick={handleExportOrdersAsJSON} disabled={orders.length === 0}>
            <FileDown className="mr-2 h-4 w-4" />
            Exporter JSON
          </Button>
          <Button variant="destructive" onClick={handleClearAllOrders} disabled={orders.length === 0}>
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
                <br />
                <br />
                <span className="font-medium">Si vous venez de passer une commande et ne la voyez pas ici, cliquez sur "Actualiser".</span>
              </p>
              <Button 
                variant="outline" 
                onClick={handleRefreshOrders} 
                className="mt-4"
                disabled={refreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Actualisation...' : 'Actualiser les commandes'}
              </Button>
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
                const subjectMatch = order.subject?.match(/Nouvelle commande: (.+)/) || [];
                const htmlMatch = order.html?.match(/<p><strong>Modèle:<\/strong> (.+?)<\/p>/) || [];
                const carModel = subjectMatch[1] || htmlMatch[1] || 'Véhicule';
                
                const priceMatch = order.html?.match(/<p><strong>Prix:<\/strong> (\d+)€<\/p>/) || [];
                const price = priceMatch[1] || '';
                
                const nameMatch = order.html?.match(/<p><strong>Client:<\/strong> (.+?)<\/p>/) || [];
                const customerName = nameMatch[1] || 'Client';
                
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
                    {order.attachments && order.attachments.length > 0 && (
                      <CardFooter className="pt-2 pb-4">
                        <div className="w-full">
                          <p className="text-sm text-gray-500 mb-2">Pièces jointes:</p>
                          {order.attachments.map((attachment: string, i: number) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              size="sm"
                              className="flex items-center text-xs w-full justify-start mb-1"
                              onClick={() => handleDownloadAttachment(attachment, order.timestamp)}
                            >
                              <Download className="h-3 w-3 mr-2" />
                              {attachment}
                            </Button>
                          ))}
                        </div>
                      </CardFooter>
                    )}
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
                    const nameMatch = order.html?.match(/<p><strong>Client:<\/strong> (.+?)<\/p>/) || [];
                    const emailMatch = order.html?.match(/<p><strong>Email:<\/strong> (.+?)<\/p>/) || [];
                    const phoneMatch = order.html?.match(/<p><strong>Téléphone:<\/strong> (.+?)<\/p>/) || [];
                    
                    const carMatch = order.html?.match(/<p><strong>Modèle:<\/strong> (.+?)<\/p>/) || [];
                    const priceMatch = order.html?.match(/<p><strong>Prix:<\/strong> (\d+)€<\/p>/) || [];
                    
                    const deliveryOptionMatch = order.html?.match(/<p><strong>Option:<\/strong> (.+?)<\/p>/) || [];
                    const deliveryAddressMatch = order.html?.match(/<p><strong>Adresse:<\/strong> (.+?)<\/p>/) || [];
                    
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
                            <div className="space-y-2">
                              {order.attachments.map((attachment: string, i: number) => (
                                <Button 
                                  key={i} 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center w-full justify-start"
                                  onClick={() => handleDownloadAttachment(attachment, order.timestamp)}
                                >
                                  <FileDown className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-sm">{attachment}</span>
                                  <span className="ml-auto bg-gray-100 px-2 py-1 rounded-full text-xs">Télécharger</span>
                                </Button>
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
