// src/app/sitemap.js
/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const baseUrl = 'https://semaphore2k25.in'; // Your live domain

  const routes = [
    { path: '/', priority: 1.0, changeFreq: 'daily' },
    { path: '/events', priority: 0.9, changeFreq: 'weekly' },
    { path: '/accolades', priority: 0.8, changeFreq: 'weekly' },
    { path: '/participant', priority: 0.8, changeFreq: 'weekly' },
    { path: '/registrations', priority: 0.8, changeFreq: 'weekly' },
    { path: '/login', priority: 0.5, changeFreq: 'monthly' },
    { path: '/register', priority: 0.4, changeFreq: 'monthly' }, // Lower priority
    { path: '/verify-email', priority: 0.3, changeFreq: 'monthly' },
    { path: '/change-password', priority: 0.3, changeFreq: 'monthly' },
    { path: '/request-password-change', priority: 0.3, changeFreq: 'monthly' },
    { path: '/error', priority: 0.1, changeFreq: 'yearly' }, // Almost ignore
  ];

  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));
}
