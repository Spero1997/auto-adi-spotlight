
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MapPin, Phone, MessageCircle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  telephone: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  sujet: z.string().min(3, { message: 'Le sujet doit contenir au moins 3 caractères' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
  attachment: z.instanceof(FileList).optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const { language, translate } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const translations = {
    contactUs: {
      FR: "Contactez-nous",
      EN: "Contact us",
      ES: "Contáctenos",
      IT: "Contattaci",
      PT: "Contacte-nos",
      RO: "Contactați-ne"
    },
    teamAvailable: {
      FR: "Notre équipe est à votre disposition pour répondre à toutes vos questions",
      EN: "Our team is available to answer all your questions",
      ES: "Nuestro equipo está disponible para responder a todas sus preguntas",
      IT: "Il nostro team è a disposizione per rispondere a tutte le tue domande",
      PT: "A nossa equipa está disponível para responder a todas as suas perguntas",
      RO: "Echipa noastră este disponibilă pentru a răspunde la toate întrebările dvs."
    },
    contactInfo: {
      FR: "Informations de contact",
      EN: "Contact information",
      ES: "Información de contacto",
      IT: "Informazioni di contatto",
      PT: "Informações de contacto",
      RO: "Informații de contact"
    },
    phoneNumber: {
      FR: "Téléphone",
      EN: "Phone",
      ES: "Teléfono",
      IT: "Telefono",
      PT: "Telefone",
      RO: "Telefon"
    },
    availableHours: {
      FR: "Nous sommes disponibles du lundi au samedi",
      EN: "We are available Monday to Saturday",
      ES: "Estamos disponibles de lunes a sábado",
      IT: "Siamo disponibili dal lunedì al sabato",
      PT: "Estamos disponíveis de segunda a sábado",
      RO: "Suntem disponibili de luni până sâmbătă"
    },
    contactViaWhatsApp: {
      FR: "Contactez-nous par WhatsApp",
      EN: "Contact us via WhatsApp",
      ES: "Contáctenos por WhatsApp",
      IT: "Contattaci tramite WhatsApp",
      PT: "Contacte-nos via WhatsApp",
      RO: "Contactați-ne prin WhatsApp"
    },
    email: {
      FR: "Email",
      EN: "Email",
      ES: "Correo electrónico",
      IT: "Email",
      PT: "Email",
      RO: "Email"
    },
    guaranteedResponse: {
      FR: "Réponse garantie sous 24h",
      EN: "Response guaranteed within 24h",
      ES: "Respuesta garantizada en 24h",
      IT: "Risposta garantita entro 24h",
      PT: "Resposta garantida em 24h",
      RO: "Răspuns garantat în 24 de ore"
    },
    sendMessage: {
      FR: "Envoyez-nous un message",
      EN: "Send us a message",
      ES: "Envíenos un mensaje",
      IT: "Inviaci un messaggio",
      PT: "Envie-nos uma mensagem",
      RO: "Trimiteți-ne un mesaj"
    },
    messageSent: {
      FR: "Message envoyé avec succès!",
      EN: "Message sent successfully!",
      ES: "¡Mensaje enviado con éxito!",
      IT: "Messaggio inviato con successo!",
      PT: "Mensagem enviada com sucesso!",
      RO: "Mesaj trimis cu succes!"
    },
    thankYou: {
      FR: "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
      EN: "Thank you for your message. We will reply as soon as possible.",
      ES: "Gracias por su mensaje. Le responderemos lo antes posible.",
      IT: "Grazie per il tuo messaggio. Ti risponderemo il prima possibile.",
      PT: "Obrigado pela sua mensagem. Responderemos o mais rapidamente possível.",
      RO: "Vă mulțumim pentru mesaj. Vă vom răspunde cât mai curând posibil."
    },
    lastName: {
      FR: "Nom",
      EN: "Last name",
      ES: "Apellido",
      IT: "Cognome",
      PT: "Sobrenome",
      RO: "Nume"
    },
    firstName: {
      FR: "Prénom",
      EN: "First name",
      ES: "Nombre",
      IT: "Nome",
      PT: "Nome próprio",
      RO: "Prenume"
    },
    phone: {
      FR: "Téléphone",
      EN: "Phone",
      ES: "Teléfono",
      IT: "Telefono",
      PT: "Telefone",
      RO: "Telefon"
    },
    subject: {
      FR: "Sujet",
      EN: "Subject",
      ES: "Asunto",
      IT: "Oggetto",
      PT: "Assunto",
      RO: "Subiect"
    },
    message: {
      FR: "Message",
      EN: "Message",
      ES: "Mensaje",
      IT: "Messaggio",
      PT: "Mensagem",
      RO: "Mesaj"
    },
    attachments: {
      FR: "Pièces jointes (facultatif)",
      EN: "Attachments (optional)",
      ES: "Archivos adjuntos (opcional)",
      IT: "Allegati (facoltativo)",
      PT: "Anexos (opcional)",
      RO: "Atașamente (opțional)"
    },
    dragAndDrop: {
      FR: "Glissez-déposez vos fichiers ici ou",
      EN: "Drag and drop your files here or",
      ES: "Arrastre y suelte sus archivos aquí o",
      IT: "Trascina e rilascia i tuoi file qui o",
      PT: "Arraste e solte os seus ficheiros aqui ou",
      RO: "Trageți și plasați fișierele dvs. aici sau"
    },
    browseFiles: {
      FR: "parcourir les fichiers",
      EN: "browse files",
      ES: "explorar archivos",
      IT: "sfoglia i file",
      PT: "procurar ficheiros",
      RO: "răsfoiți fișierele"
    },
    maxFileSize: {
      FR: "PDF, JPEG, PNG (Max 10 Mo)",
      EN: "PDF, JPEG, PNG (Max 10 MB)",
      ES: "PDF, JPEG, PNG (Máx 10 MB)",
      IT: "PDF, JPEG, PNG (Max 10 MB)",
      PT: "PDF, JPEG, PNG (Máx 10 MB)",
      RO: "PDF, JPEG, PNG (Max 10 MB)"
    },
    sending: {
      FR: "Envoi en cours...",
      EN: "Sending...",
      ES: "Enviando...",
      IT: "Invio in corso...",
      PT: "A enviar...",
      RO: "Se trimite..."
    },
    send: {
      FR: "Envoyer le message",
      EN: "Send message",
      ES: "Enviar mensaje",
      IT: "Invia messaggio",
      PT: "Enviar mensagem",
      RO: "Trimite mesaj"
    },
    ourDealer: {
      FR: "Notre concession",
      EN: "Our dealership",
      ES: "Nuestro concesionario",
      IT: "La nostra concessionaria",
      PT: "O nosso concessionário",
      RO: "Reprezentanța noastră"
    },
    messageSentToast: {
      FR: "Message envoyé",
      EN: "Message sent",
      ES: "Mensaje enviado",
      IT: "Messaggio inviato",
      PT: "Mensagem enviada",
      RO: "Mesaj trimis"
    },
    willReplyShortly: {
      FR: "Nous vous répondrons dans les plus brefs délais.",
      EN: "We will reply shortly.",
      ES: "Le responderemos en breve.",
      IT: "Ti risponderemo a breve.",
      PT: "Responderemos em breve.",
      RO: "Vă vom răspunde în curând."
    },
    error: {
      FR: "Erreur",
      EN: "Error",
      ES: "Error",
      IT: "Errore",
      PT: "Erro",
      RO: "Eroare"
    },
    errorMessage: {
      FR: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      EN: "An error occurred while sending the message. Please try again.",
      ES: "Se produjo un error al enviar el mensaje. Por favor, inténtelo de nuevo.",
      IT: "Si è verificato un errore durante l'invio del messaggio. Si prega di riprovare.",
      PT: "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.",
      RO: "A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou."
    }
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      sujet: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    
    // Create FormData for Formspree
    const formData = new FormData();
    
    // Add all form fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'attachment') {
        formData.append(key, value as string);
      }
    });
    
    // Add attachments if any
    const attachmentFiles = values.attachment;
    if (attachmentFiles && attachmentFiles.length > 0) {
      for (let i = 0; i < attachmentFiles.length; i++) {
        formData.append('attachment', attachmentFiles[i]);
      }
    }
    
    // Send form to Formspree with the correct ID
    fetch('https://formspree.io/f/movevldo', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      toast({
        title: translate('messageSentToast', translations.messageSentToast),
        description: translate('willReplyShortly', translations.willReplyShortly),
        duration: 5000,
      });
      
      // Reset the form
      form.reset();
      
      // Reset success message after a delay
      setTimeout(() => setSubmitSuccess(false), 5000);
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      toast({
        title: translate('error', translations.error),
        description: translate('errorMessage', translations.errorMessage),
        duration: 5000,
        variant: "destructive",
      });
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {translate('contactUs', translations.contactUs)}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              {translate('teamAvailable', translations.teamAvailable)}
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translate('phoneNumber', translations.phoneNumber)}</h3>
                <p className="text-gray-600 mb-4">{translate('availableHours', translations.availableHours)}</p>
                <a href="tel:+393761753341" className="text-blue-600 font-medium">+39 376 175 3341</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">{translate('contactViaWhatsApp', translations.contactViaWhatsApp)}</p>
                <a href="https://wa.me/393761753341" className="text-blue-600 font-medium">+39 376 175 3341</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translate('email', translations.email)}</h3>
                <p className="text-gray-600 mb-4">{translate('guaranteedResponse', translations.guaranteedResponse)}</p>
                <a href="mailto:serviceautoadi@gmail.com" className="text-blue-600 font-medium">serviceautoadi@gmail.com</a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">{translate('sendMessage', translations.sendMessage)}</h2>
              
              {submitSuccess && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <AlertTitle className="text-green-800">{translate('messageSent', translations.messageSent)}</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {translate('thankYou', translations.thankYou)}
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate('lastName', translations.lastName)}</FormLabel>
                          <FormControl>
                            <Input placeholder={translate('lastName', translations.lastName)} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate('firstName', translations.firstName)}</FormLabel>
                          <FormControl>
                            <Input placeholder={translate('firstName', translations.firstName)} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate('email', translations.email)}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.fr" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate('phone', translations.phone)}</FormLabel>
                          <FormControl>
                            <Input placeholder="01 23 45 67 89" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="sujet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translate('subject', translations.subject)}</FormLabel>
                        <FormControl>
                          <Input placeholder={translate('subject', translations.subject)} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translate('message', translations.message)}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={translate('message', translations.message)}
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>{translate('attachments', translations.attachments)}</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <Input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              multiple
                              onChange={(e) => onChange(e.target.files)}
                              {...fieldProps}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                              <Upload className="h-10 w-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600 mb-1">{translate('dragAndDrop', translations.dragAndDrop)}</span>
                              <span className="text-sm font-medium text-blue-600">{translate('browseFiles', translations.browseFiles)}</span>
                              <span className="text-xs text-gray-500 mt-2">{translate('maxFileSize', translations.maxFileSize)}</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? translate('sending', translations.sending) : translate('send', translations.send)}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-12 bg-gray-50" id="locations">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{translate('ourDealer', translations.ourDealer)}</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Florence</h3>
                <p className="text-gray-600 mb-4">
                  Borgo Ognissanti, 142r<br />
                  50123 Firenze FI, Italie
                </p>
                <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.1039860848725!2d11.239661476654394!3d43.773378671011735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a56a93a46a891%3A0x97f9691097c0a10!2sBorgo%20Ognissanti%2C%20142r%2C%2050123%20Firenze%20FI%2C%20Italy!5e0!3m2!1sen!2sgh!4v1710341636696!5m2!1sen!2sgh" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Conditions section */}
        <ConditionsHighlight />
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
