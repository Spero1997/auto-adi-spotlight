
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  translations: {
    language: Record<string, string>;
  };
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ translations }) => {
  const { translate } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-gray-700 font-montserrat font-light tracking-wide px-5 py-1.5 hover:bg-gray-100 rounded-md transition-all duration-300"
        >
          <Globe className="mr-1 h-4 w-4 text-gray-700" />
          {translate('language', translations.language)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-sm p-1 mt-1 w-40"
      >
        <LanguageSwitcher />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
