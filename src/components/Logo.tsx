
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/b752df00-a7bc-436a-a185-69dce7e9c8fb.png" 
      alt="Auto ADI Logo" 
      className={cn('h-12 w-auto', className)}
    />
  );
};

export default Logo;
