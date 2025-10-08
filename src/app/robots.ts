import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/uploads/'],
      },
    ],
    sitemap: 'https://fileconvert.uz/sitemap.xml',
  };
}

