// src/app/sitemap.js
/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const baseUrl = 'https://semaphore2k25.in'; // Your live domain

  const routes = [
    '/',
    '/events',
    '/register',
    '/login',
    '/participant',
    '/registrations',
    '/verify-email',
    '/change-password',
    '/request-password-change',
    '/accolades',
    '/error',
  ];

  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
  }));
}
