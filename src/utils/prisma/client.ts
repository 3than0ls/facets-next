/* 
    A lot of information looking up later, I've resolved that trying to force Prisma into this project really isn't the way.
    See: https://www.reddit.com/r/Supabase/comments/p6mueg/why_would_you_use_prisma_with_supabase/

    It is, however, theoretically possible.
    See: https://github.com/dthyresson/prisma-extension-supabase-rls?tab=readme-ov-file#prisma-client-with-supabase-rls-enforced-with-claims-from-context-and-custom-error
    
*/

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#re-using-a-single-prismaclient-instance
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
