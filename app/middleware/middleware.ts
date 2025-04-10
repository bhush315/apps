import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../libs/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const decoded = verifyToken(token);

  // Public routes
  const isPublicPath =
    path.startsWith("/login") || path.startsWith("/register");

  // Admin routes
  const isAdminPath = path.startsWith("/admin");

  // Redirect logged-in users from public paths
  if (isPublicPath && decoded) {
    const redirectPath = decoded.role === "ADMIN" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.nextUrl));
  }

  // Protect admin routes
  if (isAdminPath && (!decoded || decoded.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // Protect private routes (non-admin)
  if (!isPublicPath && !isAdminPath && !decoded) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/profile",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
