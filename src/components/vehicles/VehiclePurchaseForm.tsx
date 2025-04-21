
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FilePenLine, Truck, CreditCard } from 'lucide-react';
import PaymentOptions from '@/components/PaymentOptions';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  deliveryNotes?: string;
  paymentMethod: string;
  couponCode?: string;
}

interface VehiclePurchaseFormProps {
  vehicle: ImportedVehicle;
  onSubmit: (data: OrderFormData) => void;
  translations: Record<string, string>;
  onCancel: () => void;
}

const VehiclePurchaseForm: React.FC<VehiclePurchaseFormProps> = ({ 
  vehicle, 
  onSubmit, 
  translations,
  onCancel 
}) => {
  const { translate } = useLanguage();
  const form = useForm<OrderFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      deliveryOption: 'pickup',
      deliveryAddress: '',
      deliveryNotes: '',
      paymentMethod: 'bank-transfer',
      couponCode: '',
    },
  });

  return (
    <div id="payment-form" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {translate("finalizeOrder", translations.finalizeOrder)}
      </h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{translate("vehicle", translations.vehicle)}</span>
          <span>{vehicle.brand} {vehicle.model}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{translate("totalPrice", translations.totalPrice)}</span>
          <span className="font-bold">{vehicle.price.toLocaleString('fr-FR')} €</span>
        </div>
        <div className="flex justify-between items-center text-brand-blue">
          <span className="font-medium">{translate("deposit", translations.deposit)}</span>
          <span className="font-bold">{Math.round(vehicle.price * 0.2).toLocaleString('fr-FR')} €</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FilePenLine className="mr-2 h-5 w-5" />
                {translate("yourInformation", translations.yourInformation)}
              </h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("fullName", translations.fullName)}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("email", translations.email)}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre@email.com" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("phone", translations.phone)}</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 6 12 34 56 78" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                {translate("delivery", translations.delivery)}
              </h3>
              
              <FormField
                control={form.control}
                name="deliveryOption"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{translate("deliveryOption", translations.deliveryOption)}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <label htmlFor="pickup" className="cursor-pointer">
                            {translate("storePickup", translations.storePickup)}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <label htmlFor="delivery" className="cursor-pointer">
                            {translate("homeDelivery", translations.homeDelivery)}
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("deliveryAddress", translations.deliveryAddress)}</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deliveryNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {translate("specialInstructions", translations.specialInstructions)}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={translate("gateCode", translations.gateCode)} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              {translate("paymentMethod", translations.paymentMethod)}
            </h3>
            
            <PaymentOptions 
              onPaymentMethodChange={(method) => form.setValue('paymentMethod', method)}
              price={vehicle.price}
              onPaymentProofChange={() => {}}
              onCouponCodeChange={(code) => form.setValue('couponCode', code)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full md:w-auto"
              onClick={onCancel}
            >
              {translate("cancel", translations.cancel)}
            </Button>
            <Button 
              type="submit" 
              className="w-full md:w-auto md:ml-auto bg-brand-blue hover:bg-brand-darkBlue"
            >
              {translate("confirmOrder", translations.confirmOrder)}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VehiclePurchaseForm;
