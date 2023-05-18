import { type NextRequest, NextResponse } from 'next/server'
// import { verifyAuth } from './lib/auth';
import { jwtVerify } from 'jose'
import { USER_TOKEN, getJwtSecretKey } from './lib/constants'
export async function middleware(req: NextRequest) {
  interface UserJwtPayload {
    jti: string
    iat: number
  }

  const verifiedToken = async(req:NextRequest)=>{ 
    try{
      let token = req.cookies.get(USER_TOKEN)?.value
     if(token){
     const verified = await jwtVerify(token,new TextEncoder().encode(getJwtSecretKey()))
      return verified.payload as UserJwtPayload
     }else{
      throw new Error("Missing Token")
     }
    }catch(err){ 
      throw err
    }
  }
  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ 'error': { message: 'authentication required' } }),
        { status: 401 });
    }
    else {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }else{
    return NextResponse.next()
  }
}
export const config = {
  matcher: ['/api/protected/:path*',  '/profile', "/explore"]
}
