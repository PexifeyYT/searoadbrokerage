import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/((?!admin|api|_next|login|account|auth|reset-password|terms|privacy|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};
