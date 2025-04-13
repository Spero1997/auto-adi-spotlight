
import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const Cookies = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page Cookies
  const translations = {
    pageTitle: {
      FR: "Gestion des Cookies",
      EN: "Cookie Policy",
      ES: "Política de Cookies",
      IT: "Politica dei Cookie",
      PT: "Política de Cookies",
      RO: "Politica de Cookie-uri"
    },
    whatIsCookie: {
      FR: "Qu'est-ce qu'un cookie ?",
      EN: "What is a cookie?",
      ES: "¿Qué es una cookie?",
      IT: "Che cos'è un cookie?",
      PT: "O que é um cookie?",
      RO: "Ce este un cookie?"
    },
    cookieDefinition: {
      FR: "Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur notre site web. Les cookies permettent de stocker des informations sur votre navigation et de vous reconnaître lors de vos visites ultérieures.",
      EN: "A cookie is a small text file stored on your device (computer, tablet, smartphone) when you visit our website. Cookies allow us to store information about your navigation and recognize you during your subsequent visits.",
      ES: "Una cookie es un pequeño archivo de texto almacenado en su dispositivo (ordenador, tableta, smartphone) cuando visita nuestro sitio web. Las cookies nos permiten almacenar información sobre su navegación y reconocerle durante sus visitas posteriores.",
      IT: "Un cookie è un piccolo file di testo memorizzato sul tuo dispositivo (computer, tablet, smartphone) quando visiti il nostro sito web. I cookie ci permettono di memorizzare informazioni sulla tua navigazione e di riconoscerti durante le tue visite successive.",
      PT: "Um cookie é um pequeno arquivo de texto armazenado no seu dispositivo (computador, tablet, smartphone) quando visita o nosso site. Os cookies permitem-nos armazenar informações sobre a sua navegação e reconhecê-lo durante as suas visitas subsequentes.",
      RO: "Un cookie este un mic fișier text stocat pe dispozitivul dvs. (computer, tabletă, smartphone) atunci când vizitați site-ul nostru web. Cookie-urile ne permit să stocăm informații despre navigarea dvs. și să vă recunoaștem în timpul vizitelor ulterioare."
    },
    typesOfCookies: {
      FR: "Types de cookies utilisés",
      EN: "Types of cookies used",
      ES: "Tipos de cookies utilizadas",
      IT: "Tipi di cookie utilizzati",
      PT: "Tipos de cookies utilizados",
      RO: "Tipuri de cookie-uri utilizate"
    },
    essentialCookies: {
      FR: "Cookies essentiels",
      EN: "Essential cookies",
      ES: "Cookies esenciales",
      IT: "Cookie essenziali",
      PT: "Cookies essenciais",
      RO: "Cookie-uri esențiale"
    },
    essentialCookiesDesc: {
      FR: "Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils permettent notamment de mémoriser vos préférences de confidentialité et d'assurer la sécurité de votre connexion.",
      EN: "These cookies are necessary for the operation of the site and cannot be disabled. They allow, in particular, to remember your privacy preferences and ensure the security of your connection.",
      ES: "Estas cookies son necesarias para el funcionamiento del sitio y no pueden desactivarse. Permiten, en particular, recordar sus preferencias de privacidad y garantizar la seguridad de su conexión.",
      IT: "Questi cookie sono necessari per il funzionamento del sito e non possono essere disabilitati. Consentono, in particolare, di ricordare le tue preferenze sulla privacy e garantire la sicurezza della tua connessione.",
      PT: "Estes cookies são necessários para o funcionamento do site e não podem ser desativados. Permitem, em particular, recordar as suas preferências de privacidade e garantir a segurança da sua ligação.",
      RO: "Aceste cookie-uri sunt necesare pentru funcționarea site-ului și nu pot fi dezactivate. Ele permit, în special, să vă amintiți preferințele de confidențialitate și să asigure securitatea conexiunii dvs."
    },
    analyticalCookies: {
      FR: "Cookies analytiques",
      EN: "Analytical cookies",
      ES: "Cookies analíticas",
      IT: "Cookie analitici",
      PT: "Cookies analíticos",
      RO: "Cookie-uri analitice"
    },
    analyticalCookiesDesc: {
      FR: "Ces cookies nous permettent de mesurer l'audience de notre site, de comprendre comment les visiteurs l'utilisent et d'identifier les problèmes de navigation. Ils nous aident à améliorer la qualité et la pertinence de notre site.",
      EN: "These cookies allow us to measure the audience of our site, understand how visitors use it, and identify navigation issues. They help us improve the quality and relevance of our site.",
      ES: "Estas cookies nos permiten medir la audiencia de nuestro sitio, comprender cómo los visitantes lo utilizan e identificar problemas de navegación. Nos ayudan a mejorar la calidad y relevancia de nuestro sitio.",
      IT: "Questi cookie ci permettono di misurare l'audience del nostro sito, capire come i visitatori lo utilizzano e identificare i problemi di navigazione. Ci aiutano a migliorare la qualità e la pertinenza del nostro sito.",
      PT: "Estes cookies permitem-nos medir a audiência do nosso site, compreender como os visitantes o utilizam e identificar problemas de navegação. Ajudam-nos a melhorar a qualidade e relevância do nosso site.",
      RO: "Aceste cookie-uri ne permit să măsurăm audiența site-ului nostru, să înțelegem modul în care vizitatorii îl utilizează și să identificăm problemele de navigare. Ele ne ajută să îmbunătățim calitatea și relevanța site-ului nostru."
    },
    marketingCookies: {
      FR: "Cookies de marketing",
      EN: "Marketing cookies",
      ES: "Cookies de marketing",
      IT: "Cookie di marketing",
      PT: "Cookies de marketing",
      RO: "Cookie-uri de marketing"
    },
    marketingCookiesDesc: {
      FR: "Ces cookies sont utilisés pour suivre vos activités en ligne et pour vous proposer des publicités personnalisées en fonction de vos centres d'intérêt.",
      EN: "These cookies are used to track your online activities and to offer you personalized advertisements based on your interests.",
      ES: "Estas cookies se utilizan para seguir sus actividades en línea y ofrecerle anuncios personalizados según sus intereses.",
      IT: "Questi cookie vengono utilizzati per tracciare le tue attività online e per offrirti pubblicità personalizzate in base ai tuoi interessi.",
      PT: "Estes cookies são utilizados para acompanhar as suas atividades online e oferecer-lhe anúncios personalizados com base nos seus interesses.",
      RO: "Aceste cookie-uri sunt utilizate pentru a vă urmări activitățile online și pentru a vă oferi reclame personalizate în funcție de interesele dvs."
    },
    manageCookies: {
      FR: "Comment gérer les cookies ?",
      EN: "How to manage cookies?",
      ES: "¿Cómo gestionar las cookies?",
      IT: "Come gestire i cookie?",
      PT: "Como gerir os cookies?",
      RO: "Cum să gestionați cookie-urile?"
    },
    manageCookiesText1: {
      FR: "Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre terminal et vous demander de les accepter ou non.",
      EN: "You can choose to disable these cookies at any time. Your browser can also be set to notify you of cookies that are stored on your device and ask you whether to accept them or not.",
      ES: "Puede elegir desactivar estas cookies en cualquier momento. Su navegador también se puede configurar para notificarle las cookies que se almacenan en su dispositivo y preguntarle si desea aceptarlas o no.",
      IT: "Puoi scegliere di disabilitare questi cookie in qualsiasi momento. Il tuo browser può anche essere impostato per notificarti i cookie che vengono memorizzati sul tuo dispositivo e chiederti se accettarli o meno.",
      PT: "Pode optar por desativar estes cookies a qualquer momento. O seu navegador também pode ser configurado para notificá-lo sobre os cookies que são armazenados no seu dispositivo e perguntar-lhe se os aceita ou não.",
      RO: "Puteți alege să dezactivați aceste cookie-uri în orice moment. Browserul dvs. poate fi, de asemenea, setat pentru a vă notifica despre cookie-urile care sunt stocate pe dispozitivul dvs. și pentru a vă întreba dacă să le acceptați sau nu."
    },
    manageCookiesText2: {
      FR: "Vous pouvez accepter ou refuser les cookies au cas par cas ou bien les refuser systématiquement. Nous vous rappelons que le paramétrage est susceptible de modifier vos conditions d'accès à nos services nécessitant l'utilisation de cookies.",
      EN: "You can accept or reject cookies on a case-by-case basis or reject them systematically. We remind you that the settings may change your conditions of access to our services requiring the use of cookies.",
      ES: "Puede aceptar o rechazar las cookies caso por caso o rechazarlas sistemáticamente. Le recordamos que la configuración puede cambiar sus condiciones de acceso a nuestros servicios que requieren el uso de cookies.",
      IT: "Puoi accettare o rifiutare i cookie caso per caso o rifiutarli sistematicamente. Ti ricordiamo che le impostazioni possono modificare le tue condizioni di accesso ai nostri servizi che richiedono l'uso di cookie.",
      PT: "Pode aceitar ou rejeitar cookies caso a caso ou rejeitá-los sistematicamente. Lembramos que as configurações podem alterar suas condições de acesso aos nossos serviços que requerem o uso de cookies.",
      RO: "Puteți accepta sau respinge cookie-urile de la caz la caz sau le puteți respinge în mod sistematic. Vă reamintim că setările pot modifica condițiile dvs. de acces la serviciile noastre care necesită utilizarea cookie-urilor."
    },
    cookiesDuration: {
      FR: "Durée de conservation des cookies",
      EN: "Cookie retention period",
      ES: "Período de retención de cookies",
      IT: "Periodo di conservazione dei cookie",
      PT: "Período de retenção de cookies",
      RO: "Perioada de păstrare a cookie-urilor"
    },
    cookiesDurationText: {
      FR: "Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt sur votre terminal. À l'expiration de ce délai, votre consentement sera de nouveau sollicité.",
      EN: "Cookies are kept for a maximum period of 13 months from their deposit on your device. At the expiration of this period, your consent will be requested again.",
      ES: "Las cookies se conservan durante un período máximo de 13 meses desde su depósito en su dispositivo. Al vencimiento de este período, se solicitará nuevamente su consentimiento.",
      IT: "I cookie vengono conservati per un periodo massimo di 13 mesi dal loro deposito sul tuo dispositivo. Alla scadenza di questo periodo, il tuo consenso sarà nuovamente richiesto.",
      PT: "Os cookies são mantidos por um período máximo de 13 meses a partir do seu depósito no seu dispositivo. No final deste período, o seu consentimento será solicitado novamente.",
      RO: "Cookie-urile sunt păstrate pentru o perioadă maximă de 13 luni de la depunerea lor pe dispozitivul dvs. La expirarea acestei perioade, consimțământul dvs. va fi solicitat din nou."
    }
  };

  return (
    <LegalPageLayout title={translate('pageTitle', translations.pageTitle)}>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('whatIsCookie', translations.whatIsCookie)}</h2>
        <p>
          {translate('cookieDefinition', translations.cookieDefinition)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('typesOfCookies', translations.typesOfCookies)}</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">{translate('essentialCookies', translations.essentialCookies)}</h3>
          <p>
            {translate('essentialCookiesDesc', translations.essentialCookiesDesc)}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">{translate('analyticalCookies', translations.analyticalCookies)}</h3>
          <p>
            {translate('analyticalCookiesDesc', translations.analyticalCookiesDesc)}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">{translate('marketingCookies', translations.marketingCookies)}</h3>
          <p>
            {translate('marketingCookiesDesc', translations.marketingCookiesDesc)}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('manageCookies', translations.manageCookies)}</h2>
        <p className="mb-4">
          {translate('manageCookiesText1', translations.manageCookiesText1)}
        </p>
        <p>
          {translate('manageCookiesText2', translations.manageCookiesText2)}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{translate('cookiesDuration', translations.cookiesDuration)}</h2>
        <p>
          {translate('cookiesDurationText', translations.cookiesDurationText)}
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Cookies;
