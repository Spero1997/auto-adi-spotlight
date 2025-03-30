
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

const VerticalMarquee = () => {
  const { language } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Translations for the marquee items
  const translations = {
    'quality': {
      'FR': 'Qualité garantie 100%',
      'EN': '100% Quality Guaranteed',
      'ES': 'Calidad garantizada 100%',
      'IT': 'Qualità garantita al 100%',
      'PT': 'Qualidade garantida 100%',
      'RO': 'Calitate garantată 100%'
    },
    'process': {
      'FR': 'Processus simple',
      'EN': 'Simple Process',
      'ES': 'Proceso simple',
      'IT': 'Processo semplice',
      'PT': 'Processo simples',
      'RO': 'Proces simplu'
    },
    'trial': {
      'FR': 'Essai gratuit',
      'EN': 'Free Trial',
      'ES': 'Prueba gratuita',
      'IT': 'Prova gratuita',
      'PT': 'Teste gratuito',
      'RO': 'Test gratuit'
    },
    'financing': {
      'FR': 'Financement sur mesure',
      'EN': 'Custom Financing',
      'ES': 'Financiamiento personalizado',
      'IT': 'Finanziamento personalizzato',
      'PT': 'Financiamento personalizado',
      'RO': 'Finanțare personalizată'
    },
    'garage': {
      'FR': 'Service garage',
      'EN': 'Garage Service',
      'ES': 'Servicio de garaje',
      'IT': 'Servizio officina',
      'PT': 'Serviço de garagem',
      'RO': 'Service garaj'
    },
    'exchange': {
      'FR': 'Échange facile et rapide',
      'EN': 'Quick and Easy Exchange',
      'ES': 'Intercambio fácil y rápido',
      'IT': 'Scambio facile e veloce',
      'PT': 'Troca fácil e rápida',
      'RO': 'Schimb ușor și rapid'
    },
    'rating': {
      'FR': '⭐️⭐️⭐️⭐️⭐️ 4.8/5',
      'EN': '⭐️⭐️⭐️⭐️⭐️ 4.8/5',
      'ES': '⭐️⭐️⭐️⭐️⭐️ 4.8/5',
      'IT': '⭐️⭐️⭐️⭐️⭐️ 4.8/5',
      'PT': '⭐️⭐️⭐️⭐️⭐️ 4.8/5',
      'RO': '⭐️⭐️⭐️⭐️⭐️ 4.8/5'
    }
  };

  // Get translated items
  const items = [
    translations.quality[language],
    translations.process[language],
    translations.trial[language], 
    translations.financing[language],
    translations.garage[language],
    translations.exchange[language],
    translations.rating[language]
  ];
  
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items, ...items];
  
  // Animate scrolling
  useEffect(() => {
    const scrollHeight = items.length * 40; // Height of each item approximately 40px
    const animationSpeed = 30; // Lower number means slower animation
    
    const animationFrame = () => {
      setScrollPosition(prev => {
        if (prev >= scrollHeight) {
          return 0;
        }
        return prev + 0.5;
      });
    };
    
    const intervalId = setInterval(animationFrame, animationSpeed);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [items.length]);

  return (
    <div className="h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="h-[120px] overflow-hidden relative w-full">
        <div 
          className="absolute left-0 right-0 transition-transform" 
          style={{ transform: `translateY(-${scrollPosition}px)` }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="py-2 text-center">
              <p className="text-sm font-medium">• {item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalMarquee;
