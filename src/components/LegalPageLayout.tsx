
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Separator } from '@/components/ui/separator';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-blueContrast">{title}</h1>
            <Separator className="mb-6 sm:mb-8 bg-brand-orange/30" />
            <div className="prose prose-lg max-w-none">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
