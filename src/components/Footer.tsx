
import React from 'react';
import { Separator } from '@/components/ui/separator';
import FooterCompanyInfo from './footer/FooterCompanyInfo';
import FooterQuickLinks from './footer/FooterQuickLinks';
import FooterContactInfo from './footer/FooterContactInfo';
import FooterLegalLinks from './footer/FooterLegalLinks';
import FooterCopyright from './footer/FooterCopyright';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-brand-extraDarkBlue to-brand-blue text-white">
      <div className="container mx-auto py-6">
        {/* Top Section - Logo, Description, Social, Links, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          {/* Company Info with Social Media */}
          <FooterCompanyInfo />

          {/* Quick Links */}
          <div>
            <FooterQuickLinks />
          </div>

          {/* Contact Info */}
          <div>
            <FooterContactInfo />
          </div>
        </div>

        <Separator className="bg-white/20 my-4" />

        {/* Legal links */}
        <FooterLegalLinks />

        {/* Copyright */}
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
