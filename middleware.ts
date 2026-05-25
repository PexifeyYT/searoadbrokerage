import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!admin|api|_next|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};
