
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getImportedVehicles, ImportedVehicle } from '@/utils/vehicleImportService';
import { useToast } from '@/hooks/use-toast';
import { sendOrderConfirmationEmail } from '@/utils/emailService';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { useLanguage } from '@/contexts/LanguageContext';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import VehicleInformation from '@/components/vehicles/VehicleInformation';
import VehiclePurchaseForm from '@/components/vehicles/VehiclePurchaseForm';
import VehicleSpecifications from '@/components/vehicles/VehicleSpecifications';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { translate } = useLanguage();
  const { toast: shadowToast } = useToast();

  const translations = {
    vehicleNotFound: {
      FR: "Véhicule non trouvé",
      EN: "Vehicle not found",
      ES: "Vehículo no encontrado",
      IT: "Veicolo non trovato",
      PT: "Veículo não encontrado",
      RO: "Vehicul negăsit"
    },
    vehicleNotFoundDesc: {
      FR: "Désolé, nous n'avons pas trouvé le véhicule que vous recherchez.",
      EN: "Sorry, we couldn't find the vehicle you're looking for.",
      ES: "Lo sentimos, no encontramos el vehículo que estás buscando.",
      IT: "Spiacenti, non abbiamo trovato il veicolo che stai cercando.",
      PT: "Desculpe, não encontramos o veículo que você está procurando.",
      RO: "Ne pare rău, nu am găsit vehiculul pe care îl căutați."
    },
    backToVehicles: {
      FR: "Retour aux véhicules",
      EN: "Back to vehicles",
      ES: "Volver a vehículos",
      IT: "Torna ai veicoli",
      PT: "Voltar para veículos",
      RO: "Înapoi la vehicule"
    },
    loadingVehicle: {
      FR: "Chargement du véhicule...",
      EN: "Loading vehicle...",
      ES: "Cargando vehículo...",
      IT: "Caricamento veicolo...",
      PT: "Carregando veículo...",
      RO: "Încărcare vehicul..."
    },
    vehicleDetails: {
      FR: "Détails du véhicule",
      EN: "Vehicle details",
      ES: "Detalles del vehículo",
      IT: "Dettagli veicolo",
      PT: "Detalhes do veículo",
      RO: "Detalii vehicul"
    },
    finalizeOrder: {
      FR: "Finaliser la commande",
      EN: "Finalize order",
      ES: "Finalizar pedido",
      IT: "Finalizzare l'ordine",
      PT: "Finalizar pedido",
      RO: "Finalizați comanda"
    },
    fillFormFinalize: {
      FR: "Veuillez remplir le formulaire pour finaliser votre commande",
      EN: "Please fill out the form to finalize your order",
      ES: "Por favor complete el formulario para finalizar su pedido",
      IT: "Si prega di compilare il modulo per finalizzare l'ordine",
      PT: "Por favor, preencha o formulário para finalizar seu pedido",
      RO: "Vă rugăm să completați formularul pentru a finaliza comanda"
    },
    orderInitiated: {
      FR: "Commande initiée",
      EN: "Order initiated",
      ES: "Pedido iniciado",
      IT: "Ordine avviato",
      PT: "Pedido iniciado",
      RO: "Comandă inițiată"
    },
    uploadPaymentProof: {
      FR: "Veuillez télécharger une preuve de paiement",
      EN: "Please upload a proof of payment",
      ES: "Por favor suba un comprobante de pago",
      IT: "Si prega di caricare una prova di pagamento",
      PT: "Por favor, envie um comprovante de pagamento",
      RO: "Vă rugăm să încărcați o dovadă de plată"
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
      FR: "Une preuve de paiement est requise",
      EN: "A payment proof is required",
      ES: "Se requiere comprobante de pago",
      IT: "È richiesta una prova di pagamento",
      PT: "É necessário um comprovante de pagamento",
      RO: "Este necesară o dovadă de plată"
    },
    orderSuccessful: {
      FR: "Commande réussie",
      EN: "Order successful",
      ES: "Pedido exitoso",
      IT: "Ordine riuscito",
      PT: "Pedido bem-sucedido",
      RO: "Comandă reușită"
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
      FR: "Nous avons bien reçu votre commande",
      EN: "We have received your order",
      ES: "Hemos recibido su pedido",
      IT: "Abbiamo ricevuto il tuo ordine",
      PT: "Recebemos seu pedido",
      RO: "Am primit comanda dvs."
    },
    orderError: {
      FR: "Erreur lors de la commande",
      EN: "Order error",
      ES: "Error en el pedido",
      IT: "Errore dell'ordine",
      PT: "Erro no pedido",
      RO: "Eroare de comandă"
    },
    orderErrorDesc: {
      FR: "Une erreur est survenue lors de la soumission de votre commande",
      EN: "An error occurred while submitting your order",
      ES: "Ocurrió un error al enviar su pedido",
      IT: "Si è verificato un errore durante l'invio del tuo ordine",
      PT: "Ocorreu um erro ao enviar seu pedido",
      RO: "A apărut o eroare la trimiterea comenzii"
    },
    linkCopied: {
      FR: "Lien copié",
      EN: "Link copied",
      ES: "Enlace copiado",
      IT: "Link copiato",
      PT: "Link copiado",
      RO: "Link copiat"
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
      FR: "Le lien a été copié dans votre presse-papiers",
      EN: "The link has been copied to your clipboard",
      ES: "El enlace se ha copiado a tu portapapeles",
      IT: "Il link è stato copiato negli appunti",
      PT: "O link foi copiado para a área de transferência",
      RO: "Linkul a fost copiat în clipboard"
    },
    noImageAvailable: {
      FR: "Aucune image disponible",
      EN: "No image available",
      ES: "No hay imagen disponible",
      IT: "Nessuna immagine disponibile",
      PT: "Nenhuma imagem disponível",
      RO: "Nicio imagine disponibilă"
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
      RO: "Cumpărați acest vehicul"
    },
    share: {
      FR: "Partager",
      EN: "Share",
      ES: "Compartir",
      IT: "Condividere",
      PT: "Compartilhar",
      RO: "Distribuie"
    },
    vehicle: {
      FR: "Véhicule",
      EN: "Vehicle",
      ES: "Vehículo",
      IT: "Veicolo",
      PT: "Veículo",
      RO: "Vehicul"
    },
    totalPrice: {
      FR: "Prix total",
      EN: "Total price",
      ES: "Precio total",
      IT: "Prezzo totale",
      PT: "Preço total",
      RO: "Preț total"
    },
    deposit: {
      FR: "Acompte",
      EN: "Deposit",
      ES: "Depósito",
      IT: "Deposito",
      PT: "Depósito",
      RO: "Depozit"
    },
    yourInformation: {
      FR: "Vos informations",
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
      FR: "Retrait en magasin",
      EN: "Store pickup",
      ES: "Recogida en tienda",
      IT: "Ritiro in negozio",
      PT: "Retirada na loja",
      RO: "Ridicare din magazin"
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
      FR: "Instructions spéciales",
      EN: "Special instructions",
      ES: "Instrucciones especiales",
      IT: "Istruzioni speciali",
      PT: "Instruções especiais",
      RO: "Instrucțiuni speciale"
    },
    gateCode: {
      FR: "Code d'accès, instructions...",
      EN: "Gate code, instructions...",
      ES: "Código de acceso, instrucciones...",
      IT: "Codice di accesso, istruzioni...",
      PT: "Código de acesso, instruções...",
      RO: "Cod de acces, instrucțiuni..."
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
      IT: "Confermare l'ordine",
      PT: "Confirmar pedido",
      RO: "Confirmați comanda"
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
      FR: "Aucune description disponible",
      EN: "No description available",
      ES: "No hay descripción disponible",
      IT: "Nessuna descrizione disponibile",
      PT: "Nenhuma descrição disponível",
      RO: "Nicio descriere disponibilă"
    },
    equipmentAndOptions: {
      FR: "Équipements et options",
      EN: "Equipment and options",
      ES: "Equipamiento y opciones",
      IT: "Equipaggiamento e opzioni",
      PT: "Equipamento e opções",
      RO: "Echipament și opțiuni"
    },
    noFeaturesSpecified: {
      FR: "Aucun équipement spécifié",
      EN: "No features specified",
      ES: "No se especifican características",
      IT: "Nessuna caratteristica specificata",
      PT: "Nenhum recurso especificado",
      RO: "Nu sunt specificate caracteristici"
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
      RO: "Culoare interior"
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
      FR: "Garantie incluse",
      EN: "Warranty included",
      ES: "Garantía incluida",
      IT: "Garanzia inclusa",
      PT: "Garantia incluída",
      RO: "Garanție inclusă"
    }
  };

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

  const handleOrderSubmit = async (data: any) => {
    if (!vehicle) return;
    
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
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  {translate("loadingVehicle", translations.loadingVehicle)}
                </span>
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
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                {translate("vehicleNotFound", translations.vehicleNotFound)}
              </h1>
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
        <title>
          {vehicle ? `${vehicle.brand} ${vehicle.model} | AutoAdi` : translate("vehicleDetails", translations.vehicleDetails) + ' | AutoAdi'}
        </title>
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
                    <VehicleGallery
                      images={vehicle.images}
                      image={vehicle.image}
                      brand={vehicle.brand}
                      model={vehicle.model}
                      translations={translations}
                    />
                  </div>
                  
                  <div>
                    <VehicleInformation
                      vehicle={vehicle}
                      onBuyClick={handleBuyClick}
                      translations={translations}
                    />
                  </div>
                </div>
              </div>
              
              {showPaymentForm && (
                <VehiclePurchaseForm
                  vehicle={vehicle}
                  onSubmit={handleOrderSubmit}
                  translations={translations}
                  onCancel={() => setShowPaymentForm(false)}
                />
              )}
              
              <VehicleSpecifications
                vehicle={vehicle}
                translations={translations}
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VehicleDetails;
