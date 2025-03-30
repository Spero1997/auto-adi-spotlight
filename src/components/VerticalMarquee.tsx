
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const VerticalMarquee = () => {
  const { language } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Animate scrolling with CSS animation
  useEffect(() => {
    const animation = `
      @keyframes scrollVertical {
        from { transform: translateY(0); }
        to { transform: translateY(-${items.length * 40}px); }
      }
    `;
    
    // Add animation to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animation;
    document.head.appendChild(styleElement);
    
    return () => {
      // Clean up
      document.head.removeChild(styleElement);
    };
  }, [items.length]);

  return (
    <div className="h-full flex flex-col items-center justify-center overflow-hidden p-1">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-hidden relative"
        style={{ maxHeight: '60px' }}
      >
        <div 
          className="absolute left-0 right-0 w-full"
          style={{
            animation: `scrollVertical 20s linear infinite`,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div 
              key={index} 
              className="py-2 text-center whitespace-nowrap"
            >
              <p className="text-sm font-medium text-gray-700">• {item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalMarquee;
