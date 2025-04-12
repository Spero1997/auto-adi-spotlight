
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-brand-blue">404</h1>
          <p className="text-3xl mb-6 text-gray-700">Page non trouvée</p>
          <p className="text-xl text-gray-600 mb-10 max-w-lg">
            Nous sommes désolés, mais la page que vous recherchez n'existe pas.
          </p>
          
          <Link to="/">
            <Button className="bg-brand-blue hover:bg-brand-darkBlue transition-colors px-6 py-3 text-lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>

          <div className="mt-16">
            <img 
              src="https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" 
              alt="Voiture" 
              className="max-w-[500px] rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
