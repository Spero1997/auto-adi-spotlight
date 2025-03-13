
import { useState, useRef } from 'react';
import { Car, ShieldCheck, Tag, Fuel, Calendar, ChevronRight, ShoppingCart, CreditCard, Building, AlertCircle, Upload, Check, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendOrderConfirmationEmail, sendPaymentProofEmail } from '@/utils/emailService';

interface CarProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  price: number;
  image: string;
}

const cars = [
  {
    id: '2',
    brand: 'Renault',
    model: 'Captur',
    year: 2022,
    mileage: 15000,
    fuelType: 'Essence',
    price: 23500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'A3 Sportback',
    year: 2021,
    mileage: 22000,
    fuelType: 'Essence',
    price: 29800,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '5',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    mileage: 18000,
    fuelType: 'Hybride',
    price: 27500,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '7',
    brand: 'Peugeot',
    model: '208',
    year: 2022,
    mileage: 12000,
    fuelType: 'Diesel',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '8',
    brand: 'BMW',
    model: 'Série 1',
    year: 2021,
    mileage: 24000,
    fuelType: 'Essence',
    price: 32500,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '9',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    mileage: 19000,
    fuelType: 'Diesel',
    price: 25800,
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

const FeaturedCars = () => {
  const { toast } = useToast();
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'coupon' | 'gift'>('transfer');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [couponType, setCouponType] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponAlertOpen, setCouponAlertOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfoMissing, setCustomerInfoMissing] = useState(false);

  const handleOpenCheckout = (car: CarProps) => {
    setSelectedCar(car);
    setProofOfPayment(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfPayment(e.target.files[0]);
    }
  };

  const handleCompletePayment = async () => {
    // Validate customer information
    if (!customerName || !customerEmail || !customerPhone) {
      setCustomerInfoMissing(true);
      return;
    }

    if (paymentMethod === 'transfer' && !proofOfPayment) {
      setAlertDialogOpen(true);
      return;
    }
    
    if (paymentMethod === 'coupon' && (!couponType || !couponCode)) {
      setCouponAlertOpen(true);
      return;
    }
    
    await finishOrder();
  };

  const finishOrder = async () => {
    if (!selectedCar) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare order data
      const orderData = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        carModel: `${selectedCar.brand} ${selectedCar.model}`,
        price: selectedCar.price,
        paymentMethod: paymentMethod,
        couponCode: paymentMethod === 'coupon' ? `${couponType}: ${couponCode}` : undefined,
        deposit: calculateDeposit(selectedCar.price)
      };
      
      // Send different emails based on payment method
      if (paymentMethod === 'transfer' && proofOfPayment) {
        // Send payment proof email
        await sendPaymentProofEmail(
          {
            name: customerName,
            email: customerEmail,
            reference: `Achat ${selectedCar.brand} ${selectedCar.model}`,
            amount: calculateDeposit(selectedCar.price)
          }, 
          proofOfPayment
        );
      }
      
      // Send order confirmation email
      await sendOrderConfirmationEmail(orderData, proofOfPayment || undefined);
      
      // Close dialogs and show success message
      setDialogOpen(false);
      setAlertDialogOpen(false);
      setCustomerInfoMissing(false);
      
      toast({
        title: "Commande confirmée",
        description: `Votre commande pour ${selectedCar.brand} ${selectedCar.model} a été enregistrée. Nous vous contacterons prochainement.`,
      });
      
      // Reset form
      setSelectedCar(null);
      setProofOfPayment(null);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
    } catch (error) {
      console.error("Error sending order emails:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de votre commande. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDeposit = (price: number) => {
    return price * 0.2;
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos véhicules d'occasion à la une</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules d'occasion vérifiés et garantis pour répondre à tous vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden card-hover border border-gray-200">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Occasion
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-1">{`${car.brand} ${car.model}`}</h3>
                <div className="text-2xl font-bold text-brand-blue mb-4">
                  {car.price.toLocaleString('fr-FR')} €
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Car className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{car.mileage.toLocaleString('fr-FR')} km</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ShieldCheck className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Garantie</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link to={`/vehicules/${car.id}`} className="flex-1">
                    <Button variant="default" className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                      Détails
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    onClick={() => handleOpenCheckout(car)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Acheter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/vehicules/occasion">
            <Button className="bg-white border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors px-6 py-3 rounded-md font-semibold inline-flex items-center">
              Voir tous nos véhicules
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle>Finaliser votre achat</DialogTitle>
              <DialogDescription>
                {selectedCar && (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center">
                      <img 
                        src={selectedCar.image} 
                        alt={`${selectedCar.brand} ${selectedCar.model}`} 
                        className="w-24 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-medium">{selectedCar.brand} {selectedCar.model}</p>
                        <p className="text-gray-500">Prix total: <span className="text-brand-blue font-bold">{selectedCar.price.toLocaleString('fr-FR')} €</span></p>
                      </div>
                    </div>
                    
                    <div className="bg-brand-blue/10 p-4 rounded-md border border-brand-blue/30">
                      <p className="font-medium text-brand-blue">
                        Acompte à verser (20%): 
                        <span className="font-bold text-lg ml-1">
                          {calculateDeposit(selectedCar.price).toLocaleString('fr-FR')} €
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Le reste du montant sera à régler lors de la livraison du véhicule.
                      </p>
                    </div>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Customer Information Section */}
              <div className="space-y-4 border-b pb-4">
                <h3 className="font-medium text-base">Vos coordonnées</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Nom et prénom <span className="text-red-500">*</span></Label>
                  <Input 
                    id="customer-name" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className={!customerName && customerInfoMissing ? "border-red-500" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email <span className="text-red-500">*</span></Label>
                  <Input 
                    id="customer-email" 
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={!customerEmail && customerInfoMissing ? "border-red-500" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Téléphone <span className="text-red-500">*</span></Label>
                  <Input 
                    id="customer-phone" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className={!customerPhone && customerInfoMissing ? "border-red-500" : ""}
                  />
                </div>
                
                {customerInfoMissing && (
                  <p className="text-sm text-red-500">Veuillez remplir tous les champs obligatoires.</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 border-b pb-4">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="flex-1 opacity-50"
                  disabled
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Carte bancaire
                </Button>
                <Button
                  type="button" 
                  variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('transfer')}
                  className="flex-1"
                >
                  <Building className="mr-2 h-4 w-4" />
                  Virement bancaire
                </Button>
                <Button
                  type="button" 
                  variant={paymentMethod === 'coupon' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('coupon')}
                  className="flex-1"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Coupon
                </Button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 opacity-50">
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">
                      Numéro de carte
                    </label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium leading-none mb-2 block">
                        Date d'expiration
                      </label>
                      <Input placeholder="MM/AA" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium leading-none mb-2 block">
                        CVC
                      </label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium leading-none mb-2 block">
                      Nom sur la carte
                    </label>
                    <Input placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <div className="flex items-start">
                      <AlertCircle className="text-brand-blue h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-800 mb-2">
                          Veuillez effectuer un virement bancaire sur le compte suivant:
                        </p>
                        <div className="text-sm">
                          <p><span className="font-semibold">Bénéficiaire:</span> Lucia Dzujkova</p>
                          <p><span className="font-semibold">IBAN:</span> LT453500010018283529</p>
                          <p><span className="font-semibold">SWIFT/BIC:</span> EVIULT2VXXX</p>
                          <p><span className="font-semibold">Nom de banque:</span> Paysera LT, UAB</p>
                          <p><span className="font-semibold">Adresse de la banque:</span> Pilaitės pr. 16, Vilnius, LT-04352, Lituanie</p>
                          <p className="mt-2 font-semibold text-brand-blue">
                            Montant à payer (acompte 20%): 
                            {selectedCar ? calculateDeposit(selectedCar.price).toLocaleString('fr-FR') : 0} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proof-of-payment" className="font-medium">
                      Preuve de paiement <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="proof-of-payment"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-grow"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {proofOfPayment ? 'Changer le fichier' : 'Télécharger un justificatif'}
                      </Button>
                      
                      {proofOfPayment && (
                        <div className="flex items-center text-green-600 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-[150px]">{proofOfPayment.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Formats acceptés: JPG, PNG, PDF. Taille maximale: 5 MB
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Après avoir effectué le virement, veuillez télécharger une preuve de paiement et cliquer sur "Confirmer la commande".
                    Nous vous contacterons après vérification du paiement.
                  </p>
                </div>
              )}

              {paymentMethod === 'coupon' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <div className="flex items-start">
                      <Gift className="text-amber-600 h-5 w-5 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-800 mb-2">
                          Payez avec votre coupon de recharge prépayé:
                        </p>
                        <p className="text-sm text-gray-600">
                          Sélectionnez votre type de coupon et entrez le code de recharge pour payer le montant de l'acompte.
                        </p>
                        <p className="mt-2 font-semibold text-brand-blue">
                          Montant à payer (acompte 20%): 
                          {selectedCar ? calculateDeposit(selectedCar.price).toLocaleString('fr-FR') : 0} €
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coupon-type" className="font-medium">
                      Type de coupon <span className="text-red-500">*</span>
                    </Label>
                    <Select value={couponType} onValueChange={setCouponType}>
                      <SelectTrigger id="coupon-type" className="w-full">
                        <SelectValue placeholder="Sélectionnez le type de coupon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">PCS</SelectItem>
                        <SelectItem value="transcash">Transcash</SelectItem>
                        <SelectItem value="amazon">Carte cadeau Amazon</SelectItem>
                        <SelectItem value="neosurf">Neosurf</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coupon-code" className="font-medium">
                      Code du coupon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="coupon-code"
                      placeholder="Entrez le code de votre coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Le code du coupon se trouve au dos de votre carte ou dans votre email de confirmation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Annuler
              </Button>
              
              <Button 
                type="button"
                className="bg-brand-blue hover:bg-brand-darkBlue"
                onClick={handleCompletePayment}
                disabled={isSubmitting || 
                  !customerName || !customerEmail || !customerPhone ||
                  (paymentMethod === 'transfer' && !proofOfPayment) || 
                  (paymentMethod === 'coupon' && (!couponType || !couponCode))}
              >
                {isSubmitting ? "Envoi en cours..." : "Confirmer la commande"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Preuve de paiement requise</AlertDialogTitle>
              <AlertDialogDescription>
                Pour valider votre commande par virement bancaire, veuillez télécharger une preuve de paiement (capture d'écran ou reçu de virement).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fermer</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={couponAlertOpen} onOpenChange={setCouponAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Informations du coupon manquantes</AlertDialogTitle>
              <AlertDialogDescription>
                Pour valider votre commande par coupon, veuillez sélectionner un type de coupon et saisir le code du coupon.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fermer</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default FeaturedCars;
