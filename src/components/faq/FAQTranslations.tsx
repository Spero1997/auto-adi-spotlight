import React from 'react';
import { Language } from '@/contexts/LanguageContext';
import { FAQSection } from './FAQAccordion';

type FAQTranslations = {
  faqTitle: Record<Language, string>;
  faqDescription: Record<Language, string>;
  certifiedVehicles: Record<Language, string>;
  certifiedVehiclesDescription: Record<Language, string>;
  extendedWarranty: Record<Language, string>;
  extendedWarrantyDescription: Record<Language, string>;
  flexibleFinancing: Record<Language, string>;
  flexibleFinancingDescription: Record<Language, string>;
  fastDelivery: Record<Language, string>;
  fastDeliveryDescription: Record<Language, string>;
  moreQuestions: Record<Language, string>;
  teamAvailable: Record<Language, string>;
  contactUs: Record<Language, string>;
  callDirectly: Record<Language, string>;
  faqSections: Record<Language, FAQSection[]>;
};

export const getFAQTranslations = (): FAQTranslations => {
  return {
    faqTitle: {
      FR: "Questions Fréquentes",
      EN: "Frequently Asked Questions",
      ES: "Preguntas Frecuentes",
      IT: "Domande Frequenti",
      PT: "Perguntas Frequentes",
      RO: "Întrebări Frecvente"
    },
    faqDescription: {
      FR: "Trouvez rapidement les réponses à vos questions les plus courantes concernant nos services, nos véhicules et nos procédures.",
      EN: "Quickly find answers to your most common questions about our services, vehicles, and procedures.",
      ES: "Encuentre rápidamente las respuestas a sus preguntas más frecuentes sobre nuestros servicios, vehículos y procedimientos.",
      IT: "Trova rapidamente le risposte alle tue domande più frequenti sui nostri servizi, veicoli e procedure.",
      PT: "Encontre rapidamente as respostas às suas perguntas mais frequentes sobre os nossos serviços, veículos e procedimentos.",
      RO: "Găsiți rapid răspunsuri la cele mai frecvente întrebări despre serviciile, vehiculele și procedurile noastre."
    },
    certifiedVehicles: {
      FR: "Véhicules Certifiés",
      EN: "Certified Vehicles",
      ES: "Vehículos Certificados",
      IT: "Veicoli Certificati",
      PT: "Veículos Certificados",
      RO: "Vehicule Certificate"
    },
    certifiedVehiclesDescription: {
      FR: "Découvrez notre sélection de véhicules d'occasion certifiés, rigoureusement inspectés pour garantir qualité et fiabilité.",
      EN: "Discover our selection of certified pre-owned vehicles, rigorously inspected to ensure quality and reliability.",
      ES: "Descubra nuestra selección de vehículos de ocasión certificados, rigurosamente inspeccionados para garantizar calidad y fiabilidad.",
      IT: "Scopri la nostra selezione di veicoli usati certificati, rigorosamente ispezionati per garantire qualità e affidabilità.",
      PT: "Descubra a nossa seleção de veículos usados certificados, rigorosamente inspecionados para garantir qualidade e fiabilidade.",
      RO: "Descoperiți selecția noastră de vehicule second-hand certificate, inspectate riguros pentru a garanta calitatea și fiabilitatea."
    },
    extendedWarranty: {
      FR: "Garantie Prolongée",
      EN: "Extended Warranty",
      ES: "Garantía Extendida",
      IT: "Garanzia Estesa",
      PT: "Garantia Estendida",
      RO: "Garanție Extinsă"
    },
    extendedWarrantyDescription: {
      FR: "Roulez en toute sérénité avec nos options de garantie prolongée, offrant une couverture complète contre les imprévus mécaniques.",
      EN: "Drive with peace of mind with our extended warranty options, providing comprehensive coverage against unexpected mechanical issues.",
      ES: "Conduzca con tranquilidad con nuestras opciones de garantía extendida, que ofrecen una cobertura completa contra imprevistos mecánicos.",
      IT: "Guida in tutta tranquillità con le nostre opzioni di garanzia estesa, che offrono una copertura completa contro gli imprevisti meccanici.",
      PT: "Conduza com tranquilidade com as nossas opções de garantia estendida, que oferecem uma cobertura completa contra imprevistos mecânicos.",
      RO: "Conduceți cu liniște sufletească cu opțiunile noastre de garanție extinsă, oferind o acoperire completă împotriva problemelor mecanice neașteptate."
    },
    flexibleFinancing: {
      FR: "Financement Flexible",
      EN: "Flexible Financing",
      ES: "Financiación Flexible",
      IT: "Finanziamento Flessibile",
      PT: "Financiamento Flexível",
      RO: "Finanțare Flexibilă"
    },
    flexibleFinancingDescription: {
      FR: "Profitez de nos solutions de financement personnalisées, conçues pour s'adapter à votre budget et à vos besoins spécifiques.",
      EN: "Take advantage of our customized financing solutions, designed to fit your budget and specific needs.",
      ES: "Aproveche nuestras soluciones de financiación personalizadas, diseñadas para adaptarse a su presupuesto y necesidades específicas.",
      IT: "Approfitta delle nostre soluzioni di finanziamento personalizzate, progettate per adattarsi al tuo budget e alle tue esigenze specifiche.",
      PT: "Aproveite as nossas soluções de financiamento personalizadas, concebidas para se adaptarem ao seu orçamento e às suas necessidades específicas.",
      RO: "Profitați de soluțiile noastre de finanțare personalizate, concepute pentru a se potrivi bugetului și nevoilor dumneavoastră specifice."
    },
    fastDelivery: {
      FR: "Livraison Rapide",
      EN: "Fast Delivery",
      ES: "Entrega Rápida",
      IT: "Consegna Rapida",
      PT: "Entrega Rápida",
      RO: "Livrare Rapidă"
    },
    fastDeliveryDescription: {
      FR: "Bénéficiez d'une livraison rapide et efficace de votre nouveau véhicule, directement à votre domicile ou à l'endroit de votre choix.",
      EN: "Enjoy fast and efficient delivery of your new vehicle, directly to your home or the location of your choice.",
      ES: "Benefíciese de una entrega rápida y eficiente de su nuevo vehículo, directamente a su domicilio o al lugar de su elección.",
      IT: "Goditi una consegna rapida ed efficiente del tuo nuovo veicolo, direttamente a casa tua o nel luogo che preferisci.",
      PT: "Beneficie de uma entrega rápida e eficiente do seu novo veículo, diretamente na sua casa ou no local da sua escolha.",
      RO: "Beneficiați de o livrare rapidă și eficientă a noului dvs. vehicul, direct la domiciliu sau în locația aleasă."
    },
    moreQuestions: {
      FR: "Vous avez d'autres questions ?",
      EN: "Do you have more questions?",
      ES: "¿Tiene más preguntas?",
      IT: "Avete altre domande?",
      PT: "Tem mais perguntas?",
      RO: "Aveți mai multe întrebări?"
    },
    teamAvailable: {
      FR: "Notre équipe est à votre disposition pour répondre à toutes vos interrogations.",
      EN: "Our team is available to answer all your questions.",
      ES: "Nuestro equipo está a su disposición para responder a todas sus preguntas.",
      IT: "Il nostro team è a tua disposizione per rispondere a tutte le tue domande.",
      PT: "A nossa equipa está à sua disposição para responder a todas as suas perguntas.",
      RO: "Echipa noastră este disponibilă pentru a răspunde la toate întrebările dumneavoastră."
    },
    contactUs: {
      FR: "Contactez-nous",
      EN: "Contact Us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    },
    callDirectly: {
      FR: "Appelez directement",
      EN: "Call directly",
      ES: "Llame directamente",
      IT: "Chiama direttamente",
      PT: "Ligue diretamente",
      RO: "Sunați direct"
    },
    faqSections: {
      FR: [
        {
          title: "État et caractéristiques du véhicule",
          faqs: [
            {
              question: "Quel est l'état du véhicule et son kilométrage actuel ?",
              answer: (
                <div>
                  <p>Tous nos véhicules sont inspectés par nos experts. Le kilométrage exact est indiqué sur chaque fiche produit.</p>
                </div>
              ),
            },
            {
              question: "Le véhicule a-t-il été accidenté ?",
              answer: (
                <div>
                  <p>Nous fournissons un historique complet du véhicule, incluant les éventuels accidents, dans la mesure où ces informations sont disponibles.</p>
                </div>
              ),
            },
            {
              question: "Puis-je obtenir un rapport d'inspection détaillé du véhicule ?",
              answer: (
                <div>
                  <p>Oui, un rapport d'inspection détaillé est disponible sur demande pour chaque véhicule.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Garantie et financement",
          faqs: [
            {
              question: "Quelle est la durée de la garantie offerte sur les véhicules ?",
              answer: (
                <div>
                  <p>La durée de la garantie varie en fonction du véhicule et de l'option de garantie choisie. Les détails sont spécifiés dans la fiche produit.</p>
                </div>
              ),
            },
            {
              question: "Quelles sont les options de financement disponibles ?",
              answer: (
                <div>
                  <p>Nous proposons plusieurs options de financement, y compris des prêts automobiles classiques et des solutions de location avec option d'achat.</p>
                </div>
              ),
            },
            {
              question: "Comment puis-je faire une demande de financement ?",
              answer: (
                <div>
                  <p>Vous pouvez faire une demande de financement directement en ligne via notre site web ou en contactant notre équipe commerciale.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Livraison et service après-vente",
          faqs: [
            {
              question: "Quels sont les délais de livraison ?",
              answer: (
                <div>
                  <p>Les délais de livraison varient en fonction de la destination et de la disponibilité du véhicule. Nous vous fournirons une estimation précise lors de votre commande.</p>
                </div>
              ),
            },
            {
              question: "Proposez-vous un service après-vente ?",
              answer: (
                <div>
                  <p>Oui, nous disposons d'un service après-vente complet pour assurer l'entretien et la réparation de votre véhicule.</p>
                </div>
              ),
            },
            {
              question: "Comment puis-je prendre rendez-vous pour un entretien ?",
              answer: (
                <div>
                  <p>Vous pouvez prendre rendez-vous en ligne via notre site web ou en contactant notre service clientèle.</p>
                </div>
              ),
            },
          ]
        }
      ],
      EN: [
        {
          title: "Vehicle Condition and Features",
          faqs: [
            {
              question: "What is the condition of the vehicle and its current mileage?",
              answer: (
                <div>
                  <p>All our vehicles are inspected by our experts. The exact mileage is indicated on each product sheet.</p>
                </div>
              ),
            },
            {
              question: "Has the vehicle been in an accident?",
              answer: (
                <div>
                  <p>We provide a complete vehicle history, including any accidents, to the extent that this information is available.</p>
                </div>
              ),
            },
            {
              question: "Can I get a detailed inspection report of the vehicle?",
              answer: (
                <div>
                  <p>Yes, a detailed inspection report is available upon request for each vehicle.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Warranty and Financing",
          faqs: [
            {
              question: "What is the duration of the warranty offered on the vehicles?",
              answer: (
                <div>
                  <p>The duration of the warranty varies depending on the vehicle and the warranty option chosen. Details are specified in the product sheet.</p>
                </div>
              ),
            },
            {
              question: "What financing options are available?",
              answer: (
                <div>
                  <p>We offer several financing options, including traditional car loans and lease-to-own solutions.</p>
                </div>
              ),
            },
            {
              question: "How can I apply for financing?",
              answer: (
                <div>
                  <p>You can apply for financing directly online via our website or by contacting our sales team.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Delivery and After-Sales Service",
          faqs: [
            {
              question: "What are the delivery times?",
              answer: (
                <div>
                  <p>Delivery times vary depending on the destination and the availability of the vehicle. We will provide you with an accurate estimate when you place your order.</p>
                </div>
              ),
            },
            {
              question: "Do you offer after-sales service?",
              answer: (
                <div>
                  <p>Yes, we have a comprehensive after-sales service to ensure the maintenance and repair of your vehicle.</p>
                </div>
              ),
            },
            {
              question: "How can I make an appointment for maintenance?",
              answer: (
                <div>
                  <p>You can make an appointment online via our website or by contacting our customer service.</p>
                </div>
              ),
            },
          ]
        }
      ],
      ES: [
        {
          title: "Estado y características del vehículo",
          faqs: [
            {
              question: "¿Cuál es el estado del vehículo y su kilometraje actual?",
              answer: (
                <div>
                  <p>Todos nuestros vehículos son inspeccionados por nuestros expertos. El kilometraje exacto se indica en cada ficha de producto.</p>
                </div>
              ),
            },
            {
              question: "¿El vehículo ha tenido algún accidente?",
              answer: (
                <div>
                  <p>Proporcionamos un historial completo del vehículo, incluyendo cualquier accidente, en la medida en que esta información esté disponible.</p>
                </div>
              ),
            },
            {
              question: "¿Puedo obtener un informe de inspección detallado del vehículo?",
              answer: (
                <div>
                  <p>Sí, un informe de inspección detallado está disponible bajo petición para cada vehículo.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Garantía y financiación",
          faqs: [
            {
              question: "¿Cuál es la duración de la garantía ofrecida en los vehículos?",
              answer: (
                <div>
                  <p>La duración de la garantía varía en función del vehículo y de la opción de garantía elegida. Los detalles se especifican en la ficha del producto.</p>
                </div>
              ),
            },
            {
              question: "¿Qué opciones de financiación están disponibles?",
              answer: (
                <div>
                  <p>Ofrecemos varias opciones de financiación, incluyendo préstamos de coche tradicionales y soluciones de alquiler con opción a compra.</p>
                </div>
              ),
            },
            {
              question: "¿Cómo puedo solicitar financiación?",
              answer: (
                <div>
                  <p>Puede solicitar financiación directamente en línea a través de nuestro sitio web o poniéndose en contacto con nuestro equipo de ventas.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Entrega y servicio postventa",
          faqs: [
            {
              question: "¿Cuáles son los plazos de entrega?",
              answer: (
                <div>
                  <p>Los plazos de entrega varían en función del destino y de la disponibilidad del vehículo. Le proporcionaremos una estimación precisa al realizar su pedido.</p>
                </div>
              ),
            },
            {
              question: "¿Ofrecen servicio postventa?",
              answer: (
                <div>
                  <p>Sí, disponemos de un servicio postventa completo para garantizar el mantenimiento y la reparación de su vehículo.</p>
                </div>
              ),
            },
            {
              question: "¿Cómo puedo concertar una cita para el mantenimiento?",
              answer: (
                <div>
                  <p>Puede concertar una cita en línea a través de nuestro sitio web o poniéndose en contacto con nuestro servicio de atención al cliente.</p>
                </div>
              ),
            },
          ]
        }
      ],
      IT: [
        {
          title: "Stato e caratteristiche del veicolo",
          faqs: [
            {
              question: "Qual è lo stato del veicolo e il suo chilometraggio attuale?",
              answer: (
                <div>
                  <p>Tutti i nostri veicoli sono ispezionati dai nostri esperti. Il chilometraggio esatto è indicato su ogni scheda prodotto.</p>
                </div>
              ),
            },
            {
              question: "Il veicolo ha subito incidenti?",
              answer: (
                <div>
                  <p>Forniamo una cronologia completa del veicolo, inclusi eventuali incidenti, nella misura in cui tali informazioni siano disponibili.</p>
                </div>
              ),
            },
            {
              question: "Posso ottenere una relazione di ispezione dettagliata del veicolo?",
              answer: (
                <div>
                  <p>Sì, una relazione di ispezione dettagliata è disponibile su richiesta per ogni veicolo.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Garanzia e finanziamento",
          faqs: [
            {
              question: "Qual è la durata della garanzia offerta sui veicoli?",
              answer: (
                <div>
                  <p>La durata della garanzia varia a seconda del veicolo e dell'opzione di garanzia scelta. I dettagli sono specificati nella scheda prodotto.</p>
                </div>
              ),
            },
            {
              question: "Quali sono le opzioni di finanziamento disponibili?",
              answer: (
                <div>
                  <p>Offriamo diverse opzioni di finanziamento, inclusi prestiti auto tradizionali e soluzioni di leasing con opzione di acquisto.</p>
                </div>
              ),
            },
            {
              question: "Come posso richiedere un finanziamento?",
              answer: (
                <div>
                  <p>Puoi richiedere un finanziamento direttamente online tramite il nostro sito web o contattando il nostro team di vendita.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Consegna e servizio post-vendita",
          faqs: [
            {
              question: "Quali sono i tempi di consegna?",
              answer: (
                <div>
                  <p>I tempi di consegna variano a seconda della destinazione e della disponibilità del veicolo. Ti forniremo una stima precisa al momento dell'ordine.</p>
                </div>
              ),
            },
            {
              question: "Offrite un servizio post-vendita?",
              answer: (
                <div>
                  <p>Sì, disponiamo di un servizio post-vendita completo per garantire la manutenzione e la riparazione del tuo veicolo.</p>
                </div>
              ),
            },
            {
              question: "Come posso fissare un appuntamento per la manutenzione?",
              answer: (
                <div>
                  <p>Puoi fissare un appuntamento online tramite il nostro sito web o contattando il nostro servizio clienti.</p>
                </div>
              ),
            },
          ]
        }
      ],
      PT: [
        {
          title: "Estado e características do veículo",
          faqs: [
            {
              question: "Qual é o estado do veículo e a sua quilometragem atual?",
              answer: (
                <div>
                  <p>Todos os nossos veículos são inspecionados pelos nossos especialistas. A quilometragem exata é indicada em cada ficha de produto.</p>
                </div>
              ),
            },
            {
              question: "O veículo já teve algum acidente?",
              answer: (
                <div>
                  <p>Fornecemos um histórico completo do veículo, incluindo quaisquer acidentes, na medida em que essa informação esteja disponível.</p>
                </div>
              ),
            },
            {
              question: "Posso obter um relatório de inspeção detalhado do veículo?",
              answer: (
                <div>
                  <p>Sim, um relatório de inspeção detalhado está disponível mediante pedido para cada veículo.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Garantia e financiamento",
          faqs: [
            {
              question: "Qual é a duração da garantia oferecida nos veículos?",
              answer: (
                <div>
                  <p>A duração da garantia varia dependendo do veículo e da opção de garantia escolhida. Os detalhes são especificados na ficha do produto.</p>
                </div>
              ),
            },
            {
              question: "Que opções de financiamento estão disponíveis?",
              answer: (
                <div>
                  <p>Oferecemos várias opções de financiamento, incluindo empréstimos de carro tradicionais e soluções de leasing com opção de compra.</p>
                </div>
              ),
            },
            {
              question: "Como posso solicitar financiamento?",
              answer: (
                <div>
                  <p>Pode solicitar financiamento diretamente online através do nosso site ou entrando em contato com a nossa equipa de vendas.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Entrega e serviço pós-venda",
          faqs: [
            {
              question: "Quais são os prazos de entrega?",
              answer: (
                <div>
                  <p>Os prazos de entrega variam dependendo do destino e da disponibilidade do veículo. Forneceremos uma estimativa precisa ao fazer o seu pedido.</p>
                </div>
              ),
            },
            {
              question: "Vocês oferecem serviço pós-venda?",
              answer: (
                <div>
                  <p>Sim, temos um serviço pós-venda completo para garantir a manutenção e reparação do seu veículo.</p>
                </div>
              ),
            },
            {
              question: "Como posso marcar uma consulta para manutenção?",
              answer: (
                <div>
                  <p>Pode marcar uma consulta online através do nosso site ou entrando em contato com o nosso serviço de apoio ao cliente.</p>
                </div>
              ),
            },
          ]
        }
      ],
      RO: [
        {
          title: "Starea și caracteristicile vehiculului",
          faqs: [
            {
              question: "Care este starea vehiculului și kilometrajul său actual?",
              answer: (
                <div>
                  <p>Toate vehiculele noastre sunt inspectate de experții noștri. Kilometrajul exact este indicat pe fiecare fișă de produs.</p>
                </div>
              ),
            },
            {
              question: "Vehiculul a fost implicat într-un accident?",
              answer: (
                <div>
                  <p>Oferim un istoric complet al vehiculului, inclusiv orice accidente, în măsura în care aceste informații sunt disponibile.</p>
                </div>
              ),
            },
            {
              question: "Pot obține un raport de inspecție detaliat al vehiculului?",
              answer: (
                <div>
                  <p>Da, un raport de inspecție detaliat este disponibil la cerere pentru fiecare vehicul.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Garanție și finanțare",
          faqs: [
            {
              question: "Care este durata garanției oferite pentru vehicule?",
              answer: (
                <div>
                  <p>Durata garanției variază în funcție de vehicul și de opțiunea de garanție aleasă. Detaliile sunt specificate în fișa produsului.</p>
                </div>
              ),
            },
            {
              question: "Ce opțiuni de finanțare sunt disponibile?",
              answer: (
                <div>
                  <p>Oferim mai multe opțiuni de finanțare, inclusiv împrumuturi auto tradiționale și soluții de leasing cu opțiune de cumpărare.</p>
                </div>
              ),
            },
            {
              question: "Cum pot aplica pentru finanțare?",
              answer: (
                <div>
                  <p>Puteți aplica pentru finanțare direct online prin intermediul site-ului nostru web sau contactând echipa noastră de vânzări.</p>
                </div>
              ),
            },
          ]
        },
        {
          title: "Livrare și service post-vânzare",
          faqs: [
            {
              question: "Care sunt termenele de livrare?",
              answer: (
                <div>
                  <p>Termenele de livrare variază în funcție de destinație și de disponibilitatea vehiculului. Vă vom oferi o estimare precisă atunci când plasați comanda.</p>
                </div>
              ),
            },
            {
              question: "Oferiți service post-vânzare?",
              answer: (
                <div>
                  <p>Da, avem un serviciu post-vânzare complet pentru a asigura întreținerea și repararea vehiculului dumneavoastră.</p>
                </div>
              ),
            },
            {
              question: "Cum pot face o programare pentru întreținere?",
              answer: (
                <div>
                  <p>Puteți face o programare online prin intermediul site-ului nostru web sau contactând serviciul nostru de asistență clienți.</p>
                </div>
              ),
            },
          ]
        }
      ]
    }
  };
};
