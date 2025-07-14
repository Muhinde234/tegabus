import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

// 1. i18n middleware
const intlMiddleware = createMiddleware(routing);

// 2. Custom admin protection
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if it's an admin route like /en/admin or /fr/admin
  const isAdminRoute = /^\/[a-z]{2}\/admin(\/|$)/.test(pathname);

  // Get token from cookies (adjust name if different)
  const authToken = request.cookies.get('auth_token')?.value;

  if (isAdminRoute && !authToken) {
    const locale = pathname.split('/')[1]; // e.g., "en"
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Let intlMiddleware handle everything else
  return intlMiddleware(request);
}

// 3. Matcher
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
