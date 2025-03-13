
import LegalPageLayout from '@/components/LegalPageLayout';

const Conditions = () => {
  return (
    <LegalPageLayout title="Conditions de Vente">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Procédure d'achat</h2>
        <p className="mb-4">
          <strong>1.1 Sélection du véhicule :</strong> Le Client sélectionne le véhicule de son choix parmi ceux proposés par Auto Adi, en concession ou sur le site web.
        </p>
        <p className="mb-4">
          <strong>1.2 Devis et offre personnalisée :</strong> Auto Adi établit un devis détaillé comprenant le prix du véhicule, les options choisies, les frais annexes et les conditions de financement si applicables.
        </p>
        <p className="mb-4">
          <strong>1.3 Commande :</strong> La commande est considérée comme ferme après signature du bon de commande et versement de l'acompte de 20% du prix total.
        </p>
        <p>
          <strong>1.4 Livraison :</strong> La livraison du véhicule est effectuée après paiement intégral du prix, dans les délais convenus entre les parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Conditions financières particulières</h2>
        <p className="mb-4">
          <strong>2.1 Paiement échelonné sans frais :</strong> Auto Adi propose un système de paiement échelonné sans frais ni intérêts, sous réserve d'acceptation du dossier. Les modalités spécifiques sont détaillées dans un contrat distinct.
        </p>
        <p className="mb-4">
          <strong>2.2 Acompte :</strong> Un acompte de 20% du prix total est exigé à la commande. Cet acompte est non remboursable en cas d'annulation par le Client, sauf application du droit de rétractation légal.
        </p>
        <p>
          <strong>2.3 Modes de paiement acceptés :</strong> Virement bancaire, chèque de banque, espèces (dans les limites légales), coupons de paiement (PCS, Transcash, Neosurf, cartes Amazon).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Documents nécessaires</h2>
        <p>
          Pour finaliser l'achat d'un véhicule, le Client doit fournir les documents suivants :
        </p>
        <ul className="list-disc pl-6">
          <li>Pièce d'identité en cours de validité</li>
          <li>Justificatif de domicile de moins de 3 mois</li>
          <li>Permis de conduire valide</li>
          <li>Attestation d'assurance pour le véhicule (avant la livraison)</li>
          <li>Relevé d'identité bancaire (en cas de paiement échelonné)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Livraison transfrontalière</h2>
        <p className="mb-4">
          <strong>4.1 Délais de livraison :</strong> Pour les livraisons en dehors de l'Italie, les délais peuvent varier en fonction des formalités administratives et des contraintes logistiques. Un délai indicatif est communiqué au Client lors de la commande.
        </p>
        <p className="mb-4">
          <strong>4.2 Frais de livraison :</strong> Les frais de livraison transfrontalière sont calculés en fonction de la distance et précisés dans le devis. Ils comprennent le transport du véhicule et les formalités administratives nécessaires.
        </p>
        <p>
          <strong>4.3 Immatriculation :</strong> Auto Adi peut, sur demande, assister le Client dans les démarches d'immatriculation du véhicule dans son pays de résidence, moyennant des frais supplémentaires.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Garantie et service après-vente</h2>
        <p className="mb-4">
          <strong>5.1 Garantie transfrontalière :</strong> Les véhicules vendus par Auto Adi bénéficient d'une garantie valable dans tous les pays de l'Union Européenne, selon les conditions spécifiées dans le carnet de garantie.
        </p>
        <p>
          <strong>5.2 Assistance :</strong> En cas de panne ou de dysfonctionnement, le Client peut contacter le service client d'Auto Adi qui l'orientera vers le garage partenaire le plus proche de son lieu de résidence.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">6. Dispositions spécifiques</h2>
        <p className="mb-4">
          <strong>6.1 Réserve de propriété :</strong> Le véhicule reste la propriété d'Auto Adi jusqu'au paiement intégral de son prix.
        </p>
        <p>
          <strong>6.2 Modification des conditions :</strong> Auto Adi se réserve le droit de modifier les présentes conditions de vente à tout moment. Les conditions applicables sont celles en vigueur au jour de la commande du Client.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Conditions;
