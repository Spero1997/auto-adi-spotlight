
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [calculationResult, setCalculationResult] = useState<{
    monthlyPayment: number;
    totalCost: number;
    interestRate: number;
  } | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert inputs to numbers
    const price = parseFloat(vehiclePrice);
    const contribution = parseFloat(initialContribution);
    const months = parseInt(duration);
    
    // Validate duration between 3 and 120 months
    if (months < 3 || months > 120) {
      toast.error('La durée de remboursement doit être entre 3 et 120 mois');
      return;
    }
    
    if (isNaN(price) || isNaN(contribution) || isNaN(months) || months <= 0) {
      return;
    }

    // Get the amount to finance
    const amountToFinance = price - contribution;
    
    // Set interest rate to 0% for all financing types
    const interestRate = 0;
    
    // Calculate monthly payment (simple division since interest rate is 0%)
    const monthlyPayment = amountToFinance / months;
    
    // Calculate total cost
    const totalCost = monthlyPayment * months + contribution;
    
    // Set the calculation result
    setCalculationResult({
      monthlyPayment,
      totalCost,
      interestRate
    });
    
    setHasCalculated(true);
    
    console.log('Calculating financing:', { 
      vehiclePrice, 
      initialContribution, 
      duration, 
      financingType,
      monthlyPayment,
      totalCost,
      interestRate
    });
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

          {hasCalculated && calculationResult && (
            <div className="md:col-span-2 mt-6 bg-white p-4 rounded-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-brand-blue">Résultats de simulation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-r pr-4">
                  <p className="text-sm text-gray-500">Mensualité estimée</p>
                  <p className="text-xl font-bold">{calculationResult.monthlyPayment.toFixed(2)} €</p>
                </div>
                <div className="border-r pr-4">
                  <p className="text-sm text-gray-500">Coût total</p>
                  <p className="text-xl font-bold">{calculationResult.totalCost.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Taux d'intérêt</p>
                  <p className="text-xl font-bold">{calculationResult.interestRate.toFixed(2)} %</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *Simulation à titre informatif. Les mensualités réelles peuvent varier en fonction de votre profil.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FinancingCalculator;
