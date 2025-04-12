
import { useState } from 'react';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { OrderFormData } from '@/components/vehicle-details/OrderForm';
import { ImportedVehicle } from '@/utils/types/vehicle';

export const useVehicleOrder = (vehicle: ImportedVehicle | null) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const { toast: shadowToast } = useToast();
  
  const handleBuyClick = () => {
    console.log("Bouton Acheter cliqué");
    setShowPaymentForm(true);
    toast.success("Vous pouvez maintenant finaliser votre achat");
    shadowToast({
      title: "Commande initiée",
      description: "Veuillez remplir le formulaire pour finaliser votre achat",
    });
    
    setTimeout(() => {
      document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  
  const handlePaymentProofChange = (file: File | null) => {
    setPaymentProof(file);
  };
  
  const handleCouponCodeChange = (code: string) => {
    setCouponCode(code);
  };
  
  const onSubmitOrder = async (data: OrderFormData) => {
    if (!vehicle) return;
    
    if (paymentMethod !== 'cash' && !paymentProof) {
      toast.error("Veuillez télécharger une preuve de paiement");
      shadowToast({
        variant: "destructive",
        title: "Erreur",
        description: "Une preuve de paiement est requise pour finaliser votre commande",
      });
      return;
    }
    
    try {
      const orderData = {
        ...data,
        carModel: `${vehicle.brand} ${vehicle.model}`,
        price: vehicle.price,
        deposit: Math.round(vehicle.price * 0.2),
      };
      
      const result = await sendOrderConfirmationEmail(orderData);
      
      if (result) {
        toast.success("Votre commande a été enregistrée avec succès");
        shadowToast({
          title: "Commande envoyée",
          description: "Nous avons bien reçu votre demande d'achat",
        });
        setShowPaymentForm(false);
      } else {
        throw new Error("Échec de l'envoi de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      toast.error("Une erreur s'est produite lors de l'envoi de votre commande");
      shadowToast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer votre commande pour le moment. Veuillez réessayer plus tard.",
      });
    }
  };
  
  return {
    showPaymentForm,
    paymentMethod,
    couponCode,
    handleBuyClick,
    handlePaymentMethodChange,
    handlePaymentProofChange,
    handleCouponCodeChange,
    onSubmitOrder,
    setShowPaymentForm
  };
};
