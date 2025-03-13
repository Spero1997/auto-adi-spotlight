import { useState, useRef, useEffect } from 'react';
import { Car, ShieldCheck, Tag, Fuel, Calendar, ChevronRight, ShoppingCart, CreditCard, Building, AlertCircle, Upload, Check, Gift, Truck, MapPin, Clock } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { Textarea } from "@/components/ui/textarea";
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';

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

interface SearchFilters {
  brand: string;
  model: string;
  maxPrice?: number;
  fuelType: string;
}

interface FeaturedCarsProps {
  searchFilters?: SearchFilters;
}

const defaultCars = [
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
  }
];

const FeaturedCars = ({ searchFilters }: FeaturedCarsProps) => {
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
  const [paymentProofMissing, setPaymentProofMissing] = useState(false);
  const isMobile = useIsMobile();
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryPostalCode, setDeliveryPostalCode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  
  const [cars, setCars] = useState<ImportedVehicle[]>([]);
  
  useEffect(() => {
    loadVehicles();
  }, []);
  
  const loadVehicles = () => {
    try {
      const importedVehicles = getImportedVehicles();
      
      if (importedVehicles && importedVehicles.length > 0) {
        console.log("Utilisation des véhicules importés:", importedVehicles.length);
        setCars(importedVehicles);
      } else {
        console.log("Aucun véhicule importé trouvé, utilisation des véhicules par défaut");
        setCars(defaultCars);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules:", error);
      setCars(defaultCars);
    }
  };

  const handleOpenCheckout = (car: CarProps) => {
    setSelectedCar(car);
    setProofOfPayment(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setDeliveryCity('');
    setDeliveryPostalCode('');
    setDeliveryNotes('');
    setDeliveryOption('pickup');
    setPaymentProofMissing(false);
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfPayment(e.target.files[0]);
      setPaymentProofMissing(false);
    }
  };

  const handleCompletePayment = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      setCustomerInfoMissing(true);
      return;
    }

    if (paymentMethod === 'transfer' && !proofOfPayment) {
      setPaymentProofMissing(true);
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
        deposit: calculateDeposit(selectedCar.price),
        deliveryOption: deliveryOption,
        deliveryAddress: deliveryOption === 'delivery' ? `${deliveryAddress}, ${deliveryPostalCode} ${deliveryCity}` : 'Enlèvement au showroom',
        deliveryNotes: deliveryNotes
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
      setPaymentProofMissing(false);
      
      toast({
        title: "Commande confirmée",
        description: `Votre commande pour ${selectedCar.brand} ${selectedCar.model} a été enregistrée. Nous vous contacterons prochainement.`,
      });
      
      setSelectedCar(null);
      setProofOfPayment(null);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setDeliveryAddress('');
      setDeliveryCity('');
      setDeliveryPostalCode('');
      setDeliveryNotes('');
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

  const filteredCars = searchFilters ? cars.filter(car => {
    if (!car) return false;
    
    if (!car.brand || !car.model || !car.price || !car.year || !car.fuelType) {
      console.log("Véhicule incomplet ignoré:", car);
      return false;
    }
    
    const matchBrand = !searchFilters.brand || car.brand.toLowerCase() === searchFilters.brand.toLowerCase();
    const matchModel = !searchFilters.model || car.model.toLowerCase().includes(searchFilters.model.toLowerCase());
    const matchPrice = !searchFilters.maxPrice || car.price <= searchFilters.maxPrice;
    const matchFuel = !searchFilters.fuelType || car.fuelType.toLowerCase() === searchFilters.fuelType.toLowerCase();
    
    return matchBrand && matchModel && matchPrice && matchFuel;
  }) : cars;

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType) 
              ? 'Résultats de votre recherche'
              : 'Nos véhicules d\'occasion à la une'
            }
          </h2>
          {filteredCars.length === 0 ? (
            <div className="text-center my-12">
              <p className="text-gray-600 mb-4">
                Aucun véhicule ne correspond à vos critères de recherche.
              </p>
              <p className="text-gray-500">
                Essayez de modifier vos critères pour voir plus de résultats.
              </p>
            </div>
          ) : (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {searchFilters && (searchFilters.brand || searchFilters.model || searchFilters.maxPrice || searchFilters.fuelType)
                ? `${filteredCars.length} véhicule${filteredCars.length > 1 ? 's' : ''} trouvé${filteredCars.length > 1 ? 's' : ''}`
                : 'Découvrez notre sélection de véhicules d\'occasion vérifiés et garantis pour répondre à tous vos besoins.'
              }
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden card-hover border border-gray-200">
              <div className="relative">
                <img
                  src={car.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
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
          <DialogContent className="sm:max-w-[700px] w-[95%] max-h-[90vh] overflow-auto p-0">
            <div className="p-6 pb-0 sticky top-0 bg-white z-10 border-b">
              <DialogHeader className="mb-2">
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
            </div>

            <div className="px-6 py-4 overflow-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
              <div className="space-y-5">
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

                <div className="space-y-3 border-b pb-4">
                  <h3 className="font-medium text-base flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-brand-blue" />
                    Informations de livraison
                  </h3>
                  
                  <div className="space-y-2">
                    <Label className="mb-2">Option de livraison</Label>
                    <div className={`flex flex-wrap gap-2 ${isMobile ? 'flex-col' : ''}`}>
                      <Button
                        type="button"
                        variant={deliveryOption === 'pickup' ? 'default' : 'outline'}
                        onClick={() => setDeliveryOption('pickup')}
                        className={`${isMobile ? 'w-full' : 'flex-1'}`}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Enlèvement au showroom
                      </Button>
                      <Button
                        type="button" 
                        variant={deliveryOption === 'delivery' ? 'default' : 'outline'}
                        onClick={() => setDeliveryOption('delivery')}
                        className={isMobile ? 'w-full' : 'flex-1'}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Livraison à domicile
                      </Button>
                    </div>
                  </div>
                  
                  {deliveryOption === 'pickup' && (
                    <div className="bg-muted/50 p-3 rounded-md space-y-1">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-brand-blue mt-0.5" />
                        <div>
                          <p className="font-medium">Auto Adi</p>
                          <p className="text-sm text-gray-600">Borgo Ognissanti, 142r 50123 Firenze FI Italie</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 text-brand-blue mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Lundi - Vendredi: 9h - 19h</p>
                          <p className="text-sm text-gray-600">Samedi: 10h - 18h</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {deliveryOption === 'delivery' && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="delivery-address">Adresse</Label>
                        <Input 
                          id="delivery-address" 
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="123 Rue de Paris"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="delivery-postal-code">Code postal</Label>
                          <Input 
                            id="delivery-postal-code" 
                            value={deliveryPostalCode}
                            onChange={(e) => setDeliveryPostalCode(e.target.value)}
                            placeholder="75001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="delivery-city">Ville</Label>
                          <Input 
                            id="delivery-city" 
                            value={deliveryCity}
                            onChange={(e) => setDeliveryCity(e.target.value)}
                            placeholder="Paris"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="delivery-notes">Instructions de livraison (optionnel)</Label>
                        <Textarea 
                          id="delivery-notes" 
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          placeholder="Code d'entrée, étage, informations complémentaires..."
                        />
                      </div>
                      
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="text-sm text-amber-800 flex items-start">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Les frais de livraison à domicile sont inclus dans l'acompte de 20%. Aucun supplément ne sera demandé pour la livraison.
                        </p>
                      </div>
                    </div>
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
                        Numéro de carte
                      </label>
                      <Input disabled placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium leading-none mb-2 block">
                          Date d'expiration
                        </label>
                        <Input disabled placeholder="MM/AA" />
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-none mb-2 block">
                          CVC
                        </label>
                        <Input disabled placeholder="123" />
                      </div>
                    </div>
                    
                    <p className="text-xs text-amber-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Le paiement par carte sera disponible prochainement
                    </p>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Coordonnées bancaires</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Bénéficiaire:</span> Lucia Dzujkova</p>
                        <p><span className="font-medium">IBAN:</span> LT453500010018283529</p>
                        <p><span className="font-medium">SWIFT/BIC:</span> EVIULT2VXXX</p>
                        <p><span className="font-medium">Banque:</span> Paysera LT, UAB</p>
                        <p><span className="font-medium">Adresse de la banque:</span> Pilaitės pr. 16, Vilnius, LT-04352, Lituanie</p>
                        <p><span className="font-medium">Référence:</span> Prestation</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="payment-proof" className="font-medium">
                          Preuve de paiement <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed ${paymentProofMissing ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2`}
                      >
                        {proofOfPayment ? (
                          <div className="flex items-center gap-2 text-brand-blue">
                            <Check className="h-5 w-5" />
                            <span className="font-medium">{proofOfPayment.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className={`h-6 w-6 ${paymentProofMissing ? 'text-red-400' : 'text-gray-400'}`} />
                            <div className="text-center">
                              <p className={`text-sm font-medium ${paymentProofMissing ? 'text-red-600' : 'text-gray-700'}`}>
                                Cliquez pour ajouter une preuve de paiement
                              </p>
                              <p className={`text-xs ${paymentProofMissing ? 'text-red-500' : 'text-gray-500'} mt-1`}>
                                PNG, JPG ou PDF jusqu'à 5 MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      {paymentProofMissing && (
                        <p className="text-sm text-red-500 mt-1">La preuve de paiement est obligatoire pour finaliser votre commande.</p>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        id="payment-proof"
                        accept="image/png,image/jpeg,application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'coupon' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupon-type">Type de coupon</Label>
                      <Select value={couponType} onValueChange={setCouponType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de coupon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Coupon Employé</SelectItem>
                          <SelectItem value="partner">Coupon Partenaire</SelectItem>
                          <SelectItem value="promo">Code Promotionnel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coupon-code">Code</Label>
                      <Input 
                        id="coupon-code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Entrez votre code coupon"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t mt-2 sticky bottom-0 bg-white">
              <Button 
                onClick={handleCompletePayment}
                className="w-full sm:w-auto" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement en cours...' : `Finaliser la commande`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation de virement</AlertDialogTitle>
              <AlertDialogDescription>
                Vous avez choisi le paiement par virement bancaire sans joindre de preuve de paiement. Souhaitez-vous quand même finaliser la commande ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={finishOrder}>Confirmer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default FeaturedCars;
