import { getRequestConfig } from 'next-intl/server';
import enUs from '../messages/en-us.json';
import es from '../messages/es.json';
import frCa from '../messages/fr-ca.json';
import pa from '../messages/pa.json';

export const locales = ['en-us', 'es', 'fr-ca', 'pa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en-us';

const messagesMap: Record<string, Record<string, unknown>> = {
  'en-us': enUs,
  'es': es,
  'fr-ca': frCa,
  'pa': pa,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = ((await requestLocale) ?? defaultLocale) as Locale;
  const messages = messagesMap[locale] ?? messagesMap[defaultLocale];
  return { locale, messages };
});
