
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="flex space-x-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className={`text-xs px-2 py-1 ${
            language === lang.code 
              ? "bg-brand-orange hover:bg-brand-darkOrange text-white" 
              : "text-white hover:bg-gray-800/50"
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
