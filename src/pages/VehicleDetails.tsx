
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Car, ChevronLeft, Calendar, Fuel, ShieldCheck, ShoppingCart, Ruler, Info, Palette, Cog, Check } from 'lucide-react';
import { toast } from 'sonner';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    try {
      const vehicles = getImportedVehicles();
      const foundVehicle = vehicles.find(v => v.id === id);
      
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        setNotFound(true);
        toast.error("Véhicule non trouvé");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule:", error);
      toast.error("Erreur lors du chargement du véhicule");
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Chargement...</span>
              </div>
              <p className="ml-2">Chargement du véhicule...</p>
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
              <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
              <p className="text-gray-600 mb-6">
                Le véhicule que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <Link to="/vehicules/occasion">
                <Button>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Retour aux véhicules d'occasion
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
              <div className="mb-6">
                <Link to="/vehicules/occasion" className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Retour aux véhicules d'occasion
                </Link>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
                      <img 
                        src={vehicle.image || 'https://via.placeholder.com/800x600?text=No+Image'} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Occasion
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
                          <p className="text-sm text-gray-500">Année</p>
                          <p className="font-medium">{vehicle.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Carburant</p>
                          <p className="font-medium">{vehicle.fuelType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Kilométrage</p>
                          <p className="font-medium">{vehicle.mileage.toLocaleString('fr-FR')} km</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cog className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Transmission</p>
                          <p className="font-medium">{vehicle.transmission || 'Non spécifié'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <Button 
                        variant="default" 
                        className="w-full md:w-auto flex-1 bg-brand-blue hover:bg-brand-darkBlue"
                        onClick={() => {
                          toast.info("Veuillez consulter la page des véhicules pour acheter ce véhicule");
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Acheter ce véhicule
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
                            toast.success("Lien copié dans le presse-papier");
                          });
                        }}
                      >
                        Partager
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="description">
                        <Info className="mr-2 h-4 w-4" />
                        Description
                      </TabsTrigger>
                      <TabsTrigger value="features">
                        <Check className="mr-2 h-4 w-4" />
                        Équipements
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">Description du véhicule</h2>
                      {vehicle.description ? (
                        <div className="text-gray-700 space-y-4 whitespace-pre-line">
                          {vehicle.description}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Aucune description disponible pour ce véhicule.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="features" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">Équipements et options</h2>
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
                        <p className="text-gray-500 italic">Aucun équipement spécifié pour ce véhicule.</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">Marque</div>
                          <div className="text-sm font-medium text-right">{vehicle.brand}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">Modèle</div>
                          <div className="text-sm font-medium text-right">{vehicle.model}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">Année</div>
                          <div className="text-sm font-medium text-right">{vehicle.year}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">Kilométrage</div>
                          <div className="text-sm font-medium text-right">{vehicle.mileage.toLocaleString('fr-FR')} km</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">Carburant</div>
                          <div className="text-sm font-medium text-right">{vehicle.fuelType}</div>
                        </div>
                        {vehicle.transmission && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">Transmission</div>
                            <div className="text-sm font-medium text-right">{vehicle.transmission}</div>
                          </div>
                        )}
                        {vehicle.exteriorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">Couleur extérieure</div>
                            <div className="text-sm font-medium text-right">{vehicle.exteriorColor}</div>
                          </div>
                        )}
                        {vehicle.interiorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">Couleur intérieure</div>
                            <div className="text-sm font-medium text-right">{vehicle.interiorColor}</div>
                          </div>
                        )}
                        {vehicle.doors && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">Portes</div>
                            <div className="text-sm font-medium text-right">{vehicle.doors}</div>
                          </div>
                        )}
                        {vehicle.engine && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">Moteur</div>
                            <div className="text-sm font-medium text-right">{vehicle.engine}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>Garantie 12 mois minimum</span>
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
