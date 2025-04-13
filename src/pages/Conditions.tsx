
import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const Conditions = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page Conditions de Vente
  const translations = {
    pageTitle: {
      FR: "Conditions de Vente",
      EN: "Sales Conditions",
      ES: "Condiciones de Venta",
      IT: "Condizioni di Vendita",
      PT: "Condições de Venda",
      RO: "Condiții de Vânzare"
    },
    purchaseProcedure: {
      FR: "1. Procédure d'achat",
      EN: "1. Purchase procedure",
      ES: "1. Procedimiento de compra",
      IT: "1. Procedura di acquisto",
      PT: "1. Procedimento de compra",
      RO: "1. Procedura de achiziție"
    },
    vehicleSelection: {
      FR: "1.1 Sélection du véhicule :",
      EN: "1.1 Vehicle selection:",
      ES: "1.1 Selección del vehículo:",
      IT: "1.1 Selezione del veicolo:",
      PT: "1.1 Seleção do veículo:",
      RO: "1.1 Selectarea vehiculului:"
    },
    vehicleSelectionText: {
      FR: "Le Client sélectionne le véhicule de son choix parmi ceux proposés par Auto Adi, en concession ou sur le site web.",
      EN: "The Customer selects the vehicle of their choice from those offered by Auto Adi, at the dealership or on the website.",
      ES: "El Cliente selecciona el vehículo de su elección entre los ofrecidos por Auto Adi, en el concesionario o en el sitio web.",
      IT: "Il Cliente seleziona il veicolo di sua scelta tra quelli offerti da Auto Adi, presso la concessionaria o sul sito web.",
      PT: "O Cliente seleciona o veículo da sua escolha entre os oferecidos pela Auto Adi, na concessionária ou no site.",
      RO: "Clientul selectează vehiculul la alegere dintre cele oferite de Auto Adi, la dealer sau pe site-ul web."
    },
    quote: {
      FR: "1.2 Devis et offre personnalisée :",
      EN: "1.2 Quote and personalized offer:",
      ES: "1.2 Presupuesto y oferta personalizada:",
      IT: "1.2 Preventivo e offerta personalizzata:",
      PT: "1.2 Orçamento e oferta personalizada:",
      RO: "1.2 Ofertă personalizată:"
    },
    quoteText: {
      FR: "Auto Adi établit un devis détaillé comprenant le prix du véhicule, les options choisies, les frais annexes et les conditions de financement si applicables.",
      EN: "Auto Adi establishes a detailed quote including the price of the vehicle, chosen options, additional fees, and financing conditions if applicable.",
      ES: "Auto Adi establece un presupuesto detallado que incluye el precio del vehículo, las opciones elegidas, los cargos adicionales y las condiciones de financiación, si corresponde.",
      IT: "Auto Adi stabilisce un preventivo dettagliato che include il prezzo del veicolo, le opzioni scelte, le spese aggiuntive e le condizioni di finanziamento, se applicabili.",
      PT: "A Auto Adi estabelece um orçamento detalhado que inclui o preço do veículo, as opções escolhidas, as taxas adicionais e as condições de financiamento, se aplicável.",
      RO: "Auto Adi stabilește o ofertă detaliată care include prețul vehiculului, opțiunile alese, taxele suplimentare și condițiile de finanțare, dacă este cazul."
    },
    order: {
      FR: "1.3 Commande :",
      EN: "1.3 Order:",
      ES: "1.3 Pedido:",
      IT: "1.3 Ordine:",
      PT: "1.3 Encomenda:",
      RO: "1.3 Comandă:"
    },
    orderText: {
      FR: "La commande est considérée comme ferme après signature du bon de commande et versement de l'acompte de 20% du prix total.",
      EN: "The order is considered firm after signing the order form and paying the deposit of 20% of the total price.",
      ES: "El pedido se considera firme después de firmar el formulario de pedido y pagar el depósito del 20% del precio total.",
      IT: "L'ordine è considerato fermo dopo la firma del modulo d'ordine e il pagamento dell'acconto del 20% del prezzo totale.",
      PT: "A encomenda é considerada firme após a assinatura do formulário de encomenda e o pagamento do depósito de 20% do preço total.",
      RO: "Comanda este considerată fermă după semnarea formularului de comandă și plata avansului de 20% din prețul total."
    },
    delivery: {
      FR: "1.4 Livraison :",
      EN: "1.4 Delivery:",
      ES: "1.4 Entrega:",
      IT: "1.4 Consegna:",
      PT: "1.4 Entrega:",
      RO: "1.4 Livrare:"
    },
    deliveryText: {
      FR: "La livraison du véhicule est effectuée après paiement intégral du prix, dans les délais convenus entre les parties.",
      EN: "The delivery of the vehicle is carried out after full payment of the price, within the deadlines agreed between the parties.",
      ES: "La entrega del vehículo se realiza después del pago completo del precio, dentro de los plazos acordados entre las partes.",
      IT: "La consegna del veicolo viene effettuata dopo il pagamento integrale del prezzo, entro i termini concordati tra le parti.",
      PT: "A entrega do veículo é efetuada após o pagamento integral do preço, dentro dos prazos acordados entre as partes.",
      RO: "Livrarea vehiculului se efectuează după plata integrală a prețului, în termenele convenite între părți."
    },
    financialConditions: {
      FR: "2. Conditions financières particulières",
      EN: "2. Special financial conditions",
      ES: "2. Condiciones financieras especiales",
      IT: "2. Condizioni finanziarie speciali",
      PT: "2. Condições financeiras especiais",
      RO: "2. Condiții financiare speciale"
    },
    installmentPayment: {
      FR: "2.1 Paiement échelonné sans frais :",
      EN: "2.1 Interest-free installment payment:",
      ES: "2.1 Pago a plazos sin intereses:",
      IT: "2.1 Pagamento rateale senza interessi:",
      PT: "2.1 Pagamento em prestações sem juros:",
      RO: "2.1 Plata în rate fără dobândă:"
    },
    installmentPaymentText: {
      FR: "Auto Adi propose un système de paiement échelonné sans frais ni intérêts, sous réserve d'acceptation du dossier. Les modalités spécifiques sont détaillées dans un contrat distinct.",
      EN: "Auto Adi offers an interest-free installment payment system, subject to acceptance of the application. The specific terms are detailed in a separate contract.",
      ES: "Auto Adi ofrece un sistema de pago a plazos sin cargos ni intereses, sujeto a la aceptación de la solicitud. Los términos específicos se detallan en un contrato separado.",
      IT: "Auto Adi offre un sistema di pagamento rateale senza spese né interessi, soggetto all'accettazione della richiesta. I termini specifici sono dettagliati in un contratto separato.",
      PT: "A Auto Adi oferece um sistema de pagamento em prestações sem taxas nem juros, sujeito à aceitação da candidatura. Os termos específicos são detalhados num contrato separado.",
      RO: "Auto Adi oferă un sistem de plată în rate fără taxe sau dobânzi, sub rezerva acceptării cererii. Termenii specifici sunt detaliați într-un contract separat."
    },
    deposit: {
      FR: "2.2 Acompte :",
      EN: "2.2 Deposit:",
      ES: "2.2 Depósito:",
      IT: "2.2 Acconto:",
      PT: "2.2 Depósito:",
      RO: "2.2 Avans:"
    },
    depositText: {
      FR: "Un acompte de 20% du prix total est exigé à la commande. Cet acompte est non remboursable en cas d'annulation par le Client, sauf application du droit de rétractation légal.",
      EN: "A deposit of 20% of the total price is required at the time of order. This deposit is non-refundable in case of cancellation by the Customer, except for the application of the legal right of withdrawal.",
      ES: "Se requiere un depósito del 20% del precio total en el momento del pedido. Este depósito no es reembolsable en caso de cancelación por parte del Cliente, excepto por la aplicación del derecho legal de desistimiento.",
      IT: "È richiesto un acconto del 20% del prezzo totale al momento dell'ordine. Questo acconto non è rimborsabile in caso di cancellazione da parte del Cliente, tranne per l'applicazione del diritto legale di recesso.",
      PT: "É exigido um depósito de 20% do preço total no momento da encomenda. Este depósito não é reembolsável em caso de cancelamento pelo Cliente, exceto pela aplicação do direito legal de retratação.",
      RO: "Un avans de 20% din prețul total este necesar la momentul comenzii. Acest avans nu este rambursabil în caz de anulare de către Client, cu excepția aplicării dreptului legal de retragere."
    },
    paymentMethods: {
      FR: "2.3 Modes de paiement acceptés :",
      EN: "2.3 Accepted payment methods:",
      ES: "2.3 Métodos de pago aceptados:",
      IT: "2.3 Metodi di pagamento accettati:",
      PT: "2.3 Métodos de pagamento aceites:",
      RO: "2.3 Metode de plată acceptate:"
    },
    paymentMethodsText: {
      FR: "Virement bancaire, chèque de banque, espèces (dans les limites légales), coupons de paiement (PCS, Transcash, Neosurf, cartes Amazon).",
      EN: "Bank transfer, bank check, cash (within legal limits), payment vouchers (PCS, Transcash, Neosurf, Amazon cards).",
      ES: "Transferencia bancaria, cheque bancario, efectivo (dentro de los límites legales), cupones de pago (PCS, Transcash, Neosurf, tarjetas Amazon).",
      IT: "Bonifico bancario, assegno bancario, contanti (entro i limiti di legge), buoni di pagamento (PCS, Transcash, Neosurf, carte Amazon).",
      PT: "Transferência bancária, cheque bancário, dinheiro (dentro dos limites legais), vouchers de pagamento (PCS, Transcash, Neosurf, cartões Amazon).",
      RO: "Transfer bancar, cec bancar, numerar (în limitele legale), vouchere de plată (PCS, Transcash, Neosurf, carduri Amazon)."
    },
    necessaryDocuments: {
      FR: "3. Documents nécessaires",
      EN: "3. Necessary documents",
      ES: "3. Documentos necesarios",
      IT: "3. Documenti necessari",
      PT: "3. Documentos necessários",
      RO: "3. Documente necesare"
    },
    documentsText: {
      FR: "Pour finaliser l'achat d'un véhicule, le Client doit fournir les documents suivants :",
      EN: "To finalize the purchase of a vehicle, the Customer must provide the following documents:",
      ES: "Para finalizar la compra de un vehículo, el Cliente debe proporcionar los siguientes documentos:",
      IT: "Per finalizzare l'acquisto di un veicolo, il Cliente deve fornire i seguenti documenti:",
      PT: "Para finalizar a compra de um veículo, o Cliente deve fornecer os seguintes documentos:",
      RO: "Pentru a finaliza achiziția unui vehicul, Clientul trebuie să furnizeze următoarele documente:"
    },
    idDoc: {
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
      IT: "Prova di residenza di meno di 3 mesi",
      PT: "Comprovativo de morada com menos de 3 meses",
      RO: "Dovadă de domiciliu mai recentă de 3 luni"
    },
    drivingLicense: {
      FR: "Permis de conduire valide",
      EN: "Valid driving license",
      ES: "Licencia de conducir válida",
      IT: "Patente di guida valida",
      PT: "Carta de condução válida",
      RO: "Permis de conducere valabil"
    },
    insuranceCertificate: {
      FR: "Attestation d'assurance pour le véhicule (avant la livraison)",
      EN: "Insurance certificate for the vehicle (before delivery)",
      ES: "Certificado de seguro para el vehículo (antes de la entrega)",
      IT: "Certificato di assicurazione per il veicolo (prima della consegna)",
      PT: "Certificado de seguro para o veículo (antes da entrega)",
      RO: "Certificat de asigurare pentru vehicul (înainte de livrare)"
    },
    bankDetails: {
      FR: "Relevé d'identité bancaire (en cas de paiement échelonné)",
      EN: "Bank account details (in case of installment payment)",
      ES: "Datos de cuenta bancaria (en caso de pago a plazos)",
      IT: "Coordinate bancarie (in caso di pagamento rateale)",
      PT: "Dados da conta bancária (em caso de pagamento em prestações)",
      RO: "Detalii ale contului bancar (în caz de plată în rate)"
    },
    crossBorderDelivery: {
      FR: "4. Livraison transfrontalière",
      EN: "4. Cross-border delivery",
      ES: "4. Entrega transfronteriza",
      IT: "4. Consegna transfrontaliera",
      PT: "4. Entrega transfronteiriça",
      RO: "4. Livrare transfrontalieră"
    },
    deliveryTimes: {
      FR: "4.1 Délais de livraison :",
      EN: "4.1 Delivery times:",
      ES: "4.1 Plazos de entrega:",
      IT: "4.1 Tempi di consegna:",
      PT: "4.1 Prazos de entrega:",
      RO: "4.1 Termene de livrare:"
    },
    deliveryTimesText: {
      FR: "Pour les livraisons en dehors de l'Italie, les délais peuvent varier en fonction des formalités administratives et des contraintes logistiques. Un délai indicatif est communiqué au Client lors de la commande.",
      EN: "For deliveries outside Italy, deadlines may vary depending on administrative formalities and logistical constraints. An indicative deadline is communicated to the Customer at the time of order.",
      ES: "Para entregas fuera de Italia, los plazos pueden variar dependiendo de los trámites administrativos y restricciones logísticas. Se comunica un plazo indicativo al Cliente en el momento del pedido.",
      IT: "Per le consegne al di fuori dell'Italia, i tempi possono variare a seconda delle formalità amministrative e dei vincoli logistici. Una scadenza indicativa viene comunicata al Cliente al momento dell'ordine.",
      PT: "Para entregas fora de Itália, os prazos podem variar dependendo das formalidades administrativas e restrições logísticas. Um prazo indicativo é comunicado ao Cliente no momento da encomenda.",
      RO: "Pentru livrările în afara Italiei, termenele pot varia în funcție de formalitățile administrative și constrângerile logistice. Un termen indicativ este comunicat Clientului la momentul comenzii."
    },
    deliveryCosts: {
      FR: "4.2 Frais de livraison :",
      EN: "4.2 Delivery costs:",
      ES: "4.2 Gastos de envío:",
      IT: "4.2 Costi di consegna:",
      PT: "4.2 Custos de entrega:",
      RO: "4.2 Costuri de livrare:"
    },
    deliveryCostsText: {
      FR: "Les frais de livraison transfrontalière sont calculés en fonction de la distance et précisés dans le devis. Ils comprennent le transport du véhicule et les formalités administratives nécessaires.",
      EN: "Cross-border delivery costs are calculated based on distance and specified in the quote. They include vehicle transport and necessary administrative formalities.",
      ES: "Los costos de entrega transfronteriza se calculan en función de la distancia y se especifican en el presupuesto. Incluyen el transporte del vehículo y los trámites administrativos necesarios.",
      IT: "I costi di consegna transfrontaliera sono calcolati in base alla distanza e specificati nel preventivo. Includono il trasporto del veicolo e le necessarie formalità amministrative.",
      PT: "Os custos de entrega transfronteiriça são calculados com base na distância e especificados no orçamento. Incluem o transporte do veículo e as formalidades administrativas necessárias.",
      RO: "Costurile de livrare transfrontalieră sunt calculate în funcție de distanță și specificate în ofertă. Acestea includ transportul vehiculului și formalitățile administrative necesare."
    },
    registration: {
      FR: "4.3 Immatriculation :",
      EN: "4.3 Registration:",
      ES: "4.3 Matriculación:",
      IT: "4.3 Immatricolazione:",
      PT: "4.3 Registo:",
      RO: "4.3 Înmatriculare:"
    },
    registrationText: {
      FR: "Auto Adi peut, sur demande, assister le Client dans les démarches d'immatriculation du véhicule dans son pays de résidence, moyennant des frais supplémentaires.",
      EN: "Auto Adi can, upon request, assist the Customer in the vehicle registration process in their country of residence, for an additional fee.",
      ES: "Auto Adi puede, previa solicitud, ayudar al Cliente en el proceso de matriculación del vehículo en su país de residencia, por una tarifa adicional.",
      IT: "Auto Adi può, su richiesta, assistere il Cliente nel processo di immatricolazione del veicolo nel suo paese di residenza, per un costo aggiuntivo.",
      PT: "A Auto Adi pode, mediante pedido, ajudar o Cliente no processo de registo do veículo no seu país de residência, mediante uma taxa adicional.",
      RO: "Auto Adi poate, la cerere, să asiste Clientul în procesul de înmatriculare a vehiculului în țara sa de reședință, contra unei taxe suplimentare."
    },
    warrantyService: {
      FR: "5. Garantie et service après-vente",
      EN: "5. Warranty and after-sales service",
      ES: "5. Garantía y servicio posventa",
      IT: "5. Garanzia e servizio post-vendita",
      PT: "5. Garantia e serviço pós-venda",
      RO: "5. Garanție și service post-vânzare"
    },
    crossBorderWarranty: {
      FR: "5.1 Garantie transfrontalière :",
      EN: "5.1 Cross-border warranty:",
      ES: "5.1 Garantía transfronteriza:",
      IT: "5.1 Garanzia transfrontaliera:",
      PT: "5.1 Garantia transfronteiriça:",
      RO: "5.1 Garanție transfrontalieră:"
    },
    crossBorderWarrantyText: {
      FR: "Les véhicules vendus par Auto Adi bénéficient d'une garantie valable dans tous les pays de l'Union Européenne, selon les conditions spécifiées dans le carnet de garantie.",
      EN: "Vehicles sold by Auto Adi benefit from a warranty valid in all European Union countries, according to the conditions specified in the warranty booklet.",
      ES: "Los vehículos vendidos por Auto Adi se benefician de una garantía válida en todos los países de la Unión Europea, según las condiciones especificadas en el libro de garantía.",
      IT: "I veicoli venduti da Auto Adi beneficiano di una garanzia valida in tutti i paesi dell'Unione Europea, secondo le condizioni specificate nel libretto di garanzia.",
      PT: "Os veículos vendidos pela Auto Adi beneficiam de uma garantia válida em todos os países da União Europeia, de acordo com as condições especificadas no livrete de garantia.",
      RO: "Vehiculele vândute de Auto Adi beneficiază de o garanție valabilă în toate țările Uniunii Europene, conform condițiilor specificate în carnetul de garanție."
    },
    assistance: {
      FR: "5.2 Assistance :",
      EN: "5.2 Assistance:",
      ES: "5.2 Asistencia:",
      IT: "5.2 Assistenza:",
      PT: "5.2 Assistência:",
      RO: "5.2 Asistență:"
    },
    assistanceText: {
      FR: "En cas de panne ou de dysfonctionnement, le Client peut contacter le service client d'Auto Adi qui l'orientera vers le garage partenaire le plus proche de son lieu de résidence.",
      EN: "In case of breakdown or malfunction, the Customer can contact Auto Adi's customer service who will direct them to the nearest partner garage to their place of residence.",
      ES: "En caso de avería o mal funcionamiento, el Cliente puede contactar con el servicio de atención al cliente de Auto Adi, quien lo dirigirá al taller asociado más cercano a su lugar de residencia.",
      IT: "In caso di guasto o malfunzionamento, il Cliente può contattare il servizio clienti di Auto Adi che lo indirizzerà all'officina partner più vicina al suo luogo di residenza.",
      PT: "Em caso de avaria ou mau funcionamento, o Cliente pode contactar o serviço de apoio ao cliente da Auto Adi, que o encaminhará para a oficina parceira mais próxima do seu local de residência.",
      RO: "În caz de defecțiune sau funcționare defectuoasă, Clientul poate contacta serviciul pentru clienți al Auto Adi, care îl va direcționa către cel mai apropiat garaj partener de locul său de reședință."
    },
    specificProvisions: {
      FR: "6. Dispositions spécifiques",
      EN: "6. Specific provisions",
      ES: "6. Disposiciones específicas",
      IT: "6. Disposizioni specifiche",
      PT: "6. Disposições específicas",
      RO: "6. Dispoziții specifice"
    },
    reservationOfOwnership: {
      FR: "6.1 Réserve de propriété :",
      EN: "6.1 Reservation of ownership:",
      ES: "6.1 Reserva de propiedad:",
      IT: "6.1 Riserva di proprietà:",
      PT: "6.1 Reserva de propriedade:",
      RO: "6.1 Rezerva de proprietate:"
    },
    reservationOfOwnershipText: {
      FR: "Le véhicule reste la propriété d'Auto Adi jusqu'au paiement intégral de son prix.",
      EN: "The vehicle remains the property of Auto Adi until full payment of its price.",
      ES: "El vehículo sigue siendo propiedad de Auto Adi hasta el pago completo de su precio.",
      IT: "Il veicolo rimane di proprietà di Auto Adi fino al pagamento integrale del suo prezzo.",
      PT: "O veículo permanece propriedade da Auto Adi até ao pagamento integral do seu preço.",
      RO: "Vehiculul rămâne proprietatea Auto Adi până la plata integrală a prețului său."
    },
    modificationOfConditions: {
      FR: "6.2 Modification des conditions :",
      EN: "6.2 Modification of conditions:",
      ES: "6.2 Modificación de condiciones:",
      IT: "6.2 Modifica delle condizioni:",
      PT: "6.2 Modificação das condições:",
      RO: "6.2 Modificarea condițiilor:"
    },
    modificationOfConditionsText: {
      FR: "Auto Adi se réserve le droit de modifier les présentes conditions de vente à tout moment. Les conditions applicables sont celles en vigueur au jour de la commande du Client.",
      EN: "Auto Adi reserves the right to modify these terms of sale at any time. The applicable conditions are those in force on the day of the Customer's order.",
      ES: "Auto Adi se reserva el derecho de modificar estos términos de venta en cualquier momento. Las condiciones aplicables son las vigentes el día del pedido del Cliente.",
      IT: "Auto Adi si riserva il diritto di modificare questi termini di vendita in qualsiasi momento. Le condizioni applicabili sono quelle in vigore il giorno dell'ordine del Cliente.",
      PT: "A Auto Adi reserva-se o direito de modificar estes termos de venda a qualquer momento. As condições aplicáveis são as em vigor no dia da encomenda do Cliente.",
      RO: "Auto Adi își rezervă dreptul de a modifica acești termeni de vânzare în orice moment. Condițiile aplicabile sunt cele în vigoare în ziua comenzii Clientului."
    }
  };

  return (
    <LegalPageLayout title={translate('pageTitle', translations.pageTitle)}>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('purchaseProcedure', translations.purchaseProcedure)}</h2>
        <p className="mb-4">
          <strong>{translate('vehicleSelection', translations.vehicleSelection)}</strong> {translate('vehicleSelectionText', translations.vehicleSelectionText)}
        </p>
        <p className="mb-4">
          <strong>{translate('quote', translations.quote)}</strong> {translate('quoteText', translations.quoteText)}
        </p>
        <p className="mb-4">
          <strong>{translate('order', translations.order)}</strong> {translate('orderText', translations.orderText)}
        </p>
        <p>
          <strong>{translate('delivery', translations.delivery)}</strong> {translate('deliveryText', translations.deliveryText)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('financialConditions', translations.financialConditions)}</h2>
        <p className="mb-4">
          <strong>{translate('installmentPayment', translations.installmentPayment)}</strong> {translate('installmentPaymentText', translations.installmentPaymentText)}
        </p>
        <p className="mb-4">
          <strong>{translate('deposit', translations.deposit)}</strong> {translate('depositText', translations.depositText)}
        </p>
        <p>
          <strong>{translate('paymentMethods', translations.paymentMethods)}</strong> {translate('paymentMethodsText', translations.paymentMethodsText)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('necessaryDocuments', translations.necessaryDocuments)}</h2>
        <p>
          {translate('documentsText', translations.documentsText)}
        </p>
        <ul className="list-disc pl-6">
          <li>{translate('idDoc', translations.idDoc)}</li>
          <li>{translate('proofOfAddress', translations.proofOfAddress)}</li>
          <li>{translate('drivingLicense', translations.drivingLicense)}</li>
          <li>{translate('insuranceCertificate', translations.insuranceCertificate)}</li>
          <li>{translate('bankDetails', translations.bankDetails)}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('crossBorderDelivery', translations.crossBorderDelivery)}</h2>
        <p className="mb-4">
          <strong>{translate('deliveryTimes', translations.deliveryTimes)}</strong> {translate('deliveryTimesText', translations.deliveryTimesText)}
        </p>
        <p className="mb-4">
          <strong>{translate('deliveryCosts', translations.deliveryCosts)}</strong> {translate('deliveryCostsText', translations.deliveryCostsText)}
        </p>
        <p>
          <strong>{translate('registration', translations.registration)}</strong> {translate('registrationText', translations.registrationText)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('warrantyService', translations.warrantyService)}</h2>
        <p className="mb-4">
          <strong>{translate('crossBorderWarranty', translations.crossBorderWarranty)}</strong> {translate('crossBorderWarrantyText', translations.crossBorderWarrantyText)}
        </p>
        <p>
          <strong>{translate('assistance', translations.assistance)}</strong> {translate('assistanceText', translations.assistanceText)}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{translate('specificProvisions', translations.specificProvisions)}</h2>
        <p className="mb-4">
          <strong>{translate('reservationOfOwnership', translations.reservationOfOwnership)}</strong> {translate('reservationOfOwnershipText', translations.reservationOfOwnershipText)}
        </p>
        <p>
          <strong>{translate('modificationOfConditions', translations.modificationOfConditions)}</strong> {translate('modificationOfConditionsText', translations.modificationOfConditionsText)}
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Conditions;
