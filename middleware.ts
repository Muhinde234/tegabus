import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Redirect root to default locale
    '/',

    // Set locale cookie on all locale-prefixed paths
    '/(en|rw|fr)/:path*',

    // Add missing locale prefix to all other paths
    // (excludes _next, static files, and API routes)
    '/((?!_next|_vercel|api|.*\\..*).*)'
  ]
};
