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
      FR: "Retrouvez toutes les réponses à vos questions concernant nos véhicules, nos services et nos conditions d'achat",
      EN: "Find all the answers to your questions about our vehicles, services and purchase conditions",
      ES: "Encuentre todas las respuestas a sus preguntas sobre nuestros vehículos, servicios y condiciones de compra",
      IT: "Trova tutte le risposte alle tue domande sui nostri veicoli, servizi e condizioni di acquisto",
      PT: "Encontre todas as respostas às suas perguntas sobre os nossos veículos, serviços e condições de compra",
      RO: "Găsiți toate răspunsurile la întrebările dvs. despre vehiculele noastre, serviciile și condițiile de achiziție"
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
      FR: "Chaque véhicule est minutieusement inspecté et certifié par nos experts",
      EN: "Each vehicle is thoroughly inspected and certified by our experts",
      ES: "Cada vehículo es minuciosamente inspeccionado y certificado por nuestros expertos",
      IT: "Ogni veicolo è accuratamente ispezionato e certificato dai nostri esperti",
      PT: "Cada veículo é minuciosamente inspecionado e certificado pelos nossos especialistas",
      RO: "Fiecare vehicul este inspectat și certificat minuțios de experții noștri"
    },
    extendedWarranty: {
      FR: "Garantie Étendue",
      EN: "Extended Warranty",
      ES: "Garantía Extendida",
      IT: "Garanzia Estesa",
      PT: "Garantia Estendida",
      RO: "Garanție Extinsă"
    },
    extendedWarrantyDescription: {
      FR: "Tous nos véhicules bénéficient d'une garantie de 12 à 60 mois",
      EN: "All our vehicles come with a 12 to 60 month warranty",
      ES: "Todos nuestros vehículos vienen con una garantía de 12 a 60 meses",
      IT: "Tutti i nostri veicoli sono coperti da una garanzia da 12 a 60 mesi",
      PT: "Todos os nossos veículos têm uma garantia de 12 a 60 meses",
      RO: "Toate vehiculele noastre beneficiază de o garanție de 12 până la 60 de luni"
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
      FR: "Solutions de paiement adaptées à tous les budgets",
      EN: "Payment solutions adapted to all budgets",
      ES: "Soluciones de pago adaptadas a todos los presupuestos",
      IT: "Soluzioni di pagamento adattate a tutti i budget",
      PT: "Soluções de pagamento adaptadas a todos os orçamentos",
      RO: "Soluții de plată adaptate tuturor bugetelor"
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
      FR: "Livraison partout en Europe sous 5 jours maximum",
      EN: "Delivery throughout Europe within 5 days maximum",
      ES: "Entrega en toda Europa en un máximo de 5 días",
      IT: "Consegna in tutta Europa entro un massimo di 5 giorni",
      PT: "Entrega em toda a Europa num prazo máximo de 5 dias",
      RO: "Livrare în toată Europa în maximum 5 zile"
    },
    moreQuestions: {
      FR: "Vous avez d'autres questions ?",
      EN: "Do you have more questions?",
      ES: "¿Tiene más preguntas?",
      IT: "Hai altre domande?",
      PT: "Tem mais perguntas?",
      RO: "Aveți mai multe întrebări?"
    },
    teamAvailable: {
      FR: "Notre équipe est disponible pour répondre à toutes vos interrogations",
      EN: "Our team is available to answer all your questions",
      ES: "Nuestro equipo está disponible para responder a todas sus preguntas",
      IT: "Il nostro team è disponibile per rispondere a tutte le tue domande",
      PT: "A nossa equipa está disponível para responder a todas as suas perguntas",
      RO: "Echipa noastră este disponibilă pentru a răspunde la toate întrebările dvs."
    },
    contactUs: {
      FR: "Nous contacter",
      EN: "Contact us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    },
    callDirectly: {
      FR: "Appeler directement",
      EN: "Call directly",
      ES: "Llamar directamente",
      IT: "Chiama direttamente",
      PT: "Ligar diretamente",
      RO: "Sunați direct"
    },
    faqSections: {
      FR: [
        {
          title: "État et caractéristiques du véhicule",
          faqs: [
            {
              question: "1. Quel est l'état du véhicule et son kilométrage actuel ?",
              answer: (
                <div>
                  <p>Tous nos véhicules sont inspectés par nos experts. Le kilométrage exact est indiqué sur chaque fiche produit (exemple : <em>Audi A4 2021 – 45 000 km</em>). L'état est classé comme :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Comme neuf</strong> (aucun défaut mécanique ou esthétique).</li>
                    <li><strong>Très bon état</strong> (légères marques d'usage).</li>
                    <li><strong>Bon état</strong> (petits défauts sans impact technique).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "2. Y a-t-il eu remplacement ou mise à jour de pièces ?",
              answer: "Oui, nous indiquons toutes les pièces remplacées (ex : embrayage, freins, batterie) dans le rapport d'expertise. Demandez-le pour le véhicule qui vous intéresse !",
            },
            {
              question: "3. Pourquoi vendez-vous le véhicule à ce prix ?",
              answer: (
                <div>
                  <p>Nos prix sont compétitifs car :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Occasions</strong> : Révisées et garanties (pas de mauvaises surprises).</li>
                    <li><strong>Neufs</strong> : Remises constructeur jusqu'à -15%.</li>
                    <li><strong>Paiement comptant</strong> : Réduction supplémentaire de <strong>10%</strong>.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "4. Quand et de qui avez-vous acheté le véhicule ?",
              answer: (
                <div>
                  <p>Nous sourçons nos véhicules :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Neufs</strong> : Directement des constructeurs.</li>
                    <li><strong>Occasions</strong> : Anciens locataires (LOA), reprises clients, ou flottes d'entreprise.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "5. A-t-on changé régulièrement l'huile du véhicule ? Qu'en est-il de son entretien ?",
              answer: "Tous nos véhicules ont un carnet d'entretien complet (huile, filtres, vidanges) respectant les préconisations constructeur.",
            },
            {
              question: "6. Puis-je voir le VIN, le titre de propriété du véhicule et une pièce d'identité ?",
              answer: (
                <div>
                  <p>Absolument ! Ces documents sont disponibles :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>En concession</strong> : Présentés avant l'achat.</li>
                    <li><strong>En ligne</strong> : Envoyés cryptés après signature d'un NDA (pour éviter la fraude).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "7. Autorisez-vous des essais ?",
              answer: (
                <div>
                  <p>Oui ! Réservez un essai gratuit :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>En concession</strong> : 30 min avec un conseiller.</li>
                    <li><strong>À domicile</strong> : Possible pour les véhicules {'>'}25k€ (frais selon distance).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "8. Puis-je soumettre le véhicule à une inspection indépendante ?",
              answer: (
                <div>
                  <p>Bien sûr ! Nous recommandons même :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Centres agréés</strong> : Dekra, Norauto.</li>
                    <li><strong>Coût</strong> : Offert pour les véhicules {'>'}20k€ (sinon 150€ à votre charge).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "9. Pouvons-nous régler ce problème avant l'achat ?",
              answer: "Tout défaut détecté est réparé avant livraison (ex : peinture, pièce mécanique). Sinon, nous ajustons le prix ou annulons la vente.",
            },
            {
              question: "10. Quel est votre budget ?",
              answer: "Nous avons des véhicules de 10k€ à 100k€. Dites-nous votre fourchette, nous trouverons la meilleure offre !",
            },
            {
              question: "11. Quel est le kilométrage actuel du véhicule ?",
              answer: "Indiqué sur chaque fiche. Nos occasions ont moins de 200 000 km.",
            },
            {
              question: "12. Quelle est la consommation de carburant constatée ?",
              answer: (
                <div>
                  <p>Elle correspond aux données constructeur (±5%). Exemple :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Diesel</strong> : 4,5L/100km (autoroute).</li>
                    <li><strong>Essence</strong> : 6,0L/100km (ville).</li>
                  </ul>
                </div>
              ),
            },
          ]
        },
        {
          title: "État technique et inspection",
          faqs: [
            {
              question: "13. Quel est l'état général du véhicule ?",
              answer: (
                <div>
                  <p>Évalué via notre grille <strong>AutoAdi Certified</strong> :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Mécanique</strong> : 10/10.</li>
                    <li><strong>Carrosserie</strong> : 8/10 (rayures mineures).</li>
                    <li><strong>Intérieur</strong> : 9/10 (sièges quasi neufs).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "14. Y a-t-il un contrôle technique ?",
              answer: "Oui, valide 6 mois minimum pour toutes nos occasions. Exemple : Contrôle technique du 01/01/2024 – Aucun point critique.",
            },
            {
              question: "15. S'agit-il d'un véhicule de première, seconde main ou troisième main ?",
              answer: (
                <div>
                  <p>Nous précisons toujours le nombre de propriétaires :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Première main</strong> : Modèles neufs ou ex-LOA.</li>
                    <li><strong>Seconde main</strong> : 80% de notre stock.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "16. Le prix est-il négociable ?",
              answer: (
                <div>
                  <p>Oui, surtout pour :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Paiement comptant</strong> (jusqu'à -10%).</li>
                    <li><strong>Anciens modèles</strong> (stock {'>'}6 mois).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "17. Combien de personnes ont possédé le véhicule avant vous ?",
              answer: "Entre 1 et 3 maximum. Exemple : Volvo XC60 – 1 propriétaire (dossier transparent disponible).",
            },
            {
              question: "18. Le véhicule a-t-il été utilisé en ville, sur autoroute ou pour de longs trajets ?",
              answer: (
                <div>
                  <p>Nous vérifions l'historique :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Autoroute</strong> : Usure moteur réduite (idéal).</li>
                    <li><strong>Ville</strong> : Embrayage plus sollicité.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "19. Le véhicule est-il encore sous garantie ? Si oui, quelle est la durée restante et quels sont les éléments couverts ?",
              answer: (
                <div>
                  <p>Garantie constructeur ou <strong>AutoAdi Extended</strong> :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Neufs</strong> : 2 à 5 ans (moteur, boîte, électronique).</li>
                    <li><strong>Occasions</strong> : 12 à 24 mois (selon kilométrage).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "20. Quel est l'état de la carrosserie ?",
              answer: "Inspectée avec un testeur d'épaisseur de peinture. Aucune réparation masquée !",
            },
            {
              question: "21. Les pneus sont-ils en bon état ?",
              answer: "Profondeur minimale de 3 mm (sinon remplacés). Exemple : Pneus neufs Michelin sur Tesla Model 3.",
            },
            {
              question: "22. L'intérieur de la voiture est-il bien entretenu ?",
              answer: "Oui, nettoyage pro complet avant livraison (sièges, moquette, odeur).",
            },
            {
              question: "23. Le véhicule fait-il des bruits étranges au démarrage ou en roulant ?",
              answer: "Non, tous nos véhicules passent un test acoustique. Bruit = diagnostic gratuit.",
            },
            {
              question: "24. Quels sont les papiers nécessaires pour acheter une voiture d'occasion ?",
              answer: (
                <div>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Pour vous</strong> : Pièce d'identité + justificatif de domicile.</li>
                    <li><strong>Pour la voiture</strong> : Carte grise + contrôle technique + rapport d'expertise.</li>
                  </ul>
                </div>
              ),
            },
          ]
        },
        {
          title: "Conditions d'achat",
          faqs: [
            {
              question: "25. Puis-je annuler ?",
              answer: "Oui ! 14 jours de rétractation, remboursement intégral.",
            },
            {
              question: "26. Essai obligatoire ?",
              answer: "Non, mais recommandé ! Réservez via notre page de contact.",
            },
            {
              question: "27. Extension de garantie ?",
              answer: "Oui, jusqu'à 5 ans. Demandez un devis !",
            },
          ]
        },
        {
          title: "Modalités de paiement flexibles",
          faqs: [
            {
              question: "28. Quand dois-je payer les 80% restants ?",
              answer: (
                <div>
                  <p><strong>Aucun paiement entre l'acompte et la livraison !</strong></p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Vous payez seulement <strong>20% à la commande</strong> pour réserver le véhicule</li>
                    <li>Les <strong>80% restants</strong> sont réglés :
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li><strong>À la livraison</strong> en un seul versement</li>
                        <li><strong>OU</strong> en mensualités sans intérêt (6-84 mois) après livraison</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              question: "29. Exemple concret de paiement différé",
              answer: (
                <div>
                  <p>Pour un véhicule à <strong>40 000€</strong> :</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>Aujourd'hui</strong> : 8 000€ (20%)</li>
                    <li><strong>À la livraison (dans 2 semaines)</strong> :
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>Option 1 : Paiement des <strong>32 000€</strong> restants en une fois</li>
                        <li>Option 2 : Mensualités de <strong>533€/mois sur 60 mois</strong> (0% d'intérêt)</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              question: "30. Puis-je voir le véhicule avant de payer les 80% ?",
              answer: (
                <div>
                  <p><strong>Oui, absolument ! vous pouvez venir voir la voiture en Portugal ou en Espagne</strong></p>
                  <p>Vous pouvez :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Vérifier le véhicule</strong> à la livraison</li>
                    <li><strong>Faire un essai final</strong></li>
                    <li><strong>Payer seulement si satisfait</strong> (dans les 48h suivant la livraison)</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "31. Que se passe-t-il si je refuse le véhicule à la livraison ?",
              answer: (
                <div>
                  <p>Deux options :</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>Échange</strong> : Nous trouvons un autre modèle</li>
                    <li><strong>Remboursement</strong> : Votre acompte de 20% est intégralement restitué</li>
                  </ol>
                </div>
              ),
            },
            {
              question: "32. Puis-je payer une partie à la livraison et le reste en mensualités ?",
              answer: (
                <div>
                  <p>Oui ! Par exemple :</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>À la livraison</strong> : 10 000€</li>
                    <li><strong>Reste</strong> : 22 000€ en 36 mensualités de 611€</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "33. Quel est le délai de livraison?",
              answer: "Je précise que le délai de livraison en Portugal, en France, En Espagne, en Roumanie, en Italie ne dépasse pas 5 jours.",
            },
          ]
        },
      ],
      EN: [
        {
          title: "Vehicle Condition and Features",
          faqs: [
            {
              question: "1. What is the vehicle's condition and current mileage?",
              answer: (
                <div>
                  <p>All our vehicles are inspected by our experts. The exact mileage is indicated on each product card (example: <em>Audi A4 2021 - 45,000 km</em>). The condition is classified as:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Like new</strong> (no mechanical or aesthetic defects).</li>
                    <li><strong>Very good condition</strong> (slight signs of use).</li>
                    <li><strong>Good condition</strong> (minor defects with no technical impact).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "2. Have there been any replacement or update of parts?",
              answer: "Yes, we indicate all replaced parts (e.g., clutch, brakes, battery) in the inspection report. Ask for it for the vehicle you're interested in!",
            },
            {
              question: "3. Why are you selling the vehicle at this price?",
              answer: (
                <div>
                  <p>Our prices are competitive because:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Used</strong>: Serviced and guaranteed (no unpleasant surprises).</li>
                    <li><strong>New</strong>: Manufacturer discounts up to -15%.</li>
                    <li><strong>Cash payment</strong>: Additional discount of <strong>10%</strong>.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "4. When and from whom did you buy the vehicle?",
              answer: (
                <div>
                  <p>We source our vehicles:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>New</strong>: Directly from manufacturers.</li>
                    <li><strong>Used</strong>: Former tenants (LOA), customer trade-ins, or company fleets.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "5. Has the vehicle's oil been changed regularly? What about its maintenance?",
              answer: "All our vehicles have a complete maintenance record (oil, filters, oil changes) respecting manufacturer recommendations.",
            },
            {
              question: "6. Can I see the VIN, the vehicle's title of ownership, and a piece of identification?",
              answer: (
                <div>
                  <p>Absolutely! These documents are available:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>In dealership</strong>: Presented before purchase.</li>
                    <li><strong>Online</strong>: Sent encrypted after signing an NDA (to avoid fraud).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "7. Do you allow test drives?",
              answer: (
                <div>
                  <p>Yes! Book a free test drive:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>In dealership</strong>: 30 min with an advisor.</li>
                    <li><strong>At home</strong>: Possible for vehicles {'>'}25k€ (fees depending on distance).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "8. Can I submit the vehicle to an independent inspection?",
              answer: (
                <div>
                  <p>Of course! We even recommend it:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Approved centers</strong>: Dekra, Norauto.</li>
                    <li><strong>Cost</strong>: Offered for vehicles {'>'}20k€ (otherwise 150€ at your expense).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "9. Can we fix this problem before purchase?",
              answer: "Any defect detected is repaired before delivery (e.g., paint, mechanical part). Otherwise, we adjust the price or cancel the sale.",
            },
            {
              question: "10. What is your budget?",
              answer: "We have vehicles from 10k€ to 100k€. Tell us your range, we'll find the best offer!",
            },
            {
              question: "11. What is the vehicle's current mileage?",
              answer: "Indicated on each card. Our used vehicles have less than 200,000 km.",
            },
            {
              question: "12. What is the observed fuel consumption?",
              answer: (
                <div>
                  <p>It corresponds to the manufacturer's data (±5%). Example:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Diesel</strong>: 4.5L/100km (highway).</li>
                    <li><strong>Gasoline</strong>: 6.0L/100km (city).</li>
                  </ul>
                </div>
              ),
            },
          ]
        },
        {
          title: "Technical Condition and Inspection",
          faqs: [
            {
              question: "13. What is the overall condition of the vehicle?",
              answer: (
                <div>
                  <p>Evaluated via our <strong>AutoAdi Certified</strong> grid:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Mechanics</strong>: 10/10.</li>
                    <li><strong>Bodywork</strong>: 8/10 (minor scratches).</li>
                    <li><strong>Interior</strong>: 9/10 (seats almost new).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "14. Is there a technical inspection?",
              answer: "Yes, valid for a minimum of 6 months for all our used vehicles. Example: Technical inspection of 01/01/2024 – No critical points.",
            },
            {
              question: "15. Is this a first, second, or third-hand vehicle?",
              answer: (
                <div>
                  <p>We always specify the number of owners:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>First hand</strong>: New models or ex-LOA.</li>
                    <li><strong>Second hand</strong>: 80% of our stock.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "16. Is the price negotiable?",
              answer: (
                <div>
                  <p>Yes, especially for:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Cash payment</strong> (up to -10%).</li>
                    <li><strong>Old models</strong> (stock {'>'}6 months).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "17. How many people have owned the vehicle before you?",
              answer: "Between 1 and 3 maximum. Example: Volvo XC60 – 1 owner (transparent file available).",
            },
            {
              question: "18. Has the vehicle been used in the city, on the highway, or for long journeys?",
              answer: (
                <div>
                  <p>We check the history:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Highway</strong>: Reduced engine wear (ideal).</li>
                    <li><strong>City</strong>: Clutch more stressed.</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "19. Is the vehicle still under warranty? If so, what is the remaining duration and what elements are covered?",
              answer: (
                <div>
                  <p>Manufacturer's warranty or <strong>AutoAdi Extended</strong>:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>New</strong>: 2 to 5 years (engine, gearbox, electronics).</li>
                    <li><strong>Used</strong>: 12 to 24 months (depending on mileage).</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "20. What is the condition of the bodywork?",
              answer: "Inspected with a paint thickness tester. No hidden repairs!",
            },
            {
              question: "21. Are the tires in good condition?",
              answer: "Minimum depth of 3 mm (otherwise replaced). Example: New Michelin tires on Tesla Model 3.",
            },
            {
              question: "22. Is the interior of the car well maintained?",
              answer: "Yes, complete professional cleaning before delivery (seats, carpet, odor).",
            },
            {
              question: "23. Does the vehicle make strange noises when starting or driving?",
              answer: "No, all our vehicles pass an acoustic test. Noise = free diagnosis.",
            },
            {
              question: "24. What papers are needed to buy a used car?",
              answer: (
                <div>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>For you</strong>: Identity document + proof of address.</li>
                    <li><strong>For the car</strong>: Registration certificate + technical inspection + expert report.</li>
                  </ul>
                </div>
              ),
            },
          ]
        },
        {
          title: "Purchase Conditions",
          faqs: [
            {
              question: "25. Can I cancel?",
              answer: "Yes! 14 days withdrawal, full refund.",
            },
            {
              question: "26. Mandatory test?",
              answer: "No, but recommended! Book via our contact page.",
            },
            {
              question: "27. Warranty extension?",
              answer: "Yes, up to 5 years. Ask for a quote!",
            },
          ]
        },
        {
          title: "Flexible Payment Methods",
          faqs: [
            {
              question: "28. When do I have to pay the remaining 80%?",
              answer: (
                <div>
                  <p><strong>No payment between the deposit and delivery!</strong></p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>You only pay <strong>20% upon order</strong> to reserve the vehicle</li>
                    <li>The <strong>remaining 80%</strong> is settled:
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li><strong>Upon delivery</strong> in a single payment</li>
                        <li><strong>OR</strong> in interest-free monthly installments (6-84 months) after delivery</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              question: "29. Concrete example of deferred payment",
              answer: (
                <div>
                  <p>For a vehicle at <strong>40,000€</strong>:</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>Today</strong>: 8,000€ (20%)</li>
                    <li><strong>Upon delivery (in 2 weeks)</strong>:
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>Option 1: Payment of the <strong>32,000€</strong> remaining in one go</li>
                        <li>Option 2: Monthly installments of <strong>533€/month over 60 months</strong> (0% interest)</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              question: "30. Can I see the vehicle before paying the 80%?",
              answer: (
                <div>
                  <p><strong>Yes, absolutely! you can come and see the car in Portugal or Spain</strong></p>
                  <p>You can:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Check the vehicle</strong> upon delivery</li>
                    <li><strong>Do a final test drive</strong></li>
                    <li><strong>Pay only if satisfied</strong> (within 48 hours of delivery)</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "31. What happens if I refuse the vehicle upon delivery?",
              answer: (
                <div>
                  <p>Two options:</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>Exchange</strong>: We find another model</li>
                    <li><strong>Refund</strong>: Your 20% deposit is fully refunded</li>
                  </ol>
                </div>
              ),
            },
            {
              question: "32. Can I pay part upon delivery and the rest in monthly installments?",
              answer: (
                <div>
                  <p>Yes! For example:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Upon delivery</strong>: 10,000€</li>
                    <li><strong>Remaining</strong>: 22,000€ in 36 monthly installments of 611€</li>
                  </ul>
                </div>
              ),
            },
            {
              question: "33. What is the delivery time?",
              answer: "I specify that the delivery time in Portugal, France, Spain, Romania, Italy does not exceed 5 days.",
            },
          ]
        },
      ],
      ES: [
        {
          title: "Estado y características del vehículo",
          faqs: [
            {
              question: "¿Cuál es el estado del vehículo y su kilometraje actual?",
              answer: (
                <div>
                  <p>Todos nuestros vehículos son inspeccionados por nuestros expertos. El kilometraje exacto
