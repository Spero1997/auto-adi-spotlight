
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicleDetailsTranslations } from '@/translations/vehicleDetailsTranslations';

const VehicleNotFound = () => {
  const { translate } = useLanguage();
  
  return (
    <>
      <Header />
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {translate("vehicleNotFound", vehicleDetailsTranslations.FR)}
            </h1>
            <p className="text-gray-600 mb-6">
              {translate("vehicleNotFoundDesc", vehicleDetailsTranslations.FR)}
            </p>
            <Link to="/vehicules/occasion">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {translate("backToVehicles", vehicleDetailsTranslations.FR)}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VehicleNotFound;
