import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/dashboard/private'],
    },
    sitemap: 'https://estateflow.io/sitemap.xml',
  };
}
