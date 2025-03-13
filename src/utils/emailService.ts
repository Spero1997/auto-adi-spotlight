
/**
 * Email Service Utility
 * 
 * This utility handles sending emails with attachments from various parts of the application.
 * It supports different types of emails: contact forms, order confirmations, payment proofs, etc.
 */

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: File[];
  replyTo?: string;
}

/**
 * Sends an email with optional attachments
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  console.log("Sending email:", data);
  
  // In a real application, this would use a backend API
  // For demonstration, we're simulating a successful API call
  
  // Prepare form data for the backend
  const formData = new FormData();
  
  // Add all basic email data
  formData.append('to', data.to);
  formData.append('subject', data.subject);
  formData.append('text', data.text);
  
  if (data.html) {
    formData.append('html', data.html);
  }
  
  if (data.replyTo) {
    formData.append('replyTo', data.replyTo);
  }
  
  // Add any attachments
  if (data.attachments && data.attachments.length > 0) {
    data.attachments.forEach((file, index) => {
      formData.append(`attachment${index}`, file);
    });
  }
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent successfully (simulated)");
      resolve(true);
    }, 1000);
  });
};

/**
 * Prepares and sends a contact form email
 */
export const sendContactFormEmail = async (formData: any, attachments?: FileList): Promise<boolean> => {
  // Convert FileList to File array if needed
  const attachmentFiles: File[] = [];
  if (attachments && attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      attachmentFiles.push(attachments[i]);
    }
  }
  
  // Create email content with HTML formatting
  const htmlContent = `
    <h2>Nouveau message de contact</h2>
    <p><strong>De:</strong> ${formData.prenom} ${formData.nom}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Téléphone:</strong> ${formData.telephone}</p>
    <p><strong>Sujet:</strong> ${formData.sujet}</p>
    <h3>Message:</h3>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
  `;
  
  return sendEmail({
    to: 'serviceautoadi@gmail.com',
    subject: `Nouveau contact: ${formData.sujet}`,
    text: `Message de ${formData.prenom} ${formData.nom} (${formData.email}): ${formData.message}`,
    html: htmlContent,
    attachments: attachmentFiles,
    replyTo: formData.email
  });
};

/**
 * Sends an order confirmation email
 */
export const sendOrderConfirmationEmail = async (orderData: any, paymentProof?: File): Promise<boolean> => {
  const attachments = paymentProof ? [paymentProof] : [];
  
  const htmlContent = `
    <h2>Nouvelle commande de véhicule</h2>
    <p><strong>Client:</strong> ${orderData.name}</p>
    <p><strong>Email:</strong> ${orderData.email}</p>
    <p><strong>Téléphone:</strong> ${orderData.phone}</p>
    <h3>Détails du véhicule:</h3>
    <p><strong>Modèle:</strong> ${orderData.carModel}</p>
    <p><strong>Prix:</strong> ${orderData.price}€</p>
    <p><strong>Méthode de paiement:</strong> ${orderData.paymentMethod}</p>
    ${orderData.couponCode ? `<p><strong>Code coupon:</strong> ${orderData.couponCode}</p>` : ''}
    <p><strong>Acompte de 20%:</strong> ${orderData.deposit}€</p>
  `;
  
  return sendEmail({
    to: 'serviceautoadi@gmail.com',
    subject: `Nouvelle commande: ${orderData.carModel}`,
    text: `Nouvelle commande de ${orderData.name} pour ${orderData.carModel} à ${orderData.price}€`,
    html: htmlContent,
    attachments,
    replyTo: orderData.email
  });
};

/**
 * Sends a payment proof email
 */
export const sendPaymentProofEmail = async (customerData: any, paymentProof: File): Promise<boolean> => {
  return sendEmail({
    to: 'serviceautoadi@gmail.com',
    subject: `Preuve de paiement: ${customerData.reference || 'Sans référence'}`,
    text: `Preuve de paiement envoyée par ${customerData.name} (${customerData.email})`,
    html: `
      <h2>Preuve de paiement reçue</h2>
      <p><strong>Client:</strong> ${customerData.name}</p>
      <p><strong>Email:</strong> ${customerData.email}</p>
      <p><strong>Référence:</strong> ${customerData.reference || 'Non spécifiée'}</p>
      <p><strong>Montant:</strong> ${customerData.amount}€</p>
      <p>La preuve de paiement est jointe à cet email.</p>
    `,
    attachments: [paymentProof],
    replyTo: customerData.email
  });
};
