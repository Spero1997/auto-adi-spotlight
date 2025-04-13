
import React, { createContext, useState, useContext, useEffect } from 'react';

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
