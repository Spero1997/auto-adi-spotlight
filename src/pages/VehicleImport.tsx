
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleImporter from '@/components/VehicleImporter';

const VehicleImport = () => {
  return (
    <>
      <Helmet>
        <title>Importation de véhicules | AutoAdi</title>
        <meta name="description" content="Outil d'importation de véhicules depuis des sites de vente automobiles pour AutoAdi" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-2 text-center">Importation de véhicules</h1>
          <p className="text-center text-gray-600 mb-8">
            Importez facilement des véhicules depuis des sites d'annonces automobiles
          </p>
          <VehicleImporter />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleImport;
