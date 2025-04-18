
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LanguageSwitcher from '../LanguageSwitcher';

const MobileLanguageSelector = () => {
  const { language, translate } = useLanguage();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="mr-2 flex items-center gap-1 border-brand-blue/30 text-brand-blue"
        >
          <Languages className="h-4 w-4" />
          <span>{language}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6 pt-2">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center space-x-2 mb-4 p-2 border-b border-gray-100">
            <Languages className="h-6 w-6 text-brand-blue" />
            <div className="font-semibold text-brand-darkBlue text-lg">
              {translate('selectLanguage', {
                FR: 'Sélectionnez une langue',
                EN: 'Select a language',
                ES: 'Seleccione un idioma',
                IT: 'Seleziona una lingua',
                PT: 'Selecione um idioma',
                RO: 'Selectați o limbă'
              })}
            </div>
          </div>
          <LanguageSwitcher />
          <DrawerClose className="mt-4 w-full">
            <Button variant="outline" className="w-full">
              {translate('close', {
                FR: 'Fermer',
                EN: 'Close',
                ES: 'Cerrar',
                IT: 'Chiudi',
                PT: 'Fechar',
                RO: 'Închide'
              })}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileLanguageSelector;
