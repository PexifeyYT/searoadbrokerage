import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const configs: Record<AlertVariant, { icon: React.ElementType; styles: string }> = {
  success: {
    icon: CheckCircle,
    styles: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  },
  error: {
    icon: XCircle,
    styles: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  },
  warning: {
    icon: AlertTriangle,
    styles: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
  },
  info: {
    icon: Info,
    styles: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
  },
};

export default function Alert({ variant, title, children, className }: AlertProps) {
  const { icon: Icon, styles } = configs[variant];
  return (
    <div className={cn('flex gap-3 p-4 rounded-lg border', styles, className)}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
