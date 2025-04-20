
import { useLanguage } from '@/contexts/LanguageContext';
import QuickSearch from '@/components/QuickSearch';

const HeroContent = () => {
  const { translate, translations } = useLanguage();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg animate-fade-in">
          {translate('welcomeHeader', translations.welcomeHeader)}
        </h1>
        <p className="font-montserrat text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
          {translate('welcomeSubtext', translations.welcomeSubtext)}
        </p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto animate-fade-in animation-delay-300">
        <QuickSearch />
      </div>
    </div>
  );
};

export default HeroContent;
