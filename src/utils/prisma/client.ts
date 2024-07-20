/* 
    See: https://www.reddit.com/r/Supabase/comments/p6mueg/why_would_you_use_prisma_with_supabase/
        and https://www.reddit.com/r/Supabase/comments/p6mueg/comment/h9e3nht/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
    
*/

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#re-using-a-single-prismaclient-instance
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
