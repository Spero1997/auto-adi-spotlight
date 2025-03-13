
import { ArrowRight, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Updated brands data with more reliable logo sources or brand names only
const brandsData = [
  {
    name: "Peugeot",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/peugeot"
  },
  {
    name: "Renault",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/renault"
  },
  {
    name: "Citroën",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/citroen"
  },
  {
    name: "Audi",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/audi"
  },
  {
    name: "BMW",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/bmw"
  },
  {
    name: "Mercedes",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/mercedes"
  },
  {
    name: "Volkswagen",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/volkswagen"
  },
  {
    name: "Toyota",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/toyota"
  },
  {
    name: "Honda",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/honda"
  },
  {
    name: "Ford",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/ford"
  },
  {
    name: "Hyundai",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/hyundai"
  },
  {
    name: "Nissan",
    logo: "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png", // Using local image from public folder
    link: "/marques/nissan"
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
              className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-center h-32 card-hover"
            >
              {/* If image status is undefined (still loading) or true (loaded successfully), show the image */}
              {(brandImages[brand.name] === undefined || brandImages[brand.name]) ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 max-w-full mb-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    setBrandImages(prev => ({...prev, [brand.name]: false}));
                  }}
                />
              ) : null}
              
              {/* Always show the brand name for better accessibility */}
              <span className="font-medium text-center">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
