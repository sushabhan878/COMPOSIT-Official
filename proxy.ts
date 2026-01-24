// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// export async function proxy(req: NextRequest) {
//     const session = await auth();

//     const role = session?.user?.role
//     const { pathname } = req.nextUrl;
//     const publicRoute = [
//         "/signin",
//         "/signup",
//         "/api/auth",
//     ]
//     if (publicRoute.some((route) => pathname.startsWith(route))) {
//         return NextResponse.next();
//     }

//     if (role === "user" && pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL("/home", req.url));
//     }

//     if (role === "sa" && pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL("/ca", req.url));
//     }

//     return NextResponse.next();

// }

// export const config = {
//     matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// 1. MUST be named 'middleware' to work in Next.js
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 2. Only run this logic for admin routes (redundant with matcher, but safe)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // 3. If not logged in at all, send to signin
  if (!token) {
    const url = new URL("/signin", req.url);
    // Optional: Add callbackUrl so they return to admin page after login
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const role = token.role as string | undefined;

  // 4. RESTRICTION: Redirect 'user' away from admin
  if (role === "user") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // 5. RESTRICTION: Redirect 'sa' away from admin
  if (role === "sa") {
    return NextResponse.redirect(new URL("/ca", req.url));
  }

  // 6. If role is 'admin' (or any undefined role), allow access
  return NextResponse.next();
}

// 7. Config limits middleware execution ONLY to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
