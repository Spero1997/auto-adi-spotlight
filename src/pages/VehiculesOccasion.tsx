import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import VehicleCard from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Filter, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import EmptyState from '@/components/EmptyState';
import { getVehiclesByType, getImportedVehicles } from '@/utils/vehicleImportService';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const VehiculesOccasion = () => {
  const { language, translate } = useLanguage();
  
  const translations = {
    pageTitle: {
      FR: "Véhicules d'occasion à vendre | Auto Adi - Achat voiture occasion pas cher",
      EN: "Used vehicles for sale | Auto Adi - Buy affordable used cars",
      ES: "Vehículos usados en venta | Auto Adi - Compre coches usados económicos",
      IT: "Veicoli usati in vendita | Auto Adi - Acquista auto usate a prezzi accessibili",
      PT: "Veículos usados à venda | Auto Adi - Compre carros usados acessíveis",
      RO: "Vehicule second-hand de vânzare | Auto Adi - Cumpărați mașini la prețuri accesibile",
      DE: "Gebrauchtwagen zu verkaufen | Auto Adi - Kaufen Sie günstige Gebrauchtwagen",
      NL: "Gebruikte voertuigen te koop | Auto Adi - Koop betaalbare tweedehands auto's",
      PL: "Używane pojazdy na sprzedaż | Auto Adi - Kup przystępne cenowo używane samochody",
      RU: "Подержанные автомобили на продажу | Auto Adi - Покупайте доступные подержанные автомобили"
    },
    pageDescription: {
      FR: "Achetez une voiture d'occasion pas chère chez Auto Adi. Grand choix de véhicules d'occasion vérifiés et garantis, financement auto taux 0%, livraison gratuite en Europe.",
      EN: "Buy an affordable used car from Auto Adi. Large selection of verified and guaranteed used vehicles, 0% auto financing, free delivery in Europe.",
      ES: "Compre un coche usado económico en Auto Adi. Gran selección de vehículos usados verificados y garantizados, financiación al 0%, entrega gratuita en Europa.",
      IT: "Acquista un'auto usata economica da Auto Adi. Ampia selezione di veicoli usati verificati e garantiti, finanziamento auto 0%, consegna gratuita in Europa.",
      PT: "Compre um carro usado acessível na Auto Adi. Grande selecção de veículos usados verificados e garantidos, financiamento automóvel 0%, entrega gratuita na Europa.",
      RO: "Cumpărați o mașină second-hand la un preț accesibil de la Auto Adi. Selecție largă de vehicule second-hand verificate și garantate, finanțare auto 0%, livrare gratuită în Europa.",
      DE: "Kaufen Sie einen günstigen Gebrauchtwagen bei Auto Adi. Große Auswahl an geprüften und garantierten Gebrauchtwagen, 0% Autofinanzierung, kostenlose Lieferung in Europa.",
      NL: "Koop een betaalbare tweedehands auto bij Auto Adi. Grote selectie geverifieerde en gegarandeerde gebruikte voertuigen, 0% autofinanciering, gratis levering in Europa.",
      PL: "Kup tani używany samochód w Auto Adi. Duży wybór sprawdzonych i gwarantowanych używanych pojazdów, finansowanie samochodu 0%, darmowa dostawa w Europie.",
      RU: "Купите доступный подержанный автомобиль в Auto Adi. Большой выбор проверенных и гарантированных подержанных автомобилей, автофинансирование 0%, бесплатная доставка по Европе."
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand",
      DE: "Gebrauchtwagen",
      NL: "Gebruikte voertuigen",
      PL: "Używane pojazdy",
      RU: "Подержанные автомобили"
    },
    resultsCount: {
      FR: "Résultats",
      EN: "Results",
      ES: "Resultados",
      IT: "Risultati",
      PT: "Resultados",
      RO: "Rezultate",
      DE: "Ergebnisse",
      NL: "Resultaten",
      PL: "Wyniki",
      RU: "Результаты"
    },
    filters: {
      FR: "Filtres",
      EN: "Filters",
      ES: "Filtros",
      IT: "Filtri",
      PT: "Filtros",
      RO: "Filtre",
      DE: "Filter",
      NL: "Filters",
      PL: "Filtry",
      RU: "Фильтры"
    },
    resetFilters: {
      FR: "Réinitialiser les filtres",
      EN: "Reset filters",
      ES: "Reiniciar filtros",
      IT: "Reimposta filtri",
      PT: "Repor filtros",
      RO: "Resetare filtre",
      DE: "Filter zurücksetzen",
      NL: "Filters resetten",
      PL: "Resetuj filtry",
      RU: "Сбросить фильтры"
    }
  };

  // ... keep existing code (component state)
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [modelSearch, setModelSearch] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('price-asc');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const location = useLocation();
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  
  const [filterAirbags, setFilterAirbags] = useState(false);
  const [filterAbs, setFilterAbs] = useState(false);
  const [filterAC, setFilterAC] = useState(false);
  const [filterNavigation, setFilterNavigation] = useState(false);
  const [filterLeather, setFilterLeather] = useState(false);
  const [filterParkingSensors, setFilterParkingSensors] = useState(false);
  
  // ... keep existing code (component functions)
  const applyFilters = () => {
    setFiltersApplied(true);
  };
  
  const resetFilters = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSelectedBrand('');
    setModelSearch('');
    setSelectedFuelType('');
    setFilterAirbags(false);
    setFilterAbs(false);
    setFilterAC(false);
    setFilterNavigation(false);
    setFilterLeather(false);
    setFilterParkingSensors(false);
    setFiltersApplied(false);
  };

  useEffect(() => {
    const brandParam = searchParams.get('marque');
    const modelParam = searchParams.get('modele');
    const budgetParam = searchParams.get('budget');
    const fuelParam = searchParams.get('energie');
    
    if (brandParam) setSelectedBrand(brandParam);
    if (modelParam) setModelSearch(modelParam);
    if (budgetParam) {
      const budget = parseInt(budgetParam);
      setPriceRange([MIN_PRICE, budget]);
    }
    if (fuelParam) setSelectedFuelType(fuelParam);
    
    if (brandParam || modelParam || budgetParam || fuelParam) {
      setFiltersApplied(true);
    }
    
    const loadedVehicles = getImportedVehicles();
    setVehicles(loadedVehicles);
  }, [searchParams]);

  useEffect(() => {
    const checkCatalogFromUrl = async () => {
      const catalogId = getCatalogIdFromUrl();
      if (catalogId) {
        setIsLoadingCatalog(true);
        try {
          const vehicles = getImportedVehicles();
          
          if (vehicles.length > 0) {
            toast.success(`Catalogue de ${vehicles.length} véhicule(s) chargé avec succès`);
            setIsCatalogLoaded(true);
          } else {
            toast.error("Aucun véhicule trouvé dans ce catalogue");
          }
        } catch (error) {
          console.error('Erreur lors du chargement du catalogue:', error);
          toast.error("Erreur lors du chargement du catalogue");
        } finally {
          setIsLoadingCatalog(false);
        }
      }
    };
    
    checkCatalogFromUrl();
    
    const handleCatalogChange = () => {
      console.log("Événement de changement de catalogue détecté");
      window.location.reload();
    };
    
    window.addEventListener('catalogChanged', handleCatalogChange);
    window.addEventListener('vehiclesUpdated', () => {
      setIsCatalogLoaded(true);
    });
    
    return () => {
      window.removeEventListener('catalogChanged', handleCatalogChange);
      window.removeEventListener('vehiclesUpdated', () => {});
    };
  }, [location.search]);
  
  const catalogId = getCatalogIdFromUrl();
  
  return (
    <>
      <Helmet>
        <title>{translate('pageTitle', translations.pageTitle)}</title>
        <meta name="description" content={translate('pageDescription', translations.pageDescription)} />
        <meta name="keywords" content="achat voiture occasion, concessionnaire auto pas cher, financement auto taux 0%, reprise véhicule gratuite, véhicules d'occasion AutoAdi, voiture occasion Florence" />
        <link rel="canonical" href="https://autoadi.com/vehicules/occasion" />
        {vehicles.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(generateVehicleListingSchema(vehicles))}
          </script>
        )}
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{translate('pageTitle', translations.pageTitle)}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translate('pageDescription', translations.pageDescription)}
            </p>
            
            {isLoadingCatalog && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
                  <p className="text-blue-600">{translate('loadingCatalog', translations.loadingCatalog)}</p>
                </div>
              </div>
            )}
            
            {catalogId && isCatalogLoaded && (
              <div className="mt-4 flex justify-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="font-medium">{translate('catalogActive', translations.catalogActive)}</span>
                    <CatalogShare />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-10">
            <Tabs defaultValue="vehicles" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 max-w-md mx-auto">
                <TabsTrigger value="vehicles">
                  <Car className="mr-2 h-4 w-4" />
                  Véhicules
                </TabsTrigger>
                <TabsTrigger value="search">
                  <Filter className="mr-2 h-4 w-4" />
                  Recherche
                </TabsTrigger>
              </TabsList>

              <TabsContent value="vehicles">
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <Button
                      onClick={() => setShowFilters(!showFilters)}
                      variant="outline"
                      className="md:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </Button>
                    
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-sm text-gray-600">Trier par:</span>
                      <Select
                        value={sort}
                        onValueChange={setSort}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-asc">Prix croissant</SelectItem>
                          <SelectItem value="price-desc">Prix décroissant</SelectItem>
                          <SelectItem value="year-desc">Année récente</SelectItem>
                          <SelectItem value="mileage-asc">Kilométrage croissant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <Card className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-bold text-lg">Filtres</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="h-8 px-2 text-gray-500"
                          >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" />
                            Réinitialiser
                          </Button>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Marque</Label>
                            <Select
                              value={selectedBrand}
                              onValueChange={setSelectedBrand}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Toutes les marques" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Toutes les marques</SelectItem>
                                {carBrands.map(brand => (
                                  <SelectItem key={brand} value={brand.toLowerCase()}>
                                    {brand}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Modèle</Label>
                            <Input
                              placeholder="Rechercher un modèle"
                              value={modelSearch}
                              onChange={(e) => setModelSearch(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Carburant</Label>
                            <Select
                              value={selectedFuelType}
                              onValueChange={setSelectedFuelType}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Tous les carburants" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Tous les carburants</SelectItem>
                                {fuelTypes.map(fuel => (
                                  <SelectItem key={fuel} value={fuel.toLowerCase()}>
                                    {fuel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between">
                                <Label>Prix</Label>
                                <span className="text-sm text-gray-500">
                                  {priceRange[0].toLocaleString('fr-FR')} € - {priceRange[1].toLocaleString('fr-FR')} €
                                </span>
                              </div>
                              <Slider
                                defaultValue={[MIN_PRICE, MAX_PRICE]}
                                max={MAX_PRICE}
                                min={MIN_PRICE}
                                step={1000}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="mt-2"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="mb-2 block">Équipements</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="airbags" 
                                  checked={filterAirbags}
                                  onCheckedChange={(checked) => setFilterAirbags(checked as boolean)}
                                />
                                <label
                                  htmlFor="airbags"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Airbags
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="abs" 
                                  checked={filterAbs}
                                  onCheckedChange={(checked) => setFilterAbs(checked as boolean)}
                                />
                                <label
                                  htmlFor="abs"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  ABS
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="ac" 
                                  checked={filterAC}
                                  onCheckedChange={(checked) => setFilterAC(checked as boolean)}
                                />
                                <label
                                  htmlFor="ac"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Climatisation
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="navigation" 
                                  checked={filterNavigation}
                                  onCheckedChange={(checked) => setFilterNavigation(checked as boolean)}
                                />
                                <label
                                  htmlFor="navigation"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Navigation GPS
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="leather" 
                                  checked={filterLeather}
                                  onCheckedChange={(checked) => setFilterLeather(checked as boolean)}
                                />
                                <label
                                  htmlFor="leather"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Intérieur cuir
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="parking" 
                                  checked={filterParkingSensors}
                                  onCheckedChange={(checked) => setFilterParkingSensors(checked as boolean)}
                                />
                                <label
                                  htmlFor="parking"
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Capteurs de stationnement
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full"
                            onClick={applyFilters}
                          >
                            Appliquer les filtres
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="md:col-span-3">
                      <FeaturedCars 
                        searchFilters={{
                          brand: filtersApplied ? selectedBrand === 'all' ? '' : selectedBrand : '',
                          model: filtersApplied ? modelSearch : '',
                          maxPrice: filtersApplied ? priceRange[1] : undefined,
                          fuelType: filtersApplied ? selectedFuelType === 'all' ? '' : selectedFuelType : '',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="search">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center max-w-xl mx-auto">
                      <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
                      <p className="text-gray-600 mb-8">
                        Nous pouvons vous aider à trouver le véhicule idéal correspondant à vos critères. 
                        Contactez notre équipe ou importez des véhicules d'autres sites.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to="/contact">
                          <Button variant="default" className="w-full">
                            Contacter notre équipe
                          </Button>
                        </Link>
                        <Link to="/vehicules/import">
                          <Button variant="outline" className="w-full">
                            Importer des véhicules
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehiculesOccasion;
