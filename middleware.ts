import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from './i18n/routing';

export function middleware(request: NextRequest) {
  
  const intlResponse = createMiddleware(routing)(request);
  
 const pathname = request.nextUrl.pathname;
  
  
  const token = request.cookies.get("token")?.value;
  

  const isProtectedRoute = pathname.match(/^\/[a-z]{2}\/(dashboard|schedules)/) || 
                          pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/schedule");
  
  if (!token && isProtectedRoute) {
    
    const locale = pathname.match(/^\/([a-z]{2})\//)?.[1];
    const loginUrl = locale ? `/${locale}/login` : "/login";
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  
  return intlResponse;
}

export const config = {

  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};