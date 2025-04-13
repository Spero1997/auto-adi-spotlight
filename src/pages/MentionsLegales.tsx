
import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const MentionsLegales = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page Mentions Légales
  const translations = {
    pageTitle: {
      FR: "Mentions Légales",
      EN: "Legal Notice",
      ES: "Aviso Legal",
      IT: "Note Legali",
      PT: "Avisos Legais",
      RO: "Mențiuni Legale"
    },
    companyIdentification: {
      FR: "Identification de l'entreprise",
      EN: "Company Identification",
      ES: "Identificación de la empresa",
      IT: "Identificazione dell'azienda",
      PT: "Identificação da empresa",
      RO: "Identificarea companiei"
    },
    companyName: {
      FR: "Raison sociale :",
      EN: "Company name:",
      ES: "Razón social:",
      IT: "Ragione sociale:",
      PT: "Razão social:",
      RO: "Denumire societate:"
    },
    identificationNumber: {
      FR: "Numéro d'identification :",
      EN: "Identification number:",
      ES: "Número de identificación:",
      IT: "Numero di identificazione:",
      PT: "Número de identificação:",
      RO: "Număr de identificare:"
    },
    legalForm: {
      FR: "Forme juridique :",
      EN: "Legal form:",
      ES: "Forma jurídica:",
      IT: "Forma giuridica:",
      PT: "Forma jurídica:",
      RO: "Formă juridică:"
    },
    address: {
      FR: "Adresse :",
      EN: "Address:",
      ES: "Dirección:",
      IT: "Indirizzo:",
      PT: "Endereço:",
      RO: "Adresă:"
    },
    phone: {
      FR: "Téléphone :",
      EN: "Phone:",
      ES: "Teléfono:",
      IT: "Telefono:",
      PT: "Telefone:",
      RO: "Telefon:"
    },
    email: {
      FR: "Email :",
      EN: "Email:",
      ES: "Correo electrónico:",
      IT: "Email:",
      PT: "E-mail:",
      RO: "Email:"
    },
    publicationDirector: {
      FR: "Directeur de la publication",
      EN: "Publication Director",
      ES: "Director de la publicación",
      IT: "Direttore della pubblicazione",
      PT: "Diretor de publicação",
      RO: "Director de publicație"
    },
    directorInfo: {
      FR: "Le directeur de la publication du site web est le propriétaire d'Auto Adi.",
      EN: "The publication director of the website is the owner of Auto Adi.",
      ES: "El director de la publicación del sitio web es el propietario de Auto Adi.",
      IT: "Il direttore della pubblicazione del sito web è il proprietario di Auto Adi.",
      PT: "O diretor de publicação do site é o proprietário da Auto Adi.",
      RO: "Directorul de publicație al site-ului web este proprietarul Auto Adi."
    },
    intellectualProperty: {
      FR: "Propriété intellectuelle",
      EN: "Intellectual Property",
      ES: "Propiedad intelectual",
      IT: "Proprietà intellettuale",
      PT: "Propriedade intelectual",
      RO: "Proprietate intelectuală"
    },
    copyrightInfo: {
      FR: "L'ensemble du contenu du site web (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur et reste la propriété exclusive d'Auto Adi. Toute reproduction, distribution ou utilisation sans autorisation préalable constitue une violation de la propriété intellectuelle.",
      EN: "All content on the website (texts, images, videos, logos, etc.) is protected by copyright and remains the exclusive property of Auto Adi. Any reproduction, distribution or use without prior authorization constitutes a violation of intellectual property.",
      ES: "Todo el contenido del sitio web (textos, imágenes, videos, logotipos, etc.) está protegido por derechos de autor y sigue siendo propiedad exclusiva de Auto Adi. Cualquier reproducción, distribución o uso sin autorización previa constituye una violación de la propiedad intelectual.",
      IT: "Tutti i contenuti del sito web (testi, immagini, video, loghi, ecc.) sono protetti da copyright e rimangono di proprietà esclusiva di Auto Adi. Qualsiasi riproduzione, distribuzione o utilizzo senza previa autorizzazione costituisce una violazione della proprietà intellettuale.",
      PT: "Todo o conteúdo do site (textos, imagens, vídeos, logótipos, etc.) está protegido por direitos de autor e permanece propriedade exclusiva da Auto Adi. Qualquer reprodução, distribuição ou utilização sem autorização prévia constitui uma violação da propriedade intelectual.",
      RO: "Întregul conținut al site-ului web (texte, imagini, videoclipuri, logo-uri etc.) este protejat de drepturi de autor și rămâne proprietatea exclusivă a Auto Adi. Orice reproducere, distribuire sau utilizare fără autorizație prealabilă constituie o încălcare a proprietății intelectuale."
    },
    applicableLaw: {
      FR: "Loi applicable et juridiction",
      EN: "Applicable Law and Jurisdiction",
      ES: "Ley aplicable y jurisdicción",
      IT: "Legge applicabile e giurisdizione",
      PT: "Lei aplicável e jurisdição",
      RO: "Legea aplicabilă și jurisdicția"
    },
    lawInfo: {
      FR: "Les présentes mentions légales sont soumises au droit italien. En cas de litige, les tribunaux de Florence seront compétents.",
      EN: "These legal notices are subject to Italian law. In case of dispute, the courts of Florence will have jurisdiction.",
      ES: "Estos avisos legales están sujetos a la ley italiana. En caso de disputa, los tribunales de Florencia tendrán jurisdicción.",
      IT: "Le presenti note legali sono soggette alla legge italiana. In caso di controversia, i tribunali di Firenze avranno giurisdizione.",
      PT: "Estes avisos legais estão sujeitos à lei italiana. Em caso de litígio, os tribunais de Florença terão jurisdição.",
      RO: "Aceste mențiuni legale sunt supuse legii italiene. În caz de litigiu, instanțele din Florența vor avea jurisdicție."
    }
  };

  return (
    <LegalPageLayout title={translate('pageTitle', translations.pageTitle)}>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('companyIdentification', translations.companyIdentification)}</h2>
        <p>
          <strong>{translate('companyName', translations.companyName)}</strong> Auto Adi<br />
          <strong>{translate('identificationNumber', translations.identificationNumber)}</strong> 827 514 860<br />
          <strong>{translate('legalForm', translations.legalForm)}</strong> Entreprise individuelle<br />
          <strong>{translate('address', translations.address)}</strong> Borgo Ognissanti, 142r 50123 Firenze FI Italie<br />
          <strong>{translate('phone', translations.phone)}</strong> ‪+39 376 175 3341‬<br />
          <strong>{translate('email', translations.email)}</strong> serviceautoadi@gmail.com
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('publicationDirector', translations.publicationDirector)}</h2>
        <p>
          {translate('directorInfo', translations.directorInfo)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('intellectualProperty', translations.intellectualProperty)}</h2>
        <p>
          {translate('copyrightInfo', translations.copyrightInfo)}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{translate('applicableLaw', translations.applicableLaw)}</h2>
        <p>
          {translate('lawInfo', translations.lawInfo)}
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default MentionsLegales;
