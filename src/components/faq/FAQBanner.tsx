
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQBannerProps {
  title?: string;
  description?: string;
  className?: string;
}

const FAQBanner = ({ 
  title = "Des questions ?", 
  description = "Consultez notre page FAQ ou contactez-nous directement", 
  className = "" 
}: FAQBannerProps) => {
  return (
    <div className={`bg-blue-50 rounded-xl p-8 text-center ${className}`}>
      <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg mb-6">{description}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/faq">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Consulter la FAQ
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Nous contacter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FAQBanner;
