import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth' || path === '/api/auth' || path === '/api/products';

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  // For API routes, verify the token
  // if (path.startsWith('/api/') && !isPublicPath) {
  //   try {
  //     jwt.verify(token, JWT_SECRET);
  //   } catch (error) {
  //     return NextResponse.json(
  //       { error: 'Unauthorized' },
  //       { status: 401 }
  //     );
  //   }
  // }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/account/:path*',
    '/cart/:path*',
    '/api/:path*',
    '/auth',
  ],
}; 