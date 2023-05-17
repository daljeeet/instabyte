import { type NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from 'lib/auth';
export async function middleware(req: NextRequest) {
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error("error from middleware",err.message)
  })
  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ 'error': { message: 'authentication required' } }),
        { status: 401 });
    }
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
