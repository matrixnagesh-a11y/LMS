import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { extractSubdomain } from '@/lib/tenant';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);
  
  const response = NextResponse.next();

  // Attach tenant subdomain header for downstream server components and API routes
  if (subdomain) {
    response.headers.set('x-tenant-subdomain', subdomain);
  }

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
