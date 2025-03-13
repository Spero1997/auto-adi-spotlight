
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
    
    // Prepare email data
    const emailData = new FormData();
    
    // Add all form fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'attachment') {
        emailData.append(key, value as string);
      }
    });
    
    // Add attachments if any
    const attachmentFiles = values.attachment;
    if (attachmentFiles && attachmentFiles.length > 0) {
      for (let i = 0; i < attachmentFiles.length; i++) {
        emailData.append('attachment', attachmentFiles[i]);
      }
    }
    
    // Create an email content for the form submission
    const emailSubject = `Nouveau message de contact: ${values.sujet}`;
    const emailContent = `
      Nom: ${values.nom}
      Prénom: ${values.prenom}
      Email: ${values.email}
      Téléphone: ${values.telephone}
      Sujet: ${values.sujet}
      Message: ${values.message}
    `;
    
    emailData.append('to', 'serviceautoadi@gmail.com');
    emailData.append('subject', emailSubject);
    emailData.append('text', emailContent);
    
    // In a real application, you would now send this data to a backend service
    // that handles sending emails with attachments.
    // For demonstration purposes, we'll simulate an API call:
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        duration: 5000,
      });
      
      // Reset the form
      form.reset();
      
      // Reset success message after a delay
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
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
                <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-600 mb-4">Nous sommes disponibles du lundi au samedi</p>
                <a href="tel:+393761753341" className="text-blue-600 font-medium">+39 376 175 3341</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Contactez-nous par WhatsApp</p>
                <a href="https://wa.me/393761753341" className="text-blue-600 font-medium">+39 376 175 3341</a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-4">Réponse garantie sous 24h</p>
                <a href="mailto:serviceautoadi@gmail.com" className="text-blue-600 font-medium">serviceautoadi@gmail.com</a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Envoyez-nous un message</h2>
              
              {submitSuccess && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <AlertTitle className="text-green-800">Message envoyé avec succès!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
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
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
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
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre prénom" {...field} />
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
                          <FormLabel>Email</FormLabel>
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
                          <FormLabel>Téléphone</FormLabel>
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
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input placeholder="Le sujet de votre message" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Détaillez votre demande ici..." 
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
                        <FormLabel>Pièces jointes (facultatif)</FormLabel>
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
                              <span className="text-sm text-gray-600 mb-1">Glissez-déposez vos fichiers ici ou</span>
                              <span className="text-sm font-medium text-blue-600">parcourir les fichiers</span>
                              <span className="text-xs text-gray-500 mt-2">PDF, JPEG, PNG (Max 10 Mo)</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-12 bg-gray-50" id="locations">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre concession</h2>
            
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
