
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, Landmark } from 'lucide-react';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { translate } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      clearCart();
      setLoading(false);
      setFormSubmitted(true);
      toast.success(
        translate('orderSuccessful', {
          FR: 'Votre commande a été traitée avec succès!',
          EN: 'Your order has been successfully processed!',
          ES: '¡Su pedido ha sido procesado con éxito!',
          IT: 'Il tuo ordine è stato elaborato con successo!',
          PT: 'O seu pedido foi processado com sucesso!',
          RO: 'Comanda dvs. a fost procesată cu succes!'
        })
      );
    }, 1500);
  };

  if (items.length === 0 && !formSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">
          {translate('checkout', { 
            FR: 'Paiement', 
            EN: 'Checkout', 
            ES: 'Pago', 
            IT: 'Pagamento', 
            PT: 'Pagamento', 
            RO: 'Plată' 
          })}
        </h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-8">
            {translate('emptyCart', {
              FR: 'Votre panier est vide',
              EN: 'Your cart is empty',
              ES: 'Tu carrito está vacío',
              IT: 'Il tuo carrello è vuoto',
              PT: 'Seu carrinho está vazio',
              RO: 'Coșul tău este gol'
            })}
          </p>
          <Link to="/vehicules/occasion">
            <Button>
              {translate('browseVehicles', {
                FR: 'Découvrir nos véhicules',
                EN: 'Browse our vehicles',
                ES: 'Explorar nuestros vehículos',
                IT: 'Sfoglia i nostri veicoli',
                PT: 'Explorar nossos veículos',
                RO: 'Explorează vehiculele noastre'
              })}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-green-600">
              {translate('orderConfirmed', {
                FR: 'Commande confirmée',
                EN: 'Order confirmed',
                ES: 'Pedido confirmado',
                IT: 'Ordine confermato',
                PT: 'Pedido confirmado',
                RO: 'Comandă confirmată'
              })}
            </CardTitle>
            <CardDescription className="text-center">
              {translate('orderConfirmationMessage', {
                FR: 'Nous vous remercions pour votre commande. Un conseiller vous contactera prochainement.',
                EN: 'Thank you for your order. An advisor will contact you soon.',
                ES: 'Gracias por su pedido. Un asesor se pondrá en contacto con usted pronto.',
                IT: 'Grazie per il tuo ordine. Un consulente ti contatterà presto.',
                PT: 'Obrigado pelo seu pedido. Um consultor entrará em contato em breve.',
                RO: 'Vă mulțumim pentru comandă. Un consilier vă va contacta în curând.'
              })}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-6">
            <Link to="/">
              <Button>
                {translate('backToHome', {
                  FR: 'Retour à l\'accueil',
                  EN: 'Back to home',
                  ES: 'Volver a inicio',
                  IT: 'Torna alla home',
                  PT: 'Voltar para início',
                  RO: 'Înapoi la pagina principală'
                })}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-light mb-8">
        {translate('checkout', { 
          FR: 'Paiement', 
          EN: 'Checkout', 
          ES: 'Pago', 
          IT: 'Pagamento', 
          PT: 'Pagamento', 
          RO: 'Plată' 
        })}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {translate('paymentDetails', {
                  FR: 'Détails du paiement',
                  EN: 'Payment details',
                  ES: 'Detalles del pago',
                  IT: 'Dettagli del pagamento',
                  PT: 'Detalhes do pagamento',
                  RO: 'Detalii de plată'
                })}
              </CardTitle>
              <CardDescription>
                {translate('choosePayment', {
                  FR: 'Choisissez votre méthode de paiement préférée',
                  EN: 'Choose your preferred payment method',
                  ES: 'Elija su método de pago preferido',
                  IT: 'Scegli il tuo metodo di pagamento preferito',
                  PT: 'Escolha o seu método de pagamento preferido',
                  RO: 'Alegeți metoda de plată preferată'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {translate('card', {
                        FR: 'Carte',
                        EN: 'Card',
                        ES: 'Tarjeta',
                        IT: 'Carta',
                        PT: 'Cartão',
                        RO: 'Card'
                      })}
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex items-center gap-2">
                      <Landmark className="h-4 w-4" />
                      {translate('bankTransfer', {
                        FR: 'Virement',
                        EN: 'Bank Transfer',
                        ES: 'Transferencia',
                        IT: 'Bonifico',
                        PT: 'Transferência',
                        RO: 'Transfer bancar'
                      })}
                    </TabsTrigger>
                    <TabsTrigger value="cash" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      {translate('cash', {
                        FR: 'Espèces',
                        EN: 'Cash',
                        ES: 'Efectivo',
                        IT: 'Contanti',
                        PT: 'Dinheiro',
                        RO: 'Numerar'
                      })}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="cardName">
                          {translate('nameOnCard', {
                            FR: 'Nom sur la carte',
                            EN: 'Name on card',
                            ES: 'Nombre en la tarjeta',
                            IT: 'Nome sulla carta',
                            PT: 'Nome no cartão',
                            RO: 'Nume pe card'
                          })}
                        </Label>
                        <Input id="cardName" placeholder="John Doe" className="mt-1" required />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="cardNumber">
                          {translate('cardNumber', {
                            FR: 'Numéro de carte',
                            EN: 'Card number',
                            ES: 'Número de tarjeta',
                            IT: 'Numero di carta',
                            PT: 'Número do cartão',
                            RO: 'Număr card'
                          })}
                        </Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">
                          {translate('expiryDate', {
                            FR: 'Date d\'expiration',
                            EN: 'Expiry date',
                            ES: 'Fecha de expiración',
                            IT: 'Data di scadenza',
                            PT: 'Data de validade',
                            RO: 'Data expirării'
                          })}
                        </Label>
                        <Input id="expiryDate" placeholder="MM/YY" className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" required />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-800">
                        {translate('bankTransferInstructions', {
                          FR: 'Effectuez un virement bancaire sur notre compte. Notre équipe confirmera la réception et traitera votre commande.',
                          EN: 'Make a bank transfer to our account. Our team will confirm receipt and process your order.',
                          ES: 'Realice una transferencia bancaria a nuestra cuenta. Nuestro equipo confirmará la recepción y procesará su pedido.',
                          IT: 'Effettua un bonifico bancario sul nostro conto. Il nostro team confermerà la ricezione e elaborerà il tuo ordine.',
                          PT: 'Faça uma transferência bancária para a nossa conta. A nossa equipa confirmará a recepção e processará o seu pedido.',
                          RO: 'Efectuați un transfer bancar în contul nostru. Echipa noastră va confirma primirea și va procesa comanda dvs.'
                        })}
                      </p>
                      <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                        <p className="font-medium">Auto ADI SARL</p>
                        <p>IBAN: IT98 A123 4567 8901 2345 6789 012</p>
                        <p>BIC/SWIFT: ABCDEFG1234</p>
                        <p>Bank: Example Bank</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cash" className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-md">
                      <p className="text-sm text-amber-800">
                        {translate('cashPaymentInstructions', {
                          FR: 'Vous pouvez payer en espèces lors de la livraison ou du retrait du véhicule. Veuillez vous assurer d\'avoir le montant exact.',
                          EN: 'You can pay in cash upon delivery or collection of the vehicle. Please make sure you have the exact amount.',
                          ES: 'Puede pagar en efectivo al recibir o recoger el vehículo. Asegúrese de tener la cantidad exacta.',
                          IT: 'Puoi pagare in contanti alla consegna o al ritiro del veicolo. Assicurati di avere l\'importo esatto.',
                          PT: 'Pode pagar em dinheiro na entrega ou recolha do veículo. Certifique-se de que tem o montante exacto.',
                          RO: 'Puteți plăti în numerar la livrarea sau ridicarea vehiculului. Vă rugăm să vă asigurați că aveți suma exactă.'
                        })}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4 mt-8">
                  <h3 className="text-lg font-medium">
                    {translate('contactInformation', {
                      FR: 'Informations de contact',
                      EN: 'Contact information',
                      ES: 'Información de contacto',
                      IT: 'Informazioni di contatto',
                      PT: 'Informações de contato',
                      RO: 'Informații de contact'
                    })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        {translate('fullName', {
                          FR: 'Nom complet',
                          EN: 'Full name',
                          ES: 'Nombre completo',
                          IT: 'Nome completo',
                          PT: 'Nome completo',
                          RO: 'Nume complet'
                        })}
                      </Label>
                      <Input id="name" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        {translate('phone', {
                          FR: 'Téléphone',
                          EN: 'Phone',
                          ES: 'Teléfono',
                          IT: 'Telefono',
                          PT: 'Telefone',
                          RO: 'Telefon'
                        })}
                      </Label>
                      <Input id="phone" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="address">
                        {translate('address', {
                          FR: 'Adresse',
                          EN: 'Address',
                          ES: 'Dirección',
                          IT: 'Indirizzo',
                          PT: 'Endereço',
                          RO: 'Adresă'
                        })}
                      </Label>
                      <Input id="address" className="mt-1" required />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-darkBlue"
                    disabled={loading}
                  >
                    {loading ? (
                      translate('processing', {
                        FR: 'Traitement en cours...',
                        EN: 'Processing...',
                        ES: 'Procesando...',
                        IT: 'Elaborazione in corso...',
                        PT: 'Processando...',
                        RO: 'Se procesează...'
                      })
                    ) : (
                      translate('completeOrder', {
                        FR: 'Finaliser la commande',
                        EN: 'Complete order',
                        ES: 'Completar pedido',
                        IT: 'Completa l\'ordine',
                        PT: 'Completar pedido',
                        RO: 'Finalizează comanda'
                      })
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {translate('orderSummary', {
                  FR: 'Résumé de la commande',
                  EN: 'Order summary',
                  ES: 'Resumen del pedido',
                  IT: 'Riepilogo dell\'ordine',
                  PT: 'Resumo do pedido',
                  RO: 'Rezumatul comenzii'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">{item.brand} {item.model}</p>
                      <p className="text-sm text-gray-500">{item.year}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price || 0)}</p>
                  </div>
                ))}
                
                <div className="pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
