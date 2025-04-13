
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

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
  monthlyPayment: Record<string, string>;
  totalCost: Record<string, string>;
  interestRate: Record<string, string>;
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

  const calculateFinancing = (
    price: number,
    contribution: number,
    months: number,
    type: string
  ) => {
    // Taux d'intérêt selon le type de financement (pourcentages simplifiés)
    const rates = {
      credit: 0.0499, // 4.99% pour crédit classique
      loa: 0.0399,    // 3.99% pour LOA
      installment: 0.0299 // 2.99% pour paiement échelonné
    };
    
    const rate = rates[type as keyof typeof rates];
    const loanAmount = price - contribution;
    
    // Calcul de mensualité : M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // où M = mensualité, P = montant emprunté, r = taux périodique, n = nombre de périodes
    const monthlyRate = rate / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    
    // Coût total du crédit
    const totalCost = (monthlyPayment * months) + contribution;
    
    return {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      interestRate: parseFloat((rate * 100).toFixed(2))
    };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation
      const priceValue = parseFloat(vehiclePrice);
      const contributionValue = parseFloat(initialContribution);
      const durationValue = parseInt(duration);
      
      if (isNaN(priceValue) || priceValue <= 0) {
        toast({
          title: "Erreur",
          description: "Le prix du véhicule doit être un nombre positif",
          variant: "destructive"
        });
        return;
      }
      
      if (isNaN(contributionValue) || contributionValue < 0) {
        toast({
          title: "Erreur",
          description: "L'apport initial doit être un nombre positif",
          variant: "destructive"
        });
        return;
      }
      
      if (isNaN(durationValue) || durationValue <= 0) {
        toast({
          title: "Erreur",
          description: "La durée doit être un nombre entier positif",
          variant: "destructive"
        });
        return;
      }
      
      if (contributionValue >= priceValue) {
        toast({
          title: "Erreur",
          description: "L'apport initial ne peut pas être supérieur ou égal au prix du véhicule",
          variant: "destructive"
        });
        return;
      }
      
      // Calcul du financement
      const result = calculateFinancing(priceValue, contributionValue, durationValue, financingType);
      setCalculationResult(result);
      
    } catch (error) {
      console.error('Erreur de calcul:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du calcul",
        variant: "destructive"
      });
    }
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
              <Input
                type="number"
                id="vehicle-price"
                className="pl-8 block w-full"
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
              <Input
                type="number"
                id="initial-contribution"
                className="pl-8 block w-full"
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
            <Input
              type="number"
              id="duration"
              className="block w-full"
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
      
      {/* Affichage des résultats du calcul */}
      {calculationResult && (
        <div className="mt-8 p-6 border border-brand-blue/30 rounded-lg bg-brand-blue/5">
          <h3 className="text-xl font-semibold mb-4 text-center text-brand-blue">Résultat du calcul</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {translations.monthlyPayment ? translate('monthlyPayment', translations.monthlyPayment) : "Mensualité estimée"}
              </p>
              <p className="text-2xl font-bold text-brand-blue">{calculationResult.monthlyPayment} €<span className="text-sm font-normal text-gray-500">/mois</span></p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {translations.totalCost ? translate('totalCost', translations.totalCost) : "Coût total"}
              </p>
              <p className="text-2xl font-bold text-brand-blue">{calculationResult.totalCost} €</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                {translations.interestRate ? translate('interestRate', translations.interestRate) : "Taux d'intérêt"}
              </p>
              <p className="text-2xl font-bold text-brand-blue">{calculationResult.interestRate}%</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Ce calcul est fourni à titre indicatif. Pour une offre personnalisée, veuillez nous contacter.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancingCalculator;
