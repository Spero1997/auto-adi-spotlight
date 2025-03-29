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

// Helper function to detect browser language and map it to supported languages
const detectBrowserLanguage = (): Language => {
  // Get browser language, e.g. "en-US", "fr-FR", etc.
  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang.split('-')[0].toUpperCase();
  
  // Map language codes to appropriate languages
  const languageMap: Record<string, Language> = {
    'FR': 'FR', // French (France, Belgium, Canada, etc.)
    'EN': 'EN', // English (US, UK, etc.)
    'ES': 'ES', // Spanish (Spain, Mexico, etc.)
    'IT': 'IT', // Italian
    'PT': 'PT', // Portuguese
    'RO': 'RO', // Romanian
  };
  
  // Country code mapping for specific regions
  const countryMap: Record<string, Language> = {
    'US': 'EN', // United States
    'GB': 'EN', // United Kingdom
    'CA': 'FR', // Canada (defaulting to French, could be more complex)
    'FR': 'FR', // France
    'BE': 'FR', // Belgium
    'ES': 'ES', // Spain
    'MX': 'ES', // Mexico
    'IT': 'IT', // Italy
  };
  
  // Try to get country code from the full language string
  const countryCode = browserLang.split('-')[1]?.toUpperCase();
  
  // First check if we have a specific country mapping
  if (countryCode && countryMap[countryCode]) {
    return countryMap[countryCode];
  }
  
  // Otherwise use the language code if supported
  if (languageMap[langCode]) {
    return languageMap[langCode];
  }
  
  // Default to French if no match
  return 'FR';
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('FR');

  // Load language preference from localStorage on component mount
  // If no preference is found, detect browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setLanguageState(savedLanguage as Language);
    } else {
      // Auto-detect language based on browser settings
      const detectedLanguage = detectBrowserLanguage();
      setLanguageState(detectedLanguage);
      localStorage.setItem('preferredLanguage', detectedLanguage);
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
