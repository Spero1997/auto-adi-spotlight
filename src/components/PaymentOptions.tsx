import { useState } from 'react';
import { Check, CreditCard, Landmark, Gift, AlertCircle, FileUp, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface PaymentOptionsProps {
  onPaymentMethodChange: (method: string) => void;
  price: number;
  onPaymentProofChange: (file: File | null) => void;
  onCouponCodeChange: (code: string) => void;
}

const PaymentOptions = ({ 
  onPaymentMethodChange, 
  price,
  onPaymentProofChange,
  onCouponCodeChange
}: PaymentOptionsProps) => {
  const { translate } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showCouponFields, setShowCouponFields] = useState(false);
  
  const translations = {
    paymentMethod: {
      FR: "Méthode de paiement",
      EN: "Payment method",
      ES: "Método de pago",
      IT: "Metodo di pagamento",
      PT: "Método de pagamento",
      RO: "Metodă de plată"
    },
    creditCard: {
      FR: "Carte bancaire (actuellement indisponible)",
      EN: "Credit card (currently unavailable)",
      ES: "Tarjeta de crédito (actualmente no disponible)",
      IT: "Carta di credito (attualmente non disponibile)",
      PT: "Cartão de crédito (atualmente indisponível)",
      RO: "Card de credit (momentan indisponibil)"
    },
    bankTransfer: {
      FR: "Virement bancaire",
      EN: "Bank transfer",
      ES: "Transferencia bancaria",
      IT: "Bonifico bancario",
      PT: "Transferência bancária",
      RO: "Transfer bancar"
    },
    rechargeCard: {
      FR: "Coupon de recharge",
      EN: "Recharge coupon",
      ES: "Cupón de recarga",
      IT: "Buono di ricarica",
      PT: "Cupom de recarga",
      RO: "Cupon de reîncărcare"
    },
    selectPaymentMethod: {
      FR: "Sélectionnez un mode de paiement",
      EN: "Select a payment method",
      ES: "Seleccione un método de pago",
      IT: "Seleziona un metodo di pagamento",
      PT: "Selecione um método de pagamento",
      RO: "Selectați o metodă de plată"
    },
    bankDetails: {
      FR: "Coordonnées bancaires",
      EN: "Bank details",
      ES: "Datos bancarios",
      IT: "Coordinate bancarie",
      PT: "Detalhes bancários",
      RO: "Detalii bancare"
    },
    beneficiary: {
      FR: "Bénéficiaire",
      EN: "Beneficiary",
      ES: "Beneficiario",
      IT: "Beneficiario",
      PT: "Beneficiário",
      RO: "Beneficiar"
    },
    iban: {
      FR: "IBAN",
      EN: "IBAN",
      ES: "IBAN",
      IT: "IBAN",
      PT: "IBAN",
      RO: "IBAN"
    },
    swift: {
      FR: "SWIFT/BIC",
      EN: "SWIFT/BIC",
      ES: "SWIFT/BIC",
      IT: "SWIFT/BIC",
      PT: "SWIFT/BIC",
      RO: "SWIFT/BIC"
    },
    bank: {
      FR: "Banque",
      EN: "Bank",
      ES: "Banco",
      IT: "Banca",
      PT: "Banco",
      RO: "Bancă"
    },
    address: {
      FR: "Adresse",
      EN: "Address",
      ES: "Dirección",
      IT: "Indirizzo",
      PT: "Endereço",
      RO: "Adresă"
    },
    reference: {
      FR: "Référence",
      EN: "Reference",
      ES: "Referencia",
      IT: "Riferimento",
      PT: "Referência",
      RO: "Referință"
    },
    amount: {
      FR: "Montant",
      EN: "Amount",
      ES: "Monto",
      IT: "Importo",
      PT: "Montante",
      RO: "Sumă"
    },
    deposit: {
      FR: "Acompte (20%)",
      EN: "Deposit (20%)",
      ES: "Depósito (20%)",
      IT: "Acconto (20%)",
      PT: "Entrada (20%)",
      RO: "Avans (20%)"
    },
    couponType: {
      FR: "Type de coupon",
      EN: "Coupon type",
      ES: "Tipo de cupón",
      IT: "Tipo di buono",
      PT: "Tipo de cupom",
      RO: "Tip de cupon"
    },
    transcash: {
      FR: "Transcash",
      EN: "Transcash",
      ES: "Transcash",
      IT: "Transcash",
      PT: "Transcash",
      RO: "Transcash"
    },
    pcs: {
      FR: "PCS",
      EN: "PCS",
      ES: "PCS",
      IT: "PCS",
      PT: "PCS",
      RO: "PCS"
    },
    neosurf: {
      FR: "Neosurf",
      EN: "Neosurf",
      ES: "Neosurf",
      IT: "Neosurf",
      PT: "Neosurf",
      RO: "Neosurf"
    },
    amazonCard: {
      FR: "Carte Amazon",
      EN: "Amazon Card",
      ES: "Tarjeta Amazon",
      IT: "Carta Amazon",
      PT: "Cartão Amazon",
      RO: "Card Amazon"
    },
    couponCode: {
      FR: "Code du coupon",
      EN: "Coupon code",
      ES: "Código del cupón",
      IT: "Codice del buono",
      PT: "Código do cupom",
      RO: "Cod cupon"
    },
    uploadProof: {
      FR: "Télécharger une preuve de paiement",
      EN: "Upload payment proof",
      ES: "Subir comprobante de pago",
      IT: "Caricare prova di pagamento",
      PT: "Carregar comprovativo de pagamento",
      RO: "Încărcați dovada plății"
    },
    paymentProofRequired: {
      FR: "Une preuve de paiement est requise pour finaliser votre commande",
      EN: "A payment proof is required to finalize your order",
      ES: "Se requiere un comprobante de pago para finalizar su pedido",
      IT: "È richiesta una prova di pagamento per finalizzare l'ordine",
      PT: "É necessário um comprovativo de pagamento para finalizar a sua encomenda",
      RO: "Este necesară o dovadă de plată pentru a finaliza comanda"
    },
    dragFiles: {
      FR: "Glissez-déposez vos fichiers ici ou",
      EN: "Drag and drop your files here or",
      ES: "Arrastre y suelte sus archivos aquí o",
      IT: "Trascina e rilascia i tuoi file qui o",
      PT: "Arraste e solte os seus ficheiros aqui ou",
      RO: "Trageți și plasați fișierele dvs. aici sau"
    },
    browseFiles: {
      FR: "parcourir les fichiers",
      EN: "browse files",
      ES: "explorar archivos",
      IT: "sfoglia i file",
      PT: "procurar ficheiros",
      RO: "răsfoiți fișierele"
    },
    fileTypes: {
      FR: "PDF, JPEG, PNG (Max 10 Mo)",
      EN: "PDF, JPEG, PNG (Max 10 MB)",
      ES: "PDF, JPEG, PNG (Máx 10 MB)",
      IT: "PDF, JPEG, PNG (Max 10 MB)",
      PT: "PDF, JPEG, PNG (Máx 10 MB)",
      RO: "PDF, JPEG, PNG (Max 10 MB)"
    },
    fileSelected: {
      FR: "Fichier sélectionné",
      EN: "File selected",
      ES: "Archivo seleccionado",
      IT: "File selezionato",
      PT: "Ficheiro selecionado",
      RO: "Fișier selectat"
    },
    removeFile: {
      FR: "Supprimer",
      EN: "Remove",
      ES: "Eliminar",
      IT: "Rimuovere",
      PT: "Remover",
      RO: "Elimină"
    },
    unavailable: {
      FR: "Indisponible temporairement",
      EN: "Temporarily unavailable",
      ES: "Temporalmente no disponible",
      IT: "Temporaneamente non disponibile",
      PT: "Temporariamente indisponível",
      RO: "Temporar indisponibil"
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodChange(method);
    
    setShowBankDetails(method === 'bank-transfer');
    setShowCouponFields(method === 'recharge-coupon');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Le fichier est trop volumineux. Maximum 10MB autorisé.");
        return;
      }
      setPaymentProof(file);
      onPaymentProofChange(file);
    }
  };

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    onCouponCodeChange(e.target.value);
  };

  const handleRemoveFile = () => {
    setPaymentProof(null);
    onPaymentProofChange(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold block mb-2">
          {translate('paymentMethod', translations.paymentMethod)}
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className={`cursor-not-allowed opacity-60 border-2 ${selectedMethod === 'credit-card' ? 'border-brand-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-base font-medium text-gray-700">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      {translate('creditCard', translations.creditCard)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate('unavailable', translations.unavailable)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Card 
            className={`cursor-pointer border-2 ${selectedMethod === 'bank-transfer' ? 'border-brand-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => handlePaymentMethodChange('bank-transfer')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base font-medium text-gray-700">
                <Landmark className="h-5 w-5 mr-2 text-blue-600" />
                {translate('bankTransfer', translations.bankTransfer)}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer border-2 ${selectedMethod === 'recharge-coupon' ? 'border-brand-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => handlePaymentMethodChange('recharge-coupon')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base font-medium text-gray-700">
                <Gift className="h-5 w-5 mr-2 text-blue-600" />
                {translate('rechargeCard', translations.rechargeCard)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>

      {showBankDetails && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">
              {translate('bankDetails', translations.bankDetails)}
            </CardTitle>
            <CardDescription>
              {translate('deposit', translations.deposit)}: {(price * 0.2).toFixed(2)}€
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium">{translate('beneficiary', translations.beneficiary)}</Label>
                <Input value="Antonino Truncali" readOnly className="bg-white" />
              </div>
              <div>
                <Label className="font-medium">{translate('iban', translations.iban)}</Label>
                <Input value="IT97E3608105138904017004025" readOnly className="bg-white font-mono" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium">{translate('swift', translations.swift)}</Label>
                <Input value="PPAYITR1XXX" readOnly className="bg-white font-mono" />
              </div>
              <div>
                <Label className="font-medium">{translate('bank', translations.bank)}</Label>
                <Input value="POSTEPAY" readOnly className="bg-white" />
              </div>
            </div>
            <div>
              <Label className="font-medium">{translate('address', translations.address)}</Label>
              <Input value="" readOnly className="bg-white" />
            </div>
          </CardContent>
        </Card>
      )}

      {showCouponFields && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">
              {translate('rechargeCard', translations.rechargeCard)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="font-medium">{translate('couponType', translations.couponType)}</Label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={translate('selectPaymentMethod', translations.selectPaymentMethod)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transcash">{translate('transcash', translations.transcash)}</SelectItem>
                  <SelectItem value="pcs">{translate('pcs', translations.pcs)}</SelectItem>
                  <SelectItem value="neosurf">{translate('neosurf', translations.neosurf)}</SelectItem>
                  <SelectItem value="amazon">{translate('amazonCard', translations.amazonCard)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-medium">{translate('couponCode', translations.couponCode)}</Label>
              <Input 
                value={couponCode} 
                onChange={handleCouponCodeChange} 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                className="bg-white" 
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <div className="flex items-center mb-2">
          <Label className="text-lg font-semibold">
            {translate('uploadProof', translations.uploadProof)}
          </Label>
          <div className="ml-2 text-red-500">
            <AlertCircle size={16} />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {translate('paymentProofRequired', translations.paymentProofRequired)}
        </p>

        {paymentProof ? (
          <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium">{translate('fileSelected', translations.fileSelected)}: {paymentProof.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleRemoveFile} className="text-gray-500">
                <X className="h-4 w-4 mr-1" />
                {translate('removeFile', translations.removeFile)}
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 mb-1">{translate('dragFiles', translations.dragFiles)}</span>
              <span className="text-sm font-medium text-blue-600">{translate('browseFiles', translations.browseFiles)}</span>
              <span className="text-xs text-gray-500 mt-2">{translate('fileTypes', translations.fileTypes)}</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
