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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
      
      if (paymentMethod === 'transfer' && proofOfPayment) {
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
      
      await sendOrderConfirmationEmail(orderData, proofOfPayment || undefined);
      
      setDialogOpen(false);
      setAlertDialogOpen(false);
      setCustomerInfoMissing(false);
      
      toast({
        title: "Commande confirmée",
        description: `Votre commande pour ${selectedCar.brand} ${selectedCar.model} a été enregistrée. Nous vous contacterons prochainement.`,
      });
      
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
          <DialogContent className={`sm:max-w-md md:max-w-lg ${isMobile ? 'p-4' : 'p-6'} max-h-[90vh] overflow-hidden`}>
            <DialogHeader className={`${isMobile ? 'mb-2' : 'mb-4'}`}>
              <DialogTitle>Finaliser votre achat</DialogTitle>
              <DialogDescription>
                {selectedCar && (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center">
                      <img 
                        src={selectedCar.image} 
                        alt={`${selectedCar.brand} ${selectedCar.model}`} 
                        className="w-20 h-14 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="font-medium">{selectedCar.brand} {selectedCar.model}</p>
                        <p className="text-gray-500">Prix total: <span className="text-brand-blue font-bold">{selectedCar.price.toLocaleString('fr-FR')} €</span></p>
                      </div>
                    </div>
                    
                    <div className="bg-brand-blue/10 p-3 rounded-md border border-brand-blue/30">
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

            <ScrollArea className="max-h-[60vh] pr-4 -mr-4">
              <div className={`space-y-5 ${isMobile ? 'py-2' : 'py-4'}`}>
                <div className="space-y-3 border-b pb-4">
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

                <div className={`flex flex-wrap gap-2 border-b pb-4 ${isMobile ? 'flex-col' : ''}`}>
                  <Button
                    type="button"
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className={`${isMobile ? 'w-full' : 'flex-1'} opacity-50`}
                    disabled
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Carte bancaire
                  </Button>
                  <Button
                    type="button" 
                    variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('transfer')}
                    className={isMobile ? 'w-full' : 'flex-1'}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Virement bancaire
                  </Button>
                  <Button
                    type="button" 
                    variant={paymentMethod === 'coupon' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('coupon')}
                    className={isMobile ? 'w-full' : 'flex-1'}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Coupon
                  </Button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 opacity-50">
                    <div>
                      <label className="text-sm font-medium leading-none mb-2 block">
                        Num

