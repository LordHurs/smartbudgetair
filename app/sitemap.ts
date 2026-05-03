import { MetadataRoute } from 'next';
import { getAllRoutes } from '@/lib/routes';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartbudgetair.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getAllRoutes();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const routePages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE_URL}/vols/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r.type === 'fr-to-africa' ? 0.9 : 0.8,
  }));

  return [...staticPages, ...routePages];
}
