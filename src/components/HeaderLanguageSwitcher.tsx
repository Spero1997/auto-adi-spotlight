import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from '@/components/LanguageSwitcher';

const HeaderLanguageSwitcher = () => {
  const isMobile = useIsMobile();
  const { language, translate } = useLanguage();

  return (
    <div className="fixed top-4 left-4 z-50">
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 border-brand-blue/30 text-brand-blue bg-white/90 backdrop-blur-sm"
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
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-brand-blue/30 text-brand-blue bg-white/90 backdrop-blur-sm font-semibold">
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
      )}
    </div>
  );
};

export default HeaderLanguageSwitcher;
