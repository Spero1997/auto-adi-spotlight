
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Updated brands data with proper logo paths
const brandsData = [
  {
    name: "Peugeot",
    logo: "/lovable-uploads/99e4c269-15bf-4ced-8ed9-f4c03f6f1378.png",
    link: "/marques/peugeot"
  },
  {
    name: "Renault",
    logo: "/lovable-uploads/f9728fa8-3f2a-47a5-9ee8-acb985f96084.png",
    link: "/marques/renault"
  },
  {
    name: "Citroën",
    logo: "/lovable-uploads/f589fba6-8301-4717-8c66-976c7c7bbcd7.png",
    link: "/marques/citroen"
  },
  {
    name: "Audi",
    logo: "/lovable-uploads/b0b6f649-3ce2-455a-99e9-189b91475576.png",
    link: "/marques/audi"
  },
  {
    name: "BMW",
    logo: "/lovable-uploads/c16ba104-bd7b-4103-8664-8e744b0ac0e2.png",
    link: "/marques/bmw"
  },
  {
    name: "Mercedes",
    logo: "/lovable-uploads/0dd80e06-e79c-4aee-98e3-92fdad89a399.png",
    link: "/marques/mercedes"
  },
  {
    name: "Volkswagen",
    logo: "/lovable-uploads/63df3762-9be9-4c57-92f4-a165c500700e.png",
    link: "/marques/volkswagen"
  },
  {
    name: "Toyota",
    logo: "/lovable-uploads/6148daec-b490-4c80-a5c6-634990c2ecd1.png",
    link: "/marques/toyota"
  },
  {
    name: "Honda",
    logo: "/lovable-uploads/3bad6300-9dea-486e-b0cd-a6c2784c35c1.png",
    link: "/marques/honda"
  },
  {
    name: "Ford",
    logo: "/lovable-uploads/0432cb7e-118a-4667-9015-d31062cb8db2.png",
    link: "/marques/ford"
  },
  {
    name: "Hyundai",
    logo: "/lovable-uploads/0467d19e-0099-458b-ad02-3a728b8c0048.png",
    link: "/marques/hyundai"
  },
  {
    name: "Nissan",
    logo: "/lovable-uploads/52ca535e-08c4-44c4-b40e-2610809981e8.png",
    link: "/marques/nissan"
  },
  {
    name: "Range Rover",
    logo: "/lovable-uploads/53e6dee5-6e5b-48db-85d6-065a7bdc8435.png",
    link: "/marques/range-rover"
  }
];

const Brands = () => {
  const [brandImages, setBrandImages] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Create a map to track which images loaded successfully
    const imageLoadStatus: { [key: string]: boolean } = {};
    
    brandsData.forEach(brand => {
      const img = new Image();
      img.onload = () => {
        imageLoadStatus[brand.name] = true;
        setBrandImages({...imageLoadStatus});
      };
      img.onerror = () => {
        imageLoadStatus[brand.name] = false;
        setBrandImages({...imageLoadStatus});
      };
      img.src = brand.logo;
    });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Nos marques</h2>
            <p className="text-gray-600">
              Découvrez notre sélection de véhicules des plus grandes marques
            </p>
          </div>
          <Link
            to="/marques"
            className="mt-4 md:mt-0 flex items-center text-brand-blue hover:underline font-medium"
          >
            Voir toutes les marques <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brandsData.map((brand) => (
            <Link
              key={brand.name}
              to={brand.link}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center items-center h-32 card-hover transition-all hover:shadow-md hover:border-brand-blue"
            >
              {brandImages[brand.name] ? (
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="h-16 w-auto object-contain mb-2" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-pulse bg-gray-200 h-16 w-16 rounded mb-2"></div>
                  <span className="font-medium text-center">{brand.name}</span>
                </div>
              )}
              {brandImages[brand.name] && (
                <span className="text-sm font-medium text-center mt-1">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
