
import { Button } from "@/components/ui/button";
import { useLanguage, languageFlags, languageNames } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'FR', label: languageNames.FR },
    { code: 'EN', label: languageNames.EN },
    { code: 'ES', label: languageNames.ES },
    { code: 'IT', label: languageNames.IT },
    { code: 'PT', label: languageNames.PT },
    { code: 'RO', label: languageNames.RO },
  ];
  
  return (
    <div className="grid grid-cols-2 gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="outline"
          size="sm"
          onClick={() => setLanguage(lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO")}
          className={`flex items-center justify-start text-sm px-3 py-2 space-x-2 
            ${language === lang.code 
              ? "bg-brand-blue/10 text-brand-blue font-semibold border-brand-blue" 
              : "text-gray-700 hover:bg-gray-100 border-gray-200"
            }`}
        >
          <span className="text-2xl mr-2">{languageFlags[lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO"]}</span>
          <span className="flex-grow text-left">{lang.label}</span>
          {language === lang.code && <Globe className="w-4 h-4 text-brand-blue" />}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
