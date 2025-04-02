
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, HelpCircle } from "lucide-react";

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
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 lg:py-20 flex flex-col items-center justify-center text-center">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-brand-blue">404</h1>
            <p className="text-3xl mb-4 text-gray-700 dark:text-gray-300">Page non trouvée</p>
            
            <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 rounded text-left">
              <p className="text-lg text-amber-800 dark:text-amber-300">
                Il semble que vous ayez suivi un lien rompu ou saisi une URL qui n'existe pas sur ce site.
              </p>
            </div>
            
            <div className="mb-8 text-left">
              <h2 className="font-medium text-xl mb-3">Que pouvez-vous faire ?</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Vérifiez l'URL pour des erreurs de frappe</li>
                <li>Utilisez la navigation du site pour trouver ce que vous cherchez</li>
                <li>Retournez à la page d'accueil et recommencez votre navigation</li>
                <li>Contactez-nous si vous pensez qu'il s'agit d'une erreur de notre part</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button className="bg-brand-blue hover:bg-brand-darkBlue transition-colors w-full sm:w-auto px-6 py-3 text-lg">
                  <Home className="h-5 w-5 mr-2" />
                  Accueil
                </Button>
              </Link>
              
              <Link to="/vehicules">
                <Button variant="outline" className="w-full sm:w-auto px-6 py-3 text-lg">
                  <Search className="h-5 w-5 mr-2" />
                  Nos véhicules
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="ghost" className="w-full sm:w-auto px-6 py-3 text-lg">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <img 
              src="/lovable-uploads/b6183038-034a-4505-9e0a-b6ebbf9a16ab.png" 
              alt="Erreur 404" 
              className="max-w-md rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
