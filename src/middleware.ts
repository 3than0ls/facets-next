// Middleware should be a replacement for the AuthContext
// look into https://authjs.dev/getting-started/installation?framework=next.js (for other apps)
// follo0 https://supabase.com/docs/guides/auth/server-side/nextjs?queryGroups=router&router=app

/*
 from https://supabase.com/docs/guides/auth/server-side/nextjs

 "Always use supabase.auth.getUser() to protect pages and user data." - SB guide
*/

import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
