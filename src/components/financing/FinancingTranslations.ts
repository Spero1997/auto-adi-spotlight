
// Type definition for all financing page translations
export type FinancingTranslations = {
  financingTitle: Record<string, string>;
  financingDescription: Record<string, string>;
  getQuote: Record<string, string>;
  seeVehicles: Record<string, string>;
  financingSolutions: Record<string, string>;
  financingSolutionsDesc: Record<string, string>;
  traditionalCredit: Record<string, string>;
  traditionalCreditDesc: Record<string, string>;
  duration: Record<string, string>;
  months12to84: Record<string, string>;
  downPayment: Record<string, string>;
  from10percent: Record<string, string>;
  ownership: Record<string, string>;
  fromSigning: Record<string, string>;
  fixedPayments: Record<string, string>;
  earlyRepayment: Record<string, string>;
  youOwnVehicle: Record<string, string>;
  requestQuote: Record<string, string>;
  popular: Record<string, string>;
  leaseWithOption: Record<string, string>;
  leaseWithOptionDesc: Record<string, string>;
  months24to60: Record<string, string>;
  initialRent: Record<string, string>;
  from10To30Percent: Record<string, string>;
  purchaseOption: Record<string, string>;
  endOfContract: Record<string, string>;
  lowerPayments: Record<string, string>;
  endOfContractChoice: Record<string, string>;
  depreciationProtection: Record<string, string>;
  installmentPayment: Record<string, string>;
  installmentPaymentDesc: Record<string, string>;
  simulateFinancing: Record<string, string>;
  useCalculator: Record<string, string>;
  vehiclePrice: Record<string, string>;
  initialContribution: Record<string, string>;
  durationInMonths: Record<string, string>;
  financingType: Record<string, string>;
  calculatePayments: Record<string, string>;
  frequentlyAskedQuestions: Record<string, string>;
  everythingToKnow: Record<string, string>;
  readyToFinance: Record<string, string>;
  financialAdvisors: Record<string, string>;
  specialOffer: Record<string, string>;
  cashDiscount: Record<string, string>;
  months6to48: Record<string, string>;
  orderDeposit: Record<string, string>;
  atOrder: Record<string, string>;
  noFeesInterest: Record<string, string>;
  withoutFinancialOrg: Record<string, string>;
  fastSolution: Record<string, string>;
  whatDocumentsNeeded: Record<string, string>;
  idProofEtc: Record<string, string>;
  canIgetFinancingWithMinContribution: Record<string, string>;
  yesSolutionsFrom10Percent: Record<string, string>;
  whatsDifferenceCreditLoa: Record<string, string>;
  withCreditYouOwnVehicle: Record<string, string>;
  isInstallmentPaymentSubjectToFees: Record<string, string>;
  noOurInstallmentPaymentIsFree: Record<string, string>;
  canIRepayMyCreditEarly: Record<string, string>;
  yesEarlyRepaymentPossible: Record<string, string>;
};

// Export all translations to be used in the Financement page
export const getFinancingTranslations = (): FinancingTranslations => {
  return {
    financingTitle: {
      FR: "Solutions de financement adaptées",
      EN: "Tailored financing solutions",
      ES: "Soluciones de financiación adaptadas",
      IT: "Soluzioni di finanziamento personalizzate",
      PT: "Soluções de financiamento adaptadas",
      RO: "Soluții de finanțare personalizate"
    },
    financingDescription: {
      FR: "Découvrez nos options de financement flexibles pour acquérir le véhicule de vos rêves sans contraintes budgétaires.",
      EN: "Discover our flexible financing options to acquire the vehicle of your dreams without budget constraints.",
      ES: "Descubra nuestras opciones de financiación flexibles para adquirir el vehículo de sus sueños sin restricciones presupuestarias.",
      IT: "Scopri le nostre opzioni di finanziamento flessibili per acquisire il veicolo dei tuoi sogni senza vincoli di budget.",
      PT: "Descubra as nossas opções de financiamento flexíveis para adquirir o veículo dos seus sonhos sem restrições orçamentais.",
      RO: "Descoperiți opțiunile noastre de finanțare flexibile pentru a achiziționa vehiculul visurilor dvs. fără constrângeri bugetare."
    },
    getQuote: {
      FR: "Obtenir un devis personnalisé",
      EN: "Get a personalized quote",
      ES: "Obtener un presupuesto personalizado",
      IT: "Ottieni un preventivo personalizzato",
      PT: "Obter um orçamento personalizado",
      RO: "Obțineți o ofertă personalizată"
    },
    seeVehicles: {
      FR: "Voir les véhicules disponibles",
      EN: "See available vehicles",
      ES: "Ver vehículos disponibles",
      IT: "Vedi veicoli disponibili",
      PT: "Ver veículos disponíveis",
      RO: "Vedeți vehiculele disponibile"
    },
    financingSolutions: {
      FR: "Nos solutions de financement",
      EN: "Our financing solutions",
      ES: "Nuestras soluciones de financiación",
      IT: "Le nostre soluzioni di finanziamento",
      PT: "Nossas soluções de financiamento",
      RO: "Soluțiile noastre de finanțare"
    },
    financingSolutionsDesc: {
      FR: "Choisissez la solution qui correspond le mieux à vos besoins et à votre budget.",
      EN: "Choose the solution that best suits your needs and budget.",
      ES: "Elija la solución que mejor se adapte a sus necesidades y presupuesto.",
      IT: "Scegli la soluzione che meglio si adatta alle tue esigenze e al tuo budget.",
      PT: "Escolha a solução que melhor se adapta às suas necessidades e orçamento.",
      RO: "Alegeți soluția care se potrivește cel mai bine nevoilor și bugetului dvs."
    },
    traditionalCredit: {
      FR: "Crédit classique",
      EN: "Traditional credit",
      ES: "Crédito tradicional",
      IT: "Credito tradizionale",
      PT: "Crédito tradicional",
      RO: "Credit tradițional"
    },
    traditionalCreditDesc: {
      FR: "Financez votre véhicule avec des mensualités fixes sur la durée de votre choix.",
      EN: "Finance your vehicle with fixed monthly payments over the duration of your choice.",
      ES: "Financie su vehículo con pagos mensuales fijos durante la duración de su elección.",
      IT: "Finanzia il tuo veicolo con rate mensili fisse per la durata di tua scelta.",
      PT: "Financie o seu veículo com mensalidades fixas durante o período da sua escolha.",
      RO: "Finanțați-vă vehiculul cu plăți lunare fixe pe durata la alegere."
    },
    duration: {
      FR: "Durée",
      EN: "Duration",
      ES: "Duración",
      IT: "Durata",
      PT: "Duração",
      RO: "Durată"
    },
    months12to84: {
      FR: "12 à 84 mois",
      EN: "12 to 84 months",
      ES: "12 a 84 meses",
      IT: "da 12 a 84 mesi",
      PT: "12 a 84 meses",
      RO: "12 până la 84 de luni"
    },
    downPayment: {
      FR: "Apport initial",
      EN: "Down payment",
      ES: "Pago inicial",
      IT: "Acconto iniziale",
      PT: "Entrada inicial",
      RO: "Avans inițial"
    },
    from10percent: {
      FR: "Dès 10%",
      EN: "From 10%",
      ES: "Desde 10%",
      IT: "Dal 10%",
      PT: "A partir de 10%",
      RO: "De la 10%"
    },
    ownership: {
      FR: "Propriété",
      EN: "Ownership",
      ES: "Propiedad",
      IT: "Proprietà",
      PT: "Propriedade",
      RO: "Proprietate"
    },
    fromSigning: {
      FR: "Dès la signature",
      EN: "From signing",
      ES: "Desde la firma",
      IT: "Dalla firma",
      PT: "Desde a assinatura",
      RO: "De la semnare"
    },
    fixedPayments: {
      FR: "Mensualités fixes et prévisibles",
      EN: "Fixed and predictable monthly payments",
      ES: "Pagos mensuales fijos y predecibles",
      IT: "Rate mensili fisse e prevedibili",
      PT: "Mensalidades fixas e previsíveis",
      RO: "Plăți lunare fixe și previzibile"
    },
    earlyRepayment: {
      FR: "Possibilité de remboursement anticipé",
      EN: "Possibility of early repayment",
      ES: "Posibilidad de reembolso anticipado",
      IT: "Possibilità di rimborso anticipato",
      PT: "Possibilidade de reembolso antecipado",
      RO: "Posibilitatea de rambursare anticipată"
    },
    youOwnVehicle: {
      FR: "Vous êtes propriétaire du véhicule",
      EN: "You own the vehicle",
      ES: "Usted es propietario del vehículo",
      IT: "Sei proprietario del veicolo",
      PT: "Você é proprietário do veículo",
      RO: "Sunteți proprietarul vehiculului"
    },
    requestQuote: {
      FR: "Demander un devis",
      EN: "Request a quote",
      ES: "Solicitar un presupuesto",
      IT: "Richiedi un preventivo",
      PT: "Solicitar um orçamento",
      RO: "Solicitați o ofertă"
    },
    popular: {
      FR: "Populaire",
      EN: "Popular",
      ES: "Popular",
      IT: "Popolare",
      PT: "Popular",
      RO: "Popular"
    },
    leaseWithOption: {
      FR: "Location avec Option d'Achat (LOA)",
      EN: "Lease with Purchase Option",
      ES: "Arrendamiento con Opción de Compra",
      IT: "Leasing con Opzione d'Acquisto",
      PT: "Locação com Opção de Compra",
      RO: "Leasing cu Opțiune de Cumpărare"
    },
    leaseWithOptionDesc: {
      FR: "Louez votre véhicule avec option d'achat à la fin du contrat.",
      EN: "Lease your vehicle with an option to purchase at the end of the contract.",
      ES: "Alquile su vehículo con opción de compra al final del contrato.",
      IT: "Noleggia il tuo veicolo con opzione di acquisto alla fine del contratto.",
      PT: "Alugue o seu veículo com opção de compra no final do contrato.",
      RO: "Închiriați vehiculul cu opțiune de cumpărare la sfârșitul contractului."
    },
    months24to60: {
      FR: "24 à 60 mois",
      EN: "24 to 60 months",
      ES: "24 a 60 meses",
      IT: "da 24 a 60 mesi",
      PT: "24 a 60 meses",
      RO: "24 până la 60 de luni"
    },
    initialRent: {
      FR: "Premier loyer",
      EN: "Initial rent",
      ES: "Alquiler inicial",
      IT: "Canone iniziale",
      PT: "Aluguel inicial",
      RO: "Chirie inițială"
    },
    from10To30Percent: {
      FR: "10% à 30%",
      EN: "10% to 30%",
      ES: "10% a 30%",
      IT: "Dal 10% al 30%",
      PT: "10% a 30%",
      RO: "10% până la 30%"
    },
    purchaseOption: {
      FR: "Option d'achat",
      EN: "Purchase option",
      ES: "Opción de compra",
      IT: "Opzione di acquisto",
      PT: "Opção de compra",
      RO: "Opțiune de cumpărare"
    },
    endOfContract: {
      FR: "En fin de contrat",
      EN: "At the end of the contract",
      ES: "Al final del contrato",
      IT: "Alla fine del contratto",
      PT: "No final do contrato",
      RO: "La sfârșitul contractului"
    },
    lowerPayments: {
      FR: "Loyers souvent moins élevés qu'un crédit",
      EN: "Often lower payments than a credit",
      ES: "Pagos a menudo más bajos que un crédito",
      IT: "Pagamenti spesso inferiori rispetto a un credito",
      PT: "Pagamentos geralmente mais baixos do que um crédito",
      RO: "Plăți adesea mai mici decât un credit"
    },
    endOfContractChoice: {
      FR: "Choix en fin de contrat : acheter ou restituer",
      EN: "Choice at the end of the contract: buy or return",
      ES: "Elección al final del contrato: comprar o devolver",
      IT: "Scelta alla fine del contratto: acquistare o restituire",
      PT: "Escolha no final do contrato: comprar ou devolver",
      RO: "Alegere la sfârșitul contractului: cumpărați sau returnați"
    },
    depreciationProtection: {
      FR: "Protection contre la dépréciation du véhicule",
      EN: "Protection against vehicle depreciation",
      ES: "Protección contra la depreciación del vehículo",
      IT: "Protezione contro il deprezzamento del veicolo",
      PT: "Proteção contra a depreciação do veículo",
      RO: "Protecție împotriva deprecierii vehiculului"
    },
    installmentPayment: {
      FR: "Paiement échelonné",
      EN: "Installment payment",
      ES: "Pago a plazos",
      IT: "Pagamento rateale",
      PT: "Pagamento parcelado",
      RO: "Plată în rate"
    },
    installmentPaymentDesc: {
      FR: "Solution exclusive Auto Adi : payez en plusieurs fois sans frais ni intérêts.",
      EN: "Auto Adi exclusive solution: pay in several installments without fees or interest.",
      ES: "Solución exclusiva de Auto Adi: pague en varias cuotas sin comisiones ni intereses.",
      IT: "Soluzione esclusiva Auto Adi: paga in più rate senza commissioni o interessi.",
      PT: "Solução exclusiva da Auto Adi: pague em várias parcelas sem taxas ou juros.",
      RO: "Soluție exclusivă Auto Adi: plătiți în mai multe rate fără comisioane sau dobânzi."
    },
    simulateFinancing: {
      FR: "Simulez votre financement",
      EN: "Simulate your financing",
      ES: "Simule su financiación",
      IT: "Simula il tuo finanziamento",
      PT: "Simule o seu financiamento",
      RO: "Simulați finanțarea dvs."
    },
    useCalculator: {
      FR: "Utilisez notre calculateur pour obtenir une estimation de vos mensualités selon le type de financement choisi.",
      EN: "Use our calculator to get an estimate of your monthly payments based on the type of financing chosen.",
      ES: "Utilice nuestra calculadora para obtener una estimación de sus pagos mensuales según el tipo de financiación elegido.",
      IT: "Usa il nostro calcolatore per ottenere una stima delle tue rate mensili in base al tipo di finanziamento scelto.",
      PT: "Use nossa calculadora para obter uma estimativa de suas mensalidades com base no tipo de financiamento escolhido.",
      RO: "Utilizați calculatorul nostru pentru a obține o estimare a plăților lunare în funcție de tipul de finanțare ales."
    },
    vehiclePrice: {
      FR: "Prix du véhicule",
      EN: "Vehicle price",
      ES: "Precio del vehículo",
      IT: "Prezzo del veicolo",
      PT: "Preço do veículo",
      RO: "Prețul vehiculului"
    },
    initialContribution: {
      FR: "Apport initial",
      EN: "Initial contribution",
      ES: "Aportación inicial",
      IT: "Contributo iniziale",
      PT: "Contribuição inicial",
      RO: "Contribuție inițială"
    },
    durationInMonths: {
      FR: "Durée (en mois)",
      EN: "Duration (in months)",
      ES: "Duración (en meses)",
      IT: "Durata (in mesi)",
      PT: "Duração (em meses)",
      RO: "Durată (în luni)"
    },
    financingType: {
      FR: "Type de financement",
      EN: "Financing type",
      ES: "Tipo de financiación",
      IT: "Tipo di finanziamento",
      PT: "Tipo de financiamento",
      RO: "Tip de finanțare"
    },
    calculatePayments: {
      FR: "Calculer mes mensualités",
      EN: "Calculate my monthly payments",
      ES: "Calcular mis pagos mensuales",
      IT: "Calcola le mie rate mensili",
      PT: "Calcular minhas mensalidades",
      RO: "Calculați plățile mele lunare"
    },
    frequentlyAskedQuestions: {
      FR: "Questions fréquentes",
      EN: "Frequently asked questions",
      ES: "Preguntas frecuentes",
      IT: "Domande frequenti",
      PT: "Perguntas frequentes",
      RO: "Întrebări frecvente"
    },
    everythingToKnow: {
      FR: "Tout ce que vous devez savoir sur nos solutions de financement.",
      EN: "Everything you need to know about our financing solutions.",
      ES: "Todo lo que necesita saber sobre nuestras soluciones de financiación.",
      IT: "Tutto ciò che devi sapere sulle nostre soluzioni di finanziamento.",
      PT: "Tudo o que você precisa saber sobre nossas soluções de financiamento.",
      RO: "Tot ce trebuie să știți despre soluțiile noastre de finanțare."
    },
    readyToFinance: {
      FR: "Prêt à financer votre prochain véhicule ?",
      EN: "Ready to finance your next vehicle?",
      ES: "¿Listo para financiar su próximo vehículo?",
      IT: "Pronto a finanziare il tuo prossimo veicolo?",
      PT: "Pronto para financiar seu próximo veículo?",
      RO: "Gata să finanțați următorul dvs. vehicul?"
    },
    financialAdvisors: {
      FR: "Nos conseillers financiers sont à votre disposition pour vous aider à trouver la solution la plus adaptée à votre situation.",
      EN: "Our financial advisors are at your disposal to help you find the solution most suited to your situation.",
      ES: "Nuestros asesores financieros están a su disposición para ayudarlo a encontrar la solución más adecuada a su situación.",
      IT: "I nostri consulenti finanziari sono a tua disposizione per aiutarti a trovare la soluzione più adatta alla tua situazione.",
      PT: "Nossos consultores financeiros estão à sua disposição para ajudá-lo a encontrar a solução mais adequada à sua situação.",
      RO: "Consilierii noștri financiari sunt la dispoziția dvs. pentru a vă ajuta să găsiți soluția cea mai potrivită pentru situația dvs."
    },
    specialOffer: {
      FR: "Offre spéciale paiement comptant",
      EN: "Special cash payment offer",
      ES: "Oferta especial de pago en efectivo",
      IT: "Offerta speciale pagamento in contanti",
      PT: "Oferta especial de pagamento à vista",
      RO: "Ofertă specială pentru plata în numerar"
    },
    cashDiscount: {
      FR: "Bénéficiez d'une remise de 10% sur le prix du véhicule pour tout paiement comptant à la commande.",
      EN: "Get a 10% discount on the vehicle price for any cash payment at the time of order.",
      ES: "Obtenga un 10% de descuento en el precio del vehículo por cualquier pago en efectivo en el momento del pedido.",
      IT: "Ottieni uno sconto del 10% sul prezzo del veicolo per qualsiasi pagamento in contanti al momento dell'ordine.",
      PT: "Obtenha um desconto de 10% no preço do veículo para qualquer pagamento à vista no momento do pedido.",
      RO: "Obțineți o reducere de 10% la prețul vehiculului pentru orice plată în numerar la momentul comenzii."
    },
    months6to48: {
      FR: "6 à 48 mois",
      EN: "6 to 48 months",
      ES: "6 a 48 meses",
      IT: "da 6 a 48 mesi",
      PT: "6 a 48 meses",
      RO: "6 până la 48 de luni"
    },
    orderDeposit: {
      FR: "Acompte",
      EN: "Deposit",
      ES: "Depósito",
      IT: "Deposito",
      PT: "Depósito",
      RO: "Depozit"
    },
    atOrder: {
      FR: "20% à la commande",
      EN: "20% at order",
      ES: "20% al ordenar",
      IT: "20% all'ordine",
      PT: "20% ao encomendar",
      RO: "20% la comandă"
    },
    noFeesInterest: {
      FR: "Aucun frais ni intérêt",
      EN: "No fees or interest",
      ES: "Sin comisiones ni intereses",
      IT: "Nessuna commissione o interesse",
      PT: "Sem taxas ou juros",
      RO: "Fără taxe sau dobânzi"
    },
    withoutFinancialOrg: {
      FR: "Sans organisme financier",
      EN: "Without financial organization",
      ES: "Sin organismo financiero",
      IT: "Senza ente finanziario",
      PT: "Sem organização financeira",
      RO: "Fără organizație financiară"
    },
    fastSolution: {
      FR: "Solution rapide sans dossier complexe",
      EN: "Fast solution without complex file",
      ES: "Solución rápida sin expediente complejo",
      IT: "Soluzione rapida senza pratica complessa",
      PT: "Solução rápida sem processo complexo",
      RO: "Soluție rapidă fără dosar complex"
    },
    whatDocumentsNeeded: {
      FR: "Quels documents sont nécessaires pour une demande de financement ?",
      EN: "What documents are needed for a financing request?",
      ES: "¿Qué documentos se necesitan para una solicitud de financiación?",
      IT: "Quali documenti sono necessari per una richiesta di finanziamento?",
      PT: "Quais documentos são necessários para um pedido de financiamento?",
      RO: "Ce documente sunt necesare pentru o cerere de finanțare?"
    },
    idProofEtc: {
      FR: "Pour toute demande de financement, vous devrez généralement fournir une pièce d'identité, un justificatif de domicile récent, vos trois derniers bulletins de salaire et votre dernier avis d'imposition.",
      EN: "For any financing request, you will generally need to provide an identity document, a recent proof of address, your last three payslips and your last tax notice.",
      ES: "Para cualquier solicitud de financiación, generalmente deberá proporcionar un documento de identidad, un comprobante de domicilio reciente, sus últimas tres nóminas y su último aviso fiscal.",
      IT: "Per qualsiasi richiesta di finanziamento, in genere è necessario fornire un documento di identità, una prova di indirizzo recente, le ultime tre buste paga e l'ultima dichiarazione dei redditi.",
      PT: "Para qualquer pedido de financiamento, geralmente terá de fornecer um documento de identificação, um comprovativo de morada recente, os seus últimos três recibos de vencimento e o seu último aviso fiscal.",
      RO: "Pentru orice cerere de finanțare, va trebui, în general, să furnizați un document de identitate, o dovadă recentă a adresei, ultimele trei fluturași de salariu și ultimul aviz fiscal."
    },
    canIgetFinancingWithMinContribution: {
      FR: "Puis-je obtenir un financement avec un apport minimal ?",
      EN: "Can I get financing with a minimal contribution?",
      ES: "¿Puedo obtener financiación con una contribución mínima?",
      IT: "Posso ottenere un finanziamento con un contributo minimo?",
      PT: "Posso obter financiamento com uma contribuição mínima?",
      RO: "Pot obține finanțare cu o contribuție minimă?"
    },
    yesSolutionsFrom10Percent: {
      FR: "Oui, nous proposons des solutions avec un apport minimal de seulement 10% du prix du véhicule. Dans certains cas, selon votre profil, des financements sans apport peuvent même être envisagés.",
      EN: "Yes, we offer solutions with a minimal contribution of only 10% of the vehicle price. In some cases, depending on your profile, financing without a contribution can even be considered.",
      ES: "Sí, ofrecemos soluciones con una contribución mínima de solo el 10% del precio del vehículo. En algunos casos, según su perfil, incluso se puede considerar la financiación sin contribución.",
      IT: "Sì, offriamo soluzioni con un contributo minimo di solo il 10% del prezzo del veicolo. In alcuni casi, a seconda del tuo profilo, si può anche prendere in considerazione il finanziamento senza contributo.",
      PT: "Sim, oferecemos soluções com uma contribuição mínima de apenas 10% do preço do veículo. Em alguns casos, dependendo do seu perfil, pode até ser considerado o financiamento sem contribuição.",
      RO: "Da, oferim soluții cu o contribuție minimă de doar 10% din prețul vehiculului. În unele cazuri, în funcție de profilul dvs., se poate lua în considerare chiar și finanțarea fără contribuție."
    },
    whatsDifferenceCreditLoa: {
      FR: "Quelle est la différence entre crédit et LOA ?",
      EN: "What's the difference between credit and LOA?",
      ES: "¿Cuál es la diferencia entre crédito y LOA?",
      IT: "Qual è la differenza tra credito e LOA?",
      PT: "Qual é a diferença entre crédito e LOA?",
      RO: "Care este diferența dintre credit și LOA?"
    },
    withCreditYouOwnVehicle: {
      FR: "Avec un crédit classique, vous devenez propriétaire du véhicule dès la signature du contrat. Avec la LOA, vous louez le véhicule et avez l'option de l'acheter en fin de contrat en payant la valeur résiduelle.",
      EN: "With a traditional credit, you become the owner of the vehicle as soon as the contract is signed. With the LOA, you rent the vehicle and have the option to buy it at the end of the contract by paying the residual value.",
      ES: "Con un crédito tradicional, usted se convierte en el propietario del vehículo tan pronto como se firma el contrato. Con la LOA, usted alquila el vehículo y tiene la opción de comprarlo al final del contrato pagando el valor residual.",
      IT: "Con un credito tradizionale, diventi proprietario del veicolo non appena viene firmato il contratto. Con il LOA, noleggi il veicolo e hai la possibilità di acquistarlo alla fine del contratto pagando il valore residuo.",
      PT: "Com um crédito tradicional, torna-se proprietário do veículo assim que o contrato é assinado. Com o LOA, aluga o veículo e tem a opção de o comprar no final do contrato, pagando o valor residual.",
      RO: "Cu un credit tradițional, devii proprietarul vehiculului imediat ce contractul este semnat. Cu LOA, închiriați vehiculul și aveți opțiunea de a-l cumpăra la sfârșitul contractului, plătind valoarea reziduală."
    },
    isInstallmentPaymentSubjectToFees: {
      FR: "Le paiement échelonné est-il soumis à des frais ?",
      EN: "Is the installment payment subject to fees?",
      ES: "¿Está sujeto a comisiones el pago a plazos?",
      IT: "Il pagamento rateale è soggetto a commissioni?",
      PT: "O pagamento faseado está sujeito a taxas?",
      RO: "Plata în rate este supusă unor taxe?"
    },
    noOurInstallmentPaymentIsFree: {
      FR: "Non, notre solution de paiement échelonné est sans frais ni intérêts. Vous payez uniquement le prix du véhicule réparti sur la durée choisie, sans aucun coût supplémentaire.",
      EN: "No, our installment payment solution is without fees or interest. You only pay the price of the vehicle spread over the chosen duration, without any additional cost.",
      ES: "No, nuestra solución de pago a plazos no tiene comisiones ni intereses. Solo paga el precio del vehículo repartido en la duración elegida, sin ningún coste adicional.",
      IT: "No, la nostra soluzione di pagamento rateale è senza commissioni o interessi. Paghi solo il prezzo del veicolo spalmato sulla durata scelta, senza costi aggiuntivi.",
      PT: "Não, a nossa solução de pagamento faseado não tem taxas nem juros. Paga apenas o preço do veículo repartido pelo período escolhido, sem qualquer custo adicional.",
      RO: "Nu, soluția noastră de plată în rate nu are taxe sau dobânzi. Plătiți doar prețul vehiculului repartizat pe durata aleasă, fără costuri suplimentare."
    },
    canIRepayMyCreditEarly: {
      FR: "Puis-je rembourser mon crédit par anticipation ?",
      EN: "Can I repay my credit early?",
      ES: "¿Puedo pagar mi crédito anticipadamente?",
      IT: "Posso rimborsare il mio credito in anticipo?",
      PT: "Posso pagar o meu crédito antecipadamente?",
      RO: "Pot să-mi rambursez creditul mai devreme?"
    },
    yesEarlyRepaymentPossible: {
      FR: "Oui, le remboursement anticipé est possible pour tous nos financements. Pour les crédits classiques, des indemnités de remboursement anticipé peuvent s'appliquer selon les conditions du contrat.",
      EN: "Yes, early repayment is possible for all our financing options. For traditional credits, early repayment fees may apply depending on the terms of the contract.",
      ES: "Sí, el reembolso anticipado es posible para todas nuestras opciones de financiación. Para los créditos tradicionales, se pueden aplicar tarifas de reembolso anticipado según los términos del contrato.",
      IT: "Sì, il rimborso anticipato è possibile per tutte le nostre opzioni di finanziamento. Per i crediti tradizionali, potrebbero essere applicate commissioni di rimborso anticipato a seconda dei termini del contratto.",
      PT: "Sim, o reembolso antecipado é possível para todas as nossas opções de financiamento. Para os créditos tradicionais, podem aplicar-se taxas de reembolso antecipado, dependendo dos termos do contrato.",
      RO: "Da, rambursarea anticipată este posibilă pentru toate opțiunile noastre de finanțare. Pentru creditele tradiționale, se pot aplica taxe de rambursare anticipată, în funcție de termenii contractului."
    }
  };
};
