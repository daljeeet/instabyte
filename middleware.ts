import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    console.log(req.cookies)
  return NextResponse.next()
}
export const config = {
    matcher: '/api/:path*',
  }