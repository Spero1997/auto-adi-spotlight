
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from '../LanguageSwitcher';
import { menuTranslations } from '@/translations/menuTranslations';

const LanguageSelector = () => {
  const { language, translate } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-brand-blue/30 text-brand-blue font-semibold">
          <Languages className="h-5 w-5" />
          <span>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-sm p-3 w-[470px]"
      >
        <div className="text-sm font-medium text-gray-700 mb-2 px-2 flex items-center gap-2">
          <Languages className="h-4 w-4 text-brand-blue" />
          {translate('selectLanguage', {
            FR: 'Sélectionnez une langue',
            EN: 'Select a language',
            ES: 'Seleccione un idioma',
            IT: 'Seleziona una lingua',
            PT: 'Selecione um idioma',
            RO: 'Selectați o limbă'
          })}
        </div>
        <LanguageSwitcher />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
