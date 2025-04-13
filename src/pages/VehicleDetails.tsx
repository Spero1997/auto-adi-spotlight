
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Car, ChevronLeft, Calendar, Fuel, ShieldCheck, ShoppingCart, Ruler, Info, Palette, Cog, Check, CreditCard, Truck, FilePenLine, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import PaymentOptions from '@/components/PaymentOptions';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { getVehicleDetailsTranslations } from '@/utils/vehicleDetailsTranslations';

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  deliveryNotes?: string;
  paymentMethod: string;
  couponCode?: string;
}

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast: shadowToast } = useToast();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const { translate, language } = useLanguage();
  
  // Obtenir les traductions pour la page de détails du véhicule
  const translations = getVehicleDetailsTranslations();
  
  const form = useForm<OrderFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      deliveryOption: 'pickup',
      deliveryAddress: '',
      deliveryNotes: '',
      paymentMethod: 'bank-transfer',
      couponCode: '',
    },
  });
  
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    try {
      if (id.includes('kia-sorento')) {
        updateKiaSorentoImage();
      }
      
      if (id.includes('porsche-cayenne')) {
        addPorscheCayenne();
      }
      
      let vehicles = getImportedVehicles('featured');
      console.log("Véhicules chargés du catalogue vedette:", vehicles.length);
      
      let foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      
      if (!foundVehicle) {
        vehicles = getImportedVehicles('standard');
        console.log("Véhicules chargés du catalogue standard:", vehicles.length);
        foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      }
      
      if (!foundVehicle) {
        vehicles = getImportedVehicles();
        console.log("Véhicules chargés de tous les catalogues:", vehicles.length);
        
        foundVehicle = vehicles.find(v => 
          v.id === id || 
          v.id.includes(id) || 
          id.includes(v.id) || 
          id.toLowerCase().includes(v.brand.toLowerCase()) || 
          id.toLowerCase().includes(v.model.toLowerCase()) ||
          `${v.brand.toLowerCase()}-${v.model.toLowerCase()}`.includes(id.toLowerCase())
        );
      }
      
      if (foundVehicle) {
        console.log("Véhicule trouvé:", foundVehicle);
        console.log("ID du véhicule:", foundVehicle.id);
        console.log("URL de l'image:", foundVehicle.image);
        console.log("Lien Facebook:", foundVehicle.fbLink || "Aucun lien Facebook");
        setVehicle(foundVehicle);
      } else {
        console.error("Véhicule non trouvé avec l'ID:", id);
        setNotFound(true);
        toast.error(translate("vehicleNotFound", translations.vehicleNotFound));
      }
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule:", error);
      toast.error(translate("vehicleNotFound", translations.vehicleNotFound));
    } finally {
      setIsLoading(false);
    }
  }, [id, translate]);
  
  const handleBuyClick = () => {
    console.log("Bouton Acheter cliqué");
    setShowPaymentForm(true);
    toast.success(translate("fillFormFinalize", translations.fillFormFinalize));
    shadowToast({
      title: translate("orderInitiated", translations.orderInitiated),
      description: translate("fillFormFinalize", translations.fillFormFinalize),
    });
    
    setTimeout(() => {
      document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    form.setValue('paymentMethod', method);
  };
  
  const handlePaymentProofChange = (file: File | null) => {
    setPaymentProof(file);
  };
  
  const handleCouponCodeChange = (code: string) => {
    setCouponCode(code);
    form.setValue('couponCode', code);
  };
  
  const onSubmitOrder = async (data: OrderFormData) => {
    if (!vehicle) return;
    
    if (paymentMethod !== 'cash' && !paymentProof) {
      toast.error(translate("uploadPaymentProof", translations.uploadPaymentProof));
      shadowToast({
        variant: "destructive",
        title: translate("error", translations.error),
        description: translate("paymentProofRequired", translations.paymentProofRequired),
      });
      return;
    }
    
    try {
      const orderData = {
        ...data,
        carModel: `${vehicle.brand} ${vehicle.model}`,
        price: vehicle.price,
        deposit: Math.round(vehicle.price * 0.2),
      };
      
      const result = await sendOrderConfirmationEmail(orderData);
      
      if (result) {
        toast.success(translate("orderSuccessful", translations.orderSuccessful));
        shadowToast({
          title: translate("orderSent", translations.orderSent),
          description: translate("orderReceived", translations.orderReceived),
        });
        setShowPaymentForm(false);
        form.reset();
      } else {
        throw new Error("Échec de l'envoi de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      toast.error(translate("orderError", translations.orderError));
      shadowToast({
        variant: "destructive",
        title: translate("error", translations.error),
        description: translate("orderErrorDesc", translations.orderErrorDesc),
      });
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">{translate("loadingVehicle", translations.loadingVehicle)}</span>
              </div>
              <p className="ml-2">{translate("loadingVehicle", translations.loadingVehicle)}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-red-600 mb-4">{translate("vehicleNotFound", translations.vehicleNotFound)}</h1>
              <p className="text-gray-600 mb-6">
                {translate("vehicleNotFoundDesc", translations.vehicleNotFoundDesc)}
              </p>
              <Link to="/vehicules/occasion">
                <Button>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {translate("backToVehicles", translations.backToVehicles)}
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : translate("vehicleDetails", translations.vehicleDetails) + ' | AutoAdi'}</title>
        <meta 
          name="description" 
          content={vehicle ? `Découvrez ${vehicle.brand} ${vehicle.model} ${vehicle.year} d'occasion chez AutoAdi. ${vehicle.mileage} km, ${vehicle.fuelType}, ${vehicle.price.toLocaleString('fr-FR')}€.` : 'Détails du véhicule d\'occasion chez AutoAdi'}
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {vehicle && (
            <>
              <div className="mb-6">
                <Link to="/vehicules/occasion" className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {translate("backToVehicles", translations.backToVehicles)}
                </Link>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
                      {vehicle.image ? (
                        <>
                          <img 
                            src={vehicle.image} 
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error("Erreur de chargement de l'image:", vehicle.image);
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                            }}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <p className="text-gray-500">{translate("noImageAvailable", translations.noImageAvailable)}</p>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {translate("used", translations.used)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h1>
                      <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString('fr-FR')} km • {vehicle.fuelType}</p>
                    </div>
                    
                    <div className="text-3xl font-bold text-brand-blue">
                      {vehicle.price.toLocaleString('fr-FR')} €
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("year", translations.year)}</p>
                          <p className="font-medium">{vehicle.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("fuel", translations.fuel)}</p>
                          <p className="font-medium">{vehicle.fuelType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("mileage", translations.mileage)}</p>
                          <p className="font-medium">{vehicle.mileage.toLocaleString('fr-FR')} km</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cog className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("transmission", translations.transmission)}</p>
                          <p className="font-medium">{vehicle.transmission || translate("notSpecified", translations.notSpecified)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <Button 
                        variant="default" 
                        className="w-full md:w-auto flex-1 bg-brand-blue hover:bg-brand-darkBlue"
                        onClick={handleBuyClick}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {translate("buyVehicle", translations.buyVehicle)}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full md:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => {
                          navigator.share({
                            title: `${vehicle.brand} ${vehicle.model} - AutoAdi`,
                            text: `Découvrez cette ${vehicle.brand} ${vehicle.model} d'occasion chez AutoAdi`,
                            url: window.location.href
                          }).catch(() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success(translate("linkCopied", translations.linkCopied));
                            shadowToast({
                              title: translate("linkCopiedTitle", translations.linkCopiedTitle),
                              description: translate("linkCopiedDesc", translations.linkCopiedDesc),
                            });
                          });
                        }}
                      >
                        {translate("share", translations.share)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <div id="payment-form" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">{translate("finalizeOrder", translations.finalizeOrder)}</h2>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{translate("vehicle", translations.vehicle)}</span>
                      <span>{vehicle.brand} {vehicle.model}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{translate("totalPrice", translations.totalPrice)}</span>
                      <span className="font-bold">{vehicle.price.toLocaleString('fr-FR')} €</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-blue">
                      <span className="font-medium">{translate("deposit", translations.deposit)}</span>
                      <span className="font-bold">{Math.round(vehicle.price * 0.2).toLocaleString('fr-FR')} €</span>
                    </div>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitOrder)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center"><FilePenLine className="mr-2 h-5 w-5" /> {translate("yourInformation", translations.yourInformation)}</h3>
                          
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{translate("fullName", translations.fullName)}</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" required {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{translate("email", translations.email)}</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="votre@email.com" required {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{translate("phone", translations.phone)}</FormLabel>
                                <FormControl>
                                  <Input placeholder="+33 6 12 34 56 78" required {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center"><Truck className="mr-2 h-5 w-5" /> {translate("delivery", translations.delivery)}</h3>
                          
                          <FormField
                            control={form.control}
                            name="deliveryOption"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>{translate("deliveryOption", translations.deliveryOption)}</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="pickup" id="pickup" />
                                      <label htmlFor="pickup" className="cursor-pointer">{translate("storePickup", translations.storePickup)}</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="delivery" id="delivery" />
                                      <label htmlFor="delivery" className="cursor-pointer">{translate("homeDelivery", translations.homeDelivery)}</label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="deliveryAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{translate("deliveryAddress", translations.deliveryAddress)}</FormLabel>
                                <FormControl>
                                  <Input placeholder="Votre adresse complète" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="deliveryNotes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{translate("specialInstructions", translations.specialInstructions)}</FormLabel>
                                <FormControl>
                                  <Input placeholder={translate("gateCode", translations.gateCode)} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center"><CreditCard className="mr-2 h-5 w-5" /> {translate("paymentMethod", translations.paymentMethod)}</h3>
                        
                        <PaymentOptions 
                          onPaymentMethodChange={handlePaymentMethodChange}
                          price={vehicle.price}
                          onPaymentProofChange={handlePaymentProofChange}
                          onCouponCodeChange={handleCouponCodeChange}
                        />
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 pt-6">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full md:w-auto"
                          onClick={() => setShowPaymentForm(false)}
                        >
                          {translate("cancel", translations.cancel)}
                        </Button>
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto md:ml-auto bg-brand-blue hover:bg-brand-darkBlue"
                        >
                          {translate("confirmOrder", translations.confirmOrder)}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="description">
                        <Info className="mr-2 h-4 w-4" />
                        {translate("description", translations.description)}
                      </TabsTrigger>
                      <TabsTrigger value="features">
                        <Check className="mr-2 h-4 w-4" />
                        {translate("features", translations.features)}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("vehicleDescription", translations.vehicleDescription)}</h2>
                      {vehicle.description ? (
                        <div className="text-gray-700 space-y-4 whitespace-pre-line">
                          {vehicle.description}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">{translate("noDescriptionAvailable", translations.noDescriptionAvailable)}</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="features" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("equipmentAndOptions", translations.equipmentAndOptions)}</h2>
                      {vehicle.features && vehicle.features.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          {vehicle.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-brand-blue mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">{translate("noFeaturesSpecified", translations.noFeaturesSpecified)}</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("characteristics", translations.characteristics)}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("brand", translations.brand)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.brand}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("model", translations.model)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.model}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("year", translations.year)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.year}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("mileage", translations.mileage)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.mileage.toLocaleString('fr-FR')} km</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("fuel", translations.fuel)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.fuelType}</div>
                        </div>
                        {vehicle.transmission && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("transmission", translations.transmission)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.transmission}</div>
                          </div>
                        )}
                        {vehicle.exteriorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("exteriorColor", translations.exteriorColor)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.exteriorColor}</div>
                          </div>
                        )}
                        {vehicle.interiorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("interiorColor", translations.interiorColor)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.interiorColor}</div>
                          </div>
                        )}
                        {vehicle.doors && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("doors", translations.doors)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.doors}</div>
                          </div>
                        )}
                        {vehicle.engine && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("engine", translations.engine)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.engine}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>{translate("warranty", translations.warranty)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleDetails;
