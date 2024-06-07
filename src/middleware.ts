import { NextResponse, NextRequest } from "next/server";

// Redirect user to the specified URL under specified conditions
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
    // isPublicPath is true if any path is accessed

    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Set paths for which middleware would be executed through matcher
export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        '/profile',
        '/verifyemail'
    ]
}