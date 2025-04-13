
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define the Language type
export type Language = 'FR' | 'EN' | 'ES' | 'IT' | 'PT' | 'RO';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string, translations: Record<Language, string>) => string;
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'FR',
  setLanguage: () => {},
  translate: () => '',
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Helper map for language names
export const languageNames: Record<Language, string> = {
  'FR': 'Français',
  'EN': 'English',
  'ES': 'Español',
  'IT': 'Italiano',
  'PT': 'Português',
  'RO': 'Română'
};

// Helper map for language flags
export const languageFlags: Record<Language, string> = {
  'FR': '🇫🇷',
  'EN': '🇬🇧',
  'ES': '🇪🇸',
  'IT': '🇮🇹',
  'PT': '🇵🇹',
  'RO': '🇷🇴'
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('FR');

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setLanguageState(savedLanguage as Language);
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Show toast notification
    const messages: Record<Language, string> = {
      'FR': 'Le site est maintenant en Français',
      'EN': 'The site is now in English',
      'ES': 'El sitio ahora está en Español',
      'IT': 'Il sito è ora in Italiano',
      'PT': 'O site agora está em Português',
      'RO': 'Site-ul este acum în Română'
    };
    
    toast({
      title: languageNames[lang],
      description: messages[lang],
    });
  };

  // Translation function
  const translate = (key: string, translations: Record<Language, string>) => {
    return translations[language] || translations['FR'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
