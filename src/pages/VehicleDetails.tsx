import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { Car, ChevronLeft, Calendar, Fuel, ShieldCheck, ShoppingCart, Ruler, Info, Palette, Cog, Check, CreditCard, Truck, FilePenLine, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import PaymentOptions from '@/components/PaymentOptions';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { useLanguage, Language } from '@/contexts/LanguageContext';

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

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast: shadowToast } = useToast();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const { translate, language } = useLanguage();
  
  const translations = {
    vehicleDetails: {
      FR: "Détails du véhicule",
      EN: "Vehicle details",
      ES: "Detalles del vehículo",
      IT: "Dettagli del veicolo",
      PT: "Detalhes do veículo",
      RO: "Detalii vehicul"
    },
    loadingVehicle: {
      FR: "Chargement du véhicule...",
      EN: "Loading vehicle...",
      ES: "Cargando vehículo...",
      IT: "Caricamento veicolo...",
      PT: "Carregando veículo...",
      RO: "Încărcare vehicul..."
    },
    vehicleNotFound: {
      FR: "Véhicule non trouvé",
      EN: "Vehicle not found",
      ES: "Vehículo no encontrado",
      IT: "Veicolo non trovato",
      PT: "Veículo não encontrado",
      RO: "Vehicul negăsit"
    },
    vehicleNotFoundDesc: {
      FR: "Le véhicule que vous recherchez n'existe pas ou a été supprimé.",
      EN: "The vehicle you are looking for does not exist or has been removed.",
      ES: "El vehículo que está buscando no existe o ha sido eliminado.",
      IT: "Il veicolo che stai cercando non esiste o è stato rimosso.",
      PT: "O veículo que procura não existe ou foi removido.",
      RO: "Vehiculul pe care îl căutați nu există sau a fost eliminat."
    },
    backToVehicles: {
      FR: "Retour aux véhicules d'occasion",
      EN: "Back to used vehicles",
      ES: "Volver a vehículos usados",
      IT: "Torna ai veicoli usati",
      PT: "Voltar para veículos usados",
      RO: "Înapoi la vehicule second-hand"
    },
    year: {
      FR: "Année",
      EN: "Year",
      ES: "Año",
      IT: "Anno",
      PT: "Ano",
      RO: "An"
    },
    fuel: {
      FR: "Carburant",
      EN: "Fuel",
      ES: "Combustible",
      IT: "Carburante",
      PT: "Combustível",
      RO: "Combustibil"
    },
    mileage: {
      FR: "Kilométrage",
      EN: "Mileage",
      ES: "Kilometraje",
      IT: "Chilometraggio",
      PT: "Quilometragem",
      RO: "Kilometraj"
    },
    transmission: {
      FR: "Transmission",
      EN: "Transmission",
      ES: "Transmisión",
      IT: "Trasmissione",
      PT: "Transmissão",
      RO: "Transmisie"
    },
    notSpecified: {
      FR: "Non spécifié",
      EN: "Not specified",
      ES: "No especificado",
      IT: "Non specificato",
      PT: "Não especificado",
      RO: "Nespecificat"
    },
    buyVehicle: {
      FR: "Acheter ce véhicule",
      EN: "Buy this vehicle",
      ES: "Comprar este vehículo",
      IT: "Acquista questo veicolo",
      PT: "Comprar este veículo",
      RO: "Cumpără acest vehicul"
    },
    share: {
      FR: "Partager",
      EN: "Share",
      ES: "Compartir",
      IT: "Condividere",
      PT: "Compartilhar",
      RO: "Distribuie"
    },
    linkCopied: {
      FR: "Lien copié dans le presse-papier",
      EN: "Link copied to clipboard",
      ES: "Enlace copiado al portapapeles",
      IT: "Link copiato negli appunti",
      PT: "Link copiado para a área de transferência",
      RO: "Link copiat în clipboard"
    },
    linkCopiedTitle: {
      FR: "Lien copié",
      EN: "Link copied",
      ES: "Enlace copiado",
      IT: "Link copiato",
      PT: "Link copiado",
      RO: "Link copiat"
    },
    linkCopiedDesc: {
      FR: "L'URL a été copiée dans votre presse-papier",
      EN: "The URL has been copied to your clipboard",
      ES: "La URL se ha copiado en su portapapeles",
      IT: "L'URL è stata copiata negli appunti",
      PT: "O URL foi copiado para a sua área de transferência",
      RO: "URL-ul a fost copiat în clipboard"
    },
    finalizeOrder: {
      FR: "Finaliser votre achat",
      EN: "Finalize your purchase",
      ES: "Finalizar su compra",
      IT: "Finalizza il tuo acquisto",
      PT: "Finalize sua compra",
      RO: "Finalizați achiziția"
    },
    vehicle: {
      FR: "Véhicule:",
      EN: "Vehicle:",
      ES: "Vehículo:",
      IT: "Veicolo:",
      PT: "Veículo:",
      RO: "Vehicul:"
    },
    totalPrice: {
      FR: "Prix total:",
      EN: "Total price:",
      ES: "Precio total:",
      IT: "Prezzo totale:",
      PT: "Preço total:",
      RO: "Preț total:"
    },
    deposit: {
      FR: "Acompte (20%):",
      EN: "Deposit (20%):",
      ES: "Depósito (20%):",
      IT: "Deposito (20%):",
      PT: "Depósito (20%):",
      RO: "Avans (20%):"
    },
    yourInformation: {
      FR: "Vos coordonnées",
      EN: "Your information",
      ES: "Su información",
      IT: "Le tue informazioni",
      PT: "Suas informações",
      RO: "Informațiile dvs."
    },
    fullName: {
      FR: "Nom complet",
      EN: "Full name",
      ES: "Nombre completo",
      IT: "Nome completo",
      PT: "Nome completo",
      RO: "Nume complet"
    },
    email: {
      FR: "Email",
      EN: "Email",
      ES: "Correo electrónico",
      IT: "Email",
      PT: "Email",
      RO: "Email"
    },
    phone: {
      FR: "Téléphone",
      EN: "Phone",
      ES: "Teléfono",
      IT: "Telefono",
      PT: "Telefone",
      RO: "Telefon"
    },
    delivery: {
      FR: "Livraison",
      EN: "Delivery",
      ES: "Entrega",
      IT: "Consegna",
      PT: "Entrega",
      RO: "Livrare"
    },
    deliveryOption: {
      FR: "Option de livraison",
      EN: "Delivery option",
      ES: "Opción de entrega",
      IT: "Opzione di consegna",
      PT: "Opção de entrega",
      RO: "Opțiune de livrare"
    },
    storePickup: {
      FR: "Enlèvement au showroom",
      EN: "Store pickup",
      ES: "Recogida en tienda",
      IT: "Ritiro in negozio",
      PT: "Retirada na loja",
      RO: "Ridicare din showroom"
    },
    homeDelivery: {
      FR: "Livraison à domicile",
      EN: "Home delivery",
      ES: "Entrega a domicilio",
      IT: "Consegna a domicilio",
      PT: "Entrega em domicílio",
      RO: "Livrare la domiciliu"
    },
    deliveryAddress: {
      FR: "Adresse de livraison",
      EN: "Delivery address",
      ES: "Dirección de entrega",
      IT: "Indirizzo di consegna",
      PT: "Endereço de entrega",
      RO: "Adresa de livrare"
    },
    specialInstructions: {
      FR: "Instructions spéciales (optionnel)",
      EN: "Special instructions (optional)",
      ES: "Instrucciones especiales (opcional)",
      IT: "Istruzioni speciali (opzionale)",
      PT: "Instruções especiais (opcional)",
      RO: "Instrucțiuni speciale (opțional)"
    },
    gateCode: {
      FR: "Code portail, instructions...",
      EN: "Gate code, instructions...",
      ES: "Código de puerta, instrucciones...",
      IT: "Codice cancello, istruzioni...",
      PT: "Código de portão, instruções...",
      RO: "Cod poartă, instrucțiuni..."
    },
    paymentMethod: {
      FR: "Méthode de paiement",
      EN: "Payment method",
      ES: "Método de pago",
      IT: "Metodo di pagamento",
      PT: "Método de pagamento",
      RO: "Metodă de plată"
    },
    cancel: {
      FR: "Annuler",
      EN: "Cancel",
      ES: "Cancelar",
      IT: "Annulla",
      PT: "Cancelar",
      RO: "Anulare"
    },
    confirmOrder: {
      FR: "Confirmer la commande",
      EN: "Confirm order",
      ES: "Confirmar pedido",
      IT: "Conferma ordine",
      PT: "Confirmar pedido",
      RO: "Confirmă comanda"
    },
    description: {
      FR: "Description",
      EN: "Description",
      ES: "Descripción",
      IT: "Descrizione",
      PT: "Descrição",
      RO: "Descriere"
    },
    features: {
      FR: "Équipements",
      EN: "Features",
      ES: "Características",
      IT: "Caratteristiche",
      PT: "Recursos",
      RO: "Caracteristici"
    },
    vehicleDescription: {
      FR: "Description du véhicule",
      EN: "Vehicle description",
      ES: "Descripción del vehículo",
      IT: "Descrizione del veicolo",
      PT: "Descrição do veículo",
      RO: "Descrierea vehiculului"
    },
    noDescriptionAvailable: {
      FR: "Aucune description disponible pour ce véhicule.",
      EN: "No description available for this vehicle.",
      ES: "No hay descripción disponible para este vehículo.",
      IT: "Nessuna descrizione disponibile per questo veicolo.",
      PT: "Nenhuma descrição disponível para este veículo.",
      RO: "Nu există descriere disponibilă pentru acest vehicul."
    },
    equipmentAndOptions: {
      FR: "Équipements et options",
      EN: "Equipment and options",
      ES: "Equipos y opciones",
      IT: "Equipaggiamenti e opzioni",
      PT: "Equipamentos e opções",
      RO: "Echipamente și opțiuni"
    },
    noFeaturesSpecified: {
      FR: "Aucun équipement spécifié pour ce véhicule.",
      EN: "No features specified for this vehicle.",
      ES: "No se han especificado características para este vehículo.",
      IT: "Nessuna caratteristica specificata per questo veicolo.",
      PT: "Nenhum recurso especificado para este veículo.",
      RO: "Nu sunt specificate caracteristici pentru acest vehicul."
    },
    characteristics: {
      FR: "Caractéristiques",
      EN: "Characteristics",
      ES: "Características",
      IT: "Caratteristiche",
      PT: "Características",
      RO: "Caracteristici"
    },
    brand: {
      FR: "Marque",
      EN: "Brand",
      ES: "Marca",
      IT: "Marca",
      PT: "Marca",
      RO: "Marcă"
    },
    model: {
      FR: "Modèle",
      EN: "Model",
      ES: "Modelo",
      IT: "Modello",
      PT: "Modelo",
      RO: "Model"
    },
    exteriorColor: {
      FR: "Couleur extérieure",
      EN: "Exterior color",
      ES: "Color exterior",
      IT: "Colore esterno",
      PT: "Cor exterior",
      RO: "Culoare exterioară"
    },
    interiorColor: {
      FR: "Couleur intérieure",
      EN: "Interior color",
      ES: "Color interior",
      IT: "Colore interno",
      PT: "Cor interior",
      RO: "Culoare interioară"
    },
    doors: {
      FR: "Portes",
      EN: "Doors",
      ES: "Puertas",
      IT: "Porte",
      PT: "Portas",
      RO: "Uși"
    },
    engine: {
      FR: "Moteur",
      EN: "Engine",
      ES: "Motor",
      IT: "Motore",
      PT: "Motor",
      RO: "Motor"
    },
    warranty: {
      FR: "Garantie 12 mois minimum",
      EN: "Minimum 12-month warranty",
      ES: "Garantía mínima de 12 meses",
      IT: "Garanzia minima di 12 mesi",
      PT: "Garantia mínima de 12 meses",
      RO: "Garanție minimă de 12 luni"
    },
    orderInitiated: {
      FR: "Commande initiée",
      EN: "Order initiated",
      ES: "Pedido iniciado",
      IT: "Ordine avviato",
      PT: "Pedido iniciado",
      RO: "Comandă inițiată"
    },
    fillFormFinalize: {
      FR: "Veuillez remplir le formulaire pour finaliser votre achat",
      EN: "Please fill out the form to finalize your purchase",
      ES: "Por favor, rellene el formulario para finalizar su compra",
      IT: "Si prega di compilare il modulo per finalizzare l'acquisto",
      PT: "Por favor, preencha o formulário para finalizar sua compra",
      RO: "Vă rugăm să completați formularul pentru a finaliza achiziția"
    },
    uploadPaymentProof: {
      FR: "Veuillez télécharger une preuve de paiement",
      EN: "Please upload proof of payment",
      ES: "Por favor, suba un comprobante de pago",
      IT: "Si prega di caricare la prova di pagamento",
      PT: "Por favor, carregue um comprovativo de pagamento",
      RO: "Vă rugăm să încărcați dovada de plată"
    },
    error: {
      FR: "Erreur",
      EN: "Error",
      ES: "Error",
      IT: "Errore",
      PT: "Erro",
      RO: "Eroare"
    },
    paymentProofRequired: {
      FR: "Une preuve de paiement est requise pour finaliser votre commande",
      EN: "A proof of payment is required to finalize your order",
      ES: "Se requiere un comprobante de pago para finalizar su pedido",
      IT: "È richiesta una prova di pagamento per finalizzare l'ordine",
      PT: "É necessário um comprovativo de pagamento para finalizar o seu pedido",
      RO: "Este necesară o dovadă de plată pentru a finaliza comanda"
    },
    orderSuccessful: {
      FR: "Votre commande a été enregistrée avec succès",
      EN: "Your order has been successfully registered",
      ES: "Su pedido ha sido registrado con éxito",
      IT: "Il tuo ordine è stato registrato con successo",
      PT: "O seu pedido foi registado com sucesso",
      RO: "Comanda dvs. a fost înregistrată cu succes"
    },
    orderSent: {
      FR: "Commande envoyée",
      EN: "Order sent",
      ES: "Pedido enviado",
      IT: "Ordine inviato",
      PT: "Pedido enviado",
      RO: "Comandă trimisă"
    },
    orderReceived: {
      FR: "Nous avons bien reçu votre demande d'achat",
      EN: "We have received your purchase request",
      ES: "Hemos recibido su solicitud de compra",
      IT: "Abbiamo ricevuto la tua richiesta di acquisto",
      PT: "Recebemos o seu pedido de compra",
      RO: "Am primit cererea dvs. de achiziție"
    },
    orderError: {
      FR: "Une erreur s'est produite lors de l'envoi de votre commande",
      EN: "An error occurred while sending your order",
      ES: "Se produjo un error al enviar su pedido",
      IT: "Si è verificato un errore durante l'invio del tuo ordine",
      PT: "Ocorreu um erro ao enviar o seu pedido",
      RO: "A apărut o eroare la trimiterea comenzii"
    },
    orderErrorDesc: {
      FR: "Impossible d'envoyer votre commande pour le moment. Veuillez réessayer plus tard.",
      EN: "Unable to send your order at this time. Please try again later.",
      ES: "No se puede enviar su pedido en este momento. Por favor, inténtelo de nuevo más tarde.",
      IT: "Impossibile inviare il tuo ordine in questo momento. Riprova più tardi.",
      PT: "Não é possível enviar o seu pedido neste momento. Por favor, tente novamente mais tarde.",
      RO: "Nu se poate trimite comanda dvs. în acest moment. Vă rugăm să încercați din nou mai târziu."
    },
    used: {
      FR: "Occasion",
      EN: "Used",
      ES: "Usado",
      IT: "Usato",
      PT: "Usado",
      RO: "Folosit"
    },
    noImageAvailable: {
      FR: "Aucune image disponible",
      EN: "No image available",
      ES: "No hay imagen disponible",
      IT: "Nessuna immagine disponibile",
      PT: "Nenhuma imagem disponível",
      RO: "Nicio imagine disponibilă"
    }
  };
  
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
  
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    try {
      if (id.includes('kia-sorento')) {
        updateKiaSorentoImage();
      }
      
      if (id.includes('porsche-cayenne')) {
        addPorscheCayenne();
      }
      
      let vehicles = getImportedVehicles('featured');
      console.log("Véhicules chargés du catalogue vedette:", vehicles.length);
      
      let foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      
      if (!foundVehicle) {
        vehicles = getImportedVehicles('standard');
        console.log("Véhicules chargés du catalogue standard:", vehicles.length);
        foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      }
      
      if (!foundVehicle) {
        vehicles = getImportedVehicles();
        console.log("Véhicules chargés de tous les catalogues:", vehicles.length);
        
        foundVehicle = vehicles.find(v => 
          v.id === id || 
          v.id.includes(id) || 
          id.includes(v.id) || 
          id.toLowerCase().includes(v.brand.toLowerCase()) || 
          id.toLowerCase().includes(v.model.toLowerCase()) ||
          `${v.brand.toLowerCase()}-${v.model.toLowerCase()}`.includes(id.toLowerCase())
        );
      }
      
      if (foundVehicle) {
        console.log("Véhicule trouvé:", foundVehicle);
        console.log("ID du véhicule:", foundVehicle.id);
        console.log("URL de l'image:", foundVehicle.image);
        console.log("Lien Facebook:", foundVehicle.fbLink || "Aucun lien Facebook");
        setVehicle(foundVehicle);
      } else {
        console.error("Véhicule non trouvé avec l'ID:", id);
        setNotFound(true);
        toast.error(translate("vehicleNotFound", translations.vehicleNotFound));
      }
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule:", error);
      toast.error(translate("vehicleNotFound", translations.vehicleNotFound));
    } finally {
      setIsLoading(false);
    }
  }, [id, translate]);
  
  const handleBuyClick = () => {
    console.log("Bouton Acheter cliqué");
    setShowPaymentForm(true);
    toast.success(translate("fillFormFinalize", translations.fillFormFinalize));
    shadowToast({
      title: translate("orderInitiated", translations.orderInitiated),
      description: translate("fillFormFinalize", translations.fillFormFinalize),
    });
    
    setTimeout(() => {
      document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    form.setValue('paymentMethod', method);
  };
  
  const handlePaymentProofChange = (file: File | null) => {
    setPaymentProof(file);
  };
  
  const handleCouponCodeChange = (code: string) => {
    setCouponCode(code);
    form.setValue('couponCode', code);
  };
  
  const onSubmitOrder = async (data: OrderFormData) => {
    if (!vehicle) return;
    
    if (paymentMethod !== 'cash' && !paymentProof) {
      toast.error(translate("uploadPaymentProof", translations.uploadPaymentProof));
      shadowToast({
        variant: "destructive",
        title: translate("error", translations.error),
        description: translate("paymentProofRequired", translations.paymentProofRequired),
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
        toast.success(translate("orderSuccessful", translations.orderSuccessful));
        shadowToast({
          title: translate("orderSent", translations.orderSent),
          description: translate("orderReceived", translations.orderReceived),
        });
        setShowPaymentForm(false);
        form.reset();
      } else {
        throw new Error("Échec de l'envoi de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande:", error);
      toast.error(translate("orderError", translations.orderError));
      shadowToast({
        variant: "destructive",
        title: translate("error", translations.error),
        description: translate("orderErrorDesc", translations.orderErrorDesc),
      });
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">{translate("loadingVehicle", translations.loadingVehicle)}</span>
              </div>
              <p className="ml-2">{translate("loadingVehicle", translations.loadingVehicle)}</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-red-600 mb-4">{translate("vehicleNotFound", translations.vehicleNotFound)}</h1>
              <p className="text-gray-600 mb-6">
                {translate("vehicleNotFoundDesc", translations.vehicleNotFoundDesc)}
              </p>
              <Link to="/vehicules/occasion">
                <Button>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {translate("backToVehicles", translations.backToVehicles)}
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : translate("vehicleDetails", translations.vehicleDetails) + ' | AutoAdi'}</title>
        <meta 
          name="description" 
          content={vehicle ? `Découvrez ${vehicle.brand} ${vehicle.model} ${vehicle.year} d'occasion chez AutoAdi. ${vehicle.mileage} km, ${vehicle.fuelType}, ${vehicle.price.toLocaleString('fr-FR')}€.` : 'Détails du véhicule d\'occasion chez AutoAdi'}
        />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {vehicle && (
            <>
              <div className="mb-6">
                <Link to="/vehicules/occasion" className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {translate("backToVehicles", translations.backToVehicles)}
                </Link>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] bg-gray-100">
                      {vehicle.image ? (
                        <>
                          <img 
                            src={vehicle.image} 
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error("Erreur de chargement de l'image:", vehicle.image);
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image';
                            }}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <p className="text-gray-500">{translate("noImageAvailable", translations.noImageAvailable)}</p>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-brand-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {translate("used", translations.used)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h1>
                      <p className="text-gray-600">{vehicle.year} • {vehicle.mileage.toLocaleString('fr-FR')} km • {vehicle.fuelType}</p>
                    </div>
                    
                    <div className="text-3xl font-bold text-brand-blue">
                      {vehicle.price.toLocaleString('fr-FR')} €
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("year", translations.year)}</p>
                          <p className="font-medium">{vehicle.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("fuel", translations.fuel)}</p>
                          <p className="font-medium">{vehicle.fuelType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("mileage", translations.mileage)}</p>
                          <p className="font-medium">{vehicle.mileage.toLocaleString('fr-FR')} km</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cog className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">{translate("transmission", translations.transmission)}</p>
                          <p className="font-medium">{vehicle.transmission || translate("notSpecified", translations.notSpecified)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <Button 
                        variant="default" 
                        className="w-full md:w-auto flex-1 bg-brand-blue hover:bg-brand-darkBlue"
                        onClick={handleBuyClick}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {translate("buyVehicle", translations.buyVehicle)}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full md:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => {
                          navigator.share({
                            title: `${vehicle.brand} ${vehicle.model} - AutoAdi`,
                            text: `Découvrez cette ${vehicle.brand} ${vehicle.model} d'occasion chez AutoAdi`,
                            url: window.location.href
                          }).catch(() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success(translate("linkCopied", translations.linkCopied));
                            shadowToast({
                              title: translate("linkCopiedTitle", translations.linkCopiedTitle),
                              description: translate("linkCopiedDesc", translations.linkCopiedDesc),
                            });
                          });
                        }}
                      >
                        {translate("share", translations.share)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <div id="payment-form" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">{translate("finalizeOrder", translations.finalizeOrder)}</h2>
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
                    <form onSubmit={form.handleSubmit(onSubmitOrder)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center"><FilePenLine className="mr-2 h-5 w-5" /> {translate("yourInformation", translations.yourInformation)}</h3>
                          
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
                          <h3 className="text-lg font-semibold flex items-center"><Truck className="mr-2 h-5 w-5" /> {translate("delivery", translations.delivery)}</h3>
                          
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
                                      <label htmlFor="pickup" className="cursor-pointer">{translate("storePickup", translations.storePickup)}</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="delivery" id="delivery" />
                                      <label htmlFor="delivery" className="cursor-pointer">{translate("homeDelivery", translations.homeDelivery)}</label>
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
                                <FormLabel>{translate("specialInstructions", translations.specialInstructions)}</FormLabel>
                                <FormControl>
                                  <Input placeholder={translate("gateCode", translations.gateCode)} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center"><CreditCard className="mr-2 h-5 w-5" /> {translate("paymentMethod", translations.paymentMethod)}</h3>
                        
                        <PaymentOptions 
                          onPaymentMethodChange={handlePaymentMethodChange}
                          price={vehicle.price}
                          onPaymentProofChange={handlePaymentProofChange}
                          onCouponCodeChange={handleCouponCodeChange}
                        />
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 pt-6">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full md:w-auto"
                          onClick={() => setShowPaymentForm(false)}
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
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="description">
                        <Info className="mr-2 h-4 w-4" />
                        {translate("description", translations.description)}
                      </TabsTrigger>
                      <TabsTrigger value="features">
                        <Check className="mr-2 h-4 w-4" />
                        {translate("features", translations.features)}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("vehicleDescription", translations.vehicleDescription)}</h2>
                      {vehicle.description ? (
                        <div className="text-gray-700 space-y-4 whitespace-pre-line">
                          {vehicle.description}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">{translate("noDescriptionAvailable", translations.noDescriptionAvailable)}</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="features" className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("equipmentAndOptions", translations.equipmentAndOptions)}</h2>
                      {vehicle.features && vehicle.features.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          {vehicle.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-brand-blue mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">{translate("noFeaturesSpecified", translations.noFeaturesSpecified)}</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">{translate("characteristics", translations.characteristics)}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("brand", translations.brand)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.brand}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("model", translations.model)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.model}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("year", translations.year)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.year}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("mileage", translations.mileage)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.mileage.toLocaleString('fr-FR')} km</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">{translate("fuel", translations.fuel)}</div>
                          <div className="text-sm font-medium text-right">{vehicle.fuelType}</div>
                        </div>
                        {vehicle.transmission && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("transmission", translations.transmission)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.transmission}</div>
                          </div>
                        )}
                        {vehicle.exteriorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("exteriorColor", translations.exteriorColor)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.exteriorColor}</div>
                          </div>
                        )}
                        {vehicle.interiorColor && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("interiorColor", translations.interiorColor)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.interiorColor}</div>
                          </div>
                        )}
                        {vehicle.doors && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("doors", translations.doors)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.doors}</div>
                          </div>
                        )}
                        {vehicle.engine && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm text-gray-500">{translate("engine", translations.engine)}</div>
                            <div className="text-sm font-medium text-right">{vehicle.engine}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                          <span>{translate("warranty", translations.warranty)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleDetails;
