
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVehicleDetail } from '@/hooks/useVehicleDetail';
import { useVehicleOrder } from '@/hooks/useVehicleOrder';

// Import the components
import VehicleDetailsHeader from '@/components/vehicle-details/VehicleDetailsHeader';
import VehicleImageGallery from '@/components/vehicle-details/VehicleImageGallery';
import VehicleMainInfo from '@/components/vehicle-details/VehicleMainInfo';
import VehicleSpecs from '@/components/vehicle-details/VehicleSpecs';
import VehicleDetailTabs from '@/components/vehicle-details/VehicleDetailTabs';
import VehicleCharacteristics from '@/components/vehicle-details/VehicleCharacteristics';
import VehicleOrderSummary from '@/components/vehicle-details/VehicleOrderSummary';
import OrderForm from '@/components/vehicle-details/OrderForm';
import VehicleLoading from '@/components/vehicle-details/VehicleLoading';
import VehicleNotFound from '@/components/vehicle-details/VehicleNotFound';

const VehicleDetails = () => {
  // Custom hooks for data fetching and order handling
  const { vehicle, isLoading, notFound, updateImage } = useVehicleDetail();
  const { 
    showPaymentForm,
    handleBuyClick,
    handlePaymentMethodChange,
    handlePaymentProofChange,
    handleCouponCodeChange,
    onSubmitOrder,
    setShowPaymentForm
  } = useVehicleOrder(vehicle);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <VehicleLoading />
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
            <VehicleNotFound />
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : 'Détails du véhicule | AutoAdi'}</title>
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
              <VehicleDetailsHeader />
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <VehicleImageGallery 
                      image={vehicle.image} 
                      images={vehicle.images}
                      brand={vehicle.brand} 
                      model={vehicle.model} 
                    />
                  </div>
                  
                  <div>
                    <VehicleMainInfo 
                      vehicle={vehicle} 
                      onBuyClick={handleBuyClick} 
                      updateImage={updateImage}
                    />
                    
                    <div className="mt-8">
                      <VehicleSpecs 
                        year={vehicle.year}
                        fuelType={vehicle.fuelType}
                        mileage={vehicle.mileage}
                        transmission={vehicle.transmission}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <div id="payment-form" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Finaliser votre achat</h2>
                  
                  <VehicleOrderSummary 
                    brand={vehicle.brand} 
                    model={vehicle.model} 
                    price={vehicle.price} 
                  />
                  
                  <OrderForm
                    onSubmit={onSubmitOrder}
                    onCancel={() => setShowPaymentForm(false)}
                    price={vehicle.price}
                    onPaymentMethodChange={handlePaymentMethodChange}
                    onPaymentProofChange={handlePaymentProofChange}
                    onCouponCodeChange={handleCouponCodeChange}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <VehicleDetailTabs 
                    description={vehicle.description} 
                    features={vehicle.features} 
                  />
                </div>
                
                <div>
                  <VehicleCharacteristics vehicle={vehicle} />
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
