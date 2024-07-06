/*
 from https://supabase.com/docs/guides/auth/server-side/nextjs
*/

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    // why not just export this value below?
    // "On the client, createBrowserClient already uses a singleton pattern, so you only ever create one instance, no matter how many times you call your createClient function."  - SB guide
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}
