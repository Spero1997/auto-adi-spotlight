
import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const CGV = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page CGV
  const translations = {
    pageTitle: {
      FR: "Conditions Générales de Vente",
      EN: "General Terms and Conditions of Sale",
      ES: "Condiciones Generales de Venta",
      IT: "Condizioni Generali di Vendita",
      PT: "Condições Gerais de Venda",
      RO: "Condiții Generale de Vânzare"
    },
    preamble: {
      FR: "Préambule",
      EN: "Preamble",
      ES: "Preámbulo",
      IT: "Preambolo",
      PT: "Preâmbulo",
      RO: "Preambul"
    },
    preambleText: {
      FR: "Les présentes conditions générales de vente régissent les relations contractuelles entre Auto Adi, ci-après dénommée \"le Vendeur\", et toute personne physique ou morale procédant à l'achat d'un véhicule ou d'un service, ci-après dénommée \"le Client\". Tout achat implique l'acceptation sans réserve par le Client des présentes conditions générales de vente.",
      EN: "These general terms and conditions of sale govern the contractual relationships between Auto Adi, hereinafter referred to as \"the Seller\", and any natural or legal person purchasing a vehicle or a service, hereinafter referred to as \"the Customer\". Any purchase implies the unreserved acceptance by the Customer of these general terms and conditions of sale.",
      ES: "Estas condiciones generales de venta rigen las relaciones contractuales entre Auto Adi, en adelante denominado \"el Vendedor\", y cualquier persona física o jurídica que compre un vehículo o un servicio, en adelante denominado \"el Cliente\". Cualquier compra implica la aceptación sin reservas por parte del Cliente de estas condiciones generales de venta.",
      IT: "Le presenti condizioni generali di vendita regolano i rapporti contrattuali tra Auto Adi, di seguito denominata \"il Venditore\", e qualsiasi persona fisica o giuridica che acquisti un veicolo o un servizio, di seguito denominata \"il Cliente\". Qualsiasi acquisto implica l'accettazione senza riserve da parte del Cliente delle presenti condizioni generali di vendita.",
      PT: "Estas condições gerais de venda regem as relações contratuais entre a Auto Adi, doravante designada \"o Vendedor\", e qualquer pessoa singular ou coletiva que adquira um veículo ou um serviço, doravante designada \"o Cliente\". Qualquer compra implica a aceitação sem reservas pelo Cliente das presentes condições gerais de venda.",
      RO: "Aceste condiții generale de vânzare reglementează relațiile contractuale dintre Auto Adi, denumită în continuare \"Vânzătorul\", și orice persoană fizică sau juridică care achiziționează un vehicul sau un serviciu, denumită în continuare \"Clientul\". Orice achiziție implică acceptarea fără rezerve de către Client a acestor condiții generale de vânzare."
    },
    article1: {
      FR: "Article 1 - Commande et formation du contrat",
      EN: "Article 1 - Order and formation of the contract",
      ES: "Artículo 1 - Pedido y formación del contrato",
      IT: "Articolo 1 - Ordine e formazione del contratto",
      PT: "Artigo 1 - Encomenda e formação do contrato",
      RO: "Articolul 1 - Comandă și formarea contractului"
    },
    article1Text1: {
      FR: "Le contrat de vente est formé lorsque le Client accepte l'offre du Vendeur en versant un acompte de 20% du prix total du véhicule et en signant le bon de commande.",
      EN: "The sales contract is formed when the Customer accepts the Seller's offer by paying a deposit of 20% of the total price of the vehicle and signing the order form.",
      ES: "El contrato de venta se forma cuando el Cliente acepta la oferta del Vendedor pagando un depósito del 20% del precio total del vehículo y firmando el formulario de pedido.",
      IT: "Il contratto di vendita si forma quando il Cliente accetta l'offerta del Venditore versando un acconto del 20% del prezzo totale del veicolo e firmando il modulo d'ordine.",
      PT: "O contrato de venda é formado quando o Cliente aceita a oferta do Vendedor pagando um depósito de 20% do preço total do veículo e assinando o formulário de encomenda.",
      RO: "Contractul de vânzare este format atunci când Clientul acceptă oferta Vânzătorului plătind un avans de 20% din prețul total al vehiculului și semnând formularul de comandă."
    },
    article1Text2: {
      FR: "Le bon de commande précise les caractéristiques essentielles du véhicule, son prix total, les modalités de paiement, les délais de livraison et les garanties applicables.",
      EN: "The order form specifies the essential characteristics of the vehicle, its total price, the payment terms, the delivery times, and the applicable guarantees.",
      ES: "El formulario de pedido especifica las características esenciales del vehículo, su precio total, las condiciones de pago, los plazos de entrega y las garantías aplicables.",
      IT: "Il modulo d'ordine specifica le caratteristiche essenziali del veicolo, il suo prezzo totale, le modalità di pagamento, i tempi di consegna e le garanzie applicabili.",
      PT: "O formulário de encomenda especifica as características essenciais do veículo, o seu preço total, as condições de pagamento, os prazos de entrega e as garantias aplicáveis.",
      RO: "Formularul de comandă specifică caracteristicile esențiale ale vehiculului, prețul total, termenii de plată, termenele de livrare și garanțiile aplicabile."
    },
    article2: {
      FR: "Article 2 - Prix et modalités de paiement",
      EN: "Article 2 - Price and payment terms",
      ES: "Artículo 2 - Precio y condiciones de pago",
      IT: "Articolo 2 - Prezzo e modalità di pagamento",
      PT: "Artigo 2 - Preço e condições de pagamento",
      RO: "Articolul 2 - Preț și modalități de plată"
    },
    article2Text1: {
      FR: "Les prix des véhicules sont indiqués en euros, toutes taxes comprises. Le prix comprend le coût du véhicule et des options choisies par le Client. Les frais de livraison, d'immatriculation et de mise à la route sont facturés en supplément, sauf mention contraire.",
      EN: "Vehicle prices are indicated in euros, all taxes included. The price includes the cost of the vehicle and the options chosen by the Customer. Delivery, registration, and road preparation fees are charged in addition, unless otherwise stated.",
      ES: "Los precios de los vehículos se indican en euros, todos los impuestos incluidos. El precio incluye el coste del vehículo y las opciones elegidas por el Cliente. Los gastos de entrega, matriculación y preparación para la carretera se cobran adicionalmente, a menos que se indique lo contrario.",
      IT: "I prezzi dei veicoli sono indicati in euro, tutte le tasse incluse. Il prezzo comprende il costo del veicolo e delle opzioni scelte dal Cliente. Le spese di consegna, immatricolazione e preparazione stradale sono addebitate in aggiunta, salvo diversa indicazione.",
      PT: "Os preços dos veículos são indicados em euros, com todos os impostos incluídos. O preço inclui o custo do veículo e as opções escolhidas pelo Cliente. As taxas de entrega, registo e preparação para a estrada são cobradas adicionalmente, salvo indicação em contrário.",
      RO: "Prețurile vehiculelor sunt indicate în euro, toate taxele incluse. Prețul include costul vehiculului și opțiunile alese de Client. Taxele de livrare, înmatriculare și pregătire pentru drum sunt percepute suplimentar, dacă nu se specifică altfel."
    },
    article2Text2: {
      FR: "Le paiement s'effectue selon les modalités suivantes :",
      EN: "Payment is made according to the following terms:",
      ES: "El pago se realiza según las siguientes condiciones:",
      IT: "Il pagamento viene effettuato secondo le seguenti modalità:",
      PT: "O pagamento é efetuado de acordo com as seguintes condições:",
      RO: "Plata se efectuează conform următoarelor condiții:"
    },
    depositPayment: {
      FR: "Versement d'un acompte de 20% du prix total à la commande",
      EN: "Payment of a deposit of 20% of the total price at the time of order",
      ES: "Pago de un depósito del 20% del precio total en el momento del pedido",
      IT: "Versamento di un acconto del 20% del prezzo totale al momento dell'ordine",
      PT: "Pagamento de um depósito de 20% do preço total no momento da encomenda",
      RO: "Plata unui avans de 20% din prețul total la momentul comenzii"
    },
    balancePayment: {
      FR: "Paiement du solde avant la livraison du véhicule",
      EN: "Payment of the balance before delivery of the vehicle",
      ES: "Pago del saldo antes de la entrega del vehículo",
      IT: "Pagamento del saldo prima della consegna del veicolo",
      PT: "Pagamento do saldo antes da entrega do veículo",
      RO: "Plata soldului înainte de livrarea vehiculului"
    },
    article3: {
      FR: "Article 3 - Livraison",
      EN: "Article 3 - Delivery",
      ES: "Artículo 3 - Entrega",
      IT: "Articolo 3 - Consegna",
      PT: "Artigo 3 - Entrega",
      RO: "Articolul 3 - Livrare"
    },
    article3Text1: {
      FR: "La livraison du véhicule est effectuée dans les locaux du Vendeur ou à l'adresse indiquée par le Client dans le bon de commande, sous réserve du paiement intégral du prix.",
      EN: "The delivery of the vehicle is carried out at the Seller's premises or at the address indicated by the Customer in the order form, subject to full payment of the price.",
      ES: "La entrega del vehículo se realiza en las instalaciones del Vendedor o en la dirección indicada por el Cliente en el formulario de pedido, sujeto al pago completo del precio.",
      IT: "La consegna del veicolo viene effettuata presso la sede del Venditore o all'indirizzo indicato dal Cliente nel modulo d'ordine, previo pagamento integrale del prezzo.",
      PT: "A entrega do veículo é efetuada nas instalações do Vendedor ou no endereço indicado pelo Cliente no formulário de encomenda, sujeito ao pagamento integral do preço.",
      RO: "Livrarea vehiculului se efectuează la sediul Vânzătorului sau la adresa indicată de Client în formularul de comandă, sub rezerva plății integrale a prețului."
    },
    article3Text2: {
      FR: "Le délai de livraison est indiqué sur le bon de commande. Ce délai est donné à titre indicatif et n'est pas un délai de rigueur. Le Vendeur ne pourra être tenu responsable des retards de livraison dus à des causes indépendantes de sa volonté.",
      EN: "The delivery time is indicated on the order form. This time is given as an indication and is not a strict deadline. The Seller cannot be held responsible for delivery delays due to causes beyond its control.",
      ES: "El plazo de entrega se indica en el formulario de pedido. Este plazo se da a título indicativo y no es un plazo estricto. El Vendedor no podrá ser considerado responsable de los retrasos en la entrega debidos a causas ajenas a su voluntad.",
      IT: "Il tempo di consegna è indicato sul modulo d'ordine. Questo tempo è dato a titolo indicativo e non è una scadenza rigorosa. Il Venditore non può essere ritenuto responsabile per ritardi di consegna dovuti a cause al di fuori del suo controllo.",
      PT: "O prazo de entrega é indicado no formulário de encomenda. Este prazo é dado a título indicativo e não é um prazo estrito. O Vendedor não pode ser responsabilizado por atrasos na entrega devido a causas fora do seu controlo.",
      RO: "Termenul de livrare este indicat pe formularul de comandă. Acest termen este dat cu titlu indicativ și nu este un termen strict. Vânzătorul nu poate fi tras la răspundere pentru întârzieri de livrare datorate unor cauze independente de voința sa."
    },
    article4: {
      FR: "Article 4 - Garanties",
      EN: "Article 4 - Warranties",
      ES: "Artículo 4 - Garantías",
      IT: "Articolo 4 - Garanzie",
      PT: "Artigo 4 - Garantias",
      RO: "Articolul 4 - Garanții"
    },
    article4Text1: {
      FR: "Les véhicules neufs bénéficient de la garantie constructeur dont les conditions sont précisées dans le carnet de garantie remis avec le véhicule.",
      EN: "New vehicles benefit from the manufacturer's warranty, the conditions of which are specified in the warranty booklet provided with the vehicle.",
      ES: "Los vehículos nuevos se benefician de la garantía del fabricante, cuyas condiciones se especifican en el libro de garantía entregado con el vehículo.",
      IT: "I veicoli nuovi beneficiano della garanzia del produttore, le cui condizioni sono specificate nel libretto di garanzia fornito con il veicolo.",
      PT: "Os veículos novos beneficiam da garantia do fabricante, cujas condições são especificadas no livrete de garantia fornecido com o veículo.",
      RO: "Vehiculele noi beneficiază de garanția producătorului, ale cărei condiții sunt specificate în carnetul de garanție furnizat cu vehiculul."
    },
    article4Text2: {
      FR: "Les véhicules d'occasion bénéficient de la garantie légale de conformité (2 ans) et de la garantie légale contre les vices cachés. Une garantie commerciale supplémentaire peut être proposée par le Vendeur, dont les modalités sont précisées dans un document distinct.",
      EN: "Used vehicles benefit from the legal warranty of conformity (2 years) and the legal warranty against hidden defects. An additional commercial warranty may be offered by the Seller, the terms of which are specified in a separate document.",
      ES: "Los vehículos usados se benefician de la garantía legal de conformidad (2 años) y de la garantía legal contra defectos ocultos. El Vendedor puede ofrecer una garantía comercial adicional, cuyas condiciones se especifican en un documento separado.",
      IT: "I veicoli usati beneficiano della garanzia legale di conformità (2 anni) e della garanzia legale contro i difetti nascosti. Il Venditore può offrire una garanzia commerciale aggiuntiva, i cui termini sono specificati in un documento separato.",
      PT: "Os veículos usados beneficiam da garantia legal de conformidade (2 anos) e da garantia legal contra defeitos ocultos. O Vendedor pode oferecer uma garantia comercial adicional, cujos termos são especificados num documento separado.",
      RO: "Vehiculele second-hand beneficiază de garanția legală de conformitate (2 ani) și de garanția legală împotriva defectelor ascunse. Vânzătorul poate oferi o garanție comercială suplimentară, ale cărei condiții sunt specificate într-un document separat."
    },
    article5: {
      FR: "Article 5 - Droit de rétractation",
      EN: "Article 5 - Right of withdrawal",
      ES: "Artículo 5 - Derecho de desistimiento",
      IT: "Articolo 5 - Diritto di recesso",
      PT: "Artigo 5 - Direito de retratação",
      RO: "Articolul 5 - Dreptul de retragere"
    },
    article5Text: {
      FR: "Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours à compter de la livraison du véhicule pour exercer son droit de rétractation, sans avoir à motiver sa décision. Pour exercer ce droit, le Client doit notifier sa décision par écrit au Vendeur. Les frais de retour du véhicule sont à la charge du Client.",
      EN: "In accordance with current legislation, the Customer has a period of 14 days from the delivery of the vehicle to exercise their right of withdrawal, without having to justify their decision. To exercise this right, the Customer must notify their decision in writing to the Seller. The costs of returning the vehicle are borne by the Customer.",
      ES: "De acuerdo con la legislación vigente, el Cliente dispone de un plazo de 14 días a partir de la entrega del vehículo para ejercer su derecho de desistimiento, sin tener que justificar su decisión. Para ejercer este derecho, el Cliente debe notificar su decisión por escrito al Vendedor. Los gastos de devolución del vehículo corren a cargo del Cliente.",
      IT: "In conformità con la legislazione vigente, il Cliente dispone di un periodo di 14 giorni dalla consegna del veicolo per esercitare il proprio diritto di recesso, senza dover giustificare la propria decisione. Per esercitare questo diritto, il Cliente deve notificare la sua decisione per iscritto al Venditore. I costi di restituzione del veicolo sono a carico del Cliente.",
      PT: "De acordo com a legislação em vigor, o Cliente dispõe de um prazo de 14 dias a partir da entrega do veículo para exercer o seu direito de retratação, sem ter de justificar a sua decisão. Para exercer este direito, o Cliente deve notificar a sua decisão por escrito ao Vendedor. Os custos de devolução do veículo são suportados pelo Cliente.",
      RO: "În conformitate cu legislația în vigoare, Clientul dispune de o perioadă de 14 zile de la livrarea vehiculului pentru a-și exercita dreptul de retragere, fără a fi nevoit să își justifice decizia. Pentru a exercita acest drept, Clientul trebuie să notifice decizia sa în scris Vânzătorului. Costurile de returnare a vehiculului sunt suportate de Client."
    },
    article6: {
      FR: "Article 6 - Litiges",
      EN: "Article 6 - Disputes",
      ES: "Artículo 6 - Disputas",
      IT: "Articolo 6 - Controversie",
      PT: "Artigo 6 - Litígios",
      RO: "Articolul 6 - Litigii"
    },
    article6Text: {
      FR: "En cas de litige, le Client s'adressera en priorité au Vendeur pour trouver une solution amiable. À défaut d'accord, les tribunaux de Florence seront seuls compétents.",
      EN: "In case of dispute, the Customer will primarily address the Seller to find an amicable solution. In the absence of agreement, the courts of Florence will have exclusive jurisdiction.",
      ES: "En caso de disputa, el Cliente se dirigirá principalmente al Vendedor para encontrar una solución amistosa. A falta de acuerdo, los tribunales de Florencia tendrán jurisdicción exclusiva.",
      IT: "In caso di controversia, il Cliente si rivolgerà principalmente al Venditore per trovare una soluzione amichevole. In assenza di accordo, i tribunali di Firenze avranno giurisdizione esclusiva.",
      PT: "Em caso de litígio, o Cliente dirigir-se-á principalmente ao Vendedor para encontrar uma solução amigável. Na ausência de acordo, os tribunais de Florença terão jurisdição exclusiva.",
      RO: "În caz de litigiu, Clientul se va adresa în primul rând Vânzătorului pentru a găsi o soluție amiabilă. În absența unui acord, instanțele din Florența vor avea jurisdicție exclusivă."
    }
  };

  return (
    <LegalPageLayout title={translate('pageTitle', translations.pageTitle)}>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('preamble', translations.preamble)}</h2>
        <p>
          {translate('preambleText', translations.preambleText)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('article1', translations.article1)}</h2>
        <p className="mb-4">
          {translate('article1Text1', translations.article1Text1)}
        </p>
        <p>
          {translate('article1Text2', translations.article1Text2)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('article2', translations.article2)}</h2>
        <p className="mb-4">
          {translate('article2Text1', translations.article2Text1)}
        </p>
        <p className="mb-4">
          {translate('article2Text2', translations.article2Text2)}
        </p>
        <ul className="list-disc pl-6">
          <li>{translate('depositPayment', translations.depositPayment)}</li>
          <li>{translate('balancePayment', translations.balancePayment)}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('article3', translations.article3)}</h2>
        <p className="mb-4">
          {translate('article3Text1', translations.article3Text1)}
        </p>
        <p>
          {translate('article3Text2', translations.article3Text2)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('article4', translations.article4)}</h2>
        <p className="mb-4">
          {translate('article4Text1', translations.article4Text1)}
        </p>
        <p className="mb-4">
          {translate('article4Text2', translations.article4Text2)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('article5', translations.article5)}</h2>
        <p>
          {translate('article5Text', translations.article5Text)}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{translate('article6', translations.article6)}</h2>
        <p>
          {translate('article6Text', translations.article6Text)}
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CGV;
