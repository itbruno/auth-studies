import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard', '/settings'];

  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if(isProtectedRoute) {
    const cookie = String((await cookies()).get('session')?.value);
    const session = jwt.decode(cookie) as { userId: string, email: string } | null;

    if(!session || !session.userId) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts/:path*',
    '/settings/:path*',
    '/login',
    '/register',
    '/logout',
    '/:path*',
    '/']
  };