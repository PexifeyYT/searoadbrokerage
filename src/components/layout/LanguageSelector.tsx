'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'en-us', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr-ca', label: 'Français', flag: '🇨🇦' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  currentLocale: string;
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSelect = (code: string) => {
    setOpen(false);
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/'));
  };

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <Globe className="h-4 w-4" />
        <span>{current.flag} {current.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="listbox" aria-label="Language" className="absolute right-0 mt-1 w-40 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-dark-border z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === currentLocale}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                lang.code === currentLocale
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
