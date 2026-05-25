import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

export const locales = ['en-us', 'es', 'fr-ca', 'pa'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en-us';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = ((await requestLocale) ?? defaultLocale) as Locale;
  const messages = (await import(`../messages/${locale}.json`)) as { default: AbstractIntlMessages };
  return { locale, messages: messages.default };
});
