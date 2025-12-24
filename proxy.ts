import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req: NextRequest) {
    const session = await auth();
    console.log("Session in middleware:", session);
    const role = session?.user?.role
    const { pathname } = req.nextUrl;
    const publicRoute = [
        "/signin",
        "/signup",
        "/api/auth",
    ]
    if (publicRoute.some((route) => pathname.startsWith(route))) { 
        return NextResponse.next();   
    }

    // const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    // if (!token) {
    //     const loginUrl = new URL('/signin', req.url);
    //     loginUrl.searchParams.set('callbackUrl', req.url);
    //     return NextResponse.redirect(loginUrl);
    // }

    // CA restrictions
    if (role === "user" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/home", req.url));
    }
    
    if (role === "sa" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/ca", req.url));
    }

    return NextResponse.next();

} 

export const config = {
    matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
          
}