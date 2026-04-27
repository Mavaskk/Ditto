

import { NextResponse } from "next/server";
import { userIsLogged } from "./app/actions/actions";


export async function proxy(request) {

  const redirectUrl = new URL("/login",request.url);
  const protectedUrl = request.nextUrl.pathname.startsWith("/dashboard") ||
                       request.nextUrl.pathname.startsWith("/createTravel");
  console.log(protectedUrl);
  
  const {user} = await userIsLogged();
  
  
  if (protectedUrl && !user) {
      
        return NextResponse.redirect(redirectUrl);

      }
        
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ extensions (png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}