
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// URL de l'API OpenAI (ou autre service IA)
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Interface pour les messages
interface ChatMessage {
  role: string;
  content: string;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Message d'accueil initial que le bot affichera
  const welcomeMessage: ChatMessage = {
    role: 'assistant',
    content: "Bonjour, je suis votre assistant personnel Auto ADI. Comment puis-je vous aider aujourd'hui ? Je peux vous guider dans l'achat de votre véhicule de luxe ou répondre à vos questions."
  };

  // Base de connaissances FAQ
  const faqDatabase = [
    {
      keywords: ["état", "véhicule", "kilométrage", "kilometers", "kilomètres", "kms", "km"],
      answer: "Tous nos véhicules sont inspectés par nos experts. Le kilométrage exact est indiqué sur chaque fiche produit (exemple : Audi A4 2021 – 45 000 km). L'état est classé comme : **Comme neuf** (aucun défaut mécanique ou esthétique), **Très bon état** (légères marques d'usage) ou **Bon état** (petits défauts sans impact technique)."
    },
    {
      keywords: ["remplacement", "pièces", "mise à jour", "pieces", "remplacer"],
      answer: "Oui, nous indiquons toutes les pièces remplacées (ex : embrayage, freins, batterie) dans le **rapport d'expertise**. Demandez-le pour le véhicule qui vous intéresse !"
    },
    {
      keywords: ["prix", "tarif", "coût", "cout", "cher", "prix?", "pourquoi", "vendez", "ce prix"],
      answer: "Nos prix sont compétitifs car : **Occasions** : Révisées et garanties (pas de mauvaises surprises). **Neufs** : Remises constructeur jusqu'à -15%. **Paiement comptant** : Réduction supplémentaire de **10%**."
    },
    {
      keywords: ["quand", "acheté", "acheter", "origine", "provenance", "qui"],
      answer: "Nous sourçons nos véhicules : **Neufs** : Directement des constructeurs. **Occasions** : Anciens locataires (LOA), reprises clients, ou flottes d'entreprise."
    },
    {
      keywords: ["huile", "entretien", "vidange", "filtre", "maintenance", "révision", "revision"],
      answer: "Tous nos véhicules ont un **carnet d'entretien complet** (huile, filtres, vidanges) respectant les préconisations constructeur. Exemple : *BMW X3 2020 – 4 vidanges effectuées*."
    },
    {
      keywords: ["NIV", "titre", "propriété", "propriete", "papiers", "identité", "identite", "documents"],
      answer: "Absolument ! Ces documents sont disponibles : **En concession** : Présentés avant l'achat. **En ligne** : Envoyés cryptés après signature d'un NDA (pour éviter la fraude)."
    },
    {
      keywords: ["essai", "essais", "tester", "test", "essayer", "conduire"],
      answer: "Oui ! Réservez un essai gratuit : **En concession** : 30 min avec un conseiller. **À domicile** : Possible pour les véhicules > 25k€ (frais selon distance)."
    },
    {
      keywords: ["inspection", "indépendante", "independante", "vérifier", "verifier", "inspection?"],
      answer: "Bien sûr ! Nous recommandons même : **Centres agréés** : Dekra, Norauto. **Coût** : Offert pour les véhicules > 20k€ (sinon 150€ à votre charge)."
    },
    {
      keywords: ["problème", "probleme", "régler", "regler", "avant", "achat", "réparer", "reparer"],
      answer: "Tout défaut détecté est réparé avant livraison (ex : peinture, pièce mécanique). Sinon, nous ajustons le prix ou annulons la vente."
    },
    {
      keywords: ["budget", "combien", "coûte", "coute", "fourchette", "prix"],
      answer: "Nous avons des véhicules de **10k€ à 100k€**. Dites-nous votre fourchette, nous trouverons la meilleure offre !"
    },
    {
      keywords: ["consommation", "carburant", "essence", "diesel", "litres", "litre", "l/100", "fuel"],
      answer: "Elle correspond aux données constructeur (±5%). Exemple : **Diesel** : 4,5L/100km (autoroute). **Essence** : 6,0L/100km (ville)."
    },
    {
      keywords: ["état général", "etat general", "état", "etat", "notation"],
      answer: "Évalué via notre grille **AutoAdi Certified** : **Mécanique** : 10/10. **Carrosserie** : 8/10 (rayures mineures). **Intérieur** : 9/10 (sièges quasi neufs)."
    },
    {
      keywords: ["contrôle technique", "controle technique", "ct", "contrôle", "controle", "technique"],
      answer: "Oui, valide 6 mois minimum pour toutes nos occasions. Exemple : *Contrôle technique du 01/01/2024 – Aucun point critique*."
    },
    {
      keywords: ["première main", "premiere main", "seconde", "troisième", "troisieme", "propriétaires", "proprietaires"],
      answer: "Nous précisons toujours le nombre de propriétaires : **Première main** : Modèles neufs ou ex-LOA. **Seconde main** : 80% de notre stock."
    },
    {
      keywords: ["négociable", "negociable", "négocier", "negocier", "baisser", "réduction", "reduction"],
      answer: "Oui, surtout pour : **Paiement comptant** (jusqu'à -10%). **Anciens modèles** (stock > 6 mois)."
    },
    {
      keywords: ["combien", "personnes", "possédé", "possede", "proprietaire", "propriétaire"],
      answer: "Entre **1 et 3 maximum**. Exemple : *Volvo XC60 – 1 propriétaire (dossier transparent disponible)*."
    },
    {
      keywords: ["utilisé", "utilise", "ville", "autoroute", "trajets", "trajet", "long"],
      answer: "Nous vérifions l'historique : **Autoroute** : Usure moteur réduite (idéal). **Ville** : Embrayage plus sollicité."
    },
    {
      keywords: ["garantie", "durée", "duree", "éléments", "elements", "couverts", "couvert"],
      answer: "Garantie constructeur ou **AutoAdi Extended** : **Neufs** : 2 à 5 ans (moteur, boîte, électronique). **Occasions** : 12 à 24 mois (selon kilométrage)."
    },
    {
      keywords: ["carrosserie", "corps", "tôle", "tole", "peinture", "rayures", "rayure"],
      answer: "Inspectée avec un **testeur d'épaisseur de peinture**. Aucune réparation masquée !"
    },
    {
      keywords: ["pneus", "pneu", "gommes", "gomme", "etat", "état"],
      answer: "Profondeur minimale de **3 mm** (sinon remplacés). Exemple : *Pneus neufs Michelin sur Tesla Model 3*."
    },
    {
      keywords: ["intérieur", "interieur", "entretenu", "entretien", "propre", "nettoyage"],
      answer: "Oui, nettoyage **pro complet** avant livraison (sièges, moquette, odeur)."
    },
    {
      keywords: ["bruits", "bruit", "étranges", "etranges", "démarrage", "demarrage", "roulant"],
      answer: "Non, tous nos véhicules passent un **test acoustique**. Bruit = diagnostic gratuit."
    },
    {
      keywords: ["papiers", "nécessaires", "necessaires", "acheter", "occasion", "documents"],
      answer: "**Pour vous** : Pièce d'identité + justificatif de domicile. **Pour la voiture** : Carte grise + contrôle technique + rapport d'expertise."
    },
    {
      keywords: ["annuler", "annulation", "rétractation", "retractation", "remboursement"],
      answer: "Oui ! 14 jours de rétractation, remboursement intégral."
    },
    {
      keywords: ["extension", "garantie", "prolonger", "5 ans", "5ans"],
      answer: "Oui, jusqu'à 5 ans. Demandez un devis !"
    },
    {
      keywords: ["payer", "80%", "restants", "reste", "paiement"],
      answer: "**Aucun paiement entre l'acompte et la livraison !** Vous payez seulement **20% à la commande** pour réserver le véhicule. Les **80% restants** sont réglés : **À la livraison** en un seul versement **OU** en mensualités sans intérêt (6-84 mois) après livraison."
    },
    {
      keywords: ["exemple", "paiement", "différé", "differe", "concret"],
      answer: "Pour un véhicule à **40 000€** : 1. **Aujourd'hui** : 8 000€ (20%). 2. **À la livraison (dans 2 semaines)** : Option 1 : Paiement des **32 000€** restants en une fois, Option 2 : Mensualités de **533€/mois sur 60 mois** (0% d'intérêt)."
    },
    {
      keywords: ["voir", "véhicule", "vehicule", "avant", "payer", "80%"],
      answer: "**Oui, absolument ! vous pouvez venir voir la voiture en Italie ou en Espagne**. Vous pouvez : **Vérifier le véhicule** à la livraison, **Faire un essai final**, **Payer seulement si satisfait** (dans les 48h suivant la livraison)."
    },
    {
      keywords: ["refuse", "refuser", "véhicule", "vehicule", "livraison"],
      answer: "Deux options : 1. **Échange** : Nous trouvons un autre modèle. 2. **Remboursement** : Votre acompte de 20% est intégralement restitué."
    },
    {
      keywords: ["partie", "livraison", "reste", "mensualités", "mensualites"],
      answer: "Oui ! Par exemple : **À la livraison** : 10 000€, **Reste** : 22 000€ en 36 mensualités de 611€."
    },
    {
      keywords: ["délai", "delai", "livraison", "temps", "attente", "durée", "duree"],
      answer: "Je précise que le délai de livraison en Portugal, en France, En Espagne, en Roumanie, en Italie ne dépasse pas 5 jours."
    }
  ];

  // Réponses de secours en cas d'erreur API
  const fallbackResponses = [
    "Je vous remercie pour votre demande. Afin de vous apporter une réponse précise, puis-je vous proposer d'être mis en relation avec l'un de nos conseillers spécialisés ?",
    "Votre question mérite une attention particulière. Permettez-moi de collecter davantage d'informations sur vos attentes pour vous proposer la solution idéale.",
    "Je comprends l'importance de votre demande. Pour vous garantir un service d'excellence, je peux organiser un rendez-vous avec notre expert dédié à ce sujet. Cela vous conviendrait-il ?",
    "Votre satisfaction est notre priorité. Pour répondre avec précision à votre demande, j'aurais besoin de quelques informations supplémentaires. Puis-je vous demander plus de détails ?"
  ];

  // Fonction pour obtenir une réponse de l'IA
  const getAIResponse = async (userMessages: ChatMessage[]): Promise<string> => {
    try {
      // Récupérer le dernier message de l'utilisateur
      const lastUserMessage = userMessages[userMessages.length - 1].content.toLowerCase();
      
      // Vérifier si la question correspond à une FAQ
      let bestMatchScore = 0;
      let bestMatchAnswer = "";
      
      for (const faqItem of faqDatabase) {
        let matchScore = 0;
        for (const keyword of faqItem.keywords) {
          if (lastUserMessage.includes(keyword.toLowerCase())) {
            matchScore += 1;
          }
        }
        
        // Si plusieurs mots-clés correspondent, c'est probablement la bonne réponse
        if (matchScore > bestMatchScore) {
          bestMatchScore = matchScore;
          bestMatchAnswer = faqItem.answer;
        }
      }
      
      // Si nous avons trouvé une correspondance dans la FAQ
      if (bestMatchScore > 0) {
        return bestMatchAnswer;
      }
      
      // Préparation du contexte pour l'IA
      const systemPrompt = {
        role: "system", 
        content: `Vous êtes l'assistant virtuel d'Auto ADI, une concession automobile de luxe. 
        Votre mission est d'offrir un service client exceptionnel, de répondre aux questions sur les véhicules 
        de luxe (Mercedes, BMW, Audi, Porsche, etc.), les options de financement, les garanties, et d'aider 
        les clients dans leur parcours d'achat. Soyez courtois, précis et professionnel. 
        Limitez vos réponses à 3-4 phrases maximum pour maintenir l'engagement.`
      };
      
      // Pour test sans API key, simulons une réponse IA
      // Dans un environnement réel, vous utiliseriez fetch() pour appeler l'API
      console.log("Sending prompt to AI:", [...userMessages]);
      
      // Simulation d'appel API - À remplacer par une vraie API
      return new Promise((resolve) => {
        const userQuery = lastUserMessage;
        
        // Logique de réponse contextuelle basée sur le contenu
        setTimeout(() => {
          if (userQuery.includes('bonjour') || userQuery.includes('salut') || userQuery.includes('hello')) {
            resolve("Bonjour ! Je suis l'assistant virtuel d'Auto ADI. Comment puis-je vous aider aujourd'hui dans votre recherche de véhicule de luxe ?");
          } 
          else if (userQuery.includes('mercedes')) {
            resolve("Mercedes-Benz représente l'excellence allemande en matière de luxe automobile. Notre gamme comprend les Classe S, Classe E, GLE et AMG GT, offrant un parfait équilibre entre confort, performance et innovation. Souhaitez-vous des informations sur un modèle en particulier ?");
          }
          else if (userQuery.includes('bmw')) {
            resolve("BMW incarne le plaisir de conduire avec sa signature 'The Ultimate Driving Machine'. Notre sélection inclut les Série 7, X7, et M8 qui combinent sportivité et raffinement. Recherchez-vous une berline, un SUV ou un coupé performant ?");
          }
          else if (userQuery.includes('porsche')) {
            resolve("Porsche représente l'excellence en matière de voitures de sport. Notre collection comprend les légendaires 911, Taycan électrique et Cayenne. Chaque Porsche offre des performances exceptionnelles et un design intemporel. Quel modèle vous intéresse particulièrement ?");
          }
          else if (userQuery.includes('audi')) {
            resolve("Audi se distingue par son design avant-gardiste et sa technologie de pointe. Notre gamme comprend les A8, e-tron GT et Q8, alliant élégance, confort et performance. Puis-je vous renseigner sur un modèle spécifique ou sur nos offres actuelles ?");
          }
          else if (userQuery.includes('financement') || userQuery.includes('crédit') || userQuery.includes('leasing')) {
            resolve("Auto ADI propose plusieurs solutions de financement premium : crédit classique, LOA (Location avec Option d'Achat) et LLD (Location Longue Durée). Nous adaptons nos offres à votre situation personnelle pour une expérience sans contrainte. Quelle formule vous intéresse ?");
          }
          else if (userQuery.includes('merci')) {
            resolve("Je vous en prie, c'est avec plaisir que je vous accompagne dans votre projet automobile. N'hésitez pas si vous avez d'autres questions. La satisfaction de nos clients est notre priorité absolue chez Auto ADI.");
          }
          else {
            // Réponse générique pour les autres requêtes
            resolve("Votre demande est importante pour nous. Chez Auto ADI, nous proposons une sélection exclusive de véhicules de prestige et un service personnalisé. Pour mieux répondre à vos attentes, pourriez-vous préciser votre recherche ou votre intérêt particulier ?");
          }
        }, 800); // Simulation de délai réseau
      });
    } catch (error) {
      console.error("Erreur lors de la communication avec l'API:", error);
      toast({
        title: "Erreur de communication",
        description: "Impossible de contacter notre service intelligent pour le moment.",
        variant: "destructive",
      });
      
      // En cas d'erreur, utiliser une réponse de secours
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      return fallbackResponses[randomIndex];
    }
  };

  const sendMessage = (content: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    
    // Simuler la réponse du chatbot
    setIsTyping(true);
    
    // Obtenir une réponse de l'IA
    getAIResponse(updatedMessages)
      .then(response => {
        const botResponse: ChatMessage = { role: 'assistant', content: response };
        setMessages(prev => [...prev, botResponse]);
      })
      .catch(error => {
        console.error("Erreur lors de la génération de réponse:", error);
        // Fallback en cas d'erreur
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        const fallbackResponse: ChatMessage = { 
          role: 'assistant', 
          content: fallbackResponses[randomIndex] 
        };
        setMessages(prev => [...prev, fallbackResponse]);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };

  return {
    messages,
    sendMessage,
    input,
    setInput,
    isTyping
  };
};
