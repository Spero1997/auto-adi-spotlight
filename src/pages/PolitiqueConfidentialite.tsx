
import LegalPageLayout from '@/components/LegalPageLayout';

const PolitiqueConfidentialite = () => {
  return (
    <LegalPageLayout title="Politique de Confidentialité">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Collecte et utilisation des données personnelles</h2>
        <p className="mb-4">
          Auto Adi collecte des données personnelles lorsque vous utilisez notre site web ou nos services. Ces données peuvent inclure :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Informations d'identification (nom, prénom, adresse, numéro de téléphone, email)</li>
          <li>Informations relatives aux véhicules (marque, modèle, année, kilométrage)</li>
          <li>Informations de paiement (coordonnées bancaires, historique des transactions)</li>
          <li>Données de navigation (adresse IP, cookies, pages visitées)</li>
        </ul>
        <p>
          Ces données sont utilisées pour traiter vos demandes, améliorer nos services, et vous proposer des offres personnalisées.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Base légale du traitement</h2>
        <p>
          Le traitement de vos données personnelles est fondé sur les bases légales suivantes :
        </p>
        <ul className="list-disc pl-6">
          <li>L'exécution d'un contrat lorsque vous achetez un véhicule ou utilisez nos services</li>
          <li>Votre consentement pour l'envoi de communications commerciales</li>
          <li>Notre intérêt légitime à améliorer nos services et à prévenir la fraude</li>
          <li>Le respect de nos obligations légales en matière de comptabilité et de fiscalité</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Conservation des données</h2>
        <p>
          Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, en conformité avec les lois et réglementations applicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Droits des personnes concernées</h2>
        <p className="mb-4">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6">
          <li>Droit d'accès à vos données personnelles</li>
          <li>Droit de rectification des données inexactes</li>
          <li>Droit à l'effacement des données (droit à l'oubli)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d'opposition au traitement</li>
          <li>Droit à la portabilité des données</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p>
          Pour exercer vos droits ou pour toute question relative à la protection de vos données, vous pouvez nous contacter à l'adresse email suivante : serviceautoadi@gmail.com
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PolitiqueConfidentialite;
