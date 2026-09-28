import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("🔥 PROXY:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  console.log("🍪 TOKEN:", token);

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/favorites/:path*",
    // "/rooms/:id",
    "/profile/:path*",
  ],
};