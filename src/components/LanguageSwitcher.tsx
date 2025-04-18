
import { Button } from "@/components/ui/button";
import { useLanguage, languageFlags, languageNames } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  
  const languages = [
    { code: 'FR', label: languageNames.FR },
    { code: 'EN', label: languageNames.EN },
    { code: 'ES', label: languageNames.ES },
    { code: 'IT', label: languageNames.IT },
    { code: 'PT', label: languageNames.PT },
    { code: 'RO', label: languageNames.RO },
  ];
  
  return (
    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} gap-2`}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage(lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO")}
          className={`flex items-center justify-between text-sm px-3 py-2 w-full
            ${language === lang.code 
              ? "bg-brand-blue text-white font-medium" 
              : "text-gray-700 hover:bg-brand-blue/10 hover:text-brand-blue"
            }`}
        >
          <div className="flex items-center space-x-1">
            <span className="text-lg">{languageFlags[lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO"]}</span>
            <span>{lang.label}</span>
          </div>
          {language === lang.code && <Check className="w-4 h-4" />}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
