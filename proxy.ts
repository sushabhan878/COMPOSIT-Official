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

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  // Not logged in → signin
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const role = token.role as string | undefined;

  if (role === "user") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (role === "sa") {
    return NextResponse.redirect(new URL("/ca", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
