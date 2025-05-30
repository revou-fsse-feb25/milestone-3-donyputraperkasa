import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // cek login
  const isLoggedIn = request.cookies.get('loggedIn')?.value === 'true';

  // Jika user belum login dan mengakses /dashboard, redirect ke /login
  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // lanjutkan ke route berikutnya
}

export const config = {
  matcher: ['/dashboard/:path*'],
};