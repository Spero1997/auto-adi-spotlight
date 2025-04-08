
import React, { useState, useRef, useEffect } from 'react';
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

type VehicleIntent = {
  model?: string;
  brand?: string;
  budget?: number;
  state?: 'neuf' | 'occasion';
  type?: string;
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

// Inventory data for specific model searches
const vehicleInventory = [
  { 
    id: 'a4-tdi-2021',
    brand: 'Audi', 
    model: 'A4 TDI', 
    year: 2021, 
    price: 23900, 
    mileage: 40000, 
    features: ['Garantie 24 mois', 'Carnet d\'entretien complet', 'Première main'],
    image: 'https://example.com/audi-a4.jpg'
  },
  { 
    id: 'a4-sline-2020',
    brand: 'Audi', 
    model: 'A4 S-Line', 
    year: 2020, 
    price: 24500, 
    mileage: 30000, 
    features: ['Pack entretien offert', 'Toit ouvrant', 'Sièges chauffants'],
    image: 'https://example.com/audi-a4-sline.jpg'
  },
  { 
    id: 'q3-2022',
    brand: 'Audi', 
    model: 'Q3', 
    year: 2022, 
    price: 38900, 
    mileage: 12500, 
    features: ['Garantie 4 ans', 'SUV compact', 'Finition premium'],
    image: 'https://example.com/audi-q3.jpg'
  },
  { 
    id: 'x1-2022',
    brand: 'BMW', 
    model: 'X1', 
    year: 2022, 
    price: 39500, 
    mileage: 18000, 
    features: ['Promo -10% paiement comptant', 'Toit panoramique', 'Intérieur cuir'],
    image: 'https://example.com/bmw-x1.jpg'
  }
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
  const [vehicleIntent, setVehicleIntent] = useState<VehicleIntent>({});
  const [isFinanceDialogOpen, setIsFinanceDialogOpen] = useState(false);
  const [financeDialog, setFinanceDialog] = useState({ vehicle: '', downPayment: 0, totalAmount: 0 });
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

  // Parse user input for intentions and entities
  const extractVehicleIntent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const intent: VehicleIntent = {};
    
    // Extract brand
    const brands = ['audi', 'bmw', 'mercedes', 'volkswagen', 'volvo', 'tesla', 'peugeot'];
    for (const brand of brands) {
      if (lowerMessage.includes(brand)) {
        intent.brand = brand.charAt(0).toUpperCase() + brand.slice(1);
        break;
      }
    }
    
    // Extract model
    if (intent.brand === 'Audi') {
      const models = ['a1', 'a3', 'a4', 'a5', 'a6', 'q3', 'q5', 'q7'];
      for (const model of models) {
        if (lowerMessage.includes(model)) {
          intent.model = model.toUpperCase();
          break;
        }
      }
    } else if (intent.brand === 'BMW') {
      const models = ['x1', 'x3', 'x5', 'série 1', 'série 3', 'série 5'];
      for (const model of models) {
        if (lowerMessage.includes(model)) {
          intent.model = model.charAt(0).toUpperCase() + model.slice(1);
          break;
        }
      }
    }
    
    // Extract budget
    const budgetMatch = lowerMessage.match(/(\d+)k€|(\d+)k|(\d+)[., ]?000 ?€|(\d+)[., ]?000/);
    if (budgetMatch) {
      const match = budgetMatch[1] || budgetMatch[2] || budgetMatch[3] || budgetMatch[4];
      intent.budget = parseInt(match) * 1000;
    } else {
      const numericMatch = lowerMessage.match(/(\d+)[., ]?(\d+)? ?€/);
      if (numericMatch) {
        intent.budget = parseInt(numericMatch[1].replace('.', '').replace(',', ''));
      }
    }
    
    // Extract state
    if (lowerMessage.includes('neuf') || lowerMessage.includes('nouveau')) {
      intent.state = 'neuf';
    } else if (lowerMessage.includes('occasion') || lowerMessage.includes('usagé') || lowerMessage.includes('seconde main')) {
      intent.state = 'occasion';
    }
    
    // Extract type
    if (lowerMessage.includes('suv') || lowerMessage.includes('4x4')) {
      intent.type = 'suv';
    } else if (lowerMessage.includes('berline')) {
      intent.type = 'berline';
    } else if (lowerMessage.includes('électrique') || lowerMessage.includes('electrique')) {
      intent.type = 'électrique';
    } else if (lowerMessage.includes('citadine')) {
      intent.type = 'citadine';
    }
    
    return intent;
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
        addMessage("Je suis là pour vous aider ! N'hésitez pas à me poser une question sur :\n- L'état des véhicules\n- Les garanties\n- Les options de financement\n- Les délais de livraison\n- Ou tout autre sujet concernant votre achat\n\nBesoin d'aide ? Contactez nous par WhatsApp : ☎ +393761753341 (7j/7).", "bot");
        break;
      case 'contact_whatsapp':
        addMessage("Je souhaite être contacté par WhatsApp", "user");
        addMessage("Un conseiller va vous contacter très prochainement au +393761753341. Merci de votre intérêt chez AutoAdi !", "bot");
        toast.success("Demande de contact envoyée !");
        break;
      case 'view_stock':
        window.open('https://autoadi.com/stock', '_blank');
        addMessage("Je veux voir tout le stock", "user");
        addMessage("Je vous ai ouvert notre inventaire en ligne. Voulez-vous que je vous aide à trouver un véhicule spécifique ?", "bot");
        break;
      case 'simulate_credit':
        simulateCredit();
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
        } else if (action.startsWith('finance_')) {
          const vehicleId = action.replace('finance_', '');
          const vehicle = vehicleInventory.find(v => v.id === vehicleId);
          if (vehicle) {
            showFinanceOptions(vehicle);
          }
        }
    }
  };

  const simulateCredit = () => {
    if (!financeDialog.vehicle) {
      addMessage("Pour simuler un crédit, veuillez d'abord sélectionner un véhicule.", "bot");
      return;
    }
    
    setIsFinanceDialogOpen(true);
    
    const downPayment = Math.round(financeDialog.totalAmount * 0.2);
    const remainingAmount = financeDialog.totalAmount - downPayment;
    
    const rates = {
      36: Math.round(remainingAmount / 36),
      60: Math.round(remainingAmount / 60),
      84: Math.round(remainingAmount / 84)
    };
    
    const content = `
      **Simulation de financement pour ${financeDialog.vehicle}**
      
      Prix total: **${financeDialog.totalAmount} €**
      Acompte (20%): **${downPayment} €**
      Montant à financer: **${remainingAmount} €**
      
      Options de mensualités (0% d'intérêt):
      - 36 mois: **${rates[36]} €/mois**
      - 60 mois: **${rates[60]} €/mois**
      - 84 mois: **${rates[84]} €/mois**
      
      Souhaitez-vous recevoir cette simulation par email?
    `;
    
    addMessage(`Avec un acompte de 20% (${downPayment} €), vous pouvez payer le solde (${remainingAmount} €) en :\n- 36 mois: ${rates[36]} €/mois\n- 60 mois: ${rates[60]} €/mois\n- 84 mois: ${rates[84]} €/mois\n\nJe vous envoie une simulation officielle par email? [Oui/Non]`, "bot", [
      { text: "Oui, envoyez-moi la simulation", action: "send_simulation" },
      { text: "Non merci", action: "no_simulation" }
    ]);
  };

  const startVehicleSearch = () => {
    setCurrentSearchStep(1);
    addMessage("Super ! Par quoi souhaitez-vous commencer ?", "bot", vehicleTypeOptions);
  };

  const handleVehicleTypeSelection = (type: string) => {
    setSelectedVehicleType(type);
    setVehicleIntent(prev => ({ ...prev, type }));
    addMessage(`Type de véhicule: ${type}`, "user");
    setCurrentSearchStep(2);
    addMessage("Excellent choix ! Quel est votre budget ?", "bot", budgetOptions);
  };

  const handleBudgetSelection = (budget: string) => {
    setSelectedBudget(budget);
    let budgetValue = 0;
    
    if (budget === 'less_20k') {
      budgetValue = 20000;
    } else if (budget === '20_40k') {
      budgetValue = 40000;
    } else if (budget === 'more_40k') {
      budgetValue = 50000;
    }
    
    setVehicleIntent(prev => ({ ...prev, budget: budgetValue }));
    addMessage(`Budget: ${budget}`, "user");
    setCurrentSearchStep(3);
    addMessage("Avez-vous une préférence de marque ?", "bot", brandOptions);
  };

  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand);
    setVehicleIntent(prev => ({ ...prev, brand: brand.charAt(0).toUpperCase() + brand.slice(1) }));
    addMessage(`Marque: ${brand}`, "user");
    setCurrentSearchStep(4);
    addMessage("Et préférez-vous un véhicule neuf ou d'occasion ?", "bot", stateOptions);
  };

  const handleStateSelection = (state: string) => {
    setSelectedState(state);
    
    if (state === 'new') {
      setVehicleIntent(prev => ({ ...prev, state: 'neuf' }));
    } else {
      setVehicleIntent(prev => ({ ...prev, state: 'occasion' }));
    }
    
    addMessage(`État: ${state}`, "user");
    
    setTimeout(() => {
      showSearchResults();
    }, 1000);
  };

  const processComplexQuery = (intent: VehicleIntent) => {
    let resultsMessage = '';
    const results = [];
    
    if (intent.model && intent.brand) {
      const matchingVehicles = vehicleInventory.filter(v => 
        v.brand.toLowerCase() === intent.brand?.toLowerCase() && 
        v.model.toLowerCase().includes(intent.model?.toLowerCase() || '')
      );
      
      if (matchingVehicles.length > 0) {
        resultsMessage = `Nous avons ${matchingVehicles.length} ${intent.brand} ${intent.model} disponibles :\n\n`;
        
        matchingVehicles.forEach((vehicle, index) => {
          resultsMessage += `${index + 1}. **${vehicle.brand} ${vehicle.model} ${vehicle.year}**, ${vehicle.price} €, ${vehicle.mileage} km (${vehicle.features[0]}).\n`;
          results.push(vehicle);
        });
        
        resultsMessage += "\nQue souhaitez-vous faire ?\n";
        
        const options = matchingVehicles.map(car => ({ 
          text: `Voir les détails de ${car.brand} ${car.model}`, 
          action: `car_details_${car.id}` 
        }));
        
        options.push({ text: "Simuler un financement", action: "simulate_credit" });
        options.push({ text: "Affiner ma recherche", action: "search_car" });
        
        addMessage(resultsMessage, "bot", options);
        
        if (matchingVehicles.length === 1) {
          // Auto-set for finance simulation
          setFinanceDialog({
            vehicle: `${matchingVehicles[0].brand} ${matchingVehicles[0].model} ${matchingVehicles[0].year}`,
            downPayment: Math.round(matchingVehicles[0].price * 0.2),
            totalAmount: matchingVehicles[0].price
          });
        }
        
        return true;
      }
    }
    
    if (intent.brand && intent.budget) {
      const matchingVehicles = vehicleInventory.filter(v => 
        v.brand.toLowerCase() === intent.brand?.toLowerCase() && 
        v.price <= (intent.budget || Infinity)
      );
      
      if (matchingVehicles.length > 0) {
        resultsMessage = `Nous avons ${matchingVehicles.length} ${intent.brand} dans votre budget :\n\n`;
        
        matchingVehicles.forEach((vehicle, index) => {
          resultsMessage += `${index + 1}. **${vehicle.brand} ${vehicle.model} ${vehicle.year}**, ${vehicle.price} €, ${vehicle.mileage} km (${vehicle.features[0]}).\n`;
          results.push(vehicle);
        });
        
        resultsMessage += "\nQue souhaitez-vous faire ?\n";
        
        const options = matchingVehicles.map(car => ({ 
          text: `Voir les détails de ${car.brand} ${car.model}`, 
          action: `car_details_${car.id}` 
        }));
        
        options.push({ text: "Simuler un financement", action: "simulate_credit" });
        options.push({ text: "Affiner ma recherche", action: "search_car" });
        
        addMessage(resultsMessage, "bot", options);
        return true;
      }
    }
    
    return false;
  };

  const showSearchResults = () => {
    const intent = vehicleIntent;
    const results = [];
    
    // First try to find exact matches
    let filteredVehicles = vehicleInventory.filter(vehicle => {
      if (intent.brand && vehicle.brand.toLowerCase() !== intent.brand.toLowerCase()) return false;
      if (intent.model && !vehicle.model.toLowerCase().includes(intent.model.toLowerCase())) return false;
      if (intent.budget && vehicle.price > intent.budget) return false;
      if (intent.type === 'suv' && !['q3', 'q5', 'q7', 'x1', 'x3', 'x5'].some(m => vehicle.model.toLowerCase().includes(m))) return false;
      if (intent.type === 'berline' && !['a4', 'a6', 'série'].some(m => vehicle.model.toLowerCase().includes(m))) return false;
      return true;
    });
    
    // If no matches, show all vehicles
    if (filteredVehicles.length === 0) {
      filteredVehicles = vehicleInventory.slice(0, 3);
    }
    
    let resultsMessage = "Voici les véhicules correspondant à vos critères :\n\n";
    
    filteredVehicles.forEach((vehicle, index) => {
      resultsMessage += `${index + 1}. **${vehicle.brand} ${vehicle.model} ${vehicle.year}** – ${vehicle.price} € (${vehicle.features[0]})\n`;
      results.push(vehicle);
    });
    
    resultsMessage += "\nVoulez-vous :\n";
    
    const options = filteredVehicles.map(car => ({ 
      text: `Voir les détails de ${car.brand} ${car.model}`, 
      action: `car_details_${car.id}` 
    }));
    
    options.push({ text: "Affiner ma recherche", action: "search_car" });
    options.push({ text: "Voir tout notre stock", action: "view_stock" });
    options.push({ text: "Contacter un conseiller", action: "contact_whatsapp" });
    
    addMessage(resultsMessage, "bot", options);
    
    // Reset search state for next search
    setVehicleIntent({});
  };

  const showVehicleDetails = (carId: string) => {
    const vehicle = vehicleInventory.find(v => v.id === carId);
    
    if (!vehicle) {
      addMessage("Désolé, ce véhicule n'est plus disponible.", "bot");
      return;
    }
    
    const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
    const details = `**${title}**\n\n` +
      `Prix : **${vehicle.price} €**\n` +
      `Année : ${vehicle.year}\n` +
      `Kilométrage : ${vehicle.mileage} km\n` +
      `Caractéristiques :\n` +
      vehicle.features.map(f => `- ${f}`).join('\n') + '\n\n' +
      `**Financement possible** à partir de ${Math.round(vehicle.price * 0.8 / 60)}€/mois sur 60 mois`;
    
    setDialogContent({
      title,
      content: details
    });
    
    setFinanceDialog({
      vehicle: title,
      downPayment: Math.round(vehicle.price * 0.2),
      totalAmount: vehicle.price
    });
    
    setIsDialogOpen(true);
  };

  const showFinanceOptions = (vehicle: typeof vehicleInventory[0]) => {
    const downPayment = Math.round(vehicle.price * 0.2);
    const remainingAmount = vehicle.price - downPayment;
    
    const title = `Options de financement - ${vehicle.brand} ${vehicle.model}`;
    const content = `
      **${vehicle.brand} ${vehicle.model} ${vehicle.year}**
      Prix : **${vehicle.price} €**
      
      Avec un acompte de **${downPayment} €** (20%), vous pouvez financer **${remainingAmount} €** :
      
      - Sur **36 mois** : ${Math.round(remainingAmount / 36)} €/mois
      - Sur **60 mois** : ${Math.round(remainingAmount / 60)} €/mois
      - Sur **84 mois** : ${Math.round(remainingAmount / 84)} €/mois
      
      Tous nos financements sont à **0% d'intérêt**
      
      Voulez-vous une simulation personnalisée ?
    `;
    
    setDialogContent({
      title,
      content
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
    // Check for FAQ responses first
    const faqResponse = findFaqResponse(message);
    
    if (faqResponse) {
      addMessage(faqResponse, 'bot');
      return;
    }
    
    // Extract vehicle intent from user message
    const intent = extractVehicleIntent(message);
    console.log("Detected intent:", intent);
    
    // If we have a complex query with brand and model or brand and budget, show results
    if (Object.keys(intent).length > 1) {
      setVehicleIntent(intent);
      const processed = processComplexQuery(intent);
      if (processed) return;
    }
    
    // Process based on keywords
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('cherche') && lowercaseMessage.includes('voiture')) {
      startVehicleSearch();
    } else if (lowercaseMessage.includes('essai')) {
      addMessage("Bien sûr ! Réservez un essai gratuit :\n- **En concession** : 30 min avec un conseiller.\n- **À domicile** : Possible pour les véhicules > 25k€ (frais selon distance).\n\nVous pouvez prendre rendez-vous dès maintenant. Quel véhicule souhaitez-vous essayer ?", "bot");
    } else if (lowercaseMessage.includes('paiement') || lowercaseMessage.includes('financement') || lowercaseMessage.includes('mensualité')) {
      addMessage("Chez AutoAdi, c'est ultra flexible :\n\n1️⃣ **Vous payez 20%** pour réserver (ex: 6 000€ sur 30 000€)\n2️⃣ **Vous ne payez plus rien** jusqu'à la livraison\n3️⃣ **À réception** :\n   - Soit vous réglez les **80%** d'un coup\n   - Soit en **mensualités** (ex: 400€/mois sur 60 mois)\n\n*Avantage : Vous vérifiez la voiture AVANT de payer le solde !*\n\n✅ **Zéro engagement** entre acompte et livraison\n✅ **Paiement seulement si satisfait**\n✅ **Taux 0%** sur les mensualités\n✅ **Aucun frais caché**", "bot");
    } else if (lowercaseMessage.includes('livraison') || lowercaseMessage.includes('délai')) {
      addMessage("Le délai de livraison en Portugal, en France, en Espagne, en Roumanie, en Italie ne dépasse pas 5 jours. Nous proposons :\n\n🚚 Livraison à domicile (gratuite).\n🏁 Retrait en concession (cadeau de bienvenue offert).", "bot");
    } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('whatsapp') || lowercaseMessage.includes('conseiller')) {
      addMessage("Vous pouvez nous contacter directement par WhatsApp au ☎ +393761753341 (7j/7). Un conseiller vous répondra dans les plus brefs délais.", "bot", [
        { text: "Me faire contacter", action: "contact_whatsapp" }
      ]);
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
    // Convert markdown-like syntax to JSX
    const processedText = message.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .split('\n');

    return (
      <div className="flex flex-col">
        <div>
          {processedText.map((text, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </React.Fragment>
          ))}
        </div>
        
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
          <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: dialogContent.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br />') }} />
          <div className="mt-4 flex justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Fermer
            </Button>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                handleOptionClick(`finance_${dialogContent.title.split(' ')[0].toLowerCase()}`);
              }}
            >
              Simuler un financement
            </Button>
            <Button onClick={() => {
              setIsDialogOpen(false);
              toast.success("Demande d'information envoyée !");
              addMessage("Un conseiller va vous contacter prochainement pour ce véhicule. Merci pour votre intérêt !", "bot", [
                { text: "Contacter par WhatsApp", action: "contact_whatsapp" }
              ]);
            }}>
              Plus d'infos
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
