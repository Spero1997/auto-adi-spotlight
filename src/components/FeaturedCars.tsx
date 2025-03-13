
import { useState } from 'react';
import { Car, ShieldCheck, Tag, Fuel, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CarProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  price: number;
  image: string;
  condition: 'new' | 'used';
}

const cars: CarProps[] = [
  {
    id: '1',
    brand: 'Peugeot',
    model: '3008',
    year: 2023,
    mileage: 1500,
    fuelType: 'Hybride',
    price: 38900,
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    condition: 'new'
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
    condition: 'used'
  },
  {
    id: '3',
    brand: 'Citroën',
    model: 'C5 Aircross',
    year: 2023,
    mileage: 500,
    fuelType: 'Diesel',
    price: 35400,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    condition: 'new'
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
    condition: 'used'
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
    condition: 'used'
  },
  {
    id: '6',
    brand: 'BMW',
    model: 'X3',
    year: 2023,
    mileage: 1000,
    fuelType: 'Hybride',
    price: 55900,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    condition: 'new'
  }
];

const FeaturedCars = () => {
  const [filter, setFilter] = useState<'all' | 'new' | 'used'>('all');
  
  const filteredCars = filter === 'all'
    ? cars
    : cars.filter(car => car.condition === filter);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos véhicules à la une</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules neufs et d'occasion vérifiés et garantis pour répondre à tous vos besoins.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`px-6 py-2 font-medium ${filter === 'all' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setFilter('all')}
            >
              Tous
            </button>
            <button
              className={`px-6 py-2 font-medium ${filter === 'new' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setFilter('new')}
            >
              Neufs
            </button>
            <button
              className={`px-6 py-2 font-medium ${filter === 'used' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setFilter('used')}
            >
              Occasion
            </button>
          </div>
        </div>

        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden card-hover border border-gray-200">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                {car.condition === 'new' ? (
                  <div className="absolute top-2 right-2 bg-brand-blue text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Neuf
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Occasion
                  </div>
                )}
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
                  <Link to={`/vehicules/${car.id}`} className="flex-1">
                    <Button variant="default" className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                      Détails
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/vehicules">
            <Button className="bg-white border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors px-6 py-3 rounded-md font-semibold inline-flex items-center">
              Voir tous nos véhicules
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
