import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6',
        hover &&
          'transition-shadow duration-200 hover:shadow-md hover:-translate-y-0.5 transform',
        className
      )}
    >
      {children}
    </div>
  );
}
