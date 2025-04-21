import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { useLanguage } from '@/contexts/LanguageContext';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleInformation from '@/components/vehicles/VehicleInformation';
import VehiclePurchaseForm from '@/components/vehicles/VehiclePurchaseForm';
import VehicleSpecifications from '@/components/vehicles/VehicleSpecifications';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { translate } = useLanguage();
  const { toast: shadowToast } = useToast();

  const translations = {
    vehicleNotFound: "Véhicule non trouvé",
    vehicleNotFoundDesc: "Désolé, nous n'avons pas trouvé le véhicule que vous recherchez.",
    backToVehicles: "Retour aux véhicules",
    loadingVehicle: "Chargement du véhicule...",
    vehicleDetails: "Détails du véhicule",
    finalizeOrder: "Finaliser la commande",
    fillFormFinalize: "Veuillez remplir le formulaire pour finaliser votre commande",
    orderInitiated: "Commande initiée",
    uploadPaymentProof: "Veuillez télécharger une preuve de paiement",
    error: "Erreur",
    paymentProofRequired: "Une preuve de paiement est requise",
    orderSuccessful: "Commande réussie",
    orderSent: "Commande envoyée",
    orderReceived: "Nous avons bien reçu votre commande",
    orderError: "Erreur lors de la commande",
    orderErrorDesc: "Une erreur est survenue lors de la soumission de votre commande",
    linkCopied: "Lien copié",
    linkCopiedTitle: "Lien copié",
    linkCopiedDesc: "Le lien a été copié dans votre presse-papiers",
    noImageAvailable: "Aucune image disponible",
    year: "Année",
    fuel: "Carburant",
    mileage: "Kilométrage",
    transmission: "Transmission",
    notSpecified: "Non spécifié",
    buyVehicle: "Acheter ce véhicule",
    share: "Partager",
    vehicle: "Véhicule",
    totalPrice: "Prix total",
    deposit: "Acompte",
    yourInformation: "Vos informations",
    fullName: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    delivery: "Livraison",
    deliveryOption: "Option de livraison",
    storePickup: "Retrait en magasin",
    homeDelivery: "Livraison à domicile",
    deliveryAddress: "Adresse de livraison",
    specialInstructions: "Instructions spéciales",
    gateCode: "Code d'accès, instructions...",
    paymentMethod: "Méthode de paiement",
    cancel: "Annuler",
    confirmOrder: "Confirmer la commande",
    description: "Description",
    features: "Équipements",
    vehicleDescription: "Description du véhicule",
    noDescriptionAvailable: "Aucune description disponible",
    equipmentAndOptions: "Équipements et options",
    noFeaturesSpecified: "Aucun équipement spécifié",
    characteristics: "Caractéristiques",
    brand: "Marque",
    model: "Modèle",
    exteriorColor: "Couleur extérieure",
    interiorColor: "Couleur intérieure",
    doors: "Portes",
    engine: "Moteur",
    warranty: "Garantie incluse",
  };

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

  const handleOrderSubmit = async (data: any) => {
    if (!vehicle) return;
    
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
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  {translate("loadingVehicle", translations.loadingVehicle)}
                </span>
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
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                {translate("vehicleNotFound", translations.vehicleNotFound)}
              </h1>
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
        <title>
          {vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : translate("vehicleDetails", translations.vehicleDetails) + ' | AutoAdi'}
        </title>
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
                    <VehicleGallery
                      images={vehicle.images}
                      image={vehicle.image}
                      brand={vehicle.brand}
                      model={vehicle.model}
                      translations={translations}
                    />
                  </div>
                  
                  <div>
                    <VehicleInformation
                      vehicle={vehicle}
                      onBuyClick={handleBuyClick}
                      translations={translations}
                    />
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <VehiclePurchaseForm
                  vehicle={vehicle}
                  onSubmit={handleOrderSubmit}
                  translations={translations}
                  onCancel={() => setShowPaymentForm(false)}
                />
              )}
              
              <VehicleSpecifications
                vehicle={vehicle}
                translations={translations}
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleDetails;
