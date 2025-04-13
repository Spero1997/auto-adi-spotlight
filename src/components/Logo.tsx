
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn('font-bold text-xl', className)}>
      <span className="text-blue-600">Auto</span>
      <span>Adi</span>
    </div>
  );
};

export default Logo;
