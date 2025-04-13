
import React from 'react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  // Utilisation du contexte de langue
  const { translate } = useLanguage();

  // Traductions communes pour les pages légales
  const translations = {
    backToHome: {
      FR: "Retour à l'accueil",
      EN: "Back to home",
      ES: "Volver al inicio",
      IT: "Ritorna alla home",
      PT: "Voltar à página inicial",
      RO: "Înapoi la pagina principală"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12 pt-[100vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">{title}</h1>
            
            <div className="prose max-w-none">
              {children}
            </div>
            
            <div className="mt-10 pt-6 border-t">
              <a 
                href="/" 
                className="text-brand-blue hover:text-brand-darkBlue transition-colors flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                {translate('backToHome', translations.backToHome)}
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
