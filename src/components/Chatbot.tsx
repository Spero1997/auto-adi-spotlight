import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, Bot, Car, Calendar, HelpCircle, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: Option[];
};

type Option = {
  text: string;
  action: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Bonjour ! Bienvenue chez AutoAdi, votre concession 100% confiance 🚗. Comment puis-vous vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date(),
    options: [
      { text: "Je cherche une voiture", action: "search_car" },
      { text: "Je veux un essai", action: "test_drive" },
      { text: "Questions sur le paiement/garantie", action: "payment_warranty" },
      { text: "Suivre ma commande", action: "track_order" },
      { text: "Autre demande", action: "other" },
    ]
  },
];

// Base de connaissances pour les réponses FAQ
const faqKnowledgeBase = [
  {
    keywords: ['état', 'véhicule', 'kilométrage'],
    response: "Tous nos véhicules sont inspectés par nos experts. Le kilométrage exact est indiqué sur chaque fiche produit (exemple : Audi A4 2021 – 45 000 km). L'état est classé comme : **Comme neuf** (aucun défaut mécanique ou esthétique), **Très bon état** (légères marques d'usage), ou **Bon état** (petits défauts sans impact technique)."
  },
  {
    keywords: ['pièces', 'remplacement', 'mise à jour'],
    response: "Oui, nous indiquons toutes les pièces remplacées (ex : embrayage, freins, batterie) dans le **rapport d'expertise**. Demandez-le pour le véhicule qui vous intéresse !"
  },
  {
    keywords: ['pourquoi', 'ce prix', 'prix'],
    response: "Nos prix sont compétitifs car :\n- **Occasions** : Révisées et garanties (pas de mauvaises surprises).\n- **Neufs** : Remises constructeur jusqu'à -15%.\n- **Paiement comptant** : Réduction supplémentaire de **10%**."
  },
  {
    keywords: ['acheté', 'quand', 'qui', 'source'],
    response: "Nous sourçons nos véhicules :\n- **Neufs** : Directement des constructeurs.\n- **Occasions** : Anciens locataires (LOA), reprises clients, ou flottes d'entreprise."
  },
  {
    keywords: ['huile', 'entretien', 'carnet'],
    response: "Tous nos véhicules ont un **carnet d'entretien complet** (huile, filtres, vidanges) respectant les préconisations constructeur. Exemple : *BMW X3 2020 – 4 vidanges effectuées*."
  },
  {
    keywords: ['NIV', 'titre', 'propriété', 'identité'],
    response: "Absolument ! Ces documents sont disponibles :\n- **En concession** : Présentés avant l'achat.\n- **En ligne** : Envoyés cryptés après signature d'un NDA (pour éviter la fraude)."
  },
  {
    keywords: ['essai', 'essais', 'tester'],
    response: "Oui ! Réservez un essai gratuit :\n- **En concession** : 30 min avec un conseiller.\n- **À domicile** : Possible pour les véhicules > 25k€ (frais selon distance)."
  },
  {
    keywords: ['inspection', 'indépendante', 'vérifier'],
    response: "Bien sûr ! Nous recommandons même :\n- **Centres agréés** : Dekra, Norauto.\n- **Coût** : Offert pour les véhicules > 20k€ (sinon 150€ à votre charge)."
  },
  {
    keywords: ['problème', 'régler', 'défaut', 'avant achat'],
    response: "Tout défaut détecté est réparé avant livraison (ex : peinture, pièce mécanique). Sinon, nous ajustons le prix ou annulons la vente."
  },
  {
    keywords: ['budget', 'fourchette', 'prix'],
    response: "Nous avons des véhicules de **10k€ à 100k€**. Dites-nous votre fourchette, nous trouverons la meilleure offre !"
  },
  {
    keywords: ['consommation', 'carburant'],
    response: "Elle correspond aux données constructeur (±5%). Exemple :\n- **Diesel** : 4,5L/100km (autoroute).\n- **Essence** : 6,0L/100km (ville)."
  },
  {
    keywords: ['état général'],
    response: "Évalué via notre grille **AutoAdi Certified** :\n- **Mécanique** : 10/10.\n- **Carrosserie** : 8/10 (rayures mineures).\n- **Intérieur** : 9/10 (sièges quasi neufs)."
  },
  {
    keywords: ['contrôle technique', 'CT'],
    response: "Oui, valide 6 mois minimum pour toutes nos occasions. Exemple : *Contrôle technique du 01/01/2024 – Aucun point critique*."
  },
  {
    keywords: ['première main', 'seconde main', 'propriétaires'],
    response: "Nous précisons toujours le nombre de propriétaires :\n- **Première main** : Modèles neufs ou ex-LOA.\n- **Seconde main** : 80% de notre stock."
  },
  {
    keywords: ['négociable', 'négocier'],
    response: "Oui, surtout pour :\n- **Paiement comptant** (jusqu'à -10%).\n- **Anciens modèles** (stock > 6 mois)."
  },
  {
    keywords: ['possédé', 'avant', 'propriétaires'],
    response: "Entre **1 et 3 maximum**. Exemple : *Volvo XC60 – 1 propriétaire (dossier transparent disponible)*."
  },
  {
    keywords: ['utilisé', 'ville', 'autoroute', 'longs trajets'],
    response: "Nous vérifions l'historique :\n- **Autoroute** : Usure moteur réduite (idéal).\n- **Ville** : Embrayage plus sollicité."
  },
  {
    keywords: ['garantie', 'durée', 'couverts'],
    response: "Garantie constructeur ou **AutoAdi Extended** :\n- **Neufs** : 2 à 5 ans (moteur, boîte, électronique).\n- **Occasions** : 12 à 24 mois (selon kilométrage)."
  },
  {
    keywords: ['carrosserie', 'état carrosserie'],
    response: "Inspectée avec un **testeur d'épaisseur de peinture**. Aucune réparation masquée !"
  },
  {
    keywords: ['pneus', 'état pneus'],
    response: "Profondeur minimale de **3 mm** (sinon remplacés). Exemple : *Pneus neufs Michelin sur Tesla Model 3*."
  },
  {
    keywords: ['intérieur', 'entretenu'],
    response: "Oui, nettoyage **pro complet** avant livraison (sièges, moquette, odeur)."
  },
  {
    keywords: ['bruits', 'étranges', 'démarrage'],
    response: "Non, tous nos véhicules passent un **test acoustique**. Bruit = diagnostic gratuit."
  },
  {
    keywords: ['papiers', 'nécessaires', 'acheter'],
    response: "- **Pour vous** : Pièce d'identité + justificatif de domicile.\n- **Pour la voiture** : Carte grise + contrôle technique + rapport d'expertise."
  },
  {
    keywords: ['annuler', 'rétractation'],
    response: "Oui ! 14 jours de rétractation, remboursement intégral."
  },
  {
    keywords: ['extension', 'garantie'],
    response: "Oui, jusqu'à 5 ans. Demandez un devis !"
  },
  {
    keywords: ['80%', 'payer', 'acompte', 'restants'],
    response: "**Aucun paiement entre l'acompte et la livraison !**\n- Vous payez seulement **20% à la commande** pour réserver le véhicule\n- Les **80% restants** sont réglés :\n  - **À la livraison** en un seul versement\n  - **OU** en mensualités sans intérêt (6-84 mois) après livraison"
  },
  {
    keywords: ['exemple', 'paiement', 'différé'],
    response: "Pour un véhicule à **40 000€** :\n1. **Aujourd'hui** : 8 000€ (20%)\n2. **À la livraison (dans 2 semaines)** :\n   - Option 1 : Paiement des **32 000€** restants en une fois\n   - Option 2 : Mensualités de **533€/mois sur 60 mois** (0% d'intérêt)"
  },
  {
    keywords: ['voir', 'véhicule', 'avant', 'payer'],
    response: "**Oui, absolument ! Vous pouvez venir voir la voiture en Italie ou en Espagne**\n- Vous pouvez :\n  - **Vérifier le véhicule** à la livraison\n  - **Faire un essai final**\n  - **Payer seulement si satisfait** (dans les 48h suivant la livraison)"
  },
  {
    keywords: ['refuse', 'refuser', 'livraison'],
    response: "Deux options :\n1. **Échange** : Nous trouvons un autre modèle\n2. **Remboursement** : Votre acompte de 20% est intégralement restitué"
  },
  {
    keywords: ['payer', 'partie', 'mensualités'],
    response: "Oui ! Par exemple :\n- **À la livraison** : 10 000€\n- **Reste** : 22 000€ en 36 mensualités de 611€"
  },
  {
    keywords: ['délai', 'livraison'],
    response: "Le délai de livraison en Portugal, en France, en Espagne, en Roumanie, en Italie ne dépasse pas 5 jours."
  },
  {
    keywords: ['comment', 'marche', 'paiement', 'après', 'acompte'],
    response: "Chez AutoAdi, c'est ultra flexible :\n\n1️⃣ **Vous payez 20%** pour réserver (ex: 6 000€ sur 30 000€)\n2️⃣ **Vous ne payez plus rien** jusqu'à la livraison\n3️⃣ **À réception** :\n   - Soit vous réglez les **80%** d'un coup\n   - Soit en **mensualités** (ex: 400€/mois sur 60 mois)\n\n*Avantage : Vous vérifiez la voiture AVANT de payer le solde !*\n\n✅ **Zéro engagement** entre acompte et livraison\n✅ **Paiement seulement si satisfait**\n✅ **Taux 0%** sur les mensualités\n✅ **Aucun frais caché**"
  }
];

const vehicleTypeOptions = [
  { text: "SUV", action: "vehicle_suv" },
  { text: "Berline", action: "vehicle_berline" },
  { text: "Électrique", action: "vehicle_electric" },
  { text: "Citadine", action: "vehicle_city" }
];

const budgetOptions = [
  { text: "Moins de 20k€", action: "budget_less_20k" },
  { text: "20-40k€", action: "budget_20_40k" },
  { text: "Plus de 40k€", action: "budget_more_40k" }
];

const brandOptions = [
  { text: "Audi", action: "brand_audi" },
  { text: "BMW", action: "brand_bmw" },
  { text: "Mercedes", action: "brand_mercedes" },
  { text: "Autre", action: "brand_other" }
];

const stateOptions = [
  { text: "Neuf", action: "state_new" },
  { text: "Occasion (<3 ans)", action: "state_used_recent" },
  { text: "Occasion (bon plan)", action: "state_used_deal" }
];

const Chatbot = () => {
  const { translate } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [currentSearchStep, setCurrentSearchStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addMessage = (text: string, sender: 'user' | 'bot', options?: Option[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const findFaqResponse = (userInput: string): string | null => {
    const lowercaseInput = userInput.toLowerCase();
    
    for (const item of faqKnowledgeBase) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    return null;
  };

  const handleOptionClick = (action: string) => {
    switch (action) {
      case 'search_car':
        addMessage("Je cherche une voiture", "user");
        startVehicleSearch();
        break;
      case 'test_drive':
        addMessage("Je veux un essai", "user");
        addMessage("Bien sûr ! Réservez un essai gratuit :\n- **En concession** : 30 min avec un conseiller.\n- **À domicile** : Possible pour les véhicules > 25k€ (frais selon distance).\n\nVous pouvez prendre rendez-vous dès maintenant. Quel véhicule souhaitez-vous essayer ?", "bot");
        break;
      case 'payment_warranty':
        addMessage("Questions sur le paiement/garantie", "user");
        addMessage("Chez AutoAdi, c'est simple et sans stress :\n\n1️⃣ **Choisissez** votre véhicule (en ligne ou en concession).\n2️⃣ **Acompte** : 20% à la commande.\n3️⃣ **Solde** :\n   - Paiement comptant (**-10%** de réduction)\n   - **Ou** mensualités sans intérêt (6 à 84 mois).\n4️⃣ **Garantie** incluse : 12 à 48 mois (Europe).\n\nUn conseiller peut vous envoyer une offre personnalisée. Souhaitez-vous en savoir plus sur nos garanties ou nos options de financement ?", "bot");
        break;
      case 'track_order':
        addMessage("Suivre ma commande", "user");
        addMessage("Livraison express partout en France !\n- **En stock** : 2-5 jours (vérification préalable incluse).\n- **Sur commande** : 2-8 semaines (suivi WhatsApp envoyé).\n\n*Options :*\n🚚 Livraison à domicile (gratuite).\n🏁 Retrait en concession (cadeau de bienvenue offert).\n\nPour suivre votre commande, merci de m'indiquer votre numéro de commande.", "bot");
        break;
      case 'other':
        addMessage("Autre demande", "user");
        addMessage("Je suis là pour vous aider ! N'hésitez pas à me poser une question sur :\n- L'état des véhicules\n- Les garanties\n- Les options de financement\n- Les délais de livraison\n- Ou tout autre sujet concernant votre achat", "bot");
        break;
      default:
        if (action.startsWith('vehicle_')) {
          handleVehicleTypeSelection(action.replace('vehicle_', ''));
        } else if (action.startsWith('budget_')) {
          handleBudgetSelection(action.replace('budget_', ''));
        } else if (action.startsWith('brand_')) {
          handleBrandSelection(action.replace('brand_', ''));
        } else if (action.startsWith('state_')) {
          handleStateSelection(action.replace('state_', ''));
        } else if (action.startsWith('car_details_')) {
          showVehicleDetails(action.replace('car_details_', ''));
        }
    }
  };

  const startVehicleSearch = () => {
    setCurrentSearchStep(1);
    addMessage("Super ! Par quoi souhaitez-vous commencer ?", "bot", vehicleTypeOptions);
  };

  const handleVehicleTypeSelection = (type: string) => {
    setSelectedVehicleType(type);
    addMessage(`Type de véhicule: ${type}`, "user");
    setCurrentSearchStep(2);
    addMessage("Excellent choix ! Quel est votre budget ?", "bot", budgetOptions);
  };

  const handleBudgetSelection = (budget: string) => {
    setSelectedBudget(budget);
    addMessage(`Budget: ${budget}`, "user");
    setCurrentSearchStep(3);
    addMessage("Avez-vous une préférence de marque ?", "bot", brandOptions);
  };

  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand);
    addMessage(`Marque: ${brand}`, "user");
    setCurrentSearchStep(4);
    addMessage("Et préférez-vous un véhicule neuf ou d'occasion ?", "bot", stateOptions);
  };

  const handleStateSelection = (state: string) => {
    setSelectedState(state);
    addMessage(`État: ${state}`, "user");
    
    setTimeout(() => {
      showSearchResults();
    }, 1000);
  };

  const showSearchResults = () => {
    const results = [];
    
    if (selectedVehicleType === 'suv' && selectedBudget === 'more_40k') {
      results.push({ id: 1, model: "Audi Q3", price: "38 900 €", highlight: "Garantie 4 ans" });
      results.push({ id: 2, model: "BMW X1", price: "39 500 €", highlight: "Promo -10% paiement comptant" });
      results.push({ id: 3, model: "Volvo XC40", price: "41 200 €", highlight: "Livraison en 15 jours" });
    } else if (selectedBrand === 'audi') {
      results.push({ id: 4, model: "Audi A4", price: "32 500 €", highlight: "Modèle S-Line" });
      results.push({ id: 5, model: "Audi Q5", price: "45 900 €", highlight: "Toit panoramique" });
    } else if (selectedBrand === 'bmw') {
      results.push({ id: 6, model: "BMW Série 3", price: "33 800 €", highlight: "Pack M-Sport" });
      results.push({ id: 7, model: "BMW X3", price: "42 500 €", highlight: "Tout-terrain" });
    } else {
      results.push({ id: 8, model: "Mercedes Classe C", price: "36 700 €", highlight: "Finition AMG" });
      results.push({ id: 9, model: "Volkswagen Tiguan", price: "29 900 €", highlight: "Faible kilométrage" });
      results.push({ id: 10, model: "Peugeot 3008", price: "27 500 €", highlight: "Full options" });
    }
    
    let resultsMessage = "Voici les véhicules correspondant à vos critères :\n\n";
    
    results.forEach((car, index) => {
      resultsMessage += `${index + 1}. **${car.model}** – ${car.price} (${car.highlight})\n`;
    });
    
    resultsMessage += "\nVoulez-vous :\n";
    
    const options = results.map(car => ({ 
      text: `Voir les détails de ${car.model}`, 
      action: `car_details_${car.id}` 
    }));
    
    options.push({ text: "Affiner ma recherche", action: "search_car" });
    
    addMessage(resultsMessage, "bot", options);
  };

  const showVehicleDetails = (carId: string) => {
    let details = "";
    let title = "";
    
    switch (carId) {
      case "1":
        title = "Audi Q3 Sportback";
        details = "**Audi Q3 Sportback**\n\n" +
          "Prix : **38 900 €**\n" +
          "Année : 2023\n" +
          "Kilométrage : 12 500 km\n" +
          "Carburant : Essence\n" +
          "Boîte : Automatique\n" +
          "Couleur : Noir métallisé\n\n" +
          "**Points forts** :\n" +
          "- Garantie constructeur jusqu'en 2027\n" +
          "- Toit ouvrant panoramique\n" +
          "- Sièges chauffants\n" +
          "- Caméra de recul\n\n" +
          "**Financement possible** à partir de 499€/mois";
        break;
      case "2":
        title = "BMW X1";
        details = "**BMW X1 xDrive20i**\n\n" +
          "Prix : **39 500 €**\n" +
          "Année : 2022\n" +
          "Kilométrage : 18 300 km\n" +
          "Carburant : Essence\n" +
          "Boîte : Automatique\n" +
          "Couleur : Blanc alpin\n\n" +
          "**Points forts** :\n" +
          "- Pack M Sport\n" +
          "- Système audio Harman Kardon\n" +
          "- Intérieur cuir Dakota\n" +
          "- Navigation Professional\n\n" +
          "**Promotion** : -10% pour paiement comptant";
        break;
      default:
        title = "Détails du véhicule";
        details = "Détails non disponibles pour ce véhicule. Un conseiller peut vous contacter pour plus d'informations.";
    }
    
    setDialogContent({
      title,
      content: details
    });
    
    setIsDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    processUserMessage(inputValue);
    setInputValue('');
  };

  const processUserMessage = (message: string) => {
    const faqResponse = findFaqResponse(message);
    
    if (faqResponse) {
      addMessage(faqResponse, 'bot');
      return;
    }
    
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('cherche') && lowercaseMessage.includes('voiture')) {
      startVehicleSearch();
    } else if (lowercaseMessage.includes('essai')) {
      addMessage("Bien sûr ! Réservez un essai gratuit :\n- **En concession** : 30 min avec un conseiller.\n- **À domicile** : Possible pour les véhicules > 25k€ (frais selon distance).\n\nVous pouvez prendre rendez-vous dès maintenant. Quel véhicule souhaitez-vous essayer ?", "bot");
    } else if (lowercaseMessage.includes('paiement') || lowercaseMessage.includes('financement') || lowercaseMessage.includes('mensualité')) {
      addMessage("Chez AutoAdi, c'est ultra flexible :\n\n1️⃣ **Vous payez 20%** pour réserver (ex: 6 000€ sur 30 000€)\n2️⃣ **Vous ne payez plus rien** jusqu'à la livraison\n3️⃣ **À réception** :\n   - Soit vous réglez les **80%** d'un coup\n   - Soit en **mensualités** (ex: 400€/mois sur 60 mois)\n\n*Avantage : Vous vérifiez la voiture AVANT de payer le solde !*\n\n✅ **Zéro engagement** entre acompte et livraison\n✅ **Paiement seulement si satisfait**\n✅ **Taux 0%** sur les mensualités\n✅ **Aucun frais caché**", "bot");
    } else if (lowercaseMessage.includes('livraison') || lowercaseMessage.includes('délai')) {
      addMessage("Le délai de livraison en Portugal, en France, en Espagne, en Roumanie, en Italie ne dépasse pas 5 jours. Nous proposons :\n\n🚚 Livraison à domicile (gratuite).\n🏁 Retrait en concession (cadeau de bienvenue offert).", "bot");
    } else if (lowercaseMessage.includes('bonjour') || lowercaseMessage.includes('salut') || lowercaseMessage.includes('hello')) {
      addMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?", "bot", initialMessages[0].options);
    } else {
      addMessage("Je ne suis pas sûr de comprendre votre demande. Puis-je vous aider sur un de ces sujets ?", "bot", initialMessages[0].options);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const renderMessageContent = (message: Message) => {
    const textWithLineBreaks = message.text.split('\n').map((text, index) => (
      <span key={index}>
        {index > 0 && <br />}
        {text}
      </span>
    ));

    return (
      <div className="flex flex-col">
        <div>{textWithLineBreaks}</div>
        
        {message.options && message.options.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action)}
                className="text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 text-sm font-medium transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed right-6 z-50" style={{ top: 'calc(50% - 24px)' }}>
        <button
          onClick={toggleChat}
          className={`bg-brand-blue hover:bg-brand-darkBlue text-white rounded-full p-4 shadow-lg transition-all chatbot-button-pulse ${
            isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          aria-label="Discuter avec nous"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        <div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all transform ${
            isOpen
              ? 'scale-100 opacity-100 translate-y-0'
              : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
          } w-80 md:w-96 max-h-[500px] flex flex-col`}
          style={{ visibility: isOpen ? 'visible' : 'hidden', position: 'absolute', top: 'calc(-250px)', right: '0' }}
        >
          <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              <h3 className="font-semibold">Auto Adi - Assistant virtuel</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[350px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-brand-blue text-white font-medium'
                      : 'bg-gray-100 text-gray-800 font-medium'
                  } max-w-[85%]`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-5 w-5 mt-1 text-brand-blue shrink-0" />
                    )}
                    <div className="text-left">
                      {renderMessageContent(message)}
                    </div>
                    {message.sender === 'user' && (
                      <User className="h-5 w-5 mt-1 text-white shrink-0" />
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3 flex items-center">
            <input
              type="text"
              placeholder="Tapez votre message..."
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={handleSendMessage}
              className="rounded-l-none"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Envoyer</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <div className="whitespace-pre-line">{dialogContent.content}</div>
          <div className="mt-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Fermer
            </Button>
            <Button onClick={() => {
              setIsDialogOpen(false);
              toast.success("Demande d'information envoyée !");
              addMessage("Un conseiller va vous contacter prochainement pour ce véhicule. Merci pour votre intérêt !", "bot");
            }}>
              Demander plus d'informations
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
