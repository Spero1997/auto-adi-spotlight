
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
    <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-2"}`}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size={isMobile ? "lg" : "sm"}
          onClick={() => setLanguage(lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO")}
          className={`flex items-center justify-between text-base px-4 py-3 w-full min-h-[48px] language-button
            ${language === lang.code 
              ? "bg-brand-blue text-white font-medium language-button-active" 
              : "text-gray-700 hover:bg-brand-blue/10 hover:text-brand-blue"
            }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{languageFlags[lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO"]}</span>
            <span>{lang.label}</span>
          </div>
          {language === lang.code && <Check className="w-5 h-5" />}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
