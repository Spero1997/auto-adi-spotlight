
import { Check, Shield, Calendar, CreditCard, Truck, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const ConditionsHighlight = () => {
  const { translate, language } = useLanguage();

  // Traductions pour le composant ConditionsHighlight
  const translations = {
    advantageousConditions: {
      FR: "Nos conditions avantageuses",
      EN: "Our advantageous conditions",
      ES: "Nuestras condiciones ventajosas",
      IT: "Le nostre condizioni vantaggiose",
      PT: "Nossas condições vantajosas",
      RO: "Condițiile noastre avantajoase"
    },
    dealerDesc: {
      FR: "Concessionnaire automobile, nous vendons des voitures d'occasion en Europe. Nous livrons partout.",
      EN: "Car dealer, we sell used cars in Europe. We deliver everywhere.",
      ES: "Concesionario de automóviles, vendemos coches usados en Europa. Entregamos en todas partes.",
      IT: "Concessionaria auto, vendiamo auto usate in Europa. Consegniamo ovunque.",
      PT: "Concessionário de automóveis, vendemos carros usados na Europa. Entregamos em todos os lugares.",
      RO: "Dealer auto, vindem mașini second-hand în Europa. Livrăm peste tot."
    },
    paymentMethods: {
      FR: "Modalités de paiement",
      EN: "Payment methods",
      ES: "Métodos de pago",
      IT: "Metodi di pagamento",
      PT: "Métodos de pagamento",
      RO: "Metode de plată"
    },
    deposit: {
      FR: "Acompte : 20% à la commande",
      EN: "Deposit: 20% on order",
      ES: "Depósito: 20% al realizar el pedido",
      IT: "Acconto: 20% all'ordine",
      PT: "Depósito: 20% no pedido",
      RO: "Avans: 20% la comandă"
    },
    balance: {
      FR: "Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)",
      EN: "Balance: on delivery or in interest-free installments (from 6 to 84 months)",
      ES: "Saldo: a la entrega o en cuotas sin intereses (de 6 a 84 meses)",
      IT: "Saldo: alla consegna o in rate senza interessi (da 6 a 84 mesi)",
      PT: "Saldo: na entrega ou em parcelas sem juros (de 6 a 84 meses)",
      RO: "Sold: la livrare sau în rate fără dobândă (de la 6 la 84 de luni)"
    },
    specialOffer: {
      FR: "Offre spéciale : -10% pour paiement comptant à la commande",
      EN: "Special offer: -10% for cash payment on order",
      ES: "Oferta especial: -10% por pago en efectivo al realizar el pedido",
      IT: "Offerta speciale: -10% per pagamento in contanti all'ordine",
      PT: "Oferta especial: -10% para pagamento à vista no pedido",
      RO: "Ofertă specială: -10% pentru plata în numerar la comandă"
    },
    includedServices: {
      FR: "Nos services inclus",
      EN: "Our included services",
      ES: "Nuestros servicios incluidos",
      IT: "I nostri servizi inclusi",
      PT: "Nossos serviços incluídos",
      RO: "Serviciile noastre incluse"
    },
    withdrawalPeriod: {
      FR: "Délai de rétractation : 14 jours (Satisfait ou remboursé)",
      EN: "Withdrawal period: 14 days (Satisfied or refunded)",
      ES: "Período de desistimiento: 14 días (Satisfecho o reembolsado)",
      IT: "Periodo di recesso: 14 giorni (Soddisfatti o rimborsati)",
      PT: "Período de cancelamento: 14 dias (Satisfeito ou reembolsado)",
      RO: "Perioada de retragere: 14 zile (Satisfăcut sau rambursat)"
    },
    paymentFacility: {
      FR: "Facilité de paiement : Payable comptant ou en mensualités sans intérêt",
      EN: "Payment facility: Payable in cash or in interest-free installments",
      ES: "Facilidad de pago: Pagadero en efectivo o en cuotas sin intereses",
      IT: "Facilità di pagamento: Pagabile in contanti o in rate senza interessi",
      PT: "Facilidade de pagamento: Pagável à vista ou em parcelas sem juros",
      RO: "Facilitate de plată: Plătibil în numerar sau în rate fără dobândă"
    },
    noNeedForBank: {
      FR: "Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !",
      EN: "No need for a bank or financial organization, we take care of everything!",
      ES: "No necesita banco ni organismo financiero, ¡nos encargamos de todo!",
      IT: "Non è necessaria una banca o un'organizzazione finanziaria, ci occupiamo di tutto!",
      PT: "Sem necessidade de banco ou organização financeira, cuidamos de tudo!",
      RO: "Nu este nevoie de bancă sau organizație financiară, ne ocupăm de tot!"
    },
    warranty: {
      FR: "Garantie",
      EN: "Warranty",
      ES: "Garantía",
      IT: "Garanzia",
      PT: "Garantia",
      RO: "Garanție"
    },
    warrantyPeriod: {
      FR: "12 à 48 mois, selon le type de véhicule",
      EN: "12 to 48 months, depending on the type of vehicle",
      ES: "12 a 48 meses, según el tipo de vehículo",
      IT: "Da 12 a 48 mesi, a seconda del tipo di veicolo",
      PT: "12 a 48 meses, dependendo do tipo de veículo",
      RO: "12 până la 48 de luni, în funcție de tipul vehiculului"
    },
    warrantyExtension: {
      FR: "Possibilité d'extension de garantie",
      EN: "Possibility of warranty extension",
      ES: "Posibilidad de extensión de garantía",
      IT: "Possibilità di estensione della garanzia",
      PT: "Possibilidade de extensão de garantia",
      RO: "Posibilitatea de extindere a garanției"
    },
    validInEurope: {
      FR: "Valable dans toute l'Europe",
      EN: "Valid throughout Europe",
      ES: "Válido en toda Europa",
      IT: "Valido in tutta Europa",
      PT: "Válido em toda a Europa",
      RO: "Valabil în toată Europa"
    },
    garageService: {
      FR: "Service garage automobile disponible",
      EN: "Car garage service available",
      ES: "Servicio de garaje disponible",
      IT: "Servizio garage auto disponibile",
      PT: "Serviço de garagem disponível",
      RO: "Serviciu de garaj auto disponibil"
    },
    europeanDelivery: {
      FR: "Livraison européenne :",
      EN: "European delivery:",
      ES: "Entrega europea:",
      IT: "Consegna europea:",
      PT: "Entrega europeia:",
      RO: "Livrare europeană:"
    },
    deliveryInfo: {
      FR: "Nous livrons nos véhicules partout en Europe. Contactez-nous pour plus d'informations sur les délais et les modalités de livraison.",
      EN: "We deliver our vehicles throughout Europe. Contact us for more information on delivery times and methods.",
      ES: "Entregamos nuestros vehículos en toda Europa. Contáctenos para obtener más información sobre los plazos y métodos de entrega.",
      IT: "Consegniamo i nostri veicoli in tutta Europa. Contattaci per maggiori informazioni sui tempi e i metodi di consegna.",
      PT: "Entregamos nossos veículos em toda a Europa. Entre em contato para mais informações sobre prazos e métodos de entrega.",
      RO: "Livrăm vehiculele noastre în toată Europa. Contactați-ne pentru mai multe informații despre termenele și metodele de livrare."
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translate("advantageousConditions", translations.advantageousConditions)}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {translate("dealerDesc", translations.dealerDesc)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-t-4 border-t-brand-blue shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <CreditCard className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate("paymentMethods", translations.paymentMethods)}</h3>
                </div>
                <ul className="space-y-3 text-gray-600 flex-1">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("deposit", translations.deposit)}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("balance", translations.balance)}</span>
                  </li>
                  <li className="flex items-start font-semibold text-brand-blue">
                    <Check className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("specialOffer", translations.specialOffer)}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-brand-orange shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-brand-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Check className="h-7 w-7 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate("includedServices", translations.includedServices)}</h3>
                </div>
                <ul className="space-y-3 text-gray-600 flex-1">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("withdrawalPeriod", translations.withdrawalPeriod)}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("paymentFacility", translations.paymentFacility)}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-orange mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("noNeedForBank", translations.noNeedForBank)}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="bg-green-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{translate("warranty", translations.warranty)}</h3>
                </div>
                <div className="space-y-3 text-gray-600 flex-1">
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("warrantyPeriod", translations.warrantyPeriod)}</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("warrantyExtension", translations.warrantyExtension)}</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{translate("validInEurope", translations.validInEurope)}</span>
                  </p>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
                    <Settings className="h-6 w-6 text-brand-blue" />
                    <p className="font-medium text-gray-800">{translate("garageService", translations.garageService)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl flex items-start">
            <Truck className="h-6 w-6 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">
              <span className="font-semibold">{translate("europeanDelivery", translations.europeanDelivery)}</span> {translate("deliveryInfo", translations.deliveryInfo)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionsHighlight;
