
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';

const VehicleImport = () => {
  return (
    <>
      <Helmet>
        <title>Importation de véhicules | AutoAdi</title>
        <meta name="description" content="Outil d'importation de véhicules pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <VehicleImporter />
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleImport;
