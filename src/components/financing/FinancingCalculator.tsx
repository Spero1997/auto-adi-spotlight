import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

type FinancingCalculatorTranslations = {
  simulateFinancing: Record<string, string>;
  useCalculator: Record<string, string>;
  vehiclePrice: Record<string, string>;
  initialContribution: Record<string, string>;
  durationInMonths: Record<string, string>;
  financingType: Record<string, string>;
  calculatePayments: Record<string, string>;
  traditionalCredit: Record<string, string>;
  leaseWithOption: Record<string, string>;
  installmentPayment: Record<string, string>;
}

type FinancingCalculatorProps = {
  translations: FinancingCalculatorTranslations;
}

const FinancingCalculator = ({ translations }: FinancingCalculatorProps) => {
  const { translate } = useLanguage();
  const [vehiclePrice, setVehiclePrice] = useState<string>('25000');
  const [initialContribution, setInitialContribution] = useState<string>('5000');
  const [duration, setDuration] = useState<string>('48');
  const [financingType, setFinancingType] = useState<string>('credit');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculation logic would go here - keeping this the same as the original
    console.log('Calculating financing:', { vehiclePrice, initialContribution, duration, financingType });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{translate('simulateFinancing', translations.simulateFinancing)}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {translate('useCalculator', translations.useCalculator)}
        </p>
      </div>
      
      <form onSubmit={handleCalculate} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="vehicle-price" className="block text-sm font-medium text-gray-700 mb-1">
              {translate('vehiclePrice', translations.vehiclePrice)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">€</span>
              <input
                type="number"
                id="vehicle-price"
                className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                placeholder="25000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="initial-contribution" className="block text-sm font-medium text-gray-700 mb-1">
              {translate('initialContribution', translations.initialContribution)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">€</span>
              <input
                type="number"
                id="initial-contribution"
                className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
                placeholder="5000"
                value={initialContribution}
                onChange={(e) => setInitialContribution(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              {translate('durationInMonths', translations.durationInMonths)}
            </label>
            <input
              type="number"
              id="duration"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
              placeholder="48"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="financing-type" className="block text-sm font-medium text-gray-700 mb-1">
              {translate('financingType', translations.financingType)}
            </label>
            <select
              id="financing-type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue"
              value={financingType}
              onChange={(e) => setFinancingType(e.target.value)}
            >
              <option value="credit">{translate('traditionalCredit', translations.traditionalCredit)}</option>
              <option value="loa">{translate('leaseWithOption', translations.leaseWithOption)}</option>
              <option value="installment">{translate('installmentPayment', translations.installmentPayment)}</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-darkBlue">
              {translate('calculatePayments', translations.calculatePayments)}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinancingCalculator;
