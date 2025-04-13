
import LegalPageLayout from '@/components/LegalPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const PolitiqueConfidentialite = () => {
  const { translate } = useLanguage();
  
  // Traductions pour la page Politique de Confidentialité
  const translations = {
    pageTitle: {
      FR: "Politique de Confidentialité",
      EN: "Privacy Policy",
      ES: "Política de Privacidad",
      IT: "Politica sulla Privacy",
      PT: "Política de Privacidade",
      RO: "Politica de Confidențialitate"
    },
    dataCollection: {
      FR: "Collecte et utilisation des données personnelles",
      EN: "Collection and use of personal data",
      ES: "Recopilación y uso de datos personales",
      IT: "Raccolta e utilizzo dei dati personali",
      PT: "Coleta e uso de dados pessoais",
      RO: "Colectarea și utilizarea datelor personale"
    },
    dataCollectionText: {
      FR: "Auto Adi collecte des données personnelles lorsque vous utilisez notre site web ou nos services. Ces données peuvent inclure :",
      EN: "Auto Adi collects personal data when you use our website or services. This data may include:",
      ES: "Auto Adi recopila datos personales cuando utiliza nuestro sitio web o servicios. Estos datos pueden incluir:",
      IT: "Auto Adi raccoglie dati personali quando utilizzi il nostro sito web o i nostri servizi. Questi dati possono includere:",
      PT: "A Auto Adi recolhe dados pessoais quando utiliza o nosso website ou serviços. Estes dados podem incluir:",
      RO: "Auto Adi colectează date personale atunci când utilizați site-ul nostru web sau serviciile noastre. Aceste date pot include:"
    },
    identificationInfo: {
      FR: "Informations d'identification (nom, prénom, adresse, numéro de téléphone, email)",
      EN: "Identification information (last name, first name, address, phone number, email)",
      ES: "Información de identificación (apellido, nombre, dirección, número de teléfono, correo electrónico)",
      IT: "Informazioni di identificazione (cognome, nome, indirizzo, numero di telefono, email)",
      PT: "Informações de identificação (sobrenome, nome, endereço, número de telefone, e-mail)",
      RO: "Informații de identificare (nume, prenume, adresă, număr de telefon, email)"
    },
    vehicleInfo: {
      FR: "Informations relatives aux véhicules (marque, modèle, année, kilométrage)",
      EN: "Vehicle information (make, model, year, mileage)",
      ES: "Información del vehículo (marca, modelo, año, kilometraje)",
      IT: "Informazioni sul veicolo (marca, modello, anno, chilometraggio)",
      PT: "Informações do veículo (marca, modelo, ano, quilometragem)",
      RO: "Informații despre vehicul (marcă, model, an, kilometraj)"
    },
    paymentInfo: {
      FR: "Informations de paiement (coordonnées bancaires, historique des transactions)",
      EN: "Payment information (bank details, transaction history)",
      ES: "Información de pago (datos bancarios, historial de transacciones)",
      IT: "Informazioni di pagamento (coordinate bancarie, cronologia delle transazioni)",
      PT: "Informações de pagamento (dados bancários, histórico de transações)",
      RO: "Informații de plată (detalii bancare, istoricul tranzacțiilor)"
    },
    navigationData: {
      FR: "Données de navigation (adresse IP, cookies, pages visitées)",
      EN: "Navigation data (IP address, cookies, pages visited)",
      ES: "Datos de navegación (dirección IP, cookies, páginas visitadas)",
      IT: "Dati di navigazione (indirizzo IP, cookie, pagine visitate)",
      PT: "Dados de navegação (endereço IP, cookies, páginas visitadas)",
      RO: "Date de navigare (adresă IP, cookie-uri, pagini vizitate)"
    },
    usageInfo: {
      FR: "Ces données sont utilisées pour traiter vos demandes, améliorer nos services, et vous proposer des offres personnalisées.",
      EN: "This data is used to process your requests, improve our services, and offer you personalized offers.",
      ES: "Estos datos se utilizan para procesar sus solicitudes, mejorar nuestros servicios y ofrecerle ofertas personalizadas.",
      IT: "Questi dati vengono utilizzati per elaborare le tue richieste, migliorare i nostri servizi e offrirti offerte personalizzate.",
      PT: "Estes dados são utilizados para processar os seus pedidos, melhorar os nossos serviços e oferecer-lhe ofertas personalizadas.",
      RO: "Aceste date sunt utilizate pentru a vă procesa cererile, a ne îmbunătăți serviciile și a vă oferi oferte personalizate."
    },
    legalBasis: {
      FR: "Base légale du traitement",
      EN: "Legal basis for processing",
      ES: "Base jurídica del tratamiento",
      IT: "Base giuridica del trattamento",
      PT: "Base legal para o processamento",
      RO: "Baza legală pentru prelucrare"
    },
    legalBasisText: {
      FR: "Le traitement de vos données personnelles est fondé sur les bases légales suivantes :",
      EN: "The processing of your personal data is based on the following legal bases:",
      ES: "El tratamiento de sus datos personales se basa en las siguientes bases legales:",
      IT: "Il trattamento dei tuoi dati personali si basa sulle seguenti basi giuridiche:",
      PT: "O processamento dos seus dados pessoais baseia-se nas seguintes bases legais:",
      RO: "Prelucrarea datelor dvs. personale se bazează pe următoarele temeiuri juridice:"
    },
    contractExecution: {
      FR: "L'exécution d'un contrat lorsque vous achetez un véhicule ou utilisez nos services",
      EN: "The execution of a contract when you purchase a vehicle or use our services",
      ES: "La ejecución de un contrato cuando compra un vehículo o utiliza nuestros servicios",
      IT: "L'esecuzione di un contratto quando acquisti un veicolo o utilizzi i nostri servizi",
      PT: "A execução de um contrato quando compra um veículo ou utiliza os nossos serviços",
      RO: "Executarea unui contract când cumpărați un vehicul sau utilizați serviciile noastre"
    },
    consentCommunications: {
      FR: "Votre consentement pour l'envoi de communications commerciales",
      EN: "Your consent for sending commercial communications",
      ES: "Su consentimiento para el envío de comunicaciones comerciales",
      IT: "Il tuo consenso per l'invio di comunicazioni commerciali",
      PT: "O seu consentimento para o envio de comunicações comerciais",
      RO: "Consimțământul dvs. pentru trimiterea de comunicări comerciale"
    },
    legitimateInterest: {
      FR: "Notre intérêt légitime à améliorer nos services et à prévenir la fraude",
      EN: "Our legitimate interest in improving our services and preventing fraud",
      ES: "Nuestro interés legítimo en mejorar nuestros servicios y prevenir el fraude",
      IT: "Il nostro legittimo interesse a migliorare i nostri servizi e prevenire le frodi",
      PT: "O nosso interesse legítimo em melhorar os nossos serviços e prevenir fraudes",
      RO: "Interesul nostru legitim de a ne îmbunătăți serviciile și de a preveni frauda"
    },
    legalObligations: {
      FR: "Le respect de nos obligations légales en matière de comptabilité et de fiscalité",
      EN: "Compliance with our legal obligations regarding accounting and taxation",
      ES: "El cumplimiento de nuestras obligaciones legales en materia de contabilidad y fiscalidad",
      IT: "Il rispetto dei nostri obblighi legali in materia di contabilità e fiscalità",
      PT: "O cumprimento das nossas obrigações legais em matéria de contabilidade e fiscalidade",
      RO: "Respectarea obligațiilor noastre legale în materie de contabilitate și fiscalitate"
    },
    dataRetention: {
      FR: "Conservation des données",
      EN: "Data retention",
      ES: "Conservación de datos",
      IT: "Conservazione dei dati",
      PT: "Retenção de dados",
      RO: "Păstrarea datelor"
    },
    dataRetentionText: {
      FR: "Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, en conformité avec les lois et réglementations applicables.",
      EN: "Your personal data is retained for the time necessary to fulfill the purposes for which it was collected, in compliance with applicable laws and regulations.",
      ES: "Sus datos personales se conservan durante el tiempo necesario para cumplir los fines para los que fueron recogidos, de conformidad con las leyes y reglamentos aplicables.",
      IT: "I tuoi dati personali vengono conservati per il tempo necessario al raggiungimento delle finalità per cui sono stati raccolti, in conformità con le leggi e i regolamenti applicabili.",
      PT: "Os seus dados pessoais são conservados durante o tempo necessário para cumprir as finalidades para as quais foram recolhidos, em conformidade com as leis e regulamentos aplicáveis.",
      RO: "Datele dvs. personale sunt păstrate pe perioada necesară îndeplinirii scopurilor pentru care au fost colectate, în conformitate cu legile și reglementările aplicabile."
    },
    rights: {
      FR: "Droits des personnes concernées",
      EN: "Rights of data subjects",
      ES: "Derechos de los interesados",
      IT: "Diritti degli interessati",
      PT: "Direitos dos titulares dos dados",
      RO: "Drepturile persoanelor vizate"
    },
    rightsText: {
      FR: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :",
      EN: "In accordance with the General Data Protection Regulation (GDPR), you have the following rights:",
      ES: "De conformidad con el Reglamento General de Protección de Datos (RGPD), tiene los siguientes derechos:",
      IT: "In conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR), hai i seguenti diritti:",
      PT: "De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD), tem os seguintes direitos:",
      RO: "În conformitate cu Regulamentul General privind Protecția Datelor (GDPR), aveți următoarele drepturi:"
    },
    rightAccess: {
      FR: "Droit d'accès à vos données personnelles",
      EN: "Right of access to your personal data",
      ES: "Derecho de acceso a sus datos personales",
      IT: "Diritto di accesso ai tuoi dati personali",
      PT: "Direito de acesso aos seus dados pessoais",
      RO: "Dreptul de acces la datele dvs. personale"
    },
    rightRectification: {
      FR: "Droit de rectification des données inexactes",
      EN: "Right to rectify inaccurate data",
      ES: "Derecho a rectificar datos inexactos",
      IT: "Diritto di rettifica dei dati inesatti",
      PT: "Direito de retificação de dados inexatos",
      RO: "Dreptul de rectificare a datelor inexacte"
    },
    rightErasure: {
      FR: "Droit à l'effacement des données (droit à l'oubli)",
      EN: "Right to erasure of data (right to be forgotten)",
      ES: "Derecho a la supresión de datos (derecho al olvido)",
      IT: "Diritto alla cancellazione dei dati (diritto all'oblio)",
      PT: "Direito ao apagamento dos dados (direito ao esquecimento)",
      RO: "Dreptul la ștergerea datelor (dreptul de a fi uitat)"
    },
    rightRestriction: {
      FR: "Droit à la limitation du traitement",
      EN: "Right to restriction of processing",
      ES: "Derecho a la limitación del tratamiento",
      IT: "Diritto alla limitazione del trattamento",
      PT: "Direito à limitação do tratamento",
      RO: "Dreptul la restricționarea prelucrării"
    },
    rightObjection: {
      FR: "Droit d'opposition au traitement",
      EN: "Right to object to processing",
      ES: "Derecho de oposición al tratamiento",
      IT: "Diritto di opposizione al trattamento",
      PT: "Direito de oposição ao tratamento",
      RO: "Dreptul de a se opune prelucrării"
    },
    rightPortability: {
      FR: "Droit à la portabilité des données",
      EN: "Right to data portability",
      ES: "Derecho a la portabilidad de los datos",
      IT: "Diritto alla portabilità dei dati",
      PT: "Direito à portabilidade dos dados",
      RO: "Dreptul la portabilitatea datelor"
    },
    contact: {
      FR: "Contact",
      EN: "Contact",
      ES: "Contacto",
      IT: "Contatto",
      PT: "Contato",
      RO: "Contact"
    },
    contactText: {
      FR: "Pour exercer vos droits ou pour toute question relative à la protection de vos données, vous pouvez nous contacter à l'adresse email suivante : serviceautoadi@gmail.com",
      EN: "To exercise your rights or for any questions regarding the protection of your data, you can contact us at the following email address: serviceautoadi@gmail.com",
      ES: "Para ejercer sus derechos o para cualquier pregunta relacionada con la protección de sus datos, puede contactarnos en la siguiente dirección de correo electrónico: serviceautoadi@gmail.com",
      IT: "Per esercitare i tuoi diritti o per qualsiasi domanda relativa alla protezione dei tuoi dati, puoi contattarci al seguente indirizzo email: serviceautoadi@gmail.com",
      PT: "Para exercer os seus direitos ou para qualquer questão relacionada com a proteção dos seus dados, pode contactar-nos no seguinte endereço de e-mail: serviceautoadi@gmail.com",
      RO: "Pentru a vă exercita drepturile sau pentru orice întrebare legată de protecția datelor dvs., ne puteți contacta la următoarea adresă de email: serviceautoadi@gmail.com"
    }
  };

  return (
    <LegalPageLayout title={translate('pageTitle', translations.pageTitle)}>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('dataCollection', translations.dataCollection)}</h2>
        <p className="mb-4">
          {translate('dataCollectionText', translations.dataCollectionText)}
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>{translate('identificationInfo', translations.identificationInfo)}</li>
          <li>{translate('vehicleInfo', translations.vehicleInfo)}</li>
          <li>{translate('paymentInfo', translations.paymentInfo)}</li>
          <li>{translate('navigationData', translations.navigationData)}</li>
        </ul>
        <p>
          {translate('usageInfo', translations.usageInfo)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('legalBasis', translations.legalBasis)}</h2>
        <p>
          {translate('legalBasisText', translations.legalBasisText)}
        </p>
        <ul className="list-disc pl-6">
          <li>{translate('contractExecution', translations.contractExecution)}</li>
          <li>{translate('consentCommunications', translations.consentCommunications)}</li>
          <li>{translate('legitimateInterest', translations.legitimateInterest)}</li>
          <li>{translate('legalObligations', translations.legalObligations)}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('dataRetention', translations.dataRetention)}</h2>
        <p>
          {translate('dataRetentionText', translations.dataRetentionText)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{translate('rights', translations.rights)}</h2>
        <p className="mb-4">
          {translate('rightsText', translations.rightsText)}
        </p>
        <ul className="list-disc pl-6">
          <li>{translate('rightAccess', translations.rightAccess)}</li>
          <li>{translate('rightRectification', translations.rightRectification)}</li>
          <li>{translate('rightErasure', translations.rightErasure)}</li>
          <li>{translate('rightRestriction', translations.rightRestriction)}</li>
          <li>{translate('rightObjection', translations.rightObjection)}</li>
          <li>{translate('rightPortability', translations.rightPortability)}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{translate('contact', translations.contact)}</h2>
        <p>
          {translate('contactText', translations.contactText)}
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PolitiqueConfidentialite;
