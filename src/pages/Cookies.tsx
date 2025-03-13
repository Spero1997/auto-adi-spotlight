
import LegalPageLayout from '@/components/LegalPageLayout';

const Cookies = () => {
  return (
    <LegalPageLayout title="Gestion des Cookies">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur notre site web. Les cookies permettent de stocker des informations sur votre navigation et de vous reconnaître lors de vos visites ultérieures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Types de cookies utilisés</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Cookies essentiels</h3>
          <p>
            Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils permettent notamment de mémoriser vos préférences de confidentialité et d'assurer la sécurité de votre connexion.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Cookies analytiques</h3>
          <p>
            Ces cookies nous permettent de mesurer l'audience de notre site, de comprendre comment les visiteurs l'utilisent et d'identifier les problèmes de navigation. Ils nous aident à améliorer la qualité et la pertinence de notre site.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Cookies de marketing</h3>
          <p>
            Ces cookies sont utilisés pour suivre vos activités en ligne et pour vous proposer des publicités personnalisées en fonction de vos centres d'intérêt.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comment gérer les cookies ?</h2>
        <p className="mb-4">
          Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre terminal et vous demander de les accepter ou non.
        </p>
        <p>
          Vous pouvez accepter ou refuser les cookies au cas par cas ou bien les refuser systématiquement. Nous vous rappelons que le paramétrage est susceptible de modifier vos conditions d'accès à nos services nécessitant l'utilisation de cookies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Durée de conservation des cookies</h2>
        <p>
          Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt sur votre terminal. À l'expiration de ce délai, votre consentement sera de nouveau sollicité.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Cookies;
