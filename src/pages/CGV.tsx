
import LegalPageLayout from '@/components/LegalPageLayout';

const CGV = () => {
  return (
    <LegalPageLayout title="Conditions Générales de Vente">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Préambule</h2>
        <p>
          Les présentes conditions générales de vente régissent les relations contractuelles entre Auto Adi, ci-après dénommée "le Vendeur", et toute personne physique ou morale procédant à l'achat d'un véhicule ou d'un service, ci-après dénommée "le Client". Tout achat implique l'acceptation sans réserve par le Client des présentes conditions générales de vente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Article 1 - Commande et formation du contrat</h2>
        <p className="mb-4">
          Le contrat de vente est formé lorsque le Client accepte l'offre du Vendeur en versant un acompte de 20% du prix total du véhicule et en signant le bon de commande.
        </p>
        <p>
          Le bon de commande précise les caractéristiques essentielles du véhicule, son prix total, les modalités de paiement, les délais de livraison et les garanties applicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Article 2 - Prix et modalités de paiement</h2>
        <p className="mb-4">
          Les prix des véhicules sont indiqués en euros, toutes taxes comprises. Le prix comprend le coût du véhicule et des options choisies par le Client. Les frais de livraison, d'immatriculation et de mise à la route sont facturés en supplément, sauf mention contraire.
        </p>
        <p className="mb-4">
          Le paiement s'effectue selon les modalités suivantes :
        </p>
        <ul className="list-disc pl-6">
          <li>Versement d'un acompte de 20% du prix total à la commande</li>
          <li>Paiement du solde avant la livraison du véhicule</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Article 3 - Livraison</h2>
        <p className="mb-4">
          La livraison du véhicule est effectuée dans les locaux du Vendeur ou à l'adresse indiquée par le Client dans le bon de commande, sous réserve du paiement intégral du prix.
        </p>
        <p>
          Le délai de livraison est indiqué sur le bon de commande. Ce délai est donné à titre indicatif et n'est pas un délai de rigueur. Le Vendeur ne pourra être tenu responsable des retards de livraison dus à des causes indépendantes de sa volonté.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Article 4 - Garanties</h2>
        <p className="mb-4">
          Les véhicules neufs bénéficient de la garantie constructeur dont les conditions sont précisées dans le carnet de garantie remis avec le véhicule.
        </p>
        <p className="mb-4">
          Les véhicules d'occasion bénéficient de la garantie légale de conformité (2 ans) et de la garantie légale contre les vices cachés. Une garantie commerciale supplémentaire peut être proposée par le Vendeur, dont les modalités sont précisées dans un document distinct.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Article 5 - Droit de rétractation</h2>
        <p>
          Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours à compter de la livraison du véhicule pour exercer son droit de rétractation, sans avoir à motiver sa décision. Pour exercer ce droit, le Client doit notifier sa décision par écrit au Vendeur. Les frais de retour du véhicule sont à la charge du Client.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Article 6 - Litiges</h2>
        <p>
          En cas de litige, le Client s'adressera en priorité au Vendeur pour trouver une solution amiable. À défaut d'accord, les tribunaux de Florence seront seuls compétents.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CGV;
