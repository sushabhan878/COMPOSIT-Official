import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const publicRoute = [
        "/api/public-endpoint",
        "/api/another-public-endpoint",
        "/signin",
        "/signup",
        "/api/auth",
        "favicon.ico",
        "/_next"
    ]
    if (publicRoute.some(route => pathname.startsWith(route))) { 
        return NextResponse.next();   
    }
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) {
        const loginUrl = new URL('/signin', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();

} 

export const config = {
    matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
          
}