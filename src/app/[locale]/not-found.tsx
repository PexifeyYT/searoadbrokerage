import Link from 'next/link';
import { Truck } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
          <Truck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          Looks like this load took a wrong turn. Let us get you back on route.
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
