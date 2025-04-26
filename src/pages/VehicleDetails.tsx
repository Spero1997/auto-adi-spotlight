
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { useLanguage } from '@/contexts/LanguageContext';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleInformation from '@/components/vehicles/VehicleInformation';
import VehiclePurchaseForm from '@/components/vehicles/VehiclePurchaseForm';
import VehicleSpecifications from '@/components/vehicles/VehicleSpecifications';
import VehicleLoadingState from '@/components/vehicles/VehicleLoadingState';
import VehicleNotFound from '@/components/vehicles/VehicleNotFound';
import { useVehicleDetails } from '@/hooks/useVehicleDetails';
import { vehicleDetailsTranslations } from '@/translations/vehicleDetailsTranslations';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { vehicle, isLoading, notFound } = useVehicleDetails(id);
  const { translate } = useLanguage();
  const { toast: shadowToast } = useToast();

  const handleBuyClick = () => {
    setShowPaymentForm(true);
    toast.success(translate("fillFormFinalize", vehicleDetailsTranslations.FR));
    shadowToast({
      title: translate("orderInitiated", vehicleDetailsTranslations.FR),
      description: translate("fillFormFinalize", vehicleDetailsTranslations.FR),
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
        toast.success(translate("orderSuccessful", vehicleDetailsTranslations.FR));
        shadowToast({
          title: translate("orderSent", vehicleDetailsTranslations.FR),
          description: translate("orderReceived", vehicleDetailsTranslations.FR),
        });
        setShowPaymentForm(false);
      } else {
        throw new Error("Échec de l'envoi de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      toast.error(translate("orderError", vehicleDetailsTranslations.FR));
      shadowToast({
        variant: "destructive",
        title: translate("error", vehicleDetailsTranslations.FR),
        description: translate("orderErrorDesc", vehicleDetailsTranslations.FR),
      });
    }
  };

  if (isLoading) {
    return <VehicleLoadingState />;
  }

  if (notFound) {
    return <VehicleNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>
          {vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : translate("vehicleDetails", vehicleDetailsTranslations.FR) + ' | AutoAdi'}
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
                  {translate("backToVehicles", vehicleDetailsTranslations.FR)}
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
                      translations={vehicleDetailsTranslations.FR}
                    />
                  </div>
                  
                  <div>
                    <VehicleInformation
                      vehicle={vehicle}
                      onBuyClick={handleBuyClick}
                      translations={vehicleDetailsTranslations.FR}
                    />
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <VehiclePurchaseForm
                  vehicle={vehicle}
                  onSubmit={handleOrderSubmit}
                  translations={vehicleDetailsTranslations.FR}
                  onCancel={() => setShowPaymentForm(false)}
                />
              )}
              
              <VehicleSpecifications
                vehicle={vehicle}
                translations={vehicleDetailsTranslations.FR}
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
