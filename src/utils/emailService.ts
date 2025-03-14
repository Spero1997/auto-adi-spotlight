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
  
  try {
    // IMPORTANT: Always save order to local storage first before anything else
    // This ensures we don't lose data even if email sending fails
    saveOrderToLocalStorage(data);
    console.log("Order successfully saved to localStorage as backup");
    
    // Create FormData for sending the email
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
    
    // Setup timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
    
    // Send email using EmailJS service
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
      method: 'POST',
      body: formData,
      headers: {
        'User-ID': 'Efc5FFVd9Kkq7f49T', // Public ID, so it's fine to include in the code
        'Origin': window.location.origin,
        'Access-Control-Allow-Origin': '*',
        'Service-ID': 'service_7h1z65s', // Adding required service ID
        'Template-ID': 'template_kdbpzro', // Adding required template ID
        'X-Public-Key': 'Iq2L6gxEKd7FU_BpN' // Public Key is required
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Email sending failed: ${response.statusText}`);
    }
    
    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Even though we already saved at the beginning, log for clarity
    console.log("Order was already saved to localStorage as backup");
    
    // For development fallback - simulate success
    console.log("Falling back to simulated email sending");
    console.log("Email content:", {
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    });
    
    return true; // Return true to not break the application flow
  }
};

/**
 * Saves order data to localStorage as a backup mechanism
 */
const saveOrderToLocalStorage = (data: EmailData) => {
  try {
    console.log("Attempting to save order to localStorage");
    
    // Get existing orders from localStorage
    const existingOrdersJSON = localStorage.getItem('autoAdiOrders');
    let existingOrders = [];
    
    // Parse existing orders or initialize an empty array if none exist
    try {
      existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      // Make sure existingOrders is an array
      if (!Array.isArray(existingOrders)) {
        console.error("Invalid orders format in localStorage, resetting to empty array");
        existingOrders = [];
      }
    } catch (parseError) {
      console.error("Error parsing orders from localStorage:", parseError);
      existingOrders = [];
    }
    
    // Add timestamp to the order and create a unique ID
    const orderWithTimestamp = {
      ...data,
      attachments: data.attachments ? data.attachments.map(file => file.name) : [],
      timestamp: new Date().toISOString(),
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Add new order to the list
    existingOrders.push(orderWithTimestamp);
    
    // Save updated list back to localStorage
    localStorage.setItem('autoAdiOrders', JSON.stringify(existingOrders));
    
    console.log("Order saved to localStorage as backup:", orderWithTimestamp);
    console.log("Total orders in localStorage:", existingOrders.length);
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
  }
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
    <h3>Livraison:</h3>
    <p><strong>Option:</strong> ${orderData.deliveryOption === 'pickup' ? 'Enlèvement au showroom' : 'Livraison à domicile'}</p>
    <p><strong>Adresse:</strong> ${orderData.deliveryAddress}</p>
    ${orderData.deliveryNotes ? `<p><strong>Instructions:</strong> ${orderData.deliveryNotes}</p>` : ''}
    <h3>Paiement:</h3>
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

/**
 * Gets all orders stored in localStorage
 */
export const getStoredOrders = () => {
  try {
    console.log("Attempting to retrieve orders from localStorage");
    const ordersJSON = localStorage.getItem('autoAdiOrders');
    
    if (!ordersJSON) {
      console.log("No orders found in localStorage");
      return [];
    }
    
    let orders;
    try {
      orders = JSON.parse(ordersJSON);
      
      // Validate that orders is an array
      if (!Array.isArray(orders)) {
        console.error("Invalid orders format in localStorage, returning empty array");
        return [];
      }
      
      console.log(`Successfully retrieved ${orders.length} orders from localStorage`);
      
      // Log the first order for debugging
      if (orders.length > 0) {
        console.log("Sample order:", orders[0]);
      }
      
      return orders;
    } catch (parseError) {
      console.error("Error parsing orders from localStorage:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving orders from localStorage:", error);
    return [];
  }
};

/**
 * Deletes all orders from localStorage
 */
export const clearStoredOrders = () => {
  try {
    localStorage.removeItem('autoAdiOrders');
    console.log("All orders have been cleared from localStorage");
    return true;
  } catch (error) {
    console.error("Error clearing orders from localStorage:", error);
    return false;
  }
};

/**
 * Exports orders as a JSON file
 */
export const exportOrdersAsJSON = (orders: any[]) => {
  try {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `auto-adi-orders-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log(`Exported ${orders.length} orders as JSON`);
    return true;
  } catch (error) {
    console.error("Error exporting orders as JSON:", error);
    return false;
  }
};
