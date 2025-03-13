
import { useState } from 'react';
import { Car, ShieldCheck, Tag, Fuel, Calendar, ChevronRight, ShoppingCart, CreditCard, Building, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenCheckout = (car: CarProps) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  const handleCompletePayment = () => {
    setDialogOpen(false);
    
    toast({
      title: "Commande confirmée",
      description: selectedCar ? `Votre commande pour ${selectedCar.brand} ${selectedCar.model} a été enregistrée. Nous vous contacterons prochainement.` : "Votre commande a été enregistrée.",
    });

    setSelectedCar(null);
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

        {/* Cars grid */}
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

        {/* Payment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle>Finaliser votre achat</DialogTitle>
              <DialogDescription>
                {selectedCar && (
                  <div className="flex items-center mt-4">
                    <img 
                      src={selectedCar.image} 
                      alt={`${selectedCar.brand} ${selectedCar.model}`} 
                      className="w-24 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{selectedCar.brand} {selectedCar.model}</p>
                      <p className="text-brand-blue font-bold">{selectedCar.price.toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex space-x-2 border-b pb-4">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="flex-1"
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
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Numéro de carte</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" />
                    </FormControl>
                  </FormItem>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Date d'expiration</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/AA" />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="123" />
                      </FormControl>
                    </FormItem>
                  </div>
                  
                  <FormItem>
                    <FormLabel>Nom sur la carte</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" />
                    </FormControl>
                  </FormItem>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Après avoir effectué le virement, veuillez cliquer sur "Confirmer la commande". 
                    Nous vous contacterons après vérification du paiement.
                  </p>
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
              >
                Confirmer la commande
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FeaturedCars;
