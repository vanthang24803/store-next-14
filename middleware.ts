import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const roles = JSON.stringify(request.cookies.get("roles"));

  const roleArray = roles ? JSON.parse(decodeURIComponent(roles)).value.split(",") : [];
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/new-post")) &&
    !roleArray.includes("ADMIN")
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/new-post"],
};