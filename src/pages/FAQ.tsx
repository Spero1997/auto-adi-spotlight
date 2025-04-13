
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQAccordion, { FAQSection } from '@/components/faq/FAQAccordion';
import { HelpCircle, Truck, CreditCard, ShieldCheck, Car } from "lucide-react";

const FAQ = () => {
  const faqSections: FAQSection[] = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Retrouvez toutes les réponses à vos questions concernant nos véhicules, nos services et nos conditions d'achat
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <Car className="h-12 w-12 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Véhicules Certifiés</h3>
                  <p className="text-gray-600">Chaque véhicule est minutieusement inspecté et certifié par nos experts</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                  <ShieldCheck className="h-12 w-12 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Garantie Étendue</h3>
                  <p className="text-gray-600">Tous nos véhicules bénéficient d'une garantie de 12 à 60 mois</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg">
                  <CreditCard className="h-12 w-12 text-purple-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Financement Flexible</h3>
                  <p className="text-gray-600">Solutions de paiement adaptées à tous les budgets</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                  <Truck className="h-12 w-12 text-amber-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Livraison Rapide</h3>
                  <p className="text-gray-600">Livraison partout en Europe sous 5 jours maximum</p>
                </div>
              </div>
            </div>
            
            <FAQAccordion sections={faqSections} />
            
            <div className="bg-blue-50 rounded-xl p-8 mt-12 text-center">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Vous avez d'autres questions ?</h3>
              <p className="text-lg mb-6">Notre équipe est disponible pour répondre à toutes vos interrogations</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Nous contacter
                </a>
                <a href="tel:+33123456789" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Appeler directement
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;

