import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/search',
          '/checkout',
          '/admin/',
          '/login',
          '/cgi-bin',
          '/revieworder',
          '/register',
          '/account',
          '/reset-password/',
          '/log-out',
          '/Support/Your-payments',
          '/customer/',
        ],
      },
    ],
    sitemap: 'https://zextons.co.uk/sitemap.xml',
  };
}
