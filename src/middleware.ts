import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromJWT } from '@/utils/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const user = await getUserFromJWT();

  if (path === '/') {
    return redirectTo(request, '/dashboard');
  }

  if (!user?.id && path.startsWith('/dashboard')) {
    return redirectTo(request, '/auth/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

function redirectTo(request: NextRequest, path: string) {
  const url = request.nextUrl.clone();
  url.pathname = path;
  return NextResponse.redirect(url);
}
