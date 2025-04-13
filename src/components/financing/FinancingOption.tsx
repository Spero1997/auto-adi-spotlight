
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type OptionDetailType = {
  label: string;
  value: string;
};

type FinancingOptionProps = {
  title: string;
  description: string;
  icon: ReactNode;
  color: string; // brand-blue, brand-orange, brand-green
  details: OptionDetailType[];
  benefits: string[];
  requestQuoteText: string;
  isPopular?: boolean;
  popularText?: string;
};

const FinancingOption = ({
  title,
  description,
  icon,
  color,
  details,
  benefits,
  requestQuoteText,
  isPopular = false,
  popularText = ''
}: FinancingOptionProps) => {
  const { language } = useLanguage();

  return (
    <Card className={`border-t-4 border-t-${color} shadow-lg hover:shadow-xl transition-shadow`}>
      <CardContent className="pt-6">
        {isPopular && (
          <div className={`absolute top-0 right-0 bg-${color} text-white px-4 py-1 text-sm font-semibold rounded-bl-lg`}>
            {popularText}
          </div>
        )}
        
        <div className="mb-6">
          <div className={`bg-${color}/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        
        <div className="mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                <span className="text-gray-600">{detail.label}</span>
                <span className="font-semibold">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{benefit}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Link to="/contact" className="w-full">
            <Button className={`w-full bg-${color} hover:bg-${color.replace('brand-', 'brand-dark')}`}>
              {requestQuoteText}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancingOption;
