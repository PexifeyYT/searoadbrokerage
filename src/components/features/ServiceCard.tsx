import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Card hover className="flex flex-col">
      <div className="h-12 w-12 bg-blue-600 dark:bg-blue-700 rounded-xl flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{description}</p>
      <Link
        href={href}
        className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-2 transition-all duration-200"
      >
        Learn more <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
