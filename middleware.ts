import { type NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from 'lib/auth';
export async function middleware(req: NextRequest) {
  console.log(req)
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error("error from middleware",err.message)
  })
  console.log('verified',verifiedToken)
  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ 'error': { message: 'authentication required' } }),
        { status: 401 });
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }else{
    return NextResponse.next()
  }
}
export const config = {
  matcher: ['/api/protected/:path*',  '/profile', "/explore"]
}
