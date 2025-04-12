
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { FilePenLine, Truck, CreditCard } from 'lucide-react';
import PaymentOptions from '@/components/PaymentOptions';

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  deliveryNotes?: string;
  paymentMethod: string;
  couponCode?: string;
}

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  onCancel: () => void;
  price: number;
  onPaymentMethodChange: (method: string) => void;
  onPaymentProofChange: (file: File | null) => void;
  onCouponCodeChange: (code: string) => void;
}

const OrderForm = ({ 
  onSubmit, 
  onCancel, 
  price, 
  onPaymentMethodChange, 
  onPaymentProofChange,
  onCouponCodeChange 
}: OrderFormProps) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FilePenLine className="mr-2 h-5 w-5" /> Vos coordonnées
            </h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Téléphone</FormLabel>
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
              <Truck className="mr-2 h-5 w-5" /> Livraison
            </h3>
            
            <FormField
              control={form.control}
              name="deliveryOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Option de livraison</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <label htmlFor="pickup" className="cursor-pointer">Enlèvement au showroom</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <label htmlFor="delivery" className="cursor-pointer">Livraison à domicile</label>
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
                  <FormLabel>Adresse de livraison</FormLabel>
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
                  <FormLabel>Instructions spéciales (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Code portail, instructions..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" /> Méthode de paiement
          </h3>
          
          <PaymentOptions 
            onPaymentMethodChange={onPaymentMethodChange}
            price={price}
            onPaymentProofChange={onPaymentProofChange}
            onCouponCodeChange={onCouponCodeChange}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full md:w-auto"
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="w-full md:w-auto md:ml-auto bg-brand-blue hover:bg-brand-darkBlue"
          >
            Confirmer la commande
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
