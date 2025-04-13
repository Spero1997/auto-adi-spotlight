
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Clipboard, ArrowRight, Banknote, FileCheck, CalendarClock, Clock, Check, Heart, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Rachat = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page de rachat
  const translations = {
    pageTitle: {
      FR: "Vendez votre véhicule rapidement et au meilleur prix",
      EN: "Sell your vehicle quickly and at the best price",
      ES: "Venda su vehículo rápidamente y al mejor precio",
      IT: "Vendi il tuo veicolo rapidamente e al miglior prezzo",
      PT: "Venda o seu veículo rapidamente e pelo melhor preço",
      RO: "Vindeți vehiculul dvs. rapid și la cel mai bun preț"
    },
    subTitle: {
      FR: "Auto Adi vous propose une solution simple et transparente pour vendre votre voiture, quelle que soit sa marque, son modèle ou son état.",
      EN: "Auto Adi offers you a simple and transparent solution to sell your car, regardless of its brand, model or condition.",
      ES: "Auto Adi le ofrece una solución simple y transparente para vender su coche, independientemente de su marca, modelo o estado.",
      IT: "Auto Adi ti offre una soluzione semplice e trasparente per vendere la tua auto, indipendentemente dalla marca, modello o condizioni.",
      PT: "A Auto Adi oferece-lhe uma solução simples e transparente para vender o seu carro, independentemente da marca, modelo ou estado.",
      RO: "Auto Adi vă oferă o soluție simplă și transparentă pentru a vă vinde mașina, indiferent de marca, modelul sau starea acesteia."
    },
    estimateVehicle: {
      FR: "Estimer mon véhicule",
      EN: "Estimate my vehicle",
      ES: "Estimar mi vehículo",
      IT: "Valutare il mio veicolo",
      PT: "Estimar o meu veículo",
      RO: "Estimați vehiculul meu"
    },
    callUs: {
      FR: "Nous appeler",
      EN: "Call us",
      ES: "Llámenos",
      IT: "Chiamaci",
      PT: "Ligue-nos",
      RO: "Sunați-ne"
    },
    whySellTitle: {
      FR: "Pourquoi vendre votre véhicule à Auto Adi ?",
      EN: "Why sell your vehicle to Auto Adi?",
      ES: "¿Por qué vender su vehículo a Auto Adi?",
      IT: "Perché vendere il tuo veicolo ad Auto Adi?",
      PT: "Por que vender o seu veículo à Auto Adi?",
      RO: "De ce să vindeți vehiculul dvs. la Auto Adi?"
    },
    whySellDesc: {
      FR: "Nous vous offrons un service complet de rachat de véhicules avec des avantages exclusifs.",
      EN: "We offer you a complete vehicle buyback service with exclusive benefits.",
      ES: "Le ofrecemos un servicio completo de recompra de vehículos con beneficios exclusivos.",
      IT: "Ti offriamo un servizio completo di riacquisto di veicoli con vantaggi esclusivi.",
      PT: "Oferecemos-lhe um serviço completo de recompra de veículos com benefícios exclusivos.",
      RO: "Vă oferim un serviciu complet de răscumpărare a vehiculelor cu beneficii exclusive."
    },
    competitivePrice: {
      FR: "Prix compétitif",
      EN: "Competitive price",
      ES: "Precio competitivo",
      IT: "Prezzo competitivo",
      PT: "Preço competitivo",
      RO: "Preț competitiv"
    },
    competitivePriceDesc: {
      FR: "Nous vous proposons le meilleur prix du marché pour votre véhicule, basé sur une évaluation précise.",
      EN: "We offer you the best market price for your vehicle, based on an accurate assessment.",
      ES: "Le ofrecemos el mejor precio de mercado para su vehículo, basado en una evaluación precisa.",
      IT: "Ti offriamo il miglior prezzo di mercato per il tuo veicolo, basato su una valutazione accurata.",
      PT: "Oferecemos-lhe o melhor preço de mercado para o seu veículo, com base numa avaliação precisa.",
      RO: "Vă oferim cel mai bun preț de piață pentru vehiculul dvs., bazat pe o evaluare precisă."
    },
    fastSale: {
      FR: "Vente rapide",
      EN: "Fast sale",
      ES: "Venta rápida",
      IT: "Vendita rapida",
      PT: "Venda rápida",
      RO: "Vânzare rapidă"
    },
    fastSaleDesc: {
      FR: "Évitez les délais d'une vente entre particuliers et obtenez une offre de rachat en moins de 24h.",
      EN: "Avoid the delays of a private sale and get a buyback offer in less than 24 hours.",
      ES: "Evite los retrasos de una venta privada y obtenga una oferta de recompra en menos de 24 horas.",
      IT: "Evita i ritardi di una vendita privata e ottieni un'offerta di riacquisto in meno di 24 ore.",
      PT: "Evite os atrasos de uma venda privada e obtenha uma oferta de recompra em menos de 24 horas.",
      RO: "Evitați întârzierile unei vânzări private și obțineți o ofertă de răscumpărare în mai puțin de 24 de ore."
    },
    simplifiedProcess: {
      FR: "Démarches simplifiées",
      EN: "Simplified process",
      ES: "Proceso simplificado",
      IT: "Processo semplificato",
      PT: "Processo simplificado",
      RO: "Proces simplificat"
    },
    simplifiedProcessDesc: {
      FR: "Nous nous occupons de toutes les formalités administratives liées à la vente de votre véhicule.",
      EN: "We take care of all the administrative formalities related to the sale of your vehicle.",
      ES: "Nos encargamos de todas las formalidades administrativas relacionadas con la venta de su vehículo.",
      IT: "Ci occupiamo di tutte le formalità amministrative legate alla vendita del tuo veicolo.",
      PT: "Tratamos de todas as formalidades administrativas relacionadas com a venda do seu veículo.",
      RO: "Ne ocupăm de toate formalitățile administrative legate de vânzarea vehiculului dvs."
    },
    buybackAsIs: {
      FR: "Rachat en l'état",
      EN: "Buyback as is",
      ES: "Recompra tal cual",
      IT: "Riacquisto nello stato attuale",
      PT: "Recompra no estado em que se encontra",
      RO: "Răscumpărare în starea actuală"
    },
    buybackAsIsDesc: {
      FR: "Nous rachetons votre voiture quelque soit son état : en panne, accidentée ou avec un fort kilométrage.",
      EN: "We buy back your car whatever its condition: broken down, damaged or with high mileage.",
      ES: "Recompramos su coche sea cual sea su estado: averiado, accidentado o con un alto kilometraje.",
      IT: "Riacquistiamo la tua auto qualunque sia la sua condizione: in panne, danneggiata o con chilometraggio elevato.",
      PT: "Recompramos o seu carro seja qual for o seu estado: avariado, acidentado ou com quilometragem elevada.",
      RO: "Răscumpărăm mașina dvs. indiferent de starea sa: în pană, avariată sau cu kilometraj ridicat."
    },
    howItWorks: {
      FR: "Comment ça marche ?",
      EN: "How does it work?",
      ES: "¿Cómo funciona?",
      IT: "Come funziona?",
      PT: "Como funciona?",
      RO: "Cum funcționează?"
    },
    howItWorksDesc: {
      FR: "Un processus simple en 4 étapes pour vendre votre véhicule rapidement.",
      EN: "A simple 4-step process to sell your vehicle quickly.",
      ES: "Un simple proceso de 4 pasos para vender su vehículo rápidamente.",
      IT: "Un semplice processo in 4 fasi per vendere il tuo veicolo rapidamente.",
      PT: "Um processo simples de 4 etapas para vender o seu veículo rapidamente.",
      RO: "Un proces simplu în 4 pași pentru a vă vinde vehiculul rapid."
    },
    step1Title: {
      FR: "1. Demande d'estimation",
      EN: "1. Request for estimation",
      ES: "1. Solicitud de valoración",
      IT: "1. Richiesta di valutazione",
      PT: "1. Pedido de avaliação",
      RO: "1. Cerere de evaluare"
    },
    step1Desc: {
      FR: "Remplissez notre formulaire en ligne avec les informations de votre véhicule ou contactez-nous par téléphone. Vous pouvez également vous rendre directement dans l'une de nos concessions.",
      EN: "Fill out our online form with your vehicle information or contact us by phone. You can also go directly to one of our dealerships.",
      ES: "Rellene nuestro formulario en línea con la información de su vehículo o contáctenos por teléfono. También puede acudir directamente a uno de nuestros concesionarios.",
      IT: "Compila il nostro modulo online con le informazioni del tuo veicolo o contattaci telefonicamente. Puoi anche recarti direttamente in una delle nostre concessionarie.",
      PT: "Preencha o nosso formulário online com as informações do seu veículo ou contacte-nos por telefone. Também pode dirigir-se diretamente a uma das nossas concessões.",
      RO: "Completați formularul nostru online cu informațiile despre vehiculul dvs. sau contactați-ne telefonic. De asemenea, puteți merge direct la una dintre concesiunile noastre."
    },
    step2Title: {
      FR: "2. Expertise de votre véhicule",
      EN: "2. Vehicle assessment",
      ES: "2. Evaluación de su vehículo",
      IT: "2. Valutazione del tuo veicolo",
      PT: "2. Avaliação do seu veículo",
      RO: "2. Evaluarea vehiculului dvs."
    },
    step2Desc: {
      FR: "Nos experts évaluent votre véhicule soit à distance sur base de photos, soit lors d'un rendez-vous en concession. L'expertise prend en compte l'état général, l'historique d'entretien et le marché actuel.",
      EN: "Our experts evaluate your vehicle either remotely based on photos, or during an appointment at the dealership. The assessment takes into account the general condition, maintenance history and current market.",
      ES: "Nuestros expertos evalúan su vehículo ya sea de forma remota basándose en fotos, o durante una cita en el concesionario. La evaluación tiene en cuenta el estado general, el historial de mantenimiento y el mercado actual.",
      IT: "I nostri esperti valutano il tuo veicolo sia a distanza in base alle foto, sia durante un appuntamento in concessionaria. La valutazione tiene conto delle condizioni generali, della storia di manutenzione e del mercato attuale.",
      PT: "Os nossos especialistas avaliam o seu veículo, seja remotamente com base em fotografias, seja durante uma marcação na concessão. A avaliação tem em conta o estado geral, o histórico de manutenção e o mercado atual.",
      RO: "Experții noștri evaluează vehiculul dvs. fie de la distanță pe baza fotografiilor, fie în timpul unei programări la concesiune. Evaluarea ține cont de starea generală, istoricul de întreținere și piața actuală."
    },
    step3Title: {
      FR: "3. Offre de rachat",
      EN: "3. Buyback offer",
      ES: "3. Oferta de recompra",
      IT: "3. Offerta di riacquisto",
      PT: "3. Oferta de recompra",
      RO: "3. Oferta de răscumpărare"
    },
    step3Desc: {
      FR: "Vous recevez une offre ferme et sans engagement sous 24h. Notre proposition est valable 7 jours, vous laissant le temps de prendre votre décision.",
      EN: "You receive a firm and non-binding offer within 24 hours. Our proposal is valid for 7 days, giving you time to make your decision.",
      ES: "Recibe una oferta firme y sin compromiso en 24 horas. Nuestra propuesta es válida durante 7 días, dándole tiempo para tomar su decisión.",
      IT: "Ricevi un'offerta ferma e senza impegno entro 24 ore. La nostra proposta è valida per 7 giorni, dandoti il tempo di prendere la tua decisione.",
      PT: "Recebe uma oferta firme e sem compromisso no prazo de 24 horas. A nossa proposta é válida por 7 dias, dando-lhe tempo para tomar a sua decisão.",
      RO: "Primiți o ofertă fermă și fără angajament în 24 de ore. Propunerea noastră este valabilă 7 zile, oferindu-vă timp să luați decizia."
    },
    step4Title: {
      FR: "4. Finalisation de la vente",
      EN: "4. Finalization of the sale",
      ES: "4. Finalización de la venta",
      IT: "4. Finalizzazione della vendita",
      PT: "4. Finalização da venda",
      RO: "4. Finalizarea vânzării"
    },
    step4Desc: {
      FR: "Si vous acceptez notre offre, nous nous occupons de toutes les formalités administratives. Le paiement est effectué par virement bancaire ou par chèque de banque le jour même.",
      EN: "If you accept our offer, we take care of all the administrative formalities. Payment is made by bank transfer or bank check on the same day.",
      ES: "Si acepta nuestra oferta, nos encargamos de todas las formalidades administrativas. El pago se realiza mediante transferencia bancaria o cheque bancario el mismo día.",
      IT: "Se accetti la nostra offerta, ci occupiamo di tutte le formalità amministrative. Il pagamento viene effettuato tramite bonifico bancario o assegno bancario lo stesso giorno.",
      PT: "Se aceitar a nossa oferta, tratamos de todas as formalidades administrativas. O pagamento é efetuado por transferência bancária ou cheque bancário no próprio dia.",
      RO: "Dacă acceptați oferta noastră, ne ocupăm de toate formalitățile administrative. Plata se face prin transfer bancar sau cec bancar în aceeași zi."
    },
    estimateYourVehicle: {
      FR: "Estimez votre véhicule",
      EN: "Estimate your vehicle",
      ES: "Estime su vehículo",
      IT: "Valuta il tuo veicolo",
      PT: "Estime o seu veículo",
      RO: "Estimați vehiculul dvs."
    },
    formInstructions: {
      FR: "Remplissez ce formulaire pour recevoir une estimation gratuite de votre véhicule sous 24h.",
      EN: "Fill out this form to receive a free estimate of your vehicle within 24 hours.",
      ES: "Rellene este formulario para recibir una estimación gratuita de su vehículo en 24 horas.",
      IT: "Compila questo modulo per ricevere una stima gratuita del tuo veicolo entro 24 ore.",
      PT: "Preencha este formulário para receber uma estimativa gratuita do seu veículo dentro de 24 horas.",
      RO: "Completați acest formular pentru a primi o estimare gratuită a vehiculului dvs. în 24 de ore."
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
    year: {
      FR: "Année",
      EN: "Year",
      ES: "Año",
      IT: "Anno",
      PT: "Ano",
      RO: "An"
    },
    mileage: {
      FR: "Kilométrage",
      EN: "Mileage",
      ES: "Kilometraje",
      IT: "Chilometraggio",
      PT: "Quilometragem",
      RO: "Kilometraj"
    },
    fuelType: {
      FR: "Type de carburant",
      EN: "Fuel type",
      ES: "Tipo de combustible",
      IT: "Tipo di carburante",
      PT: "Tipo de combustível",
      RO: "Tip de combustibil"
    },
    select: {
      FR: "Sélectionnez",
      EN: "Select",
      ES: "Seleccione",
      IT: "Seleziona",
      PT: "Selecione",
      RO: "Selectați"
    },
    gasoline: {
      FR: "Essence",
      EN: "Gasoline",
      ES: "Gasolina",
      IT: "Benzina",
      PT: "Gasolina",
      RO: "Benzină"
    },
    diesel: {
      FR: "Diesel",
      EN: "Diesel",
      ES: "Diésel",
      IT: "Diesel",
      PT: "Diesel",
      RO: "Diesel"
    },
    hybrid: {
      FR: "Hybride",
      EN: "Hybrid",
      ES: "Híbrido",
      IT: "Ibrido",
      PT: "Híbrido",
      RO: "Hibrid"
    },
    electric: {
      FR: "Électrique",
      EN: "Electric",
      ES: "Eléctrico",
      IT: "Elettrico",
      PT: "Elétrico",
      RO: "Electric"
    },
    lpg: {
      FR: "GPL",
      EN: "LPG",
      ES: "GLP",
      IT: "GPL",
      PT: "GPL",
      RO: "GPL"
    },
    generalCondition: {
      FR: "État général du véhicule",
      EN: "General condition of the vehicle",
      ES: "Estado general del vehículo",
      IT: "Condizioni generali del veicolo",
      PT: "Estado geral do veículo",
      RO: "Starea generală a vehiculului"
    },
    excellent: {
      FR: "Excellent - Comme neuf",
      EN: "Excellent - Like new",
      ES: "Excelente - Como nuevo",
      IT: "Eccellente - Come nuovo",
      PT: "Excelente - Como novo",
      RO: "Excelent - Ca nou"
    },
    good: {
      FR: "Bon - Quelques marques d'usure",
      EN: "Good - Some wear marks",
      ES: "Bueno - Algunas marcas de desgaste",
      IT: "Buono - Alcuni segni di usura",
      PT: "Bom - Algumas marcas de desgaste",
      RO: "Bun - Câteva semne de uzură"
    },
    average: {
      FR: "Moyen - Usure normale",
      EN: "Average - Normal wear",
      ES: "Medio - Desgaste normal",
      IT: "Medio - Usura normale",
      PT: "Médio - Desgaste normal",
      RO: "Mediu - Uzură normală"
    },
    poor: {
      FR: "Mauvais - Problèmes mécaniques ou esthétiques",
      EN: "Poor - Mechanical or aesthetic problems",
      ES: "Malo - Problemas mecánicos o estéticos",
      IT: "Scarso - Problemi meccanici o estetici",
      PT: "Mau - Problemas mecânicos ou estéticos",
      RO: "Slab - Probleme mecanice sau estetice"
    },
    damaged: {
      FR: "Accidenté",
      EN: "Damaged",
      ES: "Accidentado",
      IT: "Danneggiato",
      PT: "Acidentado",
      RO: "Avariat"
    },
    name: {
      FR: "Nom",
      EN: "Name",
      ES: "Nombre",
      IT: "Nome",
      PT: "Nome",
      RO: "Nume"
    },
    phone: {
      FR: "Téléphone",
      EN: "Phone",
      ES: "Teléfono",
      IT: "Telefono",
      PT: "Telefone",
      RO: "Telefon"
    },
    email: {
      FR: "Email",
      EN: "Email",
      ES: "Correo electrónico",
      IT: "Email",
      PT: "Email",
      RO: "Email"
    },
    comments: {
      FR: "Commentaires (optionnel)",
      EN: "Comments (optional)",
      ES: "Comentarios (opcional)",
      IT: "Commenti (opzionale)",
      PT: "Comentários (opcional)",
      RO: "Comentarii (opțional)"
    },
    requestEstimate: {
      FR: "Demander une estimation",
      EN: "Request an estimate",
      ES: "Solicitar una estimación",
      IT: "Richiedi una valutazione",
      PT: "Solicitar uma estimativa",
      RO: "Solicitați o estimare"
    },
    documentsToProvide: {
      FR: "Documents à prévoir",
      EN: "Documents to provide",
      ES: "Documentos a preparar",
      IT: "Documenti da preparare",
      PT: "Documentos a fornecer",
      RO: "Documente de pregătit"
    },
    documentsDesc: {
      FR: "Pour la vente de votre véhicule, vous devrez présenter les documents suivants :",
      EN: "For the sale of your vehicle, you will need to present the following documents:",
      ES: "Para la venta de su vehículo, deberá presentar los siguientes documentos:",
      IT: "Per la vendita del tuo veicolo, dovrai presentare i seguenti documenti:",
      PT: "Para a venda do seu veículo, terá de apresentar os seguintes documentos:",
      RO: "Pentru vânzarea vehiculului dvs., va trebui să prezentați următoarele documente:"
    },
    registrationCard: {
      FR: "Carte grise originale du véhicule",
      EN: "Original vehicle registration card",
      ES: "Tarjeta de registro original del vehículo",
      IT: "Libretto di circolazione originale del veicolo",
      PT: "Cartão de registo original do veículo",
      RO: "Cartea de înmatriculare originală a vehiculului"
    },
    idCard: {
      FR: "Pièce d'identité en cours de validité",
      EN: "Valid identity document",
      ES: "Documento de identidad válido",
      IT: "Documento d'identità valido",
      PT: "Documento de identidade válido",
      RO: "Document de identitate valabil"
    },
    proofOfAddress: {
      FR: "Justificatif de domicile de moins de 3 mois",
      EN: "Proof of address less than 3 months old",
      ES: "Comprobante de domicilio de menos de 3 meses",
      IT: "Prova di indirizzo di meno di 3 mesi",
      PT: "Comprovativo de morada com menos de 3 meses",
      RO: "Dovada adresei mai recentă de 3 luni"
    },
    maintenanceLog: {
      FR: "Carnet d'entretien et factures d'entretien (si disponibles)",
      EN: "Maintenance log and maintenance invoices (if available)",
      ES: "Libro de mantenimiento y facturas de mantenimiento (si están disponibles)",
      IT: "Libretto di manutenzione e fatture di manutenzione (se disponibili)",
      PT: "Livro de manutenção e faturas de manutenção (se disponíveis)",
      RO: "Caiet de întreținere și facturi de întreținere (dacă sunt disponibile)"
    },
    technicalInspection: {
      FR: "Contrôle technique de moins de 6 mois pour les véhicules de plus de 4 ans",
      EN: "Technical inspection less than 6 months old for vehicles over 4 years old",
      ES: "Inspección técnica de menos de 6 meses para vehículos de más de 4 años",
      IT: "Revisione tecnica di meno di 6 mesi per i veicoli di oltre 4 anni",
      PT: "Inspeção técnica com menos de 6 meses para veículos com mais de 4 anos",
      RO: "Inspecție tehnică mai recentă de 6 luni pentru vehiculele mai vechi de 4 ani"
    },
    keys: {
      FR: "Les deux clés du véhicule",
      EN: "Both vehicle keys",
      ES: "Ambas llaves del vehículo",
      IT: "Entrambe le chiavi del veicolo",
      PT: "Ambas as chaves do veículo",
      RO: "Ambele chei ale vehiculului"
    },
    testimonial: {
      FR: "Témoignage client",
      EN: "Customer testimonial",
      ES: "Testimonio del cliente",
      IT: "Testimonianza del cliente",
      PT: "Testemunho do cliente",
      RO: "Testimonial client"
    },
    testimonialText: {
      FR: "\"J'avais besoin de vendre ma voiture rapidement pour financer mon prochain achat. Auto Adi m'a proposé un prix juste et a géré toutes les démarches administratives. Transaction rapide et professionnelle !\"",
      EN: "\"I needed to sell my car quickly to finance my next purchase. Auto Adi offered me a fair price and handled all the administrative procedures. Fast and professional transaction!\"",
      ES: "\"Necesitaba vender mi coche rápidamente para financiar mi próxima compra. Auto Adi me ofreció un precio justo y se encargó de todos los trámites administrativos. ¡Transacción rápida y profesional!\"",
      IT: "\"Avevo bisogno di vendere la mia auto velocemente per finanziare il mio prossimo acquisto. Auto Adi mi ha offerto un prezzo equo e ha gestito tutte le pratiche amministrative. Transazione rapida e professionale!\"",
      PT: "\"Precisava de vender o meu carro rapidamente para financiar a minha próxima compra. A Auto Adi ofereceu-me um preço justo e tratou de todos os procedimentos administrativos. Transação rápida e profissional!\"",
      RO: "\"Aveam nevoie să-mi vând mașina rapid pentru a-mi finanța următoarea achiziție. Auto Adi mi-a oferit un preț corect și s-a ocupat de toate procedurile administrative. Tranzacție rapidă și profesională!\""
    },
    testimonialName: {
      FR: "Michel D.",
      EN: "Michel D.",
      ES: "Michel D.",
      IT: "Michel D.",
      PT: "Michel D.",
      RO: "Michel D."
    },
    testimonialLocation: {
      FR: "Lyon",
      EN: "Lyon",
      ES: "Lyon",
      IT: "Lyon",
      PT: "Lyon",
      RO: "Lyon"
    },
    needHelp: {
      FR: "Besoin d'aide ?",
      EN: "Need help?",
      ES: "¿Necesita ayuda?",
      IT: "Hai bisogno di aiuto?",
      PT: "Precisa de ajuda?",
      RO: "Aveți nevoie de ajutor?"
    },
    needHelpDesc: {
      FR: "Notre équipe est à votre disposition pour répondre à toutes vos questions concernant la vente de votre véhicule.",
      EN: "Our team is at your disposal to answer all your questions regarding the sale of your vehicle.",
      ES: "Nuestro equipo está a su disposición para responder a todas sus preguntas sobre la venta de su vehículo.",
      IT: "Il nostro team è a tua disposizione per rispondere a tutte le tue domande riguardanti la vendita del tuo veicolo.",
      PT: "A nossa equipa está à sua disposição para responder a todas as suas perguntas sobre a venda do seu veículo.",
      RO: "Echipa noastră este la dispoziția dvs. pentru a răspunde la toate întrebările dvs. cu privire la vânzarea vehiculului dvs."
    },
    faq: {
      FR: "Questions fréquentes",
      EN: "Frequently asked questions",
      ES: "Preguntas frecuentes",
      IT: "Domande frequenti",
      PT: "Perguntas frequentes",
      RO: "Întrebări frecvente"
    },
    faqDesc: {
      FR: "Tout ce que vous devez savoir sur notre service de rachat de véhicules.",
      EN: "Everything you need to know about our vehicle buyback service.",
      ES: "Todo lo que necesita saber sobre nuestro servicio de recompra de vehículos.",
      IT: "Tutto ciò che devi sapere sul nostro servizio di riacquisto veicoli.",
      PT: "Tudo o que precisa de saber sobre o nosso serviço de recompra de veículos.",
      RO: "Tot ce trebuie să știți despre serviciul nostru de răscumpărare a vehiculelor."
    },
    faq1Question: {
      FR: "Combien de temps faut-il pour obtenir une offre de rachat ?",
      EN: "How long does it take to get a buyback offer?",
      ES: "¿Cuánto tiempo se tarda en obtener una oferta de recompra?",
      IT: "Quanto tempo ci vuole per ottenere un'offerta di riacquisto?",
      PT: "Quanto tempo demora a obter uma oferta de recompra?",
      RO: "Cât timp durează pentru a obține o ofertă de răscumpărare?"
    },
    faq1Answer: {
      FR: "Après réception de votre demande et des informations sur votre véhicule, nous vous faisons parvenir une estimation sous 24h ouvrées. Une offre définitive peut être faite immédiatement après l'expertise physique du véhicule.",
      EN: "After receiving your request and information about your vehicle, we will send you an estimate within 24 business hours. A final offer can be made immediately after the physical assessment of the vehicle.",
      ES: "Después de recibir su solicitud e información sobre su vehículo, le enviaremos una estimación dentro de las 24 horas hábiles. Se puede hacer una oferta final inmediatamente después de la evaluación física del vehículo.",
      IT: "Dopo aver ricevuto la tua richiesta e le informazioni sul tuo veicolo, ti invieremo una stima entro 24 ore lavorative. Un'offerta definitiva può essere fatta immediatamente dopo la valutazione fisica del veicolo.",
      PT: "Após receber o seu pedido e informações sobre o seu veículo, enviar-lhe-emos uma estimativa no prazo de 24 horas úteis. Pode ser feita uma oferta final imediatamente após a avaliação física do veículo.",
      RO: "După primirea cererii și a informațiilor despre vehiculul dvs., vă vom trimite o estimare în termen de 24 de ore lucrătoare. O ofertă finală poate fi făcută imediat după evaluarea fizică a vehiculului."
    },
    faq2Question: {
      FR: "Rachetez-vous les véhicules en panne ou accidentés ?",
      EN: "Do you buy back broken down or damaged vehicles?",
      ES: "¿Recompran vehículos averiados o accidentados?",
      IT: "Riacquistate veicoli in panne o incidentati?",
      PT: "Recompram veículos avariados ou acidentados?",
      RO: "Răscumpărați vehicule defecte sau avariate?"
    },
    faq2Answer: {
      FR: "Oui, nous rachetons tous types de véhicules, y compris ceux qui sont en panne, accidentés ou avec un fort kilométrage. La valeur de rachat sera simplement ajustée en fonction de l'état du véhicule.",
      EN: "Yes, we buy back all types of vehicles, including those that are broken down, damaged or with high mileage. The buyback value will simply be adjusted according to the condition of the vehicle.",
      ES: "Sí, recompramos todo tipo de vehículos, incluidos los que están averiados, accidentados o con un alto kilometraje. El valor de recompra simplemente se ajustará según el estado del vehículo.",
      IT: "Sì, riacquistiamo tutti i tipi di veicoli, compresi quelli in panne, incidentati o con chilometraggio elevato. Il valore di riacquisto sarà semplicemente adattato in base alle condizioni del veicolo.",
      PT: "Sim, recompramos todos os tipos de veículos, incluindo os que estão avariados, acidentados ou com quilometragem elevada. O valor de recompra será simplesmente ajustado de acordo com o estado do veículo.",
      RO: "Da, răscumpărăm toate tipurile de vehicule, inclusiv cele care sunt defecte, avariate sau cu kilometraj ridicat. Valoarea de răscumpărare va fi pur și simplu ajustată în funcție de starea vehiculului."
    },
    faq3Question: {
      FR: "Comment est calculé le prix de rachat ?",
      EN: "How is the buyback price calculated?",
      ES: "¿Cómo se calcula el precio de recompra?",
      IT: "Come viene calcolato il prezzo di riacquisto?",
      PT: "Como é calculado o preço de recompra?",
      RO: "Cum se calculează prețul de răscumpărare?"
    },
    faq3Answer: {
      FR: "Le prix de rachat est calculé en fonction de plusieurs critères : la marque et le modèle, l'année, le kilométrage, l'état général, l'historique d'entretien, les équipements et options, ainsi que la demande du marché pour ce type de véhicule.",
      EN: "The buyback price is calculated based on several criteria: the brand and model, the year, the mileage, the general condition, the maintenance history, the equipment and options, as well as the market demand for this type of vehicle.",
      ES: "El precio de recompra se calcula en base a varios criterios: la marca y el modelo, el año, el kilometraje, el estado general, el historial de mantenimiento, el equipamiento y las opciones, así como la demanda del mercado para este tipo de vehículo.",
      IT: "Il prezzo di riacquisto viene calcolato in base a diversi criteri: la marca e il modello, l'anno, il chilometraggio, le condizioni generali, la storia di manutenzione, l'equipaggiamento e le opzioni, nonché la domanda di mercato per questo tipo di veicolo.",
      PT: "O preço de recompra é calculado com base em vários critérios: a marca e o modelo, o ano, a quilometragem, o estado geral, o histórico de manutenção, o equipamento e as opções, bem como a procura do mercado para este tipo de veículo.",
      RO: "Prețul de răscumpărare este calculat pe baza mai multor criterii: marca și modelul, anul, kilometrajul, starea generală, istoricul de întreținere, echipamentele și opțiunile, precum și cererea pieței pentru acest tip de vehicul."
    },
    faq4Question: {
      FR: "Puis-je vendre ma voiture si elle est encore sous crédit ?",
      EN: "Can I sell my car if it is still under credit?",
      ES: "¿Puedo vender mi coche si todavía está bajo crédito?",
      IT: "Posso vendere la mia auto se è ancora sotto finanziamento?",
      PT: "Posso vender o meu carro se ainda estiver sob crédito?",
      RO: "Pot să-mi vând mașina dacă este încă în credit?"
    },
    faq4Answer: {
      FR: "Oui, c'est possible. Nous pouvons racheter votre véhicule même s'il est encore sous financement. Nous nous occuperons des démarches nécessaires pour solder votre crédit auprès de l'organisme financier.",
      EN: "Yes, it's possible. We can buy back your vehicle even if it is still under financing. We will take care of the necessary steps to pay off your credit with the financial institution.",
      ES: "Sí, es posible. Podemos recomprar su vehículo incluso si todavía está bajo financiación. Nos encargaremos de los pasos necesarios para saldar su crédito con la institución financiera.",
      IT: "Sì, è possibile. Possiamo riacquistare il tuo veicolo anche se è ancora sotto finanziamento. Ci occuperemo dei passi necessari per estinguere il tuo credito presso l'istituzione finanziaria.",
      PT: "Sim, é possível. Podemos recomprar o seu veículo mesmo que ainda esteja sob financiamento. Trataremos dos passos necessários para liquidar o seu crédito junto da instituição financeira.",
      RO: "Da, este posibil. Putem răscumpăra vehiculul dvs. chiar dacă este încă în finanțare. Ne vom ocupa de pașii necesari pentru a achita creditul dvs. la instituția financiară."
    },
    readyToSell: {
      FR: "Prêt à vendre votre véhicule ?",
      EN: "Ready to sell your vehicle?",
      ES: "¿Listo para vender su vehículo?",
      IT: "Pronto a vendere il tuo veicolo?",
      PT: "Pronto para vender o seu veículo?",
      RO: "Gata să vă vindeți vehiculul?"
    },
    readyToSellDesc: {
      FR: "Obtenez une estimation gratuite et sans engagement en quelques minutes.",
      EN: "Get a free and non-binding estimate in just a few minutes.",
      ES: "Obtenga una estimación gratuita y sin compromiso en solo unos minutos.",
      IT: "Ottieni una stima gratuita e senza impegno in pochi minuti.",
      PT: "Obtenha uma estimativa gratuita e sem compromisso em apenas alguns minutos.",
      RO: "Obțineți o estimare gratuită și fără angajament în doar câteva minute."
    },
    getEstimate: {
      FR: "Demander une estimation",
      EN: "Request an estimate",
      ES: "Solicitar una estimación",
      IT: "Richiedi una valutazione",
      PT: "Solicitar uma estimativa",
      RO: "Solicitați o estimare"
    },
    seeVehicles: {
      FR: "Voir nos véhicules",
      EN: "See our vehicles",
      ES: "Ver nuestros vehículos",
      IT: "Vedi i nostri veicoli",
      PT: "Ver os nossos veículos",
      RO: "Vedeți vehiculele noastre"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{translate('pageTitle', translations.pageTitle)}</h1>
                <p className="text-xl mb-8">{translate('subTitle', translations.subTitle)}</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold">
                      {translate('estimateVehicle', translations.estimateVehicle)}
                    </Button>
                  </Link>
                  <a href="tel:+33123456789">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold">
                      {translate('callUs', translations.callUs)}
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80" 
                  alt="Vente de voiture" 
                  className="rounded-lg shadow-xl object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{translate('whySellTitle', translations.whySellTitle)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('whySellDesc', translations.whySellDesc)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Banknote className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{translate('competitivePrice', translations.competitivePrice)}</h3>
                  <p className="text-gray-600">
                    {translate('competitivePriceDesc', translations.competitivePriceDesc)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{translate('fastSale', translations.fastSale)}</h3>
                  <p className="text-gray-600">
                    {translate('fastSaleDesc', translations.fastSaleDesc)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FileCheck className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{translate('simplifiedProcess', translations.simplifiedProcess)}</h3>
                  <p className="text-gray-600">
                    {translate('simplifiedProcessDesc', translations.simplifiedProcessDesc)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="bg-brand-blue/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-10 w-10 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{translate('buybackAsIs', translations.buybackAsIs)}</h3>
                  <p className="text-gray-600">
                    {translate('buybackAsIsDesc', translations.buybackAsIsDesc)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{translate('howItWorks', translations.howItWorks)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('howItWorksDesc', translations.howItWorksDesc)}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="hidden md:block absolute left-[75px] top-0 bottom-0 w-0.5 bg-gray-300 z-0"></div>
                
                {/* Steps */}
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Clipboard className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{translate('step1Title', translations.step1Title)}</h3>
                      <p className="text-gray-600">
                        {translate('step1Desc', translations.step1Desc)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Car className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{translate('step2Title', translations.step2Title)}</h3>
                      <p className="text-gray-600">
                        {translate('step2Desc', translations.step2Desc)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <Banknote className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{translate('step3Title', translations.step3Title)}</h3>
                      <p className="text-gray-600">
                        {translate('step3Desc', translations.step3Desc)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                    <div className="bg-brand-blue rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 md:mt-0 mx-auto md:mx-0">
                      <FileCheck className="h-8 w-8 text-white" />
                    </div>
                    <div className="md:pt-3 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{translate('step4Title', translations.step4Title)}</h3>
                      <p className="text-gray-600">
                        {translate('step4Desc', translations.step4Desc)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">{translate('estimateYourVehicle', translations.estimateYourVehicle)}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {translate('formInstructions', translations.formInstructions)}
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('brand', translations.brand)} *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('model', translations.model)} *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('year', translations.year)} *</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        min="1990"
                        max="2030"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('mileage', translations.mileage)} *</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{translate('fuelType', translations.fuelType)} *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" required>
                      <option value="">{translate('select', translations.select)}</option>
                      <option value="essence">{translate('gasoline', translations.gasoline)}</option>
                      <option value="diesel">{translate('diesel', translations.diesel)}</option>
                      <option value="hybride">{translate('hybrid', translations.hybrid)}</option>
                      <option value="electrique">{translate('electric', translations.electric)}</option>
                      <option value="gpl">{translate('lpg', translations.lpg)}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{translate('generalCondition', translations.generalCondition)} *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" required>
                      <option value="">{translate('select', translations.select)}</option>
                      <option value="excellent">{translate('excellent', translations.excellent)}</option>
                      <option value="bon">{translate('good', translations.good)}</option>
                      <option value="moyen">{translate('average', translations.average)}</option>
                      <option value="mauvais">{translate('poor', translations.poor)}</option>
                      <option value="accidente">{translate('damaged', translations.damaged)}</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('name', translations.name)} *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{translate('phone', translations.phone)} *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{translate('email', translations.email)} *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">{translate('comments', translations.comments)}</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue h-32"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue text-lg font-semibold py-3">
                    {translate('requestEstimate', translations.requestEstimate)}
                  </Button>
                </form>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">{translate('documentsToProvide', translations.documentsToProvide)}</h3>
                  <p className="text-gray-600 mb-6">
                    {translate('documentsDesc', translations.documentsDesc)}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('registrationCard', translations.registrationCard)}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('idCard', translations.idCard)}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('proofOfAddress', translations.proofOfAddress)}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('maintenanceLog', translations.maintenanceLog)}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('technicalInspection', translations.technicalInspection)}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{translate('keys', translations.keys)}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-brand-blue/10 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">{translate('testimonial', translations.testimonial)}</h3>
                  <blockquote className="italic text-gray-700 mb-6">
                    {translate('testimonialText', translations.testimonialText)}
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <p className="font-bold">{translate('testimonialName', translations.testimonialName)}</p>
                      <p className="text-sm text-gray-600">{translate('testimonialLocation', translations.testimonialLocation)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold mb-4">{translate('needHelp', translations.needHelp)}</h3>
                  <p className="text-gray-600 mb-6">
                    {translate('needHelpDesc', translations.needHelpDesc)}
                  </p>
                  <div className="space-y-4">
                    <a href="tel:+33123456789" className="flex items-center text-brand-blue hover:underline">
                      <Phone className="h-5 w-5 mr-2" />
                      01 23 45 67 89
                    </a>
                    <a href="mailto:contact@auto-adi.fr" className="flex items-center text-brand-blue hover:underline">
                      <Mail className="h-5 w-5 mr-2" />
                      contact@auto-adi.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{translate('faq', translations.faq)}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translate('faqDesc', translations.faqDesc)}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{translate('faq1Question', translations.faq1Question)}</h3>
                <p className="text-gray-600">
                  {translate('faq1Answer', translations.faq1Answer)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{translate('faq2Question', translations.faq2Question)}</h3>
                <p className="text-gray-600">
                  {translate('faq2Answer', translations.faq2Answer)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{translate('faq3Question', translations.faq3Question)}</h3>
                <p className="text-gray-600">
                  {translate('faq3Answer', translations.faq3Answer)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">{translate('faq4Question', translations.faq4Question)}</h3>
                <p className="text-gray-600">
                  {translate('faq4Answer', translations.faq4Answer)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{translate('readyToSell', translations.readyToSell)}</h2>
              <p className="text-xl mb-8">
                {translate('readyToSellDesc', translations.readyToSellDesc)}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg font-semibold px-8 py-3">
                    {translate('getEstimate', translations.getEstimate)}
                  </Button>
                </Link>
                <Link to="/vehicules/occasion">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-3">
                    {translate('seeVehicles', translations.seeVehicles)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rachat;
