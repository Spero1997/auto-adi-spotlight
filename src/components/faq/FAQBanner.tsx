
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate("/faq");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <motion.div 
      className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-10 text-center shadow-sm border border-blue-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <HelpCircle className="h-10 w-10 text-brand-blue" />
      </div>
      <h3 className="text-2xl font-bold mb-4 font-playfair text-gray-800">{title}</h3>
      <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">{description}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          onClick={handleFAQClick}
          className="bg-brand-blue hover:bg-brand-darkBlue text-white px-6 py-6 h-auto text-base font-medium shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          Consulter la FAQ
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button 
          variant="outline" 
          onClick={handleContactClick}
          className="border-brand-blue text-brand-blue hover:bg-blue-50 px-6 py-6 h-auto text-base font-medium shadow-sm hover:shadow-md transition-all duration-300"
        >
          Nous contacter
        </Button>
      </div>
    </motion.div>
  );
};

export default FAQBanner;
