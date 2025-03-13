
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Car, ShieldCheck, Fuel, Calendar, RefreshCw, Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

// Types
interface CarProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  price: number;
  image: string;
  transmission?: string;
  power?: number;
  doors?: number;
  color?: string;
  features?: string[];
}

// Mock data for cars (expanded from FeaturedCars.tsx)
const allCars = [
  {
    id: '1',
    brand: 'Peugeot',
    model: '3008',
    year: 2022,
    mileage: 10000,
    fuelType: 'Diesel',
    price: 27500,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 130,
    doors: 5,
    color: 'Gris',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse', 'Caméra de recul']
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Captur',
    year: 2022,
    mileage: 15000,
    fuelType: 'Essence',
    price: 23500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 115,
    doors: 5,
    color: 'Rouge',
    features: ['Climatisation', 'Bluetooth', 'USB', 'Régulateur de vitesse']
  },
  {
    id: '3',
    brand: 'Citroen',
    model: 'C3',
    year: 2021,
    mileage: 20000,
    fuelType: 'Essence',
    price: 16900,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 82,
    doors: 5,
    color: 'Bleu',
    features: ['Climatisation', 'Bluetooth', 'USB']
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'A3 Sportback',
    year: 2021,
    mileage: 22000,
    fuelType: 'Essence',
    price: 29800,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 150,
    doors: 5,
    color: 'Noir',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse adaptatif', 'Caméra de recul', 'Sièges chauffants']
  },
  {
    id: '5',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    mileage: 18000,
    fuelType: 'Hybride',
    price: 27500,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 122,
    doors: 5,
    color: 'Blanc',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse', 'Caméra de recul']
  },
  {
    id: '6',
    brand: 'Mercedes',
    model: 'Classe A',
    year: 2021,
    mileage: 25000,
    fuelType: 'Diesel',
    price: 31200,
    image: 'https://images.unsplash.com/photo-1617814076668-8d43d0e54a9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 150,
    doors: 5,
    color: 'Gris',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse adaptatif', 'Caméra de recul', 'Sièges chauffants']
  },
  {
    id: '7',
    brand: 'Peugeot',
    model: '208',
    year: 2022,
    mileage: 12000,
    fuelType: 'Diesel',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 100,
    doors: 5,
    color: 'Rouge',
    features: ['Climatisation', 'Bluetooth', 'USB', 'Régulateur de vitesse']
  },
  {
    id: '8',
    brand: 'BMW',
    model: 'Série 1',
    year: 2021,
    mileage: 24000,
    fuelType: 'Essence',
    price: 32500,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 170,
    doors: 5,
    color: 'Bleu',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse adaptatif', 'Caméra de recul', 'Sièges chauffants']
  },
  {
    id: '9',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    mileage: 19000,
    fuelType: 'Diesel',
    price: 25800,
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 115,
    doors: 5,
    color: 'Noir',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse', 'USB']
  },
  {
    id: '10',
    brand: 'Ford',
    model: 'Puma',
    year: 2022,
    mileage: 16000,
    fuelType: 'Essence',
    price: 22900,
    image: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 125,
    doors: 5,
    color: 'Blanc',
    features: ['Climatisation', 'Bluetooth', 'USB', 'Régulateur de vitesse']
  },
  {
    id: '11',
    brand: 'Seat',
    model: 'Leon',
    year: 2021,
    mileage: 21000,
    fuelType: 'Essence',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 130,
    doors: 5,
    color: 'Gris',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse', 'Caméra de recul']
  },
  {
    id: '12',
    brand: 'Kia',
    model: 'Sportage',
    year: 2022,
    mileage: 14000,
    fuelType: 'Hybride',
    price: 29900,
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 160,
    doors: 5,
    color: 'Noir',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse adaptatif', 'Caméra de recul', 'Sièges chauffants']
  },
  {
    id: '13',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2021,
    mileage: 18000,
    fuelType: 'Hybride',
    price: 28500,
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Automatique',
    power: 150,
    doors: 5,
    color: 'Bleu',
    features: ['Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse adaptatif', 'Caméra de recul']
  },
  {
    id: '14',
    brand: 'Fiat',
    model: '500',
    year: 2021,
    mileage: 15000,
    fuelType: 'Essence',
    price: 14900,
    image: 'https://images.unsplash.com/photo-1619405399517-74d0cea8d35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 69,
    doors: 3,
    color: 'Rouge',
    features: ['Climatisation', 'Bluetooth', 'USB']
  },
  {
    id: '15',
    brand: 'Opel',
    model: 'Corsa',
    year: 2022,
    mileage: 12000,
    fuelType: 'Essence',
    price: 17900,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    transmission: 'Manuelle',
    power: 100,
    doors: 5,
    color: 'Blanc',
    features: ['Climatisation', 'Bluetooth', 'USB', 'Régulateur de vitesse']
  }
];

const VehiculesOccasion = () => {
  const { language } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const brandFilter = searchParams.get('brand') || '';
  const modelFilter = searchParams.get('model') || '';
  const fuelFilter = searchParams.get('fuel') || '';
  const transmissionFilter = searchParams.get('transmission') || '';
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Translations
  const translations = {
    fr: {
      title: 'Tous nos véhicules d\'occasion',
      subtitle: 'Découvrez notre sélection de véhicules d\'occasion vérifiés et garantis',
      filters: 'Filtres',
      brand: 'Marque',
      model: 'Modèle',
      fuelType: 'Carburant',
      transmission: 'Transmission',
      priceRange: 'Fourchette de prix',
      minPrice: 'Prix min',
      maxPrice: 'Prix max',
      apply: 'Appliquer',
      reset: 'Réinitialiser',
      resultsCount: 'véhicules trouvés',
      sortBy: 'Trier par',
      priceAsc: 'Prix croissant',
      priceDesc: 'Prix décroissant',
      yearDesc: 'Année récente',
      mileageAsc: 'Kilométrage bas',
      year: 'Année',
      mileage: 'Kilométrage',
      price: 'Prix',
      details: 'Détails',
      contact: 'Contacter',
      allBrands: 'Toutes les marques',
      allModels: 'Tous les modèles',
      allFuels: 'Tous types',
      allTransmissions: 'Toutes',
      automatic: 'Automatique',
      manual: 'Manuelle',
      diesel: 'Diesel',
      petrol: 'Essence',
      hybrid: 'Hybride',
      electric: 'Électrique'
    },
    en: {
      title: 'All our used vehicles',
      subtitle: 'Discover our selection of verified and guaranteed used vehicles',
      filters: 'Filters',
      brand: 'Brand',
      model: 'Model',
      fuelType: 'Fuel type',
      transmission: 'Transmission',
      priceRange: 'Price range',
      minPrice: 'Min price',
      maxPrice: 'Max price',
      apply: 'Apply',
      reset: 'Reset',
      resultsCount: 'vehicles found',
      sortBy: 'Sort by',
      priceAsc: 'Price ascending',
      priceDesc: 'Price descending',
      yearDesc: 'Recent year',
      mileageAsc: 'Low mileage',
      year: 'Year',
      mileage: 'Mileage',
      price: 'Price',
      details: 'Details',
      contact: 'Contact',
      allBrands: 'All brands',
      allModels: 'All models',
      allFuels: 'All types',
      allTransmissions: 'All',
      automatic: 'Automatic',
      manual: 'Manual',
      diesel: 'Diesel',
      petrol: 'Petrol',
      hybrid: 'Hybrid',
      electric: 'Electric'
    },
    es: {
      title: 'Todos nuestros vehículos usados',
      subtitle: 'Descubra nuestra selección de vehículos usados verificados y garantizados',
      filters: 'Filtros',
      brand: 'Marca',
      model: 'Modelo',
      fuelType: 'Tipo de combustible',
      transmission: 'Transmisión',
      priceRange: 'Rango de precios',
      minPrice: 'Precio mín',
      maxPrice: 'Precio máx',
      apply: 'Aplicar',
      reset: 'Reiniciar',
      resultsCount: 'vehículos encontrados',
      sortBy: 'Ordenar por',
      priceAsc: 'Precio ascendente',
      priceDesc: 'Precio descendente',
      yearDesc: 'Año reciente',
      mileageAsc: 'Kilometraje bajo',
      year: 'Año',
      mileage: 'Kilometraje',
      price: 'Precio',
      details: 'Detalles',
      contact: 'Contacto',
      allBrands: 'Todas las marcas',
      allModels: 'Todos los modelos',
      allFuels: 'Todos los tipos',
      allTransmissions: 'Todas',
      automatic: 'Automático',
      manual: 'Manual',
      diesel: 'Diésel',
      petrol: 'Gasolina',
      hybrid: 'Híbrido',
      electric: 'Eléctrico'
    },
    it: {
      title: 'Tutti i nostri veicoli usati',
      subtitle: 'Scopri la nostra selezione di veicoli usati verificati e garantiti',
      filters: 'Filtri',
      brand: 'Marca',
      model: 'Modello',
      fuelType: 'Tipo di carburante',
      transmission: 'Trasmissione',
      priceRange: 'Fascia di prezzo',
      minPrice: 'Prezzo min',
      maxPrice: 'Prezzo max',
      apply: 'Applica',
      reset: 'Azzera',
      resultsCount: 'veicoli trovati',
      sortBy: 'Ordina per',
      priceAsc: 'Prezzo crescente',
      priceDesc: 'Prezzo decrescente',
      yearDesc: 'Anno recente',
      mileageAsc: 'Chilometraggio basso',
      year: 'Anno',
      mileage: 'Chilometraggio',
      price: 'Prezzo',
      details: 'Dettagli',
      contact: 'Contatto',
      allBrands: 'Tutte le marche',
      allModels: 'Tutti i modelli',
      allFuels: 'Tutti i tipi',
      allTransmissions: 'Tutte',
      automatic: 'Automatico',
      manual: 'Manuale',
      diesel: 'Diesel',
      petrol: 'Benzina',
      hybrid: 'Ibrido',
      electric: 'Elettrico'
    },
    pt: {
      title: 'Todos os nossos veículos usados',
      subtitle: 'Descubra a nossa seleção de veículos usados verificados e garantidos',
      filters: 'Filtros',
      brand: 'Marca',
      model: 'Modelo',
      fuelType: 'Tipo de combustível',
      transmission: 'Transmissão',
      priceRange: 'Faixa de preço',
      minPrice: 'Preço mín',
      maxPrice: 'Preço máx',
      apply: 'Aplicar',
      reset: 'Redefinir',
      resultsCount: 'veículos encontrados',
      sortBy: 'Ordenar por',
      priceAsc: 'Preço crescente',
      priceDesc: 'Preço decrescente',
      yearDesc: 'Ano recente',
      mileageAsc: 'Quilometragem baixa',
      year: 'Ano',
      mileage: 'Quilometragem',
      price: 'Preço',
      details: 'Detalhes',
      contact: 'Contacto',
      allBrands: 'Todas as marcas',
      allModels: 'Todos os modelos',
      allFuels: 'Todos os tipos',
      allTransmissions: 'Todas',
      automatic: 'Automático',
      manual: 'Manual',
      diesel: 'Diesel',
      petrol: 'Gasolina',
      hybrid: 'Híbrido',
      electric: 'Elétrico'
    },
    ro: {
      title: 'Toate vehiculele noastre second-hand',
      subtitle: 'Descoperiți selecția noastră de vehicule second-hand verificate și garantate',
      filters: 'Filtre',
      brand: 'Marcă',
      model: 'Model',
      fuelType: 'Tip combustibil',
      transmission: 'Transmisie',
      priceRange: 'Interval de preț',
      minPrice: 'Preț min',
      maxPrice: 'Preț max',
      apply: 'Aplică',
      reset: 'Resetează',
      resultsCount: 'vehicule găsite',
      sortBy: 'Sortează după',
      priceAsc: 'Preț crescător',
      priceDesc: 'Preț descrescător',
      yearDesc: 'An recent',
      mileageAsc: 'Kilometraj redus',
      year: 'An',
      mileage: 'Kilometraj',
      price: 'Preț',
      details: 'Detalii',
      contact: 'Contact',
      allBrands: 'Toate mărcile',
      allModels: 'Toate modelele',
      allFuels: 'Toate tipurile',
      allTransmissions: 'Toate',
      automatic: 'Automată',
      manual: 'Manuală',
      diesel: 'Diesel',
      petrol: 'Benzină',
      hybrid: 'Hibrid',
      electric: 'Electric'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.fr;

  // Filter cars based on search params
  const filteredCars = allCars.filter(car => {
    const matchBrand = !brandFilter || car.brand.toLowerCase() === brandFilter.toLowerCase();
    const matchModel = !modelFilter || car.model.toLowerCase().includes(modelFilter.toLowerCase());
    const matchFuel = !fuelFilter || car.fuelType.toLowerCase() === fuelFilter.toLowerCase();
    const matchTransmission = !transmissionFilter || car.transmission?.toLowerCase() === transmissionFilter.toLowerCase();
    const matchPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    
    return matchBrand && matchModel && matchFuel && matchTransmission && matchPrice;
  });

  // Sorting
  const sortOption = searchParams.get('sort') || 'priceAsc';
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'yearDesc':
        return b.year - a.year;
      case 'mileageAsc':
        return a.mileage - b.mileage;
      default:
        return a.price - b.price;
    }
  });

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const indexOfLastCar = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCar = indexOfLastCar - ITEMS_PER_PAGE;
  const currentCars = sortedCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE);

  // Get unique brands, models, fuel types for filters
  const brands = [...new Set(allCars.map(car => car.brand))];
  const models = [...new Set(allCars.map(car => car.model))];
  const fuelTypes = [...new Set(allCars.map(car => car.fuelType))];
  const transmissions = [...new Set(allCars.map(car => car.transmission).filter(Boolean))];

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set('page', '1');  // Reset to first page when filter changes
    setSearchParams(params);
  };

  // Handle price range filter
  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  const applyPriceRange = () => {
    const params = new URLSearchParams(searchParams);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    params.set('page', '1');  // Reset to first page when price range changes
    setSearchParams(params);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSearchParams(params);
  };

  // Handle page navigation
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter reset
  const resetFilters = () => {
    setSearchParams({ page: '1' });
    setPriceRange([0, 50000]);
  };

  return (
    <>
      <Helmet>
        <title>{t.title} | Auto Adi</title>
      </Helmet>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-gray-600 mx-auto max-w-2xl">{t.subtitle}</p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {t.filters}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.sortBy}:</span>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priceAsc">{t.priceAsc}</SelectItem>
                  <SelectItem value="priceDesc">{t.priceDesc}</SelectItem>
                  <SelectItem value="yearDesc">{t.yearDesc}</SelectItem>
                  <SelectItem value="mileageAsc">{t.mileageAsc}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <div className={`lg:w-1/4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{t.filters}</h2>
                  {isFilterOpen && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Brand filter */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">{t.brand}</label>
                    <Select value={brandFilter} onValueChange={(value) => handleFilterChange('brand', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allBrands} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t.allBrands}</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Model filter */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">{t.model}</label>
                    <Select value={modelFilter} onValueChange={(value) => handleFilterChange('model', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allModels} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t.allModels}</SelectItem>
                        {models.map(model => (
                          <SelectItem key={model} value={model.toLowerCase()}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel type filter */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">{t.fuelType}</label>
                    <Select value={fuelFilter} onValueChange={(value) => handleFilterChange('fuel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allFuels} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t.allFuels}</SelectItem>
                        {fuelTypes.map(fuel => (
                          <SelectItem key={fuel} value={fuel.toLowerCase()}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Transmission filter */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">{t.transmission}</label>
                    <Select value={transmissionFilter} onValueChange={(value) => handleFilterChange('transmission', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allTransmissions} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t.allTransmissions}</SelectItem>
                        {transmissions.map(transmission => (
                          <SelectItem key={transmission} value={transmission?.toLowerCase() || ''}>{transmission}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price range filter */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">{t.priceRange}</label>
                      <span className="text-sm text-gray-500">
                        {priceRange[0]} - {priceRange[1]} €
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 50000]}
                      value={priceRange}
                      min={0}
                      max={50000}
                      step={1000}
                      onValueChange={(values) => handlePriceRangeChange(values as [number, number])}
                      className="mb-5"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">{t.minPrice}</label>
                        <Input
                          type="number"
                          min={0}
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">{t.maxPrice}</label>
                        <Input
                          type="number"
                          min={priceRange[0]}
                          max={50000}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={applyPriceRange}
                    >
                      {t.apply}
                    </Button>
                  </div>

                  <Separator />

                  <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2"
                    onClick={resetFilters}
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t.reset}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:w-3/4">
              {/* Desktop Sort and Results Count */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-medium">{filteredCars.length}</span> {t.resultsCount}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{t.sortBy}:</span>
                  <Select value={sortOption} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priceAsc">{t.priceAsc}</SelectItem>
                      <SelectItem value="priceDesc">{t.priceDesc}</SelectItem>
                      <SelectItem value="yearDesc">{t.yearDesc}</SelectItem>
                      <SelectItem value="mileageAsc">{t.mileageAsc}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Results Count */}
              <div className="lg:hidden mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">{filteredCars.length}</span> {t.resultsCount}
                </p>
              </div>

              {/* Car listings */}
              {filteredCars.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-lg text-gray-600 mb-4">
                    Aucun véhicule ne correspond à vos critères de recherche.
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    {t.reset}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {currentCars.map((car) => (
                    <Card key={car.id} className="overflow-hidden card-hover border border-gray-200">
                      <div className="relative">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                          Occasion
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-xl font-semibold mb-1">{`${car.brand} ${car.model}`}</h3>
                        <div className="text-2xl font-bold text-brand-blue mb-4">
                          {car.price.toLocaleString('fr-FR')} €
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{car.year}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Car className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{car.mileage.toLocaleString('fr-FR')} km</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <ShieldCheck className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Garantie</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="default" className="flex-1 bg-brand-blue hover:bg-brand-darkBlue">
                            {t.details}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                          >
                            {t.contact}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }} 
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // Show current page, first, last, and pages around current page
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              href="#" 
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (page === currentPage - 2 && currentPage > 3) || 
                        (page === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }} 
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VehiculesOccasion;
