
import { Button } from "@/components/ui/button";
import { useLanguage, languageFlags, languageNames } from "@/contexts/LanguageContext";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const languages = [
    { code: 'FR', label: languageNames.FR },
    { code: 'EN', label: languageNames.EN },
    { code: 'ES', label: languageNames.ES },
    { code: 'IT', label: languageNames.IT },
    { code: 'PT', label: languageNames.PT },
    { code: 'RO', label: languageNames.RO },
  ];
  
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setShowScrollButtons(container.scrollHeight > container.clientHeight);
    }
  }, [isMobile]);
  
  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };
  
  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };
  
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        {showScrollButtons && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollUp} 
            className="w-full flex justify-center items-center mb-1 h-8 py-0 text-brand-blue"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}
        
        <div 
          ref={containerRef} 
          className="w-full max-h-[240px] overflow-y-auto language-scroll-container"
        >
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                size="lg"
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
        </div>
        
        {showScrollButtons && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollDown} 
            className="w-full flex justify-center items-center mt-1 h-8 py-0 text-brand-blue"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage(lang.code as "FR" | "EN" | "ES" | "IT" | "PT" | "RO")}
          className={`flex items-center justify-between text-base px-4 py-3 w-full language-button
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
