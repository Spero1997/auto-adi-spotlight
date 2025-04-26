
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicleDetailsTranslations } from '@/translations/vehicleDetailsTranslations';

const VehicleLoadingState = () => {
  const { translate } = useLanguage();
  
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                {translate("loadingVehicle", vehicleDetailsTranslations.FR)}
              </span>
            </div>
            <p className="ml-2">{translate("loadingVehicle", vehicleDetailsTranslations.FR)}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VehicleLoadingState;
