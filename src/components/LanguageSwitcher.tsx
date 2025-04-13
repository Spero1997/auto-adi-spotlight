
import { Button } from "@/components/ui/button";
import { useLanguage, languageFlags, languageNames } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'FR', label: 'FR' },
    { code: 'EN', label: 'EN' },
    { code: 'ES', label: 'ES' },
    { code: 'IT', label: 'IT' },
    { code: 'PT', label: 'PT' },
    { code: 'RO', label: 'RO' },
  ];
  
  return (
    <div className="grid grid-cols-2 gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO")}
          className={`flex items-center justify-start text-sm px-2 py-1 ${
            language === lang.code 
              ? "bg-brand-orange/20 text-brand-orange font-medium" 
              : "text-white hover:bg-white/10"
          }`}
        >
          <span className="mr-2">{languageFlags[lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO"]}</span>
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
