
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage, Language } from '@/contexts/LanguageContext';

type SpecialOfferTranslations = {
  specialOffer: Record<Language, string>;
  cashDiscount: Record<Language, string>;
}

type SpecialOfferProps = {
  translations: SpecialOfferTranslations;
}

const SpecialOffer = ({ translations }: SpecialOfferProps) => {
  const { translate } = useLanguage();

  return (
    <Alert className="mb-12 bg-gray-50 border-brand-blue/30">
      <AlertCircle className="h-5 w-5 text-brand-blue" />
      <AlertTitle className="text-brand-blue font-semibold">
        {translate('specialOffer', translations.specialOffer)}
      </AlertTitle>
      <AlertDescription>
        {translate('cashDiscount', translations.cashDiscount)}
      </AlertDescription>
    </Alert>
  );
};

export default SpecialOffer;
