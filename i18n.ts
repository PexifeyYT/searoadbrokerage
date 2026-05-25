import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

export const locales = ['en-us', 'es', 'fr-ca', 'pa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en-us';

const messageLoaders: Record<Locale, () => Promise<{ default: AbstractIntlMessages }>> = {
  'en-us': () => import('./messages/en-us.json') as Promise<{ default: AbstractIntlMessages }>,
  'es': () => import('./messages/es.json') as Promise<{ default: AbstractIntlMessages }>,
  'fr-ca': () => import('./messages/fr-ca.json') as Promise<{ default: AbstractIntlMessages }>,
  'pa': () => import('./messages/pa.json') as Promise<{ default: AbstractIntlMessages }>,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = (requested && requested in messageLoaders) ? (requested as Locale) : defaultLocale;
  const messages = (await messageLoaders[locale]()).default;
  return { locale, messages };
});
