import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8",
      "transition-all duration-300 hover:bg-white/10 hover:border-white/20",
      className
    )}>
      {children}
    </div>
  );
};

export default CardWrapper;