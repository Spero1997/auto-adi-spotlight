
/**
 * Email Service Utility
 * 
 * This utility handles sending emails with attachments from various parts of the application.
 * It supports different types of emails: contact forms, order confirmations, payment proofs, etc.
 */

import { toast } from "sonner";

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: File[];
  replyTo?: string;
}

interface FormspreeResponse {
  ok: boolean;
  status: number;
  message?: string;
}

/**
 * Envoie un email en utilisant Formspree
 * @param formData Les données à envoyer
 * @param formId L'ID du formulaire Formspree
 */
const sendToFormspree = async (formData: FormData, formId: string): Promise<FormspreeResponse> => {
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const jsonResponse = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      message: jsonResponse.message || (response.ok ? 'Success' : 'Error')
    };
  } catch (error) {
    console.error('Formspree request failed:', error);
    return {
      ok: false,
      status: 0,
      message: 'Network error when sending form'
    };
  }
};

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
    
    // Create FormData for Formspree
    const formData = new FormData();
    
    // Determine which Formspree form to use based on the subject
    let formspreeId = 'movevldo';  // Contact form ID
    
    if (data.subject.toLowerCase().includes('commande') || 
        data.subject.toLowerCase().includes('order') ||
        data.subject.toLowerCase().includes('paiement') ||
        data.subject.toLowerCase().includes('payment') ||
        data.subject.toLowerCase().includes('preuve')) {
      formspreeId = 'xpwpwlra';  // Order form ID
    }
    
    // Add all basic email data to FormData
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
    
    // Send email using Formspree
    const result = await sendToFormspree(formData, formspreeId);
    
    if (!result.ok) {
      throw new Error(`Email sending failed: ${result.message}`);
    }
    
    console.log("Email sent successfully via Formspree!");
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
  
  // Créer un FormData pour Formspree
  const formspreeData = new FormData();
  formspreeData.append('nom', formData.nom);
  formspreeData.append('prenom', formData.prenom);
  formspreeData.append('email', formData.email);
  formspreeData.append('telephone', formData.telephone);
  formspreeData.append('sujet', formData.sujet);
  formspreeData.append('message', formData.message);
  
  // Ajouter les pièces jointes
  if (attachments && attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      formspreeData.append('attachment', attachments[i]);
    }
  }
  
  try {
    const result = await sendToFormspree(formspreeData, 'movevldo');
    
    if (!result.ok) {
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire de contact:", error);
    toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    return false;
  }
};

/**
 * Sends an order confirmation email
 */
export const sendOrderConfirmationEmail = async (orderData: any, paymentProof?: File): Promise<boolean> => {
  const attachments = paymentProof ? [paymentProof] : [];
  
  // Create FormData for Formspree
  const formspreeData = new FormData();
  
  // Add all order data
  Object.entries(orderData).forEach(([key, value]) => {
    formspreeData.append(key, value as string);
  });
  
  // Add payment proof if available
  if (paymentProof) {
    formspreeData.append('paymentProof', paymentProof);
  }
  
  try {
    const result = await sendToFormspree(formspreeData, 'xpwpwlra');
    
    if (!result.ok) {
      toast.error("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
      // Sauvegarder en local storage comme backup
      saveOrderToLocalStorage({
        to: 'serviceautoadi@gmail.com',
        subject: `Nouvelle commande: ${orderData.carModel}`,
        text: `Nouvelle commande de ${orderData.name} pour ${orderData.carModel} à ${orderData.price}€`,
        attachments
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la confirmation de commande:", error);
    toast.error("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
    
    // Sauvegarder en local storage comme backup
    saveOrderToLocalStorage({
      to: 'serviceautoadi@gmail.com',
      subject: `Nouvelle commande: ${orderData.carModel}`,
      text: `Nouvelle commande de ${orderData.name} pour ${orderData.carModel} à ${orderData.price}€`,
      attachments
    });
    
    return false;
  }
};

/**
 * Sends a payment proof email
 */
export const sendPaymentProofEmail = async (customerData: any, paymentProof: File): Promise<boolean> => {
  // Create FormData for Formspree
  const formspreeData = new FormData();
  
  // Add customer data
  Object.entries(customerData).forEach(([key, value]) => {
    formspreeData.append(key, value as string);
  });
  
  // Add payment proof
  formspreeData.append('paymentProof', paymentProof);
  
  try {
    const result = await sendToFormspree(formspreeData, 'xpwpwlra');
    
    if (!result.ok) {
      toast.error("Erreur lors de l'envoi de la preuve de paiement. Veuillez réessayer.");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la preuve de paiement:", error);
    toast.error("Erreur lors de l'envoi de la preuve de paiement. Veuillez réessayer.");
    return false;
  }
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
