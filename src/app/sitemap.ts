import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://searoadbrokerage.com';
const locales = ['en-us', 'es', 'fr-ca', 'pa'];

const staticRoutes = [
  '',
  '/quote',
  '/services',
  '/services/full-truckload',
  '/services/less-than-truckload',
  '/services/intermodal',
  '/services/flatbed',
  '/services/temperature-controlled',
  '/services/specialized',
  '/carriers',
  '/load-board',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/quote' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
