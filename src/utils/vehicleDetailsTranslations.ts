
import { Language } from '@/contexts/LanguageContext';

// Définition du type pour toutes les traductions de la page détail véhicule
export type VehicleDetailsTranslations = {
  // Méta et titres
  vehicleDetails: Record<Language, string>;
  loadingVehicle: Record<Language, string>;
  vehicleNotFound: Record<Language, string>;
  vehicleNotFoundDesc: Record<Language, string>;
  backToVehicles: Record<Language, string>;
  
  // Caractéristiques du véhicule
  year: Record<Language, string>;
  fuel: Record<Language, string>;
  mileage: Record<Language, string>;
  transmission: Record<Language, string>;
  notSpecified: Record<Language, string>;
  brand: Record<Language, string>;
  model: Record<Language, string>;
  exteriorColor: Record<Language, string>;
  interiorColor: Record<Language, string>;
  doors: Record<Language, string>;
  engine: Record<Language, string>;
  
  // Boutons et actions
  buyVehicle: Record<Language, string>;
  share: Record<Language, string>;
  linkCopied: Record<Language, string>;
  linkCopiedTitle: Record<Language, string>;
  linkCopiedDesc: Record<Language, string>;
  
  // Onglets et sections
  description: Record<Language, string>;
  features: Record<Language, string>;
  vehicleDescription: Record<Language, string>;
  noDescriptionAvailable: Record<Language, string>;
  equipmentAndOptions: Record<Language, string>;
  noFeaturesSpecified: Record<Language, string>;
  characteristics: Record<Language, string>;
  warranty: Record<Language, string>;
  
  // État du véhicule
  used: Record<Language, string>;
  noImageAvailable: Record<Language, string>;
  
  // Formulaire de commande
  finalizeOrder: Record<Language, string>;
  vehicle: Record<Language, string>;
  totalPrice: Record<Language, string>;
  deposit: Record<Language, string>;
  yourInformation: Record<Language, string>;
  fullName: Record<Language, string>;
  email: Record<Language, string>;
  phone: Record<Language, string>;
  delivery: Record<Language, string>;
  deliveryOption: Record<Language, string>;
  storePickup: Record<Language, string>;
  homeDelivery: Record<Language, string>;
  deliveryAddress: Record<Language, string>;
  specialInstructions: Record<Language, string>;
  gateCode: Record<Language, string>;
  paymentMethod: Record<Language, string>;
  cancel: Record<Language, string>;
  confirmOrder: Record<Language, string>;
  
  // Messages de confirmation et erreurs
  orderInitiated: Record<Language, string>;
  fillFormFinalize: Record<Language, string>;
  uploadPaymentProof: Record<Language, string>;
  error: Record<Language, string>;
  paymentProofRequired: Record<Language, string>;
  orderSuccessful: Record<Language, string>;
  orderSent: Record<Language, string>;
  orderReceived: Record<Language, string>;
  orderError: Record<Language, string>;
  orderErrorDesc: Record<Language, string>;
}

// Fonction pour récupérer toutes les traductions de la page détail véhicule
export function getVehicleDetailsTranslations(): VehicleDetailsTranslations {
  return {
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
}
