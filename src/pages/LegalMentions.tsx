
import LegalPageLayout from '@/components/LegalPageLayout';

const MentionsLegales = () => {
  return (
    <LegalPageLayout title="Mentions Légales">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Identification de l'entreprise</h2>
        <p>
          <strong>Raison sociale :</strong> Auto Adi<br />
          <strong>Numéro d'identification :</strong> 827 514 860<br />
          <strong>Forme juridique :</strong> Entreprise individuelle<br />
          <strong>Adresse :</strong> Borgo Ognissanti, 142r 50123 Firenze FI Italie<br />
          <strong>Téléphone :</strong> ‪+39 376 175 3341‬<br />
          <strong>Email :</strong> serviceautoadi@gmail.com
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Directeur de la publication</h2>
        <p>
          Le directeur de la publication du site web est le propriétaire d'Auto Adi.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site web (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur et reste la propriété exclusive d'Auto Adi. Toute reproduction, distribution ou utilisation sans autorisation préalable constitue une violation de la propriété intellectuelle.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Loi applicable et juridiction</h2>
        <p>
          Les présentes mentions légales sont soumises au droit italien. En cas de litige, les tribunaux de Florence seront compétents.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default MentionsLegales;
