import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const signInPage = "/login";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith(signInPage) ||
    request.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next(); // Autoriser l'accès à la page de connexion et aux routes API
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = new URL(signInPage, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next|static|favicon.ico|login|api/auth).*)"],
};
