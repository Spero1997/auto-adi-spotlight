
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const brandsData = [
  {
    name: "Peugeot",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/a/a8/Peugeot_2021.svg/1200px-Peugeot_2021.svg.png",
    link: "/marques/peugeot"
  },
  {
    name: "Renault",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Renault_2009_logo.svg/2560px-Renault_2009_logo.svg.png",
    link: "/marques/renault"
  },
  {
    name: "Citroën",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Citroen_2009_logo.svg/2048px-Citroen_2009_logo.svg.png",
    link: "/marques/citroen"
  },
  {
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1024px-Audi-Logo_2016.svg.png",
    link: "/marques/audi"
  },
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
    link: "/marques/bmw"
  },
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png",
    link: "/marques/mercedes"
  }
];

const Brands = () => {
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
              className="bg-white rounded-lg border border-gray-200 p-6 flex justify-center items-center h-32 card-hover"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-16 max-w-full"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
