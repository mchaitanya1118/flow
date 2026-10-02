import { MetadataRoute } from 'next';
import { DEMO_PROPERTIES } from '../lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://estateflow.io';

  const staticRoutes = [
    '',
    '/search',
    '/projects',
    '/agents',
    '/agencies',
    '/developers',
    '/mortgage-calculator',
    '/home-loans',
    '/nri-desk',
    '/locality-insights',
    '/valuation',
    '/rera-check',
    '/guides',
    '/post-property',
    '/compare',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'always' : route === '/search' ? 'hourly' : 'weekly') as any,
    priority: route === '' ? 1.0 : route === '/search' ? 0.9 : 0.8,
  }));

  const propertyUrls = DEMO_PROPERTIES.map((prop) => ({
    url: `${baseUrl}/property/${prop.slug}`,
    lastModified: new Date(prop.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyUrls];
}
