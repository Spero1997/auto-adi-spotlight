
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroFeatureCardProps {
  icon: LucideIcon;
  text: string;
}

const HeroFeatureCard = ({ icon: Icon, text }: HeroFeatureCardProps) => {
  return (
    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm p-3 rounded-lg shadow-md">
      <Icon className="h-5 w-5 text-brand-orange" />
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default HeroFeatureCard;
